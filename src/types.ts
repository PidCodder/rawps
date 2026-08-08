export interface SocialLink {
  id: string;
  platform: 'youtube' | 'tiktok' | 'discord' | 'whatsapp' | 'instagram' | 'telegram';
  title: string;
  url: string;
  color?: string;
}

export interface PromoteService {
  id: string;
  title: string;
  subtitle: string;
  platform: string;
  buttonText: string;
  url: string;
  isPrimary?: boolean;
}

export interface YouTubeVideo {
  id: string;
  serverCode: string; // e.g. "MXPS", "RAWPS", "GTID", "RICHPS", "FORCEPS", "GTFY"
  title: string;
  role: string; // e.g. "@Developer 👑", "@Moderator 🎨", "@SDEV 👑"
  timeAgo: string;
  views: string;
  youtubeUrl: string;
  youtubeEmbedId?: string;
  serverName: string;
  serverType: string; // e.g. "Mid Economy", "Easy Economy", "Super Mod"
  ip: string;
  port: number;
  hostUrl?: string;
  apkUrl?: string;
  discordUrl?: string;
  likesCount?: number;
  thumbnailImg?: string;
}

export interface GtpsServer {
  id: string;
  name: string;
  code: string;
  subtitle: string;
  features: string[];
  playersOnline: number;
  maxPlayers: number;
  ip: string;
  port: number;
  hostUrl: string;
  apkUrl: string;
  discordUrl: string;
  isFeatured?: boolean;
  logoUrl?: string;
  status: 'online' | 'offline' | 'maintenance';
}

export interface PromotePackage {
  id: string;
  name: string;
  duration: string;
  priceIdr: number;
  priceWl: number; // World Locks
  priceDl: number; // Diamond Locks
  priceBgl: number; // Blue Gem Locks
  features: string[];
  isPopular?: boolean;
  badge?: string;
}

export interface SiteConfig {
  profileHandle: string;
  profileTitle: string;
  tagline: string;
  categories: string;
  bannerUrl: string;
  avatarUrl: string;
  copyrightText: string;
  whatsappNumber: string;
  discordInvite: string;
}

export interface GtpsRole {
  id: string;
  name: string;
  price: string;
  badge?: string;
  accessChannel?: string;
  colorScheme: {
    border: string;
    text: string;
    badgeBg: string;
    glow: string;
    iconBg: string;
    codeBg: string;
  };
  commandsHeader?: string;
  commands?: string;
  privileges: string[];
}

export interface AssetItem {
  id: string;
  category: 'magplant' | 'items' | 'fishing' | 'title';
  categoryTitle: string;
  categoryIcon: string;
  name: string;
  itemIcon?: string;
  details?: string[];
  price: string;
  badge?: string;
}

