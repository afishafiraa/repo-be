const express = require('express');
const router = express.Router();
const controller = require('../app/controller')
const storage = require('../utils/mutler'); 
const multer = require('multer')();

router.use('/images', express.static('public/storage'));
router.use('/file', express.static('public/storage'));
router.use('/videos', express.static('public/storage'));

router.post('/api/upload/image', 
    storage.image.single('image'),
    controller.media.uploadImage)
router.post('/api/upload/file', 
    storage.doc.single('file'),
    controller.media.uploadFile)
router.post('/api/upload/video', 
    storage.video.single('video'),
    controller.media.uploadVideo)

//qr-code
router.post('/api/qrcode', controller.media.qrcode)

//imagekit
router.post('/api/upload/imagekit',
    multer.single('image'),
    controller.media.imagekitUpload)

module.exports = router;