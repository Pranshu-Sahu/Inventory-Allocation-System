const orderService = require('../services/orderService');

const createOrder = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({ error: 'productId and quantity are required' });
        }

        const order = await orderService.placeOrder(productId, quantity);
        return res.status(201).json(order);
    } catch (error) {
        if (error.message === 'Product not found') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === 'Insufficient stock' || error.message === 'Quantity must be positive') {
            return res.status(400).json({ error: error.message });
        }
        console.error('Order creation error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createOrder,
};
