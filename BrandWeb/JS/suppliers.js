// Replace with your actual API endpoint for suppliers
const suppliers_url = "https://potential-rotary-phone-g46jrrg5v7pp25rr-6005.app.github.dev/suppliers";

fetch(suppliers_url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch supplier data");
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#suppliersTable tbody");

        data.forEach(supplier => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${supplier.supplier_id}</td>
                <td>${supplier.name}</td>
                <td>${supplier.contact_person || "—"}</td>
                <td>${supplier.phone || "—"}</td>
                <td>${supplier.address || "—"}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error loading suppliers:", error.message);
    });
