import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const seeder20 = async () => {
    try {
        console.log('--- Seeding 20 More Books ---');
        
        // Use existing admin login
        const adminEmail = 'admin_seed@test.com';
        const adminRes = await axios.post(`${API_URL}/auth/login`, { email: adminEmail, password: 'pw' });
        const adminToken = adminRes.data.data.token;

        const newBooks = [
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic', totalCopies: 4 },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Classic', totalCopies: 6 },
            { title: '1984', author: 'George Orwell', category: 'Dystopian', totalCopies: 8 },
            { title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Romance', totalCopies: 5 },
            { title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy', totalCopies: 12 },
            { title: 'Fahrenheit 451', author: 'Ray Bradbury', category: 'Dystopian', totalCopies: 7 },
            { title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Fiction', totalCopies: 3 },
            { title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', totalCopies: 5 },
            { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', category: 'History', totalCopies: 10 },
            { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', category: 'Fantasy', totalCopies: 9 },
            { title: 'Educated', author: 'Tara Westover', category: 'Non-Fiction', totalCopies: 6 },
            { title: 'Becoming', author: 'Michelle Obama', category: 'Biography', totalCopies: 8 },
            { title: 'The Alchemist', author: 'Paulo Coelho', category: 'Philosophy', totalCopies: 14 },
            { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'Psychology', totalCopies: 4 },
            { title: 'Cosmos', author: 'Carl Sagan', category: 'Science', totalCopies: 3 },
            { title: 'The Martian', author: 'Andy Weir', category: 'Sci-Fi', totalCopies: 7 },
            { title: 'Neuromancer', author: 'William Gibson', category: 'Sci-Fi', totalCopies: 5 },
            { title: 'Circe', author: 'Madeline Miller', category: 'Mythology', totalCopies: 6 },
            { title: 'The Song of Achilles', author: 'Madeline Miller', category: 'Mythology', totalCopies: 5 },
            { title: 'Good to Great', author: 'Jim Collins', category: 'Business', totalCopies: 4 }
        ];

        let count = 0;
        for (const b of newBooks) {
            try {
                await axios.post(`${API_URL}/books`, b, { headers: { Authorization: `Bearer ${adminToken}` } });
                count++;
            } catch (err: any) {
                console.error(`Failed to post ${b.title}: ${err.message}`);
            }
        }
        console.log(`✅ successfully seeded ${count} books!`);
    } catch (err: any) {
        console.error('Failed to seed:', err.message);
    }
}
seeder20();
