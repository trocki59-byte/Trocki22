const KEY='matematik12.learning.v1';
const empty=()=>({read:false,attempts:0,firstTryCorrect:0,assisted:0});
export function createLearningProgress(storage){
 const records=Object.create(null);let persistent=!!storage;
 try{const parsed=JSON.parse(storage?.getItem(KEY)||'null');if(parsed?.version===1&&parsed.lessons)for(const [id,s]of Object.entries(parsed.lessons)){if(typeof s.read==='boolean'&&[s.attempts,s.firstTryCorrect,s.assisted].every(x=>Number.isSafeInteger(x)&&x>=0)&&s.firstTryCorrect+s.assisted<=s.attempts)records[id]={...s};}}catch{persistent=false;}
 function save(){try{storage?.setItem(KEY,JSON.stringify({version:1,lessons:records}));}catch{persistent=false;}}
 return {getLesson(id){return {...(records[id]||empty())};},markRead(id){records[id]={...this.getLesson(id),read:true};save();},recordAttempt(id,{firstTryCorrect,assisted}){const s=this.getLesson(id);s.attempts++;s.firstTryCorrect+=Number(!!firstTryCorrect&&!assisted);s.assisted+=Number(!!assisted);records[id]=s;save();},isPersistent(){return persistent;}};
}
