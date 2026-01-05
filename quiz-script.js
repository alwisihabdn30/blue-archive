// quiz-script.js

// ===== QUIZ DATA =====
const quizData = {
    character: [
        {
            question: "Karakter mana yang merupakan anggota Problem Solver 68 dari Abydos?",
            answers: ["Shiroko", "Hina", "Yuuka", "Mika"],
            correct: 0,
            hint: "Dia suka naik sepeda dan memiliki helm dengan telinga serigala"
        },
        {
            question: "Siapa ketua SCHALE yang memimpin Abydos High School?",
            answers: ["Nonomi", "Serika", "Hoshino", "Ayane"],
            correct: 2,
            hint: "Dia sering terlihat santai dan suka tidur"
        },
        {
            question: "Karakter dari Gehenna mana yang dijuluki 'Prefect Team'?",
            answers: ["Hina", "Ako", "Iori", "Chiaki"],
            correct: 0,
            hint: "Dia memiliki rambut ungu dan sangat disegani"
        },
        {
            question: "Siapa karakter Millennium yang ahli dalam teknologi dan hacking?",
            answers: ["Yuzu", "Noa", "Momoi", "Midori"],
            correct: 1,
            hint: "Dia adalah seorang engineer jenius dengan headphone"
        },
        {
            question: "Karakter Trinity mana yang merupakan anggota Sisterhood?",
            answers: ["Mika", "Nagisa", "Koharu", "Azusa"],
            correct: 0,
            hint: "Dia memiliki kepribadian ceria dan suka membantu"
        },
        {
            question: "Siapa karakter dari Red Winter yang merupakan pemimpin?",
            answers: ["Marina", "Cherino", "Nodoka", "Takane"],
            correct: 0,
            hint: "Dia memiliki personalitas tegas dan militeristik"
        },
        {
            question: "Karakter Hyakkiyako mana yang menggunakan katana?",
            answers: ["Izuna", "Tsukuyo", "Mimori", "Michiru"],
            correct: 0,
            hint: "Dia memiliki telinga rubah dan sangat cepat"
        },
        {
            question: "Siapa healer dari Trinity yang selalu membawa tas medis?",
            answers: ["Hanae", "Koharu", "Nodoka", "Mari"],
            correct: 1,
            hint: "Dia memiliki halo berbentuk hati"
        },
        {
            question: "Karakter Arius mana yang merupakan sniper handal?",
            answers: ["Saori", "Misaki", "Hiyori", "Atsuko"],
            correct: 1,
            hint: "Dia memiliki rambut hitam panjang dan mata merah"
        },
        {
            question: "Siapa karakter dari Shanhaijing yang terinspirasi mitologi Tiongkok?",
            answers: ["Shun", "Kokona", "Rumi", "Mina"],
            correct: 0,
            hint: "Dia adalah karakter kid version dari karakter populer"
        },
        {
            question: "Karakter Millennium mana yang suka membuat robot?",
            answers: ["Kotori", "Eimi", "Asuna", "Akane"],
            correct: 0,
            hint: "Dia memiliki robot kecil yang selalu menemaninya"
        },
        {
            question: "Siapa karakter Gehenna yang merupakan twins?",
            answers: ["Haruka & Haruna", "Ako & Iroha", "Chiaki & Chinatsu", "Mutsuki & Satsuki"],
            correct: 3,
            hint: "Mereka memiliki nama yang sangat mirip"
        }
    ],
    school: [
        {
            question: "Sekolah mana yang hampir bangkrut dan hanya memiliki 5 siswa?",
            answers: ["Abydos", "Gehenna", "Millennium", "Trinity"],
            correct: 0,
            hint: "Sekolah ini terletak di area gurun pasir"
        },
        {
            question: "Sekolah mana yang fokus pada teknologi dan science?",
            answers: ["Trinity", "Millennium", "Gehenna", "Hyakkiyako"],
            correct: 1,
            hint: "Logo sekolah ini berwarna biru"
        },
        {
            question: "Sekolah mana yang memiliki nuansa keagamaan dan disiplin tinggi?",
            answers: ["Millennium", "Trinity", "Red Winter", "Shanhaijing"],
            correct: 1,
            hint: "Warna tema sekolah ini adalah emas/kuning"
        },
        {
            question: "Sekolah mana yang dikenal dengan gaya hidup bebas dan berani?",
            answers: ["Trinity", "Millennium", "Gehenna", "Abydos"],
            correct: 2,
            hint: "Sekolah ini memiliki warna tema merah"
        },
        {
            question: "Akademi mana yang terinspirasi dari era Soviet dengan iklim bersalju?",
            answers: ["Hyakkiyako", "Red Winter", "Shanhaijing", "Valkyrie"],
            correct: 1,
            hint: "Nama sekolah ini mengandung warna"
        },
        {
            question: "Sekolah mana yang merupakan federasi dengan tradisi Jepang kuno?",
            answers: ["Trinity", "Hyakkiyako", "Shanhaijing", "Wildhunt"],
            correct: 1,
            hint: "Nama sekolah berasal dari cerita yokai"
        },
        {
            question: "Akademi kepolisian elite di Kivotos adalah?",
            answers: ["SRT", "Valkyrie", "Arius", "Highlander"],
            correct: 1,
            hint: "Nama sekolah ini diambil dari mitologi Norse"
        },
        {
            question: "Sekolah mana yang mengelola sistem kereta api di Kivotos?",
            answers: ["Wildhunt", "Highlander", "SRT", "Shanhaijing"],
            correct: 1,
            hint: "Nama sekolah ini berkaitan dengan ketinggian"
        },
        {
            question: "Unit taktis khusus yang menangani misi berisiko tinggi adalah?",
            answers: ["Arius", "Valkyrie", "SRT", "Red Winter"],
            correct: 2,
            hint: "Singkatan 3 huruf"
        },
        {
            question: "Kelompok misterius yang beroperasi di balik bayangan adalah?",
            answers: ["Arius", "Highlander", "Wildhunt", "Collab"],
            correct: 0,
            hint: "Nama kelompok ini diambil dari istilah theologi"
        }
    ],
    lore: [
        {
            question: "Apa nama kota di mana Blue Archive berlangsung?",
            answers: ["Kivotos", "Tokyo", "Metropolis", "Academy City"],
            correct: 0,
            hint: "Nama ini berasal dari bahasa Yunani"
        },
        {
            question: "Apa peran pemain dalam cerita Blue Archive?",
            answers: ["Principal", "Sensei", "Commander", "Master"],
            correct: 1,
            hint: "Istilah Jepang untuk 'guru'"
        },
        {
            question: "Organisasi apa yang dipimpin oleh Sensei?",
            answers: ["SCHALE", "GEHENNA", "TRINITY", "GSC"],
            correct: 0,
            hint: "Akronim 6 huruf"
        },
        {
            question: "Apa yang membuat karakter Blue Archive unik?",
            answers: ["Halo di kepala", "Wings", "Tail", "Horn"],
            correct: 0,
            hint: "Simbol yang melayang di atas kepala"
        },
        {
            question: "Siapa developer game Blue Archive?",
            answers: ["Yostar", "Nexon", "Cygames", "miHoYo"],
            correct: 1,
            hint: "Developer Korea yang terkenal"
        },
        {
            question: "Event besar pertama yang mengancam Kivotos adalah?",
            answers: ["Eden Treaty", "Gematria", "Red Winter Incident", "Abydos Crisis"],
            correct: 0,
            hint: "Berkaitan dengan organisasi misterius"
        },
        {
            question: "Apa nama robot besar yang sering muncul sebagai boss?",
            answers: ["Binah", "Chesed", "Hieronymus", "Perorodzilla"],
            correct: 3,
            hint: "Namanya menggabungkan 'Pero' dengan monster terkenal"
        },
        {
            question: "Siapa karakter yang menjadi ikon/maskot Blue Archive?",
            answers: ["Hoshino", "Shiroko", "Aru", "Yuuka"],
            correct: 1,
            hint: "Karakter dengan helm serigala dari Abydos"
        },
        {
            question: "Apa nama sistem combat di Blue Archive?",
            answers: ["Real-time Strategy", "Turn-based", "Auto-battle", "Tactical RPG"],
            correct: 2,
            hint: "Sistem yang memungkinkan pertempuran berjalan sendiri"
        },
        {
            question: "Berapa jumlah total sekolah utama di Kivotos?",
            answers: ["10", "13", "15", "20"],
            correct: 1,
            hint: "Angka sial di budaya Barat"
        }
    ]
};

