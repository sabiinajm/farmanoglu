const lang = (localStorage.getItem('lang') as 'az' | 'ru') || 'ru'; // Cast the string to 'az' | 'ru'

// Fetch translations and update the content
function fetchTranslations(lang: 'ru' | 'az') {
  fetch(`/lang/${lang}.json`)
    .then(res => res.json())
    .then(translations => {
      document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n!;
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
function switchLang(lang: 'ru' | 'az') {
  localStorage.setItem('lang', lang); // Save selected language in localStorage
  fetchTranslations(lang); // Fetch and update translations
}

// Add event listener for the <select> dropdown
const langSelect = document.getElementById("language-select") as HTMLSelectElement;

if (langSelect) {
  langSelect.value = lang; // preselect saved language
  langSelect.addEventListener("change", () => {
    switchLang(langSelect.value as 'ru' | 'az'); // Switch language on selection change
  });
}

(window as any).switchLang = switchLang;

const menuIcon = document.getElementById('menuIcon');

if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
  });
}
