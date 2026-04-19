import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
let adminToken = '';
let memberToken = '';
let bookId = '';

const testAPI = async () => {
    try {
        console.log('--- Setting up DB ---');
        // We assume we are hitting an empty or non-empty DB, we just create new users with random emails
        const rand = Math.floor(Math.random() * 10000);
        const adminEmail = `admin${rand}@test.com`;
        const memberEmail = `member${rand}@test.com`;

        console.log('1. Registering Admin...');
        const adminRes = await axios.post(`${API_URL}/auth/register`, {
            name: 'Admin User',
            email: adminEmail,
            password: 'password123',
            role: 'ADMIN'
        });
        console.log('Admin registered:', adminRes.data.success);

        console.log('2. Registering Member...');
        const memberRes = await axios.post(`${API_URL}/auth/register`, {
            name: 'Member User',
            email: memberEmail,
            password: 'password123',
            role: 'MEMBER'
        });
        console.log('Member registered:', memberRes.data.success);

        console.log('3. Logging in Admin...');
        const adminLoginRes = await axios.post(`${API_URL}/auth/login`, {
            email: adminEmail,
            password: 'password123'
        });
        adminToken = adminLoginRes.data.data.token;
        console.log('Admin logged in:', !!adminToken);

        console.log('4. Logging in Member...');
        const memberLoginRes = await axios.post(`${API_URL}/auth/login`, {
            email: memberEmail,
            password: 'password123'
        });
        memberToken = memberLoginRes.data.data.token;
        console.log('Member logged in:', !!memberToken);

        console.log('5. Admin adding a book...');
        const bookRes = await axios.post(`${API_URL}/books`, {
            title: `Test Book ${rand}`,
            author: 'Test Author',
            totalCopies: 5
        }, { headers: { Authorization: `Bearer ${adminToken}` } });
        bookId = bookRes.data.data._id;
        console.log('Book added correctly:', bookRes.data.success);

        console.log('6. Member searching books...');
        const searchRes = await axios.get(`${API_URL}/books/search`, {
            headers: { Authorization: `Bearer ${memberToken}` },
            params: { q: `Test Book ${rand}` }
        });
        console.log('Search returned results:', searchRes.data.data.length > 0);

        console.log('7. Member checking book availability...');
        const availRes = await axios.get(`${API_URL}/books/${bookId}/availability`, {
            headers: { Authorization: `Bearer ${memberToken}` }
        });
        console.log('Available copies:', availRes.data.data.availableCopies);

        console.log('8. Member issuing the book...');
        const issueRes = await axios.post(`${API_URL}/issues/issue`, { bookId }, {
            headers: { Authorization: `Bearer ${memberToken}` }
        });
        console.log('Book issued:', issueRes.data.success);

        console.log('9. Re-checking availability (should be 4)...');
        const avail2Res = await axios.get(`${API_URL}/books/${bookId}/availability`, {
            headers: { Authorization: `Bearer ${memberToken}` }
        });
        console.log('Available copies now:', avail2Res.data.data.availableCopies);

        console.log('10. Member returning the book...');
        const returnRes = await axios.post(`${API_URL}/issues/return`, { bookId }, {
            headers: { Authorization: `Bearer ${memberToken}` }
        });
        console.log('Book returned:', returnRes.data.success);
        console.log('Fine amount:', returnRes.data.data.fineAmount);

        console.log('ALL TESTS PASSED SUCCESSFULLY! ✅');
    } catch (error: any) {
        console.error('TEST FAILED ❌');
        if (error.response) {
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }
    }
};

testAPI();
