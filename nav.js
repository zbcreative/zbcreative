/* ═══════════════════════════════════════
   nav.js — Shared site navigation for ZB Creative
   Drop <div id="site-nav"></div><script src="/nav.js"></script>
   into any page to get the full nav + mobile menu.
   ═══════════════════════════════════════ */
(function(){
  /* ── Detect homepage vs subpage ── */
  var p = window.location.pathname.replace(/\/index\.html$/,'');
  var isHome = (p === '' || p === '/');
  var pre = isHome ? '' : '/';

  /* ── Inject nav CSS ── */
  var css = document.createElement('style');
  css.textContent =
    'header{position:fixed;top:0;left:0;right:0;z-index:100}' +
    '.ni{display:flex;align-items:center;justify-content:space-between;padding:10px clamp(20px,5vw,48px);background:rgba(245,240,228,.93);backdrop-filter:blur(14px);border-bottom:1.5px solid rgba(26,26,26,.07)}' +
    '.nl{height:72px;width:auto}' +
    'nav ul{display:flex;align-items:center;gap:clamp(16px,2.4vw,30px)}' +
    'nav a{font-family:var(--fd);font-size:.9rem;font-weight:700;letter-spacing:-.01em;transition:color .2s;position:relative}' +
    'nav a::after{content:"";position:absolute;bottom:-3px;left:0;right:0;height:2px;background:var(--or);transform:scaleX(0);transition:transform .2s}' +
    'nav a:hover{color:var(--or)} nav a:hover::after{transform:scaleX(1)}' +
    'nav a.active{color:var(--or)} nav a.active::after{transform:scaleX(1)}' +
    '.mtog{display:none;flex-direction:column;gap:5px;padding:8px}' +
    '.mtog span{display:block;width:24px;height:2px;background:var(--ch);border-radius:2px;transition:all .3s}' +
    '.mm{display:none;position:fixed;inset:0;z-index:99;background:var(--cream);flex-direction:column;align-items:center;justify-content:center;gap:0;opacity:0;pointer-events:none;transition:opacity .3s;padding-top:80px;padding-bottom:32px;overflow-y:auto}' +
    '.mm.on{opacity:1;pointer-events:all}' +
    '.mm a.ml{font-family:var(--fd);font-size:1.25rem;font-weight:900;transition:color .2s;padding:7px 0} .mm a.ml:hover{color:var(--or)}' +
    '.mm-group{display:flex;flex-direction:column;align-items:center;width:100%;max-width:260px;padding:10px 0}' +
    '.mm-group+.mm-group{border-top:1.5px solid rgba(26,26,26,.1);margin-top:4px;padding-top:14px}' +
    '.mm-label{font-family:var(--fb);font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--gl);margin-bottom:6px}' +
    '.mcl{position:absolute;top:18px;right:22px;font-size:1.8rem;color:var(--ch)}' +
    '.mm a.ml.active{color:var(--or)}' +
    '.ncta{display:inline-flex}' +
    '@media(max-width:640px){nav ul,.ncta{display:none} .mtog{display:flex} .mm{display:flex}}';
  document.head.appendChild(css);

  /* ── Anchor links: prefix with / on subpages ── */
  var anchors = [
    { hash:'#services',   label:'Services' },
    { hash:'#ai-section', label:'AI Search' },
    { hash:'#process',    label:'How It Works' },
    { hash:'#founder',    label:'About' },
    { hash:'#reviews',    label:'Results' }
  ];

  /* ── Build desktop nav links ── */
  var desktopLinks = '';
  anchors.forEach(function(a){
    desktopLinks += '<li><a href="' + pre + a.hash + '" class="nav-link">' + a.label + '</a></li>';
  });
  desktopLinks += '<li><a href="/faq" class="nav-link">FAQs</a></li>';
  desktopLinks += '<li><a href="/portfolio" class="nav-link">Portfolio</a></li>';
  desktopLinks += '<li><a href="/blog" class="nav-link">Blog</a></li>';
  desktopLinks += '<li><a href="/resources" class="nav-link">Resources</a></li>';
  desktopLinks += '<li><a href="/industries" class="nav-link">Industries</a></li>';

  /* ── Build mobile menu links (grouped) ── */
  var mobileExplore = '';
  anchors.forEach(function(a){
    mobileExplore += '<a href="' + pre + a.hash + '" class="ml">' + a.label + '</a>';
  });

  /* ── Full HTML ── */
  var html =
    '<!-- Mobile overlay -->' +
    '<div class="mm" id="mm" role="dialog" aria-modal="true">' +
      '<button class="mcl" id="mcl" aria-label="Close menu">✕</button>' +
      '<div class="mm-group">' +
        '<span class="mm-label">Explore</span>' +
        mobileExplore +
      '</div>' +
      '<div class="mm-group">' +
        '<span class="mm-label">More</span>' +
        '<a href="/faq" class="ml">FAQs</a>' +
        '<a href="/portfolio" class="ml">Portfolio</a>' +
        '<a href="/blog" class="ml">Blog</a>' +
        '<a href="/resources" class="ml">Resources</a>' +
        '<a href="/industries" class="ml">Industries</a>' +
      '</div>' +
      '<a href="/get-started" class="btn bor" style="margin-top:14px">Get Started</a>' +
    '</div>' +

    '<!-- NAV -->' +
    '<header role="banner">' +
      '<div class="ni">' +
        '<a href="/" aria-label="ZB Creative home">' +
          '<img src="/ZB_Creative_Logo.webp" alt="ZB Creative — web design agency" class="nl" height="72" />' +
        '</a>' +
        '<nav role="navigation" aria-label="Main navigation">' +
          '<ul>' + desktopLinks + '</ul>' +
        '</nav>' +
        '<a href="/get-started" class="btn bor ncta">Get Started</a>' +
        '<button class="mtog" id="mtog" aria-label="Open menu"><span></span><span></span><span></span></button>' +
      '</div>' +
    '</header>';

  /* ── Inject into placeholder ── */
  var target = document.getElementById('site-nav');
  if(target){
    target.innerHTML = html;
  } else {
    /* Fallback: prepend to body if no placeholder found */
    document.body.insertAdjacentHTML('afterbegin', html);
  }

  /* ── Nav logic (runs after HTML is in DOM) ── */
  var header = document.querySelector('header');
  function getOffset(){ return header ? header.offsetHeight + 8 : 80; }

  /* Mobile menu toggle */
  var tog = document.getElementById('mtog');
  var menu = document.getElementById('mm');
  var cls = document.getElementById('mcl');
  function openMenu(){ menu.classList.add('on'); document.body.style.overflow='hidden'; tog.setAttribute('aria-expanded','true'); }
  function closeMenu(){ menu.classList.remove('on'); document.body.style.overflow=''; tog.setAttribute('aria-expanded','false'); }
  tog.addEventListener('click', function(){ menu.classList.contains('on') ? closeMenu() : openMenu(); });
  cls.addEventListener('click', closeMenu);

  /* Smooth scroll for anchor links (desktop + mobile) */
  document.querySelectorAll('.nav-link, .ml, a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      var href = link.getAttribute('href');
      if(!href || href === '#') return;

      /* Extract hash — handles both "#faq" and "/#faq" */
      var hashIndex = href.indexOf('#');
      if(hashIndex === -1) return;
      var hash = href.substring(hashIndex);

      /* If we're on the homepage, scroll directly */
      if(isHome){
        var el = document.querySelector(hash);
        if(!el) return;
        e.preventDefault();
        var top = el.getBoundingClientRect().top + window.scrollY - getOffset();
        window.scrollTo({ top:top, behavior:'smooth' });
        closeMenu();
      } else {
        /* On subpages, let the browser navigate to /#hash */
        closeMenu();
      }
    });
  });

  /* Active nav link highlight on scroll (homepage only) */
  if(isHome){
    var sectionIds = ['services','ai-section','process','founder','reviews','contact'];
    var secs = sectionIds.map(function(id){ return document.getElementById(id); }).filter(Boolean);
    var navLks = document.querySelectorAll('.nav-link');
    function setActive(){
      var scrollY = window.scrollY + getOffset() + 20;
      var current = '';
      secs.forEach(function(sec){ if(sec.offsetTop <= scrollY) current = sec.id; });
      navLks.forEach(function(link){
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    }
    window.addEventListener('scroll', setActive, { passive:true });
    setActive();
  } else {
    /* Highlight current page on subpages (desktop + mobile) */
    var clean = p.replace(/\/$/,'') || '/';
    document.querySelectorAll('.nav-link, .mm a.ml').forEach(function(link){
      var href = (link.getAttribute('href') || '').replace(/\/$/,'');
      /* Match exact path or parent path (e.g. /resources/guide → /resources) */
      if(href && href.indexOf('#') === -1 && (clean === href || clean.indexOf(href + '/') === 0)){
        link.classList.add('active');
      }
    });
  }
})();
