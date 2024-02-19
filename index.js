const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");

let files = [];

button.addEventListener('click', (e) => {
    input.click();
});

// Modificación aquí para manejar la selección de nuevos archivos
input.addEventListener("change", (e) => {
    // Concatenamos los nuevos archivos seleccionados con los ya existentes
    files = files.concat(Array.from(e.target.files));
    showFiles(files); // Llamamos a showFiles para mostrar todos los archivos
});

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para subir los archivos";
});

dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta imágenes";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    // Añadimos los archivos dropeados al array sin reemplazar los existentes
    files = files.concat(Array.from(e.dataTransfer.files));
    showFiles(files);
    dropArea.classList.remove("active");
});

function showFiles(filesToAdd) {
    const preview = document.getElementById("preview");
    preview.innerHTML = ""; // Limpiar la previsualización anterior
    filesToAdd.forEach((file, index) => {
        processFile(file, index);
    });
}

function processFile(file, index) {
    const docType = file.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if(validExtensions.includes(docType)) {
        let fileReader = new FileReader();

        fileReader.onload = function(e) {
            const fileUrl = e.target.result;
            const image = `
                <div class="previewImage">
                    <img src="${fileUrl}" alt="${file.name}" width="50px">
                    <div class="status">
                        <span>${file.name}</span>
                        <span class="material-symbols-outlined removeBtn" onclick="removeBtn(${index})">close</span>
                    </div>
                </div>
            `;
            const preview = document.getElementById("preview");
            preview.innerHTML += image;
        };

        fileReader.readAsDataURL(file);
    } else {
        alert('Archivo no válido');
    }
}

function removeBtn(index) {
    files.splice(index, 1); // Eliminar el archivo del array 'files'
    showFiles(files); // Actualizar la previsualización
}
