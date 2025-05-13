const express = require('express');
const app = express();
const productsRoutes = require('./routes/products.js');
const port = 3000;

app.use(express.json());

// Rutas para productos
app.use('/products', productsRoutes);

// Manejador de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejador global de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'production' ? {} : err.message
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});