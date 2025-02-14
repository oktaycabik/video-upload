import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VideoUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('video', video);
      formData.append('thumbnail', thumbnail);

      await axios.post('/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/');
    } catch (error) {
      console.error('Video yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Yeni Video Yükle</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Video Başlığı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Video Açıklaması"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Yükleniyor...' : 'Video Yükle'}
        </button>
      </form>
    </div>
  );
};

export default VideoUpload; 