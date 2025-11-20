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
    Share2
} from 'lucide-react';

const Controls = ({
    currentPage,
    totalPages,
    isMuted,
    isFullscreen,
    onPrevPage,
    onNextPage,
    onToggleMute,
    onToggleFullscreen,
    onBookmark,
    onDownload,
    onShare
}) => {
    const progress = Math.round(((currentPage) / totalPages) * 100);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl glass-panel px-6 py-4 flex items-center justify-between z-50 transition-all duration-300 hover:bg-white/15">

            {/* Left Group: Audio & Info */}
            <div className="flex items-center gap-6">
                <button
                    onClick={onToggleMute}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                    title={isMuted ? "Unmute" : "Mute"}
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                <div className="hidden md:flex flex-col">
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Progress</span>
                    <span className="text-sm text-white font-bold">{progress}% Completed</span>
                </div>
            </div>

            {/* Center Group: Navigation */}
            <div className="flex items-center gap-4 md:gap-8">
                <button
                    onClick={onPrevPage}
                    className="group flex flex-col items-center gap-1 p-2 hover:bg-white/5 rounded-lg transition-all"
                    title="Previous Page"
                >
                    <ChevronLeft size={24} className="text-slate-300 group-hover:text-white group-hover:-translate-x-1 transition-transform" />
                </button>

                <div className="flex flex-col items-center min-w-[80px]">
                    <span className="text-2xl font-bold text-white tabular-nums">
                        {String(currentPage + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">Page</span>
                </div>

                <button
                    onClick={onNextPage}
                    className="group flex flex-col items-center gap-1 p-2 hover:bg-white/5 rounded-lg transition-all"
                    title="Next Page"
                >
                    <ChevronRight size={24} className="text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Right Group: Actions */}
            <div className="flex items-center gap-2 md:gap-3">
                <div className="flex items-center gap-1 md:gap-2 mr-2 md:mr-4 border-r border-white/10 pr-2 md:pr-4">
                    <ActionButton icon={Bookmark} onClick={onBookmark} label="Bookmark" />
                    <ActionButton icon={Download} onClick={onDownload} label="Download" />
                    <ActionButton icon={Share2} onClick={onShare} label="Share" />
                </div>

                <button
                    onClick={onToggleFullscreen}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
            </div>
        </div>
    );
};

const ActionButton = ({ icon: Icon, onClick, label }) => (
    <button
        onClick={onClick}
        className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all"
        title={label}
    >
        <Icon size={18} />
    </button>
);

export default Controls;
