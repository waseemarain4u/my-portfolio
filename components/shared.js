(function () {

  // Apply dark mode immediately (runs when script is parsed, before defer)
  var _t = localStorage.getItem('theme');
  if (_t === 'dark' || (_t === null && window.matchMedia('(prefers-color-scheme:dark)').matches)) {
    document.documentElement.classList.add('dark');
  }

  var NAV_LINKS = [
    { label: 'Skills',     href: 'index.html#services',  key: ''         },
    { label: 'Work',       href: 'projects.html',         key: 'projects' },
    { label: 'About',      href: 'index.html#about',      key: ''         },
    { label: 'Experience', href: 'index.html#experience', key: ''         },
    { label: 'Blog',       href: 'blog.html',             key: 'blog'     },
    { label: 'Contact',    href: 'index.html#contact',    key: ''         },
  ];

  function _activeClass(key, activePage) {
    return (key && key === activePage)
      ? 'text-accent font-medium'
      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors';
  }

  function _mobileActiveClass(key, activePage) {
    return 'block ' + ((key && key === activePage)
      ? 'text-accent'
      : 'text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors');
  }

  function _navHTML(activePage) {
    var desktopLinks = NAV_LINKS.map(function (l) {
      return '<li><a href="' + l.href + '" class="' + _activeClass(l.key, activePage) + '">' + l.label + '</a></li>';
    }).join('');

    var mobileLinks = NAV_LINKS.map(function (l) {
      return '<li><a href="' + l.href + '" class="' + _mobileActiveClass(l.key, activePage) + '">' + l.label + '</a></li>';
    }).join('');

    return '<header id="site-header" class="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm shadow-black/5 transition-all duration-300">'
      + '<nav class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">'
      + '<a href="index.html" class="font-display font-bold text-xl tracking-tight">'
      + '<span class="text-zinc-900 dark:text-white">waseem</span><span class="text-accent">.</span>'
      + '</a>'
      + '<ul class="hidden md:flex items-center gap-8 text-sm font-medium" role="list">'
      + desktopLinks
      + '</ul>'
      + '<div class="flex items-center gap-3">'
      + '<button id="dark-toggle" onclick="(function(){var d=document.documentElement;d.classList.toggle(\'dark\');localStorage.setItem(\'theme\',d.classList.contains(\'dark\')?\'dark\':\'light\')})()" class="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Toggle dark mode">'
      + '<svg id="icon-moon" class="w-4 h-4 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>'
      + '<svg id="icon-sun" class="w-4 h-4 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>'
      + '</button>'
      + '<a href="index.html#contact" class="hidden md:inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-accent-light transition-colors">Hire me &rarr;</a>'
      + '<button id="mobile-menu-btn" class="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800" aria-label="Toggle menu" aria-expanded="false">'
      + '<svg id="icon-open" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>'
      + '<svg id="icon-close" class="w-4 h-4 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'
      + '</button>'
      + '</div>'
      + '</nav>'
      + '<div id="mobile-nav" class="hidden md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">'
      + '<ul class="flex flex-col px-6 py-5 gap-4 text-sm font-medium" role="list">'
      + mobileLinks
      + '<li class="pt-2 border-t border-zinc-100 dark:border-zinc-900">'
      + '<a href="index.html#contact" class="inline-flex bg-accent text-white font-medium text-sm px-5 py-2.5 rounded-full">Hire me &rarr;</a>'
      + '</li>'
      + '</ul>'
      + '</div>'
      + '</header>';
  }

  function _footerHTML() {
    return '<footer class="border-t border-zinc-100 dark:border-zinc-900">'
      + '<div class="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">'
      + '<p class="text-sm text-zinc-400">&copy; ' + new Date().getFullYear() + ' Waseem Akram. All rights reserved.</p>'
      + '<p class="text-xs text-zinc-500">Senior Flutter Developer &amp; Lead Developer</p>'
      + '</div>'
      + '</footer>';
  }

  function _initMobileMenu() {
    var btn = document.getElementById('mobile-menu-btn');
    var nav = document.getElementById('mobile-nav');
    var iconOpen = document.getElementById('icon-open');
    var iconClose = document.getElementById('icon-close');
    if (!btn || !nav) return;

    btn.addEventListener('click', function () {
      var opening = nav.classList.contains('hidden');
      nav.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', opening ? 'true' : 'false');
      iconOpen.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      }
    });
  }

  function _initScrollHeader(scrollable) {
    var header = document.getElementById('site-header');
    if (!header || !scrollable) return;
    header.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'shadow-black/5');
    header.classList.add('bg-transparent');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.classList.add('bg-white/90', 'dark:bg-zinc-950/90', 'backdrop-blur-md', 'shadow-sm', 'shadow-black/5');
        header.classList.remove('bg-transparent');
      } else {
        header.classList.remove('bg-white/90', 'dark:bg-zinc-950/90', 'backdrop-blur-md', 'shadow-sm', 'shadow-black/5');
        header.classList.add('bg-transparent');
      }
    }, { passive: true });
  }

  // Auto-initialize using data attributes on <body>
  // Usage: <body data-page="blog"> or <body data-page="projects" data-scroll-header="true">
  var body = document.body;
  var activePage = body ? (body.getAttribute('data-page') || '') : '';
  var scrollHeader = body ? body.getAttribute('data-scroll-header') === 'true' : false;

  var navSlot = document.getElementById('site-nav');
  if (navSlot) navSlot.outerHTML = _navHTML(activePage);

  var footerSlot = document.getElementById('site-footer');
  if (footerSlot) footerSlot.outerHTML = _footerHTML();

  _initMobileMenu();
  _initScrollHeader(scrollHeader);

})();
