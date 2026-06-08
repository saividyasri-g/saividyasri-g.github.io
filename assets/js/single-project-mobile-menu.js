(() => {
  const body = document.body;
  if (!body || !body.classList.contains('single-project')) return;
  if (document.getElementById('mob-menu-btn') || document.getElementById('mob-menu-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'mob-menu-modal';
  modal.className = 'mob-menu-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-label', 'Navigation menu');
  modal.innerHTML = `
    <a href="index.html#home" class="mob-menu-logo" aria-label="Home">
      <svg class="logo-svg" width="36" height="36" viewBox="0 0 36 36" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="mob-logo-sq-clip-project">
            <rect width="36" height="36" rx="6"></rect>
          </clipPath>
        </defs>
        <g clip-path="url(#mob-logo-sq-clip-project)">
          <rect width="36" height="36" fill="transparent"></rect>
          <g class="scan-track">
            <line x1="0" y1="-9" x2="36" y2="-9" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="-6" x2="36" y2="-6" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="-3" x2="36" y2="-3" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="0" x2="36" y2="0" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="3" x2="36" y2="3" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="6" x2="36" y2="6" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="9" x2="36" y2="9" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="12" x2="36" y2="12" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="15" x2="36" y2="15" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="18" x2="36" y2="18" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="21" x2="36" y2="21" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="24" x2="36" y2="24" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="27" x2="36" y2="27" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="30" x2="36" y2="30" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="33" x2="36" y2="33" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="36" x2="36" y2="36" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="39" x2="36" y2="39" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="42" x2="36" y2="42" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
            <line x1="0" y1="45" x2="36" y2="45" stroke="rgba(197,4,165,0.14)" stroke-width="0.5"></line>
          </g>
        </g>
        <text class="logo-text" x="18" y="22" text-anchor="middle" font-family="Barlow,sans-serif" font-size="11" font-weight="700" letter-spacing="0.5" fill="#C504A5">.svg</text>
      </svg>
    </a>
    <nav class="mob-menu-nav">
      <a href="index.html#work" class="mob-menu-link">work</a>
      <a href="index.html#expt" class="mob-menu-link">experiments</a>
      <a href="index.html#about" class="mob-menu-link">about</a>
      <a href="assets/media/resume.pdf" class="mob-menu-link" target="_blank" rel="noopener noreferrer">resume</a>
    </nav>
  `;

  const btn = document.createElement('button');
  btn.id = 'mob-menu-btn';
  btn.className = 'mob-menu-btn';
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'mob-menu-modal');
  btn.innerHTML = `
    <i class="fa-solid fa-bars mob-menu-btn-icon"></i>
    <span class="mob-menu-btn-label">Menu</span>
  `;

  body.appendChild(modal);
  body.appendChild(btn);

  const icon = btn.querySelector('.mob-menu-btn-icon');
  const label = btn.querySelector('.mob-menu-btn-label');

  const open = () => {
    modal.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    if (icon) icon.className = 'fa-solid fa-xmark mob-menu-btn-icon';
    if (label) label.textContent = 'Close';
  };

  const close = () => {
    modal.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    if (icon) icon.className = 'fa-solid fa-bars mob-menu-btn-icon';
    if (label) label.textContent = 'Menu';
  };

  btn.addEventListener('click', () => {
    if (modal.classList.contains('is-open')) {
      close();
    } else {
      open();
    }
  });

  modal.querySelectorAll('.mob-menu-link').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  document.addEventListener('click', (event) => {
    if (!modal.classList.contains('is-open')) return;
    const target = event.target;
    if (target instanceof Element && !modal.contains(target) && !btn.contains(target)) {
      close();
    }
  });
})();
