import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoUpload from './components/VideoUpload';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Ana Sayfaaa</div>} />
          <Route path="/upload" element={<VideoUpload />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App; 