(() => {
  const body = document.body;
  if (!body || !body.classList.contains('single-project')) return;

  const sidebar = document.querySelector('.cs-local-sidebar');
  if (!sidebar) return;
  const scroller = sidebar.querySelector('.sticky-wrapper');
  const links = Array.from(sidebar.querySelectorAll('a[href^="#"]'));
  if (!scroller || !links.length) return;

  const mm = window.matchMedia('(max-width: 1024px)');
  const topInset = () => {
    const v = getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)');
    return Number.parseFloat(v) || 0;
  };

  let pinned = false;
  let activeLinkTimer = null;
  let spacer = null;
  let sentinel = null;
  let mobileInitialized = false;

  const revealActiveLink = (link, smooth = true) => {
    if (!mm.matches || !scroller || !link) return;
    const behavior = smooth ? 'smooth' : 'auto';
    link.scrollIntoView({ inline: 'center', block: 'nearest', behavior });
  };

  const scheduleRevealActiveLink = (smooth = true) => {
    if (activeLinkTimer) window.clearTimeout(activeLinkTimer);
    activeLinkTimer = window.setTimeout(() => {
      const active = sidebar.querySelector('a.active');
      revealActiveLink(active, smooth);
    }, 30);
  };

  const syncSpacer = () => {
    if (!spacer) return;
    spacer.style.height = pinned ? `${Math.ceil(sidebar.getBoundingClientRect().height)}px` : '0px';
  };

  const setPinned = (next) => {
    if (pinned === next) return;
    pinned = next;
    sidebar.classList.toggle('is-stuck', pinned);
    syncSpacer();
  };

  const cleanupMobile = () => {
    setPinned(false);
    if (sentinel) sentinel.remove();
    if (spacer) spacer.remove();
    sentinel = null;
    spacer = null;
    mobileInitialized = false;
  };

  const ensureMobileStructure = () => {
    if (mobileInitialized) return;
    sentinel = document.createElement('div');
    sentinel.className = 'cs-local-sidebar-sentinel';
    sentinel.setAttribute('aria-hidden', 'true');
    sidebar.before(sentinel);

    spacer = document.createElement('div');
    spacer.className = 'cs-local-sidebar-pin-spacer';
    spacer.style.height = '0px';
    sidebar.after(spacer);
    mobileInitialized = true;
  };

  const onScroll = () => {
    if (!mm.matches) {
      cleanupMobile();
      return;
    }
    ensureMobileStructure();
    const y = sentinel.getBoundingClientRect().top;
    setPinned(y <= topInset());
  };

  const onResize = () => {
    if (!mm.matches) {
      cleanupMobile();
      return;
    }
    ensureMobileStructure();
    syncSpacer();
    onScroll();
    scheduleRevealActiveLink(false);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  mm.addEventListener('change', onResize);

  links.forEach((link) => {
    link.addEventListener('click', () => {
      window.requestAnimationFrame(() => revealActiveLink(link, true));
    });
  });

  const activeObserver = new MutationObserver(() => {
    scheduleRevealActiveLink(true);
  });

  links.forEach((link) => {
    activeObserver.observe(link, { attributes: true, attributeFilter: ['class'] });
  });

  scheduleRevealActiveLink(false);
  onResize();
})();
