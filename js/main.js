/* ===== ONE NAIL SPA · main.js ===== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.getElementById('intro');
  function closeIntro() { if (intro) { intro.classList.add('done'); setTimeout(function () { intro.style.display = 'none'; }, 800); } }
  if (intro) { if (reduce) intro.style.display = 'none'; else { document.getElementById('intro-skip').addEventListener('click', closeIntro); setTimeout(closeIntro, 2800); } }

  var header = document.getElementById('site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burger'), nav = document.querySelector('.nav');
  burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); document.body.style.overflow = ''; }); });

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { io.observe(r); });
    setTimeout(function () { reveals.forEach(function (r) { if (r.getBoundingClientRect().top < window.innerHeight) r.classList.add('in'); }); }, 1500);
  } else reveals.forEach(function (r) { r.classList.add('in'); });

  var TABLE = { 2: [9, 21], 3: [9, 21], 4: [9, 21], 5: [9, 21], 6: [9, 21], 0: [10, 20] }; // Tue..Sat 9-21, Sun 10-20; Mon closed
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function romeNow() { return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' })); }
  function isOpen(d) { var o = TABLE[d.getDay()], h = d.getHours() + d.getMinutes() / 60; return !!o && h >= o[0] && h < o[1]; }
  function updateLive() {
    var d = romeNow(), open = isOpen(d), dot = document.getElementById('live-dot'), txt = document.getElementById('live-text');
    if (!dot) return; var en = LANG === 'en', day = d.getDay(), h = d.getHours() + d.getMinutes() / 60;
    if (open) { dot.className = 'open'; txt.textContent = (en ? 'Open now · closes at ' : 'Aperto ora · chiude alle ') + TABLE[day][1] + ':00'; }
    else {
      dot.className = 'closed'; var info;
      if (TABLE[day] && h < TABLE[day][0]) info = { d: day, t: TABLE[day][0], off: 0 };
      else { for (var i = 1; i <= 7; i++) { var nd = (day + i) % 7; if (TABLE[nd]) { info = { d: nd, t: TABLE[nd][0], off: i }; break; } } }
      var name = info.off === 0 ? (en ? 'today' : 'oggi') : (en ? DAYS_EN[info.d] : DAYS_IT[info.d]);
      txt.textContent = (en ? 'Closed · opens ' + name + ' at ' : 'Chiuso · apre ' + name + ' alle ') + info.t + ':00';
    }
  }

  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lb-img');
  document.querySelectorAll('.g-item').forEach(function (fig) { fig.addEventListener('click', function () { lbImg.src = fig.getAttribute('data-full'); lbImg.alt = (fig.querySelector('img') || {}).alt || ''; lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); }); });
  function closeLb() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); setTimeout(function () { lbImg.src = ''; }, 300); }
  document.getElementById('lb-close').addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  var LANG = 'it';
  var EN = {
    'intro.txt': 'One Nail Spa', 'intro.skip': 'Enter →', 'brand.sub': 'Manicure · Pedicure · 2 locations in Milan',
    'nav.colori': 'Colours', 'nav.servizi': 'Services', 'nav.sedi': 'Locations', 'nav.dove': 'Book', 'cta.book': 'Book',
    'hero.eyebrow': '★ 4.7 · Manicure · Pedicure · Nail art', 'hero.h1a': 'Hands and feet,', 'hero.h1b': 'as good as new.',
    'hero.sub': "Gel polish, extensions, nail art — and hands you can trust, year after year. Two locations in Milan, open on Sundays too. You pick the colour, we do the rest.",
    'hero.cta1': 'Book on WhatsApp', 'hero.cta2': 'Pick a colour', 'hero.live': 'Checking hours…',
    'colori.kicker': 'The colour wall', 'colori.h2': 'Pick yours.', 'colori.lead': 'Nude, red, mauve, glitter: hundreds of polishes and gels. The hard part is only choosing.',
    'servizi.kicker': 'Services', 'servizi.h2': 'Everything for your hands (and feet).',
    'sv.1t': 'Manicure & gel polish', 'sv.1p': 'Hand care, polish or gel that lasts for weeks.',
    'sv.2t': 'Pedicure', 'sv.2p': 'Cosmetic and curative pedicure, in our spa chairs.',
    'sv.3t': 'Extensions & Nail art', 'sv.3p': 'Extensions, gel, refill and nail art: the shape and design you want.',
    'sv.4t': 'Lash extensions', 'sv.4p': 'An intense, natural gaze, lash by lash. Basic beauty too.',
    'servizi.note': 'Price list and availability online. Book at whichever location suits you best.',
    'sedi.kicker': 'Locations', 'sedi.h2': 'Two addresses, the same care.',
    'sede.1tag': 'One Nail Spa', 'sede.1addr': '20134 Milan', 'sede.2tag': 'One Nail Spa 2', 'sede.2addr': 'Città Studi · 20131 Milan',
    'sede.tel': 'Phone', 'sede.hours': 'Hours', 'sede.1hours': 'Tue–Sat 9–21 · Sun 10–20 · Mon closed', 'sede.2hours': 'Opens at 9 · see Google for details', 'sede.route': 'Get directions →',
    'gallery.kicker': 'Gallery', 'gallery.h2': 'The latest work',
    'rev.kicker': 'Voices', 'rev.h2': '4.7★ · and people keep coming back',
    'dove.kicker': 'Book', 'dove.h2': 'Your next appointment,<br>in two taps.', 'dove.p': "Pick the location that suits you and message us on WhatsApp, or book online. We're waiting for you — on Sundays too.",
    'dove.wa1': 'WhatsApp · Via Ronchi', 'dove.wa2': 'WhatsApp · Via Pacini',
    'faq.h2': 'Frequently asked',
    'faq.q1': 'How many locations do you have?', 'faq.a1': 'Two: Via Ronchi 31 and Via Giovanni Pacini 22 (One Nail Spa 2), both in Milan.',
    'faq.q2': 'When are you open?', 'faq.a2': 'Tuesday to Saturday 9–21 and Sunday 10–20. Closed Monday (Via Ronchi).',
    'faq.q3': 'What services do you offer?', 'faq.a3': 'Manicure and pedicure, gel polish, extensions, nail art and lash extensions.',
    'faq.q4': 'How do I book?', 'faq.a4': 'Online or on WhatsApp: 331 713 3577 (Via Ronchi), 339 338 6431 (Via Pacini).',
    'foot.sub': 'Manicure · Pedicure · Milan', 'foot.s1': 'Via Ronchi 31', 'foot.s2': 'Via Pacini 22', 'foot.hours': 'Hours',
    'foot.disclaimer': 'Demo website. Content and photos gathered from public sources (Google Maps); hours, services and prices are indicative, to be confirmed with the salon.',
    'ab.book': 'Book', 'ab.route': 'Directions'
  };
  var IT = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) { IT[el.getAttribute('data-i18n')] = el.innerHTML; });
  function setLang(lang) {
    LANG = lang; var dict = lang === 'en' ? EN : IT;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'), v = dict[k]; if (v == null && lang === 'en') v = IT[k]; if (v != null) el.innerHTML = v; });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-lang') === lang); });
    updateLive();
  }
  document.querySelectorAll('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });
  updateLive(); setInterval(updateLive, 60000);
})();
