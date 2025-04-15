"use strict";
const lang = localStorage.getItem('lang') || 'ru'; // Cast the string to 'az' | 'ru'
// Fetch translations and update the content
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
// Initially load the selected language or default language
fetchTranslations(lang);
// Handle language change without page reload
function switchLang(lang) {
    localStorage.setItem('lang', lang); // Save selected language in localStorage
    fetchTranslations(lang); // Fetch and update translations
}
// Add event listener for the <select> dropdown
const langSelect = document.getElementById("language-select");
if (langSelect) {
    langSelect.value = lang; // preselect saved language
    langSelect.addEventListener("change", () => {
        switchLang(langSelect.value); // Switch language on selection change
    });
}
window.switchLang = switchLang;
const menuIcon = document.getElementById('menuIcon');
if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
    });
}
