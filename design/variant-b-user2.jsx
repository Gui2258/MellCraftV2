// Variant B — Catalog, Detail, Cart, Checkout, Login, Profile, Favorites (desktop)

function VBFormField({ label, value, textarea = false }) {
  return (
    <label style={{ display: 'block' }}>
      <span className="mono" style={{ display: 'block', fontSize: 11, letterSpacing: '0.14em', color: 'var(--vb-stone)', marginBottom: 8, textTransform: 'uppercase' }}>{label}</span>
      {textarea ? (
        <textarea defaultValue={value} rows={2} style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--vb-line-strong)', background: 'white', fontFamily: 'Inter', fontSize: 14, resize: 'none' }} />
      ) : (
        <input defaultValue={value} style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--vb-line-strong)', background: 'white', fontFamily: 'Inter', fontSize: 14 }} />
      )}
    </label>
  );
}

// ───── CATALOG ─────
function VBCatalog() {
  return (
    <div className="vb screen scroll">
      <VBHeader />

      <section style={{ padding: '50px 60px 30px', background: 'var(--vb-paper)' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--vb-stone)', marginBottom: 14 }}>
          INICIO / TIENDA / <span style={{ color: 'var(--vb-clay)' }}>SAN VALENTÍN</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <h1 style={{ fontFamily: 'DM Serif Display', fontSize: 96, margin: 0, lineHeight: 0.95, letterSpacing: '-0.025em' }}>
            San <i>Valentín</i>.
          </h1>
          <div style={{ textAlign: 'right', maxWidth: 360 }}>
            <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.75, margin: 0 }}>
              Una colección de regalos pensados para decir "te amo" sin palabras — ramos de chuches, peluches tejidos y bouquets eternos.
            </p>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--vb-stone)', marginTop: 14 }}>32 PIEZAS</div>
          </div>
        </div>
      </section>

      <section style={{ padding: '30px 60px 80px', background: 'var(--vb-paper)', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40 }}>
        <aside style={{ borderRight: '1px solid var(--vb-line)', paddingRight: 28 }}>
          {[
            { title: 'TIPO', items: ['Ramo de chuches', 'Peluches tejidos', 'Tarjetas pop-up', 'Bouquets eternos', 'Cajas sorpresa'] },
            { title: 'COLOR', items: ['Terracotta', 'Rosa antiguo', 'Crema', 'Salvia', 'Mostaza', 'Café'] },
            { title: 'PRECIO', items: ['Menos de 1000 CUP', '1000 – 3000 CUP', '3000 – 6000 CUP', 'Más de 6000 CUP'] },
          ].map(g => (
            <div key={g.title} style={{ marginBottom: 32 }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--vb-espresso)', marginBottom: 14 }}>{g.title}</div>
              {g.items.map((label, i) => (
                <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', cursor: 'pointer', fontSize: 13 }}>
                  <span style={{
                    width: 14, height: 14, border: '1.5px solid var(--vb-line-strong)',
                    background: i === 0 ? 'var(--vb-espresso)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {i === 0 && <Icon.Check size={9} color="white" stroke={3} />}
                  </span>
                  <span style={{ color: i === 0 ? 'var(--vb-espresso)' : 'var(--vb-ink)', fontWeight: i === 0 ? 500 : 400 }}>{label}</span>
                </label>
              ))}
            </div>
          ))}
          <button style={{ ...vbBtn('ghost'), padding: '8px 14px', fontSize: 12 }}>Limpiar filtros</button>
        </aside>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid var(--vb-line)' }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--vb-stone)' }}>MOSTRANDO 1–8 / 32</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--vb-stone)' }}>ORDENAR</span>
              <select style={{ border: '1px solid var(--vb-line-strong)', padding: '8px 14px', fontSize: 13, background: 'white', fontFamily: 'Inter' }}>
                <option>Más queridas</option>
                <option>Novedades</option>
                <option>Precio bajo–alto</option>
                <option>Precio alto–bajo</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 }}>
            {PRODUCTS_B.map(p => <VBProductCard key={p.id} p={p} />)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, marginTop: 60 }}>
            {[1,2,3,4].map(n => (
              <button key={n} className="mono" style={{
                border: 'none', background: 'transparent', cursor: 'pointer',
                color: n === 1 ? 'var(--vb-clay)' : 'var(--vb-stone)',
                fontSize: 14, letterSpacing: '0.14em',
                borderBottom: n === 1 ? '2px solid var(--vb-clay)' : 'none', paddingBottom: 3,
              }}>0{n}</button>
            ))}
            <span style={{ color: 'var(--vb-stone)' }}>—</span>
            <button className="mono" style={{ border: 'none', background: 'transparent', color: 'var(--vb-espresso)', fontSize: 13, letterSpacing: '0.14em', cursor: 'pointer' }}>SIGUIENTE →</button>
          </div>
        </div>
      </section>

      <VBFooter />
    </div>
  );
}

