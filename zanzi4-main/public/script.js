// Mobil Menü Aç/Kapa Fonksiyonu  
function toggleMenu() {
  var menu = document.getElementById("mobileMenu");
  var overlay = document.getElementById("overlay");
  var body = document.querySelector('main');
  var hamburger = document.querySelector('.hamburger');
 
  menu.classList.toggle("show-menu");
  overlay.classList.toggle("show"); // Overlay'ı da aç/kapat
  body.classList.toggle("blurred");
  hamburger.classList.toggle("active");
}
// Sayfada Fade-in için ve Mobile Menu'yu Dışarı Tıklayınca Kapatmak için
document.addEventListener('click', function(event) {
  const menu = document.getElementById("mobileMenu");
  const toggle = document.querySelector(".hamburger");
  const closeBtn = document.querySelector(".close-btn");
  const body = document.querySelector('main');

  if (
    menu.classList.contains("show-menu") &&
    !menu.contains(event.target) &&
    !toggle.contains(event.target) &&
    !(closeBtn && closeBtn.contains(event.target))
  ) {
    menu.classList.remove("show-menu");
    body.classList.remove("blurred");
    toggle.classList.remove("active");
  }
});

// Sayfa Yüklenince Fade-in Efekti
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('visible');

  var fadeElems = document.querySelectorAll('.fade-in');

  function checkFadeIn() {
    var triggerBottom = window.innerHeight * 0.9;
    fadeElems.forEach(function(elem) {
      const box = elem.getBoundingClientRect();
      if (box.top < triggerBottom) {
        elem.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkFadeIn);
  checkFadeIn();
});

// Linklere Tıklanınca Sayfa Fade-out ile Gitmesi
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && !href.startsWith("#") && !href.startsWith('javascript')) {
      e.preventDefault();
      document.body.classList.remove('visible');
      setTimeout(() => {
        window.location.href = href;
      }, 500); // Fade-out süresi
    }
  });
});


// Sağ Butona Basınca İleri Kaydırma
function slideNext(button) {
  const sliderContainer = button.parentElement;
  const slider = sliderContainer.querySelector('.slider');
  const totalSlides = slider.children.length;
  let currentOffset = parseInt(slider.getAttribute('data-offset') || 0);

  if (currentOffset < totalSlides - 1) {
    currentOffset++;
    slider.style.transform = `translateX(-${currentOffset * 100}%)`;
    slider.setAttribute('data-offset', currentOffset);
  }
}


// Sol Butona Basınca Geri Kaydırma
function slidePrev(button) {
  const sliderContainer = button.parentElement;
  const slider = sliderContainer.querySelector('.slider');
  let currentOffset = parseInt(slider.getAttribute('data-offset') || 0);

  if (currentOffset > 0) {
    currentOffset--;
    slider.style.transform = `translateX(-${currentOffset * 100}%)`;
    slider.setAttribute('data-offset', currentOffset);
    updateDots(sliderContainer, currentOffset); // <<< eklenen satır
  }
}
 
// Sayfa Yeniden Yüklendiğinde (Back tuşuyla) Fade-in Efektini Koru
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    document.body.classList.add('visible');
  }
});
// Mobil swipe (parmakla kaydırma) fonksiyonları
document.querySelectorAll('.slider-container').forEach(container => {
  let startX = 0;
  let endX = 0;

  container.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  });

  container.addEventListener('touchmove', function (e) {
    endX = e.touches[0].clientX;
  });

  container.addEventListener('touchend', function () {
    const distance = endX - startX;
    if (distance > 50) {
      // Sağa kaydırıldı — Önceki slayt
      slidePrev(container.querySelector('.prev'));
    } else if (distance < -50) {
      // Sola kaydırıldı — Sonraki slayt
      slideNext(container.querySelector('.next'));
    }
    startX = 0;
    endX = 0;
  });
});
function updateDots(container, activeIndex) {
  const dots = container.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === activeIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}
function toggleFavorite(icon) {
  icon.classList.toggle("active");

  // (İsteğe bağlı) Favorileri saklamak için localStorage:
  const productTitle = icon.closest(".product-card").querySelector("h2").innerText;
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (icon.classList.contains("active")) {
    if (!favorites.includes(productTitle)) {
      favorites.push(productTitle);
    }
  } else {
    const index = favorites.indexOf(productTitle);
    if (index > -1) {
      favorites.splice(index, 1);
    }
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}
function openLoginModal() {
  document.getElementById("auth-title").innerText = "Giriş Yap";
  document.getElementById("toggle-auth").innerText = "Henüz üye değil misiniz? Kayıt Ol";
  document.getElementById("auth-modal").classList.remove("hidden");
}

function openRegisterModal() {
  document.getElementById("auth-title").innerText = "Kayıt Ol";
  document.getElementById("toggle-auth").innerText = "Zaten üyeniz misiniz? Giriş Yap";
  document.getElementById("auth-modal").classList.remove("hidden");
}

function closeAuthModal() {
  document.getElementById("auth-modal").classList.add("hidden");
}

function toggleAuthMode() {
  const title = document.getElementById("auth-title");
  const toggle = document.getElementById("toggle-auth");
  if (title.innerText === "Giriş Yap") {
    title.innerText = "Kayıt Ol";
    toggle.innerText = "Zaten üyeniz misiniz? Giriş Yap";
  } else {
    title.innerText = "Giriş Yap";
    toggle.innerText = "Henüz üye değil misiniz? Kayıt Ol";
  }
}

function submitAuth() {
  alert("Henüz arka uç (backend) hazır değil 🙃");
}
// Ürünleri dinamik olarak yükle
fetch("products.json")
  .then(res => res.json())
  .then(products => {
    const lookbook = document.querySelector(".lookbook");

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card fade-in";

      card.innerHTML = `
        <div class="slider-container">
          ${product.badge ? `<div class="badge">${product.badge}</div>` : ""}
          <div class="slider" data-offset="0">
            ${product.images.map(img => `
              <div class="slide-item">
                <img src="${img}" alt="${product.title}" loading="lazy">
              </div>
            `).join("")}
          </div>
          <button class="prev" onclick="slidePrev(this)">‹</button>
          <button class="next" onclick="slideNext(this)">›</button>
        </div>
        <div class="product-info">
          <div class="info-top">
            <a href="${product.url}"><h2>${product.title}</h2></a>
            <div class="favorite-icon" onclick="toggleFavorite(this)">
              <svg viewBox="0 0 24 24" class="heart" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 6.5 3.5 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99
                14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="none" stroke="#333" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <p class="price">₺${product.price}</p>
        </div>
      `;

      lookbook.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Ürünler yüklenemedi:", err);
  });
