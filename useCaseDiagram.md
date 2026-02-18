![Use Case Diagram](images/img4.png)

# Use Case Diagram – Library Management System

## Actors

1. Admin
2. Member

---

## Admin Use Cases

- Login
- Add Book
- Update Book
- Delete Book
- View All Books
- View Issued Books
- Manage Users

---

## Member Use Cases

- Register
- Login
- Search Book
- Issue Book
- Return Book
- View My Issued Books
- View Fine Details

---

## Relationships

Admin → Manage Books  
Admin → Manage Users  

Member → Search Book  
Member → Issue Book  
Member → Return Book  

Issue Book → includes Check Availability  
Return Book → includes Calculate Fine
