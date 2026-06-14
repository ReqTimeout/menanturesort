/* ============================================
   MENANTU RESORT — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initCounterAnimation();
  initTabs();
  initAccordion();
  initVillaScroll();
  initTestimonialSlider();
});

/* --- Navbar Scroll Effect --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.querySelector('.navbar-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const menuLinks = document.querySelectorAll('.mobile-menu a');

  if (!toggle || !mobileMenu) return;

  const toggleMenu = () => {
    toggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  toggle.addEventListener('click', toggleMenu);
  if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --- Counter Animation --- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += increment;
      if (current < target) {
        el.textContent = prefix + Math.floor(current).toLocaleString('id-ID') + suffix;
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toLocaleString('id-ID') + suffix;
      }
    };

    update();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* --- Tabs --- */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      const container = btn.closest('.tabs-container') || document;

      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const content = container.querySelector(`[data-tab-content="${target}"]`);
      if (content) content.classList.add('active');
    });
  });
}

/* --- Accordion --- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --- Villa Horizontal Scroll --- */
function initVillaScroll() {
  const scrollContainer = document.querySelector('.villa-scroll');
  if (!scrollContainer) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    scrollContainer.style.cursor = 'grabbing';
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.style.cursor = 'grab';
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.style.cursor = 'grab';
  });

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
}

/* --- Testimonial Slider --- */
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonials-grid');
  const dots = document.querySelectorAll('.testimonial-dots span');
  if (!slider || !dots.length) return;

  let current = 0;

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      const cards = slider.querySelectorAll('.card-testimonial');
      cards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
      });

      current = index;
    });
  });
}

/* --- KPR Calculator (for simulator page) --- */
function calculateKPR(price, dpPercent, tenorYears, interestRate) {
  const dp = price * (dpPercent / 100);
  const loan = price - dp;
  const monthlyRate = interestRate / 100 / 12;
  const months = tenorYears * 12;

  let cicilan;
  if (monthlyRate === 0) {
    cicilan = loan / months;
  } else {
    cicilan = loan * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
              (Math.pow(1 + monthlyRate, months) - 1);
  }

  return {
    dp: dp,
    loan: loan,
    cicilan: Math.round(cicilan),
    totalPayment: Math.round(cicilan * months),
    totalInterest: Math.round((cicilan * months) - loan)
  };
}

function calculatePassiveIncome(price, occupancyRate = 50) {
  const nightlyRate = 800000;
  const monthlyRevenue = nightlyRate * 30 * (occupancyRate / 100);
  const operationalCost = monthlyRevenue * 0.2;
  const netRevenue = monthlyRevenue - operationalCost;
  const ownerShare = netRevenue * 0.7;

  return {
    monthlyRevenue: Math.round(monthlyRevenue),
    operationalCost: Math.round(operationalCost),
    netRevenue: Math.round(netRevenue),
    ownerShare: Math.round(ownerShare)
  };
}

/* --- Smooth Scroll --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
