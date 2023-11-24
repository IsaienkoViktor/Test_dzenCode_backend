const multer = require("multer");
const path = require("path");

const multerConfig = multer.memoryStorage();
const upload = multer({
  storage: multerConfig,
  limits: {
    fileSize: 100 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif|txt/;
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (file.fieldname === "image") {
      if (extname && mimetype) {
        cb(null, true);
      } else {
        cb(new Error("Only JPEG, JPG, PNG, GIF, TXT"));
      }
    } else if (
      file.fieldname === "textFile" &&
      file.mimetype === "text/plain"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Wrong file type"));
    }
  },
});

module.exports = upload;
