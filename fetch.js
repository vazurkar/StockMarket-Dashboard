export async function fetchStatsData() {
  const response = await fetch("https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata");
  if (!response.ok) throw new Error("Stats fetch failed");
  return (await response.json()).stocksStatsData[0];
}

export async function fetchProfileData() {
  const response = await fetch("https://stock-market-api-k9vl.onrender.com/api/profiledata");
  if (!response.ok) throw new Error("Profile fetch failed");
  return (await response.json()).stocksProfileData[0];
}

export async function fetchChartData() {
  const response = await fetch("https://stock-market-api-k9vl.onrender.com/api/stocksdata");
  if (!response.ok) throw new Error("Chart fetch failed");
  return (await response.json()).stocksData[0];
}
