document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('.menu-btn');
  const nav=document.querySelector('.navlinks');
  if(btn&&nav) btn.onclick=()=>nav.classList.toggle('open');
  document.querySelectorAll('.acc-title').forEach(b=>b.onclick=()=>b.parentElement.classList.toggle('open'));
  document.querySelectorAll('.filter').forEach(f=>f.onclick=()=>{
    document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
    f.classList.add('active');
    const cat=f.dataset.filter;
    document.querySelectorAll('[data-cat]').forEach(card=>{card.style.display=(cat==='all'||card.dataset.cat===cat)?'block':'none'});
  });
  document.querySelectorAll('[data-scroll]').forEach(button=>{
    button.addEventListener('click',()=>{
      const target=document.getElementById(button.dataset.scroll);
      if(!target) return;
      const dir=Number(button.dataset.dir||1);
      target.scrollBy({left:dir*340,behavior:'smooth'});
    });
  });
  const heroSlider=document.querySelector('[data-hero-slider]');
  if(heroSlider){
    const slides=[...heroSlider.querySelectorAll('.hero-slide')];
    const dots=[...heroSlider.querySelectorAll('.hero-slider-dots span')];
    let active=0;
    const showSlide=(index)=>{
      active=(index+slides.length)%slides.length;
      slides.forEach((slide,i)=>slide.classList.toggle('active',i===active));
      dots.forEach((dot,i)=>dot.classList.toggle('active',i===active));
    };
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>showSlide(i)));
    if(slides.length>1){
      setInterval(()=>showSlide(active+1),4500);
    }
  }

});


// EastBridge v7.1 enhanced hero slider and counters
window.addEventListener('DOMContentLoaded',()=>{
  const hero=document.querySelector('.hero-v71 [data-hero-slider]');
  if(hero){
    const slides=[...hero.querySelectorAll('.hero-v71-slide')];
    const dots=[...hero.querySelectorAll('.hero-v71-dots span')];
    const title=document.querySelector('[data-hero-title]');
    const kicker=document.querySelector('[data-hero-kicker]');
    const subtitle=document.querySelector('[data-hero-subtitle]');
    const primary=document.querySelector('[data-hero-primary]');
    const secondary=document.querySelector('[data-hero-secondary]');
    const prev=hero.querySelector('.hero-v71-prev');
    const next=hero.querySelector('.hero-v71-next');
    let active=0;
    let timer=null;
    const update=(i)=>{
      if(!slides.length) return;
      active=(i+slides.length)%slides.length;
      const slide=slides[active];
      slides.forEach((s,idx)=>s.classList.toggle('active',idx===active));
      dots.forEach((d,idx)=>d.classList.toggle('active',idx===active));
      if(title) title.innerHTML=slide.dataset.title||'';
      if(kicker) kicker.textContent=slide.dataset.kicker||'';
      if(subtitle) subtitle.textContent=slide.dataset.subtitle||'';
      if(primary){ primary.textContent=slide.dataset.primary||'Schedule consultation'; primary.href=slide.dataset.primaryLink||'contact.html'; }
      if(secondary){ secondary.textContent=slide.dataset.secondary||'Explore services'; secondary.href=slide.dataset.secondaryLink||'services.html'; }
    };
    const start=()=>{ stop(); timer=setInterval(()=>update(active+1),7000); };
    const stop=()=>{ if(timer) clearInterval(timer); timer=null; };
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>{update(i);start();}));
    if(prev) prev.addEventListener('click',()=>{update(active-1);start();});
    if(next) next.addEventListener('click',()=>{update(active+1);start();});
    hero.addEventListener('mouseenter',stop);
    hero.addEventListener('mouseleave',start);
    update(0); start();
  }
  const counterSection=document.querySelector('.hero-counters');
  if(counterSection && 'IntersectionObserver' in window){
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          counterSection.querySelectorAll('.counter-card').forEach((card,i)=>setTimeout(()=>card.classList.add('revealed'),i*120));
          obs.disconnect();
        }
      });
    },{threshold:.2});
    obs.observe(counterSection);
  }
});
