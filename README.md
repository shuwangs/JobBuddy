# JobBuddy
JobBuddy is a lightweight tool that helps job seekers track applications, monitor status updates, and manage their job search efficiently.


## ✨ Key Features
* **Smart Job Scraper**: A Chrome extension that intelligently extracts job titles, company names, and URLs directly from active browser tabs.
* **Seamless SSO Experience**: Implements a Single Sign-On (SSO) flow using JWT token passing via URL parameters, enabling one-click navigation from the extension to the web dashboard without re-authentication.
* **Multi-User Data Isolation**: Backend logic ensures data privacy by associating job records with specific User IDs, allowing users to only access their own application history.
* **Production-Ready Routing**: Configured with custom server-side rewrites via `vercel.json` to support React's client-side routing, preventing 404 errors during direct URL access or redirects.

## 🛠️ Tech Stack
### Frontend & Extension
* **React.js**: Powering the responsive and dynamic User Dashboard.
* **Chrome Extension API**: Utilizing Content Scripts for DOM parsing and Popup scripts for authentication management.
* **Axios & Fetch API**: Handling RESTful communication between the client and the Spring Boot API.

### Backend
* **Java Spring Boot**: Providing a robust and scalable REST API architecture.
* **Spring Security & JWT**: Ensuring secure authentication and state-less session management.
* **Spring Data JPA**: Orchestrating database persistence and complex queries.
* **Relational Database**: Storing user accounts and job application data securely.