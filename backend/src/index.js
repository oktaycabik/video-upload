const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const videoRoutes = require('./routes/video.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();

// Güvenlik middleware'leri
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // IP başına limit
});
app.use(limiter);

// Routes
app.use('/api/videos', videoRoutes);
app.use('/api/auth', authRoutes);

// Error handling
app.use(errorHandler);

// MongoDB bağlantısı
mongoose.connect(config.mongoUri);

// Redis bağlantısı
const redisClient = redis.createClient({
  url: config.redisUri
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 