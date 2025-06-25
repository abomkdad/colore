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
      --header-height: 4.5rem; /* גובה קבוע לכותרת */
      --filter-row-height: 2.5rem; /* גובה משוער לשורת פילטרים אחת */
      --filter-padding: 0.5rem; /* ריווח פנימי לכפתורי פילטר */
    }
    body {
      margin: 0;
      font-family: 'Assistant', sans-serif;
      background-color: #0f172a;
      color: #ffffff;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    header {
      background-color: #1e293b;
      color: white;
      text-align: center;
      padding: 1rem;
      font-size: 1.7rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1001;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      height: var(--header-height);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box; /* כלול פאדינג ובורדר בגובה */
    }

    .filters-wrapper {
      position: fixed;
      top: var(--header-height); /* מתחיל מתחת לכותרת */
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: #1e293b;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      padding: var(--filter-padding) 0; /* ריווח עליון ותחתון */
    }

    .filters-row {
      display: flex;
      flex-wrap: nowrap; /* מונע מעבר שורה של כפתורים */
      gap: 0.5rem;
      padding: 0 0.5rem; /* ריווח בצדדים */
      justify-content: center;
      overflow-x: auto; /* מאפשר גלילה אופקית לפילטרים */
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none; /* הסתרת סרגל גלילה ב-Firefox */
    }

    /* הסתרת סרגל גלילה ב-Webkit (Chrome, Safari) */
    .filters-row::-webkit-scrollbar {
      display: none;
    }

    .filters-row button {
      flex-shrink: 0;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 999px;
      font-size: 0.85rem;
      cursor: pointer;
      white-space: nowrap;
      color: white;
      transition: background-color 0.2s ease, transform 0.1s ease;
    }
    .filters-row button:active {
      transform: scale(0.95);
    }
    /* צבעים לכפתורים - לכל כפתור בנפרד */
    .filters-row button[data-tag="חמוץ מרתק"] { background-color: var(--blue-light); color: #000; }
    .filters-row button[data-tag="עור ועץ"] { background-color: var(--brown); }
    .filters-row button[data-tag="חמוץ"] { background-color: var(--green); color: #000; }
    .filters-row button[data-tag="מרענן"] { background-color: var(--mint); color: #000; }
    .filters-row button[data-tag="מתוק"] { background-color: var(--orange); color: #000; }
    .filters-row button[data-tag="מזרחי"] { background-color: var(--burgundy); }
    .filters-row button[data-tag="פרחוני"] { background-color: var(--pink); color: #000; }
    .filters-row button[data-tag="פירותי"] { background-color: var(--purple); }
    .filters-row button[data-tag="אוריינטלי"] { background-color: var(--beige); color: #000; }
    .filters-row button[data-tag="גורמה"] { background-color: var(--red); }
    .filters-row button[data-tag="הדרי"] { background-color: var(--lime); color: #000; }
    .filters-row button[data-tag="extrit"] { background-color: var(--black); }
    .filters-row button.all-btn { background-color: #6b7280; } /* צבע לכפתור 'הצג הכל' */

    .container {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* 3 עמודות קבועות בכל גודל מסך */
      gap: 0.5rem;
      /* חישוב הריווח העליון: גובה כותרת + גובה 2 שורות פילטר + ריווח בין שורות הפילטר + ריווח פנימי */
      padding-top: calc(var(--header-height) + (2 * var(--filter-row-height)) + (2 * var(--filter-padding)) + 1rem); /* 1rem ריווח נוסף */
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-bottom: 1rem;
    }
    .card {
      background-color: #1f2937;
      border-radius: 1rem;
      overflow: hidden;
      transition: transform 0.2s ease;
      display: flex;
      flex-direction: column;
      aspect-ratio: 1/1;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
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

    /* התאמות ספציפיות למובייל, אם כי ה-grid נשאר 3 עמודות */
    @media (max-width: 768px) {
      header {
        font-size: 1.4rem;
        padding: 0.6rem;
        height: 3.8rem; /* התאמת גובה הכותרת במובייל */
        --header-height: 3.8rem;
      }
      .filters-wrapper {
        top: var(--header-height);
        padding: 0.4rem 0; /* הקטנת ריווח של wrapper במובייל */
      }
      .filters-row {
        gap: 0.3rem;
        padding: 0 0.4rem;
      }
      .filters-row button {
        padding: 0.4rem 0.8rem;
        font-size: 0.75rem;
      }
      .container {
        /* חישוב מחדש של הריווח העליון עבור גבהים מותאמים למובייל */
        padding-top: calc(var(--header-height) + (2 * var(--filter-row-height)) + (2 * var(--filter-padding)) + 0.8rem);
        gap: 0.4rem;
      }
      .card {
        border-radius: 0.7rem;
      }
      .card-content {
        padding: 0.4rem;
      }
      .code {
        font-size: 0.85rem;
        margin-bottom: 0.2rem;
      }
      .tag {
        font-size: 0.55rem;
        padding: 0.15rem 0.4rem;
      }
    }

    /* התאמות למסכים קטנים מאוד - 3 עמודות עלולות להיות צפופות */
    @media (max-width: 480px) {
      .filters-row button {
        font-size: 0.65rem; /* הקטנה נוספת של כפתורים במסכים קטנים */
        padding: 0.3rem 0.6rem;
      }
      .code {
        font-size: 0.75rem;
      }
      .tag {
        font-size: 0.5rem;
      }
    }
  </style>
</head>
<body>
<header>הבשמים של MAD</header>
<div class="filters-wrapper">
  <div class="filters-row" id="filters-row-1"></div>
  <div class="filters-row" id="filters-row-2" style="margin-top: 0.5rem;"></div> </div>
<div class="container" id="products"></div>
<script>
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/1d5jClsyzy2inAoTbQIfxAZ65FjsmfSsQj6OGGs5YGVA/gviz/tq?tqx=out:json';
  const categories = [
    'חמוץ מרתק','עור ועץ','חמוץ','מרענן','מתוק','מזרחי',
    'פרחוני','פירותי','אוריינטלי','גורמה','הדרי','extrit'
  ];

  function renderFilterButtons() {
    const filterRow1 = document.getElementById('filters-row-1');
    const filterRow2 = document.getElementById('filters-row-2');
    const half = Math.ceil(categories.length / 2); // לחלק לקרוב לחצי

    categories.forEach((cat, index) => {
      const btn = document.createElement('button');
      btn.textContent = cat;
      btn.dataset.tag = cat;
      btn.onclick = () => filterBy(cat);
      if (index < half) {
        filterRow1.appendChild(btn);
      } else {
        filterRow2.appendChild(btn);
      }
    });

    // הוספת כפתור "הצג הכל" לשורה השנייה או הראשונה אם יש רק שורה אחת
    const allBtn = document.createElement('button');
    allBtn.textContent = 'הצג הכל';
    allBtn.classList.add('all-btn'); // הוספת קלאס לצביעה קלה
    allBtn.onclick = () => filterBy('all');
    if (categories.length > 0) {
      filterRow2.appendChild(allBtn); // תמיד בשורה השנייה אם קיימת
    } else {
      filterRow1.appendChild(allBtn); // אם אין קטגוריות, אז בשורה הראשונה
    }
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
    .catch(error => console.error('Error fetching data:', error));
</script>
</body>
</html>
