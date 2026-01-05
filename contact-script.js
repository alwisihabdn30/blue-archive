// ===== CONTACT PAGE JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function () {

    // ===== SIDEBAR MENU FUNCTIONALITY =====
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebarToggle && sidebarMenu && sidebarOverlay) {
        // Open sidebar
        sidebarToggle.addEventListener('click', function () {
            sidebarMenu.classList.add('active');
            sidebarOverlay.classList.add('active');
        });

        // Close sidebar - Close button
        if (sidebarClose) {
            sidebarClose.addEventListener('click', function () {
                sidebarMenu.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            });
        }

        // Close sidebar - Click overlay
        sidebarOverlay.addEventListener('click', function () {
            sidebarMenu.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });

        // Close sidebar - ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && sidebarMenu.classList.contains('active')) {
                sidebarMenu.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            }
        });

        // Close sidebar when clicking links
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function () {
                sidebarMenu.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            });
        });
    }

    // ===== CONTACT FORM FUNCTIONALITY =====
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const school = document.getElementById('school').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (name && email && school && message) {
                // Hide form and show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'flex';

                // Log data (in real app, send to server)
                console.log('Form Submitted:', {
                    name: name,
                    email: email,
                    school: school,
                    message: message,
                    timestamp: new Date().toLocaleString()
                });

                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                }, 3000);
            }
        });
    }

    // ===== NEON EFFECT SPEED CONTROL (Interactive) =====
    const formWrapper = document.querySelector('.form-wrapper');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    let currentDuration = 6000; // 6 seconds
    let targetDuration = 6000;
    let animationFrame = null;
    let isTyping = false;

    function smoothTransition() {
        const diff = targetDuration - currentDuration;

        if (Math.abs(diff) > 10) {
            currentDuration += diff * 0.015;
            formWrapper.style.setProperty('--spin-duration', `${currentDuration}ms`);
            animationFrame = requestAnimationFrame(smoothTransition);
        } else {
            currentDuration = targetDuration;
            formWrapper.style.setProperty('--spin-duration', `${currentDuration}ms`);
            animationFrame = null;
        }
    }

    // Speed up when typing
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (!isTyping) {
                isTyping = true;
                targetDuration = 60000; // Slow down to 60 seconds
                if (!animationFrame) {
                    smoothTransition();
                }
            }
        });

        input.addEventListener('focus', () => {
            if (!isTyping && !input.value) {
                targetDuration = 6000;
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                    animationFrame = null;
                }
                currentDuration = 6000;
                formWrapper.style.setProperty('--spin-duration', `${currentDuration}ms`);
            }
        });

        input.addEventListener('blur', () => {
            setTimeout(() => {
                // Check if any input has value
                const hasValue = Array.from(formInputs).some(inp => inp.value);
                if (!hasValue) {
                    isTyping = false;
                    targetDuration = 6000;
                    if (animationFrame) {
                        cancelAnimationFrame(animationFrame);
                        animationFrame = null;
                    }
                    smoothTransition();
                }
            }, 100);
        });
    });

    // Speed up on form submit
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            targetDuration = 2500; // Speed up to 2.5 seconds
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }
            smoothTransition();

            // Reset after success message
            setTimeout(() => {
                isTyping = false;
                targetDuration = 6000;
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                    animationFrame = null;
                }
                smoothTransition();
            }, 3000);
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.contact-header');

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.style.boxShadow = '0 5px 20px rgba(6, 182, 212, 0.2)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

    // ===== SCROLL TO TOP ON ESC =====
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !sidebarMenu.classList.contains('active')) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // ===== INTERSECTION OBSERVER untuk Animasi =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.form-wrapper, .social-section, .game-credits-section');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(element);
    });

    // ===== CONSOLE WELCOME MESSAGE =====
    console.log('%c╔═══════════════════════════╗', 'color: #06b6d4;');
    console.log('%c📧 CONTACT PAGE', 'color: #06b6d4; font-size: 20px; font-weight: bold;');
    console.log('%c   Blue Archive Database', 'color: #9ca3af; font-size: 12px;');
    console.log('%c╠═══════════════════════════╣', 'color: #06b6d4;');
    console.log('%cKirim pesan kepada Sensei!', 'color: #fff; font-size: 14px;');
    console.log('%c╚═══════════════════════════╝', 'color: #06b6d4;');

    // ===== SOCIAL ICONS ANIMATION =====
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        }, index * 100);
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        icon.style.transition = 'all 0.5s ease';
    });

    // ===== FORM FIELD FOCUS INDICATOR =====
    const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.01)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });

        field.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // ===== GAME CREDITS ANIMATION =====
    const creditCards = document.querySelectorAll('.credit-card');

    if (creditCards.length > 0) {
        creditCards.forEach((card, index) => {
            // Initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s ease ${index * 0.15}s`;

            // Intersection Observer
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.2
            });

            cardObserver.observe(card);

            // Hover effect enhancement
            card.addEventListener('mouseenter', function () {
                const icon = this.querySelector('.credit-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });

            card.addEventListener('mouseleave', function () {
                const icon = this.querySelector('.credit-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    // ===== CREDITS DISCLAIMER PULSE ANIMATION =====
    const disclaimer = document.querySelector('.credits-disclaimer');

    if (disclaimer) {
        const disclaimerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'disclaimerPulse 2s ease infinite';
                }
            });
        }, {
            threshold: 0.3
        });

        disclaimerObserver.observe(disclaimer);
    }

    // Add keyframe animation for disclaimer (injected via JS)
    const style = document.createElement('style');
    style.textContent = `
        @keyframes disclaimerPulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4);
            }
            50% {
                box-shadow: 0 0 0 10px rgba(251, 191, 36, 0);
            }
        }
    `;
    document.head.appendChild(style);

    // ===== CREDIT LINKS CLICK TRACKING (Optional) =====
    const creditLinks = document.querySelectorAll('.credit-link');

    creditLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const creditName = this.closest('.credit-card').querySelector('.credit-name').textContent;
            console.log(`🔗 Navigating to: ${creditName}`);

            // Ripple effect on click
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(6, 182, 212, 0.6)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - 10;
            const y = e.clientY - rect.top - 10;
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
});