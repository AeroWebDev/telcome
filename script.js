document.getElementById('yr').textContent = new Date().getFullYear();

function handleSubmit(e){
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = '✓ Received — our team will reply within one business day.';
  e.target.reset();
  return false;
}

// Simple scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){ en.target.style.opacity=1; en.target.style.transform='translateY(0)'; io.unobserve(en.target); }
  });
},{threshold:.08});
document.querySelectorAll('.card, .ol-list li, .pillars > div, .frame, .contact-list li').forEach(el=>{
  el.style.opacity=0; el.style.transform='translateY(16px)'; el.style.transition='opacity .6s ease, transform .6s ease';
  io.observe(el);
});