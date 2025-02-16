const Video = require('../models/Video.model');

const videoController = {
  async getAllVideos(req, res) {
    try {
      const videos = await Video.find()
        .populate('userId', 'username')
        .sort({ createdAt: -1 });

      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async uploadVideo(req, res) {
    try {
      const { title, description, url, thumbnailUrl } = req.body;
      const video = new Video({
        title,
        description,
        url,
        thumbnailUrl,
        userId: req.user?.id || 'anonymous'
      });

      await video.save();
      res.status(201).json(video);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getVideoById: async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteVideo: async (req, res) => {
    try {
      const video = await Video.findByIdAndDelete(req.params.id);
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
      res.json({ message: 'Video deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = videoController; 