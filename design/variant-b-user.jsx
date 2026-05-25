// Variant B — Boutique Moderna · USER screens (desktop)

// Reuse PRODUCTS_A but rebrand
const PRODUCTS_B = window.PRODUCTS_A;

// VB button styles
const vbBtn = (variant = 'primary') => ({
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  padding: variant === 'sm' ? '8px 14px' : '13px 22px',
  border: 'none', cursor: 'pointer',
  borderRadius: 4,
  fontFamily: 'Inter', fontSize: variant === 'sm' ? 13 : 14,
  fontWeight: 500, letterSpacing: '0.01em',
  background: variant === 'ghost' ? 'transparent' : variant === 'bone' ? 'var(--vb-bone)' : variant === 'dark' ? 'var(--vb-espresso)' : 'var(--vb-clay)',
  color: variant === 'ghost' ? 'var(--vb-espresso)' : variant === 'bone' ? 'var(--vb-espresso)' : 'white',
  border: variant === 'ghost' ? '1px solid var(--vb-line-strong)' : 'none',
  transition: 'all .15s',
});

function VBLogo({ size = 'md', dark = false }) {
  const fs = size === 'lg' ? 30 : size === 'sm' ? 16 : 22;
  const color = dark ? 'var(--vb-bone)' : 'var(--vb-espresso)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color }}>
      <svg width={fs * 1.2} height={fs * 1.2} viewBox="0 0 40 40">
        <rect x="2" y="2" width="36" height="36" fill="var(--vb-clay)" />
        <text x="20" y="29" fontFamily="DM Serif Display" fontSize="24" fill="var(--vb-bone)" textAnchor="middle">m</text>
      </svg>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontFamily: 'DM Serif Display', fontSize: fs, letterSpacing: '-0.01em' }}>MELL <span style={{ fontStyle: 'italic' }}>Craft</span></div>
        <div style={{ fontSize: fs * 0.34, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--vb-stone)', marginTop: 3 }}>est. 2019 · habana</div>
      </div>
    </div>
  );
}

