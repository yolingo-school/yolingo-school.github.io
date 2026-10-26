/* Yolingo School — 10 themed quizzes × 3 questions, per locale. */
(() => {
  'use strict';
  const themes=[[["Hello","Bonjour","مرحبًا"],["Goodbye","Au revoir","وداعًا"],["Thank you","Merci","شكرًا"]],[["Please","S'il te plaît","من فضلك"],["Yes","Oui","نعم"],["No","Non","لا"]],[["Red","Rouge","أحمر"],["Blue","Bleu","أزرق"],["Green","Vert","أخضر"]],[["Cat","Chat","قط"],["Dog","Chien","كلب"],["Bird","Oiseau","طائر"]],[["Mother","Mère","أم"],["Father","Père","أب"],["Sister","Sœur","أخت"]],[["Apple","Pomme","تفاحة"],["Banana","Banane","موزة"],["Bread","Pain","خبز"]],[["Book","Livre","كتاب"],["Pen","Stylo","قلم"],["School","École","مدرسة"]],[["Sun","Soleil","شمس"],["Moon","Lune","قمر"],["Star","Étoile","نجمة"]],[["One","Un","واحد"],["Two","Deux","اثنان"],["Three","Trois","ثلاثة"]],[["Circle","Cercle","دائرة"],["Square","Carré","مربع"],["Triangle","Triangle","مثلث"]]];
  const shuffle=arr=>{
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  };
  const lastInTab={fr:-1,en:-1,ar:-1};
  function pick(language){
    const lang=['fr','en','ar'].includes(language)?language:'fr';
    let last=lastInTab[lang];
    try{
      const saved=sessionStorage.getItem('yolingo-last-quiz-'+lang);
      if(saved!==null&&Number.isInteger(Number(saved))&&Number(saved)>=0&&Number(saved)<themes.length)last=Number(saved);
    }catch(_){}
    let index=Math.floor(Math.random()*(last>=0?themes.length-1:themes.length));
    if(last>=0&&index>=last)index++;
    lastInTab[lang]=index;
    try{sessionStorage.setItem('yolingo-last-quiz-'+lang,String(index));}catch(_){}
    const group=themes[index];
    const choiceColumn=lang==='ar'?2:lang==='en'?1:0;
    const spokenColumn=lang==='en'?1:0;
    const speechLanguage=lang==='en'?'fr-FR':'en-GB';
    return shuffle(group.map(word=>{
      const question=lang==='ar'
        ?'ما معنى كلمة «'+word[0]+'» بالعربية؟'
        :lang==='en'
        ?'How do you say “'+word[0]+'” in French?'
        :'Comment dit-on « '+word[1]+' » en anglais ?';
      const choices=shuffle(group.map(entry=>entry[choiceColumn]));
      return [question,choices,choices.indexOf(word[choiceColumn]),word[spokenColumn],speechLanguage];
    }));
  }
  window.YolingoQuiz={pick,quizCount:themes.length,questionsPerQuiz:3};
})();