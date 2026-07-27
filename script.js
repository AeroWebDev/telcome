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

var canvas = document.getElementById('network-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ctx = canvas.getContext('2d');
    var nodes = [];
    var w, h;

    function resize() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * (window.devicePixelRatio || 1);
      canvas.height = h * (window.devicePixelRatio || 1);
      ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
    }

    function initNodes() {
      var count = Math.max(28, Math.floor((w * h) / 24000));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.8 + 1
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      var lineRGB = isLight ? '8,139,146' : '41,231,231';
      var dotRGBA = isLight ? 'rgba(37,88,203,0.65)' : 'rgba(158,204,255,0.85)';

      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var a = nodes[i], b = nodes[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var maxDist = 160;
          if (dist < maxDist) {
            ctx.strokeStyle = 'rgba(' + lineRGB + ',' + (0.22 * (1 - dist / maxDist)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        ctx.fillStyle = dotRGBA;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(step);
    }

    resize();
    initNodes();
    requestAnimationFrame(step);
    window.addEventListener('resize', function () {
      resize();
      initNodes();
    });
  }