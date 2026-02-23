import multer from "multer";

const storage = multer.diskStorage({
  // Set the destination for uploaded files
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  // Set the filename for uploaded files
  filename: function (req, file, cb) {
    const imageName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname.trim();
    cb(null, imageName);
  },
});
// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};
// Create the multer instance with the defined storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;