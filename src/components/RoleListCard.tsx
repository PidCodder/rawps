import React from 'react';
import { motion } from 'motion/react';
import { GtpsRole } from '../types';
import { Shield, Crown, Terminal, Sparkles, CheckCircle2, Info, ShoppingBag } from 'lucide-react';

interface RoleListCardProps {
  roles: GtpsRole[];
  discordInvite?: string;
  hasEntered?: boolean;
}

export const RoleListCard: React.FC<RoleListCardProps> = ({ roles, discordInvite = 'https://discord.gg/hWu4yWy79x', hasEntered = true }) => {
  const handleOrderRole = (role: GtpsRole) => {
    window.open(discordInvite, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={hasEntered ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
      className="w-full mt-6 px-2 sm:px-4"
    >
      {/* Container without outer card box background */}
      <div className="relative text-emerald-100">
          
        {/* Section Header */}
        <div className="relative z-10 text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-800 mb-2 shadow-md shadow-black/30">
            <Crown className="w-3.5 h-3.5 text-green-400 fill-green-300" />
            <span className="text-[11px] font-extrabold text-green-300 tracking-wide uppercase">In-Game Role Store</span>
            <Crown className="w-3.5 h-3.5 text-green-400 fill-green-300" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
            Daftar Akses & Role GTPS
          </h2>
          <p className="text-xs text-green-200/90 font-medium mt-1 max-w-xs mx-auto">
            Beli role resmi untuk mendapatkan perintah khusus, title unik, dan keuntungan Discord.
          </p>
        </div>

        {/* Role Cards List Stack */}
        <div className="space-y-3.5 relative z-10">
          {roles.map((role, idx) => {
            const isMod = role.id === 'role-mod';
            const isDev = role.id === 'role-dev';
            const isSdev = role.id === 'role-sdev';
            const isUnli = role.id === 'role-unli';
            const isReseller = role.id === 'role-reseller';
            const isMidman = role.id === 'role-midman';

            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * idx, type: 'spring', stiffness: 350, damping: 25 }}
                whileHover={{ y: -2 }}
                className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-b from-emerald-900/90 via-emerald-950/95 to-emerald-950 border border-emerald-900/50 transition-all shadow-xl shadow-black/50 text-left overflow-hidden"
              >
                {/* Channel Access Badge if provided */}
                {role.accessChannel && (
                  <div className="mb-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950/90 border border-indigo-900/60 text-indigo-200 text-[10px] font-extrabold shadow-md shadow-black/40">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Akses Channel: {role.accessChannel}</span>
                  </div>
                )}

                {/* Top Row: Icon + Title + Slot Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    {/* Role Icon */}
                    <div className="w-9 h-9 rounded-xl bg-green-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-black/40 border border-green-500/20">
                      {isMod && <Shield className="w-4 h-4 text-purple-200" />}
                      {isDev && <Terminal className="w-4 h-4 text-amber-200" />}
                      {isSdev && <Crown className="w-4 h-4 text-amber-300" />}
                      {isUnli && <Sparkles className="w-4 h-4 text-sky-200" />}
                      {isReseller && <ShoppingBag className="w-4 h-4 text-green-100" />}
                      {isMidman && <Crown className="w-4 h-4 text-amber-200" />}
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white tracking-tight font-heading leading-tight">
                        {role.name}
                      </h3>
                      <div className="text-xs font-bold text-green-200/80 flex items-center gap-1.5 mt-0.5">
                        <span>Harga:</span>
                        <span className="text-green-300 font-extrabold text-sm">
                          {role.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Slot Badge */}
                  {role.badge && (
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full shadow-md shadow-black/40 bg-amber-400 text-stone-950 shrink-0">
                      {role.badge}
                    </span>
                  )}
                </div>

                {/* Commands Code Box (Darker background) */}
                {(role.commandsHeader || role.commands) && (
                  <div className="mt-2.5 p-3 rounded-xl bg-black/60 text-emerald-100 font-mono text-[11px] leading-relaxed mb-3 shadow-inner border border-emerald-950/80">
                    {role.commandsHeader && (
                      <p className="text-green-400 font-bold mb-1">{role.commandsHeader}</p>
                    )}
                    {role.commands && (
                      <p className="text-green-100/90 font-medium whitespace-pre-line text-[10.5px]">
                        {role.commands}
                      </p>
                    )}
                  </div>
                )}

                {/* Privileges Bullets (Slightly darker background) */}
                <div className="space-y-1.5 my-3 bg-black/40 p-3 rounded-xl border border-emerald-950/80 shadow-inner">
                  {role.privileges.map((priv, pIdx) => {
                    const isMinus = priv.startsWith('NO INCLUDE');
                    return (
                      <div key={pIdx} className="flex items-start gap-2 text-xs font-semibold">
                        <span className={`font-bold mt-0.5 ${isMinus ? 'text-red-400' : 'text-green-400'}`}>
                          {isMinus ? '✕' : '✓'}
                        </span>
                        <span className={isMinus ? 'text-red-300 font-bold' : 'text-emerald-100'}>
                          {priv}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Order Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={() => handleOrderRole(role)}
                  className="w-full mt-1 py-2.5 px-3.5 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-400 hover:to-lime-400 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-black/40 transition-all cursor-pointer border border-green-400/30"
                >
                  <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span>CLICK TO ORDER {role.name} </span>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Tip Banner */}
        <div className="relative z-10 mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900/80 to-emerald-950 border border-emerald-900/50 flex items-start gap-3 text-left shadow-xl shadow-black/50">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-black/40 font-bold border border-indigo-500/30">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-black text-white">Informasi Pembelian Role:</h5>
            <p className="text-[11px] text-green-200/90 font-medium leading-snug mt-0.5">
              Proses transaksi dan aktivasi role dilakukan via Server Discord resmi. Silakan klik tombol di atas untuk menuju Discord Raw Private Server.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

