const express = require("express");
const multer = require("multer");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const awsRegion = process.env.AWS_REGION;
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Config = { region: awsRegion };
if (awsAccessKeyId && awsSecretAccessKey) {
  s3Config.credentials = {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  };
}

const s3 = new S3Client(s3Config);

const makeKey = (originalName) => {
  const safeName = originalName
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .toLowerCase();
  const prefix = process.env.AWS_S3_PREFIX || "uploads";
  const ext = path.extname(safeName);
  const base = safeName.replace(ext, "") || "image";
  return `${prefix}/${Date.now()}-${base}${ext}`;
};

router.post(
  "/image",
  auth,
  requireRole("admin", "editor"),
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const bucket = process.env.AWS_S3_BUCKET;
    if (!bucket || !awsRegion) {
      return res.status(500).json({ error: "S3 is not configured" });
    }
    if (!awsAccessKeyId || !awsSecretAccessKey) {
      return res.status(500).json({ error: "AWS credentials are missing" });
    }

    const key = makeKey(req.file.originalname || "image");
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        })
      );

      const url = `https://${bucket}.s3.${awsRegion}.amazonaws.com/${key}`;
      return res.json({ url, key });
    } catch (err) {
      console.error("S3 upload failed:", err.message);
      return res.status(500).json({ error: "S3 upload failed" });
    }
  }
);

module.exports = router;
