// ==================== FUNCIONES DE INTERFAZ (UI) ====================

/**
 * Toggle del menú lateral
 */
function toggleMenu() {
    const overlay = document.getElementById('overlay');
    const menu = document.getElementById('sideMenu');
    overlay.classList.toggle('active');
    menu.classList.toggle('active');
}

/**
 * Mostrar estado de carga
 */
function mostrarLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('dataTable').style.display = 'none';
}

/**
 * Ocultar estado de carga
 */
function ocultarLoading() {
    document.getElementById('loading').style.display = 'none';
}

/**
 * Mostrar nombre del archivo seleccionado
 */
function mostrarNombreArchivo() {
    const input = document.getElementById('archivo');
    const info = document.getElementById('fileInfo');
    if (input.files.length > 0) {
        info.textContent = `Archivo seleccionado: ${input.files[0].name}`;
    } else {
        info.textContent = '';
    }
}

/**
 * Abrir modal para nuevo registro
 */
function abrirModalNuevo() {
    editando = null;
    document.getElementById('modalTitle').textContent = 
        vistaActual === 'productos' ? 'Nuevo Producto' : 'Nueva Receta';
    document.getElementById('dataForm').reset();
    document.getElementById('fileInfo').textContent = '';
    document.getElementById('modal').classList.add('active');
}

/**
 * Abrir modal para editar registro
 * @param {Object} item - Item a editar
 */
function abrirModalEditar(item) {
    editando = item;
    console.log('📝 Editando item:', item);
    
    document.getElementById('modalTitle').textContent = 
        vistaActual === 'productos' ? 'Editar Producto' : 'Editar Receta';
    
    // Llenar formulario con datos existentes
    document.getElementById('nombre').value = item.titulo || '';
    document.getElementById('categoria').value = item.categoria || '';
    document.getElementById('porciones').value = item.porciones || '';
    document.getElementById('imagen_url').value = item.imagen_url || '';
    document.getElementById('fileInfo').textContent = '';
    
    // Limpiar campo de archivo
    const fileInput = document.getElementById('archivo');
    fileInput.value = '';
    
    document.getElementById('modal').classList.add('active');
}

/**
 * Cerrar modal
 */
function cerrarModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('dataForm').reset();
    document.getElementById('fileInfo').textContent = '';
    editando = null;
}

/**
 * Actualizar textos de la interfaz según la vista actual
 */
function actualizarTextos() {
    const esProducto = vistaActual === 'productos';
    
    document.getElementById('tituloSeccion').textContent = 
        esProducto ? 'Gestión de Productos' : 'Gestión de Recetas';
    
    document.getElementById('btnNuevoTexto').textContent = 
        esProducto ? 'Nuevo Producto' : 'Nueva Receta';
    
    document.getElementById('headerPrecio').textContent = 
        esProducto ? 'Precio' : 'Porciones';
    
    document.getElementById('labelPrecio').textContent = 
        esProducto ? 'Precio (S/)' : 'Porciones';
    
    const inputPorciones = document.getElementById('porciones');
    inputPorciones.placeholder = esProducto ? 'ej: 52.00' : 'ej: 4';
    inputPorciones.step = esProducto ? '0.01' : '1';
}

/**
 * Renderizar tabla con datos
 * @param {Array} datos - Array de productos o recetas
 */
function renderizarTabla(datos) {
    console.log('🎨 Renderizando tabla con', datos.length, 'items');
    
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    if (datos.length === 0) {
        document.getElementById('emptyState').style.display = 'block';
        document.getElementById('dataTable').style.display = 'none';
        return;
    }

    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('dataTable').style.display = 'table';

    const esProducto = vistaActual === 'productos';

    datos.forEach(item => {
        const tr = document.createElement('tr');
        
        // Escapar comillas en el JSON
        const itemJSON = JSON.stringify(item).replace(/"/g, '&quot;');
        
        tr.innerHTML = `
            <td>
                ${item.imagen_url 
                    ? `<img src="${item.imagen_url}" alt="${item.titulo}" class="product-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                       <div class="image-placeholder" style="display:none;">📷</div>`
                    : '<div class="image-placeholder">📷</div>'
                }
            </td>
            <td style="font-weight: 500;">${item.titulo || 'Sin nombre'}</td>
            <td><span class="category-tag">${item.categoria || 'Sin categoría'}</span></td>
            <td class="price">
                ${esProducto 
                    ? `S/ ${parseFloat(item.porciones || 0).toFixed(2)}` 
                    : (item.porciones || '0')
                }
            </td>
            <td>
                <button class="action-btn btn-edit" onclick='abrirModalEditar(${itemJSON})' title="Editar">
                    ✏️
                </button>
                <button class="action-btn btn-delete" onclick="confirmarEliminacion(${item.id})" title="Eliminar">
                    🗑️
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    console.log('✅ Tabla renderizada');
}

/**
 * Mostrar mensaje de error
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarError(mensaje) {
    alert('❌ Error: ' + mensaje);
    console.error('Error:', mensaje);
}

/**
 * Mostrar mensaje de éxito
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarExito(mensaje) {
    alert('✅ ' + mensaje);
    console.log('Éxito:', mensaje);
}

/**
 * Confirmar eliminación
 * @param {number} id - ID del item a eliminar
 */
function confirmarEliminacion(id) {
    const tipo = vistaActual === 'productos' ? 'producto' : 'receta';
    if (confirm(`¿Estás seguro de eliminar este ${tipo}?`)) {
        eliminarItem(id);
    }
}