require("dotenv").config;
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3Config = new AWS.S3({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(new Error("Only accepting jpeg/png image files"), false);
  }
};

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: process.env.AWSBucketName,
  acl: "public-read",
  metadata: (req, file, callback) => {
    callback(null, { fieldName: file.fieldname });
  },
  key: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({
  storage: multerS3Config,
  limits: {
    fileSize: 1024 * 1024 * 7
  },
  fileFilter: fileFilter
});

exports.profileImage = upload;
