// Shared UI primitives — icons, image placeholders, helpers used by both variants.
// Exposes to window so each variant script can use them.

const Icon = {
  Heart: ({ size = 18, filled = false, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Bag: ({ size = 18, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  Search: ({ size = 18, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  User: ({ size = 18, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Menu: ({ size = 18, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Star: ({ size = 14, filled = true, color = 'currentColor' }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="1.6" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>
    </svg>
  ),
  Plus: ({ size = 18, color = 'currentColor', stroke = 2 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  Minus: ({ size = 18, color = 'currentColor', stroke = 2 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  Arrow: ({ size = 18, dir = 'right', color = 'currentColor', stroke = 1.6 }) => {
    const paths = {
      right: 'M5 12h14M13 5l7 7-7 7',
      left: 'M19 12H5M11 5l-7 7 7 7',
      down: 'M12 5v14M5 13l7 7 7-7',
      up: 'M12 19V5M5 11l7-7 7 7',
    };
    return (
      <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
        <path d={paths[dir]}/>
      </svg>
    );
  },
  Check: ({ size = 18, color = 'currentColor', stroke = 2 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  X: ({ size = 18, color = 'currentColor', stroke = 1.8 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  Trash: ({ size = 18, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  Pencil: ({ size = 16, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>
    </svg>
  ),
  Eye: ({ size = 16, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Image: ({ size = 18, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  Upload: ({ size = 18, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  Filter: ({ size = 16, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  ),
  Truck: ({ size = 18, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  Box: ({ size = 18, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Chart: ({ size = 18, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  Settings: ({ size = 18, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Users: ({ size = 18, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Home: ({ size = 18, color = 'currentColor', stroke = 1.6 }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Dot: ({ size = 6, color = 'currentColor' }) => (
    <svg className="icon" width={size} height={size} viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill={color}/></svg>
  ),
};

// Image helpers — gradient-based placeholders styled by variant.
// Adds optional `label` shown small in corner. Use these everywhere; if a
// real Unsplash URL is wanted, pass `src`.
function ProductImage({ tone = 'terracotta', label, src, style, children }) {
  // gradient palette per tone
  const palettes = {
    terracotta:  ['#E0A189', '#C8553D'],
    blush:       ['#F2D5C9', '#E8B9A8'],
    mustard:     ['#EBC683', '#D9A55C'],
    sage:        ['#B6C5A2', '#8FA67B'],
    cream:       ['#F4EBDA', '#E0CFAE'],
    coffee:      ['#7A5A41', '#3D2C1F'],
    paper:       ['#FBF6EE', '#E8DDC8'],
    clay:        ['#D88A6E', '#B7472A'],
    putty:       ['#E5DACB', '#C9B89F'],
    rose:        ['#F4C2B6', '#D88A7A'],
    olive:       ['#A8A269', '#7D7740'],
  };
  const [from, to] = palettes[tone] || palettes.terracotta;
  return (
    <div style={{
      position: 'relative',
      width: '100%', height: '100%',
      background: src
        ? `linear-gradient(135deg, ${from}, ${to})`
        : `linear-gradient(135deg, ${from}, ${to})`,
      overflow: 'hidden',
      ...style,
    }}>
      {src && (
        <img src={src} alt={label || ''} loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      )}
      {!src && <PaperTexture tone={tone} />}
      {children}
      {label && (
        <div style={{ position: 'absolute', bottom: 8, left: 10, fontSize: 10,
          color: 'rgba(255,255,255,.85)', textTransform: 'uppercase',
          letterSpacing: '0.08em', fontWeight: 500,
          textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{label}</div>
      )}
    </div>
  );
}

// Decorative SVG paper-texture overlay for placeholder images
function PaperTexture({ tone = 'terracotta' }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 280" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, opacity: 0.3, mixBlendMode: 'overlay' }}>
      <defs>
        <pattern id={`p-${tone}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="12" r="0.6" fill="rgba(255,255,255,0.5)"/>
          <circle cx="28" cy="6" r="0.4" fill="rgba(255,255,255,0.4)"/>
          <circle cx="18" cy="32" r="0.5" fill="rgba(0,0,0,0.2)"/>
          <circle cx="34" cy="22" r="0.3" fill="rgba(255,255,255,0.3)"/>
        </pattern>
      </defs>
      <rect width="200" height="280" fill={`url(#p-${tone})`}/>
    </svg>
  );
}

// Decorative SVG craft glyphs (used as illustrative placeholders, not emojis)
const CraftGlyph = {
  Heart: ({ size = 48, color = '#C8553D' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
      <path d="M32 56C12 42 4 30 4 20 4 12 10 6 18 6c5 0 10 3 14 8 4-5 9-8 14-8 8 0 14 6 14 14 0 10-8 22-28 36z"/>
    </svg>
  ),
  Flower: ({ size = 48, color = '#D9A55C' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
      <circle cx="32" cy="14" r="9"/><circle cx="32" cy="50" r="9"/>
      <circle cx="14" cy="32" r="9"/><circle cx="50" cy="32" r="9"/>
      <circle cx="32" cy="32" r="6" fill="#FBF6EE"/>
    </svg>
  ),
  Gift: ({ size = 48, color = '#8FA67B' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
      <rect x="8" y="22" width="48" height="34" rx="2"/>
      <rect x="4" y="18" width="56" height="10" rx="2"/>
      <rect x="28" y="18" width="8" height="38" fill="#FBF6EE"/>
      <path d="M22 18c-4-4-4-10 0-12s8 2 10 6c2-4 6-8 10-6s4 8 0 12" fill="none" stroke={color} strokeWidth="3"/>
    </svg>
  ),
  Bear: ({ size = 48, color = '#7A5A41' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
      <circle cx="18" cy="18" r="8"/><circle cx="46" cy="18" r="8"/>
      <circle cx="32" cy="34" r="20"/>
      <circle cx="26" cy="32" r="2.5" fill="#FBF6EE"/>
      <circle cx="38" cy="32" r="2.5" fill="#FBF6EE"/>
      <ellipse cx="32" cy="40" rx="4" ry="3" fill="#FBF6EE"/>
    </svg>
  ),
  Sparkle: ({ size = 20, color = '#D9A55C' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0l2 10 10 2-10 2-2 10-2-10-10-2 10-2z"/>
    </svg>
  ),
};

Object.assign(window, { Icon, ProductImage, CraftGlyph, PaperTexture });
