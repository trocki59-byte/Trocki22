export function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;}
export function button(text,handler,cls='text-button'){const b=el('button',cls,text);b.type='button';b.onclick=handler;return b;}
export function heading(text,level=2){return el(`h${level}`,'',text);}
export function list(items,ordered=false){const node=el(ordered?'ol':'ul','step-list');items.forEach(item=>node.append(el('li','',item)));return node;}
