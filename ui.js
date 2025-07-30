export function renderList(data, onClickHandler) {
  const listContainer = document.querySelector(".list");
  listContainer.innerHTML = "";
  Object.entries(data).forEach(([key, value]) => {
    let classname = value.profit > 0 ? "profit" : value.profit === 0 ? "breakeven" : "loss";
    listContainer.innerHTML += `
      <ul class="item">
        <li>
          <span class="name">${key}</span>
          <span class="price">$${value.bookValue}</span>
          <span class="change ${classname}">${value.profit}%</span>
        </li>
      </ul>
    `;
  });
  listContainer.addEventListener("click", onClickHandler);
}

export function renderSummary(summaryText) {
  const details = document.querySelector(".details");
  details.innerHTML = `<p>${summaryText}</p>`;
}

export function renderChart(ctx, stockname, rangeData) {
  const labels = rangeData.timeStamp.map(ts => new Date(ts * 1000).toLocaleDateString());
  const values = rangeData.value;

  return new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: `${stockname} Price`,
        data: values,
        borderColor: "blue",
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        fill: true,
        tension: 0.2,
      }],
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Date" } },
        y: { title: { display: true, text: "Price (USD)" } },
      },
    },
  });
}
