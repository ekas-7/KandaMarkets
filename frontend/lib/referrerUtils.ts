// Referrer and location utilities

export type ReferrerCategory = 
  | 'direct'
  | 'search'
  | 'social'
  | 'email'
  | 'referral'
  | 'campaign'
  | 'internal';

export interface ReferrerInfo {
  category: ReferrerCategory;
  source: string;
  domain?: string;
}

// Categorize referrer source
export function categorizeReferrer(referrer: string, utmSource?: string): ReferrerInfo {
  // Direct traffic (no referrer)
  if (!referrer || referrer === '') {
    return { category: 'direct', source: 'Direct' };
  }

  // UTM Campaign
  if (utmSource) {
    return { category: 'campaign', source: utmSource };
  }

  const lowerReferrer = referrer.toLowerCase();
  const url = new URL(referrer);
  const domain = url.hostname.replace('www.', '');

  // Internal traffic
  if (typeof window !== 'undefined' && domain === window.location.hostname.replace('www.', '')) {
    return { category: 'internal', source: 'Internal', domain };
  }

  // Search Engines
  const searchEngines = [
    { pattern: /google\./i, name: 'Google' },
    { pattern: /bing\./i, name: 'Bing' },
    { pattern: /yahoo\./i, name: 'Yahoo' },
    { pattern: /duckduckgo\./i, name: 'DuckDuckGo' },
    { pattern: /baidu\./i, name: 'Baidu' },
    { pattern: /yandex\./i, name: 'Yandex' },
    { pattern: /ask\./i, name: 'Ask' },
    { pattern: /ecosia\./i, name: 'Ecosia' },
  ];

  for (const engine of searchEngines) {
    if (engine.pattern.test(lowerReferrer)) {
      return { category: 'search', source: engine.name, domain };
    }
  }

  // Social Media
  const socialMedia = [
    { pattern: /facebook\.|fb\./i, name: 'Facebook' },
    { pattern: /instagram\./i, name: 'Instagram' },
    { pattern: /twitter\.|x\./i, name: 'Twitter/X' },
    { pattern: /linkedin\./i, name: 'LinkedIn' },
    { pattern: /pinterest\./i, name: 'Pinterest' },
    { pattern: /reddit\./i, name: 'Reddit' },
    { pattern: /tiktok\./i, name: 'TikTok' },
    { pattern: /youtube\./i, name: 'YouTube' },
    { pattern: /snapchat\./i, name: 'Snapchat' },
    { pattern: /whatsapp\./i, name: 'WhatsApp' },
    { pattern: /telegram\./i, name: 'Telegram' },
    { pattern: /discord\./i, name: 'Discord' },
    { pattern: /twitch\./i, name: 'Twitch' },
  ];

  for (const platform of socialMedia) {
    if (platform.pattern.test(lowerReferrer)) {
      return { category: 'social', source: platform.name, domain };
    }
  }

  // Email clients
  const emailPatterns = [
    /mail\./i,
    /gmail\./i,
    /outlook\./i,
    /yahoo.*mail/i,
    /protonmail\./i,
  ];

  for (const pattern of emailPatterns) {
    if (pattern.test(lowerReferrer)) {
      return { category: 'email', source: 'Email', domain };
    }
  }

  // Everything else is a referral
  return { 
    category: 'referral', 
    source: domain,
    domain 
  };
}

// Extract search keywords from referrer (if possible)
export function extractSearchKeywords(referrer: string): string | null {
  if (!referrer) return null;
  
  try {
    const url = new URL(referrer);
    
    // Google search
    if (/google\./i.test(referrer)) {
      return url.searchParams.get('q');
    }
    
    // Bing search
    if (/bing\./i.test(referrer)) {
      return url.searchParams.get('q');
    }
    
    // Yahoo search
    if (/yahoo\./i.test(referrer)) {
      return url.searchParams.get('p');
    }
    
    // DuckDuckGo
    if (/duckduckgo\./i.test(referrer)) {
      return url.searchParams.get('q');
    }
  } catch (e) {
    return null;
  }
  
  return null;
}

// Get social media campaign details from URL
export function extractSocialCampaign(referrer: string): {
  platform?: string;
  campaignId?: string;
  adId?: string;
} {
  if (!referrer) return {};
  
  try {
    const url = new URL(referrer);
    
    // Facebook/Instagram ads
    if (/facebook\.|instagram\./i.test(referrer)) {
      return {
        platform: /instagram\./i.test(referrer) ? 'Instagram' : 'Facebook',
        campaignId: url.searchParams.get('fbclid') || undefined,
      };
    }
    
    // LinkedIn ads
    if (/linkedin\./i.test(referrer)) {
      return {
        platform: 'LinkedIn',
        campaignId: url.searchParams.get('li_fat_id') || undefined,
      };
    }
    
    // Twitter/X
    if (/twitter\.|x\./i.test(referrer)) {
      return {
        platform: 'Twitter/X',
        campaignId: url.searchParams.get('twclid') || undefined,
      };
    }
  } catch (e) {
    return {};
  }
  
  return {};
}

// Format referrer for display
export function formatReferrer(referrer: string): string {
  if (!referrer) return 'Direct';
  
  try {
    const url = new URL(referrer);
    return url.hostname.replace('www.', '');
  } catch (e) {
    return referrer;
  }
}

// Get referrer category icon/emoji
export function getReferrerIcon(category: ReferrerCategory): string {
  const icons: Record<ReferrerCategory, string> = {
    direct: '🔗',
    search: '🔍',
    social: '📱',
    email: '📧',
    referral: '🌐',
    campaign: '📢',
    internal: '🏠',
  };
  
  return icons[category] || '🌐';
}

// Get referrer color for charts
export function getReferrerColor(category: ReferrerCategory): string {
  const colors: Record<ReferrerCategory, string> = {
    direct: '#6366f1',     // Indigo
    search: '#10b981',     // Green
    social: '#f59e0b',     // Amber
    email: '#ec4899',      // Pink
    referral: '#8b5cf6',   // Purple
    campaign: '#06b6d4',   // Cyan
    internal: '#6b7280',   // Gray
  };
  
  return colors[category] || '#6b7280';
}
