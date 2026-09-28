(() => {
  'use strict';
  const config = window.ARCH_WORKFLOW_CONFIG || {};
  const urls = { maker: config.makerUrl, special: config.specialUrl };
  document.querySelectorAll('[data-link]').forEach(link => {
    const value = urls[link.dataset.link];
    if (typeof value !== 'string' || !value.trim()) return;
    try {
      const url = new URL(value, window.location.href);
      if (!['http:', 'https:', 'file:'].includes(url.protocol)) return;
      link.href = value;
      link.removeAttribute('aria-disabled');
      link.removeAttribute('role');
    } catch { /* 不正なURLの場合は未接続のままにします。 */ }
  });
})();
