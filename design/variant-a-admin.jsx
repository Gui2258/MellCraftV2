// Variant A — ADMIN screens (Dashboard, Products List, Create/Edit Product)

function VAAdminSidebar({ active = 'dashboard' }) {
  const items = [
    ['dashboard', 'Dashboard', <Icon.Chart size={17} />],
    ['products', 'Productos', <Icon.Box size={17} />],
    ['orders', 'Pedidos', <Icon.Bag size={17} />],
    ['users', 'Usuarios', <Icon.Users size={17} />],
    ['inventory', 'Inventario', <Icon.Filter size={17} />],
    ['settings', 'Ajustes', <Icon.Settings size={17} />],
  ];
  return (
    <aside style={{
      width: 240, background: 'var(--va-coffee)', color: 'var(--va-cream)',
      padding: '24px 16px', display: 'flex', flexDirection: 'column', height: '100%', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px 22px', borderBottom: '1px solid rgba(251,246,238,.08)' }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--va-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: 16, color: 'var(--va-cream)' }}>m</div>
        <div>
          <div style={{ fontFamily: 'Playfair Display', fontSize: 17 }}>Mell <i>Craft</i></div>
          <div style={{ fontSize: 9, letterSpacing: '0.12em', opacity: 0.55, textTransform: 'uppercase' }}>panel admin</div>
        </div>
      </div>
      <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.4, padding: '20px 12px 10px' }}>Taller</div>
      {items.slice(0, 5).map(([id, name, ic]) => (
        <div key={id} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
          background: id === active ? 'rgba(200,85,61,.18)' : 'transparent',
          color: id === active ? 'var(--va-cream)' : 'rgba(251,246,238,.7)',
          fontSize: 14, fontWeight: id === active ? 500 : 400, marginBottom: 2,
          borderLeft: id === active ? '2px solid var(--va-terracotta)' : '2px solid transparent',
          paddingLeft: id === active ? 10 : 12,
        }}>
          {ic}<span>{name}</span>
          {id === 'orders' && <span style={{ marginLeft: 'auto', background: 'var(--va-terracotta)', color: 'white', borderRadius: 999, padding: '2px 7px', fontSize: 10 }}>5</span>}
        </div>
      ))}
      <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.4, padding: '20px 12px 10px' }}>Sistema</div>
      {items.slice(5).map(([id, name, ic]) => (
        <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, cursor: 'pointer', color: 'rgba(251,246,238,.7)', fontSize: 14 }}>
          {ic}<span>{name}</span>
        </div>
      ))}
      <div style={{ marginTop: 'auto', padding: 14, background: 'rgba(251,246,238,.04)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--va-mustard)', color: 'var(--va-coffee)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: 16 }}>M</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Melissa</div>
          <div style={{ fontSize: 11, opacity: 0.6 }}>Administradora</div>
        </div>
      </div>
    </aside>
  );
}

