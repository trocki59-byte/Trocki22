let randomSource = Math.random;

// ---------- Yardımcılar ----------
const rnd = (min, max) => Math.floor(randomSource() * (max - min + 1)) + min;

// ---------- Adım adım çözüm ----------
function addSteps(a, b) {
  const s = [];
  const o = a % 10 + b % 10, c1 = o >= 10 ? 1 : 0;
  s.push(`Birler: ${a % 10} + ${b % 10} = ${o}` + (c1 ? ` → ${o - 10} yazılır, 1 elde edilir` : ""));
  const t = Math.floor(a / 10) % 10 + Math.floor(b / 10) % 10 + c1, c2 = t >= 10 ? 1 : 0;
  s.push(`Onlar: ${Math.floor(a / 10) % 10} + ${Math.floor(b / 10) % 10}` + (c1 ? " + 1 (elde)" : "") + ` = ${t}` + (c2 ? ` → ${t - 10} yazılır, 1 elde edilir` : ""));
  s.push(`Yüzler: ${Math.floor(a / 100)} + ${Math.floor(b / 100)}` + (c2 ? " + 1 (elde)" : "") + ` = ${Math.floor(a / 100) + Math.floor(b / 100) + c2}`);
  s.push(`Sonuç: ${a + b}`);
  return s;
}

export function subtractionSteps(a, b) {
  const digits = [a % 10, Math.floor(a / 10) % 10, Math.floor(a / 100)];
  const other = [b % 10, Math.floor(b / 10) % 10, Math.floor(b / 100)];
  const names = ['Birler', 'Onlar', 'Yüzler'];
  const steps = [];
  const count = a >= 100 ? 3 : a >= 10 ? 2 : 1;
  for (let i = 0; i < count; i++) {
    if (digits[i] < other[i]) {
      let donor = i + 1;
      while (digits[donor] === 0) donor++;
      digits[donor]--;
      for (let j = donor - 1; j >= i; j--) {
        digits[j] += 10;
        steps.push(`${names[j + 1]}${j + 1 === 1 ? 'dan' : 'den'} 1 ödünç alınır; ${names[j].toLocaleLowerCase('tr')} ${digits[j]} olur.`);
        if (j > i) digits[j]--;
      }
    }
    steps.push(`${names[i]}: ${digits[i]} − ${other[i]} = ${digits[i] - other[i]}`);
  }
  steps.push(`Sonuç: ${a - b}`);
  return steps;
}
const subSteps = subtractionSteps;