// ===== GAME STATE =====
let currentMode = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let skippedCount = 0;
let timer = null;
let timeLeft = 30;
let hintUsed = false;
let gameStats = {
    totalPlayed: 0,
    highestScore: 0,
    badges: []
};

// ===== ADMIN CONFIG =====
const ADMIN_KEY = "RESET-2026"; // ganti sesuai keinginan

// Load saved stats
if (localStorage.getItem('blueArchiveQuizStats')) {
    gameStats = JSON.parse(localStorage.getItem('blueArchiveQuizStats'));
}

// ===== UTILITY FUNCTIONS =====
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function showFeedback(icon, text, duration = 1500) {
    const overlay = document.getElementById('feedbackOverlay');
    const iconEl = document.getElementById('feedbackIcon');
    const textEl = document.getElementById('feedbackText');

    iconEl.textContent = icon;
    textEl.textContent = text;
    overlay.classList.add('show');

    setTimeout(() => {
        overlay.classList.remove('show');
    }, duration);
}

function updateStats() {
    document.getElementById('totalPlayed').textContent = gameStats.totalPlayed;
    document.getElementById('highestScore').textContent = gameStats.highestScore;
    document.getElementById('totalBadges').textContent = gameStats.badges.length;
}

function saveStats() {
    localStorage.setItem('blueArchiveQuizStats', JSON.stringify(gameStats));
}

