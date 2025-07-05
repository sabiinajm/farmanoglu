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
  const item = allItems[index];
  if (!item || !imgElement) return;

  if (typeof item.img === "string") {
    imgElement.src = item.img;
  } else if (typeof item.img === "object" && item.img.main) {
    imgElement.src = item.img.main;
  }
}


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
