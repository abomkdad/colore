const sheetUrl = 'https://docs.google.com/spreadsheets/d/1d5jClsyzy2inAoTbQIfxAZ65FjsmfSsQj6OGGs5YGVA/gviz/tq?tqx=out:json';
const categories = [
  'חמוץ מרתק','עור ועץ','חמוץ','מרענן','מתוק','מזרחי',
  'פרחוני','פירותי','אוריינטלי','גורמה','הדרי','extrit'
];

function renderFilterButtons() {
  const filters = document.getElementById('filters');
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.dataset.tag = cat;
    btn.onclick = () => filterBy(cat);
    filters.appendChild(btn);
  });
  const allBtn = document.createElement('button');
  allBtn.textContent = 'הצג הכל';
  allBtn.style.backgroundColor = '#6b7280';
  allBtn.onclick = () => filterBy('all');
  filters.appendChild(allBtn);
}

function filterBy(tag) {
  document.querySelectorAll('.card').forEach(card => {
    if (tag === 'all') {
      card.classList.remove('hidden');
    } else {
      card.classList.toggle('hidden', !card.classList.contains(tag));
    }
  });
}

fetch(sheetUrl)
  .then(res => res.text())
  .then(text => JSON.parse(text.substring(47).slice(0, -2)))
  .then(data => {
    const rows = data.table.rows;
    const container = document.getElementById('products');

    rows.slice(1).forEach(row => {
      const code = row.c[0]?.v || '';
      const img = row.c[2]?.v || '';
      const tags = [];
if (row.c[4]?.v?.toString().trim() === '1') tags.push('חמוץ מרתק');
if (row.c[5]?.v?.toString().trim() === '1') tags.push('עור ועץ');
if (row.c[6]?.v?.toString().trim() === '1') tags.push('חמוץ');
if (row.c[7]?.v?.toString().trim() === '1') tags.push('מרענן');
if (row.c[8]?.v?.toString().trim() === '1') tags.push('מתוק');
if (row.c[9]?.v?.toString().trim() === '1') tags.push('מזרחי');
if (row.c[10]?.v?.toString().trim() === '1') tags.push('פרחוני');
if (row.c[11]?.v?.toString().trim() === '1') tags.push('פירותי');
if (row.c[12]?.v?.toString().trim() === '1') tags.push('אוריינטלי');
if (row.c[13]?.v?.toString().trim() === '1') tags.push('גורמה');
if (row.c[14]?.v?.toString().trim() === '1') tags.push('הדרי');
if (row.c[15]?.v?.toString().trim() === '1') tags.push('extrit');


      const tagHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
      const tagClass = tags.join(' ');

      container.innerHTML += `
        <div class="card ${tagClass}">
          <img src="${img}" alt="${code}">
          <div class="card-content">
            <div class="code">${code}</div>
            <div class="tags">${tagHTML}</div>
          </div>
        </div>
      `;
    });
    renderFilterButtons();
  });
