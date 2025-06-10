
const branches_url = "https://potential-rotary-phone-g46jrrg5v7pp25rr-6005.app.github.dev/branches";

fetch(branches_url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch branch data");
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#branchesTable tbody");

        data.forEach(branch => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${branch.branch_id}</td>
                <td>${branch.name}</td>
                <td>${branch.location || "—"}</td>
                <td>${branch.address || "—"}</td>
                <td>${branch.phone || "—"}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error loading branches:", error.message);
    });
