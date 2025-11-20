const images = [
    "/image/1_upscayl_4x_digital-art-4x.png",
    "/image/naurotperfil_upscayl_4x_digital-art-4x.png",
    "/image2/-14-28-image.png",
    "/image3/-14-28-image.png",
    "/image2/4-image.png",
    "/image2/BART-PERFIL.jpg",
    "/image2/Perro.jpg",
    "/image2/pokelucario.png",
    "/image/_digital-art-4x.png",
    "/image/Colgador de llaves (1).png",
    "/image/digital-art-4x.png",
    "/image/digital-art-x.png",
    "/image/foto-canalyt.jpg",
    "/image/Gato.jpeg",
    "/image/image_upscayl_4x_digital-art-4x.png",

];

// Agrupar  por carpeta
const folderImage = {};
images.forEach(p => {
    const parts = p.split("/").filter(Boolean); 
    const folder = parts.length > 1 ? parts[0] : "root";
    if (!folderImage[folder]) folderImage[folder] = [];
    folderImage[folder].push(p);
});

let currentView = "photos"; 
let currentFolder = null; 

const PHOTO_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-photo">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M8.813 11.612c.457 -.38 .918 -.38 1.386 .011l.108 .098l4.986 4.986l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.292 -1.293l.292 -.293l.106 -.095c.457 -.38 .918 -.38 1.386 .011l.108 .098l4.674 4.675a4 4 0 0 1 -3.775 3.599l-.206 .005h-12a4 4 0 0 1 -3.98 -3.603l6.687 -6.69l.106 -.095zm9.187 -9.612a4 4 0 0 1 3.995 3.8l.005 .2v9.585l-3.293 -3.292l-.15 -.137c-1.256 -1.095 -2.85 -1.097 -4.096 -.017l-.154 .14l-.307 .306l-2.293 -2.292l-.15 -.137c-1.256 -1.095 -2.85 -1.097 -4.096 -.017l-.154 .14l-5.307 5.306v-9.585a4 4 0 0 1 3.8 -3.995l.2 -.005h12zm-2.99 5l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"/>
</svg>`;

const FOLDER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-folders"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a1 1 0 0 1 .707 .293l1.708 1.707h4.585a3 3 0 0 1 2.995 2.824l.005 .176v7a3 3 0 0 1 -3 3h-1v1a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3h1v-1a3 3 0 0 1 3 -3zm-6 6h-1a1 1 0 0 0 -1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1 -1v-1h-7a3 3 0 0 1 -3 -3z" /></svg>
`;

function changeViewPhoto() { // Cuadricula
    const gallery = document.getElementById("gallery");
    if (!gallery) return;
    
    gallery.className = "flex-1 min-h-0 overflow-y-scroll grid grid-cols-3 gap-1 p-1 pb-28 content-start";
    gallery.style.display = "";
    gallery.style.gridTemplateColumns ="";
    gallery.style.gap = "";
    gallery.innerHTML = "";
    
    const controls = document.getElementById("viewControls");
    if (controls) controls.innerHTML = "";
    const btn = document.getElementById("ViewBtn");
    if (btn) btn.innerHTML = FOLDER_SVG;

    // mostrar footer del botón "View hidden photo" sólo en vista cuadricula
    const footer = document.getElementById("btnFooter");
    if (footer) footer.classList.add("hidden");

    images.forEach((imgSrc, index) => {
        const item = document.createElement("div");
        item.className = "w-[120px] h-[120px] overflow-hidden cursor-pointer bg-gray-200";
        item.style.flexShrink = "0";

        const imgEl = document.createElement("img");
        imgEl.src = imgSrc;
        imgEl.alt = `Foto ${index + 1}`;
        imgEl.loading = "lazy";
        imgEl.className = "w-full h-full object-cover";

        item.addEventListener("click", () => openPreview(imgSrc));

        item.appendChild(imgEl);
        gallery.appendChild(item);
    });
}

function changeViewFolders() { //Lista
    const gallery = document.getElementById("gallery");
    const controls = document.getElementById("viewControls");
    if (!gallery) return;
    gallery.className = "flex-1 min-h-0 overflow-y-scroll flex flex-col gap-2 p-2 pb-28";
    if (controls) controls.innerHTML = "";
    const footer = document.getElementById("btnFooter");
    
    if (footer) footer.classList.remove("hidden");
    const btn = document.getElementById("ViewBtn");
    if (btn) btn.innerHTML = PHOTO_SVG;
    gallery.innerHTML = "";

    const folders = Object.keys(folderImage);
    folders.forEach(folderName => {
        const imgs = folderImage[folderName] || [];
        if (imgs.length === 0) return;

        const rep = imgs[Math.floor(Math.random() * imgs.length)];

        const item = document.createElement("div");
        item.className = "flex items-center gap-2 p-2 bg-white rounded-md shadow-sm cursor-pointer";

        const thumb = document.createElement("div");
        thumb.className = "w-20 h-20 overflow-hidden rounded-md bg-gray-100 flex-shrink-0";
        const imgEl = document.createElement("img");
        imgEl.src = rep;
        imgEl.alt = `${folderName} - ejemplo`;
        imgEl.loading = "lazy";
        imgEl.className = "w-full h-full object-cover";
        thumb.appendChild(imgEl);

        const info = document.createElement("div");
        info.className = "flex-1";
        const title = document.createElement("div");
        title.className = "text-sm font-medium text-gray-800";
        title.textContent = folderName;
        const subtitle = document.createElement("div");
        subtitle.className = "text-xs text-gray-500";
        subtitle.textContent = `${imgs.length} item(s)`;

        info.appendChild(title);
        info.appendChild(subtitle);

        item.appendChild(thumb);
        item.appendChild(info);

        // click abre la carpeta
        item.addEventListener("click", () => {
            currentFolder = folderName;
            cargarGaleria("folderContent", folderName);
        });

        gallery.appendChild(item);
    });
}

