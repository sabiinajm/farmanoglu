"use strict";
const lang = localStorage.getItem('lang') || 'ru';
function fetchTranslations(lang) {
    fetch(`/lang/${lang}.json`)
        .then(res => res.json())
        .then(translations => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const translation = translations[key];
            if (typeof translation === 'string') {
                el.innerHTML = translation;
            }
            else if (typeof translation === 'object' && translation !== null) {
                el.innerHTML = `${translation.part1} <div class="highlight">${translation.part2}</div>`;
                const part2Element = el.querySelector('.highlight');
                if (part2Element) {
                    part2Element.style.opacity = '.7';
                    part2Element.style.paddingLeft = '3rem';
                }
            }
        });
        document.documentElement.lang = lang;
    });
}
fetchTranslations(lang);
function switchLang(lang) {
    localStorage.setItem('lang', lang);
    fetchTranslations(lang);
}
const langSelect = document.getElementById("language-select");
if (langSelect) {
    langSelect.value = lang;
    langSelect.addEventListener("change", () => {
        switchLang(langSelect.value);
    });
}
window.switchLang = switchLang;
const menuIcon = document.getElementById('menuIcon');
const menu = document.getElementById('menu');
if (menuIcon && menu) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        if (window.innerWidth < 1000) {
            if (menuIcon.classList.contains('active')) {
                menu.style.transform = 'translateX(0%)';
            }
            else {
                menu.style.transform = 'translateX(-100%)';
            }
        }
    });
}
const openBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('popupModal');
const closeBtn = document.getElementById('closeModalBtn');
openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});
closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});
