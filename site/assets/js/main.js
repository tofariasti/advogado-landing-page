// ================================
// INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }
  
  // Initialize all features
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  initCounterAnimation();
  initParticles();
  initBackToTop();
  initWhatsAppForm();
  initScrollAnimations();
});

// ================================
// HEADER SCROLL EFFECT
// ================================

function initHeader() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Add scrolled class on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(function(section) {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const link = document.querySelector('.nav-link[href*="' + sectionId + '"]');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(function(l) { l.classList.remove('active'); });
        if (link) {
          link.classList.add('active');
        }
      }
    });
  });
}

// ================================
// MOBILE MENU TOGGLE
// ================================

function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
      const icon = navToggle.querySelector('i');
      if (navMenu.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close menu when clicking a link
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('show');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }
}

// ================================
// SMOOTH SCROLL
// ================================

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href === '') {
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ================================
// COUNTER ANIMATION
// ================================

function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat__number');
  let animated = false;
  
  function animateCounters() {
    if (animated) return;
    
    const statsSection = document.querySelector('.hero__stats');
    if (!statsSection) return;
    
    const sectionTop = statsSection.offsetTop;
    const sectionHeight = statsSection.offsetHeight;
    const scrollY = window.pageYOffset + window.innerHeight;
    
    if (scrollY > sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      animated = true;
      
      counters.forEach(function(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = function() {
          current += increment;
          
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
      });
    }
  }
  
  window.addEventListener('scroll', animateCounters);
  animateCounters(); // Check on load
}

// ================================
// PARTICLES ANIMATION
// ================================

function initParticles() {
  const particlesContainer = document.getElementById('particles');
  
  if (!particlesContainer) return;
  
  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(212, 175, 55, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      animation: float ${duration}s ${delay}s infinite ease-in-out;
      box-shadow: 0 0 ${size * 2}px rgba(212, 175, 55, 0.5);
    `;
    
    particlesContainer.appendChild(particle);
  }
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translate(0, 0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      50% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
      }
    }
  `;
  document.head.appendChild(style);
}

// ================================
// BACK TO TOP BUTTON
// ================================

function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ================================
// WHATSAPP FORM HANDLER
// ================================

function initWhatsAppForm() {
  const form = document.getElementById('whatsapp-form');
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const area = document.getElementById('area').value;
    const atendimento = document.getElementById('atendimento').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Validate
    if (!nome || !telefone || !email || !area || !atendimento || !mensagem) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Build WhatsApp message
    const whatsappMessage = `
*SOLICITAÇÃO DE CONSULTA JURÍDICA*

*Nome:* ${nome}
*Telefone:* ${telefone}
*E-mail:* ${email}
*Área de Interesse:* ${area}
*Preferência de Atendimento:* ${atendimento}

*Descrição do Caso:*
${mensagem}

---
_Enviado via site Lex & Associados_
    `.trim();
    
    // WhatsApp number (remove all non-digits)
    const whatsappNumber = '5551989030405';
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Build WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    showSuccessMessage();
    
    // Reset form after a delay
    setTimeout(function() {
      form.reset();
    }, 1000);
  });
}

function showSuccessMessage() {
  // Create success message element
  const successMsg = document.createElement('div');
  successMsg.className = 'success-message';
  successMsg.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>Redirecionando para o WhatsApp...</span>
  `;
  
  successMsg.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
    color: #0a0a0a;
    padding: 2rem 3rem;
    border-radius: 12px;
    box-shadow: 0 8px 40px rgba(212, 175, 55, 0.5);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    animation: slideInDown 0.3s ease-out;
  `;
  
  document.body.appendChild(successMsg);
  
  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translate(-50%, -60%);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Remove after 3 seconds
  setTimeout(function() {
    successMsg.style.animation = 'slideInDown 0.3s ease-in reverse';
    setTimeout(function() {
      successMsg.remove();
    }, 300);
  }, 3000);
}

// ================================
// SCROLL ANIMATIONS
// ================================

function initScrollAnimations() {
  // Add parallax effect to hero
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero__content');
    const heroBg = document.querySelector('.hero__bg');
    
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroContent.style.opacity = 1 - (scrolled / 600);
    }
    
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });
  
  // Add hover tilt effect to cards
  const cards = document.querySelectorAll('.area-card, .depoimento');
  
  cards.forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });
}

// ================================
// PHONE MASK
// ================================

const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
  telefoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    
    e.target.value = value;
  });
}

// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  const lazyImages = document.querySelectorAll('img.lazy');
  lazyImages.forEach(function(img) {
    imageObserver.observe(img);
  });
}

// Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = function() {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(function() {
  // Your scroll handler here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ================================
// CONSOLE MESSAGE
// ================================

console.log('%c🏛️ Lex & Associados Advocacia', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cDesenvolvido com ⚡ por Tiago Farias', 'font-size: 12px; color: #999;');
console.log('%chttps://fariasdigital.com.br', 'font-size: 12px; color: #d4af37;');
