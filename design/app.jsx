// Mell Craft — Design Canvas

// Placeholder for variant B (defined later) — so app boots even before
// variant-b files are loaded.
const VBPlaceholder = ({ name }) => (
  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', color: '#999', fontSize: 14, background: '#F4EEE5' }}>
    {name} — próximamente
  </div>
);

const G = window;
const safe = (name) => G[name] ? G[name] : () => <VBPlaceholder name={name} />;

function App() {
  return (
    <DesignCanvas>
      {/* ───────────── INTRO ───────────── */}
      <DCSection id="intro" title="Mell Craft · Catálogo Web"
        subtitle="Dos direcciones visuales (A · Romántica Artesanal, B · Boutique Moderna). Vistas desktop + móvil. Incluye panel de admin.">
        <DCArtboard id="brief" label="✿ Briefing" width={520} height={620}>
          <Briefing />
        </DCArtboard>
        <DCPostIt top={-30} left={620} rotate={3} width={220}>
          Pasea por el canvas: arrastra con clic izquierdo, zoom con scroll. Toca el ⛶ para enfocar una pantalla.
        </DCPostIt>
      </DCSection>

      {/* ───────────── VARIANT A — USER DESKTOP ───────────── */}
      <DCSection id="va-user-desktop" title="A · Romántica Artesanal — Cliente · Desktop"
        subtitle="Cremas, terracotta, serif clásica · feel de papel y tinta. Para clientes finales.">
        <DCArtboard id="va-home"     label="01 · Home"          width={1440} height={2580}><VAHome /></DCArtboard>
        <DCArtboard id="va-catalog"  label="02 · Catálogo"      width={1440} height={1700}><VACatalog /></DCArtboard>
        <DCArtboard id="va-detail"   label="03 · Detalle"       width={1440} height={1850}><VAProductDetail /></DCArtboard>
        <DCArtboard id="va-cart"     label="04 · Carrito"       width={1440} height={1000}><VACart /></DCArtboard>
        <DCArtboard id="va-checkout" label="05 · Checkout"      width={1440} height={1300}><VACheckout /></DCArtboard>
        <DCArtboard id="va-login"    label="06 · Login"         width={1440} height={900}><VALogin /></DCArtboard>
        <DCArtboard id="va-profile"  label="07 · Perfil"        width={1440} height={1080}><VAProfile /></DCArtboard>
        <DCArtboard id="va-favs"     label="08 · Favoritos"     width={1440} height={1080}><VAFavorites /></DCArtboard>
      </DCSection>

      {/* ───────────── VARIANT A — ADMIN ───────────── */}
      <DCSection id="va-admin" title="A · Romántica Artesanal — Admin · Desktop"
        subtitle="Panel para Melissa: gestionar productos, stock e imágenes.">
        <DCArtboard id="va-adm-dash"  label="09 · Dashboard"        width={1440} height={1080}><VAAdminDashboard /></DCArtboard>
        <DCArtboard id="va-adm-prods" label="10 · Lista productos"  width={1440} height={1080}><VAAdminProducts /></DCArtboard>
        <DCArtboard id="va-adm-edit"  label="11 · Crear / Editar producto" width={1440} height={1280}><VAAdminEdit /></DCArtboard>
      </DCSection>

      {/* ───────────── VARIANT A — MOBILE ───────────── */}
      <DCSection id="va-mobile" title="A · Romántica Artesanal — Cliente · Mobile (iPhone)"
        subtitle="Mismas pantallas adaptadas a 390 × 844.">
        <DCArtboard id="va-m-home"    label="01 · Home"        width={390} height={844}><VAMHome /></DCArtboard>
        <DCArtboard id="va-m-catalog" label="02 · Catálogo"    width={390} height={844}><VAMCatalog /></DCArtboard>
        <DCArtboard id="va-m-detail"  label="03 · Detalle"     width={390} height={844}><VAMDetail /></DCArtboard>
        <DCArtboard id="va-m-cart"    label="04 · Carrito"     width={390} height={844}><VAMCart /></DCArtboard>
        <DCArtboard id="va-m-login"   label="05 · Login"       width={390} height={844}><VAMLogin /></DCArtboard>
        <DCArtboard id="va-m-profile" label="06 · Perfil"      width={390} height={844}><VAMProfile /></DCArtboard>
      </DCSection>

      {/* ───────────── VARIANT B — USER DESKTOP ───────────── */}
      <DCSection id="vb-user-desktop" title="B · Boutique Moderna — Cliente · Desktop"
        subtitle="Bone + clay, editorial moderno con DM Serif Display. Más estructurado, magazine.">
        <DCArtboard id="vb-home"     label="01 · Home"          width={1440} height={2580}>{safe('VBHome')()}</DCArtboard>
        <DCArtboard id="vb-catalog"  label="02 · Catálogo"      width={1440} height={1700}>{safe('VBCatalog')()}</DCArtboard>
        <DCArtboard id="vb-detail"   label="03 · Detalle"       width={1440} height={1700}>{safe('VBProductDetail')()}</DCArtboard>
        <DCArtboard id="vb-cart"     label="04 · Carrito"       width={1440} height={1000}>{safe('VBCart')()}</DCArtboard>
        <DCArtboard id="vb-checkout" label="05 · Checkout"      width={1440} height={1300}>{safe('VBCheckout')()}</DCArtboard>
        <DCArtboard id="vb-login"    label="06 · Login"         width={1440} height={900}>{safe('VBLogin')()}</DCArtboard>
        <DCArtboard id="vb-profile"  label="07 · Perfil"        width={1440} height={1080}>{safe('VBProfile')()}</DCArtboard>
        <DCArtboard id="vb-favs"     label="08 · Favoritos"     width={1440} height={1080}>{safe('VBFavorites')()}</DCArtboard>
      </DCSection>

      {/* ───────────── VARIANT B — ADMIN ───────────── */}
      <DCSection id="vb-admin" title="B · Boutique Moderna — Admin · Desktop"
        subtitle="Mismas funciones de gestión, tono visual editorial.">
        <DCArtboard id="vb-adm-dash"  label="09 · Dashboard"        width={1440} height={1080}>{safe('VBAdminDashboard')()}</DCArtboard>
        <DCArtboard id="vb-adm-prods" label="10 · Lista productos"  width={1440} height={1080}>{safe('VBAdminProducts')()}</DCArtboard>
        <DCArtboard id="vb-adm-edit"  label="11 · Crear / Editar producto" width={1440} height={1280}>{safe('VBAdminEdit')()}</DCArtboard>
      </DCSection>

      {/* ───────────── VARIANT B — MOBILE ───────────── */}
      <DCSection id="vb-mobile" title="B · Boutique Moderna — Cliente · Mobile"
        subtitle="Versión móvil de la dirección editorial.">
        <DCArtboard id="vb-m-home"    label="01 · Home"        width={390} height={844}>{safe('VBMHome')()}</DCArtboard>
        <DCArtboard id="vb-m-catalog" label="02 · Catálogo"    width={390} height={844}>{safe('VBMCatalog')()}</DCArtboard>
        <DCArtboard id="vb-m-detail"  label="03 · Detalle"     width={390} height={844}>{safe('VBMDetail')()}</DCArtboard>
        <DCArtboard id="vb-m-cart"    label="04 · Carrito"     width={390} height={844}>{safe('VBMCart')()}</DCArtboard>
        <DCArtboard id="vb-m-login"   label="05 · Login"       width={390} height={844}>{safe('VBMLogin')()}</DCArtboard>
        <DCArtboard id="vb-m-profile" label="06 · Perfil"      width={390} height={844}>{safe('VBMProfile')()}</DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

function Briefing() {
  return (
    <div className="va screen" style={{ background: 'var(--va-cream)', padding: 40 }}>
      <Logo size="md" />
      <h1 style={{ fontFamily: 'Playfair Display', fontSize: 38, lineHeight: 1.05, margin: '24px 0 8px' }}>
        Catálogo <i>completo</i> de la tienda.
      </h1>
      <p style={{ fontSize: 13, color: 'rgba(42,31,24,.7)', lineHeight: 1.6, margin: 0, maxWidth: 400 }}>
        Manualidades artesanales para San Valentín, Día de las Madres, peluches & chuches. Precios en CUP y USD.
      </p>

      <div style={{ marginTop: 28, display: 'grid', gap: 14 }}>
        {[
          ['Cliente final', '8 pantallas', 'Catálogo, búsqueda y filtros, detalle, carrito, checkout, login, perfil, favoritos.'],
          ['Admin (Melissa)', '3 pantallas', 'Dashboard con KPIs, lista de productos con stock, crear/editar producto con imágenes.'],
          ['Mobile', '6 pantallas × 2', 'Home, catálogo, detalle, carrito, login, perfil — para ambas variantes.'],
        ].map(([t, n, d]) => (
          <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 0', borderTop: '1px solid var(--va-line)' }}>
            <div style={{ width: 52, flexShrink: 0, fontSize: 11, color: 'var(--va-terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: 4 }}>{n}</div>
            <div>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 17 }}>{t}</div>
              <div style={{ fontSize: 12, color: 'rgba(42,31,24,.65)', marginTop: 3, lineHeight: 1.5 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 26, padding: 18, background: 'var(--va-paper)', borderRadius: 12, display: 'flex', gap: 14, alignItems: 'center' }}>
        <CraftGlyph.Heart size={32} color="var(--va-terracotta)" />
        <div style={{ flex: 1, fontSize: 12, color: 'rgba(42,31,24,.7)', lineHeight: 1.5 }}>
          Cada variante es una dirección completa.
          Te enseñamos ambas para que elijas tu favorita o mezclemos lo mejor de cada una.
        </div>
      </div>

      <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {['Español', 'CUP + USD', '2026 · feb', 'Visual mockup'].map(t => (
          <span key={t} style={{ background: 'var(--va-paper)', borderRadius: 999, padding: '5px 12px', fontSize: 11, color: 'var(--va-coffee)' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
