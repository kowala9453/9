(async function () {
  const tableBody = document.querySelector('[data-experiment-rows]');
  const chart = document.querySelector('[data-experiment-chart]');
  const status = document.querySelector('[data-data-status]');
  if (!tableBody || !chart) return;

  const number = (value) => Number(value).toFixed(2);
  const percent = (value) => `${value.toFixed(1)}%`;

  try {
    const response = await fetch('../data/experiment-data.json');
    if (!response.ok) throw new Error(`資料載入失敗：HTTP ${response.status}`);
    const data = await response.json();

    const rows = data.periods.map((period) => {
      const difference = period.control - period.painted;
      const rate = difference / period.control * 100;
      return { ...period, difference, rate };
    });

    const totalDifference = data.totals.control - data.totals.painted;
    const totalRate = totalDifference / data.totals.control * 100;

    tableBody.innerHTML = rows.map((row) => `
      <tr>
        <th scope="row">${row.start}–${row.end}</th>
        <td>${number(row.painted)}</td>
        <td>${number(row.control)}</td>
        <td>${number(row.difference)}</td>
        <td>${percent(row.rate)}</td>
      </tr>
    `).join('') + `
      <tr class="total-row">
        <th scope="row">累計</th>
        <td>${number(data.totals.painted)}</td>
        <td>${number(data.totals.control)}</td>
        <td>${number(totalDifference)}</td>
        <td>${percent(totalRate)}</td>
      </tr>
    `;

    const maxValue = Math.max(...rows.map((row) => row.control));
    chart.innerHTML = rows.map((row) => `
      <div class="chart-group">
        <div class="chart-heading">
          <strong>${row.start}–${row.end}</strong>
          <span>差異 ${percent(row.rate)}</span>
        </div>
        <div class="bar-line">
          <span class="bar-label">塗白漆</span>
          <div class="bar-track"><div class="bar painted" style="width:${row.painted / maxValue * 100}%"></div></div>
          <span class="bar-value">${number(row.painted)}</span>
        </div>
        <div class="bar-line">
          <span class="bar-label">對照組</span>
          <div class="bar-track"><div class="bar control" style="width:${row.control / maxValue * 100}%"></div></div>
          <span class="bar-value">${number(row.control)}</span>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('[data-total-painted]').forEach((el) => el.textContent = number(data.totals.painted));
    document.querySelectorAll('[data-total-control]').forEach((el) => el.textContent = number(data.totals.control));
    document.querySelectorAll('[data-total-difference]').forEach((el) => el.textContent = number(totalDifference));
    document.querySelectorAll('[data-total-rate]').forEach((el) => el.textContent = percent(totalRate));
    document.querySelectorAll('[data-unit]').forEach((el) => el.textContent = data.unit);
    if (status) status.textContent = '資料已從 data/experiment-data.json 載入。';
  } catch (error) {
    if (status) status.textContent = `${error.message}。請使用本機伺服器或 GitHub Pages 開啟網站。`;
  }
})();
