import mongoose from 'mongoose';
import axios from 'axios';
import { IssueRecord, IssueStatus } from './src/models/IssueRecord';

const API_URL = 'http://localhost:5000/api';

const testLateFine = async () => {
    try {
        console.log('--- Connecting to Mongo to spoof issue data ---');
        await mongoose.connect('mongodb://127.0.0.1:27017/lms');

        // Create a fake member and authenticate
        const rand = Math.floor(Math.random() * 10000);
        const memberEmail = `latemember${rand}@test.com`;

        await axios.post(`${API_URL}/auth/register`, {
            name: 'Late Member',
            email: memberEmail,
            password: 'password123',
            role: 'MEMBER'
        });

        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: memberEmail,
            password: 'password123'
        });
        const token = loginRes.data.data.token;
        const memberId = loginRes.data.data.user._id;

        // Admin add book
        const adminRes = await axios.post(`${API_URL}/auth/register`, { name: 'A', email: `a${rand}@m.com`, password: 'pw', role: 'ADMIN' });
        const adminLogin = await axios.post(`${API_URL}/auth/login`, { email: `a${rand}@m.com`, password: 'pw' });
        const adminToken = adminLogin.data.data.token;

        const bookRes = await axios.post(`${API_URL}/books`, { title: `Late Book ${rand}`, author: 'Test', totalCopies: 2 }, { headers: { Authorization: `Bearer ${adminToken}` } });
        const bookId = bookRes.data.data._id;

        // Member issues book
        console.log('1. Member issuing book...');
        await axios.post(`${API_URL}/issues/issue`, { bookId }, { headers: { Authorization: `Bearer ${token}` } });

        // Retrieve issue and spoof Due Date as 10 days ago backwards
        console.log('2. Spoofing DB: Setting due date to 10 days ago...');
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
        
        await IssueRecord.findOneAndUpdate(
            { userId: memberId, bookId: bookId, status: IssueStatus.ISSUED },
            { dueDate: tenDaysAgo }
        );

        // Member returns book
        console.log('3. Returning the book to calculate fine...');
        const returnRes = await axios.post(`${API_URL}/issues/return`, { bookId }, { headers: { Authorization: `Bearer ${token}` } });
        
        console.log('✅ RETURN SUCCESS!');
        console.log('Fine calculation details:');
        console.log('- Days Late:', 10);
        console.log(`- Base fine per day: $10 (FineService definition)`);
        console.log('- Total Fine Billed:', `$${returnRes.data.data.fineAmount}`);
        
        if (returnRes.data.data.fineAmount === 100) {
            console.log('FINE CORRECTLY ASSIGNED ✅');
        } else {
            console.log('FINE CALCULATION MISMATCH ❌');
        }


    } catch (error: any) {
        console.error('TEST FAILED', error.response?.data || error.message);

    }
};

testLateFine();
