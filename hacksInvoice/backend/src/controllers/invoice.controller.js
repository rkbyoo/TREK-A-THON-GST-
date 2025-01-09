import { Invoice } from "../models/invoice.model.js";
import fs from "fs";

export const uploadInvoice = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        //file path
        const filePath = req.file.path;

        //PROCESSING 



        // Respond to the client
        res.status(201).json({
            success: true,
            message: "Invoice uploaded and processed successfully!",
            invoice: {
                ...req.file,
                path:'',
                destination:''
            },
            
        });

        // Delete the file after responding
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
            console.log('File deleted successfully:');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// export const processInvoice = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const invoicePresentChecker = await Invoice.findOne({ _id: id });
//         if(invoicePresentChecker){
//             res.status(208).json({
//                 success: true,
//                 message: "Invoice found",
//                 invoice: invoicePresentChecker
//             });



//export const gstVerifyCheck = async (req, res) => {