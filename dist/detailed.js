"use strict";
const params2 = new URLSearchParams(window.location.search);
const itemName = decodeURIComponent(params2.get("item") || "");
const lang2 = localStorage.getItem("lang") || "az";
const imgElement = document.getElementById("detail-img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = -1;
let allItems = [];
fetch("/src/data/galleryData.json")
    .then((res) => {
    if (!res.ok)
        throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
})
    .then((data) => {
    allItems = [].concat(...Object.values(data));
    currentIndex = allItems.findIndex((item) => Object.values(item.headings).some((heading) => heading.toLowerCase() === itemName.toLowerCase()));
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
function renderItem(index) {
    const item = allItems[index];
    if (!item || !imgElement)
        return;
    const carouselNav = document.querySelector(".carouselNav");
    if (!carouselNav)
        return;
    carouselNav.innerHTML = "";
    if (typeof item.img === "string") {
        imgElement.src = item.img;
    }
    else if (typeof item.img === "object" && item.img.main) {
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
const blurOverlay = document.querySelector(".blur");
imgElement.addEventListener("click", () => {
    const isZoomed = imgElement.classList.toggle("zoomed");
    if (blurOverlay) {
        blurOverlay.classList.toggle("visible", isZoomed);
    }
});
prevBtn === null || prevBtn === void 0 ? void 0 : prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderItem(currentIndex);
    }
});
nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.addEventListener("click", () => {
    if (currentIndex < allItems.length - 1) {
        currentIndex++;
        renderItem(currentIndex);
    }
});
