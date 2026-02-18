# ER Diagram – Library Management System

## Tables

### USERS
- id (PK)
- name
- email (unique)
- password
- role (ENUM: ADMIN, MEMBER)
- created_at

### BOOKS
- id (PK)
- title
- author
- category
- total_copies
- available_copies
- created_at

### ISSUE_RECORDS
- id (PK)
- user_id (FK -> USERS.id)
- book_id (FK -> BOOKS.id)
- issue_date
- due_date
- return_date
- fine_amount
- status (ISSUED, RETURNED, OVERDUE)

---

## Relationships

USERS (1) ——— (M) ISSUE_RECORDS  
BOOKS (1) ——— (M) ISSUE_RECORDS