// ───── PRODUCT DETAIL ─────
function VBProductDetail() {
  const p = PRODUCTS_B[0];
  return (
    <div className="vb screen scroll">
      <VBHeader />
      <section style={{ padding: '36px 60px 24px', background: 'var(--vb-paper)' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--vb-stone)' }}>
          INICIO / TIENDA / SAN VALENTÍN / <span style={{ color: 'var(--vb-clay)' }}>{p.name.toUpperCase()}</span>
        </div>
      </section>

      <section style={{ padding: '0 60px 70px', background: 'var(--vb-paper)', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60 }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
              <ProductImage tone="clay" src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80" />
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                <ProductImage tone="rose" />
              </div>
              <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                <ProductImage tone="mustard" />
              </div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 20 }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--vb-clay)', marginBottom: 14 }}>
            SAN VALENTÍN · № P-001
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display', fontSize: 56, margin: 0, lineHeight: 1, letterSpacing: '-0.025em' }}>
            <i>"Te Amo"</i><br/>Ramo de Chuches.
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 18, fontSize: 13 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[1,2,3,4,5].map(i => <Icon.Star key={i} size={13} color="var(--vb-amber)" />)}
              <span style={{ marginLeft: 6 }}>{p.rating}</span>
            </span>
            <span style={{ color: 'var(--vb-stone)' }}>·</span>
            <span style={{ color: 'var(--vb-stone)' }}>{p.reviews} reseñas</span>
            <span style={{ color: 'var(--vb-stone)' }}>·</span>
            <span style={{ color: 'var(--vb-clay)' }}>● {p.stock} disponibles</span>
          </div>

          <div style={{ borderTop: '1px solid var(--vb-line)', borderBottom: '1px solid var(--vb-line)', padding: '22px 0', margin: '28px 0', display: 'flex', alignItems: 'baseline', gap: 18 }}>
            <span style={{ fontFamily: 'DM Serif Display', fontSize: 44, lineHeight: 1, color: 'var(--vb-clay)' }}>{p.price.toLocaleString('es-CU')}</span>
            <span className="mono" style={{ fontSize: 13, color: 'var(--vb-stone)', letterSpacing: '0.14em' }}>CUP · ${p.usd} USD</span>
          </div>

          <p style={{ fontSize: 15, color: 'var(--vb-ink)', opacity: 0.8, lineHeight: 1.75, margin: 0 }}>
            Ramo artesanal con 12 chuches surtidas envueltas en papel kraft, decorado con tul, rosa de fieltro hecha a mano y tarjeta personalizada. Tamaño aproximado 28×18 cm. Cada ramo es preparado el mismo día de su entrega.
          </p>

          {/* Options */}
          <div style={{ marginTop: 28 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--vb-stone)', marginBottom: 10 }}>COLOR DEL ENVOLTORIO</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                ['Terracotta', '#B7472A', true],
                ['Rosa Antiguo', '#D88A7A', false],
                ['Crema', '#E5DACB', false],
                ['Salvia', '#8FA67B', false],
                ['Café', '#3D2C1F', false],
              ].map(([n, c, on]) => (
                <div key={n} style={{ width: 36, height: 36, background: c, border: on ? '2px solid var(--vb-espresso)' : '1px solid var(--vb-line)', boxShadow: on ? '0 0 0 2px white inset' : 'none', cursor: 'pointer' }} />
              ))}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--vb-stone)', marginBottom: 10 }}>MENSAJE PARA LA TARJETA (OPCIONAL)</div>
            <textarea placeholder="Para ti, mi amor…" rows={2} style={{ width: '100%', padding: 14, border: '1px solid var(--vb-line-strong)', background: 'white', resize: 'none', fontFamily: 'Inter', fontSize: 14 }} />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--vb-line-strong)' }}>
              <button style={{ width: 44, height: 50, border: 'none', background: 'transparent', cursor: 'pointer' }}><Icon.Minus size={14} /></button>
              <div style={{ width: 40, textAlign: 'center', fontSize: 16, fontFamily: 'DM Serif Display' }}>1</div>
              <button style={{ width: 44, height: 50, border: 'none', background: 'transparent', cursor: 'pointer' }}><Icon.Plus size={14} /></button>
            </div>
            <button style={{ ...vbBtn('dark'), flex: 1, padding: '15px 22px' }}>
              <Icon.Bag size={16} color="white" /> Añadir al carrito · 2 500 CUP
            </button>
            <button style={{ width: 50, height: 50, border: '1px solid var(--vb-line-strong)', background: 'transparent', cursor: 'pointer' }}>
              <Icon.Heart size={17} />
            </button>
          </div>

          <div style={{ marginTop: 28, padding: 20, background: 'var(--vb-bone)', border: '1px solid var(--vb-line)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Icon.Truck size={16} /> Entrega 48h · La Habana</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Icon.Box size={16} /> Empaque incluido</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Icon.Heart size={16} /> Hecho a mano</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Icon.Check size={16} /> Garantía de cariño</div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ padding: '50px 60px', background: 'var(--vb-bone)' }}>
        <div style={{ display: 'flex', gap: 40, borderBottom: '1px solid var(--vb-line-strong)', marginBottom: 28 }}>
          {['Descripción', 'Materiales y cuidados', `Reseñas (${p.reviews})`, 'Envío'].map((t, i) => (
            <div key={t} style={{
              padding: '14px 0', fontSize: 13, letterSpacing: '0.06em',
              color: i === 0 ? 'var(--vb-espresso)' : 'var(--vb-stone)',
              fontWeight: i === 0 ? 600 : 400,
              borderBottom: i === 0 ? '2px solid var(--vb-clay)' : '2px solid transparent',
              cursor: 'pointer', textTransform: 'uppercase',
            }} className="mono">{t}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 60 }}>
          <div style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--vb-ink)', opacity: 0.8 }}>
            <p>Un ramo pensado para decir "te amo" sin palabras. Lleva un surtido de las chuches favoritas de tu pareja (Trululú, Bon Bon Bum, gomitas de fresa, chocolatinas), envueltas en papel kraft natural y tul color crema. Incluye una rosa de fieltro hecha a mano y una etiqueta de cartulina donde escribimos tu mensaje a tinta.</p>
            <p>Si necesitas chuches específicas o quieres añadir algo (peluche, perfume, etc.), escríbenos por WhatsApp y armamos el ramo a tu medida.</p>
          </div>
          <div style={{ background: 'white', padding: 28, border: '1px solid var(--vb-line)' }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--vb-clay)', marginBottom: 14 }}>INCLUYE</div>
            {['12 chuches surtidas', 'Rosa de fieltro hecha a mano', 'Tarjeta con tu mensaje', 'Envoltorio kraft + tul', 'Listón a juego'].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', fontSize: 13 }}>
                <Icon.Check size={14} color="var(--vb-clay)" /> {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '70px 60px', background: 'var(--vb-paper)' }}>
        <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 44, margin: '0 0 36px', letterSpacing: '-0.02em' }}>También te puede <i>gustar</i>.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {PRODUCTS_B.slice(1, 5).map(p => <VBProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <VBFooter />
    </div>
  );
}

