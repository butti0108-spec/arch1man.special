/* 全料金は税込。訪問は基本11,000円を含む55,000円。 */
(function (root) {
  'use strict';
  const initial = () => ({ domain: 'github', custom: 'none', wp: false, support: 'none' });
  const groups = { domain: ['github', 'own', 'managed'], custom: ['none', 'partial', 'full'], support: ['none', 'online', 'visit'] };
  function update(state, key, value) {
    if (key === 'wp' ? typeof value !== 'boolean' : !groups[key]?.includes(value)) throw new Error('Invalid selection');
    return { ...state, [key]: value };
  }
  function calculate(state) {
    let total = state.support === 'visit' ? 55000 : 11000;
    const notes = [];
    if (state.domain === 'own') total += 5500;
    if (state.domain === 'managed') {
      total += 11000;
      notes.push('ドメイン取得・管理の初年度11,000円を含みます。ドメイン実費は別途必要です。');
    }
    if (state.custom === 'partial') { total += 22000; notes.push('一部カスタマイズは22,000円〜です。内容により金額が変わります。'); }
    if (state.custom === 'full') notes.push('全体の独自構成は個別見積もりです。その費用は上の金額に含まれていません。');
    if (state.wp) { total += 55000; notes.push('WordPress対応は55,000円〜です。別途サーバー実費が必要です。追加機能・プラグインは別途見積もりです。'); }
    if (state.support === 'online') { total += 11000; notes.push('オンラインサポートは1回・最大3時間。超過は30分ごとに1,100円追加です。'); }
    if (state.support === 'visit') notes.push('訪問サポートは55,000円〜です。基本プランを含みます。訪問先による追加料金は別途です。');
    return { total, notes };
  }
  const model = { initial, update, calculate };
  if (typeof module !== 'undefined' && module.exports) module.exports = model;
  else root.ArchPricing = model;
})(typeof window !== 'undefined' ? window : globalThis);
