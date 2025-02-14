const Video = require('../models/Video.model');
const redisClient = require('../config/redis');

const videoController = {
  async getAllVideos(req, res) {
    try {
      // Redis önbellek kontrolü
      const cachedVideos = await redisClient.get('all_videos');
      if (cachedVideos) {
        return res.json(JSON.parse(cachedVideos));
      }

      const videos = await Video.find()
        .populate('userId', 'username')
        .sort({ createdAt: -1 });

      // Redis'e kaydet
      await redisClient.setEx('all_videos', 3600, JSON.stringify(videos));

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
        userId: req.user.id
      });

      await video.save();
      // Önbelleği temizle
      await redisClient.del('all_videos');

      res.status(201).json(video);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = videoController; 