/* ============================================================
   KRAL FOOTWEAR — Main JavaScript
   Elle & Riley–style interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) lucide.createIcons();

  // --- Product Data ---
  const products = {
    1: { name: 'Classic Brogue Derby', price: 'R 2,450', category: 'Formal', image: 'assets/images/product-1.png', desc: 'Hand-stitched full-grain leather brogue derby with intricate perforated detailing and Goodyear welt construction.' },
    2: { name: 'Midnight Oxford', price: 'R 2,650', category: 'Formal', image: 'assets/images/product-2.png', desc: 'Polished black calfskin leather oxford — the quintessential formal shoe for the discerning professional.' },
    3: { name: 'Sahara Desert Boot', price: 'R 2,200', category: 'Smart Casual', image: 'assets/images/product-3.png', desc: 'Cognac suede desert boot with natural crepe sole. The perfect bridge between casual and refined.' },
    4: { name: 'Olive Suede Casual', price: 'R 1,950', category: 'Smart Casual', image: 'assets/images/product-4.png', desc: 'Contemporary olive green suede with clean white rubber sole. Bold yet understated.' },
    5: { name: 'Noir Derby', price: 'R 2,800', category: 'Loafers', image: 'assets/images/product-5.png', desc: 'Sleek black pebbled leather derby with lug sole. Modern design for seamless transitions from office to evening.' },
    6: { name: 'Burgundy Wingtip', price: 'R 2,750', category: 'Formal', image: 'assets/images/product-6.png', desc: 'Rich burgundy wingtip brogue in hand-dyed leather. Classic gentleman styling with a contemporary edge.' },
    7: { name: 'Camel Penny Loafer', price: 'R 1,850', category: 'Smart Casual', image: 'assets/images/product-7.png', desc: 'Warm camel tan leather penny loafer. The ultimate smart casual companion.' },
    8: { name: 'Classic Oxford', price: 'R 2,950', category: 'Loafers', image: 'assets/images/product-8.png', desc: 'Premium black leather cap-toe Oxford with lug sole. Clean, bold, and versatile — the ultimate formal shoe.' }
  };

  // --- Announcement bar close ---
  const closeAnnouncement = document.getElementById('close-announcement');
  const announcement = document.getElementById('announcement');
  if (closeAnnouncement && announcement) {
    closeAnnouncement.addEventListener('click', () => {
      announcement.style.transform = 'translateY(-100%)';
      document.getElementById('site-header').style.top = '0';
    });
  }

  // --- Header scroll behavior ---
  const header = document.getElementById('site-header');
  let scrolledPast = false;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 80 && !scrolledPast) {
      header.classList.add('scrolled');
      scrolledPast = true;
      if (announcement) announcement.style.transform = 'translateY(-100%)';
    } else if (y <= 80 && scrolledPast) {
      header.classList.remove('scrolled');
      scrolledPast = false;
      if (announcement) announcement.style.transform = 'translateY(0)';
    }
  }, { passive: true });

  // --- Mobile nav ---
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    const isOpen = mobileNav.classList.contains('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.textContent = isOpen ? 'Close' : 'Menu';
    if(isOpen) header.classList.add('menu-open');
    else header.classList.remove('menu-open');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.textContent = 'Menu';
      header.classList.remove('menu-open');
    });
  });

  // --- Category tab filtering ---
  const tabs = document.querySelectorAll('.category-tabs button');
  const cards = document.querySelectorAll('.product-card[data-category]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          // Re-trigger reveal
          card.classList.remove('visible');
          requestAnimationFrame(() => {
            card.classList.add('visible');
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Scroll reveal ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // --- Hero Slider Pagination ---
  const heroPanels = document.querySelectorAll('.hero-panel');
  const heroDots = document.querySelectorAll('#hero-pagination .dot');
  
  if (heroPanels.length > 0 && heroDots.length > 0) {
    const sliderObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(heroPanels).indexOf(entry.target);
          heroDots.forEach((dot, idx) => {
            if (idx === index) dot.classList.add('active');
            else dot.classList.remove('active');
          });
        }
      });
    }, { threshold: 0.5, root: document.querySelector('.hero-split') });
    
    heroPanels.forEach(panel => sliderObserver.observe(panel));
  }

  // --- Quick view modal ---
  const overlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');

  const openModal = (id) => {
    const p = products[id];
    if (!p) return;
    document.getElementById('modal-img').src = p.image;
    document.getElementById('modal-img').alt = p.name;
    document.getElementById('modal-title').textContent = p.name;
    document.getElementById('modal-price').textContent = p.price;
    document.getElementById('modal-desc').textContent = p.desc;
    document.getElementById('modal-cat').textContent = p.category;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(btn.dataset.id);
    });
  });

  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // --- Smooth scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });

  // --- Newsletter ---
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      btn.textContent = 'Subscribed ✓';
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput) emailInput.value = '';
      setTimeout(() => { btn.textContent = 'Sign Up'; }, 3000);
    });
  }

  // --- Cart counter ---
  let count = 0;
  const badge = document.getElementById('cart-badge');
  const cartBtn = document.getElementById('modal-cart');
  if (cartBtn) {
    cartBtn.addEventListener('click', e => {
      e.preventDefault();
      count++;
      badge.textContent = count;
      badge.style.display = 'inline-flex';
      badge.style.transform = 'scale(1.3)';
      setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
      closeModal();
    });
  }

  // --- Active nav highlighting ---
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    const y = window.scrollY + 100;
    sections.forEach(s => {
      if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${s.id}`);
        });
      }
    });
  }, { passive: true });
});
