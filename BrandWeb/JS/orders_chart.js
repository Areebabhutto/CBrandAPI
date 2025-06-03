// Make sure this matches your actual deployed backend URL
const ordersUrl = "https://potential-rotary-phone-g46jrrg5v7pp25rr-6005.app.github.dev/api/daily-orders";

fetch(ordersUrl)
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch order data");
    return res.json();
  })
  .then(data => {
    const labels = data.map(row => row.order_day);
    const values = data.map(row => parseInt(row.order_count));

    const ctx = document.getElementById('ordersChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Orders per Day',
          data: values,
          backgroundColor: '#198754'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Daily Order Count'
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Orders'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        }
      }
    });
  })
  .catch(err => console.error("Chart error:", err));
