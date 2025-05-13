class Product {
    constructor(id, name, descr, price) {
        this.id = id;
        this.name = name;
        this.descr = descr;
        this.price = price;
        this.creationDate = new Date();
        this.updatedDate = null;
    }

    // Método para validar un producto
    static validate(productData) {
        const errors = [];

        if (!productData.name) {
            errors.push('El nombre del producto es requerido');
        }

        if (productData.price === undefined || productData.price === null) {
            errors.push('El precio del producto es requerido');
        } else if (typeof productData.price !== 'number' || productData.price <= 0) {
            errors.push('El precio debe ser un número positivo');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
}

module.exports = Product;