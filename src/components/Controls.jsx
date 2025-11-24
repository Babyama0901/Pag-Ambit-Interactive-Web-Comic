import React, { useState } from 'react';

const Controls = ({
    currentPage,
    totalPages,
    isMuted,
    isFullscreen,
    isNightMode,
    onPrevPage,
    onNextPage,
    onToggleMute,
    onToggleFullscreen,
    onBookmark,
    onDownload,
    onShare,
    onHighlight,
    onNotes,
    onSearch,
    onTableOfContents,
    onToggleNightMode,
    onPrint,
    onJumpToCover,
    onJumpToEnd
}) => {
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    // Helper for icons
    const Icon = ({ path, className = "w-5 h-5" }) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
        </svg>
    );

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-3xl px-4">

            {/* More Menu Popup */}
            {showMoreMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-4 p-4 mx-4 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
                    <div className="grid grid-cols-4 gap-4">
                        <MenuButton icon="M4 6h16M4 12h16M4 18h16" label="Contents" onClick={onTableOfContents} />
                        <MenuButton icon="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" label="Bookmark" onClick={onBookmark} />
                        <MenuButton icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" label="Search" onClick={onSearch} />
                        <MenuButton icon="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" label="Share" onClick={onShare} />

                        <MenuButton icon="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" label={isNightMode ? "Day Mode" : "Night Mode"} onClick={onToggleNightMode} active={isNightMode} />
                        <MenuButton icon="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" label="Download" onClick={onDownload} />
                        <MenuButton icon="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2.4-9h6m-1 6v6m-4-6v6m2-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 14h16" label="Print" onClick={onPrint} />
                        <MenuButton icon="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" label="Notes" onClick={onNotes} />
                    </div>
                </div>
            )}

            {/* Main Control Bar */}
            <div className="bg-black/60 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl p-2 flex items-center justify-between gap-4">

                {/* Navigation Group */}
                <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
                    <ControlButton onClick={onPrevPage} icon="M15 19l-7-7 7-7" label="Previous" />
                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                    <ControlButton onClick={onNextPage} icon="M9 5l7 7-7 7" label="Next" />
                </div>

                {/* Progress Group */}
                <div className="flex-1 flex items-center gap-4 px-4 min-w-0">
                    <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-white font-bold text-lg leading-none">{currentPage + 1}</span>
                        <span className="text-white/40 text-[10px] font-medium uppercase tracking-wider">of {totalPages}</span>
                    </div>

                    <div className="flex-1 h-12 flex items-center group cursor-pointer relative">
                        {/* Custom Range Slider */}
                        <div className="absolute inset-x-0 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white/80 rounded-full transition-all duration-300"
                                style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                            />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max={totalPages - 1}
                            value={currentPage}
                            onChange={(e) => {
                                // This would need to be handled by parent if we want direct seeking
                                // For now it's visual mostly, but we can try to hook it up if Book exposes a seek method
                                // The current props don't seem to have a direct 'onSeek' but we can use onJumpTo... logic if we had it.
                                // For now, let's just let it be read-only or visual since we can't easily jump to specific page without a prop.
                                // Actually, we can't easily jump to arbitrary page with current props (only cover/end).
                                // So we'll keep it read-only for now or just visual.
                            }}
                            className="absolute inset-0 w-full opacity-0 cursor-pointer"
                            disabled
                        />
                    </div>
                </div>

                {/* Actions Group */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
                        <ControlButton
                            onClick={onToggleMute}
                            icon={isMuted ? "M5.586 5.586a2 2 0 002.828 0L16 13.172V17l-4.586-4.586-2.828 2.828A2 2 0 015.586 12.414l2.828-2.828-2.828-2.828z M12 8.828L16 4.828V8.828z" : "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"}
                            active={!isMuted}
                            className={isMuted ? "text-white/40" : "text-white"}
                        />
                        <ControlButton
                            onClick={onToggleFullscreen}
                            icon={isFullscreen ? "M6 18L18 6M6 6l12 12" : "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"}
                            active={isFullscreen}
                        />
                    </div>

                    <button
                        onClick={() => setShowMoreMenu(!showMoreMenu)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${showMoreMenu ? 'bg-white text-black rotate-90' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                        <Icon path="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </button>
                </div>

            </div>
        </div>
    );
};

const ControlButton = ({ onClick, icon, label, active = false, className = "" }) => (
    <button
        onClick={onClick}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${active ? 'bg-white text-black shadow-lg scale-105' : 'text-white hover:bg-white/10 hover:scale-110'} ${className}`}
        title={label}
    >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
    </button>
);

const MenuButton = ({ icon, label, onClick, active }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 ${active ? 'bg-white text-black' : 'hover:bg-white/10 text-white/80 hover:text-white'}`}
    >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? 'bg-black/10' : 'bg-white/10'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
            </svg>
        </div>
        <span className="text-xs font-medium">{label}</span>
    </button>
);

export default Controls;
