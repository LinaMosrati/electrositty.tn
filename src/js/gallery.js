let gallery = [];
let currentGalleryCategory = "Tous";

const galleryContainer = document.getElementById("gallery-container");
const lightbox = document.getElementById("lightbox");

async function loadGallery() {
    try {
        const response = await fetch("src/data/gallery.json");

        if (!response.ok) {
            throw new Error("Impossible de charger gallery.json");
        }

        gallery = await response.json();

        renderGallery();
    } catch (error) {
        console.error(error);
        galleryContainer.innerHTML = `
            <p class="text-center text-red-500">
                Erreur lors du chargement de la galerie.
            </p>
        `;
    }
}

function renderGallery() {

    galleryContainer.innerHTML = "";

    const data =
        currentGalleryCategory === "Tous"
            ? gallery
            : gallery.filter(item => item.category === currentGalleryCategory);

    if (data.length === 0) {
        galleryContainer.innerHTML = `
            <p class="text-center text-zinc-400">
                Aucune réalisation trouvée.
            </p>
        `;
        return;
    }

    data.forEach(item => {

        const card = document.createElement("div");

        card.className =
            "gallery-item mb-6 break-inside-avoid cursor-pointer overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all duration-500 hover:-translate-y-2 hover:border-[#F5C400] hover:shadow-2xl hover:shadow-[#F5C400]/20";

        card.innerHTML = `
            <div class="relative overflow-hidden">

                <img
                    src="${item.image}"
                    alt="${item.title}"
                    loading="lazy"
                    class="w-full transition-transform duration-700 group-hover:scale-105"
                >

                <div class="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6">

                  <div class="flex justify-end">

    <span class="rounded-full bg-[#F5C400]/20 px-3 py-1 text-xs font-semibold text-[#F5C400] backdrop-blur">

        ${item.category}

    </span>

</div>

<div>

    <h3 class="text-3xl font-extrabold text-white">

        ${item.title}

    </h3>

    <p class="mt-3 flex items-center gap-2 text-sm text-zinc-300">

        <svg xmlns="http://www.w3.org/2000/svg"
             class="h-4 w-4 text-[#F5C400]"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor">

            <path stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 10l4.553-4.553a1 1 0 10-1.414-1.414L13.586 8.586M9 14l-4.553 4.553a1 1 0 101.414 1.414L10.414 15.414M8 8l8 8"/>

        </svg>

        Cliquez pour découvrir ce projet

    </p>

</div>

                </div>

            </div>
        `;

        card.addEventListener("click", () => openLightbox(item));

        galleryContainer.appendChild(card);

    });

}

function openLightbox(item) {

    document.getElementById("lightbox-image").src = item.image;

    document.getElementById("lightbox-title").textContent = item.title;

    document.getElementById("lightbox-category").textContent = item.category;

    document.getElementById("lightbox-description").textContent =
        item.description;

    document.getElementById("lightbox-client").textContent =
        item.client;

    lightbox.classList.remove("hidden");

    lightbox.classList.add("flex");

    document.body.style.overflow = "hidden";

}

function closeLightbox() {

    lightbox.classList.remove("flex");

    lightbox.classList.add("hidden");

    document.body.style.overflow = "";

}

document
    .getElementById("close-lightbox")
    .addEventListener("click", closeLightbox);

lightbox.addEventListener("click", e => {

    if (e.target === lightbox) {

        closeLightbox();

    }

});

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closeLightbox();

    }

});

document.querySelectorAll(".gallery-filter").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".gallery-filter").forEach(btn => {

            btn.classList.remove("bg-[#F5C400]", "text-black");

            btn.classList.add("bg-zinc-900", "text-white");

        });

        button.classList.remove("bg-zinc-900", "text-white");

        button.classList.add("bg-[#F5C400]", "text-black");

        currentGalleryCategory = button.dataset.category;

        renderGallery();

    });

});

loadGallery();