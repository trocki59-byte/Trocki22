import {formatAnswer} from '../questions/answers.js';
import {detailFor} from './example-detail.js';
export const numberQ=(prompt,answer,steps,hint='Verilenleri ayır; hangi işlemin gerektiğini düşün.',visual)=>({type:'integer',prompt,answer,steps,hint,visual});
export function choiceQ(prompt,options,correct,steps,hint='Her seçeneği tanımla karşılaştır.',visual){return {type:'choice',prompt,choices:options.map((text,i)=>({id:String(i),text})),answer:String(correct),steps,hint,visual};}
export const fractionQ=(prompt,n,d,steps)=>({type:'fraction',prompt,answer:{numerator:n,denominator:d},steps,hint:'Pay, seçilen parçaları; payda, bütündeki eş parça sayısını gösterir.'});
export const tableVisual=(title,headers,rows)=>({type:'table',title,description:[headers.join(' · '),...rows.map(r=>r.join(' · '))].join('; '),data:{headers,rows}});
export function makeLesson(config,strategy,extra){
 const candidates=extra||Array.from({length:24},(_,i)=>strategy.question(i,config.grade));
 const unique=[...new Map(candidates.map(q=>[q.prompt,q])).values()];
 const exercises=unique.slice(0,10).map((q,i)=>({...q,id:`${config.id}-q${i+1}`,level:i<3?'kolay':i<7?'orta':'pekiştirme'}));
 const examples=[0,4,8].map((i,index)=>{const q=unique[i]||strategy.question(i+10,config.grade);return {id:`${config.id}-example${index+1}`,level:['Başlangıç','Bir adım ileri','Pekiştirme ve yorum'][index],prompt:q.prompt,...detailFor(q,config.kind),answer:formatAnswer(q),visual:q.visual};});
 return {...config,objectives:config.objectives||strategy.objectives,prerequisites:strategy.prerequisites||['Nesneleri sayma ve günlük yaşam deneyimleri.'],explanation:strategy.explanation.map(([heading,...paragraphs])=>({heading,paragraphs})),visuals:strategy.visuals||[tableVisual('Nasıl çalışalım?',['Adım','Yapılacak iş'],[['1','Verilenleri incele'],['2','Model kur ve çöz'],['3','Sonucu kontrol et']])],examples,commonMistake:strategy.mistake,exercises,activity:strategy.activity||{title:'Kendi örneğini oluştur',steps:['Bu konuyla ilgili günlük yaşamdan bir durum seç.','Bir arkadaşının çözebileceği bir soru yaz.','Sorunu çöz; sonucunu farklı bir yolla kontrol et.'],check:'Verilenler yeterli mi? Soru açık mı? Çözümün sorulanı karşılıyor mu?'}};
}
export function placeSteps(a,b,op){
 const count=Math.max(String(a).length,String(b).length),names=['Birler','Onlar','Yüzler','Binler','On binler','Yüz binler'],s=[];
 if(op==='+'){let carry=0;for(let i=0;i<count;i++){const x=Math.floor(a/10**i)%10,y=Math.floor(b/10**i)%10,total=x+y+carry;s.push(`${names[i]}: ${x} + ${y}${carry?' + 1 (elde)':''} = ${total}${total>=10?`; ${total%10} yaz, 1 eldeyi sonraki basamağa taşı.`:'.'}`);carry=total>=10?1:0;}if(carry)s.push('Son eldeyi yeni basamağa 1 olarak yaz.');}
 else{const digits=Array.from({length:count},(_,i)=>Math.floor(a/10**i)%10);for(let i=0;i<count;i++){const y=Math.floor(b/10**i)%10;if(digits[i]<y){let j=i+1;while(digits[j]===0)j++;digits[j]--;for(let k=j-1;k>i;k--)digits[k]=9;digits[i]+=10;s.push(`${names[i]} için soldaki uygun basamaktan 1 ödünç al; aradaki sıfırlar 9'a dönüşür.`);}s.push(`${names[i]}: ${digits[i]} − ${y} = ${digits[i]-y}.`);}}
 s.push(`Sonuç: ${op==='+'?a+b:a-b}.`);return s;
}
