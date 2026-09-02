const ShopModule = {
  renderCatalog(products, containerId = "shop-product-grid") {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (products.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">No products found.</div>`;
      return;
    }

    container.innerHTML = products.map(p => `
      <div class="product-card">
        <div class="card-img-wrap">
          <a href="product.html?id=${p.id}">
            <img src="${p.images[0]}" alt="${p.name}" loading="lazy" />
          </a>
        </div>
        <div class="card-info">
          <h3 class="card-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <div class="card-price-row">
            <span class="current-price">৳${p.price}</span>
            ${p.previousPrice ? `<span class="prev-price">৳${p.previousPrice}</span>` : ''}
          </div>
          <button class="btn-primary" style="width:100%;" onclick="StoreEngine.addToCart('${p.id}')">Add to Cart</button>
        </div>
      </div>
    `).join('');
  }
};