const ProductModule = {
  initDetailsPage() {
    const id = Utils.getParam("id");
    const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
    return product;
  }
};