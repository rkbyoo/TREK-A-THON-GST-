const fs = require('fs');
const FormData = require('form-data');

exports.uploadImageHandler = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(file.path));

    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        ...formData.getHeaders(),
        'Authorization': `` // Replace with your API key
      },
      body: formData
    });

    const data = await response.json();

    // Save the invoice data to the database
    const { invoiceNumber, date, totalAmount, gstAmount, gstNumber } = data;
    const newInvoice = await invoiceSchema.create({
      invoiceNumber,
      date,
      totalAmount,
      gstAmount,
      gstNumber,
    });

    res.status(200).json({
      success: true,
      message: "Image processed and data saved successfully",
      data: newInvoice,
    });
  } catch (error) {
    console.error("Error processing the image:", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while processing the image",
      error: error.message,
    });
  } finally {
    // Clean up the uploaded file
    fs.unlink(file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
  }
};