function VAAdminTopbar({ title, subtitle, actions }) {
  return (
    <div style={{
      padding: '24px 36px', background: 'var(--va-cream)', borderBottom: '1px solid var(--va-line)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div>
        <h1 style={{ fontSize: 28, margin: 0, lineHeight: 1.1 }}>{title}</h1>
        {subtitle && <div style={{ fontSize: 13, color: 'rgba(42,31,24,.55)', marginTop: 4 }}>{subtitle}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(61,44,31,0.05)', borderRadius: 999, padding: '8px 16px', width: 240 }}>
          <Icon.Search size={14} color="var(--va-coffee)" />
          <span style={{ fontSize: 13, color: 'rgba(61,44,31,.5)' }}>Buscar en el panel…</span>
        </div>
        <VAIconBtn badge={3}><Icon.Heart size={15} /></VAIconBtn>
        {actions}
      </div>
    </div>
  );
}

// ───── DASHBOARD ─────
function VAAdminDashboard() {
  return (
    <div className="va screen" style={{ display: 'flex', overflow: 'hidden' }}>
      <VAAdminSidebar active="dashboard" />
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--va-paper)' }}>
        <VAAdminTopbar
          title={<>Hola, <i>Melissa</i> ✿</>}
          subtitle="Tu taller — Jueves, 12 de febrero · 2026"
          actions={<button style={vaBtn('primary')}><Icon.Plus size={14} color="white" /> Nuevo producto</button>}
        />
        <div style={{ padding: 36 }}>
          {/* KPI cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
            {[
              { label: 'Ventas hoy', main: '14 200', sub: 'CUP · $47.30', delta: '+18%', tone: 'terracotta', glyph: <CraftGlyph.Heart size={26} color="white" /> },
              { label: 'Pedidos pendientes', main: '5', sub: 'esperando preparación', delta: '2 urgentes', tone: 'mustard', glyph: <Icon.Bag size={22} color="white" /> },
              { label: 'Productos activos', main: '47', sub: '3 bajos en stock', delta: '+2 esta semana', tone: 'sage', glyph: <Icon.Box size={22} color="white" /> },
              { label: 'Clientes nuevos', main: '23', sub: 'este mes', delta: '+9%', tone: 'rose', glyph: <Icon.Users size={22} color="white" /> },
            ].map((k, i) => (
              <div key={i} style={{ background: 'var(--va-cream)', borderRadius: 14, padding: 22, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 18, right: 18, width: 42, height: 42, borderRadius: '50%',
                  background: `var(--va-${k.tone === 'rose' ? 'blush' : k.tone === 'sage' ? 'sage' : k.tone === 'mustard' ? 'mustard' : 'terracotta'})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {k.glyph}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(42,31,24,.6)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k.label}</div>
                <div style={{ fontFamily: 'Playfair Display', fontSize: 38, lineHeight: 1, marginTop: 8 }}>{k.main}</div>
                <div style={{ fontSize: 11, color: 'rgba(42,31,24,.55)', marginTop: 4 }}>{k.sub}</div>
                <div style={{ fontSize: 11, color: 'var(--va-terracotta)', marginTop: 10, fontWeight: 500 }}>{k.delta}</div>
              </div>
            ))}
          </div>

          {/* Sales chart + Top products */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginBottom: 28 }}>
            {/* Chart card */}
            <div style={{ background: 'var(--va-cream)', borderRadius: 14, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: 19 }}>Ventas semanales</div>
                  <div style={{ fontSize: 12, color: 'rgba(42,31,24,.55)' }}>5–12 febrero · 2026</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Semana', 'Mes', 'Año'].map((t, i) => (
                    <button key={t} style={{
                      padding: '6px 12px', borderRadius: 999, fontSize: 12,
                      background: i === 0 ? 'var(--va-coffee)' : 'transparent',
                      color: i === 0 ? 'white' : 'var(--va-coffee)',
                      border: i === 0 ? 'none' : '1px solid var(--va-line)', cursor: 'pointer',
                    }}>{t}</button>
                  ))}
                </div>
              </div>
              <ChartLine />
            </div>

            {/* Top products */}
            <div style={{ background: 'var(--va-cream)', borderRadius: 14, padding: 24 }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 19, marginBottom: 16 }}>Más queridos esta semana</div>
              {PRODUCTS_A.slice(0, 4).map((p, i) => (
                <div key={p.id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderTop: i === 0 ? 'none' : '1px solid var(--va-line)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                    <ProductImage tone={p.tone} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(42,31,24,.55)' }}>{p.cat}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{12 - i * 2} vendidos</div>
                    <div style={{ fontSize: 11, color: 'var(--va-terracotta)' }}>+{fmtCUP(p.price * (12 - i * 2))}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent orders */}
          <div style={{ background: 'var(--va-cream)', borderRadius: 14, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 19 }}>Pedidos recientes</div>
              <a style={{ fontSize: 13, color: 'var(--va-terracotta)' }}>Ver todos →</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '110px 1.5fr 1.5fr 1fr 1fr 100px', gap: 16, padding: '10px 0', fontSize: 11, color: 'rgba(42,31,24,.55)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--va-line)' }}>
              <span>Pedido</span><span>Cliente</span><span>Productos</span><span>Total</span><span>Estado</span><span></span>
            </div>
            {[
              { id: '#MC-2138', name: 'Lía Hernández', items: 'Ramo "Te Amo" · Osito Mensajero', total: '5 700 CUP', status: 'Preparando', dot: 'var(--va-mustard)' },
              { id: '#MC-2137', name: 'Daniela Castro', items: 'Mariposas Cartulina (12)', total: '950 CUP', status: 'Confirmado', dot: 'var(--va-sage)' },
              { id: '#MC-2136', name: 'Yulier Pérez', items: 'Bouquet Rosas Eternas', total: '5 800 CUP', status: 'En camino', dot: 'var(--va-terracotta)' },
              { id: '#MC-2135', name: 'Adriana Suárez', items: 'Caja Sorpresa Romántica · Peluche Corazón', total: '8 300 CUP', status: 'Entregado', dot: 'var(--va-sage)' },
              { id: '#MC-2134', name: 'Yoenis Garcia', items: 'Mini Cesta de Bombones x2', total: '4 400 CUP', status: 'Preparando', dot: 'var(--va-mustard)' },
            ].map((o, i) => (
              <div key={o.id} style={{ display: 'grid', gridTemplateColumns: '110px 1.5fr 1.5fr 1fr 1fr 100px', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--va-line)', alignItems: 'center' }}>
                <div style={{ fontFamily: 'Playfair Display', fontSize: 14 }}>{o.id}</div>
                <div style={{ fontSize: 13 }}>{o.name}</div>
                <div style={{ fontSize: 13, color: 'rgba(42,31,24,.7)' }}>{o.items}</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{o.total}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                  <Icon.Dot size={6} color={o.dot} /> {o.status}
                </div>
                <button style={{ ...vaBtn('ghost'), padding: '6px 14px', fontSize: 12 }}>Ver</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated-looking line chart in SVG
function ChartLine() {
  const points = [40, 65, 50, 80, 75, 110, 90];
  const days = ['Vie', 'Sáb', 'Dom', 'Lun', 'Mar', 'Mié', 'Jue'];
  const W = 700, H = 200, P = 24;
  const max = 130;
  const xs = (i) => P + (i / (points.length - 1)) * (W - P * 2);
  const ys = (v) => H - P - (v / max) * (H - P * 2);
  const path = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xs(i)} ${ys(v)}`).join(' ');
  const area = `${path} L ${xs(points.length - 1)} ${H - P} L ${xs(0)} ${H - P} Z`;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="va-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--va-terracotta)" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="var(--va-terracotta)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[1, 2, 3, 4].map(i => (
          <line key={i} x1={P} x2={W - P} y1={ys(max * i / 5)} y2={ys(max * i / 5)} stroke="rgba(61,44,31,.06)" />
        ))}
        <path d={area} fill="url(#va-area)" />
        <path d={path} fill="none" stroke="var(--va-terracotta)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((v, i) => (
          <g key={i}>
            <circle cx={xs(i)} cy={ys(v)} r="4" fill="white" stroke="var(--va-terracotta)" strokeWidth="2" />
            {i === 5 && (
              <g>
                <circle cx={xs(i)} cy={ys(v)} r="7" fill="none" stroke="var(--va-terracotta)" strokeWidth="1" opacity="0.4"/>
                <rect x={xs(i) - 30} y={ys(v) - 38} width="60" height="24" rx="5" fill="var(--va-coffee)" />
                <text x={xs(i)} y={ys(v) - 22} fontSize="11" fill="white" textAnchor="middle">14 200</text>
              </g>
            )}
          </g>
        ))}
        {days.map((d, i) => (
          <text key={d} x={xs(i)} y={H - 6} fontSize="10" fill="rgba(61,44,31,.55)" textAnchor="middle">{d}</text>
        ))}
      </svg>
    </div>
  );
}

// ───── PRODUCT LIST ─────
function VAAdminProducts() {
  const products = PRODUCTS_A.concat(PRODUCTS_A.slice(0, 2).map((p, i) => ({ ...p, id: p.id + '-x', name: p.name + ' (variante)' })));
  return (
    <div className="va screen" style={{ display: 'flex', overflow: 'hidden' }}>
      <VAAdminSidebar active="products" />
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--va-paper)' }}>
        <VAAdminTopbar
          title="Productos"
          subtitle="47 productos · 3 con stock bajo · 2 pausados"
          actions={<button style={vaBtn('primary')}><Icon.Plus size={14} color="white" /> Nuevo producto</button>}
        />
        <div style={{ padding: 36 }}>
          {/* Filter chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
            {[
              ['Todos', 47, true],
              ['Activos', 42, false],
              ['Stock bajo', 3, false],
              ['Pausados', 2, false],
              ['Agotados', 0, false],
            ].map(([n, count, on]) => (
              <button key={n} style={{
                padding: '8px 14px', borderRadius: 999, fontSize: 13, cursor: 'pointer',
                background: on ? 'var(--va-coffee)' : 'var(--va-cream)',
                color: on ? 'white' : 'var(--va-coffee)',
                border: on ? 'none' : '1px solid var(--va-line)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                {n} <span style={{ opacity: 0.6, fontSize: 11 }}>{count}</span>
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--va-cream)', border: '1px solid var(--va-line)', borderRadius: 999, padding: '8px 14px', width: 260 }}>
              <Icon.Search size={14} color="var(--va-coffee)" />
              <span style={{ fontSize: 13, color: 'rgba(61,44,31,.5)' }}>Buscar producto…</span>
            </div>
            <button style={{ ...vaBtn('ghost'), padding: '9px 16px', fontSize: 13 }}><Icon.Filter size={13} /> Filtros</button>
          </div>

          {/* Table */}
          <div style={{ background: 'var(--va-cream)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '34px 80px 2fr 1fr 1fr 1fr 110px 120px',
              gap: 16, padding: '14px 24px', fontSize: 11, color: 'rgba(42,31,24,.55)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              borderBottom: '1px solid var(--va-line)', background: 'var(--va-paper)' }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid var(--va-line-strong)' }} />
              <span></span><span>Producto</span><span>Categoría</span><span>Precio (CUP)</span><span>Stock</span><span>Estado</span><span></span>
            </div>
            {products.slice(0, 9).map((p, i) => {
              const lowStock = p.stock < 8;
              return (
                <div key={p.id + i} style={{ display: 'grid', gridTemplateColumns: '34px 80px 2fr 1fr 1fr 1fr 110px 120px', gap: 16, padding: '14px 24px', alignItems: 'center', borderBottom: i === 8 ? 'none' : '1px solid var(--va-line)' }}>
                  <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid var(--va-line-strong)' }} />
                  <div style={{ width: 56, height: 56, borderRadius: 6, overflow: 'hidden' }}>
                    <ProductImage tone={p.tone} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Playfair Display', fontSize: 16 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(42,31,24,.5)', marginTop: 2 }}>SKU · MC-{p.id.toUpperCase()}</div>
                  </div>
                  <div style={{ fontSize: 13 }}>{p.cat}</div>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: 15 }}>{p.price.toLocaleString('es-CU')}<span style={{ fontSize: 11, opacity: 0.5 }}> · ${p.usd}</span></div>
                  <div>
                    <div style={{ fontSize: 13, color: lowStock ? 'var(--va-terracotta)' : 'var(--va-coffee)', fontWeight: lowStock ? 600 : 400 }}>{p.stock} unidades</div>
                    <div style={{ marginTop: 4, height: 4, background: 'var(--va-line)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(100, (p.stock / 40) * 100)}%`, background: lowStock ? 'var(--va-terracotta)' : 'var(--va-sage)' }} />
                    </div>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12,
                    padding: '4px 10px', borderRadius: 999,
                    background: lowStock ? 'rgba(200,85,61,0.1)' : 'rgba(143,166,123,0.15)',
                    color: lowStock ? 'var(--va-terracotta)' : 'var(--va-sage)' }}>
                    <Icon.Dot size={6} color={lowStock ? 'var(--va-terracotta)' : 'var(--va-sage)'} />
                    {lowStock ? 'Stock bajo' : 'Activo'}
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                    <button style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'rgba(61,44,31,.05)', cursor: 'pointer', color: 'var(--va-coffee)' }}><Icon.Eye size={14} /></button>
                    <button style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'rgba(61,44,31,.05)', cursor: 'pointer', color: 'var(--va-coffee)' }}><Icon.Pencil size={14} /></button>
                    <button style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'rgba(61,44,31,.05)', cursor: 'pointer', color: 'rgba(42,31,24,.5)' }}><Icon.Trash size={14} /></button>
                  </div>
                </div>
              );
            })}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'var(--va-paper)' }}>
              <div style={{ fontSize: 12, color: 'rgba(42,31,24,.55)' }}>Mostrando 1–9 de 47</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} style={{
                    width: 30, height: 30, border: 'none', borderRadius: 6,
                    background: n === 1 ? 'var(--va-terracotta)' : 'transparent',
                    color: n === 1 ? 'white' : 'var(--va-coffee)',
                    fontSize: 13, cursor: 'pointer',
                  }}>{n}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───── EDIT PRODUCT ─────
