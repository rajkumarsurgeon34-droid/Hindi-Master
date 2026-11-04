# Hindi Master

Learn Hindi in 90 days, from the first letter to fluent, formal Hindi — taught through
**English, தமிழ், ಕನ್ನಡ, മലയാളം, తెలుగు and मराठी**.

This repository is the **Android app**. The course is bundled inside the app, so it works
**offline** and needs no sign-in. Progress, streak and language are saved on the phone.

## What's inside

- 6 levels × 15 days = 90 daily lessons (script & sounds → everyday words → grammar →
  tenses & real life → complex sentences & reading → fluency & formal Hindi)
- Every day: explanation in your language, example words with audio, writing practice,
  flashcards and a quiz
- Writing studio, speaking studio, flashcards, alphabet / weekdays / months chart,
  picture vocabulary, poems & stories, Children's Hindi Academy

## Get the APK

Every push builds the app. Open the **[Releases](../../releases/tag/latest)** page on your phone,
download **HindiMaster.apk** and install it (Android will ask you to allow installs from your browser once).

## Project layout

| Path | What it is |
|---|---|
| `app/src/main/assets/` | The whole web app (HTML, CSS, JS and the 6 course files in `course/`) |
| `app/src/main/java/.../MainActivity.java` | Native shell that shows the bundled app in a WebView |
| `tools/check-course.js` | Checks all 90 days × 6 languages before every build |
| `.github/workflows/build-apk.yml` | Builds the APK and publishes it to Releases |

Run the course check locally: `node tools/check-course.js`

## Notes

- **Signing:** builds use the standard public Android *debug* key kept in `app/debug.keystore`, so each
  new APK installs over the last one and keeps learner progress. That is fine for sideloading to your own
  devices. For Google Play, switch to a private release key stored in GitHub Secrets.
- **Not in the app yet:** parent accounts and school management (they need the online server).
- **Speaking studio:** audio playback works; microphone speech-recognition is not available in Android WebView.
- Hindi audio uses the phone's text-to-speech. If a word is silent, install a Hindi voice in
  *Settings → System → Languages → Text-to-speech*.
