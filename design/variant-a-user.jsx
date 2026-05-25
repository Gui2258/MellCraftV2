// Variant A — Romántica Artesanal · USER screens (desktop)
// Pages: Home, Catalog, Product Detail, Cart, Checkout, Login, Profile, Favorites

// ───── Shared product data ─────
const PRODUCTS_A = [
  { id: 'p1',  name: 'Ramo de Chuches "Te Amo"',     cat: 'San Valentín', price: 2500, usd: 8.5,  stock: 12, rating: 4.9, reviews: 87, tone: 'terracotta', isNew: true },
  { id: 'p2',  name: 'Peluche Corazón Tejido',       cat: 'Peluches',     price: 3800, usd: 12.5, stock: 6,  rating: 4.8, reviews: 52, tone: 'blush' },
  { id: 'p3',  name: 'Tarjeta Pop-Up Mamá',          cat: 'Día de Madres',price: 1200, usd: 4.0,  stock: 24, rating: 5.0, reviews: 31, tone: 'mustard', isNew: true },
  { id: 'p4',  name: 'Caja Sorpresa Romántica',      cat: 'San Valentín', price: 4500, usd: 15.0, stock: 4,  rating: 4.7, reviews: 38, tone: 'rose' },
  { id: 'p5',  name: 'Osito Mensajero',              cat: 'Peluches',     price: 3200, usd: 10.5, stock: 8,  rating: 4.9, reviews: 64, tone: 'coffee' },
  { id: 'p6',  name: 'Mariposas de Cartulina (12)',  cat: 'Día de Madres',price: 950,  usd: 3.2,  stock: 38, rating: 4.6, reviews: 19, tone: 'sage' },
  { id: 'p7',  name: 'Bouquet de Rosas Eternas',     cat: 'Día de Madres',price: 5800, usd: 19.0, stock: 3,  rating: 5.0, reviews: 22, tone: 'rose', isNew: true },
  { id: 'p8',  name: 'Mini Cesta de Bombones',       cat: 'San Valentín', price: 2200, usd: 7.5,  stock: 15, rating: 4.7, reviews: 41, tone: 'paper' },
];

// CUP/USD formatter
const fmtCUP = (n) => n.toLocaleString('es-CU') + ' CUP';
const fmtUSD = (n) => '$' + n.toFixed(2);
const Price = ({ cup, usd, size = 'md', strike }) => {
  const sizes = { sm: [13, 11], md: [16, 12], lg: [22, 14], xl: [28, 16] };
  const [a, b] = sizes[size];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, textDecoration: strike ? 'line-through' : 'none', opacity: strike ? 0.5 : 1 }}>
      <span style={{ fontSize: a, fontWeight: 600, letterSpacing: '-0.01em' }}>{fmtCUP(cup)}</span>
      <span style={{ fontSize: b, opacity: 0.65, fontWeight: 400 }}>· {fmtUSD(usd)}</span>
    </span>
  );
};

// ───── Variant A primitives ─────
const vaBtn = (variant = 'primary') => ({
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  padding: variant === 'sm' ? '8px 14px' : '13px 22px',
  border: 'none', cursor: 'pointer',
  borderRadius: 999,
  fontFamily: 'Inter', fontSize: variant === 'sm' ? 13 : 14,
  fontWeight: 500, letterSpacing: '0.01em',
  background: variant === 'ghost' ? 'transparent' : variant === 'cream' ? 'var(--va-cream)' : 'var(--va-terracotta)',
  color: variant === 'ghost' ? 'var(--va-coffee)' : variant === 'cream' ? 'var(--va-coffee)' : 'var(--va-cream)',
  border: variant === 'ghost' ? '1px solid var(--va-line-strong)' : 'none',
  transition: 'all .15s',
});

