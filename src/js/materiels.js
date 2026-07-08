let materiels = [];

const container = document.getElementById("materiels-container");

async function loadMateriels() {

    const response = await fetch("src/data/materiels.json");

    materiels = await response.json();

    displayMateriels("Tous");

}

function displayMateriels(category) {

    container.innerHTML = "";

    const data = category === "Tous"
        ? materiels
        : materiels.filter(item => item.category === category);

    data.forEach(item => {

        container.innerHTML += `

        <div
            class="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-500 hover:-translate-y-3 hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-500/20">

            <div class="overflow-hidden">

                <img
                    src="${item.image}"
                    class="h-64 w-full object-cover transition duration-700 group-hover:scale-110">

            </div>

            <div class="p-6">

                <span
                    class="rounded-full bg-teal-500/10 px-3 py-1 text-sm text-teal-400">

                    ${item.category}

                </span>

                <h3
                    class="mt-5 text-2xl font-bold text-white">

                    ${item.name}

                </h3>

                <p
                    class="mt-3 text-zinc-400">

                    ✔ Disponible

                </p>

                <h4
                    class="mt-5 text-3xl font-black text-teal-400">

                    ${item.price}

                </h4>

                <a
                    href="https://wa.me/21653308760"
                    target="_blank"
                    class="mt-6 flex justify-center rounded-full bg-teal-500 py-3 font-semibold text-black transition hover:bg-teal-400">

                    Réserver

                </a>

            </div>

        </div>

        `;

    });

}

document.addEventListener("click", e => {

    if (!e.target.classList.contains("filter-btn")) return;

    document
        .querySelectorAll(".filter-btn")
        .forEach(btn => {

            btn.classList.remove(
                "bg-teal-500",
                "text-black"
            );

            btn.classList.add(
                "bg-zinc-800",
                "text-white"
            );

        });

    e.target.classList.remove(
        "bg-zinc-800",
        "text-white"
    );

    e.target.classList.add(
        "bg-teal-500",
        "text-black"
    );

    displayMateriels(e.target.dataset.category);

});

loadMateriels();