/* ============================================================
   MAIN.JS — Navigacija + Scroll Reveal + Stagger
   ============================================================ */

(function () {
    'use strict';

    /* ---------- DOM elementi ---------- */
    const navToggle  = document.getElementById('nav-toggle');
    const navMenu    = document.getElementById('nav-menu');
    const overlay    = document.createElement('div');
    const body       = document.body;
    const navLinks   = navMenu.querySelectorAll('a');

    overlay.classList.add('nav-overlay');
    body.appendChild(overlay);

    /* ---------- Mobilni meni ---------- */
    function openMenu() {
        navMenu.classList.add('open');
        overlay.classList.add('active');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Zatvori meni');
        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('open');
        overlay.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Otvori meni');
        body.style.overflow = '';
    }

    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('open');
        isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    /* Zatvori meni posle klika na link */
    navLinks.forEach(link => link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) closeMenu();
    }));

    /* Zatvori sa Escape */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
    });

    /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
    const revealTargets = document.querySelectorAll('.reveal, .fade-in');
    const gridTargets   = document.querySelectorAll(
        '.lyrics-grid .lyric-card, .bio-cards .card, .timeline-item'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

    revealTargets.forEach(el => revealObserver.observe(el));

    /* Stagger za grid iteme — dodaj visible + delay */
    if (gridTargets.length) {
        gridTargets.forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.08}s`;
            revealObserver.observe(el);
        });
    }

    /* ---------- Smooth scroll za sve #linkove (fallback) ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset
                              - 70; // nav height
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    });

    /* ---------- Scroll Progress Indicator ---------- */
    const scrollProgress = document.querySelector('.scroll-progress');

    function updateScrollProgress() {
        if (!scrollProgress) return;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = `${Math.min(progress, 100)}%`;
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
})();
