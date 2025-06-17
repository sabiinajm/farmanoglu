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
        if (window.innerWidth < 1050) {
            menu.style.transform = menuIcon.classList.contains('active') ? 'translateX(0%)' : 'translateX(-100%)';
        }
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
const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
const params = new URLSearchParams(window.location.search);
const section = params.get('section');
let galleryData;
fetch('data/galleryData.json')
    .then(res => res.json())
    .then((data) => {
    galleryData = data;
    if (isHomePage) {
        renderGallery(section, 3);
    }
    else {
        renderGallery(section);
    }
    applyTranslations(lang);
})
    .catch((err) => {
    console.error('Failed to load gallery data:', err);
});
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
   <a href="/${heading}">
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
      </a>
    `;
        gallery.appendChild(div);
    });
    applyTranslations(lang);
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
console.log("Hello from updated TS code");
