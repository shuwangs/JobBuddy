# JobBuddy Project Roadmap 🚀

## Phase 1: Frontend Initialization (The "Face") 🎨
- [ ] **Fix Backend CORS**
    - [X] Modify `WebConfig.java`: Change allowed origin to `http://localhost:5173` (Vite default).
- [ ] **Setup React Environment**
    - [X] Install dependencies: `npm install axios react-router-dom tailwindcss postcss autoprefixer`
    - [ ] Configure `tailwind.config.js` (add content paths).
    - [ ] Add Tailwind directives to `index.css`.
- [ ] **Develop Core Components**
    - [X] Create `components/AddJobForm.jsx` (Input URL -> Call `/api/jobs/parse` -> Save).
    - [X] Create `components/JobBoard.jsx` (Fetch `/api/jobs` -> Render list/table).
    - [ ] Setup Routing in `App.jsx` (`/` for board, `/add` for adding).

## Phase 2: Data Persistence (The "Memory") 🧠
- [ ] **Migrate to PostgreSQL**
    - [ ] Install PostgreSQL (local or Docker).
    - [ ] Create database: `createdb jobbuddy`.
- [ ] **Configure Spring Boot**
    - [ ] Update `pom.xml` (ensure Postgres driver is present).
    - [ ] Update `application.properties`:
        - Change driver to `org.postgresql.Driver`.
        - Update URL to `jdbc:postgresql://localhost:5432/jobbuddy`.
        - Set username/password.
    - [ ] Verification: Restart backend and ensure data survives a restart.

## Phase 3: Deployment (The "Launch") 🚀
- [ ] **Backend Deployment**
    - [ ] Create `Dockerfile` for Spring Boot (optional but recommended).
    - [ ] Deploy to **Railway** or **Render** (Java environment).
    - [ ] Set environment variables (Prod DB URL, CORS origins).
- [ ] **Frontend Deployment**
    - [ ] Deploy Vite project to **Vercel** or **Netlify**.
    - [ ] Update Frontend API calls to point to production Backend URL.

## Future / Nice-to-Have 🌟
- [ ] Add User Authentication (Spring Security + JWT).
- [ ] Implement Job Status Analytics (Charts/Graphs).
- [ ] Add "Reminders" for follow-up emails.

## Phase 4: Chrome Extension (Nice to have) 💰
- [ ] **Extension Configuration**
    - [ ] Create `manifest.json` in `public/` folder (define permissions: `activeTab`, `storage`).
    - [ ] Add "Parse Current Tab" button logic in React.
- [ ] **Build & Test**
    - [ ] Run build: `npm run build`.
    - [ ] Load unpacked extension in Chrome (`chrome://extensions`) pointing to `dist/` folder.
    - [ ] Test parsing a real LinkedIn/Indeed page.

| Pages           | API                         |
| --------------- | --------------------------- |
| Login           | `POST /api/auth/login`      |
| Signup          | `POST /api/auth/signup`     |
| Dashboard       | `GET /api/jobs`             |
| Add Job (Parse) | `POST /api/jobs/parse`      |
| Add Job (Save)  | `POST /api/jobs`            |
| Update Status   | `PUT /api/jobs/{id}/status` |
| Delete          | `DELETE /api/jobs/{id}`     |
