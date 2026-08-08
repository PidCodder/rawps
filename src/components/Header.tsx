import React from 'react';
import { motion } from 'motion/react';
import { SiteConfig } from '../types';

interface HeaderProps {
  config: SiteConfig;
  hasEntered?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ config, hasEntered = true }) => {
  return (
    <div className="relative w-full flex flex-col items-center pt-2 sm:pt-4 px-3 sm:px-4">
      
      {/* Top Banner Box */}
      <motion.div 
        initial={{ scale: 0.88, opacity: 0, y: -15, filter: 'blur(6px)' }}
        animate={hasEntered ? { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' } : { scale: 0.88, opacity: 0, y: -15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative w-full rounded-2xl overflow-hidden shadow-xl shadow-black/50 border border-emerald-800/80 bg-emerald-950"
      >
        <div className="relative w-full overflow-hidden">
          <img
            src={config.bannerUrl}
            alt="Raw Private Server Banner"
            className="w-full h-auto object-cover object-center block"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      {/* Profile Avatar circle overlapping banner */}
      <motion.div 
        initial={{ scale: 0, opacity: 0, rotate: -25 }}
        animate={hasEntered ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -25 }}
        transition={{ delay: 0.25, type: 'spring', stiffness: 180, damping: 18 }}
        className="-mt-14 sm:-mt-16 relative z-10 flex flex-col items-center"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-emerald-800/80 shadow-2xl shadow-black/60 border border-emerald-700/60 cursor-pointer"
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-white">
            <img
              src={config.avatarUrl}
              alt={config.profileHandle}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Profile Info matching text in reference photo */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        className="text-center mt-2 px-2 flex flex-col items-center"
      >
        <div className="flex items-center gap-1.5 justify-center">
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading drop-shadow-md">
            {config.profileHandle}
          </h1>
        </div>

        <p className="text-xs sm:text-sm font-extrabold text-green-200 mt-1 flex items-center justify-center gap-1">
          {config.profileTitle}
        </p>

        <p className="text-[11px] sm:text-xs font-semibold text-emerald-100/90 mt-0.5 max-w-xs leading-snug">
          {config.tagline}
        </p>

        {/* Category list in clean dark pill */}
        <div className="mt-2 px-3 py-1 bg-emerald-900/80 border border-emerald-800 rounded-full inline-block shadow-md shadow-black/30">
          <p className="text-[10px] sm:text-[11px] font-black text-green-300">
            {config.categories}
          </p>
        </div>

        {/* Full width stacked community buttons (1 item per row) */}
        <div className="w-full flex flex-col gap-2.5 mt-4 px-1 sm:px-2">
          {/* Raw Community Whatsapp */}
          <motion.a
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={hasEntered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.52 }}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="https://chat.whatsapp.com/BsMeUD5UwtJ97P79xRyphJ"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-between shadow-lg shadow-black/40 font-extrabold cursor-pointer select-none border border-green-500/30"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.484 1.332 5.003L2 22l5.127-1.341c1.468.802 3.123 1.225 4.881 1.226h.004c5.507 0 9.99-4.478 9.99-9.985 0-2.668-1.039-5.176-2.926-7.062A9.919 9.919 0 0 0 12.012 2zm5.66 14.18c-.234.658-1.363 1.201-1.884 1.258-.522.057-1.196.223-3.92-.888-3.27-1.334-5.362-4.66-5.526-4.877-.163-.217-1.328-1.768-1.328-3.372 0-1.603.837-2.393 1.137-2.716.3-.323.655-.404.873-.404.218 0 .436.002.628.012.203.01.474-.078.742.565.275.659.939 2.296 1.021 2.463.082.167.137.363.027.581-.109.218-.163.354-.327.545-.163.19-.344.425-.49.571-.163.163-.334.341-.144.668.19.327.844 1.393 1.81 2.254 1.242 1.107 2.29 1.45 2.618 1.613.327.163.518.136.709-.082.19-.218.818-.953 1.036-1.28.218-.327.436-.273.736-.163.3.109 1.91.9 2.237 1.064.327.163.545.245.627.382.082.136.082.79-.152 1.448z"/>
                </svg>
              </div>
              <span className="text-xs sm:text-sm tracking-tight">Raw Comunity Whatsapp</span>
            </div>
          </motion.a>

          {/* Raw Community Discord */}
          <motion.a
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={hasEntered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href={config.discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white flex items-center justify-between shadow-lg shadow-black/40 font-extrabold cursor-pointer select-none border border-indigo-500/30"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <span className="text-xs sm:text-sm tracking-tight">Raw Comunity Discord</span>
            </div>
          </motion.a>

          {/* Custom Items Promo Text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
            className="w-full text-center font-extrabold text-[11px] sm:text-xs text-amber-300 tracking-wide uppercase py-1 select-none block"
          >
            HAVE MANY COSTUM ITEM SELLING, WANNA SEE? JOIN DC
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};



