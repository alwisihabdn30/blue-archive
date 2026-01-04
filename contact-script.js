// ===== CONTACT PAGE JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {

    // ===== SIDEBAR MENU FUNCTIONALITY =====
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebarToggle && sidebarMenu && sidebarOverlay) {
        // Open sidebar
        sidebarToggle.addEventListener('click', function() {
            sidebarMenu.classList.add('active');
            sidebarOverlay.classList.add('active');
        });
        
        // Close sidebar - Close button
        if (sidebarClose) {
            sidebarClose.addEventListener('click', function() {
                sidebarMenu.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            });
        }
        
        // Close sidebar - Click overlay
        sidebarOverlay.addEventListener('click', function() {
            sidebarMenu.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
        
        // Close sidebar - ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebarMenu.classList.contains('active')) {
                sidebarMenu.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            }
        });
        
        // Close sidebar when clicking links
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                sidebarMenu.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            });
        });
    }

    // ===== CONTACT FORM FUNCTIONALITY =====
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
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
    document.addEventListener('keydown', function(e) {
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

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.form-wrapper, .social-section');
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
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.01)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

});