const axios = require('axios');

const API_URL = 'http://localhost:5000/order';

async function runTest() {
    console.log('Starting Concurrency Test...');
    console.log('Initial Stock for Product 1 is expected to be 10 (if seeded).');
    console.log('Firing 5 concurrent requests for 3 units each (Total 15 units).');
    console.log('Only 3 requests should succeed (3x3=9), and the 4th/5th should fail (Insufficient stock).\n');

    const requests = [
        { productId: 1, quantity: 3 },
        { productId: 1, quantity: 3 },
        { productId: 1, quantity: 3 },
        { productId: 1, quantity: 3 },
        { productId: 1, quantity: 3 },
    ];

    const results = await Promise.allSettled(
        requests.map((req) => axios.post(API_URL, req))
    );

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Request ${index + 1}: SUCCESS - Order ID: ${result.value.data.id}`);
        } else {
            console.log(`Request ${index + 1}: FAILED - Error: ${result.reason.response.data.error}`);
        }
    });

    console.log('\nTest Complete.');
}

runTest();
