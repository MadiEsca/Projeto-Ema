(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const sidebar = $('#sidebar');
  const overlay = $('#sidebar-overlay');
  const setSidebar = (open) => {
    sidebar?.classList.toggle('is-open', open);
    overlay?.classList.toggle('is-visible', open);
  };
  $('#open-sidebar')?.addEventListener('click', () => setSidebar(true));
  $('#close-sidebar')?.addEventListener('click', () => setSidebar(false));
  overlay?.addEventListener('click', () => setSidebar(false));
  $$('.nav-link').forEach((link) => link.addEventListener('click', () => setSidebar(false)));

  const toast = $('#toast');
  const toastMessage = $('#toast-message');
  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
  };
  $$('[data-toast]').forEach((button) => {
    button.addEventListener('click', (event) => {
      if (button.getAttribute('href') === '#') event.preventDefault();
      showToast(button.dataset.toast);
    });
  });

  const movementTitle = $('#movement-title');
  const movementSubmit = $('#movement-submit');
  const movementCategory = $('#movement-category');
  const movementTabs = $$('.movement-tab');
  const categoryOptions = {
    income: ['Salário', 'Freelance', 'Reembolso', 'Rendimentos', 'Outros'],
    expense: ['Casa', 'Alimentação', 'Transporte', 'Assinaturas', 'Lazer', 'Saúde', 'Outros'],
  };
  let movementType = 'income';
  const updateMovementType = (type, shouldScroll = false) => {
    movementType = type === 'expense' ? 'expense' : 'income';
    movementTabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.movementType === movementType));
    movementTitle.textContent = movementType === 'income' ? 'Adicionar receita' : 'Adicionar despesa';
    movementSubmit.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>Salvar ${movementType === 'income' ? 'receita' : 'despesa'}`;
    movementCategory.innerHTML = categoryOptions[movementType].map((category) => `<option>${category}</option>`).join('');
    if (shouldScroll) $('#movement-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  movementTabs.forEach((tab) => tab.addEventListener('click', () => updateMovementType(tab.dataset.movementType)));

  $$('.shortcut-card__action[data-flow-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.flowTarget;
      if (target === 'import') {
        $('#import-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setImportMode('bank');
      } else {
        updateMovementType(target, true);
      }
    });
  });

  const movementFeedback = $('#movement-feedback');
  $('#movement-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const description = $('#movement-description').value.trim() || (movementType === 'income' ? 'Nova receita' : 'Nova despesa');
    const amount = $('#movement-amount').value.trim() || '0,00';
    movementFeedback.textContent = `${movementType === 'income' ? 'Receita' : 'Despesa'} “${description}” de R$ ${amount} pronta para ser salva.`;
    movementFeedback.classList.add('is-visible');
    showToast(`${movementType === 'income' ? 'Receita' : 'Despesa'} registrada no modo demonstrativo.`);
  });

  const importTabs = $$('.import-tab');
  const importViews = $$('.import-view');
  function setImportMode(mode) {
    importTabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.importMode === mode));
    importViews.forEach((view) => view.classList.toggle('is-active', view.dataset.importView === mode));
  }
  importTabs.forEach((tab) => tab.addEventListener('click', () => setImportMode(tab.dataset.importMode)));
  $$('[data-import-mode-target]').forEach((button) => button.addEventListener('click', () => {
    setImportMode(button.dataset.importModeTarget);
    $('#import-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  $$('[data-connect-bank]').forEach((button) => {
    button.addEventListener('click', () => {
      const bank = button.dataset.connectBank;
      button.disabled = true;
      button.innerHTML = 'Conectado <span>✓</span>';
      button.classList.add('is-connected');
      showToast(`${bank} conectado no modo demonstrativo.`);
    });
  });

  const fileInput = $('#statement-file');
  const dropzone = $('#upload-dropzone');
  const uploadFeedback = $('#upload-feedback');
  const showSelectedFile = (file) => {
    if (!file) return;
    const sizeMb = (file.size / 1024 / 1024).toFixed(1);
    uploadFeedback.textContent = `${file.name} selecionado · ${sizeMb} MB. Pronto para importar.`;
    uploadFeedback.classList.add('is-visible');
    showToast('Arquivo selecionado para importação.');
  };
  fileInput?.addEventListener('change', () => showSelectedFile(fileInput.files?.[0]));
  ['dragenter', 'dragover'].forEach((eventName) => dropzone?.addEventListener(eventName, (event) => { event.preventDefault(); dropzone.classList.add('is-dragover'); }));
  ['dragleave', 'drop'].forEach((eventName) => dropzone?.addEventListener(eventName, (event) => { event.preventDefault(); dropzone.classList.remove('is-dragover'); }));
  dropzone?.addEventListener('drop', (event) => showSelectedFile(event.dataTransfer.files?.[0]));

  const params = new URLSearchParams(window.location.search);
  const initialFlow = params.get('flow');
  if (initialFlow === 'income' || initialFlow === 'expense') updateMovementType(initialFlow);
  if (initialFlow === 'import') setImportMode('bank');

  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setSidebar(false); });
})();
