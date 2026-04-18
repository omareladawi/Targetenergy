const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      menu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const currentPath = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');
if (menu) {
  menu.querySelectorAll('a').forEach((link) => {
    const linkPath = decodeURIComponent(link.getAttribute('href') || '');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    if (!contactForm.checkValidity()) {
      event.preventDefault();
      formStatus.textContent = 'Verifica i campi obbligatori e riprova.';
      formStatus.className = 'form-status error';
      contactForm.reportValidity();
      return;
    }

    event.preventDefault();
    formStatus.textContent = 'Messaggio inviato in locale. Ti risponderemo al più presto.';
    formStatus.className = 'form-status success';
    contactForm.reset();
  });
}
