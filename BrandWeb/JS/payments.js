// Replace with your actual API endpoint for payments
const payments_url = "https://potential-rotary-phone-g46jrrg5v7pp25rr-6005.app.github.dev/payments";

fetch(payments_url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch payment data");
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("#paymentsTable tbody");

        data.forEach(payment => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${payment.payment_id}</td>
                <td>${payment.order_id}</td>
                <td>${payment.amount}</td>
                <td>${payment.payment_method || "—"}</td>
                <td>${new Date(payment.payment_date).toLocaleString()}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error loading payments:", error.message);
    });
