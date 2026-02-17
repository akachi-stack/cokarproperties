// Simple slide-in for images inside #products
(function(){
  function init(){
    const container = document.getElementById('products');
    if(!container) return;
    // find direct images (and images inside wrappers)
    const imgs = Array.from(container.querySelectorAll('img'));
    if(!imgs.length) return;

    // alternate sides for nicer look
    imgs.forEach((img,i)=>{
      if(!img.dataset.side) img.dataset.side = (i%2===0)?'left':'right';
      if(img.dataset.side==='right') img.setAttribute('data-side','right');
    });

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
        } else {
          // remove so it animates again when user scrolls away and back
          entry.target.classList.remove('in-view');
        }
      });
    },{threshold:0.18});

    imgs.forEach(img=>io.observe(img));

    // ALSO: animate sections that come after #products
    try{
      const allSections = Array.from(document.querySelectorAll('section'));
      const following = allSections.filter(s=> (container.compareDocumentPosition(s) & Node.DOCUMENT_POSITION_FOLLOWING));
      // exclude footer
      const targets = following.filter(s=> !(s.id && s.id.toLowerCase().includes('footer')) && s.id!=='myfooter');
      targets.forEach((sec,si)=>{
        sec.classList.add('section-slide');
        // pick child elements to animate
        const elems = Array.from(sec.querySelectorAll('h1,h2,h3,p,li,img,button,a,.product-wrapper,.property-card'));
        elems.forEach((el,i)=>{
          el.classList.add('animate-element');
          // stagger delay
          el.style.setProperty('--delay', (i*70)+'ms');
          // alternate left/right for variety
          if(!el.dataset.side) el.dataset.side = (i%2===0)?'left':'right';
        });
        // observe these elements with same observer
        elems.forEach(e=>io.observe(e));
      });
    }catch(e){ /* non-fatal */ }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