function VAAdminEdit() {
  return (
    <div className="va screen" style={{ display: 'flex', overflow: 'hidden' }}>
      <VAAdminSidebar active="products" />
      <div style={{ flex: 1, overflowY: 'auto', background: 'var(--va-paper)' }}>
        <VAAdminTopbar
          title={<><i>Editar</i> producto</>}
          subtitle={<span>Productos · Ramo de Chuches "Te Amo" · <span style={{ color: 'var(--va-terracotta)' }}>Cambios sin guardar</span></span>}
          actions={<>
            <button style={{ ...vaBtn('ghost') }}>Cancelar</button>
            <button style={vaBtn('primary')}>Guardar cambios <Icon.Check size={14} color="white" stroke={3} /></button>
          </>}
        />
        <div style={{ padding: 36, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'start' }}>
          {/* Main column */}
          <div style={{ display: 'grid', gap: 20 }}>
            {/* Basic info card */}
            <Card title="Información básica">
              <FormField label="Nombre del producto" value='Ramo de Chuches "Te Amo"' />
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 16 }}>
                <FormField label="Categoría" value="San Valentín" />
                <FormField label="SKU" value="MC-P1-2026" />
              </div>
              <div style={{ marginTop: 16 }}>
                <FormField label="Descripción corta" value="Ramo artesanal con 12 chuches surtidas y rosa de fieltro." textarea />
              </div>
              <div style={{ marginTop: 16 }}>
                <span style={{ display: 'block', fontSize: 12, color: 'rgba(42,31,24,.7)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Descripción detallada</span>
                <div style={{ border: '1px solid var(--va-line-strong)', borderRadius: 8, background: 'var(--va-paper)', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', gap: 4, padding: '6px 10px', borderBottom: '1px solid var(--va-line)', background: 'var(--va-cream)' }}>
                    {['B', 'I', 'U', '•', '1.', '"', '↺', '↻'].map((t, i) => (
                      <button key={i} style={{ width: 30, height: 26, border: 'none', borderRadius: 4, background: 'transparent', fontSize: 12, cursor: 'pointer', fontStyle: t === 'I' ? 'italic' : 'normal', fontWeight: t === 'B' ? 700 : 400, textDecoration: t === 'U' ? 'underline' : 'none' }}>{t}</button>
                    ))}
                  </div>
                  <div style={{ padding: 14, fontSize: 14, color: 'var(--va-ink)', lineHeight: 1.6, minHeight: 100 }}>
                    Un ramo pensado para decir "te amo" sin palabras. Lleva un surtido de las chuches favoritas de tu pareja, envueltas en papel kraft natural y tul color crema. Incluye una rosa de fieltro hecha a mano y una etiqueta de cartulina donde escribimos tu mensaje.
                  </div>
                </div>
              </div>
            </Card>

            {/* Images */}
            <Card title="Imágenes" subtitle="Hasta 8 imágenes · primera es la principal">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
                {['terracotta', 'rose', 'mustard', 'paper'].map((t, i) => (
                  <div key={i} style={{ aspectRatio: '1/1', borderRadius: 10, overflow: 'hidden', position: 'relative', border: i === 0 ? '2px solid var(--va-terracotta)' : '1px solid var(--va-line)' }}>
                    <ProductImage tone={t} />
                    <button style={{ position: 'absolute', top: 6, right: 6, width: 24, height: 24, borderRadius: '50%', background: 'rgba(42,31,24,.7)', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon.X size={12} color="white" />
                    </button>
                    {i === 0 && <div style={{ position: 'absolute', bottom: 6, left: 6, padding: '2px 8px', background: 'var(--va-terracotta)', color: 'white', fontSize: 10, borderRadius: 999, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Principal</div>}
                  </div>
                ))}
                <div style={{ aspectRatio: '1/1', borderRadius: 10, border: '2px dashed var(--va-line-strong)', background: 'var(--va-paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, cursor: 'pointer', color: 'rgba(42,31,24,.6)' }}>
                  <Icon.Upload size={22} />
                  <span style={{ fontSize: 11 }}>Subir imagen</span>
                </div>
              </div>
            </Card>

            {/* Pricing */}
            <Card title="Precio e inventario">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <FormField label="Precio (CUP)" value="2500" />
                <FormField label="Precio (USD)" value="8.50" />
                <FormField label="Costo (CUP)" value="1100" />
                <FormField label="Margen" value="56%" />
              </div>
              <div style={{ marginTop: 18, padding: 16, background: 'var(--va-paper)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 38, height: 22, borderRadius: 999, background: 'var(--va-terracotta)', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, borderRadius: '50%', background: 'white' }} />
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>Producto activo</div>
                  <div style={{ fontSize: 12, color: 'rgba(42,31,24,.55)' }}>Visible en la tienda · acepta pedidos</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 18 }}>
                <FormField label="Stock actual" value="12" />
                <FormField label="Aviso de stock bajo" value="5" />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'grid', gap: 20 }}>
            <Card title="Estado">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--va-sage)' }} />
                <span style={{ flex: 1 }}>Publicado</span>
                <a style={{ fontSize: 12, color: 'var(--va-terracotta)' }}>cambiar</a>
              </div>
              <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(42,31,24,.6)', lineHeight: 1.6 }}>
                Última edición: 11 feb 2026 · 14:38<br/>
                Publicado: 02 feb 2026<br/>
                Vistas (30d): 1 247
              </div>
            </Card>

            <Card title="Organización">
              <FormField label="Categoría principal" value="San Valentín" />
              <div style={{ marginTop: 14 }}>
                <span style={{ display: 'block', fontSize: 12, color: 'rgba(42,31,24,.7)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Etiquetas</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['romántico', 'chuches', 'kraft', 'hecho a mano', 'pieza única'].map(t => (
                    <span key={t} style={{ background: 'var(--va-paper)', border: '1px solid var(--va-line-strong)', borderRadius: 999, padding: '4px 10px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      {t} <Icon.X size={10} color="rgba(42,31,24,.5)" />
                    </span>
                  ))}
                  <button style={{ background: 'transparent', border: '1px dashed var(--va-line-strong)', borderRadius: 999, padding: '4px 10px', fontSize: 12, color: 'rgba(42,31,24,.5)', cursor: 'pointer' }}>+ etiqueta</button>
                </div>
              </div>
            </Card>

            <Card title="Opciones (variantes)">
              <div style={{ marginBottom: 10, fontSize: 12, color: 'rgba(42,31,24,.6)' }}>Color del envoltorio</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Terracotta', 'Rosa Antiguo', 'Crema', 'Salvia'].map(c => (
                  <span key={c} style={{ background: 'var(--va-paper)', borderRadius: 999, padding: '5px 10px', fontSize: 12 }}>{c}</span>
                ))}
              </div>
              <button style={{ ...vaBtn('ghost'), padding: '8px 12px', fontSize: 12, marginTop: 14 }}><Icon.Plus size={12} /> Añadir opción</button>
            </Card>

            <div style={{ background: '#fff8f1', border: '1px solid var(--va-mustard)', borderRadius: 14, padding: 18 }}>
              <div style={{ fontFamily: 'Caveat', fontSize: 22, color: 'var(--va-coffee)', marginBottom: 4 }}>¡Recuerda!</div>
              <p style={{ fontSize: 12, color: 'rgba(42,31,24,.7)', margin: 0, lineHeight: 1.5 }}>
                Las fotos del producto se ven en el cuadrado 1:1. Sube imágenes con buena luz natural y
                evita filtros. Una foto buena vende el doble.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <div style={{ background: 'var(--va-cream)', borderRadius: 14, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontFamily: 'Playfair Display', fontSize: 18 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: 'rgba(42,31,24,.55)' }}>{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

Object.assign(window, { VAAdminDashboard, VAAdminProducts, VAAdminEdit, VAAdminSidebar, VAAdminTopbar, Card });
