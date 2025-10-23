/*INCIO DE LA VENTANA MODAL */
    // --- SELECTORES PRINCIPALES ---
    const btnCard = document.querySelectorAll(".btn-card");
    const ventanaModal = document.querySelector("#modal");
    const tituloModal = document.querySelector(".title-modal");
    const modalParagraph = ventanaModal.querySelector("p"); // primer <p> dentro del modal
    const formModal = ventanaModal.querySelector(".form-modal");
    const btnCancel = ventanaModal.querySelector(".btn-cancel");
    const btnSubmit = ventanaModal.querySelector(".btn-submit");

    // Seguridad: si algún selector no existe, salimos silenciosamente.
    if (!ventanaModal || !btnCard) {
    console.warn("Modal o botones de tarjetas no encontrados en el DOM.");
    }

    // Helper: abrir modal con datos
    function abrirModalConDatos({ title, description, imageSrc, cssBackground }) {
    // Título y texto
    if (tituloModal) tituloModal.textContent = title || "Título sin nombre";
    if (modalParagraph) modalParagraph.textContent = description || "";

    // Prioriza la imagen del <img> si existe; si no, usa el background CSS calculado si es útil.
    if (imageSrc) {
        ventanaModal.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("${imageSrc}")`;
        ventanaModal.style.backgroundSize = "cover";
        ventanaModal.style.backgroundPosition = "center";
    } else if (cssBackground && cssBackground !== "none") {
        // cssBackground viene como "url(...)" o "linear-gradient(...)" etc.
        // Para mayor legibilidad lo aplicamos directamente (añadiendo una capa de overlay)
        ventanaModal.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), ${cssBackground}`;
        ventanaModal.style.backgroundSize = "cover";
        ventanaModal.style.backgroundPosition = "center";
    } else {
        // fallback: eliminar background-image para usar el background-color del CSS
        ventanaModal.style.backgroundImage = "";
    }

    // Mostrar modal
    ventanaModal.classList.add("active");
    }

    // Helper: cerrar modal
    function cerrarModal() {
    ventanaModal.classList.remove("active");
    // opcional: limpiar fondo inline para no "pegar" la imagen
    // ventanaModal.style.backgroundImage = "";
    }

    // Extraer datos cuando se pulsa Inscríbete
    btnCard.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        // Buscar el contenedor .card-content (subir en el DOM hasta encontrarlo)
        const card = btn.closest(".card-content");
        if (!card) {
        console.warn("No se encontró el .card-content padre para este botón.");
        return;
        }

        // extraer título y descripción
        const titleElem = card.querySelector(".title-card");
        const paraElem = card.querySelector("p");
        const imgElem = card.querySelector(".imgcard");

        const title = titleElem ? titleElem.textContent.trim() : "";
        const description = paraElem ? paraElem.textContent.trim() : "";

        // obtener src de la imagen si existe
        const imageSrc = imgElem && imgElem.src ? imgElem.src : null;

        // obtener background-image computado (puede ser un gradient o url(...))
        const computedStyle = window.getComputedStyle(card);
        const cssBackground = computedStyle ? computedStyle.backgroundImage : null;

        // abrir modal con los datos recopilados
        abrirModalConDatos({ title, description, imageSrc, cssBackground });
    });
    });

    // Cerrar modal con botón cancelar
    if (btnCancel) {
    btnCancel.addEventListener("click", (e) => {
        e.preventDefault();
        cerrarModal();
    });
    }

/*FIN DE LA VENTANA MODAL */
