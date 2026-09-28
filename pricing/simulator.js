(() => {
  'use strict';
  const model = window.ArchPricing;
  let state = model.initial();
  const controls = [...document.querySelectorAll('input[data-key]')];
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const panels = [...document.querySelectorAll('[role="tabpanel"]')];
  const total = document.getElementById('total');
  const flags = document.getElementById('flags');
  const status = document.getElementById('estimate-status');
  function render(announce = true) {
    controls.forEach(input => {
      input.checked = input.dataset.key === 'wp' ? state.wp === (input.value === 'yes') : state[input.dataset.key] === input.value;
    });
    const result = model.calculate(state);
    const amount = result.total.toLocaleString('ja-JP');
    total.textContent = amount;
    flags.replaceChildren();
    result.notes.forEach(note => {
      const item = document.createElement('li');
      item.textContent = note;
      flags.append(item);
    });
    flags.hidden = result.notes.length === 0;
    if (announce) status.textContent = `最低見積もり金額：${amount}円（税込）。${result.notes.join('')}`;
  }
  controls.forEach(input => input.addEventListener('change', () => {
    const key = input.dataset.key;
    let value = input.value;
    if (key === 'wp') value = input.type === 'checkbox' ? input.checked : value === 'yes';
    else if (input.type === 'checkbox' && !input.checked) value = key === 'domain' ? 'github' : 'none';
    state = model.update(state, key, value);
    render();
  }));
  function activate(tab, focus = false) {
    tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; });
    panels.forEach(panel => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault(); activate(tabs[next], true);
    });
  });
  document.querySelectorAll('[data-requires-js]').forEach(element => { element.disabled = false; });
  document.querySelector('.estimate').hidden = false;
  render(false);
})();
