import {generateQuestion} from './curriculum.js';
export function createSession(topicId,store,generator=generateQuestion) {
  let question=generator(topicId), answered=false;
  return {
    current() { return question; },
    next() { question=generator(topicId); answered=false; return question; },
    submit(text) {
      if(answered) return {status:'already-answered',question};
      const value=String(text).trim();
      if(!/^[+-]?\d+$/.test(value)||!Number.isSafeInteger(Number(value))) return {status:'invalid',question};
      const correct=Number(value)===question.answer;
      answered=true;store.record(topicId,correct);
      return {status:correct?'correct':'incorrect',question};
    }
  };
}
