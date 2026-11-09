export function detailFor(q,kind){
 const nums=(q.prompt.match(/\d+/g)||[]).map(Number),a=nums[0],b=nums[1];
 const generic={given:q.prompt,wanted:q.type==='choice'?'Seçenekleri tanımla karşılaştırıp doğru yargıyı gerekçelendirmek.':q.type==='fields'?'Her etiketli alanda istenen değeri ayrı ayrı bulmak.':q.type==='fraction'?'Seçilen miktarı pay ve payda kullanarak ifade etmek.':'Sorudaki bilinmeyen miktarı, belirtilen birimle bulmak.',check:q.type==='choice'?`Seçilen yargıyı açıklamadaki tanımla karşılaştır: ${q.steps.join(' ')}`:`Son adımı soruya geri uygula: ${q.steps.at(-1)}`,steps:q.steps};
 if(['add','subtract','multiply','divide'].includes(kind)&&Number.isFinite(a)&&Number.isFinite(b)){
  const add=kind==='add',sub=kind==='subtract',mul=kind==='multiply';
  generic.given=add?`Birleştirilecek iki miktar ${a} ve ${b}.`:sub?`Başlangıç miktarı ${a}; ayrılan/karşılaştırılan miktar ${b}.`:mul?`${a} eş grup ve her grupta ${b} birim.`:`Toplam ${a} birim; ${b} eş grup veya ${b}'şerli gruplar.`;
  generic.wanted=add?'Birleşen toplam miktar.':sub?'Geriye kalan miktar veya iki miktar arasındaki fark.':mul?'Bütün eş gruplardaki toplam miktar.':'Bir gruptaki miktar veya oluşan grup sayısı.';
  generic.steps=[add?'Miktarlar birleşiyor; bu yüzden toplama seçilir.':sub?'Miktar azalıyor veya fark aranıyor; bu yüzden çıkarma seçilir.':mul?'Eş gruplar birleştiriliyor; tekrarlı toplama yerine çarpma seçilir.':'Eş paylaşım/gruplama istendiği için bölme seçilir.',...q.steps];
  generic.check=add?`${q.answer} − ${b} = ${a}. Eklenen miktarı geri çıkarınca başlangıç bulunur.`:sub?`${q.answer} + ${b} = ${a}. Kalanla çıkarılanı birleştirince başlangıç bulunur.`:mul?`${q.answer} ÷ ${b} = ${a}. Toplamı grup büyüklüğüne bölünce grup sayısı bulunur.`:`${b} × ${q.answer} = ${a}. Bölen ile bölümü çarpınca bölünen bulunur.`;
 }
 return generic;
}
