// Replace with your actual deployed API URL and port
const customers_url = "https://potential-rotary-phone-g46jrrg5v7pp25rr-6005.app.github.dev/customers";

fetch(customers_url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch customer data");
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#customersTable tbody");

        data.forEach(customer => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${customer.customer_id}</td>
                <td>${customer.full_name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone || "—"}</td>
                <td>${customer.address || "—"}</td>
                <td>${new Date(customer.created_at).toLocaleString()}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error loading customers:", error.message);
    });
