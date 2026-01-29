const api = "https://disease.sh/v3/covid-19/countries";
const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");

let countries = [];

fetch(api)
  .then(res => res.json())
  .then(data => {
    countries = data;
    renderTable(countries);
  });

function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach(c => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${c.country}</td>
      <td>${c.cases.toLocaleString()}</td>
      <td>${c.deaths.toLocaleString()}</td>
      <td>${c.recovered.toLocaleString()}</td>
    `;

    tr.onclick = () => {
      window.location.href =
        `details.html?country=${encodeURIComponent(c.country)}`;
    };

    tableBody.appendChild(tr);
  });
}

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const filtered = countries.filter(c =>
    c.country.toLowerCase().includes(value)
  );
  renderTable(filtered);
});
