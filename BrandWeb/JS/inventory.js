// Replace with your actual API endpoint
const inventory_url = "https://potential-rotary-phone-g46jrrg5v7pp25rr-6005.app.github.dev/inventory";

fetch(inventory_url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch inventory data");
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#inventoryTable tbody");

        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.inventory_id}</td>
                <td>${item.product_id}</td>
                <td>${item.quantity_in_stock}</td>
                <td>${new Date(item.last_updated).toLocaleString()}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error loading inventory:", error.message);
    });
