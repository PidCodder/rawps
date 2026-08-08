import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Monitor, Apple, Copy, Check, Download, Terminal, Sparkles, Info } from 'lucide-react';

type Platform = 'android' | 'windows' | 'ios' | 'macos';

interface HowToPlayCardProps {
  hasEntered?: boolean;
}

export const HowToPlayCard: React.FC<HowToPlayCardProps> = ({ hasEntered = true }) => {
  const [activePlatform, setActivePlatform] = useState<Platform>('android');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedHosts, setCopiedHosts] = useState(false);

  const androidHostUrl = "https://gtpshosting.web.id/raw/raw";
  const iosSurgeUrl = "https://gtpshosting.web.id/ios/raw";
  const hostIpContent = "134.209.100.90 www.growtopia1.com\n134.209.100.90 www.growtopia2.com";

  const handleCopyAndroidUrl = () => {
    navigator.clipboard.writeText(androidHostUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyIosUrl = () => {
    navigator.clipboard.writeText(iosSurgeUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyHosts = () => {
    navigator.clipboard.writeText(hostIpContent);
    setCopiedHosts(true);
    setTimeout(() => setCopiedHosts(false), 2000);
  };

  const platforms: { 
    id: Platform; 
    name: string; 
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'android', name: 'Android', icon: Smartphone },
    { id: 'windows', name: 'Windows', icon: Monitor },
    { id: 'ios', name: 'iOS', icon: Apple },
    { id: 'macos', name: 'macOS', icon: Terminal },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={hasEntered ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.88 }}
      className="w-full mt-6 px-2 sm:px-4"
    >
      <div className="relative text-emerald-100">
          
        {/* Section Header */}
        <div className="relative z-10 text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-800 mb-2 shadow-md shadow-black/30">
            <Sparkles className="w-3.5 h-3.5 text-green-400 fill-green-300 animate-pulse" />
            <span className="text-[11px] font-extrabold text-green-300 tracking-wide uppercase">Panduan Koneksi</span>
            <Sparkles className="w-3.5 h-3.5 text-green-400 fill-green-300 animate-pulse" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
            Cara Bermain Raw PS
          </h2>
          <p className="text-xs text-green-200/90 font-medium mt-1 max-w-xs mx-auto">
            Pilih jenis OS perangkat kamu untuk petunjuk installasi & IP host.
          </p>
        </div>

        {/* Platform Selector Tabs */}
        <div className="relative z-10 grid grid-cols-4 gap-1 p-1.5 bg-emerald-950/90 rounded-2xl mb-5 border border-emerald-800 shadow-inner">
          {platforms.map((p) => {
            const Icon = p.icon;
            const isActive = activePlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePlatform(p.id)}
                className={`relative py-2.5 px-1 rounded-xl font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isActive 
                    ? 'text-white' 
                    : 'text-green-300/70 hover:text-white hover:bg-emerald-900/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-green-600 rounded-xl shadow-md shadow-black/30"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-green-400'}`} />
                  <span className="text-[11px] sm:text-xs tracking-tight font-extrabold">{p.name}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Platform Content Box */}
        <div className="relative z-10 min-h-[260px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activePlatform}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              className="space-y-2.5"
            >
              {/* ANDROID INSTRUCTIONS */}
              {activePlatform === 'android' && (
                <div className="space-y-2.5">
                  <StepItem 
                    number="01" 
                    title="Install PowerTunnel" 
                    description="Download from official releases and install the APK on your device." 
                  />
                  <StepItem 
                    number="02" 
                    title="Configure Host Settings" 
                    description="Open PowerTunnel → ☰ → Host Settings → Host list URL" 
                  />
                  <StepItem 
                    number="03" 
                    title="Paste URL" 
                    description="Click Copy URL and paste it into PowerTunnel."
                    action={
                      <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          onClick={handleCopyAndroidUrl}
                          className="py-2 px-3.5 bg-green-600 hover:bg-green-500 text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-black/30 border border-green-500/30 cursor-pointer"
                        >
                          {copiedUrl ? <Check className="w-4 h-4 text-green-100" /> : <Copy className="w-4 h-4 text-green-100" />}
                          <span>{copiedUrl ? 'URL Copied!' : 'Copy URL'}</span>
                        </motion.button>

                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          href="/raw-vhost.txt"
                          download="raw-vhost.txt"
                          className="py-2 px-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-black/30 cursor-pointer border border-emerald-700/60"
                        >
                          <Download className="w-4 h-4 text-green-100" />
                          <span>Download vHost</span>
                        </motion.a>
                      </div>
                    }
                  />
                  <StepItem 
                    number="04" 
                    title="Start" 
                    description="Set Update period to On start, then press Start." 
                  />
                  <StepItem 
                    number="05" 
                    title="Launch Growtopia" 
                    description="Open Growtopia and click Play." 
                  />
                </div>
              )}

              {/* WINDOWS INSTRUCTIONS */}
              {activePlatform === 'windows' && (
                <div className="space-y-2.5">
                  <StepItem 
                    number="01" 
                    title="Run Notepad as Administrator" 
                    description='Right-click Notepad and choose "Run as Administrator".' 
                  />
                  <StepItem 
                    number="02" 
                    title="Open hosts file" 
                    description="Go to File → Open and navigate to:"
                    code="C:\Windows\System32\drivers\etc\hosts"
                  />
                  <StepItem 
                    number="03" 
                    title="Add entries" 
                    description="Click Copy Hosts, paste the two lines at the bottom of the file, then Save (Ctrl + S)."
                    action={
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        onClick={handleCopyHosts}
                        className="mt-2.5 py-2 px-3.5 bg-green-600 hover:bg-green-500 text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-black/30 border border-green-500/30 cursor-pointer"
                      >
                        {copiedHosts ? <Check className="w-4 h-4 text-green-100" /> : <Copy className="w-4 h-4 text-green-100" />}
                        <span>{copiedHosts ? 'Hosts Copied!' : 'Copy Hosts'}</span>
                      </motion.button>
                    }
                  />
                  <StepItem 
                    number="04" 
                    title="Launch Growtopia" 
                    description="Open Growtopia and click Play." 
                  />
                </div>
              )}

              {/* IOS INSTRUCTIONS */}
              {activePlatform === 'ios' && (
                <div className="space-y-2.5">
                  <StepItem 
                    number="01" 
                    title="Install Surge 5" 
                    description="Download and install Surge 5 from the App Store." 
                  />
                  <StepItem 
                    number="02" 
                    title="Import Profile" 
                    description="Open Default.conf → tap IMPORT → Download Profile from URL." 
                  />
                  <StepItem 
                    number="03" 
                    title="Paste URL and Setup" 
                    description="Click Copy URL, paste into Surge, then tap SETUP and allow the VPN profile."
                    action={
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        onClick={handleCopyIosUrl}
                        className="mt-2.5 py-2 px-3.5 bg-green-600 hover:bg-green-500 text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-black/30 border border-green-500/30 cursor-pointer"
                      >
                        {copiedUrl ? <Check className="w-4 h-4 text-green-100" /> : <Copy className="w-4 h-4 text-green-100" />}
                        <span>{copiedUrl ? 'URL Copied!' : 'Copy URL'}</span>
                      </motion.button>
                    }
                  />
                  <StepItem 
                    number="04" 
                    title="Launch Growtopia" 
                    description="Open Growtopia and click Play." 
                  />
                </div>
              )}

              {/* MACOS INSTRUCTIONS */}
              {activePlatform === 'macos' && (
                <div className="space-y-2.5">
                  <StepItem 
                    number="01" 
                    title="Open Terminal" 
                    description='Open Terminal via Spotlight → type "Terminal" and press Enter.' 
                  />
                  <StepItem 
                    number="02" 
                    title="Edit hosts file" 
                    description="Run the following command:"
                    code="sudo nano /etc/hosts"
                  />
                  <StepItem 
                    number="03" 
                    title="Add entries" 
                    description="Click Copy Hosts, paste the two lines at the bottom of the file, then save with Ctrl+X then Y."
                    action={
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        onClick={handleCopyHosts}
                        className="mt-2.5 py-2 px-3.5 bg-green-600 hover:bg-green-500 text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-black/30 border border-green-500/30 cursor-pointer"
                      >
                        {copiedHosts ? <Check className="w-4 h-4 text-green-100" /> : <Copy className="w-4 h-4 text-green-100" />}
                        <span>{copiedHosts ? 'Hosts Copied!' : 'Copy Hosts'}</span>
                      </motion.button>
                    }
                  />
                  <StepItem 
                    number="04" 
                    title="Launch Growtopia" 
                    description="Open Growtopia and click Play." 
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Tip / Help Banner */}
        <div className="relative z-10 mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900/80 to-emerald-950 border border-emerald-900/50 flex items-start gap-3 text-left shadow-xl shadow-black/50">
          <div className="w-7 h-7 rounded-xl bg-green-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-black/40 font-bold border border-green-500/20">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-black text-white">Tips Penting:</h5>
            <p className="text-[11px] text-green-200/90 font-medium leading-snug mt-0.5">
              Pastikan PowerTunnel atau file Hosts sudah aktif sebelum kamu membuka aplikasi Growtopia agar bisa terhubung ke Raw Private Server.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* Helper Sub-Component for Clean Step Card Rows */
interface StepItemProps {
  number: string;
  title: string;
  description: string;
  code?: string;
  action?: React.ReactNode;
}

const StepItem: React.FC<StepItemProps> = ({ number, title, description, code, action }) => {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-emerald-900/90 via-emerald-950/95 to-emerald-950 border border-emerald-900/50 transition-colors text-left shadow-xl shadow-black/50"
    >
      <div className="flex items-start gap-3">
        {/* Step Badge */}
        <div className="w-7 h-7 rounded-xl bg-green-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-md shadow-black/40 border border-green-500/20">
          {number}
        </div>

        <div className="flex-1">
          <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
            {title}
          </h4>
          <p className="text-[11px] sm:text-xs text-green-200/90 font-medium mt-0.5 leading-relaxed">
            {description}
          </p>

          {/* Optional Code Block */}
          {code && (
            <div className="mt-2 p-2.5 bg-black/60 text-green-300 font-mono text-[10px] sm:text-[11px] rounded-xl border border-emerald-950/80 select-all overflow-x-auto shadow-inner">
              {code}
            </div>
          )}

          {/* Optional Action Button */}
          {action}
        </div>
      </div>
    </motion.div>
  );
};
