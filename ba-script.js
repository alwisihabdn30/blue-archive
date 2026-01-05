// Blue Archive Database - Interactive Features
// Script untuk animasi dan interaksi website Blue Archive

document.addEventListener('DOMContentLoaded', function () {

    // ===== SMOOTH SCROLL untuk Link Anchor =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== PARALLAX EFFECT untuk Hero Video =====
    const hero = document.querySelector('.hero');
    const heroVideo = document.querySelector('.hero-video');

    if (hero && heroVideo) {
        let ticking = false;

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    const scrolled = window.pageYOffset;
                    heroVideo.style.transform = `translateY(${scrolled * 0.4}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ===== INTERSECTION OBSERVER untuk Animasi Card =====
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

    // Observasi semua card untuk fade-in animation 
    document.querySelectorAll('.school-card, .waifu-card-landscape, .feature, .gallery-item').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.2s ease ${index * 0.02}s, transform 0.2s ease ${index * 0.02}s`;
        observer.observe(card);
    });

    // ===== SCHOOL CARD HOVER EFFECT =====
    document.querySelectorAll('.school-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.borderColor = 'var(--accent-cyan)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.borderColor = 'rgba(6, 182, 212, 0.15)';
        });
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
                header.style.boxShadow = '0 5px 20px rgba(6, 182, 212, 0.15)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.9)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // ===== WAIFU CARD INTERACTION =====
    document.querySelectorAll('.waifu-card-landscape').forEach(card => {
        card.addEventListener('click', function () {
            // Efek klik
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // ===== WAIFU VIDEO AUTO-PLAY FIX =====
    const waifuVideos = document.querySelectorAll('.waifu-image-landscape');
    waifuVideos.forEach(video => {
        // Pastikan video muted dan siap autoplay
        video.muted = true;
        video.playsInline = true;

        // Force play jika tidak autoplay
        video.play().catch(err => {
            console.log('Video autoplay prevented:', err);
        });

        // Error handling untuk video
        video.addEventListener('error', function () {
            console.log('Video error, attempting reload...');
            setTimeout(() => {
                this.load();
                this.play().catch(err => console.log('Reload failed:', err));
            }, 1000);
        });
    });

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function (e) {
        // Tombol ESC untuk scroll ke atas
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // ===== CONSOLE WELCOME MESSAGE =====
    console.log('%c╔═══════════════════════╗', 'color: #06b6d4;');
    console.log('%c🎮 BLUE ARCHIVE DATABASE', 'color: #06b6d4; font-size: 20px; font-weight: bold;');
    console.log('%c   Character Database System v1.0', 'color: #9ca3af; font-size: 12px;');
    console.log('%c╠═══════════════════════╣', 'color: #06b6d4;');
    console.log('%cWelcome to Kivotos Academy!', 'color: #fff; font-size: 14px;');
    console.log('%cCreated by: Alwi Sihabudin', 'color: #9ca3af; font-size: 12px;');
    console.log('%c╚═══════════════════════╝', 'color: #06b6d4;');

    // ===== LIVE CLOCK =====
    function updateClock() {
        const clockElement = document.getElementById('liveClock');
        if (clockElement) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    // Update clock setiap detik
    updateClock();
    setInterval(updateClock, 1000);

    // ===== GALLERY FUNCTIONALITY =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalImage = document.getElementById('galleryModalImage');
    const galleryModalTitle = document.getElementById('galleryModalTitle');
    const galleryModalDescription = document.getElementById('galleryModalDescription');
    const galleryClose = document.querySelector('.gallery-close');

    // Gallery Data
    const galleryData = {
        '1': {
            title: 'Abydos School Stories',
            description: 'Sekolah Abydos yang hampir hancur, namun memiliki siswa-siswa yang pantang menyerah. Mereka berjuang untuk mempertahankan sekolah mereka dari kehancuran total. Dipimpin oleh para siswa yang berani, Abydos adalah simbol harapan dan ketekunan di tengah kesulitan.'
        },
        '2': {
            title: 'Gehenna Chronicles',
            description: 'Gehenna Academy dikenal dengan atmosfer yang keras dan penuh tantangan. Siswa-siswanya memiliki reputasi sebagai yang paling tangguh dan tidak takut menghadapi bahaya. Meskipun terlihat menakutkan, mereka memiliki loyalitas tinggi dan ikatan persahabatan yang kuat.'
        },
        '3': {
            title: 'Millennium Science',
            description: 'Millennium Science School adalah pusat teknologi dan inovasi di Kivotos. Siswa-siswanya adalah para jenius yang mengembangkan senjata dan teknologi canggih. Mereka percaya bahwa ilmu pengetahuan adalah kunci untuk menghadapi setiap masalah.'
        },
        '4': {
            title: 'Trinity Glory',
            description: 'Trinity General School adalah sekolah bergengsi dengan tradisi yang kuat. Siswa-siswanya dikenal sangat disiplin dan mengikuti aturan dengan ketat. Mereka menjunjung tinggi nilai-nilai kehormatan, keadilan, dan dedikasi kepada Tuhan.'
        },
        '5': {
            title: 'Hyakkiyako Tales',
            description: 'Hyakkiyako Alliance adalah kelompok misterius dengan budaya tradisional Jepang yang kental. Siswa-siswanya ahli dalam seni bela diri dan strategi pertempuran klasik. Mereka menjaga tradisi kuno sambil beradaptasi dengan zaman modern.'
        },
        '6': {
            title: 'Shanhaijing Stories',
            description: 'Shanhaijing Senior Secondary School terinspirasi dari mitologi dan budaya Tiongkok kuno. Siswa-siswanya memiliki kearifan tradisional yang dalam dan kemampuan bertarung yang luar biasa. Mereka menghormati leluhur dan warisan budaya mereka.'
        }
    };

    // Open Gallery Modal
    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const galleryId = this.getAttribute('data-gallery');
            const imgSrc = this.querySelector('img').src;
            const data = galleryData[galleryId];

            galleryModalImage.src = imgSrc;
            galleryModalTitle.textContent = data.title;
            galleryModalDescription.textContent = data.description;

            galleryModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Animation
            setTimeout(() => {
                galleryModal.classList.add('active');
            }, 10);
        });
    });

    // Close Gallery Modal
    if (galleryClose) {
        galleryClose.addEventListener('click', closeGalleryModal);
    }

    if (galleryModal) {
        galleryModal.addEventListener('click', function (e) {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });
    }

    function closeGalleryModal() {
        galleryModal.classList.remove('active');
        setTimeout(() => {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // ESC to close modal
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && galleryModal.style.display === 'flex') {
            closeGalleryModal();
        }
    });

    // ===== NINO SPECIAL VIDEO CONTROLS =====
    const ninoVideo = document.getElementById('ninoVideo');
    const ninoSoundToggle = document.getElementById('ninoSoundToggle');
    const ninoFullscreenToggle = document.getElementById('ninoFullscreenToggle');
    const soundIcon = document.querySelector('.sound-icon');
    const ninoVideoContainer = document.querySelector('.nino-video-container');

    if (ninoVideo && ninoSoundToggle) {
        // Create play/pause indicator
        const playIndicator = document.createElement('div');
        playIndicator.className = 'nino-play-indicator';
        playIndicator.innerHTML = '▶️';
        ninoVideoContainer.appendChild(playIndicator);

        // Auto play video when loaded
        ninoVideo.muted = true;
        ninoVideo.play().catch(err => {
            console.log('Nino video autoplay prevented:', err);
        });

        // Function to show play/pause indicator
        function showPlayIndicator(isPaused) {
            playIndicator.innerHTML = isPaused ? '⏸️' : '▶️';
            playIndicator.classList.add('show');
            setTimeout(() => {
                playIndicator.classList.remove('show');
            }, 500);
        }

        // Click video to play/pause (WITH FULLSCREEN CHECK)
        ninoVideoContainer.addEventListener('click', function (e) {
            // Ignore clicks on buttons
            if (e.target.closest('.nino-sound-toggle') ||
                e.target.closest('.nino-fullscreen-toggle')) {
                return;
            }

            // JANGAN play/pause saat dalam mode fullscreen
            if (document.fullscreenElement || document.webkitFullscreenElement) {
                return; // Exit jika sedang fullscreen
            }

            if (ninoVideo.paused) {
                ninoVideo.play();
                showPlayIndicator(false);
            } else {
                ninoVideo.pause();
                showPlayIndicator(true);
            }
        });

        // Toggle sound on/off
        ninoSoundToggle.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent video play/pause
            if (ninoVideo.muted) {
                ninoVideo.muted = false;
                soundIcon.textContent = '🔊';
                this.style.background = 'rgba(16, 185, 129, 0.9)';
            } else {
                ninoVideo.muted = true;
                soundIcon.textContent = '🔇';
                this.style.background = 'rgba(6, 182, 212, 0.9)';
            }
        });

        // Fullscreen toggle
        if (ninoFullscreenToggle) {
            ninoFullscreenToggle.addEventListener('click', function (e) {
                e.stopPropagation(); // Prevent video play/pause

                if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                    // Enter fullscreen - langsung ke VIDEO, bukan container
                    if (ninoVideo.requestFullscreen) {
                        ninoVideo.requestFullscreen();
                    } else if (ninoVideo.webkitRequestFullscreen) {
                        ninoVideo.webkitRequestFullscreen();
                    } else if (ninoVideo.mozRequestFullScreen) {
                        ninoVideo.mozRequestFullScreen();
                    } else if (ninoVideo.msRequestFullscreen) {
                        ninoVideo.msRequestFullscreen();
                    }
                } else {
                    // Exit fullscreen
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            });

            // Update fullscreen icon when fullscreen changes
            document.addEventListener('fullscreenchange', updateFullscreenIcon);
            document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
            document.addEventListener('mozfullscreenchange', updateFullscreenIcon);
            document.addEventListener('msfullscreenchange', updateFullscreenIcon);

            function updateFullscreenIcon() {
                const fullscreenIcon = document.querySelector('.fullscreen-icon');
                if (document.fullscreenElement || document.webkitFullscreenElement) {
                    fullscreenIcon.textContent = '✕'; // Exit fullscreen icon (X)
                } else {
                    fullscreenIcon.textContent = '⛶'; // Enter fullscreen icon
                }
            }
        }

        // Error handling
        ninoVideo.addEventListener('error', function () {
            console.log('Nino video error, attempting reload...');
            setTimeout(() => {
                this.load();
                this.play().catch(err => console.log('Reload failed:', err));
            }, 1000);
        });

        // Keyboard shortcuts for video
        document.addEventListener('keydown', function (e) {
            if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                if (ninoVideo.paused) {
                    ninoVideo.play();
                    showPlayIndicator(false);
                } else {
                    ninoVideo.pause();
                    showPlayIndicator(true);
                }
            }
        });

        // TAMBAHKAN INI - Prevent auto-play saat exit fullscreen
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);

        function handleFullscreenChange() {
            // Cek apakah keluar dari fullscreen
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                // JANGAN auto-play, biarkan status sesuai user
                // Tidak ada aksi (video tetap sesuai state sebelumnya)
            }
        }

        // ===== CONTACT BUTTON INTERACTION =====
        const contactButton = document.querySelector('.contact-button');

        if (contactButton) {
            // Ripple effect on click
            contactButton.addEventListener('click', function (e) {
                // Create ripple element
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.6)';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.pointerEvents = 'none';
                ripple.style.animation = 'rippleEffect 0.6s ease-out';

                // Position ripple at click location
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - 10;
                const y = e.clientY - rect.top - 10;
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                this.appendChild(ripple);

                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });

            // Smooth transition effect
            contactButton.addEventListener('mouseenter', function () {
                this.style.letterSpacing = '3px';
            });

            contactButton.addEventListener('mouseleave', function () {
                this.style.letterSpacing = '2px';
            });
        }

        // ===== CONTACT BUTTON SCROLL ANIMATION =====
        const contactSection = document.querySelector('.contact-button-section');

        if (contactSection) {
            const contactObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.2
            });

            contactSection.style.opacity = '0';
            contactSection.style.transform = 'translateY(30px)';
            contactSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            contactObserver.observe(contactSection);
        }
    }
});