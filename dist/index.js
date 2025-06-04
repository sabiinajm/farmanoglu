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

// ux
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


const galleryMenu = document.getElementById('furnitureMenu');
const gallery = document.getElementById('gallery');

const galleryData = {
  all: [
    { img: '/images/gallery1.png', captionKey: 'gallery-1' },
    { img: '/images/gallery2.png', captionKey: 'gallery-2' },
    { img: '/images/gallery3.png', captionKey: 'gallery-3' },
  ],
  kitchen: [
    { img: '/images/kitchen1.png', captionKey: 'kitchen-1' },
    { img: '/images/kitchen2.png', captionKey: 'kitchen-2' },
  ],
  wardrobes: [
    { img: '/images/wardrobe1.png', captionKey: 'wardrobe-1' },
    { img: '/images/wardrobe2.png', captionKey: 'wardrobe-2' },
  ],
  closets: [
    { img: '/images/closet1.png', captionKey: 'closet-1' },
  ],
};

function renderGallery(section) {
  gallery.innerHTML = '';

  const items = galleryData[section] || [];
  
  items.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('gallery-imgs');
    div.innerHTML = `
      <img src="${item.img}" alt="">
      <div class="container">
        <div class="shadow2"></div>
        <div class="shadow2 hover-gradient"></div>
      </div>
      <div class="eye">
        <i class="fa-regular fa-eye"></i>
      </div>
      <h3 data-i18n="${item.captionKey}"></h3>
    `;
    gallery.appendChild(div);
  });

  fetchTranslations(lang); 
}
const listItems = document.getElementsByClassName("listItem")
console.log(listItems)

galleryMenu.addEventListener('click', (e) => {
  const clickedLi = e.target.closest('li');
  if (clickedLi && galleryMenu.contains(clickedLi)) {
    if (!clickedLi.classList.contains('active')) {
      Array.from(listItems).forEach(li => li.classList.remove('active'));
      clickedLi.classList.add('active');
      const section = clickedLi.getAttribute('data-section');
      renderGallery(section);
    }
  }
});
renderGallery('all');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();  // Prevent default jump

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
