import React from 'react';
import { motion } from 'motion/react';

interface FooterProps {
  copyrightText?: string;
  hasEntered?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ copyrightText = '© 2026 Copyright by Raw Private Server', hasEntered = true }) => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 15 }}
      animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
      className="w-full my-8 px-4 flex justify-center"
    >
      <motion.div 
        whileHover={{ scale: 1.05, y: -1, boxShadow: "0 0 20px rgba(74, 222, 128, 0.6)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="bg-green-500 hover:bg-green-400 text-white font-extrabold text-xs px-6 py-2.5 rounded-full shadow-md shadow-green-500/20 border-2 border-green-300 tracking-wide flex items-center justify-center gap-1.5 transition-colors cursor-pointer select-none"
      >
        <span>{copyrightText}</span>
      </motion.div>
    </motion.footer>
  );
};