function renderFolderContent(folderName) {
    const gallery = document.getElementById("gallery");
    const controls = document.getElementById("viewControls");
    if (!gallery) return;
    
    gallery.className = "flex-1 min-h-0 overflow-y-scroll grid grid-cols-3 gap-1 p-1 pb-28 content-start";
    gallery.style.display = "";
    gallery.style.gridTemplateColumns = "";
    gallery.style.gap = "";
    gallery.innerHTML = "";
    // ocultar footer (btn) cuando se muestra contenido de una carpeta
    const footer = document.getElementById("btnFooter");
    if (footer) footer.classList.add("hidden");
    if (controls) {
        controls.innerHTML = `<button id="backToFolders" class="px-3 py-1 bg-gray-200 rounded-md text-sm">Volver</button>`;
        const back = document.getElementById("backToFolders");
        if (back) back.addEventListener("click", () => {
            currentFolder = null;
            cargarGaleria("folders");
        });
    }
    const btn = document.getElementById("ViewBtn");
    if (btn) btn.innerHTML = PHOTO_SVG;

    const imgs = folderImage[folderName] || [];
    imgs.forEach((imgSrc, index) => {
        const item = document.createElement("div");
        item.className = "w-[120px] h-[120px] overflow-hidden cursor-pointer bg-gray-200";
        item.style.flexShrink = "0";
        const imgEl = document.createElement("img");
        imgEl.src = imgSrc;
        imgEl.alt = `${folderName} - ${index + 1}`;
        imgEl.loading = "lazy";
        imgEl.className = "w-full h-full object-cover";
        item.addEventListener("click", () => openPreview(imgSrc));
        item.appendChild(imgEl);
        gallery.appendChild(item);
    });
}

function cargarGaleria(mode = currentView, folderName = null) {
    currentView = mode;
    if (mode === "folders") {
        currentFolder = null;
        changeViewFolders();
    } else if (mode === "folderContent" && folderName) {
        currentFolder = folderName;
        renderFolderContent(folderName);
    } else {
        currentFolder = null;
        changeViewPhoto();
    }
}

function changeView() {
    
    if (currentView === "folders" || currentView === "folderContent") {
        currentView = "photos";
        cargarGaleria("photos");
        return;
    }
    // Si estamos en photos, ir a folders
    currentView = "folders";
    cargarGaleria("folders");
}

function simulator(event) {
    if (event.target && event.target.id === "main") {
        closeSimulator();
    }
}

function showSimulator() {
    const modal = document.getElementById("main");
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.classList.add("flex", "modal-active");
    document.body.classList.add("overflow-hidden");
    cargarGaleria(currentView);
}

function closeSimulator() {
    const modal = document.getElementById("main");
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex", "modal-active");
    document.body.classList.remove("overflow-hidden");
}


document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("ViewBtn");
    if (btn) btn.addEventListener("click", changeView);

    const closePreviewBtn = document.getElementById("closePreview");
    const preview = document.getElementById("preview");
    
    if (closePreviewBtn) {
        closePreviewBtn.addEventListener("click", closePreview);
    }
    
    if (preview) {
        preview.addEventListener("click", (e) => {
            if (e.target.id === "preview") closePreview();
        });
    }
});

function openPreview(imgSrc) {
    const preview = document.getElementById("preview");
    const previewImg = document.getElementById("previewImg");
    const previewTitle = document.getElementById("previewTitle");
    const searchBar = document.getElementById("searchBar");
    
    if (preview && previewImg) {
        previewImg.src = imgSrc;
        
        // nombre del archivo 
        const fileName = imgSrc.split("/").pop();
        if (previewTitle) {
            previewTitle.textContent = fileName;
        }
        //Ocultar searchBarr
        if (searchBar) {
            searchBar.classList.add("hidden");
        }
        
        preview.classList.remove("hidden");
    }
}

function closePreview() {
    const preview = document.getElementById("preview");
    const searchBar = document.getElementById("searchBar");
    
    if (preview) {
        preview.classList.add("hidden");
    }
    
    // Mostrar searchBar
    if (searchBar) {
        searchBar.classList.remove("hidden");
    }
}

