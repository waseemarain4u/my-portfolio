(function () {
  var ACTIVE_LINK_CLASS = 'text-accent font-medium';
  var INACTIVE_LINK_CLASS = 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors';
  var MOBILE_ACTIVE_LINK_CLASS = 'text-accent';
  var MOBILE_INACTIVE_LINK_CLASS = 'text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors';

  function _applyStoredTheme() {
    var savedTheme = null;
    try {
      savedTheme = localStorage.getItem('theme');
    } catch (e) {}

    if (savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme:dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  }

  _applyStoredTheme();

  var NAV_LINKS = [
    { label: 'Skills',     section: 'services'   },
    { label: 'AI',         section: 'ai-tools'   },
    { label: 'Work',       section: 'work',       pageHref: 'projects.html', key: 'projects' },
    { label: 'About',      section: 'about'      },
    { label: 'Experience', section: 'experience' },
    { label: 'Blog',       section: 'blog',       pageHref: 'blog.html', key: 'blog' },
    { label: 'Contact',    section: 'contact'    },
  ];

  function _isHome(activePage) {
    return activePage === 'home';
  }

  function _href(link, activePage) {
    if (_isHome(activePage) && link.section) return '#' + link.section;
    return link.pageHref || ('index.html#' + link.section);
  }

  function _linkClass(link, activePage) {
    return (link.key && link.key === activePage) ? ACTIVE_LINK_CLASS : INACTIVE_LINK_CLASS;
  }

  function _mobileLinkClass(link, activePage) {
    return 'block ' + ((link.key && link.key === activePage) ? MOBILE_ACTIVE_LINK_CLASS : MOBILE_INACTIVE_LINK_CLASS);
  }

  function _linkAttrs(link) {
    return link.section ? ' data-section="' + link.section + '"' : '';
  }

  function _navHTML(activePage) {
    var desktopLinks = NAV_LINKS.map(function (link) {
      return '<li><a href="' + _href(link, activePage) + '" class="' + _linkClass(link, activePage) + '"' + _linkAttrs(link) + '>' + link.label + '</a></li>';
    }).join('');

    var mobileLinks = NAV_LINKS.map(function (link) {
      return '<li><a href="' + _href(link, activePage) + '" class="' + _mobileLinkClass(link, activePage) + '"' + _linkAttrs(link) + '>' + link.label + '</a></li>';
    }).join('');

    var logoHref = _isHome(activePage) ? '#hero' : 'index.html';
    var contactHref = _isHome(activePage) ? '#contact' : 'index.html#contact';

    return '<header id="site-header" class="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-sm shadow-black/5 transition-all duration-300">'
      + '<nav class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">'
      + '<a href="' + logoHref + '" class="font-display font-bold text-xl tracking-tight">'
      + '<span class="text-zinc-900 dark:text-white">waseem</span><span class="text-accent">.</span>'
      + '</a>'
      + '<ul class="hidden md:flex items-center gap-8 text-sm font-medium" role="list">'
      + desktopLinks
      + '</ul>'
      + '<div class="flex items-center gap-3">'
      + '<button id="dark-toggle" class="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Toggle dark mode">'
      + '<svg id="icon-moon" class="w-4 h-4 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>'
      + '<svg id="icon-sun" class="w-4 h-4 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>'
      + '</button>'
      + '<a href="' + contactHref + '" class="hidden md:inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-accent-light transition-colors">Hire me &rarr;</a>'
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
      + '<a href="' + contactHref + '" class="inline-flex bg-accent text-white font-medium text-sm px-5 py-2.5 rounded-full">Hire me &rarr;</a>'
      + '</li>'
      + '</ul>'
      + '</div>'
      + '</header>';
  }

  function _footerHTML() {
    return '<footer class="border-t border-zinc-100 dark:border-zinc-900">'
      + '<div class="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">'
      + '<p class="text-sm text-zinc-400">&copy; ' + new Date().getFullYear() + ' Waseem Akram. All rights reserved.</p>'
      + '<div class="flex items-center gap-4">'
      + '<a href="https://github.com/waseemarain4u" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">'
      + '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>'
      + '</a>'
      + '<a href="https://www.linkedin.com/in/waseemakramarain/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="text-zinc-400 hover:text-accent transition-colors">'
      + '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
      + '</a>'
      + '</div>'
      + '</div>'
      + '</footer>';
  }

  function _setDarkToggleLabel() {
    var btn = document.getElementById('dark-toggle');
    if (!btn) return;
    btn.setAttribute('aria-label', document.documentElement.classList.contains('dark') ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function _initDarkToggle() {
    var btn = document.getElementById('dark-toggle');
    if (!btn) return;
    _setDarkToggleLabel();
    btn.addEventListener('click', function () {
      document.documentElement.classList.toggle('dark');
      try {
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      } catch (e) {}
      _setDarkToggleLabel();
    });
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

    function updateHeader() {
      if (window.scrollY > 20) {
        header.classList.add('bg-white/90', 'dark:bg-zinc-950/90', 'backdrop-blur-md', 'shadow-sm', 'shadow-black/5');
        header.classList.remove('bg-transparent');
      } else {
        header.classList.remove('bg-white/90', 'dark:bg-zinc-950/90', 'backdrop-blur-md', 'shadow-sm', 'shadow-black/5');
        header.classList.add('bg-transparent');
      }
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  function _setHomeActiveSection(section) {
    document.querySelectorAll('[data-section]').forEach(function (link) {
      var isActive = link.getAttribute('data-section') === section;
      if (link.closest('#mobile-nav')) {
        link.className = 'block ' + (isActive ? MOBILE_ACTIVE_LINK_CLASS : MOBILE_INACTIVE_LINK_CLASS);
      } else {
        link.className = isActive ? ACTIVE_LINK_CLASS : INACTIVE_LINK_CLASS;
      }
    });
  }

  function _initHomeSectionState(activePage) {
    if (!_isHome(activePage)) return;

    function updateSection() {
      var atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 60;
      if (atBottom) {
        _setHomeActiveSection('contact');
        return;
      }

      var ids = ['contact', 'experience', 'about', 'blog', 'work', 'ai-tools', 'services'];
      for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 130) {
          _setHomeActiveSection(ids[i]);
          return;
        }
      }
      _setHomeActiveSection('');
    }

    updateSection();
    window.addEventListener('scroll', updateSection, { passive: true });
  }

  function _init() {
    var body = document.body;
    if (!body) return;

    var activePage = body.getAttribute('data-page') || '';
    var scrollHeader = body.getAttribute('data-scroll-header') === 'true';

    var navSlot = document.getElementById('site-nav');
    if (navSlot) navSlot.outerHTML = _navHTML(activePage);

    var footerSlot = document.getElementById('site-footer');
    if (footerSlot) footerSlot.outerHTML = _footerHTML();

    _initDarkToggle();
    _initMobileMenu();
    _initScrollHeader(scrollHeader);
    _initHomeSectionState(activePage);
  }

  if (document.body) {
    _init();
  } else {
    document.addEventListener('DOMContentLoaded', _init);
  }
})();
