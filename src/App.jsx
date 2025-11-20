import React from 'react';
import Book from './components/Book';

function App() {
  return (
    <div className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="app-background" />
      <div className="z-10 w-full h-full flex items-center justify-center p-4">
        <Book />
      </div>
    </div>
  );
}

export default App;
