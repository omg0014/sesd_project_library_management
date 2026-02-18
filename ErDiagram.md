![ER Diagram](images/er_diagram.png)

# ER Diagram – Library Management System

=========================================
TABLE: USERS
=========================================

| Column      | Type         | Constraint                     |
|------------|-------------|--------------------------------|
| id         | BIGINT      | PRIMARY KEY, AUTO_INCREMENT    |
| name       | VARCHAR(100)| NOT NULL                       |
| email      | VARCHAR(100)| UNIQUE, NOT NULL               |
| password   | VARCHAR(255)| NOT NULL                       |
| role       | VARCHAR(20) | ADMIN / MEMBER                 |
| created_at | DATETIME    | DEFAULT CURRENT_TIMESTAMP      |

=========================================
TABLE: BOOKS
=========================================

| Column           | Type         | Constraint                  |
|------------------|-------------|-----------------------------|
| id               | BIGINT      | PRIMARY KEY, AUTO_INCREMENT |
| title            | VARCHAR(200)| NOT NULL                    |
| author           | VARCHAR(100)| NOT NULL                    |
| category         | VARCHAR(100)|                             |
| total_copies     | INT         | NOT NULL                    |
| available_copies | INT         | NOT NULL                    |
| created_at       | DATETIME    | DEFAULT CURRENT_TIMESTAMP   |

=========================================
TABLE: ISSUE_RECORDS
=========================================

| Column       | Type           | Constraint                         |
|-------------|---------------|------------------------------------|
| id          | BIGINT        | PRIMARY KEY, AUTO_INCREMENT        |
| user_id     | BIGINT        | FOREIGN KEY → USERS.id             |
| book_id     | BIGINT        | FOREIGN KEY → BOOKS.id             |
| issue_date  | DATETIME      | NOT NULL                           |
| due_date    | DATETIME      | NOT NULL                           |
| return_date | DATETIME      | NULL                               |
| fine_amount | DECIMAL(10,2) | DEFAULT 0.00                       |
| status      | VARCHAR(20)   | ISSUED / RETURNED / OVERDUE        |

=========================================
RELATIONSHIPS
=========================================

USERS (1) -------- (M) ISSUE_RECORDS  
BOOKS (1) -------- (M) ISSUE_RECORDS  

One user can issue multiple books.  
One book can be issued multiple times over time.
