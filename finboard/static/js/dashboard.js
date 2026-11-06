(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const sidebar = $('#sidebar');
  const overlay = $('#sidebar-overlay');
  const openSidebar = $('#open-sidebar');
  const closeSidebar = $('#close-sidebar');

  const setSidebar = (open) => {
    sidebar?.classList.toggle('is-open', open);
    overlay?.classList.toggle('is-visible', open);
    document.body.classList.toggle('menu-open', open);
  };

  openSidebar?.addEventListener('click', () => setSidebar(true));
  closeSidebar?.addEventListener('click', () => setSidebar(false));
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
    button.addEventListener('click', () => showToast(button.dataset.toast));
  });

  const modalBackdrop = $('#quick-modal');
  const form = $('#transaction-form');
  const formTypeButtons = $$('.form-toggle__button');
  let selectedType = 'income';

  const setModal = (open, defaultType = 'income') => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.toggle('is-open', open);
    modalBackdrop.setAttribute('aria-hidden', String(!open));
    if (open) {
      selectedType = defaultType;
      formTypeButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.formType === selectedType));
      window.setTimeout(() => $('[name="description"]', form)?.focus(), 120);
    }
  };

  $$('[data-open-modal]').forEach((button) => {
    button.addEventListener('click', () => setModal(true, button.dataset.defaultType || 'income'));
  });
  $$('[data-close-modal]').forEach((button) => button.addEventListener('click', () => setModal(false)));
  modalBackdrop?.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) setModal(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setModal(false);
      setSidebar(false);
    }
  });
  formTypeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedType = button.dataset.formType;
      formTypeButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    });
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const description = form.elements.description.value.trim() || 'Nova movimentação';
    const amount = Number(form.elements.amount.value || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    const prefix = selectedType === 'income' ? '+' : '−';
    showToast(`${description} adicionada: ${prefix} R$ ${amount}`);
    form.reset();
    setModal(false);
  });

  const chartSets = {
    '6M': {
      income: 'M0,106 C57,102 82,55 145,74 S228,142 288,104 S368,24 430,61 S505,112 568,67 S648,32 760,48',
      expense: 'M0,166 C58,159 88,150 145,176 S230,189 288,170 S368,144 430,160 S505,188 568,153 S654,139 760,144',
      labels: ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
    },
    '1A': {
      income: 'M0,145 C52,138 76,121 126,134 S198,100 252,117 S320,68 380,95 S454,53 520,74 S611,51 760,56',
      expense: 'M0,181 C54,173 78,182 126,169 S198,180 252,164 S326,174 380,147 S456,163 520,136 S626,151 760,130',
      labels: ['Nov', 'Jan', 'Mar', 'Mai', 'Jul', 'Out'],
    },
    Tudo: {
      income: 'M0,157 C52,148 86,129 126,151 S188,92 244,126 S315,36 373,93 S442,118 497,73 S586,49 640,66 S707,34 760,45',
      expense: 'M0,184 C56,174 82,164 126,180 S192,155 244,173 S315,141 373,158 S441,176 497,145 S584,153 640,132 S707,148 760,125',
      labels: ['Jan', 'Mar', 'Mai', 'Jul', 'Set', 'Out'],
    },
  };
  const incomePath = $('.chart-line--income');
  const expensePath = $('.chart-line--expense');
  const incomeFill = $('.chart-fill--income');
  const expenseFill = $('.chart-fill--expense');
  const xLabels = $$('.chart-x-labels span');
  const updateChart = (range) => {
    const data = chartSets[range];
    if (!data) return;
    incomePath?.setAttribute('d', data.income);
    expensePath?.setAttribute('d', data.expense);
    incomeFill?.setAttribute('d', `${data.income} L760,240 L0,240 Z`);
    expenseFill?.setAttribute('d', `${data.expense} L760,240 L0,240 Z`);
    xLabels.forEach((label, index) => { label.textContent = data.labels[index] || ''; });
  };
  $$('.chart-control').forEach((button) => {
    button.addEventListener('click', () => {
      $$('.chart-control').forEach((item) => item.classList.toggle('is-active', item === button));
      updateChart(button.dataset.range);
    });
  });

  $('#transaction-filter')?.addEventListener('change', (event) => {
    const filter = event.target.value;
    $$('.transaction-row').forEach((row) => {
      row.hidden = filter !== 'all' && row.dataset.kind !== filter;
    });
  });
})();
