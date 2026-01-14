const { PrismaClient } = require('@prisma/client');
const productRepository = require('../repositories/productRepository');
const orderRepository = require('../repositories/orderRepository');

const prisma = new PrismaClient();

const placeOrder = async (productId, quantity) => {
    if (quantity <= 0) {
        throw new Error('Quantity must be positive');
    }

    return await prisma.$transaction(async (tx) => {
        // 1. Get product with row-level lock
        const product = await productRepository.getProductForUpdate(productId, tx);

        if (!product) {
            throw new Error('Product not found');
        }

        // 2. Validate stock
        if (product.stock < quantity) {
            throw new Error('Insufficient stock');
        }

        // 3. Deduct stock
        await productRepository.updateStock(productId, product.stock - quantity, tx);

        // 4. Create order
        const order = await orderRepository.createOrder({
            productId,
            quantity,
            status: 'SUCCESS',
        }, tx);

        return order;
    });
};

module.exports = {
    placeOrder,
};
