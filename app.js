// Función principal para cargar y mostrar productos
async function cargarTablaProductos() {
    const tableBody = document.getElementById('tableBody');
    const loading = document.getElementById('loading');
    const dataTable = document.getElementById('dataTable');

    try {
        // 1. Mostrar spinner y ocultar tabla
        loading.style.display = 'block';
        dataTable.style.display = 'none';

        // 2. Traer datos de Supabase
        const productos = await obtenerProductos();

        // 3. Limpiar tabla antes de llenar
        tableBody.innerHTML = '';

        // 4. Crear filas dinámicamente
        productos.forEach(prod => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td><img src="${prod.imagen}" alt="${prod.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                <td>**${prod.nombre}**</td>
                <td>${prod.categoria}</td>
                <td>S/ ${parseFloat(prod.precio).toFixed(2)}</td>
                <td>
                    <button class="btn-edit" onclick="editarProducto(${prod.id})">✏️</button>
                    <button class="btn-delete" onclick="eliminarProducto(${prod.id})">🗑️</button>
                </td>
            `;
            tableBody.appendChild(fila);
        });

        // 5. Mostrar tabla
        loading.style.display = 'none';
        dataTable.style.display = 'table';

    } catch (error) {
        console.error(error);
        loading.innerHTML = `<p style="color:red">Error al cargar datos</p>`;
    }
}

// Ejecutar al cargar la página
window.onload = cargarTablaProductos;