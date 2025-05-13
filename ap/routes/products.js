const express = require('express');
const router = express.Router();
let products = [];

// GET /products - Get all products
router.get('/', (req, res) => {
    try {
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message })
    }
});

// POST /products - Create product
router.post('/', (req, res) => {
    try {
        const { name, descr, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: 'Se requiere nombre y precio del producto' });
        }

        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ message: 'Precio debe ser un número positivo' });
        }

        const newProduct = {
            id: products.length + 1,
            name,
            descr,
            price,
            creationDate: new Date()
        };

        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
});

// GET /products/:id - Obtener un producto especifico por el ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID debe ser un número válido' });
        }

        const product = products.find(p => p.id === id);

        if (!product) {
            return res.status(404).json({ message: `Producto con ID ${id} no encontrado` });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
});

// PUT /products/:id - Actualizar un producto
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, descr, price } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID debe ser un número válido' });
        }

        // Validación del precio si se proporciona
        if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
            return res.status(400).json({ message: 'Precio debe ser un número positivo' });
        }

        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            return res.status(404).json({ message: `Producto con ID ${id} no encontrado` });
        }

        // Actualizar solo los campos proporcionados
        const updatedProduct = {
            ...products[productIndex],
            name: name !== undefined ? name : products[productIndex].name,
            descr: descr !== undefined ? descr : products[productIndex].descr,
            price: price !== undefined ? price : products[productIndex].price,
            updatedDate: new Date()
        };

        products[productIndex] = updatedProduct;

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
});

// DELETE /products/:id - Delete a product
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID debe ser un número válido' });
        }

        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            return res.status(404).json({ message: `Producto con ID ${id} no encontrado` });
        }

        const deletedProduct = products[productIndex];
        products.splice(productIndex, 1);

        res.status(200).json({
            message: `Producto con ID ${id} eliminado correctamente`,
            deletedProduct
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
});

module.exports = router;