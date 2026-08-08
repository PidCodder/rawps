import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AssetItem } from '../types';
import { ShoppingBag, Info, Sparkles } from 'lucide-react';

interface AssetStoreCardProps {
  assets: AssetItem[];
  discordInvite?: string;
  hasEntered?: boolean;
}

export const AssetStoreCard: React.FC<AssetStoreCardProps> = ({
  assets,
  discordInvite = 'https://discord.gg/hWu4yWy79x',
  hasEntered = true,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Item', icon: '🛒' },
    { id: 'magplant', label: 'Magplant', icon: '🥩' },
    { id: 'items', label: 'Asset Items', icon: '🔱' },
    { id: 'fishing', label: 'Fishing Pack', icon: '🧰' },
    { id: 'title', label: 'Asset Title', icon: '🗝️' },
  ];

  const filteredAssets = activeCategory === 'all'
    ? assets
    : assets.filter((item) => item.category === activeCategory);

  const handleOrderAsset = (item: AssetItem) => {
    window.open(discordInvite, '_blank');
  };

  // Group by category for section layout if 'all' is selected
  const groupedCategories = ['magplant', 'items', 'fishing', 'title'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={hasEntered ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
      className="w-full mt-8 px-2 sm:px-4"
    >
      <div className="relative text-emerald-100">
        {/* Section Header */}
        <div className="relative z-10 text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-800 mb-2 shadow-md shadow-black/30">
            <ShoppingBag className="w-3.5 h-3.5 text-green-400" />
            <span className="text-[11px] font-extrabold text-green-300 tracking-wide uppercase">
              GTPS Assets & Packs Store
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading">
            Item, Magplant & Title GTPS
          </h2>
          <p className="text-xs text-green-200/90 font-medium mt-1 max-w-xs mx-auto">
            Beli perlengkapan langka, Magplant, Fishing Pack, dan Title eksklusif server.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-1.5 mt-4 flex-wrap">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'text-white shadow-md shadow-black/40'
                      : 'bg-emerald-950/80 hover:bg-emerald-900/80 text-green-300/80 border border-emerald-900/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeAssetCategory"
                      className="absolute inset-0 bg-green-600 rounded-xl shadow-md shadow-black/30 border border-green-500/20"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Container */}
        <div className="space-y-6 relative z-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              className="space-y-6"
            >
              {activeCategory !== 'all' ? (
                // Single Category Grid
                <div className="space-y-3">
                  {filteredAssets.map((item, idx) => (
                    <AssetItemCard key={item.id} item={item} idx={idx} onOrder={handleOrderAsset} />
                  ))}
                </div>
              ) : (
                // All Categories Sectioned
                groupedCategories.map((catKey) => {
                  const catItems = assets.filter((a) => a.category === catKey);
                  if (catItems.length === 0) return null;

                  const firstItem = catItems[0];

                  return (
                    <div key={catKey} className="space-y-3">
                      {/* Section Title Banner */}
                      <div className="flex items-center gap-2 px-1 pb-1 border-b border-emerald-900/50">
                        <span className="text-base">{firstItem.categoryIcon}</span>
                        <h3 className="text-sm font-black text-white font-heading tracking-wide uppercase">
                          {firstItem.categoryTitle}
                        </h3>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        {catItems.map((item, idx) => (
                          <AssetItemCard key={item.id} item={item} idx={idx} onOrder={handleOrderAsset} />
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Tip Banner */}
        <div className="relative z-10 mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900/80 to-emerald-950 border border-emerald-900/50 flex items-start gap-3 text-left shadow-xl shadow-black/50">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-black/40 font-bold border border-indigo-500/30">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-black text-white">Informasi Pembelian Asset:</h5>
            <p className="text-[11px] text-green-200/90 font-medium leading-snug mt-0.5">
              Semua transaksi & pengiriman item dilakukan via Server Discord resmi. Silakan klik tombol Beli untuk langsung menuju Discord.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface AssetItemCardProps {
  item: AssetItem;
  idx: number;
  onOrder: (item: AssetItem) => void;
}

const AssetItemCard: React.FC<AssetItemCardProps> = ({ item, idx, onOrder }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * idx, type: 'spring', stiffness: 350, damping: 25 }}
      whileHover={{ y: -2 }}
      className="p-4 rounded-2xl bg-gradient-to-b from-emerald-900/90 via-emerald-950/95 to-emerald-950 border border-emerald-900/50 transition-all shadow-xl shadow-black/50 text-left overflow-hidden"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5">
          {/* Icon */}
          <div className="w-9 h-9 rounded-xl bg-green-600/90 text-white flex items-center justify-center shrink-0 text-lg shadow-md shadow-black/40 border border-green-500/20">
            {item.itemIcon || '📦'}
          </div>

          <div>
            <h4 className="text-base font-black text-white tracking-tight font-heading leading-tight">
              {item.name}
            </h4>
            <div className="text-xs font-bold text-green-200/80 flex items-center gap-1.5 mt-0.5">
              <span>Price:</span>
              <span className="text-green-300 font-extrabold text-sm font-mono">
                {item.price}
              </span>
            </div>
          </div>
        </div>

        {/* Badge */}
        {item.badge && (
          <span className="text-[10px] font-black px-2.5 py-1 rounded-full shadow-md shadow-black/40 bg-amber-400 text-stone-950 shrink-0">
            {item.badge}
          </span>
        )}
      </div>

      {/* Details Box */}
      {item.details && item.details.length > 0 && (
        <div className="mt-2.5 p-3 rounded-xl bg-black/60 text-emerald-100 font-mono text-[11px] leading-relaxed mb-3 shadow-inner border border-emerald-950/80 space-y-1">
          {item.details.map((detail, dIdx) => (
            <p key={dIdx} className="text-green-200/90 font-medium">
              {detail}
            </p>
          ))}
          <p className="text-emerald-400/90 font-bold text-[10.5px]">
            Price: {item.price}
          </p>
        </div>
      )}

      {/* Order Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={() => onOrder(item)}
        className="w-full mt-1 py-2.5 px-3.5 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-400 hover:to-lime-400 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-black/40 transition-all cursor-pointer border border-green-400/30"
      >
        <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        <span>ORDER {item.name.toUpperCase()} CLICK HERE</span>
      </motion.button>
    </motion.div>
  );
};