// ---------- Konular (1–4. sınıf) ----------
const TOPICS = [
  { id: "1-top-20", grade: "1. Sınıf", name: "Toplama (20'ye kadar)", gen() {
      const a = rnd(0, 19), b = rnd(0, 20 - a);
      return { q: `${a} + ${b} = ?`, a: `${a + b}`, steps: [`${a} ile ${b} toplanır: ${a + b}`] }; } },
  { id: "1-cik-20", grade: "1. Sınıf", name: "Çıkarma (20'ye kadar)", gen() {
      const a = rnd(0, 20), b = rnd(0, a);
      return { q: `${a} − ${b} = ?`, a: `${a - b}`, steps: [`${a} sayısından ${b} çıkarılır: ${a - b}`] }; } },
  { id: "1-sekil", grade: "1. Sınıf", name: "Geometri: kenar sayısı", gen() {
      const shapes = [["Üçgen", "üçgen'in", 3], ["Dörtgen", "dörtgen'in", 4], ["Beşgen", "beşgen'in", 5], ["Altıgen", "altıgen'in", 6]];
      const [name, , k] = shapes[rnd(0, 3)];
      return { q: `${name}'in kaç kenarı vardır?`, a: `${k}`, steps: [`${name} ${k} kenarlıdır.`] }; } },

  { id: "2-top-100", grade: "2. Sınıf", name: "Toplama (100'e kadar)", gen() {
      const a = rnd(10, 89), b = rnd(10, 100 - a);
      return { q: `${a} + ${b} = ?`, a: `${a + b}`, steps: [`Onlar: ${Math.floor(a / 10) * 10} + ${Math.floor(b / 10) * 10} = ${Math.floor(a / 10) * 10 + Math.floor(b / 10) * 10}`, `Birler: ${a % 10} + ${b % 10} = ${a % 10 + b % 10}`, `Sonuç: ${a + b}`] }; } },
  { id: "2-cik-100", grade: "2. Sınıf", name: "Çıkarma (100'e kadar)", gen() {
      const a = rnd(10, 99), b = rnd(1, a);
      return { q: `${a} − ${b} = ?`, a: `${a - b}`, steps: subSteps(a, b) }; } },
  { id: "2-carpma-25", grade: "2. Sınıf", name: "Çarpma (2 ve 5 tablosu)", gen() {
      const a = rnd(0, 1) ? 5 : 2, b = rnd(2, 10);
      return { q: `${a} × ${b} = ?`, a: `${a * b}`, steps: [`${a} × ${b}, ${b} sayısının ${a} kez toplamıdır: ${Array(a).fill(b).join(" + ")} = ${a * b}`] }; } },
  { id: "2-para", grade: "2. Sınıf", name: "Para (TL, toplama)", gen() {
      const a = rnd(1, 100), b = rnd(1, 100);
      return { q: `${a} TL + ${b} TL = ? TL`, a: `${a + b}`, steps: [`${a} + ${b} = ${a + b} TL`] }; } },
  { id: "2-saat", grade: "2. Sınıf", name: "Zaman (saat, 12'lik)", gen() {
      const h = rnd(1, 12), k = rnd(1, 12);
      const ans = ((h + k - 1) % 12) + 1;
      return { q: `Saat ${h}'de ${k} saat sonra saat kaç olur?`, a: `${ans}`, steps: [`${h} + ${k} = ${h + k}`, `12'yi geçerse 12 çıkarılır: ${ans}`] }; } },

  { id: "3-top-1000", grade: "3. Sınıf", name: "Toplama (1000'e kadar, elde ile)", gen() {
      const a = rnd(100, 499), b = rnd(100, 499);
      return { q: `${a} + ${b} = ?`, a: `${a + b}`, steps: addSteps(a, b) }; } },
  { id: "3-cik-1000", grade: "3. Sınıf", name: "Çıkarma (1000'e kadar, ödünç ile)", gen() {
      const a = rnd(100, 999), b = rnd(10, a - 1);
      return { q: `${a} − ${b} = ?`, a: `${a - b}`, steps: subSteps(a, b) }; } },
  { id: "3-carpma-10", grade: "3. Sınıf", name: "Çarpma (2–10 tablosu)", gen() {
      const a = rnd(2, 10), b = rnd(2, 10);
      return { q: `${a} × ${b} = ?`, a: `${a * b}`, steps: [`${a} × ${b} = ${a * b}`] }; } },
  { id: "3-bolme", grade: "3. Sınıf", name: "Bölme (tam bölme)", gen() {
      const b = rnd(2, 10), q = rnd(2, 10), a = b * q;
      return { q: `${a} ÷ ${b} = ?`, a: `${q}`, steps: [`${b} × ${q} = ${a} olduğu için cevap ${q}`] }; } },

  { id: "4-carpma-2x1", grade: "4. Sınıf", name: "Çarpma (iki basamaklı × tek basamaklı)", gen() {
      const a = rnd(10, 99), b = rnd(2, 9), on = Math.floor(a / 10) * 10, bi = a % 10;
      return { q: `${a} × ${b} = ?`, a: `${a * b}`, steps: [`${a} = ${on} + ${bi}`, `${on} × ${b} = ${on * b}`, `${bi} × ${b} = ${bi * b}`, `Toplam: ${on * b} + ${bi * b} = ${a * b}`] }; } },
  { id: "4-bolme-2d", grade: "4. Sınıf", name: "Bölme (iki basamaklı bölünen)", gen() {
      const b = rnd(2, 9), q = rnd(Math.ceil(10 / b), Math.floor(99 / b)), a = b * q;
      return { q: `${a} ÷ ${b} = ?`, a: `${q}`, steps: [`${b} × ${q} = ${a} olduğu için cevap ${q}`] }; } },
];


export const additionSteps = addSteps;
export const topics = TOPICS.map(({id,grade,name})=>({id,grade,name}));
export function generateQuestion(topicId, rng = Math.random) {
  const topic = TOPICS.find(t=>t.id === topicId);
  if (!topic) throw new Error('Bilinmeyen konu');
  randomSource = rng;
  try { const q = topic.gen(); return {text:q.q, answer:Number(q.a), steps:q.steps}; }
  finally { randomSource = Math.random; }
}
