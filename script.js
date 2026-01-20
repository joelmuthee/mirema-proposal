document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Glow Logic
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Use requestAnimationFrame for smooth performance
        requestAnimationFrame(() => {
            cursorGlow.style.transform = `translate(${mouseX - 200}px, ${mouseY - 200}px)`;
        });
    });

    // Scroll Reveal / Bidirectional Animation Logic
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // Bidirectional: Animate out when leaving view
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => observer.observe(el));

    // Scroll Spy for Nav Links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Remove active from all
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active to current
                const activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, {
        threshold: 0.01,
        rootMargin: "-25% 0px -50% 0px"
    });

    sections.forEach(section => scrollSpyObserver.observe(section));

    // Smooth Scroll for Anchors (Updated to include Nav)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Scroll Hover Simulation - Winner Takes All Logic
    // Only run on mobile screen sizes
    if (window.innerWidth <= 768) {
        const interactives = document.querySelectorAll('.card, .feature-card, .pricing-card, .pain-points li, .vision-points li, .btn-primary, .contact-link');

        const activeItemCheck = () => {
            const viewportCenter = window.innerHeight / 2;
            let closestElement = null;
            let minDistance = Infinity;

            interactives.forEach(el => {
                const rect = el.getBoundingClientRect();
                // calculating element center
                const elementCenter = rect.top + (rect.height / 2);
                const distance = Math.abs(viewportCenter - elementCenter);

                // Only consider elements that are overlapping the viewport
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestElement = el;
                    }
                }

                // Clear all first (safe reset)
                el.classList.remove('mobile-hover');
            });

            // Activate closest if it exists
            if (closestElement) {
                closestElement.classList.add('mobile-hover');
            }
        };

        // Run on scroll
        document.addEventListener('scroll', () => {
            requestAnimationFrame(activeItemCheck);
        }, { passive: true });

        // Run initially
        activeItemCheck();
    }
});
