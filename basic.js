import { fetchStatsData, fetchProfileData, fetchChartData } from './fetch.js';
import { renderList, renderSummary, renderChart } from './ui.js';

let currentChart = null;
let selectedStockName = "AAPL";
let currentRange = "1mo";

async function initializeApp() {
  const stats = await fetchStatsData();
  renderList(stats, handleListClick);
  chart(selectedStockName, currentRange);
  summary(selectedStockName);
}

async function summary(stockname) {
  const profileData = await fetchProfileData();
  const details = profileData[stockname];
  if (details) renderSummary(details.summary);
}

async function chart(stockname, range) {
  const ctx = document.getElementById("stockChart").getContext("2d");
  const chartData = await fetchChartData();
  const stockData = chartData[stockname];
  if (!stockData || !stockData[range]) return;
  const rangeData = stockData[range];

  if (currentChart) currentChart.destroy();
  currentChart = renderChart(ctx, stockname, rangeData);

  document.getElementById("stockTitle").textContent = `${stockname} - ${range} Chart`;
}

function handleListClick(e) {
  if (e.target.classList.contains("name")) {
    const stockname = e.target.textContent.trim();
    selectedStockName = stockname;
    summary(stockname);
    chart(stockname, currentRange);
  }
}

document.getElementById("rangeButtons").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    currentRange = e.target.getAttribute("data-range");
    chart(selectedStockName, currentRange);
  }
});

window.addEventListener("DOMContentLoaded", initializeApp);
