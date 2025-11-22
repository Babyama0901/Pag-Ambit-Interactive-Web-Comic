/* eslint-disable react/prop-types */
import React, { useState } from 'react';
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
    SkipForward,
    MoreHorizontal,
    X
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
    const [showMenu, setShowMenu] = useState(false);
    const progress = (currentPage / totalPages) * 100;

    return (
        <>
            {/* Floating Dynamic Island Control Bar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4 w-full max-w-3xl px-4 pointer-events-none">

                {/* Main Control Pill */}
                <div className="pointer-events-auto bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-[2.5rem] p-2 flex items-center gap-2 transition-all duration-500 hover:bg-black/50 hover:scale-[1.01] hover:shadow-purple-500/20">

                    {/* Left: Playback/Nav */}
                    <div className="flex items-center gap-1 pl-2">
                        <IOSButton
                            onClick={onPrevPage}
                            icon={ChevronLeft}
                            label="Previous"
                            className="w-12 h-12 !rounded-full bg-white/5 hover:bg-white/10"
                        />

                        <div className="flex flex-col items-center justify-center w-24 px-2">
                            <span className="text-white font-semibold text-lg leading-none tracking-tight">
                                {currentPage + 1}
                            </span>
                            <span className="text-white/40 text-[10px] font-medium uppercase tracking-widest mt-0.5">
                                of {totalPages}
                            </span>
                        </div>

                        <IOSButton
                            onClick={onNextPage}
                            icon={ChevronRight}
                            label="Next"
                            className="w-12 h-12 !rounded-full bg-white/5 hover:bg-white/10"
                        />
                    </div>

                    <div className="w-px h-8 bg-white/10 mx-2" />

                    {/* Center: Progress Scrubber */}
                    <div className="flex-1 min-w-[120px] group cursor-pointer relative py-4">
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        {/* Hover Tooltip */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                            {Math.round(progress)}%
                        </div>
                    </div>

                    <div className="w-px h-8 bg-white/10 mx-2" />

                    {/* Right: Quick Actions */}
                    <div className="flex items-center gap-1 pr-1">
                        <IOSButton
                            onClick={onToggleMute}
                            icon={isMuted ? VolumeX : Volume2}
                            active={isMuted}
                            label="Mute"
                        />
                        <IOSButton
                            onClick={onToggleFullscreen}
                            icon={isFullscreen ? Minimize : Maximize}
                            active={isFullscreen}
                            label="Fullscreen"
                        />
                        <IOSButton
                            onClick={() => setShowMenu(!showMenu)}
                            icon={showMenu ? X : MoreHorizontal}
                            active={showMenu}
                            className={`transition-transform duration-300 ${showMenu ? 'rotate-90 bg-white text-black hover:bg-white/90' : ''}`}
                            label="Menu"
                        />
                    </div>
                </div>

                {/* Expanded Menu (iOS Sheet Style) */}
                <div className={`
                    pointer-events-auto w-full max-w-sm bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-4 shadow-2xl transition-all duration-500 origin-bottom
                    ${showMenu ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none absolute bottom-0'}
                `}>
                    <div className="grid grid-cols-4 gap-3">
                        <MenuButton icon={Search} label="Search" onClick={onSearch} />
                        <MenuButton icon={List} label="Contents" onClick={onTableOfContents} />
                        <MenuButton icon={Bookmark} label="Bookmark" onClick={onBookmark} />
                        <MenuButton icon={isNightMode ? Sun : Moon} label={isNightMode ? "Day" : "Night"} onClick={onToggleNightMode} active={isNightMode} />

                        <MenuButton icon={SkipBack} label="Start" onClick={onJumpToCover} />
                        <MenuButton icon={SkipForward} label="End" onClick={onJumpToEnd} />
                        <MenuButton icon={Printer} label="Print" onClick={onPrint} />
                        <MenuButton icon={Download} label="Save" onClick={onDownload} />
                    </div>

                    <button
                        onClick={onShare}
                        className="w-full mt-4 bg-white/10 hover:bg-white/20 active:scale-[0.98] transition-all rounded-xl p-3 flex items-center justify-center gap-2 text-white font-medium"
                    >
                        <Share2 size={18} />
                        <span>Share Book</span>
                    </button>
                </div>
            </div>
        </>
    );
};

const IOSButton = ({ icon: Icon, onClick, label, active, className = "" }) => (
    <button
        onClick={onClick}
        className={`
            relative group p-3 rounded-2xl transition-all duration-300 active:scale-90
            ${active ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-white hover:bg-white/10'}
            ${className}
        `}
        title={label}
    >
        <Icon size={20} strokeWidth={2} className="transition-transform duration-300 group-hover:scale-110" />
    </button>
);

const MenuButton = ({ icon: Icon, label, onClick, active }) => (
    <button
        onClick={onClick}
        className={`
            flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 active:scale-90
            ${active ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/50' : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'}
        `}
    >
        <Icon size={22} strokeWidth={1.5} />
        <span className="text-[10px] font-medium tracking-wide">{label}</span>
    </button>
);

export default Controls;
