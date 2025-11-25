# JobBuddy - Intelligent Job Application Tracker

## 1. Background & Problem Statement
**Context:** Job seekers currently apply to dozens of jobs across different platforms (LinkedIn, Indeed, Company Sites).
**Problem:** Tracking these applications is manual and tedious. Candidates usually copy-paste data into Excel sheets, which is time-consuming and prone to formatting errors. 
**Opportunity**  
A tool that allows users to:
1. **Paste a job URL to automatically extract key job details** (job title, company name, location, etc.), and  
2. **Track the full application lifecycle** (from wishlist to offer/rejection),

will significantly reduce administrative overhead and help job seekers focus on high-value activities (preparing for interviews, tailoring resumes, etc.).

---

## 2. Goals & Success Metrics
### Primary Goal (MVP)
Build a Minimum Viable Product (MVP) that allows users to:
- Paste a job link
- Automatically pre-fill basic job information
- Save the job as a record
- Update and view application status over time

### Success Metrics

- ✅ **Parsing Accuracy**: System successfully parses at least **Job Title** and **Company Name** , etc from **≥ 80%** of supported URLs (LinkedIn, Indeed, generic job posting pages).
- ✅ **Usability**: A user can add a new job (via link parsing or manual entry) in **under 15 seconds**.
- ✅ **Tracking**: A user can see all of their saved applications and corresponding statuses in a single dashboard view.

---

## 3. Functional Requirements
| **Feature**            | **Description**                                                                                                                                            | **Priority** |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------:|
| Link Parsing           | Backend accepts a URL string, fetches the HTML, and extracts job information (at minimum: job title and company name) from the `<title>` or metadata tags. | P0           |
| Job Creation           | API to create a new job record with fields such as `title`, `company`, `url`, `status`, and optional `location`, `notes`.                                  | P0           |
| Status Management      | Support a fixed set of application statuses: `WISHLIST`, `APPLIED`, `INTERVIEWING`, `OFFER`, `REJECTED`. Users can update status over time.                | P0           |
| Dashboard View         | API to retrieve all saved jobs and return them in a list suitable for rendering in a dashboard (e.g., table view with sorting/filtering in the future).    | P0           |
| Manual Job Creation    | Allow users to create a job record **without** URL parsing by manually entering job fields (title, company, status, etc.).                                 | P0           |

---

## 4. Nice-to-Have (Future)
- Parsing additional fields from the job link (location, salary, employment type, description snippet).
- Search and filter on the dashboard (by company, status, date applied).
- Timeline/history of status changes for each application.
- Authentication and multi-user support.
- Resume–JD matching and skill gap analysis.