// Compact circular icon button
const VAIconBtn = ({ children, badge, size = 38 }) => (
  <button style={{
    position: 'relative', width: size, height: size, borderRadius: '50%',
    border: '1px solid var(--va-line)', background: 'transparent',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--va-coffee)', cursor: 'pointer',
  }}>
    {children}
    {badge != null && (
      <span style={{
        position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18,
        padding: '0 5px', background: 'var(--va-terracotta)', color: 'white',
        fontSize: 10, fontWeight: 600, borderRadius: 9,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{badge}</span>
    )}
  </button>
);

// ───── Header (desktop nav) ─────
function VAHeader() {
  return (
    <div>
      {/* Top strip */}
      <div style={{ background: 'var(--va-coffee)', color: 'var(--va-cream)',
        fontSize: 12, padding: '8px 60px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ opacity: 0.85 }}>Envío gratis en pedidos {'>'} 5000 CUP · La Habana y Holguín</span>
        <span style={{ display: 'flex', gap: 18, opacity: 0.85 }}>
          <span>+53 5555 0123</span>
          <span>·</span>
          <span>Lun–Sáb 9:00–18:00</span>
        </span>
      </div>
      {/* Main nav */}
      <div style={{ background: 'var(--va-cream)', borderBottom: '1px solid var(--va-line)',
        padding: '20px 60px', display: 'flex', alignItems: 'center', gap: 40 }}>
        <Logo />
        <nav style={{ display: 'flex', gap: 28, fontSize: 14, color: 'var(--va-coffee)', fontWeight: 500 }}>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Tienda</a>
          <a style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1.5px solid var(--va-terracotta)', paddingBottom: 2 }}>San Valentín</a>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Día de las Madres</a>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Peluches & Chuches</a>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Nuestra Historia</a>
        </nav>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(61,44,31,0.05)', borderRadius: 999, padding: '8px 16px', width: 220 }}>
            <Icon.Search size={15} color="var(--va-coffee)" />
            <span style={{ fontSize: 13, color: 'rgba(61,44,31,.5)' }}>Buscar manualidades…</span>
          </div>
          <VAIconBtn><Icon.User size={16} /></VAIconBtn>
          <VAIconBtn badge={2}><Icon.Heart size={16} /></VAIconBtn>
          <VAIconBtn badge={3}><Icon.Bag size={16} /></VAIconBtn>
        </div>
      </div>
    </div>
  );
}

function Logo({ size = 'md', dark = false }) {
  const fs = size === 'lg' ? 34 : size === 'sm' ? 18 : 24;
  const color = dark ? 'var(--va-cream)' : 'var(--va-coffee)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: fs * 1.3, height: fs * 1.3, borderRadius: '50%',
        background: 'var(--va-terracotta)', color: 'var(--va-cream)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: fs * 0.7,
        fontWeight: 600,
      }}>m</div>
      <div style={{ lineHeight: 1, color }}>
        <div style={{ fontFamily: 'Playfair Display', fontSize: fs, fontWeight: 600, letterSpacing: '-0.01em' }}>Mell <i>Craft</i></div>
        <div style={{ fontSize: fs * 0.36, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--va-terracotta)', marginTop: 3 }}>hecho con cariño</div>
      </div>
    </div>
  );
}

// ───── Footer ─────
function VAFooter() {
  return (
    <div style={{ background: 'var(--va-coffee)', color: 'var(--va-cream)', padding: '60px 60px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 60 }}>
        <div>
          <Logo dark />
          <p style={{ marginTop: 18, fontSize: 13, lineHeight: 1.6, opacity: 0.75, maxWidth: 280 }}>
            Pequeño taller artesanal en La Habana. Cada pieza es hecha a mano con materiales sostenibles y mucho cariño.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
            {['IG', 'FB', 'WA', 'TT'].map(s => (
              <div key={s} style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(251,246,238,.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, opacity: 0.8 }}>{s}</div>
            ))}
          </div>
        </div>
        {[
          ['Tienda', ['San Valentín', 'Día de las Madres', 'Peluches & Chuches', 'Todos los productos']],
          ['Ayuda', ['Envíos y entregas', 'Cómo encargar', 'Preguntas frecuentes', 'Contáctanos']],
          ['Cuenta', ['Mi perfil', 'Mis pedidos', 'Favoritos', 'Política de privacidad']],
        ].map(([title, items]) => (
          <div key={title}>
            <div style={{ fontFamily: 'Playfair Display', fontSize: 16, marginBottom: 18 }}>{title}</div>
            {items.map(i => <div key={i} style={{ fontSize: 13, opacity: 0.7, marginBottom: 9 }}>{i}</div>)}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, paddingTop: 24, borderTop: '1px solid rgba(251,246,238,.12)',
        fontSize: 12, opacity: 0.5, display: 'flex', justifyContent: 'space-between' }}>
        <span>© 2026 Mell Craft. Hecho a mano en Cuba.</span>
        <span>Aceptamos: Efectivo · Transferencia · Zelle</span>
      </div>
    </div>
  );
}

// ───── HOME ─────
function VAHome() {
  return (
    <div className="va screen scroll">
      <VAHeader />

      {/* Hero */}
      <section style={{ position: 'relative', padding: '70px 60px 100px',
        background: 'linear-gradient(180deg, var(--va-cream) 0%, var(--va-paper) 100%)',
        overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 40, right: 60, width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,185,168,.3), transparent 70%)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'center', position: 'relative' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--va-terracotta)', fontSize: 13, marginBottom: 18 }}>
              <CraftGlyph.Sparkle size={16} color="var(--va-terracotta)" />
              <span className="script" style={{ fontSize: 20 }}>Colección Febrero 2026</span>
            </div>
            <h1 style={{ fontSize: 72, lineHeight: 0.98, margin: 0, color: 'var(--va-ink)' }}>
              Regalos hechos <br/>
              <i style={{ color: 'var(--va-terracotta)' }}>a mano,</i> para <br/>
              quien tú quieres.
            </h1>
            <p style={{ marginTop: 26, fontSize: 16, color: 'rgba(42,31,24,.7)', lineHeight: 1.6, maxWidth: 460 }}>
              Ramos de chuches, peluches tejidos, tarjetas pop-up y bouquets eternos.
              Diseños únicos para San Valentín y el Día de las Madres.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 32 }}>
              <button style={vaBtn('primary')}>Ver colección San Valentín <Icon.Arrow size={14} /></button>
              <button style={vaBtn('ghost')}>Cómo encargamos</button>
            </div>
            <div style={{ display: 'flex', gap: 32, marginTop: 56, alignItems: 'center', fontSize: 12, color: 'rgba(42,31,24,.6)' }}>
              <div><div style={{ fontFamily: 'Playfair Display', fontSize: 28, color: 'var(--va-coffee)' }}>+500</div>Pedidos felices</div>
              <div style={{ width: 1, height: 36, background: 'var(--va-line)' }} />
              <div><div style={{ fontFamily: 'Playfair Display', fontSize: 28, color: 'var(--va-coffee)' }}>4.9★</div>Valoración media</div>
              <div style={{ width: 1, height: 36, background: 'var(--va-line)' }} />
              <div><div style={{ fontFamily: 'Playfair Display', fontSize: 28, color: 'var(--va-coffee)' }}>48h</div>Entrega típica</div>
            </div>
          </div>

          {/* Hero collage */}
          <div style={{ position: 'relative', height: 540 }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 280, height: 360,
              borderRadius: '140px 140px 16px 16px', overflow: 'hidden', boxShadow: 'var(--va-shadow)' }}>
              <ProductImage tone="terracotta" label="Ramo de Chuches"
                src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80" />
            </div>
            <div style={{ position: 'absolute', bottom: 20, left: 40, width: 220, height: 280,
              borderRadius: '16px 16px 110px 110px', overflow: 'hidden', boxShadow: 'var(--va-shadow)',
              border: '6px solid var(--va-cream)' }}>
              <ProductImage tone="rose" label="Bouquet Eterno"
                src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80" />
            </div>
            <div style={{ position: 'absolute', top: 40, left: 0, width: 180, height: 180,
              borderRadius: '50%', overflow: 'hidden', boxShadow: 'var(--va-shadow)',
              border: '6px solid var(--va-cream)' }}>
              <ProductImage tone="mustard" label="Tarjeta Mamá"
                src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80" />
            </div>
            {/* hand-drawn label */}
            <div style={{ position: 'absolute', top: 360, right: -10, transform: 'rotate(8deg)',
              background: 'var(--va-mustard)', color: 'var(--va-coffee)',
              padding: '8px 16px', fontFamily: 'Caveat', fontSize: 22, borderRadius: 4 }}>
              ¡Pieza única!
            </div>
            <svg style={{ position: 'absolute', top: 200, left: 200, transform: 'rotate(-15deg)' }} width="60" height="20" viewBox="0 0 60 20" fill="none" stroke="var(--va-terracotta)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 10 Q 15 2, 28 10 T 58 10" strokeDasharray="3 3"/>
              <path d="M52 4 L 58 10 L 52 16"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section style={{ padding: '60px 60px 40px', background: 'var(--va-cream)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
          <h2 style={{ fontSize: 36, margin: 0, color: 'var(--va-ink)' }}>Compra por <i>ocasión</i></h2>
          <a style={{ fontSize: 13, color: 'var(--va-terracotta)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Ver toda la tienda <Icon.Arrow size={12} color="var(--va-terracotta)" />
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {[
            { name: 'San Valentín', tone: 'terracotta', count: 32, glyph: <CraftGlyph.Heart size={56} color="white" /> },
            { name: 'Día de las Madres', tone: 'mustard', count: 28, glyph: <CraftGlyph.Flower size={56} color="white" /> },
            { name: 'Peluches & Chuches', tone: 'sage', count: 19, glyph: <CraftGlyph.Bear size={56} color="white" /> },
            { name: 'Cartulina & Papel', tone: 'rose', count: 24, glyph: <CraftGlyph.Gift size={56} color="white" /> },
          ].map((c, i) => (
            <div key={i} style={{ borderRadius: 12, overflow: 'hidden', cursor: 'pointer', position: 'relative', height: 220 }}>
              <ProductImage tone={c.tone}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 20 }}>
                  {c.glyph}
                  <div style={{ fontFamily: 'Playfair Display', fontSize: 22, color: 'white', marginTop: 16 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.8)', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.count} piezas</div>
                </div>
              </ProductImage>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section style={{ padding: '60px 60px', background: 'var(--va-cream)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <div className="script" style={{ fontSize: 22, color: 'var(--va-terracotta)' }}>Lo más querido</div>
            <h2 style={{ fontSize: 36, margin: '4px 0 0', color: 'var(--va-ink)' }}>Nuestros <i>favoritos</i> del mes</h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Todo', 'San Valentín', 'Madres', 'Peluches'].map((t, i) => (
              <button key={t} style={{
                ...vaBtn(i === 0 ? 'cream' : 'ghost'), padding: '8px 16px', fontSize: 13,
              }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {PRODUCTS_A.slice(0, 4).map(p => <VAProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Story / About strip */}
      <section style={{ padding: '70px 60px', background: 'var(--va-paper)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 70, alignItems: 'center' }}>
        <div style={{ height: 380, borderRadius: '180px 180px 16px 16px', overflow: 'hidden' }}>
          <ProductImage tone="coffee" src="https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=800&q=80" />
        </div>
        <div>
          <div className="script" style={{ fontSize: 22, color: 'var(--va-terracotta)' }}>Pequeño taller</div>
          <h2 style={{ fontSize: 40, margin: '4px 0 18px', lineHeight: 1.05 }}>Hechos en casa, <br/><i>con tiempo y cariño.</i></h2>
          <p style={{ fontSize: 15, color: 'rgba(42,31,24,.7)', lineHeight: 1.7, maxWidth: 460 }}>
            Soy Melissa y desde 2019 hago manualidades en mi taller en La Habana.
            Cada ramo, peluche y tarjeta es preparado a pedido, con materiales que cuido yo misma.
            Si tienes una idea especial, conversemos por WhatsApp.
          </p>
          <button style={{ ...vaBtn('ghost'), marginTop: 26 }}>Conoce el taller</button>
        </div>
      </section>

      {/* Testimonial / instagram strip */}
      <section style={{ padding: '70px 60px', background: 'var(--va-cream)', textAlign: 'center' }}>
        <div className="script" style={{ fontSize: 22, color: 'var(--va-terracotta)' }}>Nos siguen en</div>
        <h2 style={{ fontSize: 36, margin: '4px 0 36px' }}>@mellcraft.cu</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
          {['terracotta', 'rose', 'mustard', 'sage', 'blush', 'paper'].map((t, i) => (
            <div key={i} style={{ aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden' }}>
              <ProductImage tone={t} />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: '60px 60px', background: 'var(--va-terracotta)', color: 'var(--va-cream)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, margin: 0, color: 'inherit' }}>Únete a la lista de <i>cariños</i></h2>
        <p style={{ margin: '12px 0 26px', opacity: 0.85, fontSize: 14 }}>Avisos de nuevas colecciones, descuentos y abrazos de papel directo a tu correo.</p>
        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,.12)', borderRadius: 999, padding: 6, gap: 6 }}>
          <input placeholder="tu correo aquí…" style={{ background: 'transparent', border: 'none', color: 'var(--va-cream)', padding: '8px 16px', minWidth: 280, fontSize: 14 }} />
          <button style={{ ...vaBtn('cream'), padding: '10px 22px', fontSize: 13 }}>Suscribirme</button>
        </div>
      </section>

      <VAFooter />
    </div>
  );
}

// Product card
function VAProductCard({ p, liked = false }) {
  return (
    <div style={{ background: 'var(--va-paper)', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
      <div style={{ height: 240, position: 'relative' }}>
        <ProductImage tone={p.tone} />
        {p.isNew && (
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--va-coffee)', color: 'var(--va-cream)',
            padding: '4px 10px', borderRadius: 999, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Nuevo</div>
        )}
        <button style={{
          position: 'absolute', top: 10, right: 10, width: 34, height: 34,
          borderRadius: '50%', border: 'none',
          background: 'rgba(251,246,238,.95)', color: liked ? 'var(--va-terracotta)' : 'var(--va-coffee)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Icon.Heart size={15} filled={liked} />
        </button>
      </div>
      <div style={{ padding: '16px 18px 20px' }}>
        <div style={{ fontSize: 11, color: 'var(--va-terracotta)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{p.cat}</div>
        <div style={{ fontFamily: 'Playfair Display', fontSize: 19, color: 'var(--va-ink)', lineHeight: 1.2, marginBottom: 8 }}>{p.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(42,31,24,.6)', marginBottom: 12 }}>
          <Icon.Star size={12} color="var(--va-mustard)" />
          <span>{p.rating}</span>
          <span>·</span>
          <span>{p.reviews} reseñas</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Price cup={p.price} usd={p.usd} size="md" />
          <button style={{
            width: 36, height: 36, borderRadius: '50%', border: 'none',
            background: 'var(--va-coffee)', color: 'var(--va-cream)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon.Plus size={16} /></button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { VAHome, VAHeader, VAFooter, VAProductCard, Logo, vaBtn, VAIconBtn, Price, PRODUCTS_A, fmtCUP, fmtUSD });
