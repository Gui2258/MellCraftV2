// Variant A — MOBILE screens (390x844)
// Home, Catalog, Detail, Cart, Login, Profile

function VAMobileFrame({ children, statusBar = true, dark = false, scroll = true }) {
  return (
    <div className="va screen" style={{ overflow: 'hidden', background: dark ? 'var(--va-coffee)' : 'var(--va-cream)' }}>
      {statusBar && (
        <div style={{
          height: 44, padding: '0 24px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          fontSize: 14, fontWeight: 600,
          color: dark ? 'var(--va-cream)' : 'var(--va-coffee)',
          flexShrink: 0, position: 'relative', zIndex: 2,
        }}>
          <span>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="3" height="4" rx="0.5"/><rect x="4" y="4" width="3" height="6" rx="0.5"/><rect x="8" y="2" width="3" height="8" rx="0.5"/><rect x="12" y="0" width="3" height="10" rx="0.5"/></svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M.5 4a8 8 0 0 1 13 0M3 6.5a4.5 4.5 0 0 1 8 0M5.5 9a1.5 1.5 0 0 1 3 0"/></svg>
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none" stroke="currentColor"><rect x=".5" y=".5" width="18" height="10" rx="2"/><rect x="2" y="2" width="14" height="7" rx="1" fill="currentColor"/><rect x="19.5" y="3.5" width="1.5" height="4" rx=".5" fill="currentColor"/></svg>
          </div>
        </div>
      )}
      <div style={{ flex: 1, overflowY: scroll ? 'auto' : 'hidden', overflowX: 'hidden', height: scroll ? 'auto' : '100%' }}>
        {children}
      </div>
    </div>
  );
}

