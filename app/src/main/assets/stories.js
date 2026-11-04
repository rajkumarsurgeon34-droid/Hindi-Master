// Story Studio: illustrated stories to read (with audio) and write (arrange, fill blank, own ending, journal).
// STORY_DATA: "@id|bg|emoji|hi|roman|en|ta|kn|ml|te|mr" then scene lines "chars|mood|hi|roman|en|ta|kn|ml|te|mr"
(function () {
  const RAW = `@1|desert|🐦|प्यासा पक्षी|pyaasa pakshee|The Thirsty Bird|தாகமுள்ள பறவை|ಬಾಯಾರಿದ ಹಕ್ಕಿ|ദാഹിച്ച പക്ഷി|దాహంతో ఉన్న పక్షి|तहानलेला पक्षी
parrot|sad|गर्मी बहुत थी। पक्षी को प्यास लगी थी।|garmee bahut thee. pakshee ko pyaas lagee thee.|It was very hot. The bird was thirsty.|வெயில் மிகவும் அதிகமாக இருந்தது. பறவைக்குத் தாகம் எடுத்தது.|ಬಿಸಿಲು ತುಂಬಾ ಇತ್ತು. ಹಕ್ಕಿಗೆ ಬಾಯಾರಿಕೆಯಾಗಿತ್ತು.|നല്ല ചൂടായിരുന്നു. പക്ഷിക്ക് ദാഹിച്ചു.|చాలా ఎండగా ఉంది. పక్షికి దాహం వేసింది.|खूप गरमी होती. पक्ष्याला तहान लागली होती.
parrot|think|उसे एक घड़ा दिखा। घड़े में थोड़ा पानी था।|use ek ghada dikha. ghade mein thoda paanee tha.|It saw a pot. There was a little water in the pot.|அதற்கு ஒரு பானை தெரிந்தது. பானையில் கொஞ்சம் தண்ணீர் இருந்தது.|ಅದಕ್ಕೆ ಒಂದು ಮಡಕೆ ಕಾಣಿಸಿತು. ಮಡಕೆಯಲ್ಲಿ ಸ್ವಲ್ಪ ನೀರಿತ್ತು.|അതിന് ഒരു കുടം കണ്ടു. കുടത്തിൽ കുറച്ചു വെള്ളമുണ്ടായിരുന്നു.|దానికి ఒక కుండ కనిపించింది. కుండలో కొంచెం నీళ్లు ఉన్నాయి.|त्याला एक मडके दिसले. मडक्यात थोडे पाणी होते.
parrot|think|पानी नीचे था। चोंच वहाँ तक नहीं पहुँची।|paanee neeche tha. chonch vahaan tak nahin pahunchee.|The water was low. The beak did not reach it.|தண்ணீர் கீழே இருந்தது. அலகு அங்கே எட்டவில்லை.|ನೀರು ಕೆಳಗಿತ್ತು. ಕೊಕ್ಕು ಅಲ್ಲಿಗೆ ತಲುಪಲಿಲ್ಲ.|വെള്ളം താഴെയായിരുന്നു. ചുണ്ട് അവിടെ എത്തിയില്ല.|నీళ్లు కింద ఉన్నాయి. ముక్కు అక్కడికి అందలేదు.|पाणी खाली होते. चोच तिथपर्यंत पोहोचली नाही.
parrot|cheer|उसने कंकड़ डाले। पानी ऊपर आ गया।|usne kankad daale. paanee oopar aa gaya.|It dropped pebbles in. The water came up.|அது கூழாங்கற்களைப் போட்டது. தண்ணீர் மேலே வந்தது.|ಅದು ಉಂಡೆಕಲ್ಲುಗಳನ್ನು ಹಾಕಿತು. ನೀರು ಮೇಲೆ ಬಂತು.|അത് ചരൽക്കല്ലുകൾ ഇട്ടു. വെള്ളം മുകളിൽ വന്നു.|అది గులకరాళ్లు వేసింది. నీళ్లు పైకి వచ్చాయి.|त्याने खडे टाकले. पाणी वर आले.
parrot|cheer|पक्षी ने पानी पिया। सोचने से हर काम हो जाता है।|pakshee ne paanee piya. sochne se har kaam ho jaata hai.|The bird drank water. By thinking, every task gets done.|பறவை தண்ணீர் குடித்தது. யோசித்தால் எல்லா வேலையும் நடக்கும்.|ಹಕ್ಕಿ ನೀರು ಕುಡಿಯಿತು. ಯೋಚಿಸಿದರೆ ಎಲ್ಲ ಕೆಲಸ ಆಗುತ್ತದೆ.|പക്ഷി വെള്ളം കുടിച്ചു. ചിന്തിച്ചാൽ എല്ലാ കാര്യവും നടക്കും.|పక్షి నీళ్లు తాగింది. ఆలోచిస్తే ప్రతి పని అవుతుంది.|पक्ष्याने पाणी प्यायले. विचार केला की प्रत्येक काम होते.
@2|home|🎂|गजू का जन्मदिन|gajoo ka janmadin|Gajju's Birthday|கஜூவின் பிறந்தநாள்|ಗಜೂನ ಹುಟ್ಟುಹಬ್ಬ|ഗജുവിന്റെ ജന്മദിനം|గజూ పుట్టినరోజు|गजूचा वाढदिवस
elephant|cheer|आज गजू का जन्मदिन है।|aaj gajoo ka janmadin hai.|Today is Gajju's birthday.|இன்று கஜூவின் பிறந்தநாள்.|ಇಂದು ಗಜೂನ ಹುಟ್ಟುಹಬ್ಬ.|ഇന്ന് ഗജുവിന്റെ ജന്മദിനമാണ്.|ఈ రోజు గజూ పుట్టినరోజు.|आज गजूचा वाढदिवस आहे.
girl,boy|happy|मीनू केक लाई। बिट्टू गुब्बारे लाया।|meenoo kek laee. bittoo gubbaare laaya.|Meenu brought a cake. Bittu brought balloons.|மீனு கேக் கொண்டு வந்தாள். பிட்டு பலூன்கள் கொண்டு வந்தான்.|ಮೀನು ಕೇಕ್ ತಂದಳು. ಬಿಟ್ಟು ಬಲೂನ್‌ಗಳನ್ನು ತಂದನು.|മീനു കേക്ക് കൊണ്ടുവന്നു. ബിട്ടു ബലൂണുകൾ കൊണ്ടുവന്നു.|మీనూ కేక్ తెచ్చింది. బిట్టూ బెలూన్లు తెచ్చాడు.|मीनू केक घेऊन आली. बिट्टू फुगे घेऊन आला.
elephant,girl,boy|cheer|सबने गाना गाया। गजू बहुत खुश हुआ।|sabne gaana gaaya. gajoo bahut khush hua.|Everyone sang a song. Gajju was very happy.|எல்லோரும் பாட்டு பாடினார்கள். கஜூ மிகவும் மகிழ்ந்தான்.|ಎಲ್ಲರೂ ಹಾಡು ಹಾಡಿದರು. ಗಜೂ ತುಂಬಾ ಖುಷಿಪಟ್ಟನು.|എല്ലാവരും പാട്ടു പാടി. ഗജു വളരെ സന്തോഷിച്ചു.|అందరూ పాట పాడారు. గజూ చాలా సంతోషించాడు.|सगळ्यांनी गाणे गायले. गजू खूप आनंदी झाला.
elephant|think|गजू ने मोमबत्ती बुझाई। उसने मन में इच्छा माँगी।|gajoo ne mombattee bujhaee. usne man mein ichchha maangee.|Gajju blew out the candle. He made a wish in his mind.|கஜூ மெழுகுவர்த்தியை ஊதி அணைத்தான். அவன் மனதில் ஒரு ஆசை வேண்டினான்.|ಗಜೂ ಮೇಣದಬತ್ತಿ ಆರಿಸಿದನು. ಅವನು ಮನಸ್ಸಿನಲ್ಲಿ ಆಸೆ ಬೇಡಿಕೊಂಡನು.|ഗജു മെഴുകുതിരി ഊതിക്കെടുത്തി. അവൻ മനസ്സിൽ ഒരു ആഗ്രഹം ചോദിച്ചു.|గజూ కొవ్వొత్తిని ఆర్పాడు. అతను మనసులో కోరిక కోరుకున్నాడు.|गजूने मेणबत्ती विझवली. त्याने मनात इच्छा मागितली.
elephant,girl,boy|cheer|सबने केक खाया। यह बहुत मीठा था।|sabne kek khaaya. yah bahut meetha tha.|Everyone ate the cake. It was very sweet.|எல்லோரும் கேக் சாப்பிட்டார்கள். அது மிகவும் இனிப்பாக இருந்தது.|ಎಲ್ಲರೂ ಕೇಕ್ ತಿಂದರು. ಅದು ತುಂಬಾ ಸಿಹಿಯಾಗಿತ್ತು.|എല്ലാവരും കേക്ക് കഴിച്ചു. അത് വളരെ മധുരമുള്ളതായിരുന്നു.|అందరూ కేక్ తిన్నారు. అది చాలా తీపిగా ఉంది.|सगळ्यांनी केक खाल्ला. तो खूप गोड होता.
@3|market|🍋|मीनू का बाज़ार|meenoo ka baazaar|Meenu at the Market|மீனு சந்தையில்|ಮೀನು ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ|മീനു ചന്തയിൽ|మీనూ బజారులో|बाजारात मीनू
girl|happy|मीनू माँ के साथ बाज़ार गई।|meenoo maan ke saath baazaar gaee.|Meenu went to the market with mother.|மீனு அம்மாவுடன் சந்தைக்குச் சென்றாள்.|ಮೀನು ಅಮ್ಮನ ಜೊತೆ ಮಾರುಕಟ್ಟೆಗೆ ಹೋದಳು.|മീനു അമ്മയോടൊപ്പം ചന്തയിൽ പോയി.|మీనూ అమ్మతో కలిసి బజారుకు వెళ్లింది.|मीनू आईसोबत बाजारात गेली.
girl,parrot|happy|वहाँ आम, केले और सेब थे।|vahaan aam, kele aur seb the.|There were mangoes, bananas and apples there.|அங்கே மாம்பழம், வாழைப்பழம், ஆப்பிள் இருந்தன.|ಅಲ್ಲಿ ಮಾವಿನಹಣ್ಣು, ಬಾಳೆಹಣ್ಣು, ಸೇಬು ಇದ್ದವು.|അവിടെ മാമ്പഴവും വാഴപ്പഴവും ആപ്പിളും ഉണ്ടായിരുന്നു.|అక్కడ మామిడి, అరటి, యాపిల్ పండ్లు ఉన్నాయి.|तिथे आंबे, केळी आणि सफरचंद होते.
girl,parrot|think|मीनू ने पूछा, "आम कितने के हैं?"|meenoo ne poochha, "aam kitne ke hain?"|Meenu asked, "How much are the mangoes?"|மீனு கேட்டாள், "மாம்பழம் என்ன விலை?"|ಮೀನು ಕೇಳಿದಳು, "ಮಾವಿನಹಣ್ಣು ಎಷ್ಟು?"|മീനു ചോദിച്ചു, "മാമ്പഴത്തിന് എത്രയാണ്?"|మీనూ అడిగింది, "మామిడి పండ్లు ఎంత?"|मीनूने विचारले, "आंबे किती रुपयांचे आहेत?"
parrot|happy|दुकानदार बोला, "चालीस रुपये किलो।"|dukaandaar bola, "chaalees rupaye kilo."|The shopkeeper said, "Forty rupees a kilo."|கடைக்காரர் சொன்னார், "கிலோ நாற்பது ரூபாய்."|ಅಂಗಡಿಯವನು ಹೇಳಿದನು, "ಕಿಲೋಗೆ ನಲವತ್ತು ರೂಪಾಯಿ."|കടക്കാരൻ പറഞ്ഞു, "കിലോയ്ക്ക് നാല്പത് രൂപ."|దుకాణదారుడు అన్నాడు, "కిలో నలభై రూపాయలు."|दुकानदार म्हणाला, "किलोला चाळीस रुपये."
girl|cheer|मीनू ने दो किलो आम लिए। वह घर लौट आई।|meenoo ne do kilo aam liye. vah ghar laut aaee.|Meenu bought two kilos of mangoes. She came back home.|மீனு இரண்டு கிலோ மாம்பழம் வாங்கினாள். அவள் வீடு திரும்பினாள்.|ಮೀನು ಎರಡು ಕಿಲೋ ಮಾವಿನಹಣ್ಣು ತೆಗೆದುಕೊಂಡಳು. ಅವಳು ಮನೆಗೆ ಮರಳಿದಳು.|മീനു രണ്ടു കിലോ മാമ്പഴം വാങ്ങി. അവൾ വീട്ടിലേക്ക് മടങ്ങി.|మీనూ రెండు కిలోల మామిడి పండ్లు కొన్నది. ఆమె ఇంటికి తిరిగి వచ్చింది.|मीनूने दोन किलो आंबे घेतले. ती घरी परतली.
@4|rain|☔|बारिश का दिन|baarish ka din|The Rainy Day|மழை நாள்|ಮಳೆಯ ದಿನ|മഴയുള്ള ദിവസം|వానా రోజు|पावसाचा दिवस
boy|sad|आसमान में काले बादल छा गए।|aasmaan mein kaale baadal chha gaye.|Dark clouds covered the sky.|வானத்தில் கருமேகங்கள் சூழ்ந்தன.|ಆಕಾಶದಲ್ಲಿ ಕಪ್ಪು ಮೋಡಗಳು ಕವಿದವು.|ആകാശത്ത് കാർമേഘങ്ങൾ നിറഞ്ഞു.|ఆకాశంలో నల్లని మేఘాలు కమ్ముకున్నాయి.|आकाशात काळे ढग दाटून आले.
boy,cat|cheer|ज़ोर से बारिश होने लगी।|zor se baarish hone lagee.|It began to rain hard.|பலத்த மழை பெய்யத் தொடங்கியது.|ಜೋರಾಗಿ ಮಳೆ ಬರಲು ಶುರುವಾಯಿತು.|ശക്തമായി മഴ പെയ്യാൻ തുടങ്ങി.|జోరుగా వాన కురవడం మొదలైంది.|जोरात पाऊस पडू लागला.
boy|happy|बिट्टू ने छाता खोला।|bittoo ne chhaata khola.|Bittu opened the umbrella.|பிட்டு குடையை விரித்தான்.|ಬಿಟ್ಟು ಛತ್ರಿ ತೆರೆದನು.|ബിട്ടു കുട നിവർത്തി.|బిట్టూ గొడుగు తెరిచాడు.|बिट्टूने छत्री उघडली.
boy,cat|cheer|बिल्लू भीग रहा था। बिट्टू ने उसे बुलाया।|billoo bheeg raha tha. bittoo ne use bulaaya.|Billu was getting wet. Bittu called him.|பில்லு நனைந்து கொண்டிருந்தான். பிட்டு அவனை அழைத்தான்.|ಬಿಲ್ಲೂ ಒದ್ದೆಯಾಗುತ್ತಿದ್ದನು. ಬಿಟ್ಟು ಅವನನ್ನು ಕರೆದನು.|ബില്ലു നനയുകയായിരുന്നു. ബിട്ടു അവനെ വിളിച്ചു.|బిల్లూ తడిసిపోతున్నాడు. బిట్టూ అతడిని పిలిచాడు.|बिल्लू भिजत होता. बिट्टूने त्याला बोलावले.
boy,cat|cheer|दोनों छाते के नीचे घर गए।|donon chhaate ke neeche ghar gaye.|Both went home under the umbrella.|இருவரும் குடையின் கீழ் வீட்டுக்குச் சென்றனர்.|ಇಬ್ಬರೂ ಛತ್ರಿಯ ಕೆಳಗೆ ಮನೆಗೆ ಹೋದರು.|രണ്ടുപേരും കുടയുടെ കീഴിൽ വീട്ടിലേക്ക് പോയി.|ఇద్దరూ గొడుగు కింద ఇంటికి వెళ్లారు.|दोघे छत्रीखाली घरी गेले.
@5|home|🥛|बिल्लू और दूध|billoo aur doodh|Billu and the Milk|பில்லுவும் பாலும்|ಬಿಲ್ಲೂ ಮತ್ತು ಹಾಲು|ബില്ലുവും പാലും|బిల్లూ – పాలు|बिल्लू आणि दूध
cat|happy|बिल्लू को दूध बहुत पसंद है।|billoo ko doodh bahut pasand hai.|Billu likes milk very much.|பில்லுவுக்குப் பால் மிகவும் பிடிக்கும்.|ಬಿಲ್ಲೂಗೆ ಹಾಲು ತುಂಬಾ ಇಷ್ಟ.|ബില്ലുവിന് പാൽ വളരെ ഇഷ്ടമാണ്.|బిల్లూకి పాలు చాలా ఇష్టం.|बिल्लूला दूध खूप आवडते.
cat|think|रसोई में दूध का कटोरा रखा था।|rasoee mein doodh ka katora rakha tha.|A bowl of milk was kept in the kitchen.|சமையலறையில் பால் கிண்ணம் வைக்கப்பட்டிருந்தது.|ಅಡುಗೆಮನೆಯಲ್ಲಿ ಹಾಲಿನ ಬಟ್ಟಲು ಇಟ್ಟಿತ್ತು.|അടുക്കളയിൽ പാൽ പാത്രം വച്ചിരുന്നു.|వంటగదిలో పాల గిన్నె ఉంచబడింది.|स्वयंपाकघरात दुधाची वाटी ठेवली होती.
cat|cheer|बिल्लू चुपके से अंदर गया।|billoo chupke se andar gaya.|Billu went in quietly.|பில்லு மெதுவாக உள்ளே சென்றான்.|ಬಿಲ್ಲೂ ಮೆಲ್ಲಗೆ ಒಳಗೆ ಹೋದನು.|ബില്ലു പതുക്കെ അകത്തു പോയി.|బిల్లూ చప్పుడు లేకుండా లోపలికి వెళ్లాడు.|बिल्लू हळूच आत गेला.
cat,girl|sad|तभी मीनू आ गई। बिल्लू डर गया।|tabhee meenoo aa gaee. billoo dar gaya.|Just then Meenu came. Billu got scared.|அப்போது மீனு வந்தாள். பில்லு பயந்தான்.|ಆಗಲೇ ಮೀನು ಬಂದಳು. ಬಿಲ್ಲೂ ಹೆದರಿದನು.|അപ്പോൾ മീനു വന്നു. ബില്ലു പേടിച്ചു.|అప్పుడే మీనూ వచ్చింది. బిల్లూ భయపడ్డాడు.|तेवढ्यात मीनू आली. बिल्लू घाबरला.
cat,girl|cheer|मीनू हँसी और उसे दूध दिया।|meenoo hansee aur use doodh diya.|Meenu laughed and gave him milk.|மீனு சிரித்து அவனுக்குப் பால் கொடுத்தாள்.|ಮೀನು ನಕ್ಕು ಅವನಿಗೆ ಹಾಲು ಕೊಟ್ಟಳು.|മീനു ചിരിച്ച് അവന് പാൽ കൊടുത്തു.|మీనూ నవ్వి అతనికి పాలు ఇచ్చింది.|मीनू हसली आणि त्याला दूध दिले.
@6|school|🏫|बिट्टू का स्कूल|bittoo ka skool|Bittu's School Day|பிட்டுவின் பள்ளி நாள்|ಬಿಟ್ಟುವಿನ ಶಾಲಾ ದಿನ|ബിട്ടുവിന്റെ സ്കൂൾ ദിവസം|బిట్టూ బడి రోజు|बिट्टूचा शाळेचा दिवस
boy|happy|बिट्टू सुबह स्कूल गया।|bittoo subah skool gaya.|Bittu went to school in the morning.|பிட்டு காலையில் பள்ளிக்குச் சென்றான்.|ಬಿಟ್ಟು ಬೆಳಿಗ್ಗೆ ಶಾಲೆಗೆ ಹೋದನು.|ബിട്ടു രാവിലെ സ്കൂളിൽ പോയി.|బిట్టూ ఉదయం బడికి వెళ్లాడు.|बिट्टू सकाळी शाळेत गेला.
parrot|happy|शिक्षक ने कहा, "नमस्ते बच्चो!"|shikshak ne kaha, "namaste bachcho!"|The teacher said, "Hello, children!"|ஆசிரியர் சொன்னார், "வணக்கம் குழந்தைகளே!"|ಶಿಕ್ಷಕರು ಹೇಳಿದರು, "ನಮಸ್ತೆ ಮಕ್ಕಳೇ!"|അധ്യാപകൻ പറഞ്ഞു, "നമസ്തേ കുട്ടികളേ!"|ఉపాధ్యాయుడు అన్నాడు, "నమస్తే పిల్లలూ!"|शिक्षक म्हणाले, "नमस्ते मुलांनो!"
boy,girl|think|बच्चों ने हिंदी की किताब खोली।|bachchon ne hindee kee kitaab kholee.|The children opened the Hindi book.|குழந்தைகள் இந்திப் புத்தகத்தைத் திறந்தனர்.|ಮಕ್ಕಳು ಹಿಂದಿ ಪುಸ್ತಕ ತೆರೆದರು.|കുട്ടികൾ ഹിന്ദി പുസ്തകം തുറന്നു.|పిల్లలు హిందీ పుస్తకం తెరిచారు.|मुलांनी हिंदीचे पुस्तक उघडले.
boy|cheer|बिट्टू ने बोर्ड पर "आम" लिखा।|bittoo ne bord par "aam" likha.|Bittu wrote "आम" (mango) on the board.|பிட்டு பலகையில் "आम" (மாம்பழம்) என்று எழுதினான்.|ಬಿಟ್ಟು ಬೋರ್ಡ್ ಮೇಲೆ "आम" (ಮಾವಿನಹಣ್ಣು) ಎಂದು ಬರೆದನು.|ബിട്ടു ബോർഡിൽ "आम" (മാമ്പഴം) എന്ന് എഴുതി.|బిట్టూ బోర్డు మీద "आम" (మామిడి) అని రాశాడు.|बिट्टूने फळ्यावर "आम" (आंबा) लिहिले.
parrot,boy|cheer|शिक्षक ने कहा, "शाबाश बिट्टू!"|shikshak ne kaha, "shaabaash bittoo!"|The teacher said, "Well done, Bittu!"|ஆசிரியர் சொன்னார், "சபாஷ் பிட்டு!"|ಶಿಕ್ಷಕರು ಹೇಳಿದರು, "ಶಾಬಾಷ್ ಬಿಟ್ಟು!"|അധ്യാപകൻ പറഞ്ഞു, "ശാബാഷ് ബിട്ടു!"|ఉపాధ్యాయుడు అన్నాడు, "శభాష్ బిట్టూ!"|शिक्षक म्हणाले, "शाब्बास बिट्टू!"
@7|river|🧺|नदी किनारे पिकनिक|nadee kinaare piknik|Picnic by the River|ஆற்றங்கரைப் பிக்னிக்|ನದಿ ತೀರದ ಪಿಕ್ನಿಕ್|പുഴക്കരയിലെ പിക്നിക്|నది ఒడ్డున పిక్నిక్|नदीकाठी सहल
girl,boy,elephant|happy|रविवार को सब नदी किनारे गए।|ravivaar ko sab nadee kinaare gaye.|On Sunday, everyone went to the riverside.|ஞாயிற்றுக்கிழமை எல்லோரும் ஆற்றங்கரைக்குச் சென்றனர்.|ಭಾನುವಾರ ಎಲ್ಲರೂ ನದಿ ತೀರಕ್ಕೆ ಹೋದರು.|ഞായറാഴ്ച എല്ലാവരും പുഴക്കരയിൽ പോയി.|ఆదివారం అందరూ నది ఒడ్డుకు వెళ్లారు.|रविवारी सगळे नदीकाठी गेले.
girl|happy|मीनू खाना लाई थी। उसमें पूरी और आलू थे।|meenoo khaana laee thee. usmein pooree aur aaloo the.|Meenu had brought food. It had puri and potatoes.|மீனு உணவு கொண்டு வந்திருந்தாள். அதில் பூரியும் உருளைக்கிழங்கும் இருந்தன.|ಮೀನು ಊಟ ತಂದಿದ್ದಳು. ಅದರಲ್ಲಿ ಪೂರಿ ಮತ್ತು ಆಲೂಗಡ್ಡೆ ಇದ್ದವು.|മീനു ഭക്ഷണം കൊണ്ടുവന്നിരുന്നു. അതിൽ പൂരിയും ഉരുളക്കിഴങ്ങും ഉണ്ടായിരുന്നു.|మీనూ భోజనం తెచ్చింది. అందులో పూరీ, బంగాళాదుంపలు ఉన్నాయి.|मीनूने जेवण आणले होते. त्यात पुरी आणि बटाटे होते.
elephant|cheer|गजू ने सूँड से पानी उछाला।|gajoo ne soond se paanee uchhaala.|Gajju splashed water with his trunk.|கஜூ தும்பிக்கையால் தண்ணீரைத் தெளித்தான்.|ಗಜೂ ಸೊಂಡಿಲಿನಿಂದ ನೀರು ಚಿಮ್ಮಿಸಿದನು.|ഗജു തുമ്പിക്കൈ കൊണ്ട് വെള്ളം തെറിപ്പിച്ചു.|గజూ తొండంతో నీళ్లు చిమ్మాడు.|गजूने सोंडेने पाणी उडवले.
boy,girl|cheer|बिट्टू और मीनू खूब हँसे।|bittoo aur meenoo khoob hanse.|Bittu and Meenu laughed a lot.|பிட்டுவும் மீனுவும் நிறையச் சிரித்தனர்.|ಬಿಟ್ಟು ಮತ್ತು ಮೀನು ಬಹಳ ನಕ್ಕರು.|ബിട്ടുവും മീനുവും ഒരുപാട് ചിരിച്ചു.|బిట్టూ, మీనూ బాగా నవ్వారు.|बिट्टू आणि मीनू खूप हसले.
girl,boy,elephant|happy|शाम को सब घर लौटे। दिन बहुत अच्छा था।|shaam ko sab ghar laute. din bahut achchha tha.|In the evening everyone returned home. The day was very good.|மாலையில் எல்லோரும் வீடு திரும்பினர். நாள் மிகவும் நன்றாக இருந்தது.|ಸಂಜೆ ಎಲ್ಲರೂ ಮನೆಗೆ ಮರಳಿದರು. ದಿನ ಬಹಳ ಚೆನ್ನಾಗಿತ್ತು.|വൈകുന്നേരം എല്ലാവരും വീട്ടിലേക്ക് മടങ്ങി. ദിവസം വളരെ നല്ലതായിരുന്നു.|సాయంత్రం అందరూ ఇంటికి తిరిగి వచ్చారు. రోజు చాలా బాగుంది.|संध्याकाळी सगळे घरी परतले. दिवस खूप छान गेला.
@8|night|🌙|तारों भरी रात|taaron bharee raat|The Starry Night|நட்சத்திர இரவு|ತಾರೆಗಳ ರಾತ್ರಿ|നക്ഷത്രങ്ങൾ നിറഞ്ഞ രാത്രി|తారల రాత్రి|चांदण्यांची रात्र
girl|happy|रात हो गई। आसमान में तारे चमक रहे थे।|raat ho gaee. aasmaan mein taare chamak rahe the.|Night fell. Stars were shining in the sky.|இரவு ஆனது. வானத்தில் நட்சத்திரங்கள் மின்னின.|ರಾತ್ರಿಯಾಯಿತು. ಆಕಾಶದಲ್ಲಿ ನಕ್ಷತ್ರಗಳು ಹೊಳೆಯುತ್ತಿದ್ದವು.|രാത്രിയായി. ആകാശത്ത് നക്ഷത്രങ്ങൾ തിളങ്ങുകയായിരുന്നു.|రాత్రి అయింది. ఆకాశంలో నక్షత్రాలు మెరుస్తున్నాయి.|रात्र झाली. आकाशात तारे चमकत होते.
girl,cat|think|मीनू और बिल्लू छत पर बैठे थे।|meenoo aur billoo chhat par baithe the.|Meenu and Billu were sitting on the roof.|மீனுவும் பில்லுவும் மாடியில் அமர்ந்திருந்தனர்.|ಮೀನು ಮತ್ತು ಬಿಲ್ಲೂ ಮಾಳಿಗೆಯ ಮೇಲೆ ಕುಳಿತಿದ್ದರು.|മീനുവും ബില്ലുവും മട്ടുപ്പാവിൽ ഇരിക്കുകയായിരുന്നു.|మీనూ, బిల్లూ మేడ మీద కూర్చున్నారు.|मीनू आणि बिल्लू गच्चीवर बसले होते.
girl|think|मीनू ने पूछा, "चाँद कहाँ है?"|meenoo ne poochha, "chaand kahaan hai?"|Meenu asked, "Where is the moon?"|மீனு கேட்டாள், "நிலா எங்கே?"|ಮೀನು ಕೇಳಿದಳು, "ಚಂದ್ರ ಎಲ್ಲಿ?"|മീനു ചോദിച്ചു, "ചന്ദ്രൻ എവിടെ?"|మీనూ అడిగింది, "చంద్రుడు ఎక్కడ?"|मीनूने विचारले, "चंद्र कुठे आहे?"
girl,cat|cheer|चाँद बादल के पीछे से निकल आया।|chaand baadal ke peechhe se nikal aaya.|The moon came out from behind the cloud.|நிலா மேகத்தின் பின்னாலிருந்து வெளியே வந்தது.|ಚಂದ್ರ ಮೋಡದ ಹಿಂದಿನಿಂದ ಹೊರಬಂದನು.|ചന്ദ്രൻ മേഘത്തിന്റെ പിന്നിൽ നിന്ന് പുറത്തുവന്നു.|చంద్రుడు మేఘం వెనుక నుండి బయటకు వచ్చాడు.|चंद्र ढगाच्या मागून बाहेर आला.
girl,cat|happy|मीनू बोली, "शुभ रात्रि, चाँद!"|meenoo bolee, "shubh raatri, chaand!"|Meenu said, "Good night, moon!"|மீனு சொன்னாள், "இனிய இரவு, நிலாவே!"|ಮೀನು ಹೇಳಿದಳು, "ಶುಭ ರಾತ್ರಿ, ಚಂದ್ರ!"|മീനു പറഞ്ഞു, "ശുഭ രാത്രി, ചന്ദ്രാ!"|మీనూ అంది, "శుభ రాత్రి, చంద్రా!"|मीनू म्हणाली, "शुभ रात्री, चंद्रा!"`;
  const BG = { desert: ['☀️', ['🌵', '🪨'], ['🌵', '🏺', '🌵']], home: ['🌤️', ['🎈', '🎉', '🎈'], ['🪑', '🎂', '🪑']], market: ['☀️', ['🍎', '🍌', '🥭'], ['🧺', '🥕', '🧺']], rain: ['🌧️', ['☁️', '☁️', '☁️'], ['🌳', '🌷', '🌳']], school: ['☀️', ['📚', '🔔', '✏️'], ['🏫', '🌳']], river: ['☀️', ['🦋', '☁️'], ['🌴', '🧺', '🌴']], night: ['🌙', ['⭐', '✨', '⭐', '✨'], ['🏠', '🪴']], forest: ['☀️', ['🌳'], ['🌲', '🌳']] };
  const stories = []; let cur = null;
  RAW.split('\n').forEach(l => {
    l = l.trim(); if (!l) return; const f = l.split('|');
    if (l[0] === '@') { cur = { id: +f[0].slice(1), bg: f[1], em: f[2], hi: f[3], ro: f[4], t: f.slice(5, 11), sc: [] }; stories.push(cur); }
    else if (cur && f.length === 10) cur.sc.push({ ch: f[0].split(','), m: f[1], hi: f[2], ro: f[3], tr: f.slice(4, 10) });
  });
  window.STORIES = stories;
  const cover = { desert: 'linear-gradient(#ffe3b8,#f3c97a)', home: 'linear-gradient(#ffe0ec,#ffc2d6)', market: 'linear-gradient(#fff0b8,#ffd37a)', rain: 'linear-gradient(#b9c8e8,#8ea6d6)', school: 'linear-gradient(#ffe9a8,#ffbf69)', river: 'linear-gradient(#bfe8ff,#7cc7f0)', night: 'linear-gradient(#33316e,#5b4fa8)', forest: 'linear-gradient(#c7f0cd,#7fd38f)' };
  const tt = s => s.t[li()] || s.t[0];
  const line = (sc) => sc.tr[li()] || sc.tr[0];
  const strip = s => s.replace(/[।?!.,"“”]/g, '').trim();
  let SS = { s: 0, i: 0, mode: 'read', showTr: true, q: [], qi: 0, ok: 0 };
  const st = () => stories[SS.s];

  function shelf(el) {
    const done = state.storiesRead;
    el.innerHTML = '<div class="hello" style="background:linear-gradient(135deg,#7c5cff,#ff4f8b);margin-bottom:14px"><div class="hello-top"><div>' + Toon.svg('girl', 'cheer', 92) + '</div><div class="speech"><span class="dev">कहानी सुनो!</span>kahaanee suno</div></div><h1>' + esc(tr('storyT')) + '</h1><p>' + esc(tr('storySub')) + '</p></div>' +
      '<div class="shelf">' + stories.map((s, k) => '<button class="book' + (done.includes(s.id) ? ' done' : '') + '" data-act="story" data-k="' + k + '"><div class="cover" style="background:' + cover[s.bg] + '"><em>' + s.em + '</em><i>' + s.sc.length + ' 📄</i>' + Toon.svg(s.sc[0].ch[0], 'happy', 92) + '</div><div class="info"><span class="dev">' + esc(s.hi) + '</span><b>' + esc(tt(s)) + '</b></div></button>').join('') + '</div>' +
      (state.journal.length ? '<div class="sec mt2"><h2 class="h2">✍️ ' + esc(tr('journalK')) + '</h2><span class="sub">' + state.journal.length + '</span></div><div id="journal">' + state.journal.slice().reverse().slice(0, 12).map(j => '<div class="jitem"><small>' + esc(j.t) + ' · ' + esc(j.d) + '</small><p class="dev">' + esc(j.x) + '</p></div>').join('') + '</div>' : '');
  }

  function sceneHtml(s, sc) {
    const b = BG[s.bg] || BG.forest;
    return '<div class="scene ' + s.bg + '"><span class="sun">' + b[0] + '</span><div class="props">' + b[1].map(x => '<span>' + x + '</span>').join('') + '</div><div class="ground">' + b[2].map(x => '<span>' + x + '</span>').join('') + '</div><div class="actors">' + sc.ch.map(c => Toon.svg(c, sc.m, sc.ch.length > 2 ? 78 : 96)).join('') + '</div></div>';
  }
  function open(k) { SS = { s: k, i: 0, mode: 'read', showTr: true, q: [], qi: 0, ok: 0 }; drawRead(); }
  function drawRead() {
    const s = st(), sc = s.sc[SS.i], last = SS.i === s.sc.length - 1;
    const words = sc.hi.split(' ').map(w => '<button class="w dev" data-act="say" data-t="' + esc(strip(w)) + '">' + esc(w) + '</button>').join(' ');
    S.set({ kicker: '📖 ' + esc(tr('readK')) + ' · ' + (SS.i + 1) + '/' + s.sc.length, title: s.em + ' ' + esc(s.hi), right: '<button class="play" data-act="say" data-t="' + esc(sc.hi) + '" aria-label="Listen" style="margin-left:auto">🔊</button>',
      steps: '<div class="qprog" style="margin:0;width:100%">' + s.sc.map((_, n) => '<i class="' + (n < SS.i ? 'past' : n === SS.i ? 'now' : '') + '"></i>').join('') + '</div>',
      body: sceneHtml(s, sc) + '<div class="card mt story-line"><div class="sline">' + words + '</div><div class="ro" style="color:var(--violet-d);font-style:italic;font-weight:700;margin-top:6px">' + esc(sc.ro) + '</div>' + (SS.showTr ? '<div class="mn" style="margin-top:6px;font-weight:700">' + esc(line(sc)) + '</div>' : '') + '<p class="sub mt">👆 ' + esc(tr('tapWord')) + '</p></div>',
      foot: '<button class="btn ghost" data-act="sprevp"' + (SS.i ? '' : ' disabled') + '>←</button><button class="btn ghost" data-act="strtog">' + (SS.showTr ? '🙈' : '👁️') + '</button>' + (last ? '<button class="btn green" data-act="swrite">✍️ ' + esc(tr('writeK')) + ' →</button>' : '<button class="btn" data-act="snextp">→</button>') });
    setTimeout(() => speak(sc.hi), 250);
  }
  // ---- writing: build questions
  function build() {
    const s = st(), idx = shuffle(s.sc.map((_, i) => i)), q = [];
    idx.slice(0, 2).forEach(i => q.push({ t: 'arr', sc: s.sc[i] }));
    idx.slice(2, 4).forEach(i => {
      const sc = s.sc[i], sent = sc.hi.split('।')[0].split(' ').filter(Boolean), cand = sent.map((w, n) => [w, n]).filter(x => strip(x[0]).length > 2);
      const pickw = cand.length ? rnd(cand) : [sent[sent.length - 1], sent.length - 1]; q.push({ t: 'fill', sc, sent, bi: pickw[1] });
    });
    q.push({ t: 'end' }); return q;
  }
  function startWrite() { SS.mode = 'write'; SS.q = build(); SS.qi = 0; SS.ok = 0; drawQ(); }
  const bar = () => '<div class="qprog">' + SS.q.map((_, n) => '<i class="' + (n < SS.qi ? 'past' : n === SS.qi ? 'now' : '') + '"></i>').join('') + '</div>';
  function drawQ() {
    const s = st(), q = SS.q[SS.qi], head = { kicker: '✍️ ' + esc(tr('writeK')) + ' · ' + (SS.qi + 1) + '/' + SS.q.length, title: s.em + ' ' + esc(s.hi) };
    if (q.t === 'arr') {
      const first = q.sc.hi.split('।')[0] + (q.sc.hi.indexOf('।') >= 0 ? '।' : ''), words = first.split(' ').filter(Boolean); q.words = words; q.pool = shuffle(words.map((w, i) => ({ w, i }))); q.put = [];
      S.set(Object.assign(head, { body: bar() + '<div class="card"><p class="sub" style="font-weight:800">' + esc(tr('arrangeQ')) + '</p><p class="mt" style="font-weight:700">' + esc(line(q.sc).split(/[.।]/)[0]) + '.</p></div><div class="arr-box mt" id="arrBox"></div><div class="arr-pool mt" id="arrPool"></div><div id="fb"></div>', foot: '<button class="btn ghost" data-act="arrreset">↺</button><button class="btn" id="qnext" data-act="arrcheck">' + esc(tr('checkK')) + '</button>' }));
      drawArr();
    } else if (q.t === 'fill') {
      const ans = q.sent[q.bi], allW = stories.flatMap(x => x.sc.flatMap(y => y.hi.split(/[ ।]/).filter(z => strip(z).length > 2))), ds = shuffle(Array.from(new Set(allW.filter(w => w !== ans && !q.sent.includes(w))))).slice(0, 3);
      q.ans = ans; q.opts = shuffle([ans].concat(ds));
      const sent = q.sent.map((w, n) => n === q.bi ? '<span class="blank">＿＿＿</span>' : esc(w)).join(' ');
      S.set(Object.assign(head, { body: bar() + '<div class="card"><p class="sub" style="font-weight:800">' + esc(tr('fillQ')) + '</p><p class="mt" style="font-weight:700">' + esc(line(q.sc).split(/[.।]/)[0]) + '.</p><div class="qshow txt mt" style="font-size:26px">' + sent + '</div></div><div class="opts mt" id="opts">' + q.opts.map(x => '<button class="opt dv" data-act="sfill">' + esc(x) + '</button>').join('') + '</div><div id="fb"></div>', foot: '<button class="btn block" id="qnext" data-act="sqnext" disabled>→</button>' }));
    } else {
      S.set(Object.assign(head, { body: bar() + '<div class="teach">' + Toon.svg('parrot', 'think', 84) + '<div class="bubble">' + esc(tr('endingQ')) + '<div class="focus">' + esc(s.sc[s.sc.length - 1].hi) + '</div></div></div><textarea id="kbTarget" class="txt mt" style="min-height:90px" inputmode="none" placeholder="' + esc(tr('typeHere')) + '"></textarea>' + kbHtml(), foot: '<button class="btn block green" data-act="ssave">💾 ' + esc(tr('saveK')) + '</button>' }));
    }
  }
  function drawArr() {
    const q = SS.q[SS.qi];
    $('arrBox').innerHTML = q.put.map(n => '<button class="wd in" data-act="arrput" data-n="' + n.i + '">' + esc(n.w) + '</button>').join('');
    $('arrPool').innerHTML = q.pool.filter(n => !q.put.includes(n)).map(n => '<button class="wd" data-act="arrtake" data-n="' + n.i + '">' + esc(n.w) + '</button>').join('');
  }
  function fin(ok, ans) { const fb = $('fb'); fb.innerHTML = '<div class="fb ' + (ok ? 'good' : 'bad') + '">' + Toon.svg(rnd(CHARS), ok ? 'cheer' : 'sad', 54) + '<div>' + (ok ? '🎉 ' + esc(tr('correct')) : esc(tr('wrong')) + ' <b class="dev">' + esc(ans) + '</b>') + '</div></div>'; if (ok) { SS.ok++; award(3); } speak(ans); }
  function nextQ() { SS.qi++; drawQ(); }
  function done(text) {
    const s = st(); if (!state.storiesRead.includes(s.id)) state.storiesRead.push(s.id);
    if (text) state.journal.push({ t: s.hi, d: new Date().toLocaleDateString(), x: text });
    award(15 + (text ? 10 : 0)); store.set('hm-progress', JSON.stringify(state)); checkBadges(); confetti();
    S.set({ kicker: '🎉', title: esc(tr('goodJob')), body: '<div class="result">' + Toon.svg('parrot', 'cheer', 140) + '<h2 class="h2 mt" style="font-size:26px">' + esc(tr('goodJob')) + '</h2><div class="score">' + SS.ok + ' / ' + (SS.q.length - 1) + '</div><div class="rewards"><span class="reward">⭐ +' + (15 + (text ? 10 : 0)) + ' XP</span></div></div>' + (text ? '<div class="card mt"><small class="sub">' + esc(tr('journalK')) + '</small><p class="dev" style="font-size:20px">' + esc(text) + '</p></div>' : ''), foot: '<button class="btn ghost" data-act="close">✓</button>' + (SS.s + 1 < stories.length ? '<button class="btn green" data-act="story" data-k="' + (SS.s + 1) + '">📖 →</button>' : '') });
  }
  Object.assign(ACT, {
    story: el => open(+el.dataset.k), snextp: () => { SS.i++; drawRead(); }, sprevp: () => { if (SS.i) { SS.i--; drawRead(); } }, strtog: () => { SS.showTr = !SS.showTr; drawRead(); }, swrite: () => startWrite(),
    arrtake: el => { const q = SS.q[SS.qi], n = q.pool.find(x => x.i === +el.dataset.n); q.put.push(n); drawArr(); speak(strip(n.w)); },
    arrput: el => { const q = SS.q[SS.qi]; q.put = q.put.filter(x => x.i !== +el.dataset.n); drawArr(); },
    arrreset: () => { SS.q[SS.qi].put = []; drawArr(); },
    arrcheck: el => { const q = SS.q[SS.qi]; if (el.dataset.done) { nextQ(); return; } const ok = q.put.map(n => n.w).join(' ') === q.words.join(' '); fin(ok, q.words.join(' ')); el.dataset.done = 1; el.textContent = '→'; },
    sfill: el => { const q = SS.q[SS.qi]; if (q.locked) return; q.locked = 1; const ok = el.textContent === q.ans; document.querySelectorAll('#opts .opt').forEach(b => { b.classList.add('lock'); if (b.textContent === q.ans) b.classList.add('correct'); }); if (!ok) el.classList.add('wrong'); fin(ok, q.sent.join(' ')); $('qnext').disabled = false; },
    sqnext: () => nextQ(),
    ssave: () => { const v = ($('kbTarget').value || '').trim(); done(v); }
  });
  window.Stories = { shelf, open };
})();
