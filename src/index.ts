const lang = (localStorage.getItem('lang') as 'az' | 'ru') || 'ru';

function fetchTranslations(lang: 'ru' | 'az') {
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
          const part2Element = el.querySelector('.highlight') as HTMLElement;
          if (part2Element) {
            part2Element.style.opacity = '.7'; 
            part2Element.style.paddingLeft = '3rem'
          }
        }
      });
      document.documentElement.lang = lang;
    });
}

fetchTranslations(lang);

function switchLang(lang: 'ru' | 'az') {
  localStorage.setItem('lang', lang);
  fetchTranslations(lang);
}

const langSelect = document.getElementById("language-select") as HTMLSelectElement;

if (langSelect) {
  langSelect.value = lang;
  langSelect.addEventListener("change", () => {
    switchLang(langSelect.value as 'ru' | 'az');
  });
}

(window as any).switchLang = switchLang;

const menuIcon = document.getElementById('menuIcon');
const menu = document.getElementById('menu');

if (menuIcon && menu) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');

    if (window.innerWidth < 1000) {
      if (menuIcon.classList.contains('active')) {
        menu.style.transform = 'translateX(0%)';
      } else {
        menu.style.transform = 'translateX(-100%)';
      }
    }
  });
}

const openBtn = document.getElementById('openModalBtn')!;
const modal = document.getElementById('popupModal')!;
const closeBtn = document.getElementById('closeModalBtn')!;

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

const ids = ['design', 'constr', 'proiz', 'montaj'];

ids.forEach((id) => {
  const text = document.getElementById(`${id}-text`);
  const image = document.getElementById(`${id}-image`);

  if (text && image) {
    text.addEventListener('mouseenter', () => {
      image.classList.add('show');
    });

    text.addEventListener('mouseleave', () => {
      image.classList.remove('show');
    });
  }
});

type GalleryItem = {
  img: string;
  captionKey: string;
};

type GalleryData = {
  [key: string]: GalleryItem[];
};


const galleryMenu = document.getElementById('furnitureMenu') as HTMLElement | null;
const gallery = document.getElementById('gallery') as HTMLElement | null;

const galleryData: GalleryData = {
  all: [
    { img: '/images/gallery1.jpg', captionKey: 'gallery-1' },
    { img: '/images/gallery2.jpg', captionKey: 'gallery-2' },
    { img: '/images/gallery3.jpg', captionKey: 'gallery-3' },
  ],
  kitchen: [
    { img: '/images/kitchen1.jpg', captionKey: 'kitchen-1' },
    { img: '/images/kitchen2.jpg', captionKey: 'kitchen-2' },
    { img: '/images/kitchen3.jpg', captionKey: 'kitchen-3' },
  ],
  wardrobes: [
    { img: '/images/wardrobe1.jpg', captionKey: 'wardrobe-1' },
    { img: '/images/wardrobe2.jpg', captionKey: 'wardrobe-2' },
    { img: '/images/wardrobe3.jpg', captionKey: 'wardrobe-3' },
  ],
  closets: [
    { img: '/images/closet1.jpg', captionKey: 'closet-1' },
  ],
};


function renderGallery(section: string): void {
  if (!gallery) return;
  gallery.innerHTML = '';

  const items = galleryData[section] || [];

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
        <i class="fa-regular fa-eye"></i>
      </div>
      <h3 data-i18n="${item.captionKey}"></h3>
    `;
    gallery.appendChild(div);
  });

  fetchTranslations(lang);
}

if (galleryMenu) {
  galleryMenu.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;

    if (target.tagName.toLowerCase() === 'li') {
      const allItems = galleryMenu.querySelectorAll('li');
      allItems.forEach((li) => li.classList.remove('active'));
      target.classList.add('active');

      const section = target.getAttribute('data-section');
      if (section) {
        renderGallery(section);
      }
    }
  });
}

renderGallery('all');

