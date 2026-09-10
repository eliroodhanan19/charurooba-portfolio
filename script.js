/* =========================================================
   PORTFOLIO JAVASCRIPT - CHARUROOBA M
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       ACTIVE NAVIGATION & SMOOTH SCROLL
    ========================================================= */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    function updateActiveNavigation() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 160;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavigation, { passive: true });
    updateActiveNavigation();

    // Smooth navigation click
    navLinks.forEach((link) => {
        link.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const target = document.querySelector(targetId);
                if (target) {
                    event.preventDefault();

                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('mobile-open')) {
                        navMenu.classList.remove('mobile-open');
                        if (mobileToggle) mobileToggle.classList.remove('active');
                    }

                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    /* =========================================================
       MOBILE NAVIGATION TOGGLE
    ========================================================= */
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('mobile-open');
        });

        // Close on outside click
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
                navMenu.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                navMenu.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
            }
        });
    }

    /* =========================================================
       SCROLL REVEAL ANIMATIONS
    ========================================================= */
    const revealElements = document.querySelectorAll(
        '.skill-card, .project-card, .training-card, .education-item, .service-card, .communication-section, .objective-section, .professional-skills'
    );

    revealElements.forEach((element) => {
        element.classList.add('reveal');
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach((element) => {
            element.classList.add('visible');
        });
    }

    /* =========================================================
       INTERACTIVE CONTACT FORM
    ========================================================= */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !message) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please fill out all required fields.';
                return;
            }

            if (!emailRegex.test(email)) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please enter a valid email address.';
                return;
            }

            // Success feedback
            formStatus.className = 'form-status success';
            formStatus.innerHTML = `<strong>Thank you, ${name}!</strong> Your message has been prepared. Opening your email app to send it directly to Charurooba...`;

            // Prepare mailto link
            const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
            const body = encodeURIComponent(`Hello Charurooba,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoUrl = `mailto:chanrasekar216@gmail.com?subject=${subject}&body=${body}`;

            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 600);

            contactForm.reset();
        });
    }

    /* =========================================================
       PROFILE IMAGE FALLBACK
    ========================================================= */
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.addEventListener('error', function () {
            // Fallback to online hosted asset if local profile.png is absent
            this.src = 'https://cdn.grapesjs.com/workspaces/cmmmz66tdadpf12v11ryb41ue/assets/c8adb9f3-55b3-4591-9a62-664bf8827fad__chatgpt-image-sep-9-2026-121202-pm.png';
        });
    }

    console.log('Portfolio initialized successfully for Charurooba M.');
});
