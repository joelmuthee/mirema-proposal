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
});
