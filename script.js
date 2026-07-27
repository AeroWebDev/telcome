// Set current year if element exists
const yrEl = document.getElementById('yr');
if (yrEl) {
  yrEl.textContent = new Date().getFullYear();
}

// Contact form submit handler -> sends email to support@butterflyiprn.com
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name ? form.name.value.trim() : '';
  const email = form.email ? form.email.value.trim() : '';
  const msg = form.msg ? form.msg.value.trim() : '';

  const recipient = 'support@butterflyiprn.com';
  const subject = encodeURIComponent(`Inquiry from ${name || 'Website Visitor'}`);
  const bodyContent = `Name: ${name}\nWork Email: ${email}\n\nMessage / Corridor Request:\n${msg}`;
  
  // Launch default email client with prefilled details
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;

  const note = document.getElementById('formNote');
  if (note) {
    note.textContent = '✓ Opening email client to send message to support@butterflyiprn.com...';
  }

  form.reset();
  return false;
}

// Mobile Nav Toggle
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.nav nav, .main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('is-active');
    });
  }
});

// Scroll reveal animations
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.style.opacity = '1';
        en.target.style.transform = 'translateY(0)';
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.card, .ol-list li, .pillars > div, .frame, .contact-list li, .telemetry-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .6s cubic-bezier(0.16, 1, 0.3, 1), transform .6s cubic-bezier(0.16, 1, 0.3, 1)';
    io.observe(el);
  });
}