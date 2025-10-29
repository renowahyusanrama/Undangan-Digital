/* =========================================================
   Momen Kita — Enhanced JavaScript
   Animasi kompleks, interaksi tambahan, dan fitur baru
   ========================================================= */

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
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
  }, 1500);
});

// Cursor Glow Effect
const cursorGlow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  
  cursorX += dx * 0.1;
  cursorY += dy * 0.1;
  
  if (cursorGlow) {
    cursorGlow.style.left = cursorX - 16 + 'px';
    cursorGlow.style.top = cursorY - 16 + 'px';
  }
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');
const html = document.documentElement;

// Check for saved dark mode preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
  html.classList.add('dark');
  if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun text-amber-500"></i>';
  if (darkModeToggleMobile) darkModeToggleMobile.innerHTML = '<i class="fas fa-sun text-amber-500"></i>';
}

function toggleDarkMode() {
  html.classList.toggle('dark');
  const isDark = html.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
  
  if (darkModeToggle) {
    darkModeToggle.innerHTML = isDark ? 
      '<i class="fas fa-sun text-amber-500"></i>' : 
      '<i class="fas fa-moon text-amber-700"></i>';
  }
  
  if (darkModeToggleMobile) {
    darkModeToggleMobile.innerHTML = isDark ? 
      '<i class="fas fa-sun text-amber-500"></i>' : 
      '<i class="fas fa-moon text-amber-700"></i>';
  }
}

if (darkModeToggle) darkModeToggle.addEventListener('click', toggleDarkMode);
if (darkModeToggleMobile) darkModeToggleMobile.addEventListener('click', toggleDarkMode);

// Mobile Menu
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuPanel = document.getElementById('mobile-menu-panel');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

function openMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove('hidden');
  if (mobileMenuPanel) mobileMenuPanel.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  if (mobileMenuPanel) mobileMenuPanel.classList.remove('active');
  setTimeout(() => {
    if (mobileMenu) mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking on links
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Language Switcher
const langToggle = document.getElementById('lang-toggle');
const langToggleMobile = document.getElementById('lang-toggle-mobile');
const langDropdown = document.getElementById('lang-dropdown');
const langDropdownMobile = document.getElementById('lang-dropdown-mobile');

function toggleLangDropdown(dropdown) {
  if (dropdown) {
    dropdown.classList.toggle('active');
  }
}

if (langToggle) {
  langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLangDropdown(langDropdown);
  });
}

if (langToggleMobile) {
  langToggleMobile.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLangDropdown(langDropdownMobile);
  });
}

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
  if (langDropdown) langDropdown.classList.remove('active');
  if (langDropdownMobile) langDropdownMobile.classList.remove('active');
});

// Handle language selection
const langOptions = document.querySelectorAll('[data-lang]');
langOptions.forEach(option => {
  option.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedLang = option.getAttribute('data-lang');
    
    // Update current language display
    const currentLangElements = document.querySelectorAll('#current-lang, #current-lang-mobile');
    currentLangElements.forEach(el => {
      if (el) el.textContent = selectedLang.toUpperCase();
    });
    
    // Save language preference
    localStorage.setItem('language', selectedLang);
    
    // Show notification
    showNotification(`Bahasa diubah ke ${option.textContent}`, 'success');
    
    // Close dropdowns
    if (langDropdown) langDropdown.classList.remove('active');
    if (langDropdownMobile) langDropdownMobile.classList.remove('active');
  });
});

// Gallery Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    galleryItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Testimonial Slider
const testimonialContainer = document.querySelector('.testimonial-container');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
let testimonialIndex = 0;

if (testimonialContainer) {
  const testimonialItems = testimonialContainer.querySelectorAll('.testimonial-item');
  const totalTestimonials = testimonialItems.length;
  
  function updateTestimonialSlider() {
    const itemWidth = testimonialItems[0].offsetWidth;
    const gap = 24; // Gap between items
    const offset = testimonialIndex * (itemWidth + gap);
    testimonialContainer.style.transform = `translateX(-${offset}px)`;
    
    // Update button states
    if (testimonialPrev) testimonialPrev.style.opacity = testimonialIndex === 0 ? '0.5' : '1';
    if (testimonialNext) testimonialNext.style.opacity = testimonialIndex >= totalTestimonials - 1 ? '0.5' : '1';
  }
  
  if (testimonialPrev) {
    testimonialPrev.addEventListener('click', () => {
      if (testimonialIndex > 0) {
        testimonialIndex--;
        updateTestimonialSlider();
      }
    });
  }
  
  if (testimonialNext) {
    testimonialNext.addEventListener('click', () => {
      if (testimonialIndex < totalTestimonials - 1) {
        testimonialIndex++;
        updateTestimonialSlider();
      }
    });
  }
  
  // Auto-play testimonial
  setInterval(() => {
    if (testimonialIndex < totalTestimonials - 1) {
      testimonialIndex++;
    } else {
      testimonialIndex = 0;
    }
    updateTestimonialSlider();
  }, 5000);
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = question.querySelector('i');
    
    // Close other FAQ items
    faqQuestions.forEach(q => {
      if (q !== question) {
        const item = q.parentElement;
        const otherAnswer = item.querySelector('.faq-answer');
        const otherIcon = q.querySelector('i');
        
        item.classList.remove('active');
        otherAnswer.style.maxHeight = '0';
        otherIcon.style.transform = 'rotate(0deg)';
      }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      icon.style.transform = 'rotate(180deg)';
    } else {
      answer.style.maxHeight = '0';
      icon.style.transform = 'rotate(0deg)';
    }
  });
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Show success notification
    showNotification('Terima kasih telah berlangganan newsletter kami!', 'success');
    
    // Reset form
    newsletterForm.reset();
  });
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

function updateScrollTopButton() {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.remove('opacity-0', 'invisible');
    scrollTopBtn.classList.add('opacity-100', 'visible');
  } else {
    scrollTopBtn.classList.add('opacity-0', 'invisible');
    scrollTopBtn.classList.remove('opacity-100', 'visible');
  }
}

window.addEventListener('scroll', updateScrollTopButton);

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Notification System
function showNotification(message, type = 'success') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification fixed top-20 right-6 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 transform translate-x-full transition-transform duration-300`;
  
  if (type === 'success') {
    notification.classList.add('bg-green-500', 'text-white');
    notification.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
  } else if (type === 'error') {
    notification.classList.add('bg-red-500', 'text-white');
    notification.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>${message}</span>`;
  } else {
    notification.classList.add('bg-amber-500', 'text-white');
    notification.innerHTML = `<i class="fas fa-info-circle"></i><span>${message}</span>`;
  }
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

//