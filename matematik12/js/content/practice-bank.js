import {numberQ as n,choiceQ as c} from './builders.js';
const choose=(prompt,correct,wrong1,wrong2,why)=>c(prompt,[correct,wrong1,wrong2],0,[why,`Doğru seçenek: ${correct}.`]);
export const extraPractice={
 rhythm:Array.from({length:10},(_,i)=>{const step=[1,2,5,10][i%4],start=i<4?0:step;return i<7?n(`${start}, ${start+step}, ${start+2*step}, ? dizisinde eksik sayı kaçtır?`,start+3*step,[`Artış ${step}.`,`${start+2*step}+${step}=${start+3*step}.`]):choose(['● ● ▲ ● ● ? dizisini tamamla.','■ ▲ ● ■ ▲ ? dizisini tamamla.','▲ ● ● ▲ ● ? dizisini tamamla.'][i-7],['▲','●','●'][i-7],['●','▲','▲'][i-7],'■','En küçük tekrar grubunu bul; aynı sırayı sürdür.');}),
 shapes:[
 n('Üçgenin kaç kenarı vardır?',3,['Üçgenin çevresinde üç düz parça vardır.','Toplam 3 kenar.']),
 n('Üçgenin kaç köşesi vardır?',3,['Kenarların birleştiği noktaları say.','Toplam 3 köşe.']),
 n('Karenin kaç kenarı vardır?',4,['Karenin dört düz kenarı vardır.','Toplam 4.']),
 n('Dikdörtgenin kaç köşesi vardır?',4,['Dört kenarın birleştiği dört köşe bulunur.','Toplam 4.']),
 choose('Bütün kenarları eşit olan dörtgen hangisidir?','Kare','Üçgen','Çember','Kare dört eş kenarlı düzlemsel şekildir.'),
 choose('Çemberin köşesi var mıdır?','Yoktur','Üç köşesi vardır','Dört köşesi vardır','Çember eğri bir sınırdır; köşe oluşturmaz.'),
 choose('Bir kare eğik duruyorsa hangi şekildir?','Kare','Üçgen','Daire','Döndürme kenar ve köşe özelliklerini değiştirmez.'),
 n('İki üçgenin toplam köşe sayısı kaçtır?',6,['Her üçgende 3 köşe.','3+3=6 köşe.']),
 choose('Dikdörtgende hangi kenarlar eşittir?','Karşılıklı kenarlar','Bütün kenarlar mutlaka','Hiçbiri','Dikdörtgenin karşılıklı kenarları eş uzunluktadır.'),
 choose('Şekilleri sınıflandırırken hangi özellik kullanılabilir?','Kenar ve köşe sayısı','Çizildiği gün','Kâğıdın markası','Matematiksel özellikler sınıflandırmaya temel olur.')],
 calendar:[
 choose('Sabah kahvaltısı ile gece uykusu arasında hangi sıra doğrudur?','Önce kahvaltı, sonra gece uykusu','Önce gece uykusu, sonra aynı günün sabahı','Aynı anda olur','Bir günü sabah, öğle, akşam, gece sırasıyla düşünebiliriz.'),
 choose('Diş fırçalama süresini hangi birimle ifade etmek uygundur?','Dakika','Yıl','Ay','Diş fırçalama birkaç dakika sürer.'),
 choose('Bir göz kırpmanın süresi için hangi birim uygundur?','Saniye','Hafta','Yıl','Çok kısa olaylar saniyeyle anlatılır.'),
 choose('Bir insanın yaşını hangi birimle söylemek uygundur?','Yıl','Saniye','Dakika','Yaş genellikle geçen yıllarla ifade edilir.'),
 n('Bir haftada kaç gün vardır?',7,['Pazartesi, salı, çarşamba, perşembe, cuma, cumartesi, pazar.','Toplam 7 gün.']),
 choose('Bugün pazartesi ise yarın hangi gündür?','Salı','Pazar','Cuma','Gün sıralamasında pazartesiden sonra salı gelir.'),
 choose('Bugün cuma ise dün hangi gündü?','Perşembe','Cumartesi','Pazar','Dün, bugünden bir gün öncedir.'),
 choose('Bütün ayların gün sayısı aynı mıdır?','Hayır','Evet, hepsi 30','Evet, hepsi 31','Aylar 28, 29, 30 veya 31 gün sürebilir.'),
 n('Bir yılda kaç ay vardır?',12,['Ocaktan aralığa kadar ayları say.','Toplam 12 ay.']),
 choose('Bir yarışta önce bitirenin süresi, aynı anda başlayan daha geç bitirene göre nasıldır?','Daha kısadır','Daha uzundur','Mutlaka eşittir','Aynı anda başlayanlardan önce bitiren daha az süre kullanmıştır.')],
 symmetry:Array.from({length:10},(_,i)=>i<7?n(`Bir nokta simetri doğrusunun ${i+1} kare sağındadır. Nokta ile yansıması arasında kaç kare vardır?`,2*(i+1),[`Yansıma diğer tarafta ${i+1} kare uzaktadır.`,`${i+1}+${i+1}=${2*(i+1)} kare.`]):i===7?choose('Simetri doğrusuna uzaklık yansımada nasıl değişir?','Değişmez','İki katına çıkar','Sıfır olur','Karşılıklı noktalar doğruya eşit uzaklıktadır.'):i===8?choose('Bir şekil katlandığında iki yarısı tam çakışıyor. Kat çizgisi nedir?','Simetri doğrusu','Rastgele kenar','Alan','Katlama ile tam çakışma simetriyi gösterir.'):choose('Bir şeklin eksik yarısı tamamlanırken ne yapılır?','Noktalar karşı tarafa eşit uzaklıkta yerleştirilir','Aynı tarafa bir daha çizilir','Her nokta daha uzağa konur','Yansıma simetri doğrusunun diğer tarafında eş uzaklıklarla kurulur.')),
 congruence:[
 choose('Eş şekiller için hangi iki özellik aynı olmalıdır?','Biçim ve büyüklük','Renk ve konum','Yön ve renk','Eşlik, üst üste tam çakışmayla belirlenir.'),
 choose('Aynı boydaki iki kareden biri kırmızı diğeri mavidir. Eş olabilirler mi?','Evet','Hayır','Yalnız yan yana dururlarsa','Renk, biçimi veya büyüklüğü değiştirmez.'),
 choose('Kenarı 3 cm ve 5 cm olan iki kare eş midir?','Hayır','Evet','Yalnız renkleri aynıysa','Kenar uzunlukları ve büyüklükleri farklıdır.'),
 choose('Bir şekil yalnız sağa kaydırılıyor. Biçimi değişir mi?','Değişmez','Büyür','Küçülür','Kaydırma boyut ve biçimi korur.'),
 choose('Bir üçgen ters çevrilince ne olur?','Üçgen olarak kalır','Dörtgen olur','Kenarı kaybolur','Yön değişir, kenar ve köşe sayısı değişmez.'),
 choose('Bir kare büyütülürse hangi özellik korunur?','Dört kenarlı olması','Kenar uzunluğu','Kapladığı alan','Büyütme şeklin türünü korur, büyüklüğünü değiştirir.'),
 choose('Eşliği kontrol etmek için en uygun yöntem nedir?','Tam üst üste getirip karşılaştırmak','Yalnız renklerini karşılaştırmak','Yalnız yan yana dizmek','Çakışma biçim ve büyüklük eşitliğini gösterir.'),
 choose('Aynı kartonun iki izi farklı yönlerde çizildi. Hangisi doğrudur?','İzler eş olabilir','İzler kesinlikle farklı boydadır','Birisi artık şekil değildir','Aynı model yön değiştirse de boyutu değişmez.'),
 choose('İki şekil aynı biçimde ama farklı büyüklükte. Nasıl yorumlarız?','Eş değildirler','Kesin eştirler','Renklerine bağlıdır','Eşlikte büyüklük de korunmalıdır.'),
 choose('Bir daire döndürülürse ne değişir?','Dairenin biçimi değişmez','Üç köşesi olur','Kenarları artar','Döndürme biçimi korur.')],
 solids:[
 choose('Bir zar hangi cisme örnektir?','Küp','Küre','Koni','Zarın altı kare yüzü vardır.'),
 choose('Bir dondurma külahı hangi cisme benzer?','Koni','Küp','Küre','Külahın dairesel tabanı ve sivri ucu vardır.'),
 choose('Kare ile küp arasındaki fark nedir?','Kare düzlemsel şekil, küp cisimdir','İkisi aynı şeydir','Küpün yalnız bir yüzü vardır','Küp üç boyutlu olup yer kaplar.'),
 choose('Hangi cismin köşesi yoktur?','Küre','Küp','Dikdörtgenler prizması','Küre üzerinde düz yüzlerin birleştiği köşe bulunmaz.'),
 choose('Bir kitap hangi cisme daha çok benzer?','Dikdörtgenler prizması','Küre','Koni','Kitap dikdörtgensel yüzlerden oluşur.'),
 choose('Cismin düz yüzlerinin birleştiği çizgiye ne denir?','Ayrıt','Köşe','Merkez','Ayrıt, iki düz yüzün birleşimidir.'),
 choose('Ayrıtların birleştiği noktaya ne denir?','Köşe','Yüz','Daire','Köşe bir noktadır.'),
 choose('Bir silindirin üst ve alt düz yüzleri hangi şekildedir?','Daire','Üçgen','Kare','İki paralel dairesel düz yüz vardır.'),
 choose('Hangi nesne kolayca her yöne yuvarlanır?','Top','Zar','Kitap','Kürenin eğri yüzeyi her yönde yuvarlanmaya uygundur.'),
 choose('Bir küpün bütün yüzleri nasıldır?','Eş karelerdir','Farklı üçgenlerdir','Dairelerdir','Altı yüz aynı büyüklükte karedir.')],
 models:[
 n('Bir kapalı küpün üstü açık bırakılırsa kaç kare yüzü kalır?',5,['Kapalı küpün 6 yüzü vardır.','Bir yüz eksilirse 6−1=5.']),
 n('İki küp yan yana konuluyor. Kullanılan küp sayısı kaçtır?',2,['Nesne sayısı, birbirine değseler de değişmez.','1+1=2 küp.']),
 n('Bir yapıda üç katta ikişer küp var. Toplam kaç küp kullanılır?',6,['Her kat eş gruptur.','2+2+2=6 küp.']),
 n('Dört karelik bir modele iki kare daha eklendi. Kaç kare oldu?',6,['Parçaları birleştirirken adetlerini topla.','4+2=6.']),
 choose('Her altı kare dizilişi katlanınca küp oluşturur mu?','Hayır','Evet','Yalnız renkli olursa','Bazı dizilişlerde yüzler üst üste gelir veya açık kalır.'),
 choose('Bir yapı üstten çizilince alttaki bütün küpler görünür mü?','Her zaman görünmez','Daima görünür','Küpler kaybolur','Üst küpler alt küpleri örtebilir; destekleri düşün.'),
 choose('Bir küp açınımını sınamanın en iyi yolu nedir?','Modeli katlayıp yüzleri kontrol etmek','Yalnız kareleri boyamak','Kâğıdın rengini değiştirmek','Katlama, yüzlerin çakışıp çakışmadığını gösterir.'),
 choose('Bir desen oluştururken parçalar üst üste biniyorsa ne yapılmalı?','Yerleşim yeniden düzenlenmeli','Parça sayısı yok sayılmalı','Boşluklar sayılmamalı','Modelin koşullarını sağlamak için yerleşimi kontrol ederiz.'),
 choose('İki eş üçgenle bir dörtgen model yapmak için neye bakılır?','Uygun kenarların birleşmesine','Sadece renklere','Sadece köşe isimlerine','Birleştirilecek kenarların uzunluk ve konumları uyumlu olmalı.'),
 choose('Kareli zeminde modeli yeniden kurmak için hangi bilgi gerekir?','Parçaların konumu ve sayısı','Yalnız rengi','Yalnız sayfanın adı','Yapıyı tarif etmek hem saymayı hem konum bilgisini gerektirir.')],
 angles:[
 choose('ABC açısında köşe hangi harftir?','B','A','C','Açı adında ortadaki harf köşeyi gösterir.'),
 choose('Açıyı oluşturan iki ışının hangi özelliği ortaktır?','Başlangıç noktası','Uzunlukları','Renkleri','Işınların ortak başlangıcı açının köşesidir.'),
 choose('Açıölçerin merkezi nereye konur?','Açının köşesine','Işının herhangi bir yerine','Kâğıdın kenarına','Ölçümün merkezinin köşeyle çakışması gerekir.'),
 choose('Bir açının ışınları daha uzun çizilirse açı büyür mü?','Hayır','Evet','Daima iki katına çıkar','Açının büyüklüğü ışınların açıklığına bağlıdır.'),
 choose('Standart olmayan farklı birimlerle ölçen iki kişi neden farklı sayılar bulabilir?','Birim büyüklükleri farklıdır','Açı kesin değişmiştir','İkisinin de ölçmesi imkânsızdır','Aynı açıklık daha küçük birimden daha fazla içerir.'),
 choose('Kâğıdın düz yüzeyi neye modeldir?','Düzleme','Küreye','Koniye','Düzlem düz bir yüzey modeliyle düşünülür.'),
 choose('90 dereceden küçük açı hangisidir?','Dar açı','Geniş açı','Doğru açı','Dar açı 0 ile 90 derece arasındadır.'),
 choose('90 derecelik açı hangisidir?','Dik açı','Dar açı','Doğru açı','Dik açı tam 90 derecedir.'),
 choose('120 derecelik açı hangisidir?','Geniş açı','Dar açı','Dik açı','120, 90 ile 180 arasındadır.'),
 choose('180 derecelik açı hangisidir?','Doğru açı','Dar açı','Dik açı','Karşıt yöndeki iki ışın doğru açıyı oluşturur.')]
};
export function practiceFor(kind,g){
 if(kind==='rhythm'&&g===4)return Array.from({length:10},(_,i)=>{const step=i%2?1000:100,start=(Math.floor(i/2)+1)*step;return n(`${start}, ${start+step}, ${start+2*step}, ? örüntüsünü tamamla.`,start+3*step,[`Her adım ${step} artırıyor.`,`${start+2*step}+${step}=${start+3*step}.`]);}).concat([n('10000’den geriye biner sayarken bir sonraki sayı kaçtır?',9000,['Biner geri saymak 1000 çıkarmaktır.','10000−1000=9000.']),n('2500’den başlayıp yüzer sayarken 3 adım sonra kaç olur?',2800,['Üç adım 3×100=300.','2500+300=2800.'])]);
 if(kind==='multiply'&&g===4)return Array.from({length:10},(_,i)=>{const a=123+i*11,b=12+i,unit=b%10,tens=Math.floor(b/10)*10;return n(`${a} × ${b} = ?`,a*b,[`Çarpanı ayır: ${b}=${tens}+${unit}.`,`Ara çarpım 1: ${a}×${unit}=${a*unit}.`,`Ara çarpım 2: ${a}×${tens}=${a*tens}.`,`Ara çarpımları topla: ${a*unit}+${a*tens}=${a*b}.`,`Kontrol: ${a*b}÷${b}=${a}.`]);});
 if(kind==='divide'&&g===4)return Array.from({length:10},(_,i)=>{const b=i%2?12+i:3+i%5,q=i%2?21+i:345+i*7,a=b*q;let remainder=0,steps=[];for(const digit of String(a)){const part=remainder*10+Number(digit),qd=Math.floor(part/b);steps.push(`${part} içinde ${b}, ${qd} kez vardır; ${qd}×${b}=${qd*b}, kalan ${part-qd*b}.`);remainder=part-qd*b;}return n(`${a} ÷ ${b} = ?`,q,[...steps,`Bölüm basamaklarını sırayla oku: ${q}.`,`Kontrol: ${b}×${q}+0=${a}.`]);});
 if(kind==='mental'&&g===1)return Array.from({length:10},(_,i)=>n(`${i+1} + 9 işlemini önce 10’a tamamlayarak yap.`,i+10,[`9'a 1 ekleyerek 10 yap.`,`Diğer toplanandan 1 kullandın; geriye ${i} kaldı.`,`10+${i}=${i+10}.`]));
 if(kind==='estimate'&&g<=3)return Array.from({length:10},(_,i)=>i<5?n(`Bir öğrenci ${i+8} nesneyi ${i+10} tahmin etti. Tahmini gerçek sayıdan kaç fazladır?`,2,[`Önce gerçek sayıyı ve tahmini ayır.`,`${i+10}−${i+8}=2.`]):n(`Bir grupta 5 nesne var. Buna eş ${i-3} grup kaç nesne eder?`,5*(i-3),[`Beşlik grupları say: ${Array.from({length:i-3},(_,j)=>(j+1)*5).join(', ')}.`,`Toplam ${5*(i-3)} nesne.`]));
 if(extraPractice[kind])return extraPractice[kind];
 if(kind==='length'&&g<=2)return Array.from({length:10},(_,i)=>i<7?n(g===1?`Bir şeridi kaplamak için ${i+2} eş ataş kullanıldı. Şerit kaç ataş uzunluğundadır?`:`Cetvelde bir uç 0, diğer uç ${i+3} cm üzerindedir. Uzunluk kaç cm?`,g===1?i+2:i+3,[g===1?'Ölçü birimleri eş ve uç uca olmalıdır.':'Cetvelin 0 çizgisinden başla.',`Uzunluk ${g===1?i+2:i+3} ${g===1?'ataş':'cm'}.`]):i===7?choose('Ölçerken birimler arasında boşluk bırakılır mı?','Hayır','Evet','Sadece bazen','Boşluk bırakmak uzunluğu olduğundan az birimle ölçmeye yol açar.'):i===8?choose('İki kişi aynı masayı karışla ölçüp farklı sayılar buldu. Neden olabilir?','Karış uzunlukları farklıdır','Masa kesin değişmiştir','Uzunluk ölçülemez','Standart olmayan birimler kişiye göre değişir.'):choose('Bir kalemi ölçmek için hangi araç uygundur?','Cetvel','Saat','Terazi','Cetvel uzunluğu ölçer.'));
 if(kind==='money'&&g===1)return [1,5,10,20,50,100,200].map(a=>n(`İki ${a} TL toplam kaç TL eder?`,a*2,[`${a}+${a}=${a*2} TL.`])).concat([choose('Hangisi daha değerlidir?','Bir 20 TL','Bir 5 TL','Bir 1 TL','20, 5 ve 1’den büyüktür.'),choose('İki 5 TL hangi tek banknotla aynı değerdedir?','10 TL','20 TL','50 TL','5+5=10 TL.'),choose('Bir 10 TL ile iki 5 TL karşılaştırıldığında ne olur?','Değerleri eşittir','10 TL daha fazladır','İki banknot her zaman daha fazladır','Banknot sayısı farklı, toplam değer aynıdır.')]);
 if(kind==='directions')return Array.from({length:10},(_,i)=>i<5?n(`Robot ${i+1} kare sağa, 2 kare yukarı gitti. Toplam kaç kare yol aldı?`,i+3,[`İki yol parçasını topla.`,`${i+1}+2=${i+3}.`]):n(`Robot ${i+1} kare sağa, 2 kare sola gitti. Başlangıcın kaç kare sağındadır?`,i-1,[`Zıt yöndeki adımlar birbirini götürür.`,`${i+1}−2=${i-1}.`]));
 if(kind==='halves')return Array.from({length:10},(_,i)=>i<5?n(`${i+1} bütün kaç yarımdır?`,(i+1)*2,[`1 bütün 2 yarımdır.`,`${i+1}×2=${(i+1)*2}.`]):n(`${i-4} bütün kaç çeyrektir?`,(i-4)*4,[`1 bütün 4 çeyrektir.`,`${i-4}×4=${(i-4)*4}.`]));
 if(kind==='fractionCompare')return Array.from({length:10},(_,i)=>i<5?choose(`1/${i+2} ile 1/${i+3} karşılaştırıldığında hangisi büyüktür?`,`1/${i+2}`,`1/${i+3}`,'Eşitler','Aynı bütün daha az eş parçaya bölünürse her parça daha büyüktür.'):choose(`${i-3}/9 ile ${i-4}/9 arasında hangi ilişki vardır?`,`${i-3}/9 > ${i-4}/9`,`${i-3}/9 < ${i-4}/9`,'Eşitler','Paydalar eşit olduğundan payı büyük kesir büyüktür.'));
 if(kind==='mass')return Array.from({length:10},(_,i)=>g===2?choose([`Bir karpuzun kütlesi ${i+1} olarak veriliyor. Hangi birim uygun?`,`Bir silginin kütlesi ${i+5} olarak veriliyor. Hangi birim uygun?`][i%2],i%2?'Gram':'Kilogram',i%2?'Kilogram':'Ton','Kilometre',i%2?'Silgi küçük kütlelidir; gram uygundur.':'Karpuzun kütlesi kilogramla ifade edilir.'):i<4?n(`${i+1} kg 250 g kaç gram eder?`,(i+1)*1000+250,[`${i+1} kg=${(i+1)*1000} g.`,`${(i+1)*1000}+250=${(i+1)*1000+250} g.`]):i<7?n(`${i-3} ton kaç kilogramdır?`,(i-3)*1000,[`1 ton=1000 kg.`,`${i-3}×1000=${(i-3)*1000} kg.`]):n(`${i-6} gram kaç miligramdır?`,(i-6)*1000,[`1 g=1000 mg.`,`${i-6}×1000=${(i-6)*1000} mg.`]));
 if(kind==='liquid')return Array.from({length:10},(_,i)=>g<3?n(`Bir sürahi ${i+2} eş bardak su alıyor. İki sürahi kaç bardak su alır?`,2*(i+2),[`Aynı bardak ve aynı doluluk kullanılıyor.`,`${i+2}+${i+2}=${2*(i+2)} bardak.`]):g===3?n(`${i+2} litrelik üç şişe toplam kaç litre sıvı alır?`,3*(i+2),[`Üç eş miktarı topla.`,`${i+2}×3=${3*(i+2)} L.`]):n(`${i+1} L ${i*50} mL kaç mililitredir?`,(i+1)*1000+i*50,[`${i+1} L=${(i+1)*1000} mL.`,`${(i+1)*1000}+${i*50}=${(i+1)*1000+i*50} mL.`]));
 return undefined;
}
