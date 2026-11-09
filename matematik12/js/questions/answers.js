const integer=value=>typeof value==='number'&&Number.isSafeInteger(value)?value:typeof value==='string'&&/^[+-]?\d+$/.test(value.trim())&&Number.isSafeInteger(Number(value))?Number(value):null;
function fraction(value){if(value&&typeof value==='object'&&'numerator' in value){const n=integer(value.numerator),d=integer(value.denominator);return n!==null&&d!==null&&d!==0?{n,d}:null;}const match=String(value).trim().match(/^([+-]?\d+)\s*\/\s*([+-]?\d+)$/);if(!match)return null;return fraction({numerator:match[1],denominator:match[2]});}
export function checkAnswer(q,input){
 let valid=false,correct=false;
 if(q.type==='integer'){const value=integer(input);valid=value!==null;correct=valid&&value===q.answer;}
 else if(q.type==='fraction'){const a=fraction(input),b=fraction(q.answer);valid=!!a&&!!b&&Number.isSafeInteger(a.n*b.d)&&Number.isSafeInteger(b.n*a.d);correct=valid&&a.n*b.d===b.n*a.d;}
 else if(q.type==='choice'){valid=typeof input==='string'&&q.choices.some(c=>c.id===input);correct=valid&&input===q.answer;}
 else if(q.type==='fields'){valid=!!input&&typeof input==='object';correct=valid;for(const f of q.fields){const value=integer(input?.[f.id]);const ok=value!==null&&(f.min===undefined||value>=f.min)&&(f.max===undefined||value<=f.max);valid=valid&&ok;correct=correct&&ok&&value===q.answer[f.id];}}
 return {valid,correct:!!correct,message:valid?'':'Lütfen istenen biçimde geçerli bir cevap gir.'};
}
export function formatAnswer(q){if(q.type==='fraction')return `${q.answer.numerator}/${q.answer.denominator}`;if(q.type==='choice')return q.choices.find(c=>c.id===q.answer)?.text||'';if(q.type==='fields')return q.fields.map(f=>`${f.label}: ${q.answer[f.id]}`).join(' · ');return String(q.answer);}
