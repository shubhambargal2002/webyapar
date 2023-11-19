// routes/image.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const { isLoggedIn } = require('../utils/middleware');
const Image = require('../models/Image');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/gallery', isLoggedIn, async (req, res) => {
    try {
      const images = await Image.find({ userId: req.user.id });
      res.render('gallery.ejs', { images });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

router.post('/upload', isLoggedIn, upload.single('image'), async (req, res) => {
  const { buffer } = req.file;
  const filename = `${req.user.id}-${Date.now()}.webp`;

  await sharp(buffer)
    .webp({ quality: 80 })
    .toFile(`public/uploads/${filename}`);

  const image = new Image({
    filename: filename,
    path: `uploads/${filename}`,
    userId: req.user.id,
    mimeType: 'image/jpeg'
  });

  await image.save();
  res.redirect('/image/gallery');
});

module.exports = router;
