import {configs} from './definitions.js';
import {arithmetic} from './arithmetic.js';
import {measurement} from './measurement.js';
import {geometry} from './geometry-data.js';
import {makeLesson} from './builders.js';
import {practiceFor} from './practice-bank.js';
const strategies={...arithmetic,...measurement,...geometry};
export const allLessons=configs.map(config=>makeLesson(config,strategies[config.kind],practiceFor(config.kind,config.grade)));
export const getLesson=id=>allLessons.find(l=>l.id===id);
const normalize=s=>s.toLocaleLowerCase('tr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i');
export function searchLessons({grade,query='',group=''}){const q=normalize(query.trim());return allLessons.filter(l=>(!grade||l.grade===Number(grade))&&(!group||l.group===group)&&(!q||normalize(l.title+' '+l.group+' '+l.objectives.join(' ')).includes(q)));}
