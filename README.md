# evannvsl — Portfolio (React)

Portfolio Persona 5 themed, dibangun dengan **React + Vite**.

## Cara Menjalankan

```bash
npm install
npm run dev       # development server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview hasil build
```

## Struktur Folder

```
├── index.html                 # Entry HTML (Vite)
├── vite.config.js
├── package.json
├── public/
│   └── assets/                # Gambar & font statis (img/, font/)
└── src/
    ├── main.jsx               # React entry
    ├── App.jsx                # Router (/, /projects)
    ├── pages/
    │   ├── HomePage.jsx       # Beranda (Hero, About, Portfolio, Skills, QnA, Contact)
    │   └── ProjectHistoryPage.jsx  # Halaman project history + search/filter
    ├── components/
    │   ├── common/            # SplitWords dll (komponen reusable)
    │   ├── layout/            # Preloader, Cursor, Background, Ticker, BattleTransition, Footer
    │   ├── home/              # Section komponen beranda (Hero, About, Portfolio, Skills, Chat, Contact, SkillPopup)
    │   └── project/           # Komponen halaman project (TopBar, Hero, CategoryBlock, Modal, CloseTransition)
    ├── hooks/                 # Custom hooks (useReveal, useCursor, useMagnetic, dll)
    ├── utils/                 # scramble.js, transitions.js (battle transition)
    ├── data/                  # Data proyek, skills, chat, ticker
    └── styles/                # Seluruh CSS (base, layout, components/)
```

## Routing

- `/` — Beranda
- `/projects` — Project History (support query `?id=X` / `?cat=code`)
