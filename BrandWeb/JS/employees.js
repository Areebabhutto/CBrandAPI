// Replace with your actual API URL
const employees_url = "https://potential-rotary-phone-g46jrrg5v7pp25rr-6005.app.github.dev/employees";

fetch(employees_url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch employee data");
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#employeesTable tbody");

        data.forEach(employee => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.employee_id}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.phone || "—"}</td>
                <td>${employee.position || "—"}</td>
                <td>${employee.branch_id || "—"}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error loading employees:", error.message);
    });
