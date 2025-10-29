/* ==========================
   Header shrink
   ========================== */
(function(){
  const header = document.getElementById('site-header');
  if(!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
})();

/* ==========================
   Reveal anim untuk .reel-item
   ========================== */
(function(){
  const items = document.querySelectorAll('.reel-item');
  if(!items.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-inview');
        io.unobserve(e.target);
      }
    });
  }, {threshold:.18, rootMargin: '0px 0px -10% 0px'});
  items.forEach(el=>io.observe(el));
})();

/* ==========================
   FEATURE SLIDER — 1 per 1
   ========================== */
(function(){
  const sliders = document.querySelectorAll('.features-slider');
  if(!sliders.length) return;

  sliders.forEach(setupSlider);

  function setupSlider(root){
    const viewport = root.querySelector('.fs-viewport');
    const track    = root.querySelector('.fs-track');
    const slides   = Array.from(track.children);
    const prevBtn  = root.querySelector('.fs-prev');
    const nextBtn  = root.querySelector('.fs-next');
    const dotsWrap = root.querySelector('.fs-dots');
    const autoplayMs = parseInt(root.dataset.autoplay || '0', 10);

    let index = 0;
    let slideW = 0;
    let autoT = null;

    // dots
    slides.forEach((_, i)=>{
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Ke slide ${i+1}`);
      b.addEventListener('click', ()=>goTo(i));
      dotsWrap.appendChild(b);
    });

    function updateDots(){
      dotsWrap.querySelectorAll('button').forEach((b,i)=>{
        b.setAttribute('aria-current', i===index ? 'true':'false');
      });
    }

    // ukuran
    function measure(){
      slideW = viewport.clientWidth;
      slides.forEach(s=> s.style.width = slideW+'px');
      track.style.width = (slideW * slides.length) + 'px';
      apply();
    }

    function clamp(i){ return Math.max(0, Math.min(slides.length-1, i)); }
    function apply(){ track.style.transform = `translate3d(${-index*slideW}px,0,0)`; updateDots(); updateArrows(); }
    function goTo(i){ index = clamp(i); apply(); restartAutoplay(); }
    function next(){ goTo(index+1); }
    function prev(){ goTo(index-1); }

    // arrows
    function updateArrows(){
      prevBtn.disabled = (index===0);
      nextBtn.disabled = (index===slides.length-1);
      prevBtn.style.opacity = prevBtn.disabled?.5:1;
      nextBtn.style.opacity = nextBtn.disabled?.5:1;
    }
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    // keyboard
    viewport.addEventListener('keydown', (e)=>{
      if(e.key==='ArrowLeft'){ e.preventDefault(); prev(); }
      if(e.key==='ArrowRight'){ e.preventDefault(); next(); }
    });

    // drag / swipe
    let pointerDown = false, startX=0, lastX=0, startTx=0;
    viewport.addEventListener('pointerdown', (e)=>{
      pointerDown = true;
      viewport.setPointerCapture(e.pointerId);
      startX = lastX = e.clientX;
      startTx = -index*slideW;
      track.style.transition = 'none';
      stopAutoplay();
    });
    viewport.addEventListener('pointermove', (e)=>{
      if(!pointerDown) return;
      lastX = e.clientX;
      const dx = lastX - startX;
      track.style.transform = `translate3d(${startTx + dx}px,0,0)`;
    });
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    function endDrag(e){
      if(!pointerDown) return;
      pointerDown = false;
      track.style.transition = '';
      const dx = lastX - startX;
      if(Math.abs(dx) > Math.min(80, slideW*0.22)){
        if(dx<0) next(); else prev();
      }else{
        apply();
      }
      restartAutoplay();
    }

    // autoplay
    function startAutoplay(){
      if(!autoplayMs || slides.length<2) return;
      autoT = setInterval(()=>{
        if(index>=slides.length-1) goTo(0); else next();
      }, autoplayMs);
    }
    function stopAutoplay(){ if(autoT){ clearInterval(autoT); autoT=null; } }
    function restartAutoplay(){ stopAutoplay(); startAutoplay(); }
    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);
    viewport.addEventListener('focusin', stopAutoplay);
    viewport.addEventListener('focusout', startAutoplay);

    // init
    measure();
    window.addEventListener('resize', measure);
    updateDots();
    startAutoplay();
  }
})();
