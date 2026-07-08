async function loadGallery() {

    const response = await fetch("src/data/gallery.json");

    const gallery = await response.json();

    const container = document.getElementById("gallery-container");

    container.innerHTML = "";

    gallery.forEach(item => {

        container.innerHTML += `

        <div
            class="group cursor-pointer overflow-hidden rounded-3xl">

            <img
                src="${item.image}"
                alt="${item.title}"
                class="gallery-image h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                data-image="${item.image}">

        </div>

        `;

    });

    const lightbox = document.getElementById("lightbox");

    const lightboxImage = document.getElementById("lightbox-image");

    document.querySelectorAll(".gallery-image").forEach(image => {

        image.onclick = () => {

            lightbox.classList.remove("hidden");

            lightbox.classList.add("flex");

            lightboxImage.src = image.dataset.image;

        };

    });

    document.getElementById("close-lightbox").onclick = () => {

        lightbox.classList.remove("flex");

        lightbox.classList.add("hidden");

    };

    lightbox.onclick = e => {

        if (e.target === lightbox) {

            lightbox.classList.remove("flex");

            lightbox.classList.add("hidden");

        }

    };

}

loadGallery();