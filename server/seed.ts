import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const seeder = async () => {
    try {
        console.log('--- Seeding Data via API ---');

        // Admin
        const adminEmail = `admin_seed@test.com`;
        await axios.post(`${API_URL}/auth/register`, { name: 'Master Librarian', email: adminEmail, password: 'pw', role: 'ADMIN' }).catch(e=>e);
        const adminRes = await axios.post(`${API_URL}/auth/login`, { email: adminEmail, password: 'pw' });
        const adminToken = adminRes.data.data.token;

        // Members
        const m1Email = `member_seed1@test.com`;
        const m2Email = `member_seed2@test.com`;
        await axios.post(`${API_URL}/auth/register`, { name: 'Sarah Connor', email: m1Email, password: 'pw', role: 'MEMBER' }).catch(e=>e);
        await axios.post(`${API_URL}/auth/register`, { name: 'John Wick', email: m2Email, password: 'pw', role: 'MEMBER' }).catch(e=>e);
        
        const m1Res = await axios.post(`${API_URL}/auth/login`, { email: m1Email, password: 'pw' });
        const m2Res = await axios.post(`${API_URL}/auth/login`, { email: m2Email, password: 'pw' });
        const t1 = m1Res.data.data.token;
        const t2 = m2Res.data.data.token;

        const books = [
            { title: 'The Silent Patient', author: 'Alex Michaelides', category: 'Thriller', totalCopies: 5 },
            { title: 'Atomic Habits', author: 'James Clear', category: 'Self-Help', totalCopies: 10 },
            { title: 'Dune', author: 'Frank Herbert', category: 'Sci-Fi', totalCopies: 4 },
            { title: 'Project Hail Mary', author: 'Andy Weir', category: 'Sci-Fi', totalCopies: 6 },
            { title: 'The Midnight Library', author: 'Matt Haig', category: 'Fiction', totalCopies: 7 },
            { title: 'Dark Matter', author: 'Blake Crouch', category: 'Sci-Fi', totalCopies: 3 }
        ];

        let bookIds = [];
        for (const b of books) {
            const req = await axios.post(`${API_URL}/books`, b, { headers: { Authorization: `Bearer ${adminToken}` } });
            bookIds.push(req.data.data._id);
        }

        console.log('✅ Books seeded');

        // M1
        await axios.post(`${API_URL}/issues/issue`, { bookId: bookIds[0] }, { headers: { Authorization: `Bearer ${t1}` } });
        await axios.post(`${API_URL}/issues/issue`, { bookId: bookIds[1] }, { headers: { Authorization: `Bearer ${t1}` } });

        // M2
        await axios.post(`${API_URL}/issues/issue`, { bookId: bookIds[2] }, { headers: { Authorization: `Bearer ${t2}` } });
        await axios.post(`${API_URL}/issues/issue`, { bookId: bookIds[3] }, { headers: { Authorization: `Bearer ${t2}` } });
        // M2 Returns
        await axios.post(`${API_URL}/issues/return`, { bookId: bookIds[3] }, { headers: { Authorization: `Bearer ${t2}` } });

        console.log('✅ Seeding Complete!');
    } catch (err: any) {
        console.error('Failed to seed:', err.message);
    }
};

seeder();
