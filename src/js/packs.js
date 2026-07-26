// ===============================
// CONFIGURATION
// ===============================

const EVENTS = [
    {
        name: "Tous",
        icon: "✨",
        description: "Découvrez tous nos packs."
    },
    {
        name: "Anniversaire",
        icon: "🎂",
        description: "Des solutions idéales pour vos anniversaires."
    },
    {
        name: "Mariage",
        icon: "💍",
        description: "Une ambiance exceptionnelle pour votre mariage."
    },
    {
        name: "Conférence",
        icon: "🏢",
        description: "Du matériel professionnel pour vos conférences."
    },
    {
        name: "Concert",
        icon: "🎤",
        description: "Des équipements puissants pour vos concerts."
    },
    {
        name: "Soirée privée",
        icon: "🎉",
        description: "Créez une soirée inoubliable."
    },
    {
        name: "Remise de diplôme",
        icon: "🎓",
        description: "Une sonorisation parfaite pour votre cérémonie."
    }
];

let allPacks = [];

// ===============================
// CHARGEMENT
// ===============================

async function loadPacks() {

    try {

        const response = await fetch("./src/data/packs.json");

        allPacks = await response.json();

        createSidebar();

        filterPacks("Tous");

    } catch (error) {

        console.error(error);

    }

}

// ===============================
// SIDEBAR
// ===============================

function createSidebar() {

    const sidebar = document.getElementById("event-sidebar");

    sidebar.innerHTML = "";

    EVENTS.forEach((event, index) => {

        sidebar.innerHTML += `

<button
class="event-btn w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-left text-white
flex items-center justify-between
${index === 0 ? "active-event" : ""}"

data-event="${event.name}">

<div class="flex items-center gap-3">

<span class="text-2xl">

${event.icon}

</span>

<span class="font-semibold">

${event.name}

</span>

</div>

<i class="fa-solid fa-chevron-right text-sm opacity-50"></i>

</button>

`;

    });

    document.querySelectorAll(".event-btn").forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".event-btn")
                .forEach(btn => btn.classList.remove("active-event"));

            button.classList.add("active-event");

            filterPacks(button.dataset.event);

        });

    });

}

// ===============================
// FILTRE
// ===============================

function filterPacks(eventName) {

    const title = document.getElementById("selected-event-title");

    const description = document.getElementById("selected-event-description");

    const event = EVENTS.find(e => e.name === eventName);

    title.innerHTML =
        event.icon + " " + event.name;

    description.innerHTML =
        event.description;

    let filtered = [];

    if (eventName === "Tous") {

        filtered = allPacks;

    } else {

        filtered = allPacks.filter(pack =>
            pack.events.includes(eventName)
        );

    }

    filtered.sort((a, b) => {

        if (a.popular && !b.popular)
            return -1;

        if (!a.popular && b.popular)
            return 1;

        return 0;

    });

    renderPacks(filtered);

}

loadPacks();
// ===============================
// AFFICHAGE DES PACKS
// ===============================

function renderPacks(packs) {

    const grid = document.getElementById("packs-grid");

    grid.innerHTML = "";

    if (packs.length === 0) {

        grid.innerHTML = `
        <div class="col-span-full rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center">

            <h3 class="text-2xl font-bold text-white">

                Aucun pack disponible

            </h3>

            <p class="mt-3 text-zinc-400">

                Aucun pack ne correspond à cet événement.

            </p>

        </div>
        `;

        return;
    }

    packs.forEach(pack => {

        const features = pack.features
            .map(feature => `
                <li class="flex items-center gap-2">
                    <span class="text-[#F5C400]">✔</span>
                    <span>${feature}</span>
                </li>
            `)
            .join("");

        const idealFor = pack.idealFor
            .map(item => `
                <span class="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                    ${item}
                </span>
            `)
            .join("");

        grid.innerHTML += `

<div class="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-[#F5C400] hover:shadow-2xl hover:shadow-[#F5C400]/10">

    <div class="relative">

        <img
            src="${pack.image}"
            class="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
            alt="${pack.name}">

        ${pack.popular ? `

        <div class="absolute left-4 top-4 rounded-full bg-[#F5C400] px-4 py-2 text-xs font-bold text-black">

            ⭐ Le plus populaire

        </div>

        ` : ""}

    </div>

    <div class="p-7">

        <div class="flex items-center justify-between">

            <h3 class="text-2xl font-black text-white">

                ${pack.name}

            </h3>

            <span class="rounded-full bg-[#F5C400]/10 px-3 py-1 text-sm font-bold text-[#F5C400]">

                ${pack.price}

            </span>

        </div>

        <p class="mt-4 flex items-center gap-2 text-sm text-zinc-400">

            👥 ${pack.people}

        </p>

        <div class="mt-6">

            <h4 class="font-semibold text-white">

                Ce pack comprend

            </h4>

            <ul class="mt-4 space-y-3 text-zinc-300">

                ${features}

            </ul>

        </div>

        <div class="mt-6">

            <h4 class="font-semibold text-white">

                Idéal pour

            </h4>

            <div class="mt-4 flex flex-wrap gap-2">

                ${idealFor}

            </div>

        </div>

        <a
            href="https://wa.me/21653308760"
            class="mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#F5C400] py-3 font-bold text-black transition hover:bg-yellow-300">

            Réserver

            <i class="fa-solid fa-arrow-right"></i>

        </a>

    </div>

</div>

`;

    });

}