function resetAllData() {
    localStorage.removeItem('blueArchiveQuizStats');

    gameStats = {
        totalPlayed: 0,
        highestScore: 0,
        badges: []
    };

    updateStats();
    showFeedback('🗑️', 'All data reset', 1500);
}

function adminReset() {
    const key = prompt("Masukkan admin key:");

    if (key === ADMIN_KEY) {
        resetAllData();
    } else {
        alert("Akses ditolak");
    }
}


// ===== QUIZ FUNCTIONS =====
function startQuiz(mode) {
    currentMode = mode;
    currentQuestionIndex = 0;
    score = 0;
    correctCount = 0;
    wrongCount = 0;
    skippedCount = 0;

    // Prepare questions based on mode
    if (mode === 'mixed') {
        // Mix all questions
        const allQuestions = [
            ...quizData.character,
            ...quizData.school,
            ...quizData.lore
        ];
        currentQuestions = shuffleArray(allQuestions).slice(0, 10);
    } else {
        // Select 10 random questions from specific category
        currentQuestions = shuffleArray(quizData[mode]).slice(0, 10);
    }

    showScreen('quizScreen');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endQuiz();
        return;
    }

    const question = currentQuestions[currentQuestionIndex];
    hintUsed = false;

    // Update progress
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = currentQuestions.length;
    document.getElementById('currentScore').textContent = score;

    // Update question
    document.getElementById('questionType').textContent = getQuestionType(question);
    document.getElementById('questionText').textContent = question.question;

    // Hide hint initially
    document.getElementById('hintSection').style.display = question.hint ? 'block' : 'none';
    document.getElementById('hintText').style.display = 'none';
    const hintBtn = document.querySelector('.hint-btn');
    if (hintBtn) {
        hintBtn.disabled = false;
        hintBtn.textContent = '💡 Use Hint (-10 points)';
    }

    // Load answers
    loadAnswers(question);

    // Start timer
    startTimer();
}

function getQuestionType(question) {
    if (quizData.character.includes(question)) return '👥 CHARACTER';
    if (quizData.school.includes(question)) return '🏫 SCHOOL';
    if (quizData.lore.includes(question)) return '📖 LORE';
    return '🎲 MIXED';
}

