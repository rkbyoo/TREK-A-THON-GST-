import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invoiceNumber: { type: String, required: true }, // e.g., "INV12345"
    gstNumber: { type: String, required: false }, // GST Number (optional if not applicable)
    vendorName: { type: String, required: true }, // e.g., "ABC Pvt Ltd."
    date: { type: Date, required: true }, // Invoice date
    totalAmount: { type: Number, required: true }, // Total amount (e.g., 1000.50)
    lineItems: [
      // List of items on the invoice
      {
        description: { type: String, required: true }, // Item description
        quantity: { type: Number, required: true }, // Quantity
        price: { type: Number, required: true }, // Price per unit
        total: { type: Number, required: true }, // Total price for the item
      },
    ],
    checkVerified: { type: Boolean, required: false, default: false }, // For checking if the GSTIN is verified
    extractedData: { type: Object, required: false }, // For additional extracted data
  },
  {
    timestamps: true,
  }
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
