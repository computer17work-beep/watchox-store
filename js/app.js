/**
 * WATCHOX - Master Application Engine
 * Global Navbar, Live Search Overlay, Toast Notifications & Dynamic Renderers
 */

document.addEventListener("DOMContentLoaded", () => {
  AppEngine.init();
});

const AppEngine = {
  init() {
    this.renderNavbar();
    this.renderMobileBottomNav();
    this.setupEventListeners();
    this.updateBadges();
    this.initFlashSaleTimers();

    // Event listeners for reactive state updates
    window.addEventListener("watchox:cart-updated", () => this.updateBadges());
    window.addEventListener("watchox:wishlist-updated", () => this.updateBadges());
  },

  // --- Dynamic Layout Renderers ---
  renderNavbar() {
    const header = document.getElementById("main-header");
    if (!header) return;

    header.innerHTML = `
      <div class="top-bar">
        FREE DELIVERY ON ORDERS OVER ${WATCHOX_CONFIG.currency}${WATCHOX_CONFIG.freeShippingThreshold} | HOTLINE: ${WATCHOX_CONFIG.contact.phone}
      </div>
      <nav class="navbar">
        <div class="container nav-container">
          <a href="index.html" class="logo">${WATCHOX_CONFIG.storeName}</a>
          <ul class="nav-links">
            <li><a href="index.html" class="${this.isActivePage('index.html')}">Home</a></li>
            <li><a href="shop.html" class="${this.isActivePage('shop.html')}">Shop</a></li>
            <li><a href="offers.html" class="${this.isActivePage('offers.html')}">Offers & Combos</a></li>
            <li><a href="track-order.html" class="${this.isActivePage('track-order.html')}">Track Order</a></li>
          </ul>
          <div class="nav-actions">
            <button class="icon-btn" id="open-search-btn" title="Search">🔍</button>
            <a href="shop.html?filter=wishlist" class="icon-btn" title="Wishlist">
              ♡ <span class="badge-count" id="wishlist-count">0</span>
            </a>
            <a href="checkout.html" class="icon-btn" title="Cart">
              🛒 <span class="badge-count" id="cart-count">0</span>
            </a>
          </div>
        </div>
      </nav>
    `;
  },

  renderMobileBottomNav() {
    if (document.querySelector(".mobile-bottom-nav")) return;
    const nav = document.createElement("div");
    nav.className = "mobile-bottom-nav";
    nav.innerHTML = `
      <a href="index.html" class="mobile-nav-item ${this.isActivePage('index.html')}">🏠 <span>Home</span></a>
      <a href="shop.html" class="mobile-nav-item ${this.isActivePage('shop.html')}">🛍️ <span>Shop</span></a>
      <a href="offers.html" class="mobile-nav-item ${this.isActivePage('offers.html')}">🔥 <span>Offers</span></a>
      <a href="checkout.html" class="mobile-nav-item ${this.isActivePage('checkout.html')}">🛒 <span>Cart</span></a>
    `;
    document.body.appendChild(nav);
  },

  isActivePage(pageName) {
    const path = window.location.pathname;
    if (pageName === 'index.html' && (path.endsWith('/') || path.endsWith('index.html'))) return 'active';
    return path.includes(pageName) ? 'active' : '';
  },

  // --- Reactive UI Badges ---
  updateBadges() {
    const cartBadge = document.getElementById("cart-count");
    const wishlistBadge = document.getElementById("wishlist-count");

    if (cartBadge) cartBadge.textContent = StoreEngine.getCartCount();
    if (wishlistBadge) wishlistBadge.textContent = StoreEngine.getWishlist().length;
  },

  // --- Global Event Handling & Search Overlay ---
  setupEventListeners() {
    document.addEventListener("click", (e) => {
      if (e.target.id === "open-search-btn") {
        this.openSearchOverlay();
      }
    });
  },

  openSearchOverlay() {
    let overlay = document.getElementById("search-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "search-overlay";
      overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(10,10,10,0.98); z-index: 10000; padding: 40px 20px;
        display: flex; flex-direction: column; align-items: center;
      `;
      overlay.innerHTML = `
        <div style="width: 100%; max-width: 600px; position: relative;">
          <button id="close-search-btn" style="position: absolute; right: 0; top: -30px; color: #fff; font-size: 1.5rem;">✕</button>
          <input type="text" id="search-input" placeholder="Search luxury timepieces..." 
            style="width: 100%; padding: 16px; background: #121212; border: 1px solid #2A2A2A; color: #fff; font-size: 1.1rem; border-radius: 4px;" autofocus />
          <div id="search-results" style="margin-top: 20px; width: 100%; max-height: 400px; overflow-y: auto;"></div>
        </div>
      `;
      document.body.appendChild(overlay);

      document.getElementById("close-search-btn").onclick = () => overlay.remove();
      
      const searchInput = document.getElementById("search-input");
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const resultsContainer = document.getElementById("search-results");
        if (query.length === 0) {
          resultsContainer.innerHTML = "";
          return;
        }

        const filtered = PRODUCTS.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );

        resultsContainer.innerHTML = filtered.map(p => `
          <a href="product.html?id=${p.id}" style="display: flex; align-items: center; gap: 15px; padding: 10px; border-bottom: 1px solid #2A2A2A; color: #fff;">
            <img src="${p.images[0]}" style="width: 50px; height: 50px; object-fit: cover;" />
            <div>
              <div style="font-weight: bold; font-size: 0.95rem;">${p.name}</div>
              <div style="font-size: 0.85rem; color: #8A8A8A;">${WATCHOX_CONFIG.currency}${p.price}</div>
            </div>
          </a>
        `).join('') || `<div style="color: #8A8A8A; padding: 20px; text-align: center;">No timepieces found.</div>`;
      });
    }
  },

  // --- Dynamic Toast System ---
  showToast(message) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  // --- Real-Time Countdown Timer ---
  initFlashSaleTimers() {
    setInterval(() => {
      document.querySelectorAll("[data-countdown]").forEach(el => {
        const endTime = new Date(el.dataset.countdown).getTime();
        const now = new Date().getTime();
        const diff = endTime - now;

        if (diff <= 0) {
          el.textContent = "EXPIRED";
          return;
        }

        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        el.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      });
    }, 1000);
  }
};