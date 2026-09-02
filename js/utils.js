const Utils = {
  formatCurrency(amount) {
    return `৳${amount.toLocaleString('en-BD')}`;
  },

  getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  setParam(key, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
  }
};