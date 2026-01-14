const API_URL = 'http://localhost:5000';

export const placeOrder = async (productId, quantity) => {
    const response = await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: parseInt(quantity) }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
    }

    return data;
};
