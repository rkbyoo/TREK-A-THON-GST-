import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/db/db.js';
import authRoutes from './src/routes/auth.route.js';
import invoiceRoutes from './src/routes/invoice.route.js';
// import erpRoutes from './src/routes/erp.route.js';


import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',authRoutes);

app.use('/api/invoice',invoiceRoutes);
// app.use('/api/erp',erpRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});