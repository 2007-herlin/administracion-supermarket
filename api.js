// Función para obtener todos los productos
async function obtenerProductos() {
    const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/productos?select=*`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
            'apikey': CONFIG.SUPABASE_ANON_KEY,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('No se pudieron cargar los productos');
    }

    return await response.json();
}