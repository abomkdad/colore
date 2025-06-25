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
      --filter-button-height: 2.5rem; /* גובה משוער לכפתור פילטר */
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
      box-sizing: border-box;
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
      max-height: 50vh; /* מגביל את גובה אזור הפילטרים אם יש הרבה שורות */
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .filters-wrapper::-webkit-scrollbar {
      display: none;
    }

    .filters-row {
      display: flex;
      flex-wrap: wrap; /* מאפשר לכפתורים לשבור שורה! */
      gap: 0.5rem;
      padding: 0 0.5rem; /* ריווח בצדדים */
      justify-content: center;
      /* הסרנו את margin-bottom קבוע, ננהל אותו אחרת */
    }
    /* נוסיף ריווח בין שורות הפילטרים רק אם יש יותר משורה אחת */
    .filters-row + .filters-row {
        margin-top: 0.5rem; /* רווח בין שורה לשורה */
    }


    .filters-row button {
      flex-shrink: 0;
      padding: 0.8rem 1.4rem; /* הגדלה משמעותית של הפאדינג לכפתורים */
      border: none;
      border-radius: 999px;
      font-size: 1rem; /* הגדלה משמעותית של גודל הפונט לכפתורים */
      cursor: pointer;
      white-space: nowrap;
      color: white;
      transition: background-color 0.2s ease, transform 0.1s ease;
      min-width: 90px; /* רוחב מינימלי לכפתור */
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
    .filters-row button.all-btn { background-color: #6b7280; }

    .container {
      display: grid;
      /* ברירת מחדל: 3 עמודות למסכים גדולים */
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      padding-top: calc(var(--header-height) + 120px); /* גובה התחלתי משוער, יעודכן ע"י JS */
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

    /* התאמות למסכים בינוניים (טאבלטים במצב פורטרט, טלפונים גדולים) */
    @media (max-width: 768px) {
      header {
        font-size: 1.4rem;
        padding: 0.6rem;
        height: 3.8rem;
        --header-height: 3.8rem;
      }
      .filters-wrapper {
        padding: 0.4rem 0;
      }
      .filters-row {
        gap: 0.4rem;
        padding: 0 0.4rem;
      }
      .filters-row + .filters-row {
          margin-top: 0.4rem;
      }
      .filters-row button {
        padding: 0.7rem 1.2rem; /* פאדינג נוח יותר */
        font-size: 0.9rem; /* גודל פונט נוח יותר */
        min-width: 80px;
      }
      .container {
        grid-template-columns: repeat(2, 1fr); /* 2 עמודות לרוב המוביילים */
        gap: 0.4rem;
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

    /* התאמות למסכים קטנים מאוד (טלפונים ישנים/צרים) */
    @media (max-width: 480px) {
      .filters-row button {
        font-size: 0.8rem; /* קצת יותר קטן אבל עדיין קריא ונוח */
        padding: 0.6rem 1rem;
        min-width: 70px;
      }
      .container {
        grid-template-columns: 1fr; /* עמודה אחת למסכים קטנים מאוד */
        gap: 0.3rem;
      }
      .code {
        font-size: 0.85rem;
      }
      .tag {
        font-size: 0.55rem;
      }
    }
  </style>
</head>
<body>
<header>הבשמים של MAD</header>
<div class="filters-wrapper">
  <div class="filters-row" id="filters-row-1"></div>
  <div class="filters-row" id="filters-row-2"></div>
</div>
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
    const half = Math.ceil(categories.length / 2);

    // Clear previous buttons to avoid duplicates on re-render if any
    filterRow1.innerHTML = '';
    filterRow2.innerHTML = '';

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

    const allBtn = document.createElement('button');
    allBtn.textContent = 'הצג הכל';
    allBtn.classList.add('all-btn');
    allBtn.onclick = () => filterBy('all');
    filterRow2.appendChild(allBtn); // הוסף תמיד לשורה השנייה

    updateContainerPadding(); // קרא לפונקציה לעדכון הריווח לאחר יצירת הכפתורים
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

  function updateContainerPadding() {
    const headerHeight = document.querySelector('header').offsetHeight;
    const filtersWrapperHeight = document.querySelector('.filters-wrapper').offsetHeight;
    const productsContainer = document.getElementById('products');
    // הוסף קצת ריווח נוסף מעבר לגובה המדויק
    productsContainer.style.paddingTop = `${headerHeight + filtersWrapperHeight + 15}px`;
  }

  // הקשבה לאירוע שינוי גודל חלון כדי לעדכן את הריווח במידת הצורך
  // ודא שהעדכון מתבצע לאחר שהדפדפן סיים לסדר את ה-layout
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateContainerPadding, 100); // השהיה קצרה לביצוע אופטימלי
  });
  // קריאה ראשונית כשכל התוכן נטען
  window.addEventListener('load', updateContainerPadding);


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