// ───── CART ─────
function VBCart() {
  const items = PRODUCTS_B.slice(0, 3).map((p, i) => ({ ...p, qty: i === 1 ? 2 : 1 }));
  const subCup = items.reduce((a, b) => a + b.price * b.qty, 0);
  const subUsd = items.reduce((a, b) => a + b.usd * b.qty, 0);
  return (
    <div className="vb screen scroll">
      <VBHeader />
      <section style={{ padding: '50px 60px 70px', background: 'var(--vb-paper)' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--vb-clay)', marginBottom: 14 }}>№ 01 · CARRITO</div>
        <h1 style={{ fontFamily: 'DM Serif Display', fontSize: 88, margin: 0, lineHeight: 0.95, letterSpacing: '-0.025em' }}>Tu <i>selección</i>.</h1>
        <div style={{ fontSize: 14, color: 'var(--vb-stone)', marginTop: 14 }}>{items.length} piezas listas para envolverse</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 48, marginTop: 50, alignItems: 'flex-start' }}>
          <div>
            <div className="mono" style={{ display: 'grid', gridTemplateColumns: '100px 1fr 120px 100px 40px', gap: 24, fontSize: 11, letterSpacing: '0.14em', color: 'var(--vb-stone)', padding: '0 0 14px', borderBottom: '1px solid var(--vb-line-strong)' }}>
              <span></span><span>PRODUCTO</span><span>CANTIDAD</span><span style={{ textAlign: 'right' }}>TOTAL</span><span></span>
            </div>
            {items.map(it => (
              <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 120px 100px 40px', gap: 24, alignItems: 'center', padding: '22px 0', borderBottom: '1px solid var(--vb-line)' }}>
                <div style={{ width: 90, height: 110, overflow: 'hidden' }}>
                  <ProductImage tone={it.tone} />
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--vb-clay)', marginBottom: 4 }}>{it.cat.toUpperCase()}</div>
                  <div style={{ fontFamily: 'DM Serif Display', fontSize: 22, lineHeight: 1.15 }}>{it.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--vb-stone)', marginTop: 6 }}>Color: Terracotta · Mensaje: "Para ti"</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--vb-line-strong)', width: 'fit-content' }}>
                  <button style={{ width: 32, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}><Icon.Minus size={12} /></button>
                  <span style={{ width: 32, textAlign: 'center', fontFamily: 'DM Serif Display', fontSize: 16 }}>{it.qty}</span>
                  <button style={{ width: 32, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}><Icon.Plus size={12} /></button>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'DM Serif Display', fontSize: 22 }}>{(it.price * it.qty).toLocaleString('es-CU')}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--vb-stone)' }}>${(it.usd * it.qty).toFixed(2)} USD</div>
                </div>
                <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--vb-stone)' }}><Icon.Trash size={15} /></button>
              </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 30 }}>
              <input placeholder="Código promocional" style={{ flex: 1, padding: '12px 16px', border: '1px solid var(--vb-line-strong)', background: 'white', fontSize: 13 }} />
              <button style={vbBtn('ghost')}>Aplicar</button>
            </div>
          </div>

          <aside style={{ background: 'white', border: '1px solid var(--vb-line)', padding: 32 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--vb-clay)', marginBottom: 14 }}>№ 02 · RESUMEN</div>
            <h3 style={{ fontFamily: 'DM Serif Display', fontSize: 32, margin: '0 0 22px', lineHeight: 1 }}>Tu <i>pedido</i>.</h3>
            {[
              ['Subtotal', fmtCUP(subCup), fmtUSD(subUsd)],
              ['Envío La Habana', '500 CUP', '$1.50'],
              ['Empaque artesanal', 'Gratis', ''],
            ].map(([k, v, vu]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: 13, borderTop: '1px solid var(--vb-line)' }}>
                <span style={{ color: 'var(--vb-ink)' }}>{k}</span>
                <span style={{ textAlign: 'right' }}>{v}{vu && <span className="mono" style={{ fontSize: 10, color: 'var(--vb-stone)', display: 'block', letterSpacing: '0.08em' }}>{vu}</span>}</span>
              </div>
            ))}
            <div style={{ marginTop: 14, paddingTop: 18, borderTop: '2px solid var(--vb-espresso)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'DM Serif Display', fontSize: 22 }}>Total</span>
              <span style={{ fontFamily: 'DM Serif Display', fontSize: 38, color: 'var(--vb-clay)' }}>{fmtCUP(subCup + 500)}</span>
            </div>
            <button style={{ ...vbBtn('dark'), width: '100%', marginTop: 22, padding: '16px' }}>Continuar al pago <Icon.Arrow size={14} color="white" /></button>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--vb-stone)', textAlign: 'center', marginTop: 16 }}>
              APARTAMOS TU PEDIDO POR 24H
            </div>
          </aside>
        </div>
      </section>
      <VBFooter />
    </div>
  );
}

