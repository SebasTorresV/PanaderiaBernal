document.addEventListener('DOMContentLoaded', function() {
  // Cargar todos los productos en la página de productos
  loadAllProducts();
});

// Cargar todos los productos
function loadAllProducts() {
  const productsContainer = document.querySelector('.products-container');
  if (!productsContainer) return;
  
  const products = JSON.parse(localStorage.getItem('products')) || [];
  
  if (products.length === 0) return;
  
  // Limpiar contenedor
  productsContainer.innerHTML = '';
  
  // Añadir productos
  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    
    productItem.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image">
      </div>
      <div class="product-content">
        <h2 class="product-name">${product.name}</h2>
        <p class="product-description">${product.description}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
    `;
    
    productsContainer.appendChild(productItem);
  });
}