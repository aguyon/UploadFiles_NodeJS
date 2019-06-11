const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "tmp/" });
const fs = require("fs");
const path = require("path");

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/formulaire.html"));
});

app.post("/sendFile", upload.array("myFile"), function(req, res, next) {
  for (let i = 0; i < req.files.length; i++) {
    if (req.files[i].size < 3000000 && req.files[i].mimetype == "image/png") {
      // les deux conditions : fichier avec taille inférieur à 3mo et de type png !
      fs.rename(req.files[i].path, "public/images/" + req.files[i].originalname,
        function(err) {
          if (err) {
            res.send("Problème !");
          } else {
            res.send("Fichier uploadé avec succès");
          }
        }
      );
    } else {
      res.send("Le fichier est trop lourd ou n'a pas la bonne extension. (Supérieur à 3 Mo et pas .png)");
    }
  }
});

app.listen(4000);
