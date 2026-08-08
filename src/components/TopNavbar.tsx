import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Crown, HelpCircle, MessageCircle, Disc as DiscordIcon, ChevronRight, ShieldCheck, Info, Volume2, VolumeX, ShoppingBag } from 'lucide-react';
import { SiteConfig } from '../types';

interface TopNavbarProps {
  config: SiteConfig;
  onShowAbout?: () => void;
  hasEntered?: boolean;
  audioState?: {
    isPlaying: boolean;
    toggleAudio: () => void;
  };
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ config, onShowAbout, hasEntered = true, audioState }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsSidebarOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Navbar with Glassmorphism / Glass Background (Sticky on Scroll) */}
      <motion.nav 
        initial={{ y: -60, opacity: 0 }}
        animate={hasEntered ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.1 }}
        className="sticky top-0 z-50 w-full bg-emerald-950/85 backdrop-blur-md px-3 sm:px-4 py-2.5 flex items-center justify-between shadow-md shadow-black/40 border-b border-emerald-900/60"
      >
        
        {/* Left Side: Sidebar Button + Logo + Server Name ONLY */}
        <div className="flex items-center gap-2.5">
          {/* Sidebar Menu Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg bg-gradient-to-b from-emerald-900/90 to-emerald-950 hover:from-emerald-800/90 hover:to-emerald-900 border border-emerald-900/60 text-white transition-all cursor-pointer flex items-center justify-center shadow-md shadow-black/40"
            aria-label="Buka Sidebar"
          >
            <Menu className="w-5 h-5 text-green-300" />
          </motion.button>

          {/* Logo & Server Name */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-emerald-700/50 shadow-md shadow-black/40">
              <img
                src={config.avatarUrl}
                alt={config.profileHandle}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-black text-white text-sm sm:text-base tracking-tight font-heading">
              {config.profileHandle}
            </span>
          </div>
        </div>

        {/* Right Side: Music Toggle Pill */}
        {audioState && (
          <button
            type="button"
            onClick={(e) => audioState.toggleAudio(e)}
            onTouchEnd={(e) => {
              e.preventDefault();
              audioState.toggleAudio(e);
            }}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-b from-emerald-900/90 to-emerald-950 active:from-emerald-800 border border-emerald-900/60 text-green-300 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-md shadow-black/40 active:scale-95 touch-manipulation select-none"
            title={audioState.isPlaying ? "Matikan Musik" : "Putar Musik"}
          >
            {audioState.isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-green-400 animate-pulse" />
                <span className="text-[11px] font-extrabold text-green-300">Music ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-emerald-400/80" />
                <span className="text-[11px] font-bold text-emerald-300/80">Music OFF</span>
              </>
            )}
          </button>
        )}

      </motion.nav>

      {/* Sidebar Overlay & Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 cursor-pointer"
            />

            {/* Sidebar Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-emerald-950 border-r border-emerald-900/60 text-emerald-50 z-50 p-5 flex flex-col justify-between shadow-2xl shadow-black/70 overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg overflow-hidden border border-emerald-700/50 shadow-md shadow-black/40 shrink-0">
                      <img
                        src={config.avatarUrl}
                        alt={config.profileHandle}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-sm font-heading leading-tight">
                        {config.profileHandle}
                      </h3>
                      <p className="text-[10px] text-green-300/90 font-semibold">GTPS Community</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-green-300 hover:text-white border border-emerald-800/80 cursor-pointer shadow-md shadow-black/40"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Sidebar Navigation */}
                <div className="mt-5 space-y-2">
                  <p className="text-[10px] font-black tracking-wider text-green-400/80 uppercase px-2 mb-1">
                    NAVIGATOR BAR
                  </p>

                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      if (onShowAbout) onShowAbout();
                    }}
                    className="w-full p-3 rounded-lg bg-gradient-to-b from-emerald-900/80 via-emerald-950/90 to-emerald-950 hover:from-emerald-800/80 hover:to-emerald-900 border border-emerald-900/60 flex items-center justify-between text-left transition-all cursor-pointer group shadow-md shadow-black/30"
                  >
                    <div className="flex items-center gap-2.5">
                      <Info className="w-4 h-4 text-green-400" />
                      <span className="text-xs font-black text-white group-hover:text-green-300">
                        TENTANG SERVER
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-green-400/60 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => scrollToSection('role-list-section')}
                    className="w-full p-3 rounded-lg bg-gradient-to-b from-emerald-900/80 via-emerald-950/90 to-emerald-950 hover:from-emerald-800/80 hover:to-emerald-900 border border-emerald-900/60 flex items-center justify-between text-left transition-all cursor-pointer group shadow-md shadow-black/30"
                  >
                    <div className="flex items-center gap-2.5">
                      <Crown className="w-4 h-4 text-green-400 fill-green-400/20" />
                      <span className="text-xs font-black text-white group-hover:text-green-300">
                        PRICE ROLE INGAME
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-green-400/60 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => scrollToSection('asset-store-section')}
                    className="w-full p-3 rounded-lg bg-gradient-to-b from-emerald-900/80 via-emerald-950/90 to-emerald-950 hover:from-emerald-800/80 hover:to-emerald-900 border border-emerald-900/60 flex items-center justify-between text-left transition-all cursor-pointer group shadow-md shadow-black/30"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShoppingBag className="w-4 h-4 text-green-400" />
                      <span className="text-xs font-black text-white group-hover:text-green-300">
                        ASSET, TITLE AND PACK
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-green-400/60 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => scrollToSection('how-to-play-section')}
                    className="w-full p-3 rounded-lg bg-gradient-to-b from-emerald-900/80 via-emerald-950/90 to-emerald-950 hover:from-emerald-800/80 hover:to-emerald-900 border border-emerald-900/60 flex items-center justify-between text-left transition-all cursor-pointer group shadow-md shadow-black/30"
                  >
                    <div className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs font-black text-white group-hover:text-green-300">
                        HOW TO PLAY RAWPS
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-green-400/60 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {audioState && (
                    <button
                      onClick={(e) => audioState.toggleAudio(e)}
                      className="w-full p-3 rounded-lg bg-gradient-to-b from-emerald-900/80 via-emerald-950/90 to-emerald-950 hover:from-emerald-800/80 border border-emerald-900/60 flex items-center justify-between text-left transition-all cursor-pointer group shadow-md shadow-black/30"
                    >
                      <div className="flex items-center gap-2.5">
                        {audioState.isPlaying ? (
                          <Volume2 className="w-4 h-4 text-green-400 animate-pulse" />
                        ) : (
                          <VolumeX className="w-4 h-4 text-emerald-400/70" />
                        )}
                        <span className="text-xs font-black text-white group-hover:text-green-300">
                          {audioState.isPlaying ? "Musik Latar: ON" : "Musik Latar: OFF"}
                        </span>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${audioState.isPlaying ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-emerald-950 text-emerald-400/80 border border-emerald-900/50'}`}>
                        {audioState.isPlaying ? "ON" : "OFF"}
                      </span>
                    </button>
                  )}
                </div>

                {/* Quick Community Links */}
                <div className="mt-6 space-y-2">
                  <p className="text-[10px] font-black tracking-wider text-green-400/80 uppercase px-2 mb-1">
                    Komunitas Official
                  </p>

                  <a
                    href="https://chat.whatsapp.com/BsMeUD5UwtJ97P79xRyphJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-gradient-to-b from-emerald-900/80 via-emerald-950/90 to-emerald-950 hover:from-emerald-800/80 border border-emerald-900/60 flex items-center gap-2.5 text-xs font-extrabold text-white transition-all shadow-md shadow-black/30"
                  >
                    <MessageCircle className="w-4 h-4 text-green-400" />
                    <span>WhatsApp Community</span>
                  </a>

                  <a
                    href={config.discordInvite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-indigo-950/90 hover:bg-indigo-900/90 border border-indigo-900/60 flex items-center gap-2.5 text-xs font-extrabold text-white transition-all shadow-md shadow-black/30"
                  >
                    <DiscordIcon className="w-4 h-4 text-indigo-400" />
                    <span>Discord Community</span>
                  </a>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="pt-4 border-t border-emerald-900/60 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/90 border border-emerald-900/60 text-[10px] font-bold text-green-300 shadow-md shadow-black/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                  <span>Raw Private Server 2026</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
