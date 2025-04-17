"use strict";
const lang = localStorage.getItem('lang') || 'ru';
function fetchTranslations(lang) {
    fetch(`/lang/${lang}.json`)
        .then(res => res.json())
        .then(translations => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translations[key]) {
                el.textContent = translations[key];
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
                menu.style.transform = 'translateX(0%)'; // Show menu
            }
            else {
                menu.style.transform = 'translateX(-100%)'; // Hide menu
            }
        }
    });
}
