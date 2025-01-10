// models/gstSchema.js
const mongoose = require("mongoose");

const gstSchema = new mongoose.Schema({
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice", required: true }, 
    gst: { type: Number, required: true },
    cgst: { type: Number, required: true },
    sgst: { type: Number, required: true },
    igst: { type: Number, required: true },
    preGstAmount: { type: Number, required: true },
    postGstAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GST", gstSchema);
