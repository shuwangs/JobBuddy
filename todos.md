# JobBuddy Project Roadmap 🚀

## Phase 1: Frontend Initialization (The "Face") 🎨
- [ ] **Fix Backend CORS**
    - [X] Modify `WebConfig.java`: Change allowed origin to `http://localhost:5173` (Vite default).
- [ ] **Setup React Environment**
    - [X] Install dependencies: `npm install axios react-router-dom tailwindcss postcss autoprefixer`

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
- [X] **Backend Deployment**
    - [X] Create `Dockerfile` for Spring Boot (optional but recommended).
    - [X] Deploy to  or **Render** (Java environment).
    - [X] Set environment variables (Prod DB URL, CORS origins).
- [X] **Frontend Deployment**
    - [X] Deploy Vite project to **Vercel** or **Netlify**.
    - [X] Update Frontend API calls to point to production Backend URL.


## Phase 4: Chrome Extension
- [X] **Extension Configuration**
    - [X] Create `manifest.json` in `public/` folder (define permissions: `activeTab`, `storage`).
    - [X] Add "Parse Current Tab" button logic in React.
- [X] **Build & Test**
    - [X] Test parsing a real LinkedIn/Indeed page.

## Phase 5: User Data Isolation & Security (The "Vault") 
- [ ] Database Schema Upgrade
    - [ ] Add user_id column to the jobs table (Foreign Key to users table).
    - [ ] Set up JPA relationships: Add @ManyToOne in Job.java and @OneToMany in User.java.

- [ ] Backend Authorization Logic
    - [ ] Extract User Identity: Update JobController.java to extract the userId or username from the Authentication object (Principal).
    - [ ] Secure Querying: Modify JobRepository to include findByUserId(Long userId) to ensure users can't fetch others' data.

- [ ] Ownership Verification: Implement a check in Update and Delete methods to verify the requester owns the job record.

- [ ] Frontend & Extension Sync
     - [ ] Automatic Association: Ensure the POST /api/jobs request from the Extension doesn't need to pass a userId; the backend should handle this via the JWT.
    - [ ] UI Personalized View: Update Dashboard.jsx to display a "Welcome, {username}" message using the decoded JWT payload.

- [ ] User Management Finalization
    - [ ] Real Signup Integration: Connect Signup.jsx to POST /api/auth/signup and handle duplicate user errors.
    - [ ] Token Expiration Handling: Add an Axios Interceptor to automatically redirect to /login if a 401 Unauthorized is received.

## RoadMaps
|Phase.  |	Description         	    | Status  |
|:-------|:----------------------------|:------:|
|Phase 1 |	Frontend Initialization	   | 🟢 Done|
|Phase 2 |	Data Persistence (Postgres)| 🟡 In Progress|
|Phase 3 |	Deployment (Vercel/Render) | 🟢 Done|
|Phase 4 |  Chrome Extension & SSO	   |🟢 Done|
|Phase 5 |	User Data Isolation	       | 🔴 Next Step|