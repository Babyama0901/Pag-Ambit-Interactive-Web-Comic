/* eslint-disable react/prop-types */
import React from 'react';
import {
    Volume2,
    VolumeX,
    ChevronLeft,
    ChevronRight,
    Maximize,
    Minimize,
    Bookmark,
    Download,
    Share2,
    Search,
    List,
    Moon,
    Sun,
    Printer,
    SkipBack,
    SkipForward
} from 'lucide-react';

const Controls = ({
    currentPage,
    totalPages,
    isMuted,
    isFullscreen,
    isNightMode = false,
    onPrevPage,
    onNextPage,
    onToggleMute,
    onToggleFullscreen,
    onBookmark,
    onDownload,
    onShare,
    onSearch,
    onTableOfContents,
    onToggleNightMode,
    onPrint,
    onJumpToCover,
    onJumpToEnd
}) => {
    const progress = Math.round(((currentPage) / totalPages) * 100);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl glass-panel px-4 py-3 z-50 transition-all duration-300 hover:bg-white/15">
            <div className="flex items-center justify-between gap-4">

                {/* Left Group: Audio & Progress */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onToggleMute}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>

                    <div className="hidden lg:flex flex-col">
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Progress</span>
                        <span className="text-xs text-white font-bold">{progress}%</span>
                    </div>
                </div>

                {/* Center Group: Navigation */}
                <div className="flex items-center gap-3 md:gap-6">
                    <button
                        onClick={onPrevPage}
                        className="group flex items-center gap-1 p-2 hover:bg-white/5 rounded-lg transition-all"
                        title="Previous Page"
                    >
                        <ChevronLeft size={20} className="text-slate-300 group-hover:text-white group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-xl font-bold text-white tabular-nums">
                            {String(currentPage + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest">Page</span>
                    </div>

                    <button
                        onClick={onNextPage}
                        className="group flex items-center gap-1 p-2 hover:bg-white/5 rounded-lg transition-all"
                        title="Next Page"
                    >
                        <ChevronRight size={20} className="text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Right Group: Student Tools & Actions */}
                <div className="flex items-center gap-2">
                    {/* Quick Navigation */}
                    <div className="hidden md:flex items-center gap-1 mr-2 border-r border-white/10 pr-3">
                        <ActionButton icon={SkipBack} onClick={onJumpToCover} label="Jump to Cover" variant="accent" />
                        <ActionButton icon={SkipForward} onClick={onJumpToEnd} label="Jump to End" variant="accent" />
                    </div>

                    {/* Study Tools */}
                    <div className="hidden md:flex items-center gap-1 mr-2 border-r border-white/10 pr-3">
                        <ActionButton icon={Search} onClick={onSearch} label="Search" />
                        <ActionButton icon={List} onClick={onTableOfContents} label="Contents" />
                    </div>

                    {/* Utility Tools */}
                    <div className="hidden md:flex items-center gap-1 mr-2 border-r border-white/10 pr-3">
                        <ActionButton icon={Bookmark} onClick={onBookmark} label="Bookmark" />
                        <ActionButton icon={Printer} onClick={onPrint} label="Print" />
                        <ActionButton icon={Download} onClick={onDownload} label="Download" />
                        <ActionButton icon={Share2} onClick={onShare} label="Share" />
                    </div>

                    {/* Display Controls */}
                    <button
                        onClick={onToggleNightMode}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                        title={isNightMode ? "Day Mode" : "Night Mode"}
                    >
                        {isNightMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                        onClick={onToggleFullscreen}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ActionButton = ({ icon: Icon, onClick, label, variant = 'default' }) => (
    <button
        onClick={onClick}
        className={`p-2 rounded-lg transition-all ${variant === 'accent'
            ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-500/10'
            : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
        title={label}
    >
        <Icon size={16} />
    </button>
);

export default Controls;
