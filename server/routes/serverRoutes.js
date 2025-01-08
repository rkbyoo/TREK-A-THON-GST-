const express = require("express");
const multer = require("multer"); // Added multer for handling file uploads
const router = express.Router();

const upload = multer({ dest: "uploads/" }); // Configured multer with a temporary upload directory

//controllers are imported
const { getDataHandler } = require("../controllers/getData");
const { uploadImageHandler } = require("../controllers/uploadImage");


//routes are defined here 
router.get("/invoice/data", getDataHandler);
router.post("/upload/image", upload.single("file"), uploadImageHandler); // Added multer middleware for handling file uploads

module.exports = router;
