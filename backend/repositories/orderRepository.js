const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (orderData, transaction) => {
    const db = transaction || prisma;
    return await db.order.create({
        data: {
            productId: parseInt(orderData.productId),
            quantity: parseInt(orderData.quantity),
            status: orderData.status,
        },
    });
};

module.exports = {
    createOrder,
};
