const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video.controller');

// Video routes
router.get('/', videoController.getAllVideos);
router.post('/upload', videoController.uploadVideo);
router.get('/:id', videoController.getVideoById);
router.delete('/:id', videoController.deleteVideo);

module.exports = router; 