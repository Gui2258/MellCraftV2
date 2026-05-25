// Variant A — Catalog, Product Detail, Cart, Checkout, Login, Profile, Favorites

// ───── CATALOG ─────
function VACatalog() {
  return (
    <div className="va screen scroll">
      <VAHeader />

      {/* Breadcrumb + title strip */}
      <section style={{ padding: '36px 60px 24px', background: 'var(--va-paper)' }}>
        <div style={{ fontSize: 12, color: 'rgba(42,31,24,.6)', marginBottom: 10 }}>
          Inicio &nbsp;·&nbsp; Tienda &nbsp;·&nbsp; <span style={{ color: 'var(--va-coffee)' }}>San Valentín</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="script" style={{ fontSize: 22, color: 'var(--va-terracotta)' }}>Para tu persona favorita</div>
            <h1 style={{ fontSize: 56, margin: '4px 0 0', lineHeight: 1 }}>Colección <i>San Valentín</i></h1>
          </div>
          <div style={{ fontSize: 14, color: 'rgba(42,31,24,.6)' }}>32 piezas · ordenadas por más queridas</div>
        </div>
      </section>

      <section style={{ padding: '24px 60px 80px', background: 'var(--va-cream)', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40 }}>
        {/* Filters sidebar */}
        <aside>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div style={{ fontFamily: 'Playfair Display', fontSize: 18 }}>Filtrar</div>
            <button style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--va-terracotta)', cursor: 'pointer' }}>Limpiar</button>
          </div>

          {[
            { title: 'Ocasión', items: [['San Valentín', 32, true], ['Día de las Madres', 28, false], ['Cumpleaños', 17, false], ['Aniversario', 9, false], ['Sin ocasión', 14, false]] },
            { title: 'Tipo', items: [['Ramo de chuches', 12, true], ['Peluches tejidos', 8, false], ['Tarjetas pop-up', 11, false], ['Bouquets eternos', 6, false]] },
          ].map(g => (
            <div key={g.title} style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--va-coffee)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{g.title}</div>
              {g.items.map(([label, n, checked]) => (
                <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', cursor: 'pointer', fontSize: 13 }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: 4,
                    border: '1.5px solid var(--va-line-strong)',
                    background: checked ? 'var(--va-terracotta)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {checked && <Icon.Check size={11} color="white" stroke={3} />}
                  </span>
                  <span style={{ flex: 1, color: checked ? 'var(--va-ink)' : 'rgba(42,31,24,.75)' }}>{label}</span>
                  <span style={{ fontSize: 12, opacity: 0.5 }}>{n}</span>
                </label>
              ))}
            </div>
          ))}

          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--va-coffee)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Precio (CUP)</div>
            <div style={{ position: 'relative', height: 30 }}>
              <div style={{ position: 'absolute', top: 14, left: 0, right: 0, height: 3, background: 'var(--va-line)', borderRadius: 2 }} />
              <div style={{ position: 'absolute', top: 14, left: '15%', right: '25%', height: 3, background: 'var(--va-terracotta)', borderRadius: 2 }} />
              <div style={{ position: 'absolute', top: 9, left: '15%', width: 14, height: 14, borderRadius: '50%', background: 'var(--va-cream)', border: '2px solid var(--va-terracotta)' }} />
              <div style={{ position: 'absolute', top: 9, left: '75%', width: 14, height: 14, borderRadius: '50%', background: 'var(--va-cream)', border: '2px solid var(--va-terracotta)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(42,31,24,.6)', marginTop: 8 }}>
              <span>500 CUP</span><span>6000 CUP</span>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--va-coffee)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Color principal</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['#C8553D', '#D9A55C', '#8FA67B', '#E8B9A8', '#3D2C1F', '#F4EBDA', '#D88A7A', '#7A5A41'].map((c, i) => (
                <div key={c} style={{ width: 26, height: 26, borderRadius: '50%', background: c, border: i === 0 ? '2px solid var(--va-coffee)' : '1px solid var(--va-line)', boxShadow: i === 0 ? '0 0 0 2px var(--va-cream) inset' : 'none', cursor: 'pointer' }} />
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--va-coffee)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Disponibilidad</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', cursor: 'pointer', fontSize: 13 }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid var(--va-line-strong)' }} />
              Sólo disponibles ahora
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', cursor: 'pointer', fontSize: 13 }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid var(--va-terracotta)', background: 'var(--va-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Check size={11} color="white" stroke={3} /></span>
              Entrega en 48h
            </label>
          </div>
        </aside>

        {/* Product grid */}
        <div>
          {/* Sort bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24,
            padding: '14px 0', borderBottom: '1px solid var(--va-line)' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Más queridas', 'Novedades', 'Precio ↓', 'Precio ↑'].map((t, i) => (
                <button key={t} style={{
                  background: i === 0 ? 'var(--va-coffee)' : 'transparent',
                  color: i === 0 ? 'var(--va-cream)' : 'var(--va-coffee)',
                  border: i === 0 ? 'none' : '1px solid var(--va-line)',
                  borderRadius: 999, padding: '7px 14px', fontSize: 12, cursor: 'pointer',
                }}>{t}</button>
              ))}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(42,31,24,.6)' }}>Mostrando 1–8 de 32</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {PRODUCTS_A.map(p => <VAProductCard key={p.id} p={p} />)}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
            {[1,2,3,4].map(n => (
              <button key={n} style={{
                width: 36, height: 36, border: 'none', borderRadius: '50%',
                background: n === 1 ? 'var(--va-terracotta)' : 'transparent',
                color: n === 1 ? 'white' : 'var(--va-coffee)',
                fontSize: 13, cursor: 'pointer',
              }}>{n}</button>
            ))}
            <button style={{ width: 36, height: 36, border: 'none', borderRadius: '50%', background: 'transparent', color: 'var(--va-coffee)', cursor: 'pointer' }}>
              <Icon.Arrow size={14} />
            </button>
          </div>
        </div>
      </section>

      <VAFooter />
    </div>
  );
}

// ───── PRODUCT DETAIL ─────
function VAProductDetail() {
  const p = PRODUCTS_A[0];
  return (
    <div className="va screen scroll">
      <VAHeader />

      <section style={{ padding: '30px 60px 14px', background: 'var(--va-cream)' }}>
        <div style={{ fontSize: 12, color: 'rgba(42,31,24,.6)' }}>
          Inicio &nbsp;·&nbsp; Tienda &nbsp;·&nbsp; San Valentín &nbsp;·&nbsp; <span style={{ color: 'var(--va-coffee)' }}>{p.name}</span>
        </div>
      </section>

      <section style={{ padding: '20px 60px 60px', background: 'var(--va-cream)', display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 70 }}>
        {/* Gallery */}
        <div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['terracotta', 'rose', 'mustard', 'paper'].map((t, i) => (
                <div key={i} style={{ width: 64, height: 80, borderRadius: 6, overflow: 'hidden', border: i === 0 ? '2px solid var(--va-terracotta)' : '1px solid var(--va-line)' }}>
                  <ProductImage tone={t} />
                </div>
              ))}
            </div>
            <div style={{ flex: 1, height: 540, borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
              <ProductImage tone="terracotta" src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80" />
              <div style={{ position: 'absolute', top: 18, left: 18, display: 'flex', gap: 8 }}>
                <span style={{ background: 'var(--va-coffee)', color: 'var(--va-cream)', padding: '5px 12px', borderRadius: 999, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Nuevo</span>
                <span style={{ background: 'var(--va-mustard)', color: 'var(--va-coffee)', padding: '5px 12px', borderRadius: 999, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Pieza única</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={{ fontSize: 12, color: 'var(--va-terracotta)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
            San Valentín · Ramos de chuches
          </div>
          <h1 style={{ fontSize: 44, margin: 0, lineHeight: 1.05 }}><i>"Te Amo"</i> · Ramo de Chuches</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[1,2,3,4,5].map(i => <Icon.Star key={i} size={14} color="var(--va-mustard)" />)}
              <span style={{ fontSize: 13, marginLeft: 6, color: 'var(--va-coffee)' }}>{p.rating}</span>
            </span>
            <span style={{ width: 1, height: 14, background: 'var(--va-line-strong)' }} />
            <span style={{ fontSize: 13, color: 'rgba(42,31,24,.6)' }}>{p.reviews} reseñas</span>
            <span style={{ width: 1, height: 14, background: 'var(--va-line-strong)' }} />
            <span style={{ fontSize: 13, color: 'var(--va-sage)', fontWeight: 500 }}>● {p.stock} disponibles</span>
          </div>

          <div style={{ margin: '24px 0', padding: '20px 0', borderTop: '1px solid var(--va-line)', borderBottom: '1px solid var(--va-line)' }}>
            <Price cup={p.price} usd={p.usd} size="xl" />
            <div style={{ fontSize: 12, color: 'rgba(42,31,24,.6)', marginTop: 6 }}>O 3 pagos de 833 CUP sin recargo</div>
          </div>

          <p style={{ fontSize: 15, color: 'rgba(42,31,24,.75)', lineHeight: 1.7, margin: '20px 0' }}>
            Ramo artesanal con 12 chuches surtidas envueltas en papel kraft, decorado con tul,
            rosa de fieltro hecha a mano y una tarjeta personalizada. Tamaño aproximado 28×18 cm.
            Cada ramo es preparado el mismo día de su entrega.
          </p>

          {/* Variant choices */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Color del envoltorio</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                ['Terracotta', '#C8553D', true],
                ['Rosa Antiguo', '#E8B9A8', false],
                ['Crema', '#F4EBDA', false],
                ['Salvia', '#8FA67B', false],
              ].map(([n, c, on]) => (
                <div key={n} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 14px', borderRadius: 999,
                  border: on ? '1.5px solid var(--va-coffee)' : '1px solid var(--va-line)',
                  fontSize: 13, cursor: 'pointer',
                }}>
                  <span style={{ width: 14, height: 14, borderRadius: '50%', background: c, border: '1px solid rgba(0,0,0,.1)' }} />
                  {n}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mensaje en la tarjeta (opcional)</div>
            <textarea placeholder="Para ti, mi amor. Gracias por cada día contigo…" rows={2}
              style={{ width: '100%', padding: 14, border: '1px solid var(--va-line-strong)', borderRadius: 8, background: 'var(--va-paper)', resize: 'none', fontFamily: 'Inter', fontSize: 13, color: 'var(--va-ink)' }} />
          </div>

          {/* Qty + buttons */}
          <div style={{ display: 'flex', gap: 14, marginTop: 28, alignItems: 'stretch' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--va-line-strong)', borderRadius: 999, padding: 4 }}>
              <button style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer' }}><Icon.Minus size={14} /></button>
              <div style={{ width: 36, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>1</div>
              <button style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer' }}><Icon.Plus size={14} /></button>
            </div>
            <button style={{ ...vaBtn('primary'), flex: 1, fontSize: 15 }}>
              <Icon.Bag size={16} color="var(--va-cream)" /> Añadir al carrito
            </button>
            <button style={{ width: 50, height: 50, borderRadius: '50%', border: '1px solid var(--va-line-strong)', background: 'transparent', cursor: 'pointer' }}>
              <Icon.Heart size={18} />
            </button>
          </div>

          {/* Trust list */}
          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13, color: 'rgba(42,31,24,.7)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Icon.Truck size={16} /> Entrega 48h en La Habana</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Icon.Box size={16} /> Empaque incluido</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Icon.Heart size={16} /> Hecho a mano</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Icon.Check size={16} /> Garantía de cariño</div>
          </div>
        </div>
      </section>

      {/* Description + reviews tabs */}
      <section style={{ padding: '40px 60px 70px', background: 'var(--va-paper)' }}>
        <div style={{ display: 'flex', gap: 32, borderBottom: '1px solid var(--va-line-strong)', marginBottom: 28 }}>
          {['Descripción', 'Materiales & cuidados', `Reseñas (${p.reviews})`, 'Envío'].map((t, i) => (
            <div key={t} style={{
              padding: '14px 0',
              borderBottom: i === 0 ? '2px solid var(--va-terracotta)' : '2px solid transparent',
              fontSize: 14, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--va-ink)' : 'rgba(42,31,24,.6)', cursor: 'pointer',
            }}>{t}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 60 }}>
          <div>
            <p style={{ fontSize: 15, color: 'rgba(42,31,24,.75)', lineHeight: 1.8 }}>
              Un ramo pensado para decir "te amo" sin palabras. Lleva un surtido de las chuches favoritas
              de tu pareja (Trululú, Bon Bon Bum, gomitas de fresa, chocolatinas), envueltas en papel kraft
              natural y tul color crema. Incluye una rosa de fieltro hecha a mano y una etiqueta de cartulina
              donde escribimos tu mensaje a tinta.
            </p>
            <p style={{ fontSize: 15, color: 'rgba(42,31,24,.75)', lineHeight: 1.8, marginTop: 16 }}>
              Si necesitas chuches específicas o quieres añadir algo (peluche, perfume, etc.), escríbenos
              por WhatsApp y armamos el ramo a tu medida.
            </p>
          </div>
          <div style={{ background: 'var(--va-cream)', padding: 24, borderRadius: 12 }}>
            <div style={{ fontFamily: 'Playfair Display', fontSize: 18, marginBottom: 14 }}>Incluye</div>
            {['12 chuches surtidas', 'Rosa de fieltro hecha a mano', 'Tarjeta con tu mensaje', 'Envoltorio kraft + tul', 'Listón a juego'].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', fontSize: 13, color: 'var(--va-coffee)' }}>
                <Icon.Check size={14} color="var(--va-terracotta)" /> {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section style={{ padding: '60px 60px 80px', background: 'var(--va-cream)' }}>
        <h2 style={{ fontSize: 32, margin: '0 0 28px' }}>También te puede <i>gustar</i></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {PRODUCTS_A.slice(1, 5).map(p => <VAProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <VAFooter />
    </div>
  );
}

// ───── CART ─────
function VACart() {
  const items = PRODUCTS_A.slice(0, 3).map((p, i) => ({ ...p, qty: i === 0 ? 1 : i === 1 ? 2 : 1 }));
  const subCup = items.reduce((a, b) => a + b.price * b.qty, 0);
  const subUsd = items.reduce((a, b) => a + b.usd * b.qty, 0);
  return (
    <div className="va screen scroll">
      <VAHeader />
      <section style={{ padding: '40px 60px 80px', background: 'var(--va-cream)' }}>
        <h1 style={{ fontSize: 44, margin: '0 0 8px' }}>Tu <i>carrito</i></h1>
        <div style={{ fontSize: 14, color: 'rgba(42,31,24,.6)', marginBottom: 36 }}>{items.length} piezas listas para envolverse</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 40, alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 120px 80px 40px', gap: 20, fontSize: 11, color: 'rgba(42,31,24,.6)', textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: 14, borderBottom: '1px solid var(--va-line)' }}>
              <span></span><span>Producto</span><span>Cantidad</span><span style={{ textAlign: 'right' }}>Total</span><span></span>
            </div>
            {items.map((it, i) => (
              <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 120px 80px 40px', gap: 20,
                padding: '22px 0', borderBottom: '1px solid var(--va-line)', alignItems: 'center' }}>
                <div style={{ width: 100, height: 100, borderRadius: 8, overflow: 'hidden' }}>
                  <ProductImage tone={it.tone} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--va-terracotta)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{it.cat}</div>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: 19, marginBottom: 6 }}>{it.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(42,31,24,.6)' }}>Color: Terracotta · Mensaje: "Para ti"</div>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--va-line-strong)', borderRadius: 999, padding: 3 }}>
                  <button style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer' }}><Icon.Minus size={12} /></button>
                  <span style={{ width: 28, textAlign: 'center', fontSize: 14, fontWeight: 500 }}>{it.qty}</span>
                  <button style={{ width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer' }}><Icon.Plus size={12} /></button>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: 18 }}>{fmtCUP(it.price * it.qty)}</div>
                  <div style={{ fontSize: 11, opacity: 0.55 }}>{fmtUSD(it.usd * it.qty)}</div>
                </div>
                <button style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(42,31,24,.5)' }}>
                  <Icon.Trash size={15} />
                </button>
              </div>
            ))}

            <div style={{ marginTop: 30, padding: 22, background: 'var(--va-paper)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--va-mustard)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CraftGlyph.Sparkle size={16} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Playfair Display', fontSize: 15 }}>¿Tienes un código de cariño?</div>
                <div style={{ fontSize: 12, color: 'rgba(42,31,24,.6)', marginTop: 2 }}>Aplica un descuento o un saludo especial</div>
              </div>
              <input placeholder="EJ: MAMA10" style={{ background: 'var(--va-cream)', border: '1px solid var(--va-line)', borderRadius: 999, padding: '9px 16px', fontSize: 13, width: 160 }} />
              <button style={{ ...vaBtn('sm'), background: 'var(--va-coffee)', color: 'var(--va-cream)' }}>Aplicar</button>
            </div>
          </div>

          {/* Summary */}
          <aside style={{ background: 'var(--va-paper)', borderRadius: 14, padding: 30, position: 'sticky', top: 30 }}>
            <div style={{ fontFamily: 'Playfair Display', fontSize: 22, marginBottom: 22 }}>Resumen del pedido</div>
            {[
              ['Subtotal', `${fmtCUP(subCup)}`, `${fmtUSD(subUsd)}`],
              ['Envío (La Habana)', '500 CUP', '$1.50'],
              ['Empaque artesanal', 'Gratis', ''],
            ].map(([k, v, vu]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13, color: 'rgba(42,31,24,.75)' }}>
                <span>{k}</span>
                <span style={{ textAlign: 'right' }}>{v}{vu && <span style={{ opacity: 0.5, fontSize: 11, display: 'block' }}>{vu}</span>}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--va-line-strong)', margin: '14px 0', paddingTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'Playfair Display', fontSize: 18 }}>Total</span>
                <span style={{ fontFamily: 'Playfair Display', fontSize: 26, color: 'var(--va-terracotta)' }}>{fmtCUP(subCup + 500)}</span>
              </div>
              <div style={{ textAlign: 'right', fontSize: 12, opacity: 0.55 }}>{fmtUSD(subUsd + 1.50)}</div>
            </div>
            <button style={{ ...vaBtn('primary'), width: '100%', marginTop: 18, fontSize: 15 }}>
              Continuar al pago <Icon.Arrow size={14} color="white" />
            </button>
            <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(42,31,24,.6)', textAlign: 'center' }}>
              <Icon.Heart size={11} color="var(--va-terracotta)" filled /> Apartamos tu pedido por 24h
            </div>
          </aside>
        </div>
      </section>
      <VAFooter />
    </div>
  );
}

// ───── CHECKOUT ─────
function VACheckout() {
  return (
    <div className="va screen scroll">
      <VAHeader />
      <section style={{ padding: '40px 60px 70px', background: 'var(--va-cream)' }}>
        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 36 }}>
          {[['Carrito', true, true], ['Envío', true, false], ['Pago', false, false], ['Confirmación', false, false]].map(([n, done, current], i) => (
            <React.Fragment key={n}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: done ? 'var(--va-terracotta)' : current ? 'var(--va-coffee)' : 'var(--va-cream)',
                  color: done || current ? 'white' : 'var(--va-coffee)',
                  border: !done && !current ? '1.5px solid var(--va-line-strong)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600,
                }}>{done ? <Icon.Check size={13} stroke={3} color="white" /> : i + 1}</div>
                <span style={{ fontSize: 13, color: done || current ? 'var(--va-ink)' : 'rgba(42,31,24,.5)', fontWeight: current || done ? 500 : 400 }}>{n}</span>
              </div>
              {i < 3 && <div style={{ flex: 1, height: 1, background: 'var(--va-line)' }} />}
            </React.Fragment>
          ))}
        </div>

        <h1 style={{ fontSize: 36, margin: '0 0 30px' }}>Datos de <i>envío</i></h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 40, alignItems: 'flex-start' }}>
          {/* Form */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label="Nombre" value="Lía Hernández" />
              <FormField label="Apellidos" value="González Ruiz" />
              <FormField label="Teléfono / WhatsApp" value="+53 5555 0182" />
              <FormField label="Correo electrónico" value="lia.gonzalez@gmail.com" />
            </div>

            <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--va-line)' }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 20, marginBottom: 16 }}>Dirección de entrega</div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                {[['La Habana', true], ['Holguín', false], ['Otra (consultar)', false]].map(([c, on]) => (
                  <div key={c} style={{
                    padding: '10px 18px', borderRadius: 999,
                    border: on ? '1.5px solid var(--va-terracotta)' : '1px solid var(--va-line-strong)',
                    background: on ? 'rgba(200,85,61,0.06)' : 'transparent',
                    fontSize: 13, color: on ? 'var(--va-terracotta)' : 'var(--va-coffee)', cursor: 'pointer',
                  }}>{c}</div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                <FormField label="Calle y número" value="Calle 23 No. 1106 e/ 10 y 12" />
                <FormField label="Municipio" value="Plaza de la Revolución" />
              </div>
              <div style={{ marginTop: 16 }}>
                <FormField label="Referencias (opcional)" value="Entre la farmacia y el panadero. Tocar el portón verde." textarea />
              </div>
            </div>

            <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--va-line)' }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 20, marginBottom: 16 }}>¿Cuándo lo necesitas?</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  ['En 48 horas', 'Costo estándar', false],
                  ['Día específico', 'Sin recargo', true],
                  ['Express (mismo día)', '+800 CUP', false],
                ].map(([title, sub, on]) => (
                  <div key={title} style={{
                    border: on ? '1.5px solid var(--va-terracotta)' : '1px solid var(--va-line)',
                    background: on ? 'rgba(200,85,61,.05)' : 'var(--va-paper)',
                    borderRadius: 10, padding: 16, cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{title}</span>
                      <span style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid ' + (on ? 'var(--va-terracotta)' : 'var(--va-line-strong)'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {on && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--va-terracotta)' }} />}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(42,31,24,.6)', marginTop: 4 }}>{sub}</div>
                    {on && <div style={{ marginTop: 12, fontSize: 12, color: 'var(--va-terracotta)' }}>14 de febrero · día completo</div>}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 36 }}>
              <button style={vaBtn('ghost')}><Icon.Arrow dir="left" size={14} /> Volver al carrito</button>
              <button style={vaBtn('primary')}>Continuar al pago <Icon.Arrow size={14} color="white" /></button>
            </div>
          </div>

          {/* Summary */}
          <aside style={{ background: 'var(--va-paper)', borderRadius: 14, padding: 24, position: 'sticky', top: 20 }}>
            <div style={{ fontFamily: 'Playfair Display', fontSize: 18, marginBottom: 16 }}>Tu pedido (4 piezas)</div>
            {PRODUCTS_A.slice(0, 3).map(p => (
              <div key={p.id} style={{ display: 'flex', gap: 12, padding: '10px 0', alignItems: 'center', borderBottom: '1px solid var(--va-line)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                  <ProductImage tone={p.tone} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(42,31,24,.6)', marginTop: 2 }}>× 1 · {fmtCUP(p.price)}</div>
                </div>
              </div>
            ))}
            {[
              ['Subtotal', '8800 CUP'],
              ['Envío', '500 CUP'],
              ['Empaque', 'Gratis'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                <span style={{ color: 'rgba(42,31,24,.7)' }}>{k}</span><span>{v}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--va-line-strong)', marginTop: 8, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'Playfair Display', fontSize: 16 }}>Total</span>
              <span style={{ fontFamily: 'Playfair Display', fontSize: 22, color: 'var(--va-terracotta)' }}>9300 CUP</span>
            </div>
          </aside>
        </div>
      </section>
      <VAFooter />
    </div>
  );
}

function FormField({ label, value, textarea = false }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontSize: 12, color: 'rgba(42,31,24,.7)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
      {textarea ? (
        <textarea defaultValue={value} rows={2} style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--va-line-strong)', borderRadius: 8, background: 'var(--va-paper)', fontFamily: 'Inter', fontSize: 14, resize: 'none' }} />
      ) : (
        <input defaultValue={value} style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--va-line-strong)', borderRadius: 8, background: 'var(--va-paper)', fontFamily: 'Inter', fontSize: 14 }} />
      )}
    </label>
  );
}

