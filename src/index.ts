// Assume `lang` is the current language from localStorage or default
const lang = (localStorage.getItem('lang') as 'az' | 'ru') || 'ru';

function fetchTranslations(lang: 'az' | 'ru'): void {
  fetch(`/lang/${lang}.json`)
    .then(res => res.json())
    .then(translations => {
      document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n!;
        const translation = translations[key];

        if (typeof translation === 'string') {
          el.innerHTML = translation;
        } else if (typeof translation === 'object' && translation !== null) {
          el.innerHTML = `${translation.part1} <div class="highlight">${translation.part2}</div>`;
          const part2Element = el.querySelector('.highlight') as HTMLElement | null;
          if (part2Element) {
            part2Element.style.opacity = '0.7';
            part2Element.style.paddingLeft = '3rem';
          }
        }
      });
      document.documentElement.lang = lang;
    });
}

function switchLang(newLang: 'az' | 'ru'): void {
  localStorage.setItem('lang', newLang);
  fetchTranslations(newLang);
}

document.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.getElementById('language-select') as HTMLSelectElement | null;
  if (!langSelect) return;

  langSelect.value = lang;

  langSelect.addEventListener('change', () => {
    const selectedLang = langSelect.value as 'az' | 'ru';
    switchLang(selectedLang);
  });

  fetchTranslations(lang);
});

  fetchTranslations(lang);

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
    if (e.target === modal) modal.classList.add('hidden');
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

interface GalleryItem {
  img: string;
  captionKey: string;
}

const galleryData: Record<string, GalleryItem[]> = {
  kitchen: [
    { img: '/images/kitchen1.jpg', captionKey: 'kitchen-1' },
    { img: '/images/kitchen2.jpg', captionKey: 'kitchen-2' },
    { img: '/images/kitchen3.jpg', captionKey: 'kitchen-3' },
    { img: '/images/kitchen4.jpg', captionKey: 'kitchen-4' },
    { img: '/images/kitchen5.jpg', captionKey: 'kitchen-5' },
    { img: '/images/kitchen6.jpg', captionKey: 'kitchen-6' },
    { img: '/images/kitchen7.jpg', captionKey: 'kitchen-7' },
  ],
  wardrobes: [
    { img: '/images/wardrobe1.jpg', captionKey: 'wardrobe-1' },
    { img: '/images/wardrobe2.jpg', captionKey: 'wardrobe-2' },
    { img: '/images/wardrobe3.jpg', captionKey: 'wardrobe-3' },
    { img: '/images/wardrobe4.jpg', captionKey: 'wardrobe-4' },
    { img: '/images/wardrobe5.jpg', captionKey: 'wardrobe-5' },
    { img: '/images/wardrobe6.jpg', captionKey: 'wardrobe-6' },
    { img: '/images/wardrobe7.jpg', captionKey: 'wardrobe-7' },
    { img: '/images/wardrobe8.jpg', captionKey: 'wardrobe-8' },
    { img: '/images/wardrobe9.jpg', captionKey: 'wardrobe-9' },
    { img: '/images/wardrobe10.jpg', captionKey: 'wardrobe-10' },
    { img: '/images/wardrobe11.jpg', captionKey: 'wardrobe-11' },
    { img: '/images/wardrobe12.jpg', captionKey: 'wardrobe-12' },
  ],
  closets: [
    { img: '/images/closet1.jpg', captionKey: 'closet-1' },
  ],
  bathroom: [
    { img: '/images/bathroom1.jpg', captionKey: 'bathroom-1' },
    { img: '/images/bathroom2.jpg', captionKey: 'bathroom-2' },
  ],
  bedroom: [
    { img: '/images/bedroom1.jpg', captionKey: 'bedroom-1' },
    { img: '/images/bedroom2.jpg', captionKey: 'bedroom-2' },
    { img: '/images/bedroom3.jpg', captionKey: 'bedroom-3' },
    { img: '/images/bedroom4.jpg', captionKey: 'bedroom-4' },
  ],
};

function renderGallery(section: string, limit?: number): void {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  gallery.innerHTML = '';

  let items = galleryData[section] || [];
  if (limit !== undefined) {
    items = items.slice(0, limit);
  }

  items.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('gallery-imgs');
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
      <h3 data-i18n="${item.captionKey}"></h3>
    `;
    gallery.appendChild(div);
  });

}

const galleryMenu = document.getElementById('furnitureMenu');
if (galleryMenu) {
  galleryMenu.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'li' && target.dataset.section) {
      galleryMenu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
      target.classList.add('active');
      renderGallery(target.dataset.section);
      currentSection = target.dataset.section;
    }
  });
}

const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
const params = new URLSearchParams(window.location.search);
const section = params.get('section') || 'kitchen';

if (isHomePage) {
  renderGallery(section, 3);
} else {
  renderGallery(section);
}


const menuList = document.querySelector('.menu-list');
if (menuList) {
  const links = menuList.querySelectorAll<HTMLAnchorElement>('a');
  const currentPath = window.location.pathname + window.location.search;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href)) {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });

  menuList.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'a') {
      links.forEach(link => link.classList.remove('active'));
      target.classList.add('active');
    }
  });
}

const furnitureMenuList = document.getElementById('furnitureMenu');
const moreLink = document.getElementById('moreLink') as HTMLAnchorElement | null;

let currentSection = 'kitchen';
if (moreLink) {
  moreLink.addEventListener('click', () => {
    window.location.href = `/pages/gallery.html?section=${currentSection}`;
  });
}
