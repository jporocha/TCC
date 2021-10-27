// /api/file/

const FileService = require("../services/FileService");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.get("/validateUpload/:id", async (req, res) => {
  let id = req.params.id;
  let response = await FileService.ValidateUpload(id);
  res.status(response.statusCode).send(response.payload);
});

router.post(
  "/insertAttachment",
  upload.single("attachment"),
  async (req, res) => {
    const { code, id } = req.body;
    const file = req.file;

    if (!code || !id || !file.originalname)
      return res.status(400).send({ erro: "Dados incompletos" });

    let response = await FileService.CreateAttachment(
      id,
      file.buffer,
      file.originalname,
      file.mimetype,
      code
    );
    res.status(response.statusCode).send(response.payload);
  }
);

router.post("/download", async (req, res) => {
  const file = req.body;
  let response = await FileService.DownloadAttachment(file._id);
  if (response.statusCode > 300)
    return res.status(401).send("Falha ao buscar arquivo.");
  res.set({
    "Content-Type": file.mimetype,
  });
  res.status(response.statusCode).send(response.payload.Body);
});

module.exports = router;
