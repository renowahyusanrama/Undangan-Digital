/* =========================================================
   Momen Kita — CHECKOUT ENHANCED JAVASCRIPT
   Animasi kompleks, interaksi smooth, dan mobile-optimized
   ========================================================= */

// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 50,
  easing: 'ease-out-cubic'
});

// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }, 1200);
});

// Generate Invoice ID
function generateInvoiceId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return timestamp + random;
}

document.getElementById('invoice-id').textContent = generateInvoiceId();

// Header shrink with smooth transition
(function(){
  const header = document.getElementById('site-header');
  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    
    lastScrollY = scrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  updateHeader();
})();

// Package data from URL
const params = new URLSearchParams(location.search);
const plan = (params.get('plan') || 'silver').toLowerCase();
const priceMap = { 
  bronze: { price: 100000, name: 'Bronze', icon: '🥉' },
  silver: { price: 150000, name: 'Silver', icon: '🥈' },
  gold: { price: 250000, name: 'Gold', icon: '🥇' }
};

const packageData = priceMap[plan] || priceMap.silver;

// Format currency
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Update summary with animation
function updateSummary() {
  const sumPlan = document.getElementById('sum-plan');
  const sumPrice = document.getElementById('sum-price');
  const sumTotal = document.getElementById('sum-total');

  // Animate number counting
  function animateValue(element, start, end, duration) {
    const startTimestamp = Date.now();
    const step = () => {
      const timestamp = Date.now();
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      element.textContent = formatRupiah(currentValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Update package name with icon
  sumPlan.innerHTML = `${packageData.icon} ${packageData.name}`;
  
  // Animate price
  setTimeout(() => {
    animateValue(sumPrice, 0, packageData.price, 800);
    animateValue(sumTotal, 0, packageData.price, 800);
  }, 300);
}

updateSummary();

// Payment method selection with enhanced interactions
const radios = document.querySelectorAll('input[name="pay"]');
const btnWA = document.getElementById('btn-wa');
let selectedPayment = 'QRIS';

function updateWhatsAppLink() {
  const chosen = selectedPayment;
  const invoiceId = document.getElementById('invoice-id').textContent;
  const msg = `Halo, saya ingin konfirmasi pembayaran:\n\n📋 Invoice: #INV${invoiceId}\n📦 Paket: ${packageData.name}\n💰 Harga: ${formatRupiah(packageData.price)}\n💳 Metode: ${chosen}\n\nMohon informasi rekening untuk pembayaran. Terima kasih.`;
  
  btnWA.href = `https://wa.me/62811456999?text=${encodeURIComponent(msg)}`;
  
  // Add ripple effect to button
  createRipple(btnWA);
}

function createRipple(button) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Enhanced radio button interactions
radios.forEach((radio, index) => {
  // Add stagger animation on load
  setTimeout(() => {
    radio.closest('.bank-card').style.animation = 'slide-up 0.5s ease-out';
  }, index * 100);
  
  radio.addEventListener('change', (e) => {
    // Remove selected class from all cards
    document.querySelectorAll('.bank-card').forEach(card => {
      card.classList.remove('is-selected');
    });
    
    // Add selected class to current card
    const selectedCard = e.target.closest('.bank-card');
    selectedCard.classList.add('is-selected');
    
    // Update selected payment
    selectedPayment = e.target.value;
    
    // Update WhatsApp link
    updateWhatsAppLink();
    
    // Add haptic feedback (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Track selection (analytics)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'payment_method_selected', {
        'method': selectedPayment,
        'package': plan
      });
    }
  });
  
  // Add hover sound effect (optional)
  const card = radio.closest('.bank-card');
  card.addEventListener('mouseenter', () => {
    // Add subtle hover sound if audio is enabled
  });
});

// Set default selection with animation
setTimeout(() => {
  radios[0].checked = true;
  radios[0].dispatchEvent(new Event('change'));
}, 500);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  const currentIndex = Array.from(radios).findIndex(r => r.checked);
  
  if (e.key === 'ArrowRight' && currentIndex < radios.length - 1) {
    radios[currentIndex + 1].checked = true;
    radios[currentIndex + 1].dispatchEvent(new Event('change'));
  } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    radios[currentIndex - 1].checked = true;
    radios[currentIndex - 1].dispatchEvent(new Event('change'));
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add visibility detection for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.bank-card, .checkout-card').forEach(el => {
  observer.observe(el);
});

// Mobile menu touch optimization
const mobileMenuBtn = document.querySelector('.menu-btn');
if (mobileMenuBtn) {
  let touchStartY = 0;
  
  mobileMenuBtn.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });
  
  mobileMenuBtn.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = Math.abs(touchEndY - touchStartY);
    
    // Only trigger if it's a tap, not a swipe
    if (deltaY < 10) {
      mobileMenuBtn.click();
    }
  });
}

// Prevent zoom on input focus (iOS)
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    document.querySelector('meta[name="viewport"]').setAttribute('content', 
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  });
  
  input.addEventListener('blur', () => {
    document.querySelector('meta[name="viewport"]').setAttribute('content', 
      'width=device-width, initial-scale=1.0');
  });
});

// Add page visibility handling
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when page is hidden
    document.querySelectorAll('.animate-float, .animate-float-delayed').forEach(el => {
      el.style.animationPlayState = 'paused';
    });
  } else {
    // Resume animations when page is visible
    document.querySelectorAll('.animate-float, .animate-float-delayed').forEach(el => {
      el.style.animationPlayState = 'running';
    });
  }
});

// Error handling
window.addEventListener('error', (e) => {
  console.error('Checkout page error:', e.error);
  // Optionally send error to analytics
});

// Performance monitoring
window.addEventListener('load', () => {
  if ('performance' in window) {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
  }
});