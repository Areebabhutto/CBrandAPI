// Replace with your actual endpoint URL
const orderItems_url = "https://potential-rotary-phone-g46jrrg5v7pp25rr-6005.app.github.dev/order_items";

fetch(orderItems_url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch order items data");
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#orderItemsTable tbody");

        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.order_id}</td>
                <td>${item.order_item_id}</td>
                <td>${item.product_id}</td>
                <td>${item.quantity}</td>
                <td>$${parseFloat(item.unit_price).toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error loading order items:", error.message);
    });
