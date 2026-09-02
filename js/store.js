/**
 * WATCHOX - Reactive State Engine
 * LocalStorage Management, Cart, Wishlist, Coupons & Free Shipping Tracker
 */

const StoreEngine = {
  // --- LocalStorage Keys ---
  KEYS: {
    CART: "watchox_cart",
    WISHLIST: "watchox_wishlist",
    RECENT: "watchox_recently_viewed",
    COUPON: "watchox_applied_coupon"
  },

  // --- Cart Management ---
  getCart() {
    return JSON.parse(localStorage.getItem(this.KEYS.CART)) || [];
  },

  saveCart(cart) {
    localStorage.setItem(this.KEYS.CART, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("watchox:cart-updated"));
  },

  addToCart(productId, variant = null, quantity = 1) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(
      item => item.id === productId && item.variant === variant
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product) return false;
      cart.push({
        id: productId,
        variant: variant || (product.variants ? product.variants[0] : null),
        quantity: quantity
      });
    }

    this.saveCart(cart);
    return true;
  },

  updateQuantity(productId, variant, quantity) {
    let cart = this.getCart();
    if (quantity <= 0) {
      this.removeFromCart(productId, variant);
      return;
    }

    cart = cart.map(item => {
      if (item.id === productId && item.variant === variant) {
        return { ...item, quantity };
      }
      return item;
    });

    this.saveCart(cart);
  },

  removeFromCart(productId, variant) {
    const cart = this.getCart().filter(
      item => !(item.id === productId && item.variant === variant)
    );
    this.saveCart(cart);
  },

  getCartCount() {
    return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
  },

  getCartSubtotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  },

  // --- Free Delivery Calculator ---
  getFreeDeliveryProgress() {
    const subtotal = this.getCartSubtotal();
    const threshold = WATCHOX_CONFIG.freeShippingThreshold;
    const remaining = Math.max(0, threshold - subtotal);
    const percentage = Math.min(100, (subtotal / threshold) * 100);

    return {
      subtotal,
      threshold,
      remaining,
      percentage,
      isUnlocked: remaining === 0
    };
  },

  // --- Coupon Logic ---
  applyCoupon(code) {
    const cleanCode = code.trim().toUpperCase();
    const coupon = COUPONS[cleanCode];
    const subtotal = this.getCartSubtotal();

    if (!coupon) {
      return { success: false, message: "Invalid promo code." };
    }

    if (subtotal < coupon.minSpend) {
      return {
        success: false,
        message: `Minimum order amount of ${WATCHOX_CONFIG.currency}${coupon.minSpend} required.`
      };
    }

    localStorage.setItem(this.KEYS.COUPON, JSON.stringify({ code: cleanCode, ...coupon }));
    window.dispatchEvent(new CustomEvent("watchox:cart-updated"));
    return { success: true, message: `Coupon '${cleanCode}' applied successfully!` };
  },

  getAppliedCoupon() {
    return JSON.parse(localStorage.getItem(this.KEYS.COUPON)) || null;
  },

  removeCoupon() {
    localStorage.removeItem(this.KEYS.COUPON);
    window.dispatchEvent(new CustomEvent("watchox:cart-updated"));
  },

  calculateDiscount() {
    const coupon = this.getAppliedCoupon();
    const subtotal = this.getCartSubtotal();

    if (!coupon || subtotal < coupon.minSpend) {
      return 0;
    }

    if (coupon.type === "percentage") {
      const discount = (subtotal * coupon.value) / 100;
      return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount;
    } else if (coupon.type === "fixed") {
      return Math.min(coupon.value, subtotal);
    } else if (coupon.type === "shipping") {
      return WATCHOX_CONFIG.defaultShippingCost;
    }

    return 0;
  },

  // --- Wishlist Management ---
  getWishlist() {
    return JSON.parse(localStorage.getItem(this.KEYS.WISHLIST)) || [];
  },

  toggleWishlist(productId) {
    let wishlist = this.getWishlist();
    const exists = wishlist.includes(productId);

    if (exists) {
      wishlist = wishlist.filter(id => id !== productId);
    } else {
      wishlist.push(productId);
    }

    localStorage.setItem(this.KEYS.WISHLIST, JSON.stringify(wishlist));
    window.dispatchEvent(new CustomEvent("watchox:wishlist-updated"));
    return !exists;
  },

  isInWishlist(productId) {
    return this.getWishlist().includes(productId);
  },

  // --- Recently Viewed ---
  trackRecentlyViewed(productId) {
    let recent = JSON.parse(localStorage.getItem(this.KEYS.RECENT)) || [];
    recent = recent.filter(id => id !== productId);
    recent.unshift(productId);

    if (recent.length > 8) recent.pop();

    localStorage.setItem(this.KEYS.RECENT, JSON.stringify(recent));
  },

  getRecentlyViewed() {
    const ids = JSON.parse(localStorage.getItem(this.KEYS.RECENT)) || [];
    return ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  }
};