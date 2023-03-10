import multer from "multer";

const multipleFileUpload =
  (field, maxCount = 10) =>
    (req, res, next) => {
      const upload = multer({ dest: "./temp/" });

      return upload.array(field, maxCount)(req, res, (err) => next());
    };

export default multipleFileUpload;
