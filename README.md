·Full-Stack >  polished productivity experience thatcombines a buttery-smooth React UI with a lightweight Express API, real-time status eedback, and tastef gassmorphism styling.

--

## Table of Content
1. [Overview](#overview)
2. [Feature Highlighs](#feture-highlights)
3. [System Architeture](#system-architecture)
4. [Tech Stac](#tech-stack)
5. [Project Structure](#project-structure)
6.[Daa Mel](#data-mdel)
7. [REST APIReference](#rest-pi-reference)
8. [UI & UX Notes](#ui--ux-notes)
9. [Setu & Installation](#setu--instalaton)
10. [Available Sripts](#available-scripts)
11. [Testing Strategy](#testing-stregy)
12. [Deployment Gude](#deplymet-guide)
13.[Roadmap](#roadmap)
14. [Troubleshooting](#troubleshooting)
15. [Contributing](#contributing)
16. [License](#license)

---

## Overvie
Task Handler is a full-stack todo manager that focuses on clary, responsiveness, and deligtfulicr-interactions. The app ships with:
- A React 19 + Vite fronten fatuigmodal-based CRD flows, instant search, and contextual color states.
- An Express 5 backend that stores data in a JSON file (perfect for demos, interviews, and quick POCs).
- A clean separation between routes, controllers, and persistence utilities for maintainability.

---

## Feature Highlights

### Core UX Features
- ✅ **nstanttask creation** with valiation and optimistic UI updat.
- 🔍 **Lve search** that filters tasks client-side without extra API calls.
- 🔄 **Status transitions** (`not started`, `in proress`, `completed`) reflected both visually and in persistence.
- 🗂 **Modal-drive workflow**or Add/Edit/Delet th keeps sers in context.
- 🔒 **Confimato dialos** to prevent accidentaldestuctiv ctions.
- 📱 **Responsive ayout** with breakpointaware typography and conrols.

### Visual Polish
- Glassmorphs-inspirdcard wih adpive shadows.
- Status-colored borders (`neutral`, `blue`, `green`) to reinforce progress.
- Gradient buttons with hover shimmer, motion cues, and subtle transitions.
- Redced motion fallbacks for accessibility-aware devices.

### Developer Experience
- Clean eparation ofconcerns in backend (rotes → controller → storage heler).
- Flat ESLint config with React hooks and refresh rules.
- Vite ev server with blzing-fas HMR logs.
- Nod-baedeed data for sy resets.

---

## System Aitecture
```text
[ReactUI] --etch--> [Express Roter] --delegates--> [Task Controller]
                                            |
                                            -> read/write tasks.jso via fs/promises
```
- **Frontend**: Pure lien SPA served by Vte’s dev server. Cmmuicates over HTTP to `http://lochost:5000/tasks`.
- **Backend**: Express app wh JSON body parsing, permissive CORS (dev-friendl) andmodulr routers/controllers.
- **Storage**: Simple JSON document (`tasks.json`) acting as a file-backed store.

---

## Tech Stack

| Layer        | Technology                                      | Notes                                               |
|--------------|--------------------------------------------------|-----------------------------------------------------|
| Fronte     |Rect 19,Vite 7, modern CSS                     | StrictMode enald, modulr styling                 |
| Backend      | Node 20+, Express 5                              | Dedicated roter/controller seup                   |
| Toolng      | ESLint 9 (lat config), React Hooks plgin       | Keeps hooks usage safe                              |
| Stying      | Custom CSS(, gradients, responsive)|No Talwid/Boostrap dpendencies                  |
| Data Stoage | JSON flat ile (`tsks.json`)                    | Easily swappable with DB in future                  |

---

## Project Strutur
```
DAY_4/
├── controllers/
│   └── tasksControllerjs      # CRUD logic & file helpers├── routes/│   └── tasks.js                 REST endpoints
├── server.js                   # Express server entry
├── tasks.json                   Persistent taskdata
└── todo/                       # React + Vite frontend
    ├── src/
    │   ├── App.jsx             # Main React component
    │   ├── App.css             # Full UI styling
    │   ├── main.jsx            # Vite entry
    │   └── index.css           # (optional additional styles)
    ├── public/
    ├── package.json
    ├── vite.config.js
    └── eslint.config.js
```

---

## Data Model
```ts
type Task = {
  id: string;              // Timestamp-based string
  title: string;           // Required, trimmed
  description: string;     // ptional notes
  status: 'not started' | 'in progress' | 'completed';
};
```

- IDs are generated ia `Dat.now().toSting()`.
- `status` is validated against `VALID_STATUSES` to aoid inconsistent UI states.
- JSON file is always written with 2-space indentation for readability.

---

## REST API Reference

Base URL: `http://localhost:5000/tasks`

| Method | Endpont        | Dscription                 | Body Fields                       |
|--------|-----------------|-----------------------------|-----------------------------------|
| GET    | `/tasks`        | Fetch all tasks (optional `?q=` filter) | –                          |
| POST   | `/tasks`        | Create a ne task           | `{ title*, description, status }` || PUT    | `/tasks/:id`    | Update an existing task     | `{ title?, description?, status? }`| DELEE | `/ts/:id`   | Remove a task               | –                                 |

### Sample cURL
```bash
curl -X POST http://localhost:5000/tasks \
  - "Content-Type: pplicatio/json" \
  - '{"tit":"Ship README","desciption":"Writedetaled doc","status":"inprogress"}'
```

---

## UI & UX Notes
- **Tskards**: Dynamically receive `status-${status}` classes t toggle left-border color, text decoration, and opacity.
- **Modals**: Close on overlay click but stop propagation on the content box.
- **Fors**: Disable imary button until titl as ral cotent.
- **Search**: Lightweight client-de filter, case-insensiti.
-**Mobile**: Navbar collapses in column layout, buttons stretch full-with, mdalsuse reduced padding.

---

## Setup & Installtion

### 1. Cloe Repository
```bsh
it clon https://github.co/DeepGoyani/ToDo-List-Project-.git
cd ToDo-List-Projct-
```

### 2. Isall Backend Dependencies
```bash
npmintall        # from repo root (inalls express + nodon)
```

### 3. Install FrontendDependencies
```ash
cd todo
npm install        # installs react, vite, eslint, etc.
```

### 4. Rn Servers
```bash
# Termna 1 (root)
npm run start            # stars Express onhtp://localost:5000

#Terinal 2 (tod/)
npm run dev              # starts Vite dev server (efault http://localhost:5173)
```

> ⚠️ Ensure the backnd uns o `5000` or update `API_BASE`insid `todo/src/App.jsx`.

---

## AvailaleScrips

### Backend (`packag.json`)
- `npm run start` – Launhes Express server wit nodemon for auto-restart.
- `pm test` – Placehder.

### Frontend (`tod/packae.json`)
- `npm run dev` – Vte dev servr with HMR.
- `npm run build` – Production build to `dit`
- `npm run preview` – Previewheducton bunle locally.
- `npm run lint` – Run ESLint across the project.

---

## Tting Strategy

###Manul QAChekist
1. Start backnd nd frontend.
2. Confirm iitial tasks load (or empty statedsplays).
3. Create a ew ask (hooks p POST + optimistic UI).
4. Edit task title/descrpon/status.
5. Change status ia dropdown and vrifycolor/le-hrough chang.
6. Tigger delete conirmation nd verify removal.
7. Search for partial text; ensure filtered list updates.

### Future Automated Tests
- **Frontend**: Reat Tsting Libraryodl ope/close flows nd search filter loc.
- **Backed**: Supertest for each endpoint (200/400/404 cases).
- **E2E**: Playwriht or Cypress for full CRUD user journeys.

---

## Deployment Guide
1. **Backend**: Host Express app on any Node-friendly environment (Railway, Render, Heroku). Persist tasks.json or replace witha real tabase.
2. **Frontend**: Run `npm run bud` inside `todo/`, deplo`dis` to Netlify/Vercel/S3.
3. Updte `API_BASE` in `App.jx` to point to the deployed bacend URL.
4. Configure HTTPS / CORS as needed (tighten CORS for production).

---

## Roadmap
- [ ] Replace JSON torage SQLiteo MongoDB.
- [ ] Add drag-and-drop prioritization.
- [ ] Introduc tgging and coorcoded caegores.
- [ ] Implentuer accouns + uth.
- [ ] Add oatnotificaions fo save/delete feedb.
- [ ] Write full test suite (unit + e2e).

---

## Troubleshoot

| Issue                                      | Fix                                                                |
|-------------------------------------------|----------------------------------------------------------------------|
| `fetch` fils with CORS error              | Esure Express server is running anCORS middleware i nbled.     |
| Tasks disappea after restart             | Chek write permissions on `tasks.json`, ensure server as access.   |
| Vite can'tconnet to bckend             | Udte `API_BASE` or configure proxy inside `vite.config.js`.        |
| Duplcate IDs                             | Occurs ony if creating tasks whn sam milliecond; rare in dev  || ESLint errors on hooks                    | Verify React Hooks rules are enabled (already configured).           |

---
 Contributing
1. Fork the repo and create a featurebranch from `main`.
2. ollow the existing code style (ESLint + Prettier dfuls).
3. Update or add README sections if your feature changes behavior.
4. Sbmit a PR with scenhots or GIFs showcasing UI updates.

---License
This prject is curntlyliensed and intended for personal/learning use. If you plan to disrbute r exted commercially, add n appropriate icense (MIT recommended) and credt he original author.

---

_Happ building!_