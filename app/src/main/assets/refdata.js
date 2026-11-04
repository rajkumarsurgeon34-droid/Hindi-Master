// Alphabet, weekday and month reference data (extracted from the original course app)
const REF=(()=>{
const vowels=[["अ","a","अदरक","ginger"],["आ","aa","आम","mango"],["इ","i","इमली","tamarind"],["ई","ee","ईख","sugarcane"],["उ","u","उल्लू","owl"],["ऊ","oo","ऊन","wool"],["ऋ","ri","ऋषि","sage"],["ए","e","एक","one"],["ऐ","ai","ऐनक","spectacles"],["ओ","o","ओस","dew"],["औ","au","औरत","woman"],["अं","am","अंगूर","grapes"],["अः","ah","दुःख","sorrow"]];
const groups=[["क-वर्ग","क ख ग घ ङ"],["च-वर्ग","च छ ज झ ञ"],["ट-वर्ग","ट ठ ड ढ ण"],["त-वर्ग","त थ द ध न"],["प-वर्ग","प फ ब भ म"],["अंतःस्थ","य र ल व"],["ऊष्म","श ष स ह"]];
const weekdays=[["सोमवार","Somvaar","Monday"],["मंगलवार","Mangalvaar","Tuesday"],["बुधवार","Budhvaar","Wednesday"],["गुरुवार","Guruvaar","Thursday"],["शुक्रवार","Shukravaar","Friday"],["शनिवार","Shanivaar","Saturday"],["रविवार","Ravivaar","Sunday"]];
const months=[["चैत्र","Chaitra","March–April"],["वैशाख","Vaishaakh","April–May"],["ज्येष्ठ","Jyeshtha","May–June"],["आषाढ़","Aashaadh","June–July"],["श्रावण","Shraavan","July–August"],["भाद्रपद","Bhaadrapad","August–September"],["आश्विन","Aashvin","September–October"],["कार्तिक","Kaartik","October–November"],["मार्गशीर्ष","Maargasheersh","November–December"],["पौष","Paush","December–January"],["माघ","Maagh","January–February"],["फाल्गुन","Phaalgun","February–March"]];
const marks=[["","a","अ"],["ा","aa","आ"],["ि","i","इ"],["ी","ee","ई"],["ु","u","उ"],["ू","oo","ऊ"],["ृ","ri","ऋ"],["े","e","ए"],["ै","ai","ऐ"],["ो","o","ओ"],["ौ","au","औ"],["ं","am","अं"],["ः","ah","अः"]];
const bases="क ख ग घ च छ ज झ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह क्ष त्र ज्ञ श्र".split(" ");
return {vowels,groups,weekdays,months,marks,bases};
})();