// ───── CHECKOUT ─────
function VBCheckout() {
  return (
    <div className="vb screen scroll">
      <VBHeader />
      <section style={{ padding: '50px 60px 70px', background: 'var(--vb-paper)' }}>
        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginBottom: 50 }}>
          {[['CARRITO', true], ['ENVÍO', true, true], ['PAGO', false], ['CONFIRMACIÓN', false]].map(([n, done, current], i) => (
            <div key={n} style={{ position: 'relative', paddingBottom: 18, borderBottom: done || current ? '2px solid var(--vb-clay)' : '2px solid var(--vb-line)' }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: done || current ? 'var(--vb-clay)' : 'var(--vb-stone)' }}>0{i + 1} · {n}</div>
            </div>
          ))}
        </div>

        <h1 style={{ fontFamily: 'DM Serif Display', fontSize: 64, margin: 0, lineHeight: 1, letterSpacing: '-0.025em' }}>Datos de <i>envío</i>.</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 48, marginTop: 40, alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <VBFormField label="Nombre" value="Lía Hernández" />
              <VBFormField label="Apellidos" value="González Ruiz" />
              <VBFormField label="Teléfono / WhatsApp" value="+53 5555 0182" />
              <VBFormField label="Correo electrónico" value="lia.gonzalez@gmail.com" />
            </div>

            <h3 style={{ fontFamily: 'DM Serif Display', fontSize: 28, margin: '40px 0 18px', borderTop: '1px solid var(--vb-line)', paddingTop: 30 }}>Dirección.</h3>
            <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
              {[['La Habana', true], ['Holguín', false], ['Otra (consultar)', false]].map(([c, on]) => (
                <button key={c} style={{
                  padding: '11px 20px',
                  border: on ? '1.5px solid var(--vb-clay)' : '1px solid var(--vb-line-strong)',
                  background: on ? 'var(--vb-bone)' : 'white',
                  color: on ? 'var(--vb-clay)' : 'var(--vb-ink)',
                  fontSize: 13, cursor: 'pointer',
                }}>{c}</button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18, marginBottom: 18 }}>
              <VBFormField label="Calle y número" value="Calle 23 No. 1106 e/ 10 y 12" />
              <VBFormField label="Municipio" value="Plaza de la Revolución" />
            </div>
            <VBFormField label="Referencias (opcional)" value="Entre la farmacia y el panadero. Tocar el portón verde." textarea />

            <h3 style={{ fontFamily: 'DM Serif Display', fontSize: 28, margin: '40px 0 18px', borderTop: '1px solid var(--vb-line)', paddingTop: 30 }}>¿Cuándo lo necesitas?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                ['En 48 horas', 'Costo estándar', false],
                ['Día específico', 'Sin recargo', true],
                ['Express (mismo día)', '+800 CUP', false],
              ].map(([title, sub, on]) => (
                <div key={title} style={{
                  border: on ? '1.5px solid var(--vb-clay)' : '1px solid var(--vb-line-strong)',
                  background: on ? 'var(--vb-bone)' : 'white',
                  padding: 20, cursor: 'pointer',
                }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--vb-stone)', marginBottom: 6 }}>{sub.toUpperCase()}</div>
                  <div style={{ fontFamily: 'DM Serif Display', fontSize: 19 }}>{title}</div>
                  {on && <div className="mono" style={{ fontSize: 11, color: 'var(--vb-clay)', marginTop: 14, letterSpacing: '0.12em' }}>14 FEB · DÍA COMPLETO</div>}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
              <button style={vbBtn('ghost')}><Icon.Arrow dir="left" size={14} /> Volver al carrito</button>
              <button style={vbBtn('dark')}>Continuar al pago <Icon.Arrow size={14} color="white" /></button>
            </div>
          </div>

          <aside style={{ background: 'white', border: '1px solid var(--vb-line)', padding: 28 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--vb-clay)', marginBottom: 14 }}>RESUMEN</div>
            <h3 style={{ fontFamily: 'DM Serif Display', fontSize: 24, margin: '0 0 18px' }}>Tu pedido <i>(4 piezas)</i></h3>
            {PRODUCTS_B.slice(0, 3).map(p => (
              <div key={p.id} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: '1px solid var(--vb-line)' }}>
                <div style={{ width: 50, height: 50, overflow: 'hidden', flexShrink: 0 }}>
                  <ProductImage tone={p.tone} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--vb-stone)', marginTop: 4 }}>×1 · {p.price.toLocaleString('es-CU')} CUP</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--vb-line)' }}>
              {[['Subtotal', '8 800'], ['Envío', '500'], ['Empaque', 'Gratis']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                  <span>{k}</span><span>{v} CUP</span>
                </div>
              ))}
              <div style={{ borderTop: '2px solid var(--vb-espresso)', marginTop: 10, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'DM Serif Display', fontSize: 18 }}>Total</span>
                <span style={{ fontFamily: 'DM Serif Display', fontSize: 26, color: 'var(--vb-clay)' }}>9 300 CUP</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <VBFooter />
    </div>
  );
}

