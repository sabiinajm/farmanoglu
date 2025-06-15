"use strict";
let lang = localStorage.getItem('lang') || 'ru';
function applyTranslations(lang) {
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
function switchLang(newLang) {
    lang = newLang;
    localStorage.setItem('lang', lang);
    applyTranslations(lang);
    renderGallery(currentSection || 'kitchen', isHomePage ? 3 : undefined);
}
applyTranslations(lang);
const langSelect = document.getElementById("language-select");
if (langSelect) {
    langSelect.value = lang;
    langSelect.addEventListener("change", () => {
        switchLang(langSelect.value);
    });
}
const menuIcon = document.getElementById('menuIcon');
const menu = document.getElementById('menu');
if (menuIcon && menu) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        if (window.innerWidth < 1000) {
            menu.style.transform = menuIcon.classList.contains('active') ? 'translateX(0%)' : 'translateX(-100%)';
        }
    });
}
const openBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('popupModal');
const closeBtn = document.getElementById('closeModalBtn');
if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    window.addEventListener('click', (e) => {
        if (e.target === modal)
            modal.classList.add('hidden');
    });
}
['design', 'constr', 'proiz', 'montaj'].forEach((id) => {
    const text = document.getElementById(`${id}-text`);
    const image = document.getElementById(`${id}-image`);
    if (text && image) {
        text.addEventListener('mouseenter', () => image.classList.add('show'));
        text.addEventListener('mouseleave', () => image.classList.remove('show'));
    }
});
const galleryData = {
    kitchen: [
        { img: '/images/kitchen1.jpg',
            headings: {
                az: 'Bəyaz mdf-boya mətbəx',
                ru: 'Белая кухня с краской-mdf',
            },
        },
        { img: '/images/kitchen2.jpg',
            headings: {
                az: 'Qulpsuz modern mətbəx',
                ru: 'Современная кухня без ручек',
            },
        },
        { img: '/images/kitchen3.jpg',
            headings: {
                az: 'Adalı mətbəx mebeli',
                ru: 'Кухонная мебель с островом',
            },
        },
        { img: '/images/kitchen4.jpg',
            headings: {
                az: 'Mdf-boya mətbəx mebeli',
                ru: 'Кухонная мебель с краской MDF',
            },
        },
        { img: '/images/kitchen5.jpg',
            headings: {
                az: 'Mətbəx mebeli və bar',
                ru: 'Кухонная мебель и бар',
            },
        },
        { img: '/images/kitchen6.jpg',
            headings: {
                az: 'Gözəl mənzərəli yerdə quraşdırdığımız mətbəx mebeli',
                ru: 'Кухонная мебель, установленная в месте с прекрасным видом',
            },
        },
        { img: '/images/kitchen7.jpg',
            headings: {
                az: 'Bəyaz mdf-boya mətbəx',
                ru: 'Белая кухня с краской-mdf',
            },
        },
        { img: '/images/kitchen8.jpg',
            headings: {
                az: 'Mətbəx 8',
                ru: 'Кухня 8',
            },
        },
    ],
    wardrobes: [
        { img: '/images/wardrobe1.jpg',
            headings: {
                az: 'Dəhliz üçün istehsal etdiyimiz dolab',
                ru: 'Шкаф, изготовленный для прихожей',
            },
        },
        { img: '/images/wardrobe2.jpg',
            headings: {
                az: '',
                ru: '',
            },
        },
        { img: '/images/wardrobe3.jpg',
            headings: {
                az: '',
                ru: '',
            },
        },
        { img: '/images/wardrobe4.jpg',
            headings: {
                az: '',
                ru: '',
            },
        },
        { img: '/images/wardrobe6.jpg',
            headings: {
                az: '',
                ru: '',
            },
        },
        { img: '/images/wardrobe7.jpg',
            headings: {
                az: 'TV / Kamin stendi',
                ru: 'ТВ и каминная стойка',
            },
        },
        { img: '/images/wardrobe8.jpg',
            headings: {
                az: '',
                ru: '',
            },
        },
        { img: '/images/wardrobe9.jpg',
            headings: {
                az: '',
                ru: '',
            },
        },
        { img: '/images/wardrobe10.jpg',
            headings: {
                az: 'Yazı masası',
                ru: 'Письменный стол',
            },
        },
        { img: '/images/wardrobe11.jpg',
            headings: {
                az: 'Böyük dolab',
                ru: 'Большой шкаф',
            },
        },
        { img: '/images/wardrobe12.jpg',
            headings: {
                az: 'Böyük dolab-qarderob',
                ru: 'Большой шкаф-гардероб',
            },
        },
    ],
    closets: [
        { img: '/images/closet1.jpg',
            headings: {
                az: 'Temper şüşə profilli qarderob otağı',
                ru: 'Гардеробная с профилем из закалённого стекла',
            },
        },
        { img: '/images/closet2.jpg',
            headings: {
                az: 'Qarderob dolabı',
                ru: 'Шкаф-гардероб',
            },
        },
    ],
    bathroom: [
        { img: '/images/bathroom1.jpg',
            headings: {
                az: 'Hamam mebeli – moydadır',
                ru: 'Мебель для ванной – раковина',
            },
        },
        { img: '/images/bathroom2.jpg',
            headings: {
                az: 'Moydadır - tumba',
                ru: 'Раковина - тумба',
            },
        },
    ],
    bedroom: [
        { img: '/images/bedroom1.jpg',
            headings: {
                az: 'Yataq dəsti',
                ru: 'Спальный комплект',
            },
        },
        { img: '/images/bedroom2.jpg',
            headings: {
                az: 'Uşaq otağı dəsti',
                ru: 'Детский комплект мебели',
            },
        },
        { img: '/images/bedroom3.jpg',
            headings: {
                az: 'Mətbəx 8',
                ru: 'Кухня 8',
            },
        },
        { img: '/images/bedroom4.jpg',
            headings: {
                az: 'Yataq dəsti',
                ru: 'Спальный комплект',
            },
        },
        { img: '/images/bedroom5.jpg',
            headings: {
                az: 'Mətbəx 8',
                ru: 'Кухня 8',
            },
        },
    ],
    other: [
        { img: '/images/other1.jpg',
            headings: {
                az: 'Yazı masası + kitab rəfi',
                ru: 'Письменный стол + книжная полка',
            },
        },
        { img: '/images/other2.jpg',
            headings: {
                az: 'Trumo-güzgü',
                ru: 'Трюмо-зеркало',
            },
        },
        { img: '/images/other3.jpg',
            headings: {
                az: 'Mətbəx',
                ru: 'Кухня',
            },
        },
        { img: '/images/other4.jpg',
            headings: {
                az: 'Qonaq dəsti masası',
                ru: 'Стол гостевого комплекта',
            },
        },
        { img: '/images/other5.jpg',
            headings: {
                az: 'Dolab və qapılı divar paneli',
                ru: 'Шкаф и настенная панель с дверцей',
            },
        },
        { img: '/images/other6.jpg',
            headings: {
                az: 'Mətbəx',
                ru: 'Кухня',
            },
        },
        { img: '/images/other7.jpg',
            headings: {
                az: 'Mətbəx',
                ru: 'Кухня',
            },
        },
        { img: '/images/other8.jpg',
            headings: {
                az: 'Konsollar',
                ru: 'Консоли',
            },
        },
    ],
};
function renderGallery(section, limit) {
    const gallery = document.getElementById('gallery');
    if (!gallery)
        return;
    gallery.innerHTML = '';
    let items = galleryData[section] || [];
    if (limit !== undefined) {
        items = items.slice(0, limit);
    }
    items.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('gallery-imgs');
        const heading = item.headings[lang];
        div.innerHTML = `
      <img src="${item.img}" alt="">
      <div class="container">
        <div class="shadow2"></div>
        <div class="shadow2 hover-gradient"></div>
      </div>
      <div class="eye">
       <span class="eye-text" data-i18n="detailed"></span>
       <div class="eye-box">
        <i class="fa-regular fa-eye"></i>
       </div>
      </div>
      <h3>${heading}</h3>
    `;
        gallery.appendChild(div);
    });
}
const galleryMenu = document.getElementById('furnitureMenu');
if (galleryMenu) {
    galleryMenu.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName.toLowerCase() === 'li' && target.dataset.section) {
            galleryMenu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            target.classList.add('active');
            renderGallery(target.dataset.section, 3);
            currentSection = target.dataset.section;
            applyTranslations(lang);
        }
    });
}
const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
const params = new URLSearchParams(window.location.search);
const section = params.get('section') || 'kitchen';
if (isHomePage) {
    renderGallery(section, 3);
}
else {
    renderGallery(section);
}
const menuList = document.querySelector('.menu-list');
if (menuList) {
    const links = menuList.querySelectorAll('a');
    const currentPath = window.location.pathname + window.location.search;
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href)) {
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
    menuList.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName.toLowerCase() === 'a') {
            links.forEach(link => link.classList.remove('active'));
            target.classList.add('active');
        }
    });
}
const moreLink = document.getElementById('moreLink');
let currentSection = 'kitchen';
if (moreLink) {
    moreLink.addEventListener('click', () => {
        window.location.href = `/pages/gallery.html?section=${currentSection}`;
    });
}