// ───── LOGIN ─────
function VALogin() {
  return (
    <div className="va screen" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100%' }}>
      {/* Left art panel */}
      <div style={{ background: 'var(--va-paper)', position: 'relative', overflow: 'hidden', padding: '60px' }}>
        <Logo size="md" />
        <div style={{ marginTop: 80, position: 'relative' }}>
          <div className="script" style={{ fontSize: 26, color: 'var(--va-terracotta)' }}>Bienvenida de vuelta</div>
          <h1 style={{ fontSize: 56, margin: '6px 0 0', lineHeight: 1, letterSpacing: '-0.02em' }}>
            <i>Buen día,</i> <br/>persona <br/>especial.
          </h1>
          <p style={{ marginTop: 26, fontSize: 15, color: 'rgba(42,31,24,.65)', lineHeight: 1.6, maxWidth: 380 }}>
            Inicia sesión para guardar tus favoritos, ver tus pedidos
            y encargar tus regalos hechos a mano.
          </p>
        </div>
        {/* decorative imagery */}
        <div style={{ position: 'absolute', bottom: -40, right: -40, width: 320, height: 320, borderRadius: '50%', overflow: 'hidden', border: '14px solid var(--va-cream)' }}>
          <ProductImage tone="rose" src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80" />
        </div>
        <div style={{ position: 'absolute', top: 280, right: 220, transform: 'rotate(-8deg)',
          background: 'var(--va-mustard)', color: 'var(--va-coffee)',
          padding: '8px 16px', fontFamily: 'Caveat', fontSize: 22, borderRadius: 4 }}>
          ¡Te extrañábamos!
        </div>
      </div>

      {/* Right form */}
      <div style={{ background: 'var(--va-cream)', padding: '100px 90px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 380 }}>
          <h2 style={{ fontSize: 32, margin: '0 0 8px' }}>Iniciar sesión</h2>
          <p style={{ fontSize: 14, color: 'rgba(42,31,24,.65)', margin: '0 0 32px' }}>
            ¿Nueva por aquí? <a style={{ color: 'var(--va-terracotta)', textDecoration: 'underline' }}>Crea tu cuenta</a>
          </p>

          <div style={{ display: 'grid', gap: 16 }}>
            <FormField label="Correo o teléfono" value="" />
            <FormField label="Contraseña" value="" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid var(--va-line-strong)' }} />
                Recordarme
              </label>
              <a style={{ color: 'var(--va-terracotta)' }}>¿Olvidaste tu contraseña?</a>
            </div>
            <button style={{ ...vaBtn('primary'), width: '100%', marginTop: 6 }}>Entrar a mi cuenta</button>
          </div>

          <div style={{ position: 'relative', textAlign: 'center', margin: '30px 0' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--va-line)' }} />
            <span style={{ position: 'relative', background: 'var(--va-cream)', padding: '0 14px', fontSize: 12, color: 'rgba(42,31,24,.55)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>O continúa con</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['Google', 'Facebook'].map(p => (
              <button key={p} style={{ ...vaBtn('ghost'), padding: '11px 18px', fontSize: 13 }}>{p}</button>
            ))}
          </div>
          <div style={{ marginTop: 28, fontSize: 12, color: 'rgba(42,31,24,.55)', textAlign: 'center' }}>
            Al continuar aceptas nuestros <a style={{ color: 'var(--va-coffee)', textDecoration: 'underline' }}>Términos</a> y <a style={{ color: 'var(--va-coffee)', textDecoration: 'underline' }}>Privacidad</a>.
          </div>
        </div>
      </div>
    </div>
  );
}

// ───── PROFILE ─────
function VAProfile() {
  return (
    <div className="va screen scroll">
      <VAHeader />
      <section style={{ padding: '40px 60px 70px', background: 'var(--va-cream)', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40 }}>
        <aside style={{ background: 'var(--va-paper)', borderRadius: 12, padding: 24, height: 'fit-content' }}>
          <div style={{ textAlign: 'center', paddingBottom: 22, borderBottom: '1px solid var(--va-line)', marginBottom: 18 }}>
            <div style={{ width: 80, height: 80, margin: '0 auto', borderRadius: '50%', background: 'var(--va-terracotta)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display', fontSize: 32, fontStyle: 'italic' }}>L</div>
            <div style={{ fontFamily: 'Playfair Display', fontSize: 18, marginTop: 12 }}>Lía Hernández</div>
            <div style={{ fontSize: 12, color: 'rgba(42,31,24,.55)' }}>Cliente desde 2024</div>
          </div>
          {[
            ['Mi perfil', true, <Icon.User size={15} />],
            ['Mis pedidos', false, <Icon.Box size={15} />],
            ['Favoritos', false, <Icon.Heart size={15} />],
            ['Direcciones', false, <Icon.Home size={15} />],
            ['Cerrar sesión', false, null],
          ].map(([n, on, ic], i) => (
            <div key={n} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '11px 14px', borderRadius: 8, cursor: 'pointer',
              background: on ? 'var(--va-cream)' : 'transparent',
              color: on ? 'var(--va-terracotta)' : 'var(--va-coffee)',
              fontWeight: on ? 600 : 400, fontSize: 14,
              marginBottom: 4,
            }}>
              {ic}<span>{n}</span>
            </div>
          ))}
        </aside>

        <div>
          <h1 style={{ fontSize: 40, margin: '0 0 28px' }}>Mi <i>perfil</i></h1>

          {/* Info card */}
          <div style={{ background: 'var(--va-paper)', borderRadius: 14, padding: 28, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 22 }}>Información personal</div>
              <button style={{ ...vaBtn('ghost'), padding: '8px 14px', fontSize: 13 }}><Icon.Pencil size={13} /> Editar</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {[
                ['Nombre completo', 'Lía Hernández González'],
                ['Correo electrónico', 'lia.gonzalez@gmail.com'],
                ['Teléfono', '+53 5555 0182'],
                ['Cumpleaños', '23 de marzo'],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 12, color: 'rgba(42,31,24,.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 15, color: 'var(--va-ink)' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Last orders */}
          <div style={{ background: 'var(--va-paper)', borderRadius: 14, padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 22 }}>Pedidos recientes</div>
              <a style={{ fontSize: 13, color: 'var(--va-terracotta)' }}>Ver todos</a>
            </div>
            {[
              { id: '#MC-2126', date: '12 feb · 2026', items: 'Ramo "Te Amo" + Osito Mensajero', total: '5700 CUP', status: 'En camino', color: 'var(--va-mustard)' },
              { id: '#MC-2104', date: '04 feb · 2026', items: 'Tarjeta Pop-Up Mamá', total: '1200 CUP', status: 'Entregado', color: 'var(--va-sage)' },
              { id: '#MC-2089', date: '21 ene · 2026', items: 'Bouquet de Rosas Eternas', total: '5800 CUP', status: 'Entregado', color: 'var(--va-sage)' },
            ].map((o, i) => (
              <div key={o.id} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 120px 120px 80px', alignItems: 'center', gap: 16, padding: '16px 0', borderTop: i === 0 ? 'none' : '1px solid var(--va-line)' }}>
                <div>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: 15 }}>{o.id}</div>
                  <div style={{ fontSize: 12, color: 'rgba(42,31,24,.55)' }}>{o.date}</div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--va-coffee)' }}>{o.items}</div>
                <div style={{ fontFamily: 'Playfair Display', fontSize: 15 }}>{o.total}</div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: o.color }}>
                  <Icon.Dot size={6} color={o.color} /> {o.status}
                </span>
                <button style={{ ...vaBtn('ghost'), padding: '6px 12px', fontSize: 12 }}>Detalle</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <VAFooter />
    </div>
  );
}

