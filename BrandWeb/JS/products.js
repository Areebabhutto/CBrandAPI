// Replace with your actual API endpoint for products
const products_url = "https://potential-rotary-phone-g46jrrg5v7pp25rr-6005.app.github.dev/products";

fetch(products_url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch product data");
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#productsTable tbody");

        data.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.product_id}</td>
                <td>${product.name}</td>
                <td>${product.description || "—"}</td>
                <td>${product.category_id}</td>
                <td>${product.price}</td>
                <td>${new Date(product.created_at).toLocaleString()}</td>
                <td>${product.supplier_id}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error loading products:", error.message);
    });
