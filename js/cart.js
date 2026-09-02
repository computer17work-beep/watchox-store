const CartModule = {
  getCart() {
    return StoreEngine.getCart();
  },

  updateQuantity(id, variant, qty) {
    let cart = this.getCart();
    const item = cart.find(i => i.id === id && i.variant === variant);
    if (item) {
      item.quantity = qty;
      if (item.quantity <= 0) {
        cart = cart.filter(i => !(i.id === id && i.variant === variant));
      }
      StoreEngine.saveCart(cart);
    }
  },

  removeItem(id, variant) {
    StoreEngine.removeFromCart(id, variant);
  }
};