// ───── LOGIN ─────
function VBLogin() {
  return (
    <div className="vb screen" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', height: '100%' }}>
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--vb-espresso)' }}>
        <ProductImage tone="clay" src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=900&q=80" />
        <div style={{ position: 'absolute', top: 50, left: 50 }}>
          <VBLogo dark />
        </div>
        <div style={{ position: 'absolute', bottom: 60, left: 50, right: 50, color: 'white' }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--vb-bone)', opacity: 0.8, marginBottom: 14 }}>№ 01 · BIENVENIDA</div>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 64, lineHeight: 0.95, margin: 0, color: 'white', letterSpacing: '-0.025em' }}>
            <i>Buen día,</i><br/>persona<br/>especial.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, marginTop: 22, opacity: 0.8, maxWidth: 380 }}>
            Inicia sesión para guardar tus favoritos, ver tus pedidos y encargar regalos hechos a mano.
          </p>
        </div>
      </div>
      <div style={{ background: 'var(--vb-paper)', padding: '100px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 400 }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--vb-clay)', marginBottom: 14 }}>№ 02 · INGRESAR</div>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 44, margin: 0, lineHeight: 1, letterSpacing: '-0.025em' }}>Iniciar <i>sesión</i>.</h2>
          <p style={{ fontSize: 14, color: 'var(--vb-stone)', margin: '14px 0 32px' }}>
            ¿Nueva por aquí? <a style={{ color: 'var(--vb-clay)', textDecoration: 'underline' }}>Crea tu cuenta</a>
          </p>

          <div style={{ display: 'grid', gap: 18 }}>
            <VBFormField label="Correo o teléfono" value="" />
            <VBFormField label="Contraseña" value="" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 14, height: 14, border: '1.5px solid var(--vb-line-strong)' }} />
                Recordarme
              </label>
              <a style={{ color: 'var(--vb-clay)' }}>¿Olvidaste tu contraseña?</a>
            </div>
            <button style={{ ...vbBtn('dark'), width: '100%', padding: '15px' }}>Entrar a mi cuenta</button>
          </div>

          <div style={{ position: 'relative', textAlign: 'center', margin: '30px 0' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--vb-line)' }} />
            <span className="mono" style={{ position: 'relative', background: 'var(--vb-paper)', padding: '0 14px', fontSize: 11, color: 'var(--vb-stone)', letterSpacing: '0.16em' }}>O CONTINÚA CON</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['Google', 'Facebook'].map(p => <button key={p} style={vbBtn('ghost')}>{p}</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ───── PROFILE ─────
function VBProfile() {
  return (
    <div className="vb screen scroll">
      <VBHeader />
      <section style={{ padding: '50px 60px 70px', background: 'var(--vb-paper)', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40 }}>
        <aside style={{ borderRight: '1px solid var(--vb-line)', paddingRight: 28, height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 24, borderBottom: '1px solid var(--vb-line)' }}>
            <div style={{ width: 64, height: 64, background: 'var(--vb-clay)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Serif Display', fontSize: 30, fontStyle: 'italic' }}>L</div>
            <div>
              <div style={{ fontFamily: 'DM Serif Display', fontSize: 18 }}>Lía Hernández</div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--vb-stone)', marginTop: 4 }}>MIEMBRO DESDE 2024</div>
            </div>
          </div>
          {[
            ['Mi perfil', true, <Icon.User size={15} />],
            ['Mis pedidos', false, <Icon.Box size={15} />],
            ['Favoritos', false, <Icon.Heart size={15} />],
            ['Direcciones', false, <Icon.Home size={15} />],
            ['Cerrar sesión', false, null],
          ].map(([n, on, ic]) => (
            <div key={n} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 0', cursor: 'pointer',
              color: on ? 'var(--vb-clay)' : 'var(--vb-ink)',
              fontWeight: on ? 600 : 400, fontSize: 14,
              borderBottom: '1px solid var(--vb-line)',
            }}>
              {ic && <span style={{ color: on ? 'var(--vb-clay)' : 'var(--vb-stone)' }}>{ic}</span>}
              <span style={{ flex: 1 }}>{n}</span>
              {on && <Icon.Arrow size={12} color="var(--vb-clay)" />}
            </div>
          ))}
        </aside>

        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--vb-clay)', marginBottom: 12 }}>№ 01</div>
          <h1 style={{ fontFamily: 'DM Serif Display', fontSize: 64, margin: 0, lineHeight: 0.95, letterSpacing: '-0.025em' }}>Hola, <i>Lía</i>.</h1>
          <p style={{ fontSize: 14, color: 'var(--vb-stone)', marginTop: 14 }}>Tu última visita fue el 09 de febrero. Tienes 1 pedido en preparación.</p>

          {/* Info */}
          <div style={{ background: 'white', border: '1px solid var(--vb-line)', padding: 32, marginTop: 32 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'DM Serif Display', fontSize: 26, margin: 0 }}>Información personal</h3>
              <button style={{ ...vbBtn('ghost'), padding: '7px 14px', fontSize: 12 }}><Icon.Pencil size={13} /> Editar</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {[
                ['NOMBRE COMPLETO', 'Lía Hernández González'],
                ['CORREO', 'lia.gonzalez@gmail.com'],
                ['TELÉFONO', '+53 5555 0182'],
                ['CUMPLEAÑOS', '23 de marzo'],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--vb-stone)', marginBottom: 6 }}>{k}</div>
                  <div style={{ fontFamily: 'DM Serif Display', fontSize: 17 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Orders */}
          <div style={{ background: 'white', border: '1px solid var(--vb-line)', padding: 32, marginTop: 24 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'DM Serif Display', fontSize: 26, margin: 0 }}>Pedidos recientes</h3>
              <a className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--vb-clay)' }}>VER TODOS →</a>
            </div>
            {[
              { id: 'MC-2126', date: '12 FEB 2026', items: 'Ramo "Te Amo" · Osito Mensajero', total: '5 700', status: 'EN CAMINO', dot: 'var(--vb-amber)' },
              { id: 'MC-2104', date: '04 FEB 2026', items: 'Tarjeta Pop-Up Mamá', total: '1 200', status: 'ENTREGADO', dot: 'var(--vb-stone)' },
              { id: 'MC-2089', date: '21 ENE 2026', items: 'Bouquet de Rosas Eternas', total: '5 800', status: 'ENTREGADO', dot: 'var(--vb-stone)' },
            ].map((o, i) => (
              <div key={o.id} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 120px 130px 80px', gap: 16, alignItems: 'center', padding: '18px 0', borderTop: i === 0 ? '1px solid var(--vb-line)' : '1px solid var(--vb-line)' }}>
                <div>
                  <div style={{ fontFamily: 'DM Serif Display', fontSize: 18 }}>{o.id}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--vb-stone)', letterSpacing: '0.14em', marginTop: 2 }}>{o.date}</div>
                </div>
                <div style={{ fontSize: 13 }}>{o.items}</div>
                <div style={{ fontFamily: 'DM Serif Display', fontSize: 18 }}>{o.total} <span className="mono" style={{ fontSize: 10, color: 'var(--vb-stone)' }}>CUP</span></div>
                <div className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, letterSpacing: '0.14em' }}>
                  <Icon.Dot size={6} color={o.dot} /> {o.status}
                </div>
                <button style={{ ...vbBtn('ghost'), padding: '6px 12px', fontSize: 11 }}>Detalle</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <VBFooter />
    </div>
  );
}

