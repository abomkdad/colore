<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>הבשמים של MAD</title>
  <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;700&display=swap" rel="stylesheet">
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
      -webkit-font-smoothing: antialiased; /* שיפור רינדור פונטים ב-webkit */
      -moz-osx-font-smoothing: grayscale; /* שיפור רינדור פונטים ב-firefox */
    }
    header {
      background-color: #1e293b;
      color: white;
      text-align: center;
      padding: 1rem;
      font-size: 1.7rem;
      position: fixed; /* קיבוע הכותרת למעלה */
      top: 0;
      left: 0;
      right: 0;
      z-index: 1001; /* לוודא שהכותרת מעל הכל */
      box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* הוספת צל קל לכותרת */
    }
    .filters {
      position: fixed;
      top: 4.5rem; /* הזיז את הפילטרים מתחת לכותרת */
      z-index: 1000;
      display: flex;
      flex-wrap: nowrap; /* מונע מעבר שורה של כפתורים */
      gap: 0.5rem;
      padding: 0.5rem;
      background-color: #1e293b;
      width: 100%;
      justify-content: center;
      overflow-x: auto; /* מאפשר גלילה אופקית לפילטרים */
      -webkit-overflow-scrolling: touch; /* גלילה חלקה יותר ב-iOS */
      box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* הוספת צל קל לפילטרים */
    }
    .filters button {
      flex-shrink: 0; /* מונע מכפתורים להתכווץ */
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 999px;
      font-size: 0.85rem;
      cursor: pointer;
      white-space: nowrap;
      color: white;
      transition: background-color 0.2s ease, transform 0.1s ease; /* אנימציה בלחיצה */
    }
    .filters button:active {
      transform: scale(0.95); /* אפקט לחיצה */
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
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      padding: 8.5rem 0.5rem 1rem; /* התאמת ריווח עליון כדי לפנות מקום לכותרת והפילטרים */
    }
    .card {
      background-color: #1f2937;
      border-radius: 1rem;
      overflow: hidden;
      transition: transform 0.2s ease;
      display: flex;
      flex-direction: column;
      aspect-ratio: 1/1; /* שומר על יחס גובה-רוחב ריבועי */
      box-shadow: 0 4px 8px rgba(0,0,0,0.3); /* הוספת צל לכרטיסים */
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

    /* התאמות למסכים קטנים (טלפונים ניידים) */
    @media (max-width: 768px) {
      header {
        font-size: 1.5rem;
        padding: 0.7rem;
      }
      .filters {
        top: 3.5rem; /* התאמת מיקום הפילטרים מתחת לכותרת המוקטנת */
        padding: 0.4rem;
        gap: 0.3rem;
        justify-content: flex-start; /* יישור לשמאל במצב RTL */
      }
      .filters button {
        padding: 0.4rem 0.8rem;
        font-size: 0.75rem;
      }
      .container {
        grid-template-columns: repeat(2, 1fr); /* 2 עמודות במקום 3 במסכים קטנים */
        gap: 0.4rem;
        padding-top: 7.5rem; /* התאמת ריווח עליון עקב גובה הפילטרים החדש */
      }
      .card {
        border-radius: 0.7rem;
      }
      .card-content {
        padding: 0.4rem;
      }
      .code {
        font-size: 0.9rem;
        margin-bottom: 0.3rem;
      }
      .tag {
        font-size: 0.6rem;
        padding: 0.2rem 0.5rem;
      }
    }

    /* התאמות למסכים קטנים מאוד (טלפונים ישנים/קטנים במיוחד) */
    @media (max-width: 480px) {
      .container {
        grid-template-columns: 1fr; /* עמודה אחת במסכים קטנים מאוד */
        padding-top: 7rem; /* התאמת ריווח עליון נוספת */
      }
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
    })
    .catch(error => console.error('Error fetching data:', error)); // טיפול בשגיאות
</script>
</body>
</html>
