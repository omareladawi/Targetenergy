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
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const placeholderAction = (contactForm.dataset.placeholderAction || '').trim();
  const mailtoLink = document.querySelector('a[href^="mailto:"]');
  const contactEmail = mailtoLink ? (mailtoLink.getAttribute('href') || '').replace(/^mailto:/i, '') : '';

  contactForm.addEventListener('submit', async (event) => {
    if (!contactForm.checkValidity()) {
      event.preventDefault();
      formStatus.textContent = 'Verifica i campi obbligatori e riprova.';
      formStatus.className = 'form-status error';
      contactForm.reportValidity();
      return;
    }

    event.preventDefault();
    const action = (contactForm.getAttribute('action') || '').trim();
    if (!action || (placeholderAction && action === placeholderAction)) {
      formStatus.textContent = 'Configura l’endpoint del form prima di inviare la richiesta.';
      formStatus.className = 'form-status error';
      return;
    }

    const formData = new FormData(contactForm);
    if (formData.get('_gotcha')) {
      contactForm.reset();
      formStatus.textContent = 'Richiesta inviata.';
      formStatus.className = 'form-status success';
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
    }
    contactForm.setAttribute('aria-busy', 'true');
    formStatus.textContent = 'Invio in corso...';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(action, {
        method: (contactForm.getAttribute('method') || 'POST').toUpperCase(),
        headers: { Accept: 'application/json' },
        body: formData
      });

      if (!response.ok) {
        throw new Error('network');
      }

      formStatus.textContent = 'Messaggio inviato con successo. Ti risponderemo al più presto.';
      formStatus.className = 'form-status success';
      contactForm.reset();
    } catch (error) {
      formStatus.textContent = contactEmail
        ? `Invio non riuscito. Riprova tra poco o scrivi a ${contactEmail}.`
        : 'Invio non riuscito. Riprova tra poco.';
      formStatus.className = 'form-status error';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
      contactForm.removeAttribute('aria-busy');
    }
  });
}
