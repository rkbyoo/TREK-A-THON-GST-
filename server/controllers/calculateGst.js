// utils/calculateGST.js
const Invoice = require("../models/invoiceSchema");
const GST = require("../models/gstSchema");

async function calculateAndSaveGST(invoiceNumber) {
    try {
        // Fetch the Invoice document using the invoiceNumber
        const invoice = await Invoice.findOne({ invoiceNumber });

        if (!invoice) {
            throw new Error(`Invoice with number ${invoiceNumber} not found.`);
        }

        const { amount, gstRate, isInclusive } = invoice;

        let gst, cgst, sgst, igst, preGstAmount, postGstAmount;

        if (isInclusive) {
            gst = (amount * gstRate) / (100 + gstRate);
            preGstAmount = amount - gst;
            postGstAmount = amount;
        } else {
            gst = (amount * gstRate) / 100;
            preGstAmount = amount;
            postGstAmount = amount + gst;
        }

        cgst = gst / 2;
        sgst = gst / 2;
        igst = gstRate >= 18 ? gst : 0; // Example condition for interstate IGST

        // Save the GST record linked to the Invoice
        const gstRecord = new GST({
            invoice: invoice._id, // Reference to the Invoice
            gst,
            cgst,
            sgst,
            igst,
            preGstAmount,
            postGstAmount,
        });

        await gstRecord.save();

        console.log("GST record saved successfully!");
        return gstRecord; // Optional return
    } catch (error) {
        console.error("Error calculating and saving GST:", error.message);
    }
}

module.exports = calculateAndSaveGST;
