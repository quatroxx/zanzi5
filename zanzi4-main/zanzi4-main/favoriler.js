document.addEventListener('DOMContentLoaded', function () {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const favoritesList = document.getElementById("favoritesList");

  if (favorites.length === 0) {
    favoritesList.innerHTML = "<p>Henüz favori ürününüz yok.</p>";
    return;
  }

  // Ürün datası örnek – gerçekte bunu JSON dosyasından çekebilirsin
  const allProducts = [
    {
      title: "Beyaz Elbise",
      image: "images/beyaz1.jpg",
      link: "beyaz.html",
      price: "₺1299"
    },
    {
      title: "Bitter Tulum",
      image: "images/bitter1.jpg",
      link: "bitter.html",
      price: "₺1199"
    },
    {
      title: "Ceket Takımı",
      image: "images/ceket1.jpg",
      link: "ceket.html",
      price: "₺1799"
    },
    {
      title: "Çiçek Desenli Elbise",
      image: "images/cicek1.jpg",
      link: "cicek.html",
      price: "₺1399"
    },
    {
      title: "Kahverengi Pantolon",
      image: "images/kahve1.jpg",
      link: "kahve.html",
      price: "₺899"
    }
  ];

  const matched = allProducts.filter(product => favorites.includes(product.title));

  matched.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card fade-in";
    card.innerHTML = `
      <a href="${product.link}">
        <div class="slider-container">
          <div class="slide-item">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
          </div>
        </div>
        <div class="product-info">
          <div class="info-top">
            <h2>${product.title}</h2>
          </div>
          <p class="price">${product.price}</p>
        </div>
      </a>
    `;
    favoritesList.appendChild(card);
  });
});
