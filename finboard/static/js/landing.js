(() => {
  const form = document.querySelector('#waitlist-form');
  const cpf = document.querySelector('#contact-cpf');
  const feedback = document.querySelector('#waitlist-feedback');
  const toast = document.querySelector('#landing-toast');
  const toastMessage = document.querySelector('#landing-toast-message');
  const header = document.querySelector('#landing-header');
  let toastTimer;

  const showToast = (message) => {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3500);
  };

  cpf?.addEventListener('input', () => {
    const digits = cpf.value.replace(/\D/g, '').slice(0, 11);
    cpf.value = digits.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    const leads = JSON.parse(window.localStorage.getItem('ema_waitlist') || '[]');
    leads.push({ ...data, createdAt: new Date().toISOString() });
    window.localStorage.setItem('ema_waitlist', JSON.stringify(leads));
    feedback.textContent = `Tudo certo, ${data.name.split(' ')[0]}! Você entrou na lista do Ema, Ema, Ema. Avisaremos quando houver novidades.`;
    feedback.classList.add('is-visible');
    form.reset();
    showToast('Cadastro confirmado. Obrigado por acompanhar o Ema, Ema, Ema.');
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .14 });
  document.querySelectorAll('.benefit-card, .waitlist-section, .trust-strip, .process-section, .feature-section, .agent-section, .security-section').forEach((element) => {
    element.classList.add('reveal-on-scroll');
    revealObserver.observe(element);
  });

  const setActiveProcess = (key) => {
    document.querySelectorAll('[data-process]').forEach((button) => {
      const active = button.dataset.process === key;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('[data-process-panel]').forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.processPanel === key);
    });
  };
  document.querySelectorAll('[data-process]').forEach((button) => {
    button.addEventListener('click', () => setActiveProcess(button.dataset.process));
  });

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const visual = document.querySelector('.hero-visual');
  const preview = document.querySelector('.dashboard-preview');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (visual && preview && !reducedMotion) {
    visual.addEventListener('pointermove', (event) => {
      const bounds = visual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      preview.style.setProperty('--preview-rotate-y', `${x * 3 - 2}deg`);
      preview.style.setProperty('--preview-rotate-x', `${y * -2 + 1}deg`);
    });
    visual.addEventListener('pointerleave', () => {
      preview.style.setProperty('--preview-rotate-y', '-4deg');
      preview.style.setProperty('--preview-rotate-x', '2deg');
    });
  }
})();
