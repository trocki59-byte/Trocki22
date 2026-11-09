const KEY = 'matematik12.progress.v1';
const valid = s => s && Number.isSafeInteger(s.correct) && Number.isSafeInteger(s.total) && s.correct >= 0 && s.total >= s.correct;
export function createProgressStore(storage) {
  let persistent = !!storage;
  const records = Object.create(null);
  try {
    const raw = storage?.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data?.version === 1 && data.topics && typeof data.topics === 'object') {
        for (const [id,s] of Object.entries(data.topics)) if (valid(s)) records[id] = {correct:s.correct,total:s.total};
      }
    } else {
      const legacy = JSON.parse(storage?.getItem('mat14_stats') || '{}');
      for (const [id,s] of Object.entries(legacy || {})) {
        const converted = {correct:s?.d,total:s?.t};
        if (valid(converted)) records[id] = converted;
      }
    }
  } catch { persistent = false; }
  return {
    get(id) { return {...(records[id] || {correct:0,total:0})}; },
    record(id,correct) {
      const previous = this.get(id);
      records[id] = {correct:previous.correct + Number(correct),total:previous.total + 1};
      try { if (storage) storage.setItem(KEY,JSON.stringify({version:1,topics:records})); }
      catch { persistent = false; }
    },
    isPersistent() { return persistent; }
  };
}
