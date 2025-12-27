# AI-Powered College Placement Portal – Master Notes

## Project Overview

The traditional college placement process is highly manual, time-consuming, and inefficient.
This project aims to build an AI-powered placement portal that automates resume screening,
skill extraction, eligibility checking, and student–job matching.

The system provides role-based dashboards for students and placement admins,
and uses an AI microservice for intelligent matching.

---

## Tech Stack

- Frontend: React + Tailwind CSS
- Backend: Node.js + Express (CommonJS)
- Database: MongoDB (Atlas)
- Authentication: JWT + Role-Based Access
- AI Service: Python (FastAPI/Flask – planned)
- Design: Figma (Student & Admin dashboards)

---

## User Roles

### Student

- Register & Login
- Upload resume
- View extracted skills
- View eligible jobs
- See AI match score
- Track application status

### Placement Admin

- Manage students
- Manage job postings
- View applicants
- Trigger AI matching
- Finalize selections

### Company (Future Phase)

- Post jobs
- View shortlisted candidates

---

## Database Design (MongoDB)

### users

Purpose: Authentication and role management
Fields:

- name
- email (unique)
- password (hashed)
- role (student | admin | company)
- isActive
- createdAt

### studentProfiles

Purpose: Student academic and resume data
Fields:

- userId (ref: users)
- resumeUrl
- extractedSkills []
- education
- experience
- projects
- createdAt
- updatedAt

### jobs

Purpose: Job postings and requirements
Fields:

- title
- description
- requiredSkills []
- minExperience
- eligibilityCriteria
- location
- status (open | closed)
- createdBy
- createdAt

### applications

Purpose: Track student job applications
Fields:

- studentId (ref: users)
- jobId (ref: jobs)
- status (applied | shortlisted | selected | rejected)
- appliedAt

### matchScores

Purpose: Store AI-based matching results
Fields:

- studentId (ref: users)
- jobId (ref: jobs)
- score
- matchedSkills []
- missingSkills []
- aiVersion
- createdAt

---

## Backend API Architecture

### Auth APIs

- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/me

### Student APIs

- GET  /api/student/profile
- PUT  /api/student/profile
- POST /api/student/resume
- GET  /api/student/dashboard

### Job APIs

- POST /api/jobs
- GET  /api/jobs
- GET  /api/jobs/:jobId
- PUT  /api/jobs/:jobId/status

### Application APIs

- POST /api/applications/apply
- GET  /api/applications/student
- GET  /api/applications/job/:jobId
- PUT  /api/applications/:applicationId/status

### AI Matching APIs

- POST /api/ai/match/job/:jobId
- GET  /api/ai/match/job/:jobId
- GET  /api/ai/match/student/:studentId

### Admin APIs

- GET /api/admin/students
- GET /api/admin/student/:studentId
- GET /api/admin/jobs
- GET /api/admin/job/:jobId/applications
- PUT /api/admin/application/:applicationId/finalize

---

## Backend Implementation Status ✅

- Express server setup
- MongoDB Atlas connected
- User model with password hashing
- Register API
- Login API with JWT
- Clean GitHub repository

---

## Next Steps

- JWT Auth Middleware
- Protected routes
- Student profile APIs
- Resume upload & AI integration
- Frontend (React + Tailwind)
- Figma UI/UX design

---

## Key Learning Outcomes

- Real-world backend architecture
- Secure authentication system
- MongoDB schema design
- Git & GitHub best practices
- Debugging production-level issues