// ───── FAVORITES ─────
function VAFavorites() {
  const favs = [PRODUCTS_A[0], PRODUCTS_A[3], PRODUCTS_A[6], PRODUCTS_A[1], PRODUCTS_A[2]];
  return (
    <div className="va screen scroll">
      <VAHeader />
      <section style={{ padding: '40px 60px 70px', background: 'var(--va-cream)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <div className="script" style={{ fontSize: 22, color: 'var(--va-terracotta)' }}>Cosas que te enamoran</div>
            <h1 style={{ fontSize: 48, margin: '4px 0 0' }}>Mis <i>favoritos</i></h1>
          </div>
          <div style={{ fontSize: 14, color: 'rgba(42,31,24,.55)' }}>{favs.length} piezas guardadas</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {favs.map(p => <VAProductCard key={p.id} p={p} liked />)}
        </div>
        <div style={{ marginTop: 50, padding: 32, background: 'var(--va-paper)', borderRadius: 14, textAlign: 'center' }}>
          <CraftGlyph.Heart size={42} color="var(--va-terracotta)" />
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: 24, margin: '14px 0 8px' }}>¿Quieres regalarlos?</h3>
          <p style={{ fontSize: 14, color: 'rgba(42,31,24,.65)', maxWidth: 480, margin: '0 auto 20px' }}>
            Comparte tu lista de favoritos con tu pareja, mamá o amiga.
            Ellos podrán ver lo que te gusta y elegir su regalo perfecto.
          </p>
          <button style={vaBtn('primary')}>Compartir mi lista <Icon.Arrow size={14} color="white" /></button>
        </div>
      </section>
      <VAFooter />
    </div>
  );
}

Object.assign(window, { VACatalog, VAProductDetail, VACart, VACheckout, VALogin, VAProfile, VAFavorites, FormField });
