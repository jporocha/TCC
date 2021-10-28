// /api/file/

const FileService = require("../services/FileService");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const auth = require("../middleware/auth");

router.get("/validateUpload/:id", async (req, res) => {
  let id = req.params.id;
  let response = await FileService.ValidateUpload(id);
  res.status(response.statusCode).send(response.payload);
});

router.get("/all/byDoctor", auth(), async (req, res) => {
  try {
    let id = req.user.id;
    let response = await FileService.FetchByDoctor(id);
    res.status(response.statusCode).send(response.payload);
  } catch (e) {
    res.status(400).send("Usuário não autenticado.");
  }
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

router.post("/sendToPatient", auth(), async (req, res) => {
  const { patientEmail, id } = req.body;
  if (!patientEmail || !id) res.status(400).send("Falha nos dados para envio.");
  let response = await FileService.SendToPatient(id, patientEmail);
  res.status(response.statusCode).send(response.payload);
});

router.post("/download", auth(), async (req, res) => {
  const file = req.body;
  let response = await FileService.DownloadAttachment(file._id);
  if (response.statusCode > 300)
    return res.status(401).send("Falha ao buscar arquivo.");
  res.set({
    "Content-Type": file.mimetype,
  });
  res.status(response.statusCode).send(response.payload.Body);
});

router.post("/userDownload", async (req, res) => {
  const { mimetype, id, code } = req.body;
  if (!mimetype || !id || !code) res.status(400).send("Parâmetros inválidos");
  let response = await FileService.UserDownload(id, code);
  if (response.statusCode === 201) {
    res.set({
      "Content-Type": mimetype,
    });
  }
  res.status(response.statusCode).send(response.payload.Body);
});

module.exports = router;
