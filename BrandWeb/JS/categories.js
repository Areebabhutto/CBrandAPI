// Replace with your actual deployed API endpoint for categories
const categories_url = "https://potential-rotary-phone-g46jrrg5v7pp25rr-6005.app.github.dev/categories";

fetch(categories_url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch category data");
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#categoriesTable tbody");

        data.forEach(category => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${category.category_id}</td>
                <td>${category.name}</td>
                <td>${category.description || "—"}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error loading categories:", error.message);
    });
