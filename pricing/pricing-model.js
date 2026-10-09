/* 全料金は税込。独自ドメイン接続は0円。画面共有は30分1500円。訪問は制作込みの5万円。 */
(function (root) {
  'use strict';
  const initial = () => ({ domain: 'github', custom: 'none', wp: false, support: 'none' });
  const groups = { domain: ['github', 'own'], custom: ['none', 'partial', 'full'], support: ['none', 'online', 'visit'] };
  function update(state, key, value) {
    if (key === 'wp' ? typeof value !== 'boolean' : !groups[key]?.includes(value)) throw new Error('Invalid selection');
    return { ...state, [key]: value };
  }
  function calculate(state) {
    let total = state.support === 'visit' ? 50000 : 10000;
    const notes = [];
    if (state.domain === 'own') {
      notes.push('独自ドメインの接続料金は無料です。やり方が分からなければ、画面共有サポート（30分1,500円）を利用できます。');
    }
    if (state.custom === 'partial') {
      total += 20000;
      notes.push('一部オリジナル対応は2万円〜で、基本の1万円に加わります。内容により金額が変わります。');
    }
    if (state.custom === 'full') notes.push('全体の独自構成は個別見積もりです。その費用は上の金額に含まれていません。');
    if (state.wp) {
      total += 50000;
      notes.push('WordPress化は5万円〜で、基本の1万円に加わります。管理画面と問い合わせフォームが基本範囲です。追加機能は別途見積です。');
    }
    if (state.support === 'online') {
      total += 1500;
      notes.push('画面共有サポートは30分1,500円です。それを超える場合は、内容を確認してから金額をご案内します。');
    }
    if (state.support === 'visit') notes.push('訪問は5万円〜です。サイト制作料金を含みます。');
    return { total, notes };
  }
  const model = { initial, update, calculate };
  if (typeof module !== 'undefined' && module.exports) module.exports = model;
  else root.ArchPricing = model;
})(typeof window !== 'undefined' ? window : globalThis);
