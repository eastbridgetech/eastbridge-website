
document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('.menu-btn');
  const nav=document.querySelector('.navlinks');
  if(btn&&nav){btn.addEventListener('click',()=>{nav.classList.toggle('open');btn.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false');});}
  document.querySelectorAll('.acc-title').forEach(b=>b.addEventListener('click',()=>b.parentElement.classList.toggle('open')));
  document.querySelectorAll('[data-scroll]').forEach(button=>{
    button.addEventListener('click',()=>{
      const target=document.getElementById(button.dataset.scroll);
      if(!target) return;
      const dir=Number(button.dataset.dir||1);
      target.scrollBy({left:dir*340,behavior:'smooth'});
    });
  });
  const hero=document.querySelector('[data-hero-slider]');
  if(hero){
    const slides=[...hero.querySelectorAll('.home-slide')];
    const dots=[...hero.querySelectorAll('.hero-dots span')];
    const title=hero.querySelector('[data-hero-title]');
    const kicker=hero.querySelector('[data-hero-kicker]');
    const subtitle=hero.querySelector('[data-hero-subtitle]');
    const primary=hero.querySelector('[data-hero-primary]');
    const secondary=hero.querySelector('[data-hero-secondary]');
    const prev=hero.querySelector('.hero-arrow.prev');
    const next=hero.querySelector('.hero-arrow.next');
    let active=0,timer=null;
    const update=(i)=>{ if(!slides.length) return; active=(i+slides.length)%slides.length; const slide=slides[active]; slides.forEach((s,idx)=>s.classList.toggle('active',idx===active)); dots.forEach((d,idx)=>d.classList.toggle('active',idx===active)); if(title) title.innerHTML=slide.dataset.title||''; if(kicker) kicker.textContent=slide.dataset.kicker||''; if(subtitle) subtitle.textContent=slide.dataset.subtitle||''; if(primary){primary.textContent=slide.dataset.primary||'Schedule consultation';primary.href=slide.dataset.primaryLink||'contact.html';} if(secondary){secondary.textContent=slide.dataset.secondary||'Explore services';secondary.href=slide.dataset.secondaryLink||'services.html';}};
    const start=()=>{stop(); timer=setInterval(()=>update(active+1),7000);}; const stop=()=>{if(timer) clearInterval(timer); timer=null;};
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>{update(i);start();})); if(prev) prev.addEventListener('click',()=>{update(active-1);start();}); if(next) next.addEventListener('click',()=>{update(active+1);start();}); hero.addEventListener('mouseenter',stop); hero.addEventListener('mouseleave',start); update(0); start();
  }
});
