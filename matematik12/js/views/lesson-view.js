import {el,button,heading,list} from './dom.js';
import {renderVisual,renderWorkspace} from './visuals.js';
export function renderLesson(root,{lesson,tab,onTab,onPractice,onRead,onPrevious,onNext,onBack,read}){
 root.replaceChildren();root.append(button('← Sınıfın konularına dön',onBack,'back-button'));
 const header=el('div','lesson-heading');header.append(el('p','eyebrow',`${lesson.grade}. SINIF / ${lesson.group.toLocaleUpperCase('tr')}`),heading(lesson.title,1),el('p','lesson-subtitle','Önce anla, örneklerle keşfet, sonra kendin dene.'));root.append(header);
 const tabs=el('div','lesson-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Ders bölümleri');
 for(const [id,label]of [['learn','Konu anlatımı'],['examples','Çözümlü örnekler'],['practice','Alıştırmalar']]){const b=button(label,()=>onTab(id),'lesson-tab');b.id=`tab-${id}`;b.setAttribute('role','tab');b.setAttribute('aria-selected',String(tab===id));b.setAttribute('aria-controls','lesson-panel');b.onkeydown=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const arr=['learn','examples','practice'],idx=arr.indexOf(id);onTab(arr[(idx+(e.key==='ArrowRight'?1:2))%3]);}};tabs.append(b);}root.append(tabs);
 const panel=el('div','lesson-panel');panel.id='lesson-panel';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',`tab-${tab}`);root.append(panel);
 if(tab==='learn'){
  const goals=el('section','goal-card');goals.append(el('p','eyebrow','BU DERSTE'),list(lesson.objectives));panel.append(goals);
  const layout=el('div','reading-layout'),article=el('article','reading-card');for(const block of lesson.explanation){article.append(heading(block.heading));block.paragraphs.forEach(p=>article.append(el('p','',p)));}
  const aside=el('aside','visual-column');lesson.visuals.forEach(v=>aside.append(renderVisual(v)));const prior=el('div','prior-card');prior.append(heading('Başlamadan önce',3),list(lesson.prerequisites));aside.append(prior);layout.append(article,aside);panel.append(layout);
  const mistake=el('section','mistake-card');mistake.append(heading('Sık yapılan hata',3),el('p','',lesson.commonMistake));panel.append(mistake);
  const activity=el('section','activity-card');activity.append(el('p','eyebrow','DENE VE KEŞFET'),heading(lesson.activity.title),list(lesson.activity.steps,true),el('p','activity-check',lesson.activity.check));if(['models','symmetry','shapes','triangles','data'].includes(lesson.kind))activity.append(renderWorkspace(lesson.kind));panel.append(activity);
  const actions=el('div','lesson-actions');actions.append(button(read?'✓ Okundu olarak kaydedildi':'✓ Konuyu okudum',onRead,'secondary-button'),button('Çözümlü örnekleri incele →',()=>onTab('examples'),'primary-button'));panel.append(actions);
 }else if(tab==='examples'){
  panel.append(el('p','section-intro','Her örnekte önce soruyu oku. Adımları izlerken yalnızca işlemi değil, neden o işlemin seçildiğini de düşün.'));
  lesson.examples.forEach((example,i)=>{const card=el('article','example-card');card.append(el('p','eyebrow',`ÖRNEK ${i+1} / ${example.level}`),heading(example.prompt),heading('Verilenler ve istenen',3),el('p','',example.given+' '+example.wanted));if(example.visual)card.append(renderVisual(example.visual));card.append(heading('Adım adım çözüm',3),list(example.steps,true),el('p','example-answer',`Sonuç: ${example.answer}`),heading('Nasıl kontrol ederiz?',3),el('p','',example.check));panel.append(card);});
  panel.append(button('Şimdi kendim deneyeyim →',()=>onTab('practice'),'primary-button'));
 }else onPractice(panel);
 const nav=el('nav','lesson-navigation');nav.setAttribute('aria-label','Dersler arasında gezinme');if(onPrevious)nav.append(button('← Önceki konu',onPrevious,'secondary-button'));if(onNext)nav.append(button('Sonraki konu →',onNext,'secondary-button'));root.append(nav);
}
