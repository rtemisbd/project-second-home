import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // const supportedImage = /pdf/;
    const supportedImage = /png|jpg|pdf|PDF|PNG|JPG|jpeg|JPEG|webp/;
    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("must be png / jpg / pdf image"));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});

const productFile = uploader.fields([
  { name: "image", maxCount: 1 },
  { name: "gardianImg", maxCount: 1 },
]);

export default productFile;