// ───── FAVORITES ─────
function VBFavorites() {
  const favs = [PRODUCTS_B[0], PRODUCTS_B[3], PRODUCTS_B[6], PRODUCTS_B[1], PRODUCTS_B[2]];
  return (
    <div className="vb screen scroll">
      <VBHeader />
      <section style={{ padding: '50px 60px 70px', background: 'var(--vb-paper)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 50 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--vb-clay)', marginBottom: 14 }}>№ 03 · FAVORITOS</div>
            <h1 style={{ fontFamily: 'DM Serif Display', fontSize: 88, margin: 0, lineHeight: 0.95, letterSpacing: '-0.025em' }}>Lo que te <i>enamora</i>.</h1>
          </div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--vb-stone)' }}>{favs.length} PIEZAS · GUARDADAS</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {favs.map(p => <VBProductCard key={p.id} p={p} liked />)}
        </div>

        <div style={{ marginTop: 60, padding: '48px', background: 'var(--vb-espresso)', color: 'white', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--vb-amber)', marginBottom: 14 }}>COMPARTIR</div>
            <h3 style={{ fontFamily: 'DM Serif Display', fontSize: 42, margin: 0, lineHeight: 1, color: 'white', letterSpacing: '-0.02em' }}>¿Quieres <i>regalarlos</i>?</h3>
            <p style={{ fontSize: 14, opacity: 0.75, marginTop: 16, maxWidth: 480 }}>
              Comparte tu lista de favoritos con tu pareja, mamá o amiga. Ellos podrán ver lo que te gusta y elegir su regalo perfecto.
            </p>
          </div>
          <button style={{ ...vbBtn('bone'), padding: '15px 26px' }}>Compartir mi lista <Icon.Arrow size={14} /></button>
        </div>
      </section>
      <VBFooter />
    </div>
  );
}

Object.assign(window, { VBCatalog, VBProductDetail, VBCart, VBCheckout, VBLogin, VBProfile, VBFavorites, VBFormField });