function VBIconBtn({ children, badge, dark = false }) {
  return (
    <button style={{
      position: 'relative', width: 40, height: 40,
      border: 'none', background: 'transparent',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      color: dark ? 'var(--vb-bone)' : 'var(--vb-espresso)', cursor: 'pointer',
    }}>
      {children}
      {badge != null && (
        <span style={{
          position: 'absolute', top: 4, right: 0, minWidth: 16, height: 16,
          padding: '0 4px', background: 'var(--vb-clay)', color: 'white',
          fontSize: 10, fontWeight: 600, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{badge}</span>
      )}
    </button>
  );
}

function VBHeader() {
  return (
    <div>
      <div style={{ background: 'var(--vb-espresso)', color: 'var(--vb-bone)', fontSize: 11, padding: '8px 60px', display: 'flex', justifyContent: 'space-between', letterSpacing: '0.04em' }}>
        <span className="mono" style={{ opacity: 0.7 }}>ENVÍO GRATIS &gt; 5000 CUP · LA HABANA Y HOLGUÍN</span>
        <span className="mono" style={{ opacity: 0.7 }}>+53 5555 0123 · LUN–SÁB 9:00–18:00</span>
      </div>
      <div style={{ background: 'var(--vb-paper)', borderBottom: '1px solid var(--vb-line)', padding: '22px 60px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 40, alignItems: 'center' }}>
        <nav style={{ display: 'flex', gap: 26, fontSize: 13, color: 'var(--vb-espresso)', fontWeight: 500, letterSpacing: '0.02em' }}>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Tienda</a>
          <a style={{ color: 'inherit', textDecoration: 'none', color: 'var(--vb-clay)' }}>San Valentín</a>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Día de las Madres</a>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Peluches & Chuches</a>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Diario</a>
        </nav>
        <VBLogo />
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
          <VBIconBtn><Icon.Search size={17} /></VBIconBtn>
          <VBIconBtn><Icon.User size={17} /></VBIconBtn>
          <VBIconBtn badge={2}><Icon.Heart size={17} /></VBIconBtn>
          <VBIconBtn badge={3}><Icon.Bag size={17} /></VBIconBtn>
        </div>
      </div>
    </div>
  );
}

function VBFooter() {
  return (
    <div style={{ background: 'var(--vb-espresso)', color: 'var(--vb-bone)', padding: '70px 60px 36px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 60, marginBottom: 60 }}>
        <div>
          <VBLogo dark />
          <p style={{ marginTop: 22, fontSize: 13, lineHeight: 1.7, opacity: 0.65, maxWidth: 280 }}>
            Pequeño taller artesanal en La Habana, Cuba. Cada pieza es hecha a mano con materiales sostenibles.
          </p>
          <div className="mono" style={{ marginTop: 20, fontSize: 11, opacity: 0.6, letterSpacing: '0.1em' }}>
            CALLE 23 №1106 · PLAZA<br/>LA HABANA, CUBA
          </div>
        </div>
        {[
          ['NAVEGAR', ['Tienda completa', 'San Valentín', 'Día de las Madres', 'Peluches & Chuches', 'Diario']],
          ['AYUDA', ['Envíos y entregas', 'Cómo encargar', 'Preguntas frecuentes', 'Contacto', 'Garantía']],
          ['CUENTA', ['Mi perfil', 'Mis pedidos', 'Favoritos', 'Privacidad', 'Términos']],
        ].map(([title, items]) => (
          <div key={title}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', opacity: 0.6, marginBottom: 18 }}>{title}</div>
            {items.map(i => <div key={i} style={{ fontSize: 13, opacity: 0.8, marginBottom: 11, fontFamily: 'Inter' }}>{i}</div>)}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderTop: '1px solid rgba(242,237,228,.1)', paddingTop: 28 }}>
        <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 84, lineHeight: 0.9, margin: 0, color: 'var(--vb-bone)', letterSpacing: '-0.02em' }}>Mell <i>Craft</i> ©</h2>
        <div className="mono" style={{ fontSize: 11, opacity: 0.5, letterSpacing: '0.1em', textAlign: 'right' }}>
          © MMXXVI · TODOS LOS<br/>DERECHOS RESERVADOS
        </div>
      </div>
    </div>
  );
}

function VBProductCard({ p, liked = false, big = false }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ height: big ? 380 : 320, position: 'relative', background: 'var(--vb-bone)', overflow: 'hidden' }}>
        <ProductImage tone={p.tone} />
        {p.isNew && (
          <div className="mono" style={{ position: 'absolute', top: 14, left: 14, background: 'white', color: 'var(--vb-espresso)', padding: '4px 10px', fontSize: 10, letterSpacing: '0.14em' }}>NUEVO</div>
        )}
        <button style={{
          position: 'absolute', top: 12, right: 12, width: 36, height: 36,
          borderRadius: 0, border: 'none', background: 'rgba(250,247,241,.95)',
          color: liked ? 'var(--vb-clay)' : 'var(--vb-espresso)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Icon.Heart size={15} filled={liked} />
        </button>
      </div>
      <div style={{ padding: '16px 0 0' }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--vb-stone)', letterSpacing: '0.14em', marginBottom: 6, textTransform: 'uppercase' }}>{p.cat}</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontFamily: 'DM Serif Display', fontSize: 20, lineHeight: 1.15, color: 'var(--vb-espresso)' }}>{p.name}</div>
            <div style={{ fontSize: 12, color: 'var(--vb-stone)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon.Star size={11} color="var(--vb-amber)" />
              <span>{p.rating}</span><span>·</span><span>{p.reviews}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: 'DM Serif Display', fontSize: 17, color: 'var(--vb-espresso)' }}>{p.price.toLocaleString('es-CU')}<span className="mono" style={{ fontSize: 10, opacity: 0.6, marginLeft: 4 }}>CUP</span></div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--vb-stone)' }}>${p.usd} USD</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───── HOME (Variant B) ─────
function VBHome() {
  return (
    <div className="vb screen scroll">
      <VBHeader />

      {/* Hero — editorial split */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', height: 720, background: 'var(--vb-bone)' }}>
        <div style={{ padding: '70px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--vb-clay)' }}>
            VOL. XII — FEBRERO MMXXVI
          </div>
          <div>
            <h1 style={{ fontFamily: 'DM Serif Display', fontSize: 96, lineHeight: 0.9, margin: 0, letterSpacing: '-0.025em', color: 'var(--vb-espresso)' }}>
              Lo hecho<br/>a mano<br/>habla por sí.
            </h1>
            <p style={{ marginTop: 30, fontSize: 16, lineHeight: 1.65, color: 'var(--vb-ink)', maxWidth: 440, opacity: 0.8 }}>
              Una colección curada de ramos de chuches, peluches tejidos y tarjetas pop-up.
              Diseños únicos para San Valentín y el Día de las Madres.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <button style={{ ...vbBtn('dark'), padding: '15px 26px' }}>Comprar colección San Valentín <Icon.Arrow size={14} color="white" /></button>
              <button style={vbBtn('ghost')}>Ver la historia</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 40, alignItems: 'center', borderTop: '1px solid var(--vb-line)', paddingTop: 24 }}>
            <div>
              <div style={{ fontFamily: 'DM Serif Display', fontSize: 38, lineHeight: 1 }}>500+</div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--vb-stone)', marginTop: 4 }}>PEDIDOS FELICES</div>
            </div>
            <div>
              <div style={{ fontFamily: 'DM Serif Display', fontSize: 38, lineHeight: 1 }}>4.9</div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--vb-stone)', marginTop: 4 }}>VALORACIÓN MEDIA</div>
            </div>
            <div>
              <div style={{ fontFamily: 'DM Serif Display', fontSize: 38, lineHeight: 1 }}>48<span style={{ fontSize: 18 }}>H</span></div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--vb-stone)', marginTop: 4 }}>ENTREGA TÍPICA</div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ProductImage tone="terracotta" src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=900&q=80" />
          <div style={{ position: 'absolute', bottom: 30, right: 30, background: 'rgba(31,24,20,.85)', backdropFilter: 'blur(6px)', padding: 18, color: 'white', maxWidth: 280 }}>
            <div className="mono" style={{ fontSize: 10, opacity: 0.7, letterSpacing: '0.14em' }}>NÚMERO 01 / FAVORITO</div>
            <div style={{ fontFamily: 'DM Serif Display', fontSize: 22, marginTop: 6, color: 'white' }}>"Te Amo" — Ramo de Chuches</div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
              <span className="mono" style={{ opacity: 0.8 }}>2500 CUP · $8.50</span>
              <Icon.Arrow size={14} color="white" />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <section style={{ background: 'var(--vb-clay)', color: 'white', padding: '14px 0', overflow: 'hidden' }}>
        <div className="mono" style={{ fontSize: 12, letterSpacing: '0.24em', display: 'flex', gap: 60, paddingLeft: 60 }}>
          {Array(5).fill(0).map((_, i) => (
            <React.Fragment key={i}>
              <span>HECHO A MANO</span>
              <span>★</span>
              <span>ENVÍO 48H</span>
              <span>★</span>
              <span>PIEZA ÚNICA</span>
              <span>★</span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Categories — magazine grid */}
      <section style={{ padding: '80px 60px', background: 'var(--vb-paper)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 36 }}>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 56, margin: 0, letterSpacing: '-0.02em' }}>Por <i>ocasión</i>.</h2>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--vb-stone)' }}>
            04 COLECCIONES · 103 PIEZAS
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '300px 300px', gap: 18 }}>
          <div style={{ gridRow: 'span 2', position: 'relative', overflow: 'hidden' }}>
            <ProductImage tone="clay" src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80" />
            <div style={{ position: 'absolute', bottom: 24, left: 28, color: 'white' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', opacity: 0.85 }}>32 PIEZAS</div>
              <div style={{ fontFamily: 'DM Serif Display', fontSize: 40, lineHeight: 1, marginTop: 4, color: 'white' }}>San Valentín</div>
            </div>
          </div>
          {[
            { name: 'Día de las Madres', count: 28, tone: 'mustard' },
            { name: 'Peluches & Chuches', count: 19, tone: 'olive' },
            { name: 'Cartulina & Papel', count: 24, tone: 'rose' },
            { name: 'Cumpleaños', count: 17, tone: 'putty' },
          ].map((c, i) => (
            <div key={i} style={{ position: 'relative', overflow: 'hidden' }}>
              <ProductImage tone={c.tone} />
              <div style={{ position: 'absolute', bottom: 18, left: 20, color: 'white' }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', opacity: 0.85 }}>{c.count} PIEZAS</div>
                <div style={{ fontFamily: 'DM Serif Display', fontSize: 22, lineHeight: 1, marginTop: 4, color: 'white' }}>{c.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products — editorial */}
      <section style={{ padding: '80px 60px', background: 'var(--vb-paper)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'baseline', gap: 30, marginBottom: 50 }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.18em', color: 'var(--vb-clay)' }}>№ 02</div>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 56, margin: 0, letterSpacing: '-0.02em' }}>Lo más <i>querido</i>.</h2>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--vb-stone)' }}>VER TODO →</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {PRODUCTS_B.slice(0, 4).map(p => <VBProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Story split */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--vb-espresso)', color: 'var(--vb-bone)' }}>
        <div style={{ padding: '90px 80px' }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--vb-amber)', marginBottom: 18 }}>№ 03 · NUESTRA HISTORIA</div>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 64, lineHeight: 0.95, margin: 0, color: 'var(--vb-bone)', letterSpacing: '-0.025em' }}>
            Un taller<br/>pequeño,<br/><i>una idea grande</i>.
          </h2>
          <p style={{ marginTop: 32, fontSize: 15, lineHeight: 1.75, opacity: 0.75, maxWidth: 440 }}>
            Desde 2019, en mi taller en La Habana, preparo cada pieza a mano.
            Materiales que cuido yo misma, diseño consciente y pedidos a tu medida.
            Si tienes una idea especial, conversemos por WhatsApp.
          </p>
          <button style={{ ...vbBtn('bone'), marginTop: 32 }}>Conocer el taller <Icon.Arrow size={14} /></button>
        </div>
        <div style={{ height: 540, overflow: 'hidden' }}>
          <ProductImage tone="coffee" src="https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=800&q=80" />
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: '80px 60px', background: 'var(--vb-bone)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 56, lineHeight: 0.95, margin: 0, letterSpacing: '-0.02em' }}>
          Únete al <i>boletín.</i>
        </h2>
        <div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--vb-ink)', opacity: 0.8, margin: '0 0 24px' }}>
            Lanzamientos, descuentos privados y la historia detrás de cada pieza.
            Sin spam, sólo cosas bonitas — y la opción de salir cuando quieras.
          </p>
          <div style={{ display: 'flex', border: '1px solid var(--vb-line-strong)' }}>
            <input placeholder="tu@correo.com" style={{ flex: 1, padding: '16px 20px', border: 'none', background: 'transparent', fontSize: 14 }} />
            <button style={{ ...vbBtn('dark'), borderRadius: 0, padding: '16px 28px' }}>Suscribirme</button>
          </div>
        </div>
      </section>

      <VBFooter />
    </div>
  );
}

Object.assign(window, { VBHome, VBHeader, VBFooter, VBProductCard, VBLogo, VBIconBtn, vbBtn, PRODUCTS_B });
