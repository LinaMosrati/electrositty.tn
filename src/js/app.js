async function loadComponent(id, path) {

    const response = await fetch(path);

    const html = await response.text();

    document.getElementById(id).innerHTML = html;

}

async function init() {

    await loadComponent("navbar", "src/components/Navbar.html");
    await loadComponent("hero", "src/components/Hero.html");
    await loadComponent("services", "src/components/Services.html");
    await loadComponent("about", "src/components/About.html");
    await loadComponent("packs", "src/components/Packs.html");
    await loadComponent("materiels", "src/components/Materiels.html");
    await loadComponent("process", "src/components/Process.html");
    await loadComponent("whychooseus", "src/components/WhyChooseUs.html");
    await loadComponent("gallery", "src/components/Gallery.html");
    await loadComponent("testimonials", "src/components/Testimonials.html");
    await loadComponent("contact", "src/components/Contact.html");
    await loadComponent("footer", "src/components/Footer.html");

    // Navbar

    const navbarScript = document.createElement("script");
    navbarScript.src = "src/js/navbar.js";
    document.body.appendChild(navbarScript);

    // Packs

    const packsScript = document.createElement("script");
    packsScript.src = "src/js/packs.js";
    document.body.appendChild(packsScript);

    // Matériels

    const materielsScript = document.createElement("script");
    materielsScript.src = "src/js/materiels.js";
    document.body.appendChild(materielsScript);


    // Gallery

    const galleryScript = document.createElement("script");
    galleryScript.src = "src/js/gallery.js";
    document.body.appendChild(galleryScript);

}

init();