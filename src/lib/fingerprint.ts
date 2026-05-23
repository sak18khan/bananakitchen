/**
 * Generates an anonymous, lightweight browser fingerprint hash
 * to rate limit votes and leaderboard entries without user accounts.
 */
export async function getFingerprintHash(): Promise<string> {
  if (typeof window === 'undefined') {
    return 'ssr';
  }

  try {
    const userAgent = navigator.userAgent || 'unknown_agent';
    const screenResolution = `${window.screen.width || 0}x${window.screen.height || 0}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    const components = [userAgent, screenResolution, timezone].join('|');

    // SHA-256 hash using native Web Crypto API
    const msgUint8 = new TextEncoder().encode(components);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (err) {
    console.error('Error generating fingerprint:', err);
    
    // Fallback to a random persistent ID in localStorage if crypto/browser APIs fail
    let fallback = localStorage.getItem('bk_fingerprint_fallback');
    if (!fallback) {
      fallback = 'fb_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('bk_fingerprint_fallback', fallback);
    }
    return fallback;
  }
}

/**
 * Generates or retrieves an anonymous fun food username for the leaderboard,
 * e.g. "CurryFox_42", "MangoRebel_7".
 */
export function getOrCreateUsername(): string {
  if (typeof window === 'undefined') {
    return 'Anonymous Banana';
  }

  const existing = localStorage.getItem('bk_username');
  if (existing) {
    return existing;
  }

  const adjectives = [
    'Curry', 'Mango', 'Banana', 'Chili', 'Samosa', 'Chai', 'Maggi', 'Dosa', 
    'Lassi', 'Roti', 'Chutney', 'Biryani', 'Papad', 'Poha', 'Sev', 'Pickle',
    'Butter', 'Paneer', 'Cardamom', 'Ginger', 'Coconut', 'Tamarind', 'Kulfi',
    'Cumin', 'Pepper', 'Garlic', 'Mint', 'Honey', 'Sugar', 'Salt'
  ];

  const nouns = [
    'Fox', 'Rebel', 'Guru', 'Chef', 'Monster', 'Ninja', 'Wizard', 'Critic',
    'King', 'Queen', 'Fanatic', 'Pirate', 'Samurai', 'Cowboy', 'Astronaut',
    'Chaser', 'Slayer', 'Gladiator', 'Squire', 'Captain', 'Champion', 'Hustler',
    'Philosopher', 'Lover', 'Hater', 'Dodger', 'Stalker', 'Ranger', 'Knight'
  ];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 100);

  const username = `${adj}${noun}_${num}`;
  localStorage.setItem('bk_username', username);
  return username;
}
