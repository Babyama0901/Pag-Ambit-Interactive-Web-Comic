import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Controls from './Controls';
import Modal from './Modal';

// MediaPage Component (handles both Images and Videos)
const MediaPage = ({ src, alt, pageNum, speechBubbleSrc }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const isVideo = src && src.toLowerCase().endsWith('.mp4');

  return (
    <div
      className="relative w-full h-full group overflow-hidden bg-white flex items-center justify-center p-0"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {isVideo ? (
        <video
          src={src}
          className="w-full h-full object-contain shadow-sm"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain shadow-sm"

          onError={(e) => { e.target.src = 'https://placehold.co/450x636/e9d5ff/6b21a8?text=Page+' + pageNum }}
        />
      )}

      {/* Speech Bubble Overlay - Only show for images or if requested */}
      {!isVideo && speechBubbleSrc && (
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 ease-in-out
            ${showOverlay ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <img
            src={`${import.meta.env.BASE_URL}${speechBubbleSrc}`}
            alt="Dialogue"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

function Book() {
  const audioRef = useRef(null);
  const bookRef = useRef(null);
  const [activeDialog, setActiveDialog] = useState(null);

  // Audio unlock logic
  useEffect(() => {
    const unlockAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => { });
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        document.removeEventListener('click', unlockAudio);
      }
    };
    document.addEventListener('click', unlockAudio);
    return () => document.removeEventListener('click', unlockAudio);
  }, []);

  const [dimensions, setDimensions] = useState({ width: 400, height: 600 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        // Calculate dimensions maintaining aspect ratio or fitting container
        // For mobile (single page view usually preferred but library handles 2-page spread)
        // We'll try to fit within the container with some padding

        let newWidth = clientWidth;
        let newHeight = clientHeight;

        // Max dimensions constraint
        const maxWidth = 1000;
        const maxHeight = 800;

        // Aspect ratio target (e.g., 2:3 per page, so 4:3 for spread)
        // Let's just maximize available space while keeping reasonable limits

        const isMobile = window.innerWidth < 768;

        if (isMobile) {
          // On mobile, we might want a single page view or just smaller double page
          // For now, let's scale the double page view to fit width
          newWidth = Math.min(clientWidth - 20, 500); // Padding
          newHeight = (newWidth * 1.5); // 2:3 aspect ratio roughly per page? No, spread is wider.
          // If spread is 2 pages. 
          // If we assume standard book ratio.
          // Let's stick to the library's responsive features if possible, but 'stretch' mode is often easier.
          // However, 'stretch' mode in react-pageflip can be tricky. 
          // Let's try explicit dimension calculation first for control.

          // Actually, let's try to make it responsive by setting width/height based on container
          // But we need to be careful about the aspect ratio.

          // Let's set a base size and let CSS transform handle the scaling if needed, 
          // OR pass dynamic props.

          // Simpler approach: Use 'stretch' size type if it works well, otherwise calc.
          // The plan mentioned 'stretch'. Let's try calculating to be safe as 'stretch' can distort.

          const availableWidth = Math.min(clientWidth, maxWidth);
          const availableHeight = Math.min(clientHeight, maxHeight);

          // Target aspect ratio for SPREAD (2 pages)
          // Page is 300-500w, 400-700h. 
          // Let's say single page is 1:1.5 (e.g. 400x600). Spread is 2:1.5 (800x600) = 4:3.

          const targetRatio = 4 / 3;
          const containerRatio = availableWidth / availableHeight;

          if (containerRatio > targetRatio) {
            // Container is wider than book
            newHeight = availableHeight * 0.9;
            newWidth = newHeight * targetRatio;
          } else {
            // Container is taller than book
            newWidth = availableWidth * 0.95;
            newHeight = newWidth / targetRatio;
          }
        } else {
          // Desktop logic similar but larger bounds
          const availableWidth = Math.min(clientWidth, 1200);
          const availableHeight = Math.min(clientHeight, 900);

          const targetRatio = 4 / 3;
          const containerRatio = availableWidth / availableHeight;

          if (containerRatio > targetRatio) {
            newHeight = availableHeight * 0.85;
            newWidth = newHeight * targetRatio;
          } else {
            newWidth = availableWidth * 0.85;
            newHeight = newWidth / targetRatio;
          }
        }

        setDimensions({ width: Math.floor(newWidth / 2), height: Math.floor(newHeight) }); // Width is per page
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleFlip = (e) => {
    if (audioRef.current && !isMuted) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => { });
    }
    if (e && typeof e.data === 'number') {
      setCurrentPage(e.data);
    }
  };

  const nextPage = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const prevPage = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookmark = () => {
    localStorage.setItem('bookmarkedPage', currentPage);
    alert(`Bookmarked page ${currentPage + 1}`);
  };

  const handleDownload = () => {
    // Placeholder for download logic
    alert('Download feature coming soon!');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
      .then(() => alert('Link copied to clipboard!'))
      .catch(() => alert('Failed to copy link'));
  };

  const handleSearch = () => {
    const query = prompt('🔍 Search the book:');
    if (query) {
      alert(`Searching for "${query}"...\nThis feature will be fully implemented soon!`);
      // TODO: Implement search functionality
    }
  };

  const handleTableOfContents = () => {
    alert('📑 Table of Contents:\n\nCover - Page 0\nChapter 1 - Page 1\nChapter 2 - Page 10\nChapter 3 - Page 20\n\n(Jump to page feature coming soon!)');
    // TODO: Implement table of contents with page jumping
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  const handlePrint = () => {
    alert(`🖨️ Printing page ${currentPage + 1}...\nPrint dialog will open soon!`);
    // TODO: Implement print functionality
    // window.print();
  };

  const handleJumpToCover = () => {
    bookRef.current?.pageFlip()?.flip(0);
    setCurrentPage(0);
  };

  const handleJumpToEnd = () => {
    const lastPage = totalPages - 1;
    bookRef.current?.pageFlip()?.flip(lastPage);
    setCurrentPage(lastPage);
  };

  const handleJumpToPage = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      bookRef.current?.pageFlip()?.flip(pageIndex);
      setCurrentPage(pageIndex);
    }
  };

  const handleHighlight = () => {
    alert('✨ Highlighting feature coming soon!');
  };

  const handleNotes = () => {
    alert('📝 Notes feature coming soon!');
  };

  return (
    <div ref={containerRef} className={`relative w-full h-screen flex flex-col items-center justify-center transition-colors duration-500 ${isNightMode ? 'bg-slate-950/50' : ''} overflow-hidden`}>

      {/* Book Container */}
      <div className="relative z-10 flex items-center justify-center">
        <HTMLFlipBook
          width={450}
          height={636}
          size="fixed"
          minWidth={318}
          maxWidth={595}
          minHeight={450}
          maxHeight={842}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={false}
          className="shadow-2xl"
          ref={bookRef}
          onFlip={handleFlip}
          isMuted={isMuted}
          isFullscreen={isFullscreen}
          isNightMode={isNightMode}
          onPrevPage={prevPage}
          onNextPage={nextPage}
          onToggleMute={toggleMute}
          onToggleFullscreen={toggleFullScreen}
          onBookmark={() => setActiveDialog('bookmarks')}
          onDownload={() => setActiveDialog('save')}
          onShare={() => setActiveDialog('share')}
          onHighlight={handleHighlight}
          onNotes={handleNotes}
          onSearch={handleSearch}
          onTableOfContents={() => setActiveDialog('contents')}
          onToggleNightMode={toggleNightMode}
          onPrint={() => setActiveDialog('print')}
          onJumpToCover={handleJumpToCover}
          onJumpToEnd={handleJumpToEnd}
          onJumpToPage={handleJumpToPage}
        />

        {/* Dialogs */}
        <Modal
          isOpen={activeDialog === 'contents'}
          onClose={() => setActiveDialog(null)}
          title="Table of Contents"
        >
          <div className="space-y-2">
            {[
              { title: "Cover", page: 0 },
              { title: "Scene 1", page: 1 },
              { title: "Scene 5", page: 4 },
              { title: "Scene 6", page: 10 },
              { title: "Scene 7", page: 16 },
              { title: "Scene 8", page: 20 }
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  bookRef.current?.pageFlip()?.flip(item.page);
                  setCurrentPage(item.page);
                  setActiveDialog(null);
                }}
                className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between group transition-all"
              >
                <span className="text-white font-medium">{item.title}</span>
                <span className="text-white/40 text-sm group-hover:text-white/60">Page {item.page + 1}</span>
              </button>
            ))}
          </div>
        </Modal>

        <Modal
          isOpen={activeDialog === 'bookmarks'}
          onClose={() => setActiveDialog(null)}
          title="Bookmarks"
        >
          <div className="space-y-4">
            <button
              onClick={() => {
                localStorage.setItem('bookmarkedPage', currentPage);
                alert('Page saved!');
                setActiveDialog(null);
              }}
              className="w-full p-4 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 flex items-center justify-center gap-2 font-medium transition-all"
            >
              <span>+ Add Current Page ({currentPage + 1})</span>
            </button>

            <div className="space-y-2">
              <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider ml-1">Saved Bookmarks</h3>
              {localStorage.getItem('bookmarkedPage') ? (
                <button
                  onClick={() => {
                    const page = parseInt(localStorage.getItem('bookmarkedPage'));
                    bookRef.current?.pageFlip()?.flip(page);
                    setCurrentPage(page);
                    setActiveDialog(null);
                  }}
                  className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between group transition-all"
                >
                  <span className="text-white font-medium">Bookmark 1</span>
                  <span className="text-white/40 text-sm">Page {parseInt(localStorage.getItem('bookmarkedPage')) + 1}</span>
                </button>
              ) : (
                <div className="text-center py-8 text-white/30 italic">No bookmarks yet</div>
              )}
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={activeDialog === 'print'}
          onClose={() => setActiveDialog(null)}
          title="Print"
        >
          <div className="text-center space-y-6">
            <div className="w-24 h-32 mx-auto bg-white rounded shadow-lg flex items-center justify-center text-black/20 font-bold text-4xl">
              {currentPage + 1}
            </div>
            <p className="text-white/70">Ready to print page {currentPage + 1}?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveDialog(null)}
                className="flex-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  window.print();
                  setActiveDialog(null);
                }}
                className="flex-1 p-3 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-all"
              >
                Print Now
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={activeDialog === 'share'}
          onClose={() => setActiveDialog(null)}
          title="Share Book"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-white/60 text-xs mb-2 uppercase tracking-wider">Book Link</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-black/30 p-2 rounded text-indigo-300 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                  {window.location.href}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Copied!');
                  }}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded text-white transition-all"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 rounded-xl bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-[#1DA1F2] font-medium transition-all">
                Twitter
              </button>
              <button className="p-3 rounded-xl bg-[#4267B2]/20 hover:bg-[#4267B2]/30 text-[#4267B2] font-medium transition-all">
                Facebook
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={activeDialog === 'save'}
          onClose={() => setActiveDialog(null)}
          title="Save / Download"
        >
          <div className="space-y-3">
            <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-4 group transition-all">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                PDF
              </div>
              <div className="text-left">
                <div className="text-white font-medium">Download as PDF</div>
                <div className="text-white/40 text-xs">High quality format</div>
              </div>
            </button>

            <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-4 group transition-all">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                IMG
              </div>
              <div className="text-left">
                <div className="text-white font-medium">Save Current Page</div>
                <div className="text-white/40 text-xs">PNG Image</div>
              </div>
            </button>
          </div>
        </Modal>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={`${import.meta.env.BASE_URL}Page Turn Sound Effect.mp3`} preload="auto" />
      </div >
    </div >
  );
}

export default Book;