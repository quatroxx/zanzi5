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
    updateDots(sliderContainer, currentOffset); // <<< eklenen satır
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
