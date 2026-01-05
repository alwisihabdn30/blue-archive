// ===== WISHLIST SYSTEM =====
// Blue Archive Favorite Characters System

const WishlistSystem = {
    storageKey: 'blueArchiveFavorites',

    // Get all favorites from localStorage
    getFavorites() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    },

    // Save favorites to localStorage
    saveFavorites(favorites) {
        localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    },

    // Add to favorites
    addFavorite(character) {
        const favorites = this.getFavorites();

        // Check if already exists
        const exists = favorites.some(fav =>
            fav.name === character.name && fav.school === character.school
        );

        if (!exists) {
            character.addedDate = new Date().toISOString();
            favorites.push(character);
            this.saveFavorites(favorites);
            return true;
        }
        return false;
    },

    // Remove from favorites
    removeFavorite(name, school) {
        let favorites = this.getFavorites();
        favorites = favorites.filter(fav =>
            !(fav.name === name && fav.school === school)
        );
        this.saveFavorites(favorites);
    },

    // Check if character is favorite
    isFavorite(name, school) {
        const favorites = this.getFavorites();
        return favorites.some(fav =>
            fav.name === name && fav.school === school
        );
    },

    // Clear all favorites
    clearAll() {
        if (confirm('Apakah Anda yakin ingin menghapus semua favorit?')) {
            localStorage.removeItem(this.storageKey);
            return true;
        }
        return false;
    },

    // Export favorites as JSON
    exportFavorites() {
        const favorites = this.getFavorites();
        const dataStr = JSON.stringify(favorites, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `blue-archive-favorites-${Date.now()}.json`;
        link.click();

        URL.revokeObjectURL(url);
    }
};

// ===== MY FAVORITES PAGE =====
if (window.location.pathname.includes('my-favorites.html')) {
    document.addEventListener('DOMContentLoaded', function () {
        const favoritesGrid = document.getElementById('favoritesGrid');
        const emptyState = document.getElementById('emptyState');
        const totalFavoritesEl = document.getElementById('totalFavorites');
        const totalSchoolsEl = document.getElementById('totalSchools');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const exportBtn = document.getElementById('exportBtn');
        const clearAllBtn = document.getElementById('clearAllBtn');

        let currentFilter = 'all';

        // Render favorites
        function renderFavorites() {
            const favorites = WishlistSystem.getFavorites();

            if (favorites.length === 0) {
                favoritesGrid.style.display = 'none';
                emptyState.classList.add('show');
                totalFavoritesEl.textContent = '0';
                totalSchoolsEl.textContent = '0';
                return;
            }

            favoritesGrid.style.display = 'grid';
            emptyState.classList.remove('show');

            // Update stats
            totalFavoritesEl.textContent = favorites.length;
            const uniqueSchools = [...new Set(favorites.map(f => f.school))];
            totalSchoolsEl.textContent = uniqueSchools.length;

            // Filter favorites
            const filtered = currentFilter === 'all'
                ? favorites
                : favorites.filter(f => f.school === currentFilter);

            // Render cards
            favoritesGrid.innerHTML = filtered.map(char => `
                <div class="favorite-card" data-school="${char.school}">
                    <img src="${char.image || 'gambar/placeholder.jpg'}" 
                         alt="${char.name}" 
                         class="favorite-card-image"
                         onerror="this.src='gambar/placeholder.jpg'">
                    <div class="favorite-card-content">
                        <div class="favorite-card-header">
                            <div>
                                <div class="favorite-card-name">${char.name}</div>
                                <span class="favorite-card-school">${char.school}</span>
                            </div>
                            <button class="remove-favorite-btn" 
                                    data-name="${char.name}" 
                                    data-school="${char.school}">
                                ❌
                            </button>
                        </div>
                        
                        <div class="favorite-card-info">
                            <div class="info-row">
                                <span class="info-label">Role:</span>
                                <span class="info-value">${char.role || 'N/A'}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Damage Type:</span>
                                <span class="info-value">${char.damageType || 'N/A'}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Combat Class:</span>
                                <span class="info-value">${char.combatClass || 'N/A'}</span>
                            </div>
                        </div>
                        
                        <div class="favorite-card-footer">
                            <a href="${char.schoolPage || '#'}" class="view-detail-btn">
                                View Details →
                            </a>
                            <span class="added-date">
                                ${formatDate(char.addedDate)}
                            </span>
                        </div>
                    </div>
                </div>
            `).join('');

            // Add remove listeners
            document.querySelectorAll('.remove-favorite-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const name = this.dataset.name;
                    const school = this.dataset.school;
                    WishlistSystem.removeFavorite(name, school);
                    renderFavorites();
                });
            });
        }

        // Format date
        function formatDate(dateStr) {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        }

        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                renderFavorites();
            });
        });

        // Export button
        exportBtn.addEventListener('click', function () {
            WishlistSystem.exportFavorites();
        });

        // Clear all button
        clearAllBtn.addEventListener('click', function () {
            if (WishlistSystem.clearAll()) {
                renderFavorites();
            }
        });

        // Initial render
        renderFavorites();
    });
}

// ===== ADD HEART BUTTONS TO SCHOOL PAGES =====
document.addEventListener('DOMContentLoaded', function () {
    // Only run on school pages
    const isSchoolPage = window.location.pathname.includes('school-') ||
        window.location.pathname.includes('abydos-high-school');

    if (!isSchoolPage) return;

    const studentCards = document.querySelectorAll('.student-card');

    studentCards.forEach(card => {
        const header = card.querySelector('.student-header');
        const name = header.querySelector('h2').textContent.trim();

        // Get school name from page title or header
        const schoolTitle = document.querySelector('.school-title');
        const school = schoolTitle ? schoolTitle.textContent.trim() : 'Unknown';

        // Get character info
        const infoTable = card.querySelector('.info-table');
        let role = 'N/A';
        let damageType = 'N/A';
        let combatClass = 'N/A';

        if (infoTable) {
            const rows = infoTable.querySelectorAll('tr');
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length === 2) {
                    const label = cells[0].textContent.trim();
                    const value = cells[1].textContent.trim();

                    if (label === 'Role') role = value;
                    if (label === 'Damage Type' || label === 'Attack Type') damageType = value;
                    if (label === 'Combat Class') combatClass = value;
                }
            });
        }

        // Get image
        const profileTab = card.querySelector('[data-content="profile"]');
        const image = profileTab ? profileTab.querySelector('img')?.src : '';

        // Create heart button
        const heartBtn = document.createElement('button');
        heartBtn.className = 'favorite-heart-btn';
        heartBtn.innerHTML = WishlistSystem.isFavorite(name, school) ? '❤️' : '🤍';

        if (WishlistSystem.isFavorite(name, school)) {
            heartBtn.classList.add('active');
        }

        heartBtn.addEventListener('click', function (e) {
            e.stopPropagation();

            const character = {
                name,
                school,
                role,
                damageType,
                combatClass,
                image,
                schoolPage: window.location.pathname
            };

            if (WishlistSystem.isFavorite(name, school)) {
                WishlistSystem.removeFavorite(name, school);
                this.innerHTML = '🤍';
                this.classList.remove('active');
            } else {
                WishlistSystem.addFavorite(character);
                this.innerHTML = '❤️';
                this.classList.add('active');

                // Show notification
                showNotification(`${name} ditambahkan ke favorit!`);
            }
        });

        // Add to card
        card.style.position = 'relative';
        card.insertBefore(heartBtn, card.firstChild);
    });
});

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #06b6d4, #3b82f6);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);