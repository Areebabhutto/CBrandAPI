// Replace with your actual API endpoint for orders
const orders_url = "https://potential-rotary-phone-g46jrrg5v7pp25rr-6005.app.github.dev/orders";

fetch(orders_url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch order data");
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#ordersTable tbody");

        data.forEach(order => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.order_id}</td>
                <td>${order.customer_id}</td>
                <td>${new Date(order.order_date).toLocaleString()}</td>
                <td>${order.status || "—"}</td>
                <td>${order.branch_id}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error loading orders:", error.message);
    });
