const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');
const path = require('path');

var Jimp = require("jimp");

//multer config
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../uploads')
  },
  filename: function (req, file, cb) {
    //rename the file with randomname.ext
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var uploading = multer({
    storage: storage,
    limits: {fileSize: 1000000, files:1}
});

//upload and flip pictures
router.post('/pictures/upload', uploading.single('pic'), (req, res) => {
  var fileNameWithoutExt = req.file.filename.replace(path.extname(req.file.filename), "");
  var filePath = path.dirname(req.file.path);

  Jimp.read(req.file.path)
  .then((pic) => {
      pic.flip(true, false) //flip horizontal
         .write(`${filePath}/${fileNameWithoutExt}_f.${mime.extension(req.file.mimetype)}`,
          (data) =>{ //save callback
            res.send({
              'original': req.file.filename,
              'flipped': `${fileNameWithoutExt}_f.${mime.extension(req.file.mimetype)}`});
          });
  })
  .catch(function (err) {
    console.error(err);
  });
});

//download pictures
router.get('/pictures/:name/:ext', (req, res) => {
  var picName = req.params.name;
  var ext = req.params.ext;
  var mime = Jimp.MIME_JPEG;
  switch (ext) {
    case 'jpg':
      mime = Jimp.MIME_JPEG;
      break;
    case 'png':
      mime = Jimp.MIME_PNG;
      break;
    case 'bmp':
        mime = Jimp.MIME_BMP;
        break;
    default:

  }
  Jimp.read(`${__dirname}/../uploads/${picName}`)
  .then((pic) => {
    pic.getBuffer(mime, (err, data) => {
      res.send(data);
    })
  })

})
module.exports = router;
