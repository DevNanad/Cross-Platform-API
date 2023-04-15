import multer from "multer"

// Set storage engine
const storage = multer.memoryStorage();

// Initialize upload
export const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xlsx|xls)$/)) {
      return cb(new Error('Only Excel files are allowed'));
    }
    cb(null, true);
  }
});
