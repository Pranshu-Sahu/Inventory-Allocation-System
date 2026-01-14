const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProductById = async (id, transaction) => {
    const db = transaction || prisma;
    return await db.product.findUnique({
        where: { id: parseInt(id) },
    });
};

const getProductForUpdate = async (id, transaction) => {
    // Use raw query for SELECT FOR UPDATE since Prisma doesn't natively support it in findUnique yet (without extensions)
    const [product] = await transaction.$queryRaw`SELECT * FROM "Product" WHERE id = ${parseInt(id)} FOR UPDATE`;
    return product;
};

const updateStock = async (id, newStock, transaction) => {
    return await transaction.product.update({
        where: { id: parseInt(id) },
        data: { stock: newStock },
    });
};

module.exports = {
    getProductById,
    getProductForUpdate,
    updateStock,
};
