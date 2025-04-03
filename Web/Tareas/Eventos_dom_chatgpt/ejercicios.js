// 1. Mostrar la posición del mouse
document.addEventListener("mousemove", function (e) {
    const pos = document.getElementById("mousePosition");
    pos.textContent = `Posición del mouse: X=${e.clientX}, Y=${e.clientY}`;
});

// 2. Obtener nombre completo del formulario
document.getElementById("form1").addEventListener("submit", function (e) {
    e.preventDefault();
    const fname = document.getElementById("form-fname").value;
    const lname = document.getElementById("form-lname").value;
    const fullName = document.createElement("p");
    fullName.textContent = `Nombre completo: ${fname} ${lname}`;
    this.appendChild(fullName);
});

// 3. Insertar fila y columna en la tabla sampleTable
document.getElementById("btn-insert-r").addEventListener("click", function () {
    const table = document.getElementById("sampleTable");
    const newRow = table.insertRow();
    const rowIndex = table.rows.length; // empieza en 1
    const colCount = table.rows[0].cells.length;

    for (let i = 0; i < colCount; i++) {
        const cell = newRow.insertCell();
        cell.textContent = `Row ${rowIndex} column ${i + 1}`;
    }
});

document.getElementById("btn-insert-c").addEventListener("click", function () {
    const table = document.getElementById("sampleTable");
    const newColIndex = table.rows[0].cells.length + 1;

    for (let i = 0; i < table.rows.length; i++) {
        const cell = table.rows[i].insertCell();
        cell.textContent = `Row ${i + 1} column ${newColIndex}`;
    }
});
// 4. Cambiar contenido de celda en myTable
document.getElementById("btn-change").addEventListener("click", function () {
    const row = parseInt(document.getElementById("rowIndex").value) - 1;
    const col = parseInt(document.getElementById("colIndex").value) - 1;
    const value = document.getElementById("newValue").value;
    const table = document.getElementById("myTable");

    if (table.rows[row] && table.rows[row].cells[col]) {
        table.rows[row].cells[col].textContent = value;
    } else {
        alert("Posición no válida.");
    }
});

// 5. Agregar y quitar colores del select
document.getElementById("btn-add-color").addEventListener("click", function () {
    const colores = ["Blue", "Orange", "Purple", "Pink", "Gray", "Cyan"];
    const randomColor = colores[Math.floor(Math.random() * colores.length)];
    const option = document.createElement("option");
    option.textContent = randomColor;
    document.getElementById("colorSelect").appendChild(option);
});

document.getElementById("btn-rmv-color").addEventListener("click", function () {
    const select = document.getElementById("colorSelect");
    if (select.options.length > 0) {
        select.remove(select.selectedIndex);
    } else {
        alert("No hay más colores para quitar.");
    }
});

// 6. Cambiar imagen con tamaño aleatorio al hacer hover
document.getElementById("imagenGato").addEventListener("mouseenter", function () {
    const width = Math.floor(Math.random() * 301) + 300;  // 300 - 600
    const height = Math.floor(Math.random() * 301) + 300;
    const urlBase = "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/03/gato-botas-ultimo-deseo-2649871.jpg";
    this.src = `${urlBase}?tf=${width}x${height}`;
});