function loadAnswers(question) {
    const grid = document.getElementById('answersGrid');
    grid.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;
        btn.onclick = () => selectAnswer(index);
        grid.appendChild(btn);
    });
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 5) {
            document.querySelector('.timer-display').classList.add('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            skipQuestion();
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timerText').textContent = timeLeft;
    if (timeLeft > 5) {
        document.querySelector('.timer-display').classList.remove('warning');
    }
}

function showHint() {
    if (hintUsed) return;

    const question = currentQuestions[currentQuestionIndex];
    document.getElementById('hintText').textContent = '💡 ' + question.hint;
    document.getElementById('hintText').style.display = 'block';

    const hintBtn = document.querySelector('.hint-btn');
    hintBtn.disabled = true;
    hintBtn.textContent = '💡 Hint Used';

    score = Math.max(0, score - 10);
    document.getElementById('currentScore').textContent = score;
    hintUsed = true;

    showFeedback('💡', '-10 Points', 1000);
}

function selectAnswer(index) {
    clearInterval(timer);

    const question = currentQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.answer-btn');

    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);

    if (index === question.correct) {
        // Correct answer
        buttons[index].classList.add('correct');
        const points = timeLeft * 2 + (hintUsed ? 0 : 10);
        score += points;
        correctCount++;

        showFeedback('✅', `+${points} Points!`, 1000);
    } else {
        // Wrong answer
        buttons[index].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        wrongCount++;

        showFeedback('❌', 'Wrong Answer!', 1000);
    }

    document.getElementById('currentScore').textContent = score;

    // Next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
}

