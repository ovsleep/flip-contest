const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');

var Jimp = require("jimp");

router.get('/', (req, res) => {
  res.send('api works');
});

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



router.post('/pictures/upload', uploading.single('pic'), (req, res) => {
  Jimp.read(req.file.path)
  .then(function (pic) {
      var flippedName = req.file.path + '_f.' + mime.extension(req.file.mimetype);
      pic.flip(true, false).write(flippedName);//flip horizontal
      res.send({'original': req.file.filename, 'flipped': flippedName});
  })
  .catch(function (err) {
    console.error(err);
});

});

module.exports = router;
