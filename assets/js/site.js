(function(){
  'use strict';
  const $=(selector,root=document)=>root.querySelector(selector);
  const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
  const navToggle=$('.nav-toggle');
  const nav=$('#siteNav');
  if(navToggle&&nav){
    navToggle.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded',String(open));
    });
    $$('a',nav).forEach(link=>link.addEventListener('click',()=>{
      nav.classList.remove('open');navToggle.setAttribute('aria-expanded','false');
    }));
  }

  window.msg=function(text){const toast=$('#toast');if(!toast)return;toast.textContent=text;toast.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)};
  window.go=function(id){const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})};
  window.sharePage=async function(){if(navigator.share){try{await navigator.share({title:document.title,url:location.href})}catch(_){}}else{window.msg('Paylaşma özelliği bu tarayıcıda desteklenmiyor.')}};
  window.toggleMenu=function(){if(navToggle)navToggle.click()};

  function showOne(listSelector,targetId,listId,sectionId){
    $$(listSelector).forEach(el=>el.classList.remove('open'));
    const target=document.getElementById(targetId);if(!target)return;
    const list=document.getElementById(listId);if(list)list.classList.add('hidden');
    target.classList.add('open');
    const section=document.getElementById(sectionId)||target;section.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function closeAll(listSelector,listId,sectionId){
    $$(listSelector).forEach(el=>el.classList.remove('open'));
    const list=document.getElementById(listId);if(list)list.classList.remove('hidden');
    const section=document.getElementById(sectionId);if(section)section.scrollIntoView({behavior:'smooth',block:'start'});
  }
  window.openWriting=id=>showOne('#sec-yazilar .article-detail',id,'writingsList','sec-yazilar');
  window.closeWriting=()=>closeAll('#sec-yazilar .article-detail','writingsList','sec-yazilar');
  window.openPhilWriting=id=>showOne('#sec-felsefe .article-detail',id,'philWritingsList','sec-felsefe');
  window.closePhilWriting=()=>closeAll('#sec-felsefe .article-detail','philWritingsList','sec-felsefe');
  window.openNatureClean=id=>showOne('#sec-dogagezi .nature-clean-detail',id,'natureCleanList','sec-dogagezi');
  window.closeNatureClean=()=>closeAll('#sec-dogagezi .nature-clean-detail','natureCleanList','sec-dogagezi');

  function openWritingFromHash(){
    const id=decodeURIComponent(location.hash.slice(1));
    const target=id&&document.getElementById(id);
    if(target&&target.classList.contains('article-detail'))window.openWriting(id);
  }
  openWritingFromHash();
  window.addEventListener('hashchange',openWritingFromHash);

  window.openPhil=function(id){const el=document.getElementById(id);if(!el)return;el.classList.add('open');el.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
  window.closePhil=function(id){const el=document.getElementById(id);if(!el)return;el.classList.remove('open');el.setAttribute('aria-hidden','true');document.body.style.overflow=''};
  window.closeVisualPhil=function(){$$('.vphil-modal.open').forEach(el=>el.classList.remove('open'));document.body.style.overflow=''};
  window.openVisualPhil=function(i){window.closeVisualPhil();const el=document.getElementById('vphil-'+i);if(!el)return;el.classList.add('open');document.body.style.overflow='hidden'};

  window.openLightbox=function(src){const box=$('#lightbox'),img=$('#lightboxImg');if(!box||!img)return;img.src=src;box.classList.add('open');document.body.style.overflow='hidden'};
  window.closeLightbox=function(event){const box=$('#lightbox');if(!box)return;if(event&&event.target!==box)return;box.classList.remove('open');document.body.style.overflow=''};
  window.openDogaLightbox=function(src,alt){const box=$('#dogaLightbox'),img=$('#dogaLightboxImg'),cap=$('#dogaLightboxCaption');if(!box||!img)return;img.src=src;img.alt=alt||'Büyük doğa fotoğrafı';if(cap)cap.textContent=alt||'';box.classList.add('open');document.body.style.overflow='hidden'};
  window.closeDogaLightbox=function(){const box=$('#dogaLightbox');if(box)box.classList.remove('open');document.body.style.overflow=''};

  document.addEventListener('click',event=>{
    if(event.target.classList&&event.target.classList.contains('phil-modal')){event.target.classList.remove('open');document.body.style.overflow=''}
    if(event.target.classList&&event.target.classList.contains('vphil-modal'))window.closeVisualPhil();
  });
  document.addEventListener('keydown',event=>{
    if(event.key!=='Escape')return;
    $$('.phil-modal.open').forEach(el=>{el.classList.remove('open');el.setAttribute('aria-hidden','true')});
    window.closeVisualPhil();window.closeDogaLightbox();window.closeLightbox();
    if(nav){nav.classList.remove('open');if(navToggle)navToggle.setAttribute('aria-expanded','false')}
  });

  $$('[data-subscribe]').forEach(form=>form.addEventListener('submit',event=>{
    event.preventDefault();
    const input=$('input[type=email]',form),status=$('.form-status',form);
    if(!input||!input.checkValidity()){if(status)status.textContent='Geçerli bir e-posta adresi yazmalısın.';if(input)input.reportValidity();return}
    const subject=encodeURIComponent('TROÇKİ22 e-posta aboneliği');
    const body=encodeURIComponent('Merhaba Troçki,\n\nYeni içeriklerden haberdar olmak istiyorum.\nE-posta adresim: '+input.value+'\n\nTeşekkürler.');
    if(status)status.textContent='Abonelik isteğin için e-posta uygulaman açılıyor…';
    window.location.href='mailto:sabahattin62@gmail.com?subject='+subject+'&body='+body;
  }));
})();
