package com.shazverse.hindimaster;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.webkit.JavascriptInterface;
import android.widget.Toast;
import java.util.Locale;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.webkit.WebViewAssetLoader;

/**
 * Hindi Master - a thin native shell around the bundled web course.
 * All lessons live in assets/ and are served from a private https origin
 * (appassets.androidplatform.net), so the app works fully offline and
 * localStorage (progress, streak, language) is kept on the device.
 */
public class MainActivity extends Activity {

    private static final String HOST = "appassets.androidplatform.net";
    private static final String HOME = "https://" + HOST + "/index.html";

    /** Closes any open lesson / activity window; returns how many it closed. */
    private static final String CLOSE_OVERLAYS_JS = "(function(){var n=0;document.querySelectorAll('#modal.show,.vh-overlay.show,.kids-overlay.show').forEach(function(e){e.classList.remove('show');n++});"
            + "var sh=document.getElementById('sheet');if(sh&&sh.classList.contains('show')){try{closeSheet()}catch(e){sh.classList.remove('show')}n++}"
            + "if(!n&&window.curTab&&curTab()!=='learn'){goTab('learn');n++}"
            + "try{speechSynthesis.cancel()}catch(e){}try{HMTTS.stop()}catch(e){}return n;})()";

    private WebView web;
    private TextToSpeech tts;
    private volatile String ttsState = "loading"; // loading | ok | nodata | noengine
    private boolean askedInstall = false;

    /** Native Hindi speech: WebView's own speechSynthesis is unreliable, so lessons call this instead. */
    private class TtsBridge {
        @JavascriptInterface
        public String speak(String text, String id) {
            if (tts == null || !"ok".equals(ttsState)) {
                if ("nodata".equals(ttsState)) offerVoiceInstall();
                return ttsState;
            }
            tts.setSpeechRate(0.85f);
            int r = tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, id);
            return r == TextToSpeech.SUCCESS ? "ok" : "error";
        }

        @JavascriptInterface
        public void stop() {
            if (tts != null) tts.stop();
        }

        @JavascriptInterface
        public String status() {
            return ttsState;
        }
    }

    private void offerVoiceInstall() {
        runOnUiThread(() -> {
            Toast.makeText(this, "Hindi voice not installed. Install \"Hindi\" voice data, then reopen the lesson.", Toast.LENGTH_LONG).show();
            if (askedInstall) return;
            askedInstall = true;
            try {
                startActivity(new Intent(TextToSpeech.Engine.ACTION_INSTALL_TTS_DATA));
            } catch (Exception e) {
                try {
                    startActivity(new Intent("com.android.settings.TTS_SETTINGS"));
                } catch (Exception ignored) {
                }
            }
        });
    }

    private void initTts() {
        tts = new TextToSpeech(this, status -> {
            if (status != TextToSpeech.SUCCESS) {
                ttsState = "noengine";
                return;
            }
            int r = tts.setLanguage(new Locale("hi", "IN"));
            ttsState = (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) ? "nodata" : "ok";
            tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                @Override public void onStart(String id) { }
                @Override public void onDone(String id) { notifyDone(id); }
                @Override public void onError(String id) { notifyDone(id); }
            });
        });
    }

    private void notifyDone(String id) {
        final String safe = id == null ? "" : id.replaceAll("[^0-9]", "");
        runOnUiThread(() -> {
            if (web != null) web.evaluateJavascript("window.__ttsDone&&__ttsDone('" + safe + "')", null);
        });
    }

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        final WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .setDomain(HOST)
                .addPathHandler("/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        web = new WebView(this);
        setContentView(web);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        s.setTextZoom(100);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);

        web.addJavascriptInterface(new TtsBridge(), "HMTTS");
        initTts();

        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (HOST.equals(uri.getHost())) {
                    return false; // our own pages stay in the app
                }
                String scheme = uri.getScheme();
                if ("https".equals(scheme) || "http".equals(scheme)) {
                    try {
                        startActivity(new Intent(Intent.ACTION_VIEW, uri));
                    } catch (ActivityNotFoundException ignored) {
                    }
                }
                return true;
            }
        });

        if (savedInstanceState != null) {
            web.restoreState(savedInstanceState);
        } else {
            web.loadUrl(HOME);
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        if (web != null) web.saveState(outState);
    }

    @Override
    public void onBackPressed() {
        // Back first closes an open lesson/window; only when none is open does it leave the app.
        web.evaluateJavascript(CLOSE_OVERLAYS_JS, value -> {
            if (value == null || "0".equals(value) || "null".equals(value)) {
                MainActivity.super.onBackPressed();
            }
        });
    }

    @Override
    protected void onPause() {
        super.onPause();
        web.evaluateJavascript("try{speechSynthesis.cancel()}catch(e){}", null);
        if (tts != null) tts.stop();
        web.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        web.onResume();
    }

    @Override
    protected void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        if (web != null) {
            web.destroy();
        }
        super.onDestroy();
    }
}