function skipQuestion() {
    clearInterval(timer);
    skippedCount++;

    showFeedback('⏭️', 'Question Skipped', 1000);

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

function endQuiz() {
    clearInterval(timer);

    // Update stats
    gameStats.totalPlayed++;
    if (score > gameStats.highestScore) {
        gameStats.highestScore = score;
    }

    // Check for new badges
    const newBadges = checkBadges();

    // Show results
    showScreen('resultScreen');
    displayResults(newBadges);

    saveStats();
}

function displayResults(newBadges) {
    // Badge and title
    const badge = document.getElementById('resultBadge');
    const badgeTitle = document.getElementById('badgeTitle');

    if (score >= 180) {
        badge.style.background = 'linear-gradient(135deg, #ffd700, #ffed4e)';
        badgeTitle.textContent = 'MASTER SENSEI';
    } else if (score >= 150) {
        badge.style.background = 'linear-gradient(135deg, #c0c0c0, #e8e8e8)';
        badgeTitle.textContent = 'EXPERT SENSEI';
    } else if (score >= 100) {
        badge.style.background = 'linear-gradient(135deg, #cd7f32, #ffa500)';
        badgeTitle.textContent = 'SKILLED SENSEI';
    } else {
        badge.style.background = 'linear-gradient(135deg, #06b6d4, #ec4899)';
        badgeTitle.textContent = 'NOVICE SENSEI';
    }

    // Score and stats
    document.getElementById('finalScore').textContent = score;
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('wrongAnswers').textContent = wrongCount;
    document.getElementById('skippedAnswers').textContent = skippedCount;

    // Accuracy
    const accuracy = Math.round((correctCount / currentQuestions.length) * 100);
    document.getElementById('accuracyFill').style.width = accuracy + '%';
    document.getElementById('accuracyPercent').textContent = accuracy + '%';

    // New badges
    if (newBadges.length > 0) {
        document.getElementById('badgesEarned').style.display = 'block';
        const badgesList = document.getElementById('badgesList');
        badgesList.innerHTML = '';

        newBadges.forEach(badge => {
            const badgeEl = document.createElement('div');
            badgeEl.className = 'badge-item';
            badgeEl.innerHTML = `
                <div>${badge.icon}</div>
                <div style="font-size: 10px; margin-top: 5px;">${badge.name}</div>
            `;
            badgesList.appendChild(badgeEl);
        });
    } else {
        document.getElementById('badgesEarned').style.display = 'none';
    }
}

function checkBadges() {
    const newBadges = [];

    const badges = [
        { id: 'first_quiz', name: 'First Quiz', icon: '🎓', condition: () => gameStats.totalPlayed === 1 },
        { id: 'perfect_score', name: 'Perfect!', icon: '💯', condition: () => correctCount === currentQuestions.length },
        { id: 'speed_demon', name: 'Speed Demon', icon: '⚡', condition: () => score >= 200 },
        { id: 'persistence', name: 'Persistent', icon: '🏃', condition: () => gameStats.totalPlayed >= 10 },
        { id: 'high_score', name: 'High Scorer', icon: '🏆', condition: () => score >= 150 },
        { id: 'character_expert', name: 'Character Expert', icon: '👥', condition: () => currentMode === 'character' && correctCount >= 8 },
        { id: 'school_expert', name: 'School Expert', icon: '🏫', condition: () => currentMode === 'school' && correctCount >= 8 },
        { id: 'lore_master', name: 'Lore Master', icon: '📖', condition: () => currentMode === 'lore' && correctCount >= 8 }
    ];

    badges.forEach(badge => {
        if (badge.condition() && !gameStats.badges.includes(badge.id)) {
            gameStats.badges.push(badge.id);
            newBadges.push(badge);
        }
    });

    return newBadges;
}

function restartQuiz() {
    startQuiz(currentMode);
}

function goHome() {
    showScreen('welcomeScreen');
    updateStats();
}

function shareScore(platform) {
    const text = `saya menang ${score} points di Blue Archive non official Quiz! mantap`;
    {
        navigator.clipboard.writeText(text).then(() => {
            showFeedback('📋', 'Link Copied!', 1500);
        });
    }
}

function showLeaderboard() {
    showScreen('leaderboardScreen');
    filterLeaderboard('all');
}

function filterLeaderboard(filter) {
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Get leaderboard data (simulate for now)
    const leaderboardData = generateLeaderboard(filter);

    const list = document.getElementById('leaderboardList');
    list.innerHTML = '';

    leaderboardData.forEach((entry, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';

        let rankClass = '';
        if (index === 0) rankClass = 'gold';
        else if (index === 1) rankClass = 'silver';
        else if (index === 2) rankClass = 'bronze';

        item.innerHTML = `
            <div class="rank-badge ${rankClass}">${index + 1}</div>
            <div class="player-info">
                <div class="player-name">${entry.name}</div>
                <div class="player-details">${entry.mode} • ${entry.accuracy}% accuracy</div>
            </div>
            <div class="player-score">${entry.score}</div>
        `;

        list.appendChild(item);
    });
}

function generateLeaderboard(filter) {
    // Simulate leaderboard data
    const names = ['Shiroko Fan', 'Hina Simp', 'Sensei Pro', 'Yuuka Enjoyer', 'Mika Devotee', 'Aru Believer', 'Azusa Lover', 'Koharu Friend'];
    const modes = ['Character', 'School', 'Lore', 'Mixed'];

    const data = [];
    for (let i = 0; i < 8; i++) {
        data.push({
            name: names[i],
            score: 200 - (i * 15) - Math.floor(Math.random() * 10),
            mode: modes[Math.floor(Math.random() * modes.length)],
            accuracy: 100 - (i * 5) - Math.floor(Math.random() * 5)
        });
    }

    // Add current player if high score
    if (gameStats.highestScore > 0) {
        data.push({
            name: 'You',
            score: gameStats.highestScore,
            mode: 'Best',
            accuracy: Math.floor(Math.random() * 20 + 80)
        });
    }

    return data.sort((a, b) => b.score - a.score).slice(0, 10);
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    updateStats();

    // ===== ADMIN MODE VIA TAP LOGO 5x =====
    let tapCount = 0;
    let tapTimer = null;

    const logo = document.querySelector('.brand');

    if (logo) {
        logo.addEventListener('click', () => {
            tapCount++;

            clearTimeout(tapTimer);
            tapTimer = setTimeout(() => {
                tapCount = 0;
            }, 2000);

            if (tapCount === 5) {
                const btn = document.getElementById('adminResetBtn');
                if (btn) {
                    btn.style.display = 'block';
                    alert("Admin mode aktif");
                }
                tapCount = 0;
            }
        });
    }
});
