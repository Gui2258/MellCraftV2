import Image from 'next/image'

type Tone =
  | 'terracotta' | 'blush' | 'mustard' | 'sage' | 'cream'
  | 'coffee' | 'paper' | 'clay' | 'putty' | 'rose' | 'olive'

interface ProductImageProps {
  tone?: Tone
  src?: string | null
  alt?: string
  label?: string
  className?: string
  style?: React.CSSProperties
  fill?: boolean
  sizes?: string
  children?: React.ReactNode
}

const palettes: Record<Tone, [string, string]> = {
  terracotta: ['#E0A189', '#C8553D'],
  blush: ['#F2D5C9', '#E8B9A8'],
  mustard: ['#EBC683', '#D9A55C'],
  sage: ['#B6C5A2', '#8FA67B'],
  cream: ['#F4EBDA', '#E0CFAE'],
  coffee: ['#7A5A41', '#3D2C1F'],
  paper: ['#FBF6EE', '#E8DDC8'],
  clay: ['#D88A6E', '#B7472A'],
  putty: ['#E5DACB', '#C9B89F'],
  rose: ['#F4C2B6', '#D88A7A'],
  olive: ['#A8A269', '#7D7740'],
}

export default function ProductImage({
  tone = 'terracotta',
  src,
  alt = '',
  label,
  className,
  style,
  fill = false,
  sizes,
  children,
}: ProductImageProps) {
  const [from, to] = palettes[tone]

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: fill ? undefined : '100%',
        height: fill ? undefined : '100%',
        background: `linear-gradient(135deg, ${from}, ${to})`,
        overflow: 'hidden',
        ...style,
      }}
    >
      {src ? (
        fill ? (
          <Image src={src} alt={alt} fill sizes={sizes ?? '100vw'} style={{ objectFit: 'cover' }} />
        ) : (
          <Image src={src} alt={alt} fill sizes={sizes ?? '100vw'} style={{ objectFit: 'cover' }} />
        )
      ) : (
        <PaperTexture tone={tone} />
      )}
      {children}
      {label && (
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 10,
            fontSize: 10,
            color: 'rgba(255,255,255,0.85)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 500,
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          {label}
        </div>
      )}
    </div>
  )
}

function PaperTexture({ tone }: { tone: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 280"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, opacity: 0.3, mixBlendMode: 'overlay' }}
    >
      <defs>
        <pattern id={`paper-${tone}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="12" r="0.6" fill="rgba(255,255,255,0.5)" />
          <circle cx="28" cy="6" r="0.4" fill="rgba(255,255,255,0.4)" />
          <circle cx="18" cy="32" r="0.5" fill="rgba(0,0,0,0.2)" />
          <circle cx="34" cy="22" r="0.3" fill="rgba(255,255,255,0.3)" />
        </pattern>
      </defs>
      <rect width="200" height="280" fill={`url(#paper-${tone})`} />
    </svg>
  )
}
