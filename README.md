# 🏫 School Student Record Management System (SRM)

A production-quality, web-based **School Student Record Management System** built with **React.js**, **Bootstrap 5**, **Node.js**, **Express.js**, **Prisma ORM**, and **MySQL** (architected for seamless future migration to **PostgreSQL**).

The platform manages student academic lifecycles from **LKG, UKG, Standard 1 through Standard 12** across multiple divisions (**A, B, C, D**) without table duplication or schema redundancies.

---

## 📑 Table of Contents

- [Key Highlights & Architecture](#-key-highlights--architecture)
- [Technology Stack](#-technology-stack)
- [Folder Structure](#-folder-structure)
- [Relational Database Design](#-relational-database-design)
- [Role & Permission System](#-role--permission-system)
- [Teacher Scope-Based Authorization](#-teacher-scope-based-authorization)
- [WhatsApp Notification Service](#-whatsapp-notification-service)
- [Audit Logging System](#-audit-logging-system)
- [Installation & Quick Start](#-installation--quick-start)
- [Environment Configuration](#-environment-configuration)
- [Default Login Credentials](#-default-login-credentials)
- [API Overview](#-api-overview)
- [Future PostgreSQL Migration Guide](#-future-postgresql-migration-guide)
- [Testing & Verification Checklist](#-testing--verification-checklist)

---

## 🌟 Key Highlights & Architecture

- **Normalized Database Design**: Reusable entities (`academic_years`, `standards`, `divisions`, `classes`, `student_enrollments`, `marks`, `student_fees`) ensure zero table duplication across grades and divisions.
- **Layered Decoupled Architecture**:
  $$\text{React SPA} \longrightarrow \text{REST API} \longrightarrow \text{Auth/Scope MW} \longrightarrow \text{Controllers} \longrightarrow \text{Services} \longrightarrow \text{Prisma ORM} \longrightarrow \text{MySQL}$$
- **Granular Permissions & Scope Checking**: Admins can grant/revoke specific module permissions (e.g. `MARKS_UPDATE`, `STUDENT_CREATE`, `NOTIFICATION_SEND`) to individual teachers. Backend authorization strictly checks if the teacher is assigned to that specific class and subject before permitting any edits.
- **Pluggable WhatsApp Notifications**: Provider abstraction supporting local simulated dispatch logs as well as Meta WhatsApp Business Cloud API.
- **Audit Logging**: Automatic capture of previous state (`old_data`) and updated state (`new_data`) in JSON format with timestamps, IP addresses, and acting user IDs.
- **Responsive UI/UX**: Crafted with modern Bootstrap 5 styling, clean slate/navy palette, elevation cards, responsive tables, real-time matrix grading, and 7-tab student profiles.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React.js 18 + Vite
- **Styling**: Bootstrap 5.3 + Bootstrap Icons + Custom CSS Design System
- **Routing**: React Router v6 (with `ProtectedRoute` and `RoleRoute` guards)
- **Networking**: Axios (with centralized JWT interceptors and error handlers)
- **State Management**: Context API (`AuthContext`, `AcademicContext`, `ToastContext`)

### Backend
- **Runtime**: Node.js
- **Server**: Express.js
- **ORM / Abstraction**: Prisma ORM 5.22
- **Database**: MySQL 9.6 (relational schema portable to PostgreSQL)
- **Authentication**: JSON Web Tokens (JWT) + bcryptjs password hashing
- **Validation**: Zod schema validation + Scope middleware

---

## 📂 Folder Structure

```
SRM/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma              # Normalized Prisma schema for MySQL
│   │   └── seed.js                    # Rich database seed script
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.js                 # Environment variable loader
│   │   │   └── prisma.js              # Prisma Client instance
│   │   ├── constants/
│   │   │   ├── permissions.js         # Granular permission definitions
│   │   │   ├── roles.js               # System roles (ADMIN, TEACHER)
│   │   │   └── status.js              # System statuses & enums
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js     # JWT verification & active user check
│   │   │   ├── permission.middleware.js # Granular permission validation
│   │   │   ├── scope.middleware.js    # Class & subject boundary checks
│   │   │   ├── validate.middleware.js # Zod validation middleware
│   │   │   └── error.middleware.js    # Centralized JSON error responder
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── user.service.js
│   │   │   ├── staff.service.js
│   │   │   ├── academic.service.js
│   │   │   ├── student.service.js
│   │   │   ├── subject.service.js
│   │   │   ├── assignment.service.js
│   │   │   ├── exam.service.js
│   │   │   ├── mark.service.js
│   │   │   ├── fee.service.js
│   │   │   ├── audit.service.js
│   │   │   ├── report.service.js
│   │   │   ├── dashboard.service.js
│   │   │   └── notification/
│   │   │       ├── whatsappProvider.interface.js
│   │   │       ├── mockWhatsAppProvider.js
│   │   │       ├── metaWhatsAppProvider.js
│   │   │       └── notification.service.js
│   │   ├── controllers/               # Express Controllers (14 modules)
│   │   ├── routes/                    # REST Route declarations (15 modules)
│   │   ├── utils/
│   │   │   ├── apiResponse.js         # Uniform JSON response structure
│   │   │   ├── password.js            # Password hashing utilities
│   │   │   └── logger.js              # Server logger
│   │   ├── app.js                     # Express app setup & CORS
│   │   └── server.js                  # Server entry & DB connection
│   ├── .env.example
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/                # Navbar, Sidebar, DataTable, SearchBar, Pagination, Badges
│   │   │   ├── layout/                # AppLayout, AuthLayout
│   │   │   ├── students/              # StudentFormModal, StudentEnrollModal, StudentProfileTabs
│   │   │   ├── marks/                 # MarksEntryGrid (Real-time auto-grading matrix)
│   │   │   ├── fees/                  # FeeCollectionModal, FeeAssignModal
│   │   │   ├── permissions/           # PermissionMatrix (Module-wise grouped matrix)
│   │   │   └── notifications/         # WhatsAppComposerModal (Live preview bubble)
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── AcademicContext.jsx
│   │   │   └── ToastContext.jsx
│   │   ├── services/                  # Axios API client services
│   │   ├── pages/
│   │   │   ├── auth/                  # LoginPage (with 1-click demo accounts)
│   │   │   ├── admin/                 # 18 Admin management screens
│   │   │   ├── teacher/               # 3 Scoped Teacher workspace screens
│   │   │   └── NotFoundPage.jsx
│   │   ├── styles/
│   │   │   ├── index.css              # Custom design system tokens
│   │   │   └── custom.css             # Component-specific styles
│   │   ├── App.jsx
│   │   ├── router.jsx                 # Route definitions & guards
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
├── package.json                       # Root workspace orchestrator
└── README.md
```

---

## 🗄 Relational Database Design

The database schema is fully normalized and avoids table-per-class or table-per-grade anti-patterns:

```mermaid
erDiagram
    users ||--o| staff : "profile"
    roles ||--o{ users : "assigned_role"
    users ||--o{ user_permissions : "has"
    permissions ||--o{ user_permissions : "granted"
    
    academic_years ||--o{ classes : "contains"
    standards ||--o{ classes : "defines"
    divisions ||--o{ classes : "defines"
    staff ||--o{ classes : "class_teacher"
    
    classes ||--o{ student_enrollments : "enrolls"
    students ||--o{ student_enrollments : "has_history"
    students ||--o{ student_parents : "linked_to"
    parents ||--o{ student_parents : "links"
    
    standards ||--o{ standard_subjects : "curriculum"
    subjects ||--o{ standard_subjects : "mapped_in"
    classes ||--o{ class_staff : "assigned"
    staff ||--o{ class_staff : "teaches"
    
    academic_years ||--o{ exams : "schedules"
    student_enrollments ||--o{ marks : "scores"
    exams ||--o{ marks : "tested_in"
    subjects ||--o{ marks : "for_subject"
    
    fee_types ||--o{ student_fees : "defines"
    student_enrollments ||--o{ student_fees : "incurred"
    student_fees ||--o{ fee_payments : "paid"
```

### Table Breakdown
1. `users`: Authentication credentials, passwords (hashed), activation flag, last login.
2. `roles`: Role definitions (`ADMIN`, `TEACHER`).
3. `permissions`: Module-categorized capabilities (`STUDENT_VIEW`, `MARKS_UPDATE`, etc.).
4. `user_permissions`: Granular overrides per teacher account.
5. `staff`: Staff employee profile, designations, departments, contact info.
6. `academic_years`: Academic sessions (e.g. `2025-26`, `2026-27`, `2027-28`).
7. `standards`: Grades `LKG`, `UKG`, `1` to `12` with sequence order.
8. `divisions`: Sections `A`, `B`, `C`, `D`.
9. `classes`: Composite unique representation ($\text{Academic Year} + \text{Standard} + \text{Division} = \text{Class}$).
10. `students`: Permanent demographic profile, admission number, blood group.
11. `parents`: Guardian details, verified WhatsApp contact numbers.
12. `student_parents`: Multi-parent link per student with `is_primary` and notification preferences.
13. `student_enrollments`: Yearly academic placement and roll number assignment.
14. `subjects`: Master catalog of curriculum subjects.
15. `standard_subjects`: Subject mapping to standard with maximum and pass mark requirements.
16. `class_staff`: Faculty assignments to classes and subjects with designated roles.
17. `exams`: Internal, Quarterly, Half-Yearly, and Annual assessments.
18. `marks`: Student scores, maximum marks, calculated letter grades, and teacher remarks.
19. `fee_types`: Fee heads (Tuition, Transport, Examination, Lab, Books).
20. `student_fees`: Invoiced fee allocations and real-time status (`PENDING`, `PARTIAL`, `PAID`, `OVERDUE`).
21. `fee_payments`: Payment transaction logs, receipts, payment modes (`CASH`, `UPI`, `BANK_TRANSFER`, `CHEQUE`, `CARD`).
22. `notifications` & `notification_logs`: WhatsApp dispatch records, message templates, provider message IDs.
23. `audit_logs`: JSON changelogs capturing sensitive data modifications across all entities.

---

## 🔐 Role & Permission System

The system evaluates authorization using a four-tier model:

$$\text{User} \longrightarrow \text{Role} \longrightarrow \text{Granular Permissions} \longrightarrow \text{Class \& Subject Scope}$$

- **ADMIN Role**: Automatically possesses full superuser privileges across all modules.
- **TEACHER Role**: By default possesses scoped viewing rights and can be granted specific permissions via the **Permissions Matrix**:
  - `STUDENT_VIEW`, `STUDENT_CREATE`, `STUDENT_UPDATE`, `STUDENT_DELETE`
  - `STAFF_VIEW`, `STAFF_CREATE`, `STAFF_UPDATE`
  - `ACADEMIC_MANAGE`, `CLASS_ASSIGN`, `EXAM_MANAGE`
  - `MARKS_VIEW`, `MARKS_CREATE`, `MARKS_UPDATE`
  - `FEES_VIEW`, `FEES_CREATE`, `FEES_UPDATE`, `PAYMENT_COLLECT`
  - `NOTIFICATION_SEND`, `NOTIFICATION_VIEW`, `REPORT_VIEW`, `AUDIT_VIEW`, `PERMISSION_MANAGE`

---

## 🎯 Teacher Scope-Based Authorization

Permissions alone are not enough. When a teacher accesses or updates student data or marks:
1. The backend inspects `req.user.staff_id`.
2. It queries `class_staff` to verify if the teacher is assigned to that specific `class_id` and `subject_id` (or is the assigned `CLASS_TEACHER`).
3. If unassigned, the request is rejected with `403 Forbidden: Access Denied: You are not assigned to this class/subject scope`.

---

## 💬 WhatsApp Notification Service

The notification system uses a pluggable provider pattern:
- **Mock Provider (`MOCK`)**: Formats messages, simulates delivery receipts, and writes full logs to `notifications` and `notification_logs`.
- **Meta WhatsApp Provider (`META`)**: Integrates with the official Meta WhatsApp Business Cloud API using `WHATSAPP_ACCESS_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID`.
- **Template Variables**: Dynamically interpolates `{parent_name}`, `{student_name}`, `{class_name}`, `{roll_number}` across broadcast or individual notifications.

---

## 🚀 Installation & Quick Start

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MySQL Server** (running locally on port `3306`)

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in the `backend/` directory:
```bash
cp backend/.env.example backend/.env
```
Update your MySQL credentials in `backend/.env`:
```ini
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/srm_db"
JWT_SECRET="srm_super_secret_jwt_key_2026_production_grade"
PORT=5000
```

### 3. Initialize Database Schema & Seed Data
Run the following commands from the root directory:
```bash
# Push schema to MySQL database
npm run prisma:push

# Populate database with complete demo data (Admin, 5 Teachers, 30 Students, Classes, Marks, Fees)
npm run prisma:seed
```

### 4. Run the Full Application
Start both backend and frontend servers:
```bash
# Terminal 1: Backend API Server (Port 5000)
npm run dev:backend

# Terminal 2: Frontend Vite App (Port 3000)
npm run dev:frontend
```

Open your browser and navigate to:
👉 **`http://localhost:3000`**

---

## 🔑 Default Login Credentials

| User Role | Username / Email | Password | Access & Scope Details |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@srm.edu` | `Admin@123` | Full superuser access to all modules, fees, permissions, and audit logs |
| **Teacher (Full Marks)** | `arun.teacher@srm.edu` | `Teacher@123` | Class Teacher for **10-A**; Math teacher for **10-A** & **10-B** (Can enter/edit marks) |
| **Teacher (View Only)** | `rajesh.teacher@srm.edu` | `Teacher@123` | English teacher for **10-A**; Has `MARKS_VIEW` only (Cannot edit marks) |
| **Teacher (Science)** | `priya.teacher@srm.edu` | `Teacher@123` | Science faculty for **10-A**, **11-A**, **12-A**; Has WhatsApp sending rights |
| **Teacher (CS)** | `joseph.teacher@srm.edu` | `Teacher@123` | Computer Science faculty for high school grades |
| **Teacher (Social)** | `lakshmi.teacher@srm.edu` | `Teacher@123` | Humanities and Social Science faculty |

*(Note: 1-click demo login buttons are also available on the Login screen for instant role testing).*

---

## 🌐 API Overview

| Method | Endpoint | Description | Protection |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate user & issue JWT | Public |
| `GET` | `/api/auth/me` | Fetch authenticated profile & permissions | JWT |
| `GET` | `/api/dashboard/metrics` | Role-aware dashboard statistics | JWT |
| `GET` | `/api/students` | Search, filter, and paginate students | `STUDENT_VIEW` |
| `POST` | `/api/students` | Admit student with parent & enrollment | `STUDENT_CREATE` |
| `GET` | `/api/students/:id` | 7-tab detailed student profile | `STUDENT_VIEW` |
| `PUT` | `/api/students/:id` | Update student demographic profile | `STUDENT_UPDATE` |
| `POST` | `/api/students/:id/enroll`| Promote or change student class | `STUDENT_UPDATE` |
| `GET` | `/api/staff` | Staff directory with qualifications | `STAFF_VIEW` |
| `POST` | `/api/staff` | Create staff member & linked user | `STAFF_CREATE` |
| `GET` | `/api/academic/classes` | List classes by year and standard | Public (Auth) |
| `POST` | `/api/academic/classes/batch`| Batch generate standard divisions | `ACADEMIC_MANAGE` |
| `POST` | `/api/assignments` | Assign faculty to class & subject | `CLASS_ASSIGN` |
| `GET` | `/api/marks/matrix` | Fetch grading matrix for class & subject | `MARKS_VIEW` + Scoped |
| `POST` | `/api/marks` | Save/grade student marks | `MARKS_UPDATE` + Scoped |
| `GET` | `/api/fees/student-fees` | List student fee invoices & balances | `FEES_VIEW` |
| `POST` | `/api/fees/payments` | Record fee payment & generate receipt | `PAYMENT_COLLECT` |
| `POST` | `/api/notifications/send` | Dispatch WhatsApp notice | `NOTIFICATION_SEND` |
| `GET` | `/api/reports/class-exam`| Class examination ranking broadsheet | `REPORT_VIEW` |
| `GET` | `/api/reports/fee-summary`| Fee collection and aging report | `REPORT_VIEW` |
| `GET` | `/api/audit` | View immutable audit logs | `AUDIT_VIEW` |

---

## 🐘 Future PostgreSQL Migration Guide

The application was purposefully designed with zero MySQL-specific business logic. When migrating to PostgreSQL:

1. **Update `backend/prisma/schema.prisma`**:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. **Update Connection String in `.env`**:
   ```ini
   DATABASE_URL="postgresql://postgres:password@localhost:5432/srm_db?schema=public"
   ```
3. **Execute Prisma Migrations**:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init_postgresql
   npx prisma db seed
   ```
4. **No Application Code Changes Required**: The repositories, services, controllers, and middlewares will function identically on PostgreSQL.

---

## ✅ Testing & Verification Checklist

- [x] **Authentication**: JWT validation, token expiry handling, role determination.
- [x] **Role-Based Authorization**: Admin superuser vs Teacher scoped boundaries.
- [x] **Granular Permissions**: Modules (Students, Marks, Fees, Notices, Reports, Audits).
- [x] **Scope Enforcement**: Teachers only access assigned classes/subjects.
- [x] **Student Management**: Full CRUD, parent linking, multi-year enrollment history.
- [x] **Academic Structure**: Academic years, Standards LKG-12, Divisions A-D, Classes.
- [x] **Marks & Grading**: Real-time matrix scoring, auto letter grades, pass/fail thresholds.
- [x] **Fee Management**: Partial payments, balance tracking, receipts, class assignment.
- [x] **WhatsApp Notifications**: Dynamic template tags, live bubble preview, delivery logs.
- [x] **Audit Trail**: Before and after JSON diffs for all sensitive actions.
- [x] **Responsive Layout**: Verified at 375px, 768px, 1024px, 1440px, and 1920px.
