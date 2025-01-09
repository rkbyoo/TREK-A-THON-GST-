import express from 'express';
import multer from 'multer';
// import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//import {uploadInvoice, processInvoice,gstVerifyCheck} from '../controllers/invoice.controller.js';
import {uploadInvoice} from '../controllers/invoice.controller.js';


//setting destination for multer
// Get the current file's path
const __filename = fileURLToPath(import.meta.url);

// Get the current directory
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});


//upload image
//setting limits for multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file type'), false);
        }
    },
    limits: { fileSize: 1024 * 1024 * 2 } // 2MB
});


const router = express.Router();

router.post('/upload',upload.single('file'), uploadInvoice); //upload invoice route
//router.get('/:id', processInvoice); //process invoice route
//router.post('/gstVerify', gstVerifyCheck); //gst verify check route

export default router;