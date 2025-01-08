const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
    invoiceNumber: { type: String, required: true },
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    gstAmount: { type: Number, required: true },
    gstNumber: { type: String, required: true }
});

module.exports = mongoose.model('Invoice', invoiceSchema);

 