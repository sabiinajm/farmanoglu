interface GalleryItem {
  img: {
    main: string;
    other1?: string;
    other2?: string;
    other3?: string;
  } | string;
  headings: {
    az: string;
    ru: string;
  };
}

type GalleryData2 = Record<string, GalleryItem[]>;

const params2 = new URLSearchParams(window.location.search);
const itemName = decodeURIComponent(params2.get("item") || "");
const lang2 = (localStorage.getItem("lang") as "az" | "ru") || "az";

const imgElement = document.getElementById("detail-img") as HTMLImageElement;
const prevBtn = document.querySelector(".prev") as HTMLButtonElement;
const nextBtn = document.querySelector(".next") as HTMLButtonElement;

let currentIndex = -1;
let allItems: GalleryItem[] = [];

fetch("/src/data/galleryData.json")
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
  })
  .then((data: GalleryData2) => {
    allItems = ([] as GalleryItem[]).concat(...Object.values(data));
    currentIndex = allItems.findIndex((item) =>
      Object.values(item.headings).some(
        (heading) => heading.toLowerCase() === itemName.toLowerCase()
      )
    );

    if (currentIndex === -1) {
      document.body.innerHTML = "<h2>Item not found</h2>";
      return;
    }

    renderItem(currentIndex);
  })
  .catch((err) => {
    console.error("Failed to load gallery data:", err);
    document.body.innerHTML = "<h2>Failed to load data</h2>";
  });

function renderItem(index: number) {
  imgElement.classList.remove("zoomed");
  imgElement.style.transform = "scale(1) translate(0px, 0px)";
  imgElement.style.cursor = "zoom-in";
  isZoomed = false;
  currentX = 0;
  currentY = 0;

  const item = allItems[index];
  if (!item || !imgElement) return;

  const carouselNav = document.querySelector(".carouselNav") as HTMLDivElement;
  if (!carouselNav) return;
  carouselNav.innerHTML = "";

  if (typeof item.img === "string") {
    imgElement.src = item.img;
  } else if (typeof item.img === "object" && item.img.main) {
    imgElement.src = item.img.main;

    Object.entries(item.img).forEach(([key, value]) => {
      if (key !== "main" && value) {
        const thumb = document.createElement("img");
        thumb.src = value;
        thumb.className = "thumbnail";
        thumb.style.width = "120px";
        thumb.style.height = "150px";
        thumb.style.objectFit = "cover";
        thumb.style.marginBottom = "8px";
        thumb.style.cursor = "pointer";
        thumb.addEventListener("click", () => {
          imgElement.src = value;
        });
        carouselNav.appendChild(thumb);
      }
    });
  }
}

const blurOverlay = document.querySelector(".blur") as HTMLDivElement;

let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let isZoomed = false;
let originX = "50%";
let originY = "50%";

function applyTransform() {
  if (isZoomed) {
    imgElement.style.transformOrigin = `${originX} ${originY}`;
    imgElement.style.transform = `scale(2) translate(${currentX}px, ${currentY}px)`;
  } else {
    imgElement.style.transform = "scale(1) translate(0px, 0px)";
  }
}


imgElement.addEventListener("click", (e: MouseEvent) => {
  isZoomed = !isZoomed;
  imgElement.classList.toggle("zoomed", isZoomed);

  if (isZoomed) {
   originX = "50%";
    originY = "50%";
    currentX = 0;
    currentY = 0;
    imgElement.style.cursor = "grab";
  } else {
    currentX = 0;
    currentY = 0;
    imgElement.style.cursor = "zoom-in";
  }

  applyTransform();

  if (blurOverlay) {
    blurOverlay.classList.toggle("visible", isZoomed);
  }
});

imgElement.addEventListener("mousedown", (e) => {
  if (!isZoomed) return;
  isDragging = true;
  imgElement.style.cursor = "grabbing";
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging || !isZoomed) return;
  e.preventDefault();
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  applyTransform();
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  if (isZoomed) {
    imgElement.style.cursor = "grab";
  }
});



prevBtn?.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderItem(currentIndex);
  }
});

nextBtn?.addEventListener("click", () => {
  if (currentIndex < allItems.length - 1) {
    currentIndex++;
    renderItem(currentIndex);
  }
});

