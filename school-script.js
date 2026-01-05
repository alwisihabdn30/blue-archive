// ===== UNIVERSAL JAVASCRIPT FOR ALL SCHOOLS =====
// Auto-detect school name and student count from HTML

document.addEventListener('DOMContentLoaded', function () {

    // ===== AUTO-DETECT SCHOOL INFO =====
    const schoolName = document.querySelector('.school-title') ? document.querySelector('.school-title').textContent : 'Unknown School';
    const totalStudents = document.querySelectorAll('.student-card').length;

    // Fixed: Count strikers properly without :contains()
    let strikers = 0;
    document.querySelectorAll('.info-table').forEach(table => {
        const cells = table.querySelectorAll('.info-value');
        cells.forEach(cell => {
            if (cell.textContent.trim() === 'Striker') {
                strikers++;
            }
        });
    });

    const special = totalStudents - strikers;

    // ===== MAIN TAB FUNCTIONALITY =====
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const studentId = this.getAttribute('data-student');
            const tabName = this.getAttribute('data-tab');

            // Remove active class from all tabs in this student card
            const studentCard = this.closest('.student-card');
            studentCard.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Hide all tab contents in this student card
            studentCard.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding content
            const targetContent = studentCard.querySelector(`.tab-content[data-content="${tabName}"][data-student="${studentId}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ===== SUB-TAB FUNCTIONALITY (CHIBI/LIVE2D) =====
    const subTabButtons = document.querySelectorAll('.sub-tab-btn');

    subTabButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const studentId = this.getAttribute('data-student');
            const subTabName = this.getAttribute('data-subtab');

            // Find the parent tab-content
            const parentTabContent = this.closest('.tab-content');

            // Remove active class from all sub-tab buttons in this tab
            parentTabContent.querySelectorAll('.sub-tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Hide all sub-tab contents in this tab
            parentTabContent.querySelectorAll('.sub-tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding sub-content
            const targetSubContent = parentTabContent.querySelector(`.sub-tab-content[data-subcontent="${subTabName}"][data-student="${studentId}"]`);
            if (targetSubContent) {
                targetSubContent.classList.add('active');
            }
        });
    });

    // ===== VIDEO CLICK TO PLAY/PAUSE (TANPA KONTROL UI) =====
    const allChibiVideos = document.querySelectorAll('.character-video');

    allChibiVideos.forEach(video => {
        // Hapus kontrol bawaan
        video.removeAttribute('controls');

        // Klik untuk play/pause tanpa UI
        video.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        });

        // Auto-play saat video terlihat
        const videoObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play().catch(err => {
                        console.log('Video autoplay prevented:', err);
                    });
                } else {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.5 });

        videoObserver.observe(video);
    });

    // ===== SMOOTH SCROLL TO TOP =====
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
        backButton.addEventListener('click', function (e) {
            // Smooth scroll to top before navigation
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== INTERSECTION OBSERVER FOR CARD ANIMATIONS =====
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

    // Observe all student cards for fade-in animation
    document.querySelectorAll('.student-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(card);
    });

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function (e) {
        // Press ESC to scroll to top
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // ===== HEADER SCROLL EFFECT =====
    let lastScroll = 0;
    const header = document.querySelector('.school-header');

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.style.boxShadow = '0 5px 20px rgba(255, 255, 255, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        });
    }

    // ===== GET SCHOOL COLOR FROM CSS VARIABLE =====
    const schoolColor = getComputedStyle(document.documentElement).getPropertyValue('--school-color').trim();

    // ===== CONSOLE WELCOME MESSAGE (AUTO-DETECT) =====
    console.log(`%c╔═══════════════════════════╗`, `color: ${schoolColor};`);
    console.log(`%c🎓 ${schoolName}`, `color: ${schoolColor}; font-size: 20px; font-weight: bold;`);
    console.log(`%c   Student Database System`, 'color: #9ca3af; font-size: 12px;');
    console.log(`%c╠═══════════════════════════╣`, `color: ${schoolColor};`);
    console.log(`%cTotal Students: ${totalStudents}`, 'color: #fff; font-size: 14px;');
    console.log(`%cStrikers: ${strikers} | Special: ${special}`, 'color: #fff; font-size: 14px;');
    console.log(`%cSchool Color: ${schoolColor}`, 'color: #9ca3af; font-size: 12px;');
    console.log(`%c╚═══════════════════════════╝`, `color: ${schoolColor};`);

    // ===== TABLE CELL HOVER INFO =====
    const tableCells = document.querySelectorAll('.info-table td');
    tableCells.forEach(cell => {
        cell.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });

        cell.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // ===== LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('.character-image');
    const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });

    // ===== STUDENT CARD CLICK INFO =====
    document.querySelectorAll('.student-card').forEach(card => {
        const studentName = card.querySelector('.student-header h2') ? card.querySelector('.student-header h2').textContent : 'Unknown';
        card.addEventListener('click', function (e) {
            // Only log if clicking on the card itself, not buttons
            if (e.target === this || e.target.closest('.student-header')) {
                console.log(`Student Selected: ${studentName} from ${schoolName}`);
            }
        });
    });

    // ===== STATS BOX ANIMATION =====
    const statBoxes = document.querySelectorAll('.stat-box');
    statBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        }, index * 100);
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
        box.style.transition = 'all 0.5s ease';
    });

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

});