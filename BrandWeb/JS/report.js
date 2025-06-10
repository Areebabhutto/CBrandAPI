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

  document.getElementById("exportBtn").addEventListener("click", () => {
  const reportElement = document.querySelector(".report-container");
  const opt = {
    margin:       0.5,
    filename:     'Order_Report_Summary.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(reportElement).save();
});
