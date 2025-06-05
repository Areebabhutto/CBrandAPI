const report_url = "https://potential-rotary-phone-g46jrrg5v7pp25rr-6005.app.github.dev/report";

fetch(report_url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch report data");
    }
    return response.json();
  })
  .then(data => {
    document.getElementById("totalOrders").textContent = data.totalOrders;
    document.getElementById("totalCustomers").textContent = data.totalCustomers;

    const statusList = document.getElementById("statusList");
    data.ordersByStatus.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.textContent = item.status;
      
      const badge = document.createElement("span");
      badge.className = "badge bg-primary rounded-pill";
      badge.textContent = item.count;
      
      li.appendChild(badge);
      statusList.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Error loading report:", error.message);
  });
