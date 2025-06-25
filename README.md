<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>הבשמים של MAD</title>
  <style>
    :root {
      --blue-light: #b8d9f9;
      --brown: #8b6d5c;
      --green: #b7cd81;
      --mint: #d6e8d2;
      --orange: #e9be88;
      --burgundy: #561c33;
      --pink: #fbeaec;
      --purple: #8c7dc6;
      --beige: #f5c992;
      --red: #e1675d;
      --lime: #b5c980;
      --black: #000000;
    }
    body {
      margin: 0;
      font-family: 'Assistant', sans-serif;
      background-color: #0f172a;
      color: #ffffff;
    }
    header {
      background-color: #1e293b;
      color: white;
      text-align: center;
      padding: 1rem;
      font-size: 1.7rem;
    }
    .filters {
      position: fixed;
      top: 0;
      z-index: 1000;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem;
      background-color: #1e293b;
      width: 100%;
    }
    .filters button {
      flex: 0 0 auto;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 999px;
      font-size: 0.85rem;
      cursor: pointer;
      white-space: nowrap;
      color: white;
    }
    .filters button[data-tag="חמוץ מרתק"] { background-color: var(--blue-light); color: #000; }
    .filters button[data-tag="עור ועץ"] { background-color: var(--brown); }
    .filters button[data-tag="חמוץ"] { background-color: var(--green); color: #000; }
    .filters button[data-tag="מרענן"] { background-color: var(--mint); color: #000; }
    .filters button[data-tag="מתוק"] { background-color: var(--orange); color: #000; }
    .filters button[data-tag="מזרחי"] { background-color: var(--burgundy); }
    .filters button[data-tag="פרחוני"] { background-color: var(--pink); color: #000; }
    .filters button[data-tag="פירותי"] { background-color: var(--purple); }
    .filters button[data-tag="אוריינטלי"] { background-color: var(--beige); color: #000; }
    .filters button[data-tag="גורמה"] { background-color: var(--red); }
    .filters button[data-tag="הדרי"] { background-color: var(--lime); color: #000; }
    .filters button[data-tag="extrit"] { background-color: var(--black); }

    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
      padding: 6rem 0.5rem 1rem;
    }
    .card {
      background-color: #1f2937;
      border-radius: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      transition: transform 0.2s ease;
      display: flex;
      flex-direction: column;
      flex: 0 0 calc(33.333% - 0.5rem);
      max-width: calc(33.333% - 0.5rem);
      aspect-ratio: 1 / 1;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .card img {
      width: 100%;
      height: auto;
      object-fit: contain;
      aspect-ratio: 1/1;
      background-color: #ffffff10;
    }
    .card-content {
      padding: 0.5rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .code {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: #93c5fd;
      text-align: center;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.3rem;
    }
    .tag {
      font-size: 0.65rem;
      padding: 0.25rem 0.6rem;
      border-radius: 999px;
      background-color: #2563eb;
      color: white;
    }
    .hidden {
      display: none !important;
    }
  </style>
</head>
<body>

<header>הבשמים של MAD</header>
<div class="filters" id="filters"></div>
<div class="container" id="products"></div>

<script>
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
        if (row.c[4]?.v == 1) tags.push('חמוץ מרתק');
        if (row.c[5]?.v == 1) tags.push('עור ועץ');
        if (row.c[6]?.v == 1) tags.push('חמוץ');
        if (row.c[7]?.v == 1) tags.push('מרענן');
        if (row.c[8]?.v == 1) tags.push('מתוק');
        if (row.c[9]?.v == 1) tags.push('מזרחי');
        if (row.c[10]?.v == 1) tags.push('פרחוני');
        if (row.c[11]?.v == 1) tags.push('פירותי');
        if (row.c[12]?.v == 1) tags.push('אוריינטלי');
        if (row.c[13]?.v == 1) tags.push('גורמה');
        if (row.c[14]?.v == 1) tags.push('הדרי');
        if (row.c[15]?.v == 1) tags.push('extrit');

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
</script>

</body>
</html>
