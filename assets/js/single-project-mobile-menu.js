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
    <nav class="mob-menu-nav">
      <a href="index.html#home" class="mob-menu-link">home</a>
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
