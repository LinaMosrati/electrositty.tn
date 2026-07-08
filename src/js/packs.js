async function loadPacks() {

    const response = await fetch("src/data/packs.json");

    const packs = await response.json();

    const container = document.getElementById("packs-container");

    container.innerHTML = "";

    packs.forEach(pack => {

        container.innerHTML += `

        <div
            class="group overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 transition duration-500 hover:-translate-y-3 hover:border-teal-500 hover:shadow-2xl hover:shadow-teal-500/20">

            <div class="overflow-hidden">

                <img
                    src="${pack.image}"
                    alt="${pack.name}"
                    class="h-72 w-full object-cover transition duration-700 group-hover:scale-110">

            </div>

            <div class="p-8">

                <h3 class="text-3xl font-bold">

                    ${pack.name}

                </h3>

                <p class="mt-4 text-zinc-400">

                    ${pack.description}

                </p>

                <h4 class="mt-6 text-4xl font-black text-teal-400">

                    ${pack.price}

                </h4>

                <!-- Idéal pour -->

                <div class="mt-8 rounded-2xl border border-teal-500/20 bg-teal-500/10 p-4">

                    <p class="text-sm font-semibold uppercase tracking-wider text-teal-400">

                        <i class="fa-solid fa-star mr-2"></i>

                        Idéal pour

                    </p>

                    <p class="mt-2 text-white">

                        ${pack.idealFor}

                    </p>

                </div>

                <a
                    href="https://wa.me/21653308760"
                    target="_blank"
                    class="mt-8 inline-flex rounded-full bg-teal-500 px-6 py-3 font-semibold text-black transition hover:bg-teal-400">

                    Réserver

                </a>

            </div>

        </div>

        `;

    });

}

loadPacks();