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

  $('#period-filter')?.addEventListener('change', (event) => {
    const label = event.target.options[event.target.selectedIndex].text;
    showToast(`Relatório atualizado para ${label}.`);
  });
  $('#export-report')?.addEventListener('click', () => showToast('Seu relatório está sendo preparado para exportação.'));
  $('[data-scroll-services]')?.addEventListener('click', () => $('#services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));

  const chartData = {
    monthly: {
      label: 'Total gasto por mês',
      total: 'R$ 5.286,32',
      path: 'M0 162 C70 150 84 170 136 135 S220 145 270 110 S350 128 408 92 S505 106 560 76 S635 90 680 52',
      area: 'M0 162 C70 150 84 170 136 135 S220 145 270 110 S350 128 408 92 S505 106 560 76 S635 90 680 52 L680 220 L0 220 Z',
      points: [[0, 162], [136, 135], [270, 110], [408, 92], [560, 76], [680, 52]],
      labels: ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
    },
    weekly: {
      label: 'Total gasto por semana',
      total: 'R$ 1.682,40',
      path: 'M0 174 C70 152 90 178 136 150 S220 128 270 145 S350 88 408 115 S505 130 560 84 S635 96 680 62',
      area: 'M0 174 C70 152 90 178 136 150 S220 128 270 145 S350 88 408 115 S505 130 560 84 S635 96 680 62 L680 220 L0 220 Z',
      points: [[0, 174], [136, 150], [270, 145], [408, 115], [560, 84], [680, 62]],
      labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
    },
  };
  const lineChart = $('#report-line-chart');
  const updateChart = (mode) => {
    const data = chartData[mode];
    if (!data) return;
    lineChart?.setAttribute('data-mode', mode);
    $('#chart-period-label').textContent = data.label;
    $('#chart-total-label').textContent = data.total;
    $('.filled-line-chart__line')?.setAttribute('d', data.path);
    $('.filled-line-chart__area')?.setAttribute('d', data.area);
    $$('.filled-line-chart__point').forEach((point, index) => {
      const [x, y] = data.points[index];
      point.setAttribute('cx', x);
      point.setAttribute('cy', y);
      point.classList.toggle('filled-line-chart__point--current', index === data.points.length - 1);
    });
    $$('.filled-line-chart__labels span').forEach((label, index) => { label.textContent = data.labels[index]; });
    showToast(`Visualização ${mode === 'monthly' ? 'mensal' : 'semanal'} selecionada.`);
  };
  $$('.report-chart-tab').forEach((button) => {
    button.addEventListener('click', () => {
      $$('.report-chart-tab').forEach((item) => item.classList.toggle('is-active', item === button));
      updateChart(button.dataset.chartMode);
    });
  });

  const serviceRows = $$('.service-row');
  let activeServiceFilter = 'all';
  let activeCategoryFilter = 'all';
  const applyServiceFilters = () => {
    const query = ($('#service-search')?.value || '').trim().toLowerCase();
    let visible = 0;
    serviceRows.forEach((row) => {
      const matchesStatus = activeServiceFilter === 'all' || row.dataset.serviceStatus === activeServiceFilter;
      const matchesCategory = activeCategoryFilter === 'all' || row.dataset.serviceCategory === activeCategoryFilter;
      const matchesQuery = !query || row.dataset.serviceName.includes(query);
      row.hidden = !(matchesStatus && matchesCategory && matchesQuery);
      if (!row.hidden) visible += 1;
    });
    const emptyState = $('#service-empty');
    if (emptyState) emptyState.hidden = visible > 0;
  };
  $$('.service-filter').forEach((button) => {
    button.addEventListener('click', () => {
      activeServiceFilter = button.dataset.serviceFilter;
      $$('.service-filter').forEach((item) => item.classList.toggle('is-active', item === button));
      applyServiceFilters();
    });
  });
  $$('.service-category-filter').forEach((button) => {
    button.addEventListener('click', () => {
      activeCategoryFilter = button.dataset.categoryFilter;
      $$('.service-category-filter').forEach((item) => item.classList.toggle('is-active', item === button));
      applyServiceFilters();
    });
  });
  $('#service-category-filter')?.addEventListener('change', (event) => {
    activeCategoryFilter = event.target.value;
    applyServiceFilters();
  });
  $('#service-search')?.addEventListener('input', applyServiceFilters);

  $$('.category-bar-fill[data-width]').forEach((fill) => { fill.style.width = `${fill.dataset.width}%`; });
  $$('.mini-expense-chart__bar[data-height]').forEach((bar) => { bar.style.height = `${bar.dataset.height}%`; });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setSidebar(false); });
})();
