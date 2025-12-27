// Geolocation utilities using IP address

export interface GeoLocation {
  country?: string;
  countryCode?: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  ip?: string;
}

/**
 * Get geolocation from IP address using a free API
 * Using ipapi.co (free tier: 30k requests/month)
 * Alternative: ip-api.com (45 requests/minute free)
 */
export async function getGeolocationFromIP(ip?: string): Promise<GeoLocation> {
  try {
    // If no IP provided, ipapi will use the request's IP
    const url = ip 
      ? `https://ipapi.co/${ip}/json/`
      : 'https://ipapi.co/json/';
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Kanda Markets Analytics',
      },
    });

    if (!response.ok) {
      throw new Error('Geolocation API failed');
    }

    const data = await response.json();

    return {
      country: data.country_name,
      countryCode: data.country_code,
      city: data.city,
      region: data.region,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      ip: data.ip,
    };
  } catch (error) {
    console.error('Geolocation error:', error);
    return {};
  }
}

/**
 * Alternative: Get geolocation using ip-api.com (no auth required)
 * Free tier: 45 requests/minute
 */
export async function getGeolocationAlternative(ip?: string): Promise<GeoLocation> {
  try {
    const url = ip 
      ? `http://ip-api.com/json/${ip}`
      : 'http://ip-api.com/json/';
    
    const response = await fetch(url);

    if (!response.ok) {
      console.warn('Geolocation API request failed');
      return {};
    }

    const data = await response.json();

    if (data.status === 'fail') {
      // Private/local IP addresses will fail - this is expected in dev
      if (data.message?.includes('private') || data.message?.includes('reserved')) {
        console.log('Local/private IP detected - skipping geolocation');
        return { country: 'Local', city: 'Development' };
      }
      console.warn('Geolocation failed:', data.message);
      return {};
    }

    return {
      country: data.country,
      countryCode: data.countryCode,
      city: data.city,
      region: data.regionName,
      latitude: data.lat,
      longitude: data.lon,
      timezone: data.timezone,
      ip: data.query,
    };
  } catch (error) {
    console.warn('Geolocation error (non-critical):', error instanceof Error ? error.message : 'Unknown');
    return {};
  }
}

/**
 * Server-side: Extract IP from Next.js request
 */
export function getClientIP(request: Request): string | null {
  // Check various headers for IP
  const headers = request.headers;
  
  // Cloudflare
  const cfConnectingIp = headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp;
  
  // Standard forwarded headers
  const xForwardedFor = headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  
  // Other common headers
  const xRealIp = headers.get('x-real-ip');
  if (xRealIp) return xRealIp;
  
  const xClientIp = headers.get('x-client-ip');
  if (xClientIp) return xClientIp;
  
  return null;
}

/**
 * Get country flag emoji
 */
export function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌍';
  
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  
  return String.fromCodePoint(...codePoints);
}

/**
 * Get country name from code
 */
export function getCountryName(countryCode: string): string {
  const countries: Record<string, string> = {
    US: 'United States',
    GB: 'United Kingdom',
    CA: 'Canada',
    AU: 'Australia',
    DE: 'Germany',
    FR: 'France',
    IN: 'India',
    JP: 'Japan',
    CN: 'China',
    BR: 'Brazil',
    MX: 'Mexico',
    ES: 'Spain',
    IT: 'Italy',
    NL: 'Netherlands',
    SE: 'Sweden',
    NO: 'Norway',
    DK: 'Denmark',
    FI: 'Finland',
    PL: 'Poland',
    CH: 'Switzerland',
    AT: 'Austria',
    BE: 'Belgium',
    IE: 'Ireland',
    NZ: 'New Zealand',
    SG: 'Singapore',
    HK: 'Hong Kong',
    KR: 'South Korea',
    TW: 'Taiwan',
    TH: 'Thailand',
    MY: 'Malaysia',
    ID: 'Indonesia',
    PH: 'Philippines',
    VN: 'Vietnam',
    AE: 'UAE',
    SA: 'Saudi Arabia',
    ZA: 'South Africa',
    AR: 'Argentina',
    CL: 'Chile',
    CO: 'Colombia',
    PE: 'Peru',
    // Add more as needed
  };
  
  return countries[countryCode] || countryCode;
}

/**
 * Calculate distance between two coordinates (in km)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance);
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
