import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { TopNavbar } from './components/TopNavbar';
import { Header } from './components/Header';
import { HowToPlayCard } from './components/HowToPlayCard';
import { RoleListCard } from './components/RoleListCard';
import { AssetStoreCard } from './components/AssetStoreCard';
import { Footer } from './components/Footer';
import { AboutOverlay } from './components/AboutOverlay';

// Initial Data
import { initialSiteConfig, initialGtpsRoles } from './data/initialData';
import { initialAssetItems } from './data/assetData';
import { SiteConfig, GtpsRole, AssetItem } from './types';

// Audio Asset
import bgAudioUrl from './assets/websitesound/you-and-me-siyarou-128-ytshorts.savetube.me.mp3';

export default function App() {
  const [siteConfig] = useState<SiteConfig>(initialSiteConfig);
  const [roles] = useState<GtpsRole[]>(initialGtpsRoles);
  const [assetItems] = useState<AssetItem[]>(initialAssetItems);

  // Overlay & Entrance Animation State
  const [showAboutOverlay, setShowAboutOverlay] = useState<boolean>(true);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  // Audio State & Smooth Fading Controls (Web Audio API for iOS & Mobile Safari Compatibility)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFadingOutRef = useRef<boolean>(false);

  const TARGET_GAIN = 0.55;

  useEffect(() => {
    localStorage.setItem('lokigtps_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  // Clean up Web Audio Context & intervals on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Initialize Web Audio API node tree (fixes iOS HTMLMediaElement.volume read-only limitation)
  const initWebAudio = () => {
    if (!audioRef.current) return;

    if (!audioCtxRef.current) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const gain = ctx.createGain();
          const source = ctx.createMediaElementSource(audioRef.current);
          
          source.connect(gain);
          gain.connect(ctx.destination);

          audioCtxRef.current = ctx;
          gainNodeRef.current = gain;
          sourceNodeRef.current = source;
        }
      } catch (e) {
        console.warn('Web Audio API setup notice:', e);
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
  };

  const startFadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;

    initWebAudio();

    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;

    isFadingOutRef.current = false;

    // Call play inside user interaction chain
    const playPromise = audio.play();
    setIsPlaying(true);

    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);

        if (ctx && gain) {
          const now = ctx.currentTime;
          gain.gain.cancelScheduledValues(now);
          const startVal = gain.gain.value > 0.01 && gain.gain.value < TARGET_GAIN ? gain.gain.value : 0.001;
          gain.gain.setValueAtTime(startVal, now);
          // 4.2 seconds smooth exponential / linear fade in on iOS & Android
          gain.gain.linearRampToValueAtTime(TARGET_GAIN, now + 4.2);
        } else {
          // Standard HTML5 Audio fallback for older browsers
          audio.volume = 0.02;
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = setInterval(() => {
            if (audio && audio.volume < TARGET_GAIN) {
              audio.volume = Math.min(TARGET_GAIN, audio.volume + 0.008);
            } else {
              if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            }
          }, 50);
        }
      }).catch((err) => {
        console.warn('Audio play prevented on mobile device:', err);
        setIsPlaying(false);
      });
    }
  };

  const startFadeOutAndPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;

    if (ctx && gain) {
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      // Smooth 2 second fade out
      gain.gain.linearRampToValueAtTime(0.0001, now + 2.0);

      setTimeout(() => {
        audio.pause();
        setIsPlaying(false);
      }, 2050);
    } else {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.03) {
          audio.volume = Math.max(0, audio.volume - 0.015);
        } else {
          audio.volume = 0;
          audio.pause();
          setIsPlaying(false);
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        }
      }, 50);
    }
  };

  const startFadeOutAndLoop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;

    isFadingOutRef.current = true;

    if (ctx && gain) {
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 2.5);

      setTimeout(() => {
        audio.currentTime = 0;
        startFadeIn();
      }, 2550);
    } else {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      isFadingOutRef.current = true;

      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.03) {
          audio.volume = Math.max(0, audio.volume - 0.015);
        } else {
          audio.volume = 0;
          audio.currentTime = 0;
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          startFadeIn();
        }
      }, 50);
    }
  };

  const toggleAudio = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }

    const audio = audioRef.current;
    if (!audio) return;

    initWebAudio();

    if (isPlaying || (!audio.paused && audio.currentTime > 0)) {
      startFadeOutAndPause();
    } else {
      startFadeIn();
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    // Smoothly fade out 3.2s before track end and loop seamlessly
    const remainingTime = audio.duration - audio.currentTime;
    if (remainingTime <= 3.2 && !isFadingOutRef.current && isPlaying) {
      startFadeOutAndLoop();
    }
  };

  const handleContinue = () => {
    setShowAboutOverlay(false);
    setHasEntered(true);
    
    // Unlock Web Audio Context and play audio synchronously on tap
    startFadeIn();
  };

  return (
    <div 
      className="min-h-screen w-full bg-gradient-to-b from-emerald-900 via-green-900 to-emerald-950 text-emerald-50 font-sans antialiased selection:bg-green-300 selection:text-green-950 flex justify-center relative overflow-x-clip"
    >
      {/* Hidden Audio Element with Fade Controls */}
      <audio
        ref={audioRef}
        src={bgAudioUrl}
        preload="auto"
        playsInline
        onTimeUpdate={handleTimeUpdate}
      />

      {/* About Me Overlay Splash Screen */}
      <AnimatePresence>
        {showAboutOverlay && (
          <AboutOverlay
            key="about-overlay"
            config={siteConfig}
            onContinue={handleContinue}
          />
        )}
      </AnimatePresence>

      {/* Main Container - Pre-mounted without layout shift or uniform bottom jump */}
      <div 
        className={`w-full max-w-md flex flex-col justify-between relative min-h-screen z-10 shadow-2xl bg-emerald-950 transition-opacity duration-300 ${!hasEntered ? 'pointer-events-none select-none opacity-20' : 'opacity-100'}`}
      >
        {/* Glass Top Navigation Bar */}
        <TopNavbar
          config={siteConfig}
          onShowAbout={() => setShowAboutOverlay(true)}
          hasEntered={hasEntered}
          audioState={{ isPlaying, toggleAudio }}
        />

        {/* Main Content Area */}
        <main className="flex-1 pb-6 relative z-10">
          {/* Header & Profile */}
          <Header config={siteConfig} hasEntered={hasEntered} />

          {/* GTPS Roles Store Section */}
          <div id="role-list-section">
            <RoleListCard roles={roles} discordInvite={siteConfig.discordInvite} hasEntered={hasEntered} />
          </div>

          {/* GTPS Assets Store Section */}
          <div id="asset-store-section">
            <AssetStoreCard assets={assetItems} discordInvite={siteConfig.discordInvite} hasEntered={hasEntered} />
          </div>

          {/* How To Play Section */}
          <div id="how-to-play-section">
            <HowToPlayCard hasEntered={hasEntered} />
          </div>
        </main>

        {/* Footer Capsule */}
        <Footer copyrightText={siteConfig.copyrightText} hasEntered={hasEntered} />

      </div>
    </div>
  );
}





