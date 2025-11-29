import React, { useState } from 'react';
import Book from './components/Book';

function App() {
  const [zoom, setZoom] = useState(1.0);

  const handleZoomChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setZoom(newValue);
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3.0));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));

  return (
    <div className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="app-background" />
      <div className="z-10 w-full h-full flex items-center justify-center p-4">
        <Book
          zoom={zoom}
          onZoomChange={handleZoomChange}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
        />
      </div>
    </div>
  );
}

export default App;