// Mobile top header (compact)
function VAMobileHeader({ title, back = false, action }) {
  return (
    <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--va-cream)' }}>
      {back ? (
        <button style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--va-line)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon.Arrow dir="left" size={16} />
        </button>
      ) : (
        <button style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--va-line)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon.Menu size={16} />
        </button>
      )}
      {title ? (
        <div style={{ fontFamily: 'Playfair Display', fontSize: 18 }}>{title}</div>
      ) : (
        <Logo size="sm" />
      )}
      {action || (
        <button style={{ position: 'relative', width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--va-line)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon.Bag size={15} />
          <span style={{ position: 'absolute', top: -3, right: -3, width: 16, height: 16, borderRadius: '50%', background: 'var(--va-terracotta)', color: 'white', fontSize: 9, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
        </button>
      )}
    </div>
  );
}

// Tab bar
function VAMobileTabBar({ active = 'home' }) {
  const tabs = [
    ['home', 'Inicio', <Icon.Home size={18} />],
    ['catalog', 'Tienda', <Icon.Search size={18} />],
    ['favs', 'Favoritos', <Icon.Heart size={18} />],
    ['profile', 'Yo', <Icon.User size={18} />],
  ];
  return (
    <div style={{
      position: 'sticky', bottom: 0, zIndex: 5,
      background: 'var(--va-cream)', borderTop: '1px solid var(--va-line)',
      padding: '10px 16px 22px', display: 'flex', justifyContent: 'space-around',
    }}>
      {tabs.map(([id, name, ic]) => (
        <div key={id} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          color: id === active ? 'var(--va-terracotta)' : 'rgba(42,31,24,.55)',
          fontSize: 10, fontWeight: id === active ? 600 : 400,
        }}>
          {ic}
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}

// ───── MOBILE HOME ─────
function VAMHome() {
  return (
    <VAMobileFrame>
      <VAMobileHeader />

      {/* hero */}
      <div style={{ padding: '20px 20px 26px', background: 'linear-gradient(180deg, var(--va-cream), var(--va-paper))' }}>
        <div className="script" style={{ fontSize: 18, color: 'var(--va-terracotta)' }}>Colección Febrero</div>
        <h1 style={{ fontSize: 36, lineHeight: 1, margin: '4px 0 14px' }}>
          Regalos <i style={{ color: 'var(--va-terracotta)' }}>hechos<br/>a mano</i>.
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(42,31,24,.7)', lineHeight: 1.55, margin: 0 }}>
          Ramos de chuches, peluches tejidos y tarjetas pop-up para tu persona favorita.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <button style={{ ...vaBtn('primary'), padding: '11px 18px', fontSize: 13 }}>Ver colección <Icon.Arrow size={12} color="white" /></button>
        </div>
        {/* small image collage */}
        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          <div style={{ flex: 2, height: 130, borderRadius: '70px 70px 10px 10px', overflow: 'hidden' }}>
            <ProductImage tone="terracotta" />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ flex: 1, borderRadius: 10, overflow: 'hidden' }}>
              <ProductImage tone="rose" />
            </div>
            <div style={{ flex: 1, borderRadius: 10, overflow: 'hidden' }}>
              <ProductImage tone="mustard" />
            </div>
          </div>
        </div>
      </div>

      {/* search */}
      <div style={{ padding: '14px 20px', background: 'var(--va-cream)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--va-paper)', borderRadius: 999, padding: '12px 16px' }}>
          <Icon.Search size={14} color="rgba(42,31,24,.5)" />
          <span style={{ fontSize: 13, color: 'rgba(42,31,24,.5)' }}>Buscar manualidades…</span>
        </div>
      </div>

      {/* categories */}
      <div style={{ padding: '6px 20px 20px', background: 'var(--va-cream)' }}>
        <h3 style={{ fontFamily: 'Playfair Display', fontSize: 20, margin: '10px 0 12px' }}>Por <i>ocasión</i></h3>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            ['San Valentín', 'terracotta', <CraftGlyph.Heart size={26} color="white" />],
            ['Madres', 'mustard', <CraftGlyph.Flower size={26} color="white" />],
            ['Peluches', 'sage', <CraftGlyph.Bear size={26} color="white" />],
            ['Cartulina', 'rose', <CraftGlyph.Gift size={26} color="white" />],
          ].map(([n, t, g]) => (
            <div key={n} style={{ minWidth: 90, textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <ProductImage tone={t}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{g}</div>
                </ProductImage>
              </div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>{n}</div>
            </div>
          ))}
        </div>
      </div>

      {/* featured */}
      <div style={{ padding: '6px 20px 20px', background: 'var(--va-cream)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: 20, margin: 0 }}>Favoritos del <i>mes</i></h3>
          <a style={{ fontSize: 12, color: 'var(--va-terracotta)' }}>Ver todo →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {PRODUCTS_A.slice(0, 4).map(p => <VAMobileProductCard key={p.id} p={p} />)}
        </div>
      </div>

      {/* about strip */}
      <div style={{ margin: '16px 20px 20px', padding: 20, background: 'var(--va-paper)', borderRadius: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ width: 70, height: 70, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
          <ProductImage tone="coffee" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="script" style={{ fontSize: 14, color: 'var(--va-terracotta)' }}>Hola, soy Melissa</div>
          <div style={{ fontFamily: 'Playfair Display', fontSize: 16, lineHeight: 1.2, marginTop: 2 }}>Hago cada pieza con cariño en mi taller.</div>
          <div style={{ fontSize: 11, color: 'rgba(42,31,24,.6)', marginTop: 4 }}>Conoce el taller →</div>
        </div>
      </div>

      <VAMobileTabBar active="home" />
    </VAMobileFrame>
  );
}

function VAMobileProductCard({ p, liked = false, big = false }) {
  return (
    <div style={{ background: 'var(--va-paper)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ height: big ? 200 : 130, position: 'relative' }}>
        <ProductImage tone={p.tone} />
        <button style={{
          position: 'absolute', top: 8, right: 8, width: 28, height: 28,
          borderRadius: '50%', border: 'none',
          background: 'rgba(251,246,238,.95)', color: liked ? 'var(--va-terracotta)' : 'var(--va-coffee)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon.Heart size={12} filled={liked} />
        </button>
        {p.isNew && (
          <div style={{ position: 'absolute', top: 8, left: 8, background: 'var(--va-coffee)', color: 'var(--va-cream)', padding: '2px 7px', borderRadius: 999, fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Nuevo</div>
        )}
      </div>
      <div style={{ padding: '10px 12px 14px' }}>
        <div style={{ fontSize: 9, color: 'var(--va-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{p.cat}</div>
        <div style={{ fontFamily: 'Playfair Display', fontSize: 14, color: 'var(--va-ink)', lineHeight: 1.2, marginBottom: 8, height: 34, overflow: 'hidden' }}>{p.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{p.price.toLocaleString('es-CU')} <span style={{ fontSize: 10, opacity: 0.6 }}>CUP</span></div>
            <div style={{ fontSize: 10, opacity: 0.55 }}>${p.usd}</div>
          </div>
          <button style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'var(--va-coffee)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon.Plus size={13} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ───── MOBILE CATALOG ─────
function VAMCatalog() {
  return (
    <VAMobileFrame>
      <VAMobileHeader title="San Valentín" back />
      <div style={{ padding: '0 20px 20px', background: 'var(--va-cream)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--va-paper)', borderRadius: 999, padding: '12px 16px', marginBottom: 14 }}>
          <Icon.Search size={14} color="rgba(42,31,24,.5)" />
          <span style={{ fontSize: 13, color: 'rgba(42,31,24,.5)' }}>Buscar en San Valentín…</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 13, color: 'rgba(42,31,24,.55)' }}>32 piezas</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ ...vaBtn('ghost'), padding: '7px 12px', fontSize: 12 }}><Icon.Filter size={12} /> Filtros</button>
            <button style={{ ...vaBtn('ghost'), padding: '7px 12px', fontSize: 12 }}>Ordenar</button>
          </div>
        </div>
        {/* sub chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 14 }}>
          {[['Todo', true], ['Ramos', false], ['Peluches', false], ['Tarjetas', false], ['Cajas', false]].map(([n, on]) => (
            <button key={n} style={{
              padding: '7px 14px', borderRadius: 999, fontSize: 12, flexShrink: 0,
              background: on ? 'var(--va-coffee)' : 'transparent',
              color: on ? 'white' : 'var(--va-coffee)',
              border: on ? 'none' : '1px solid var(--va-line)', cursor: 'pointer',
            }}>{n}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {PRODUCTS_A.map(p => <VAMobileProductCard key={p.id} p={p} />)}
        </div>
      </div>
      <VAMobileTabBar active="catalog" />
    </VAMobileFrame>
  );
}

// ───── MOBILE PRODUCT DETAIL ─────
function VAMDetail() {
  const p = PRODUCTS_A[0];
  return (
    <VAMobileFrame>
      <div style={{ position: 'relative', height: 360 }}>
        <ProductImage tone="terracotta" src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80" />
        <div style={{ position: 'absolute', top: 14, left: 20, right: 20, display: 'flex', justifyContent: 'space-between' }}>
          <button style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(251,246,238,.95)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Arrow dir="left" size={16} /></button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(251,246,238,.95)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Heart size={15} /></button>
            <button style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(251,246,238,.95)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Bag size={15} /></button>
          </div>
        </div>
        {/* dots */}
        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
          {[0,1,2,3].map(i => <span key={i} style={{ width: i === 0 ? 18 : 6, height: 6, borderRadius: 3, background: i === 0 ? 'white' : 'rgba(255,255,255,.55)' }} />)}
        </div>
      </div>

      <div style={{ padding: 20, background: 'var(--va-cream)' }}>
        <div style={{ fontSize: 11, color: 'var(--va-terracotta)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>San Valentín · Ramos</div>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: 26, margin: '0 0 10px', lineHeight: 1.1 }}><i>"Te Amo"</i> · Ramo de Chuches</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {[1,2,3,4,5].map(i => <Icon.Star key={i} size={12} color="var(--va-mustard)" />)}
            <span style={{ fontSize: 12, marginLeft: 4 }}>{p.rating}</span>
          </span>
          <span style={{ fontSize: 12, color: 'rgba(42,31,24,.55)' }}>· {p.reviews} reseñas · <span style={{ color: 'var(--va-sage)' }}>{p.stock} disponibles</span></span>
        </div>

        <Price cup={p.price} usd={p.usd} size="lg" />

        <p style={{ fontSize: 13, color: 'rgba(42,31,24,.75)', lineHeight: 1.6, margin: '18px 0' }}>
          Ramo artesanal con 12 chuches surtidas envueltas en papel kraft, decorado con tul, rosa de fieltro hecha a mano y tarjeta personalizada.
        </p>

        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Color del envoltorio</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['#C8553D', true], ['#E8B9A8', false], ['#F4EBDA', false], ['#8FA67B', false]].map(([c, on], i) => (
              <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: on ? '2px solid var(--va-coffee)' : '1px solid var(--va-line)', boxShadow: on ? '0 0 0 2px var(--va-cream) inset' : 'none' }} />
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mensaje en la tarjeta</div>
          <textarea placeholder="Para ti, mi amor…" rows={2}
            style={{ width: '100%', padding: 12, border: '1px solid var(--va-line-strong)', borderRadius: 8, background: 'var(--va-paper)', resize: 'none', fontFamily: 'Inter', fontSize: 13 }} />
        </div>

        <div style={{ display: 'flex', gap: 18, marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--va-line)', fontSize: 12, color: 'rgba(42,31,24,.7)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon.Truck size={14} /> Entrega 48h</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon.Box size={14} /> Empaque incluido</div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div style={{ position: 'sticky', bottom: 0, zIndex: 5, padding: '14px 20px 22px', background: 'var(--va-cream)', borderTop: '1px solid var(--va-line)', display: 'flex', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--va-line-strong)', borderRadius: 999, padding: 2 }}>
          <button style={{ width: 34, height: 34, borderRadius: '50%', border: 'none', background: 'transparent' }}><Icon.Minus size={12} /></button>
          <div style={{ width: 22, textAlign: 'center', fontSize: 14, fontWeight: 500 }}>1</div>
          <button style={{ width: 34, height: 34, borderRadius: '50%', border: 'none', background: 'transparent' }}><Icon.Plus size={12} /></button>
        </div>
        <button style={{ ...vaBtn('primary'), flex: 1, padding: '12px 16px' }}>
          <Icon.Bag size={14} color="white" /> Añadir · 2 500 CUP
        </button>
      </div>
    </VAMobileFrame>
  );
}

// ───── MOBILE CART ─────
function VAMCart() {
  const items = PRODUCTS_A.slice(0, 3);
  return (
    <VAMobileFrame>
      <VAMobileHeader title="Mi carrito" back action={<span style={{ fontSize: 13, color: 'var(--va-terracotta)' }}>Limpiar</span>} />
      <div style={{ padding: '4px 20px 20px', background: 'var(--va-cream)' }}>
        <div style={{ fontSize: 13, color: 'rgba(42,31,24,.6)', marginBottom: 14 }}>{items.length} piezas · listas para envolverse</div>
        {items.map((it, i) => (
          <div key={it.id} style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--va-line)', alignItems: 'flex-start' }}>
            <div style={{ width: 76, height: 76, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
              <ProductImage tone={it.tone} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 9, color: 'var(--va-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{it.cat}</div>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 15, lineHeight: 1.2, margin: '2px 0 6px' }}>{it.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(42,31,24,.55)' }}>Color: Terracotta</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{it.price.toLocaleString('es-CU')} <span style={{ fontSize: 10, opacity: 0.55 }}>CUP</span></div>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--va-line-strong)', borderRadius: 999, padding: 2 }}>
                  <button style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', background: 'transparent' }}><Icon.Minus size={11} /></button>
                  <span style={{ width: 24, textAlign: 'center', fontSize: 13, fontWeight: 500 }}>{i + 1}</span>
                  <button style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', background: 'transparent' }}><Icon.Plus size={11} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Coupon */}
        <div style={{ marginTop: 18, padding: 14, background: 'var(--va-paper)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
          <CraftGlyph.Sparkle size={16} color="var(--va-mustard)" />
          <span style={{ flex: 1, fontSize: 13 }}>Código de cariño</span>
          <input placeholder="MAMA10" style={{ background: 'transparent', border: 'none', textAlign: 'right', fontSize: 13, width: 80 }} />
        </div>

        {/* Summary */}
        <div style={{ marginTop: 18, padding: 16, background: 'var(--va-paper)', borderRadius: 12 }}>
          {[['Subtotal', '8 800 CUP'], ['Envío', '500 CUP'], ['Empaque', 'Gratis']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 13, color: 'rgba(42,31,24,.7)' }}>
              <span>{k}</span><span>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--va-line-strong)', marginTop: 8, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Playfair Display', fontSize: 16 }}>Total</span>
            <span style={{ fontFamily: 'Playfair Display', fontSize: 22, color: 'var(--va-terracotta)' }}>9 300 CUP</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ position: 'sticky', bottom: 0, padding: '14px 20px 22px', background: 'var(--va-cream)', borderTop: '1px solid var(--va-line)' }}>
        <button style={{ ...vaBtn('primary'), width: '100%', padding: '14px' }}>
          Continuar al pago · 9 300 CUP <Icon.Arrow size={14} color="white" />
        </button>
      </div>
    </VAMobileFrame>
  );
}

// ───── MOBILE LOGIN ─────
function VAMLogin() {
  return (
    <VAMobileFrame>
      <div style={{ padding: '24px 24px 14px', background: 'var(--va-cream)' }}>
        <button style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--va-line)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon.X size={16} />
        </button>
      </div>
      <div style={{ position: 'relative', height: 260, margin: '0 24px', borderRadius: '120px 120px 16px 16px', overflow: 'hidden' }}>
        <ProductImage tone="rose" src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80" />
        <div style={{ position: 'absolute', bottom: 20, left: 16, right: 16, color: 'white' }}>
          <div className="script" style={{ fontSize: 18, color: 'rgba(255,255,255,.95)' }}>Bienvenida de vuelta</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 24, margin: '4px 0 0', lineHeight: 1.1, color: 'white', textShadow: '0 1px 4px rgba(0,0,0,.3)' }}>
            <i>Buen día,</i> persona especial.
          </h2>
        </div>
      </div>

      <div style={{ padding: '24px', background: 'var(--va-cream)' }}>
        <h3 style={{ fontFamily: 'Playfair Display', fontSize: 22, margin: '0 0 4px' }}>Iniciar sesión</h3>
        <p style={{ fontSize: 13, color: 'rgba(42,31,24,.6)', margin: '0 0 20px' }}>
          ¿Nueva? <a style={{ color: 'var(--va-terracotta)', textDecoration: 'underline' }}>Crea tu cuenta</a>
        </p>
        <div style={{ display: 'grid', gap: 12 }}>
          <FormField label="Correo o teléfono" value="" />
          <FormField label="Contraseña" value="" />
          <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 12 }}>
            <a style={{ color: 'var(--va-terracotta)' }}>¿Olvidaste tu contraseña?</a>
          </div>
          <button style={{ ...vaBtn('primary'), width: '100%', marginTop: 6 }}>Entrar a mi cuenta</button>
        </div>

        <div style={{ position: 'relative', textAlign: 'center', margin: '24px 0' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--va-line)' }} />
          <span style={{ position: 'relative', background: 'var(--va-cream)', padding: '0 12px', fontSize: 11, color: 'rgba(42,31,24,.55)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>O continúa con</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {['Google', 'Facebook'].map(p => (
            <button key={p} style={{ ...vaBtn('ghost'), padding: '11px 16px', fontSize: 13 }}>{p}</button>
          ))}
        </div>
      </div>
    </VAMobileFrame>
  );
}

// ───── MOBILE PROFILE ─────
function VAMProfile() {
  return (
    <VAMobileFrame>
      <VAMobileHeader title="Mi perfil" />
      <div style={{ padding: '8px 20px 20px', background: 'var(--va-cream)' }}>
        {/* Avatar card */}
        <div style={{ background: 'var(--va-paper)', borderRadius: 14, padding: 20, textAlign: 'center', marginBottom: 18 }}>
          <div style={{ width: 76, height: 76, margin: '0 auto', borderRadius: '50%', background: 'var(--va-terracotta)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display', fontSize: 30, fontStyle: 'italic' }}>L</div>
          <div style={{ fontFamily: 'Playfair Display', fontSize: 20, marginTop: 12 }}>Lía Hernández</div>
          <div style={{ fontSize: 12, color: 'rgba(42,31,24,.55)' }}>lia.gonzalez@gmail.com</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--va-line)' }}>
            {[['12', 'Pedidos'], ['5', 'Favoritos'], ['2', 'En camino']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'Playfair Display', fontSize: 22, color: 'var(--va-terracotta)' }}>{n}</div>
                <div style={{ fontSize: 11, color: 'rgba(42,31,24,.6)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div style={{ background: 'var(--va-paper)', borderRadius: 14, overflow: 'hidden' }}>
          {[
            ['Mis pedidos', <Icon.Box size={16} />, '3 activos'],
            ['Favoritos', <Icon.Heart size={16} />, '5'],
            ['Direcciones', <Icon.Home size={16} />, '2 guardadas'],
            ['Métodos de pago', <Icon.Settings size={16} />, ''],
            ['Notificaciones', <Icon.Settings size={16} />, ''],
            ['Ayuda y soporte', <Icon.Settings size={16} />, ''],
          ].map(([n, ic, sub], i) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', borderTop: i === 0 ? 'none' : '1px solid var(--va-line)' }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--va-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>{ic}</span>
              <span style={{ flex: 1, fontSize: 14 }}>{n}</span>
              {sub && <span style={{ fontSize: 12, color: 'rgba(42,31,24,.55)', marginRight: 8 }}>{sub}</span>}
              <Icon.Arrow size={14} color="rgba(42,31,24,.4)" />
            </div>
          ))}
        </div>

        <button style={{ width: '100%', marginTop: 16, padding: '14px', background: 'transparent', border: '1px solid var(--va-line-strong)', borderRadius: 999, fontSize: 14, color: 'var(--va-terracotta)', cursor: 'pointer' }}>Cerrar sesión</button>
      </div>
      <VAMobileTabBar active="profile" />
    </VAMobileFrame>
  );
}

Object.assign(window, { VAMHome, VAMCatalog, VAMDetail, VAMCart, VAMLogin, VAMProfile, VAMobileFrame, VAMobileHeader, VAMobileTabBar });
