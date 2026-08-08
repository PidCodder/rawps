import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SiteConfig } from '../types';

interface AboutOverlayProps {
  config: SiteConfig;
  onContinue: () => void;
}

export const AboutOverlay: React.FC<AboutOverlayProps> = ({ config, onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/95 backdrop-blur-xl overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.88, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: -20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, delay: 0.15 }}
        className="w-full max-w-sm relative rounded-3xl shadow-2xl shadow-black/50 bg-emerald-950 p-6 text-center text-emerald-50 my-auto border-0 overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-green-400/10 blur-2xl pointer-events-none rounded-full" />

        {/* Logo / Avatar */}
        <div className="relative z-10 flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.35 }}
            className="p-1 rounded-full bg-emerald-800/60 shadow-lg"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white">
              <img
                src={config.avatarUrl}
                alt={config.profileHandle}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>

        {/* Header Title */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="relative z-10"
        >
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
            {config.profileHandle}
          </h1>
          <p className="text-xs text-green-300/90 font-bold mt-1">
            {config.profileTitle}
          </p>
        </motion.div>

        {/* About Me Description */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.65, ease: 'easeOut' }}
          className="relative z-10 mt-4 text-center text-xs leading-relaxed text-green-100/90 font-medium"
        >
          <p className="mb-2">
            Selamat datang di portal resmi <strong className="text-white font-black">{config.profileHandle}</strong>!
          </p>
          <p className="text-green-200/80">
            Tempat terbaik untuk melihat katalog Role Store eksklusif, panduan koneksi GTPS untuk Android, iOS & Windows, serta link komunitas official kami.
          </p>
        </motion.div>

        {/* Lanjutkan Button */}
        <motion.div 
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="relative z-10 mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={onContinue}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-400 hover:to-lime-400 text-white font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-black/40 cursor-pointer"
          >
            <span>Lanjutkan ke Menu Utama</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

