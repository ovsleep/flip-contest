const express = require('express');
const router = express.Router();
const multer = require('multer');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

var uploading = multer({
  dest: __dirname + '/../uploads',
  limits: {fileSize: 1000000, files:1},
})

router.post('/pictures/upload', uploading.single('pic'), (req, res) => {
  res.send({'filename': req.file.filename});
  console.log(req.file);
});

module.exports = router;
