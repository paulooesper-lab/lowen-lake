/* Página principal: painéis que passam para o lado. Monta tudo a partir de js/conteudo.js. */
(function () {
  const { S, T, U, esc, $, img, acharLocal, locaisVisiveis, nomeOnde, urlLocal, cabecalho, abrirCaixa, fecharCaixa,
    abrirPersonagem, abrirLocal, abrirCriatura, rodape, ligarCopiar, idadeTexto, SECOES } = window.LL;

  const topo = cabecalho(true);
  const trilho = $("#trilho");

  /* ---------- molde de cada painel ---------- */
  function painel(id, corpo, { titulo, etiqueta, intro, acao } = {}) {
    const sec = $("#" + id);
    const fundo = S.banners[id];
    sec.innerHTML = `
      ${fundo ? `<div class="painel-fundo"><img src="${esc(fundo)}" alt="" onerror="this.remove()"></div>` : ""}
      <div class="painel-conteudo">
        <div class="painel-miolo">
          ${titulo ? `<div class="painel-cabeca">
            <div>${etiqueta ? `<span class="etiqueta">${esc(etiqueta)}</span>` : ""}<h2 class="titulo">${esc(titulo)}</h2>
            ${intro ? `<p class="intro">${esc(intro)}</p>` : ""}</div>${acao || ""}</div>` : ""}
          ${corpo}
        </div>
      </div>`;
    return sec;
  }

  // fileira horizontal com setas
  function carrossel(id, itens, classe = "") {
    return `<div class="carrossel-caixa">
      <button type="button" class="carrossel-seta esq" data-alvo="${id}" aria-label="${esc(U("anterior"))}">‹</button>
      <div class="carrossel ${classe}" id="${id}">${itens}</div>
      <button type="button" class="carrossel-seta dir" data-alvo="${id}" aria-label="${esc(U("proximo"))}">›</button>
    </div>`;
  }

  function filtros(categorias) {
    return `<div class="filtros" role="tablist">${[U("todos"), ...categorias].map((c, i) =>
      `<button type="button" role="tab" aria-selected="${i === 0}" data-cat="${i === 0 ? "*" : esc(c)}">${esc(c)}</button>`).join("")}</div>`;
  }
  function ligarFiltros(sec, aoMudar) {
    const caixa = sec.querySelector(".filtros");
    caixa.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      caixa.querySelectorAll("button").forEach((x) => x.setAttribute("aria-selected", x === b));
      aoMudar(b.dataset.cat);
    });
  }

  /* ---------- 1. início ---------- */
  const cur = S.cidade.curiosidade;
  painel("inicio", `
    <div class="hero-grade">
      <div class="placa" role="img" aria-label="Welcome to Lowen Lake">
        <span class="placa-topo">Welcome to</span>
        <span class="placa-nome">${esc(S.cidade.nome)}</span>
        <span class="placa-linha">${esc(S.cidade.condado)}</span>
        <span class="placa-rodape">Home of the Fighting Gators</span>
      </div>
      <div class="hero-texto">
        <p class="lema">${esc(T(S.cidade.lema))}</p>
        <p class="resumo">${esc(T(S.cidade.resumo))}</p>
        <div class="hero-acoes">
          <a class="botao" href="#personagens">${esc(U("conhecer"))}</a>
          <a class="botao botao-linha" href="#encomendas">${esc(U("encomendar"))}</a>
        </div>
        ${cur ? `<p class="relogio">${esc(T(cur.rotulo))} <b>${esc(cur.valor)}</b> ${esc(T(cur.nota))}</p>` : ""}
      </div>
    </div>`);

  /* ---------- 2. a cidade ---------- */
  painel("cidade", `
    <div class="cidade-grade">
      <div class="historia">${S.historia.map((h) => `<article><h3>${esc(T(h.titulo))}</h3><p>${esc(T(h.texto))}</p></article>`).join("")}</div>
      <aside class="cronologia"><h3>${esc(U("cronologia"))} <small>${S.cronologia.length}</small></h3>
        <ol class="rola-y" tabindex="0" aria-label="${esc(U("cronologia"))}">${S.cronologia.map((c) => `<li><span>${esc(T(c.data))}</span>${esc(T(c.fato))}</li>`).join("")}</ol>
        <p class="cronologia-dica" aria-hidden="true">↓ ${esc(U("rolarLinha"))}</p></aside>
    </div>`, { titulo: U("menu.cidade"), etiqueta: U("etiquetas.cidade"), intro: T(S.cidade.tom) });

  /* ---------- 3. personagens ---------- */
  const gruposUsados = [...new Set(S.personagens.map((p) => p.grupo))];
  const secP = painel("personagens", filtros(gruposUsados.map((g) => T(S.grupos[g]))) + carrossel("lista-personagens", "", "carrossel-retratos"),
    { titulo: U("menu.personagens"), etiqueta: U("etiquetas.personagens"),
      acao: `<a class="botao" href="relacoes.html">${esc(U("verRelacoes"))} →</a>` });
  function desenharPersonagens(cat) {
    $("#lista-personagens").innerHTML = S.personagens.filter((p) => cat === "*" || T(S.grupos[p.grupo]) === cat).map((p) => `
      <button type="button" class="cartao-p" data-id="${esc(p.id)}">
        ${img(p.imagem, p.nome, p.cor)}
        <span class="cartao-p-txt"><span class="cartao-p-grupo">${esc(T(S.grupos[p.grupo]))}</span>
          <strong>${esc(T(p.nome))}</strong><span>${esc(T(p.papel))}${idadeTexto(p)}</span></span>
      </button>`).join("");
    $("#lista-personagens").scrollLeft = 0;
  }
  ligarFiltros(secP, desenharPersonagens);
  desenharPersonagens("*");
  $("#lista-personagens").addEventListener("click", (e) => { const b = e.target.closest(".cartao-p"); if (b) abrirPersonagem(b.dataset.id); });

  /* ---------- 4. locais ---------- */
  const extrasLocal = (id) => `<button type="button" class="botao botao-linha" data-ver-mapa="${esc(id)}">${esc(U("verNoMapa"))}</button>`;
  painel("locais", carrossel("lista-locais", locaisVisiveis().map((l) => `
    <button type="button" class="cartao-local" data-local="${esc(l.id)}">
      ${img(l.imagem, l.nome, ["#22302a", "#2f7fb5"])}
      <span class="cartao-local-txt"><span class="local-tipo">${esc(T(l.tipo))} · ${esc(nomeOnde(l.regiao))}</span>
        <strong>${esc(T(l.nome))}</strong><span>${esc(T(l.resumo))}</span></span>
    </button>`).join(""), "carrossel-locais"), { titulo: U("menu.locais"), etiqueta: U("etiquetas.locais") });
  $("#lista-locais").addEventListener("click", (e) => { const b = e.target.closest("[data-local]"); if (b) abrirLocal(b.dataset.local, extrasLocal(b.dataset.local)); });

  /* ---------- 5. mapa ---------- */
  const R = S.mapa.regioes;
  function mapaHTML() {
    const pos = (o) => `left:${o.x}%;top:${o.y}%`;
    return `<div class="mapa-ilustrado">
      <img class="mapa-base" src="${esc(S.mapa.imagem)}" alt="Lowen Lake">
      ${S.mapa.rotulos.map((r) => r.regiao
        ? `<button type="button" class="mapa-rotulo ${esc(r.estilo || "")}" style="${pos(r)}" data-reg="${esc(r.regiao)}">${esc(T(r.texto))}</button>`
        : `<span class="mapa-rotulo ${esc(r.estilo || "")}" style="${pos(r)}">${esc(T(r.texto))}</span>`).join("")}
      ${S.mapa.marcadores.map((m, i) => `<button type="button" class="mapa-pin" style="${pos(m)}" data-i="${i}"
          aria-label="${esc(m.local ? T(acharLocal(m.local)?.nome) : m.criatura || T(R[m.regiao]?.nome))}">
          <img src="${esc(m.icone)}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'mapa-pin-ponto'}))"></button>`).join("")}
    </div>`;
  }
  painel("mapa", `
    <div class="mapa-grade">
      <div class="mapa-quadro" id="mapa-quadro">${mapaHTML()}</div>
      <aside class="mapa-info" id="mapa-info" aria-live="polite">
        <h3>Lowen Lake County</h3><p>${esc(U("dicaMapa"))}</p>
      </aside>
    </div>`, { titulo: U("menu.mapa"), etiqueta: U("etiquetas.mapa"),
    acao: `<button type="button" class="botao" id="ampliar-mapa">⤢ ${esc(U("ampliarMapa"))}</button>` });

  function infoRegiao(regId) {
    const r = R[regId]; if (!r) return;
    const aqui = locaisVisiveis().filter((l) => l.regiao === regId && l.id !== r.pagina);
    $("#mapa-info").innerHTML = `<span class="etiqueta">${esc(U("regiao"))}</span><h3>${esc(T(r.nome))}</h3><p>${esc(T(r.texto))}</p>
      ${r.pagina ? `<p><a class="botao" href="${urlLocal(r.pagina)}">${esc(U("saibaMais"))} →</a></p>` : ""}
      ${aqui.length ? `<p class="miudo">${esc(U("aqui"))}:</p><div class="mapa-info-links">${aqui.map((l) =>
        `<button type="button" class="link" data-local="${esc(l.id)}">${esc(T(l.nome))}</button>`).join("")}</div>` : ""}`;
  }
  function clicarMapa(raiz, dentroDoGrande) {
    raiz.addEventListener("click", (e) => {
      const rot = e.target.closest("button.mapa-rotulo");
      const pin = e.target.closest(".mapa-pin");
      if (rot && dentroDoGrande && R[rot.dataset.reg].pagina) { abrirLocal(R[rot.dataset.reg].pagina); return; }
      if (rot) { if (dentroDoGrande) abrirCaixa(`<span class="etiqueta">${esc(U("regiao"))}</span><h3>${esc(T(R[rot.dataset.reg].nome))}</h3><p>${esc(T(R[rot.dataset.reg].texto))}</p>`, "caixa-texto"); else infoRegiao(rot.dataset.reg); return; }
      if (!pin) return;
      raiz.querySelectorAll(".mapa-pin").forEach((x) => x.classList.toggle("ativa", x === pin));
      const m = S.mapa.marcadores[pin.dataset.i];
      if (m.local) abrirLocal(m.local);
      else if (m.criatura) abrirCriatura(m.criatura);
      else if (dentroDoGrande) abrirCaixa(`<h3>${esc(T(R[m.regiao].nome))}</h3><p>${esc(T(R[m.regiao].texto))}</p>`, "caixa-texto");
      else infoRegiao(m.regiao);
    });
  }
  clicarMapa($("#mapa-quadro"), false);
  $("#mapa-info").addEventListener("click", (e) => { const b = e.target.closest("[data-local]"); if (b) abrirLocal(b.dataset.local); });

  // mapa ampliado com zoom e arrastar
  const grande = $("#mapa-grande"), area = $("#mapa-grande-area");
  let zoom = 1;
  area.innerHTML = mapaHTML();
  clicarMapa(area, true);
  const aplicarZoom = () => { area.firstElementChild.style.width = `${zoom * 100}%`; };
  $("#ampliar-mapa").addEventListener("click", () => {
    zoom = 1;
    grande.showModal(); aplicarZoom();
    area.scrollLeft = (area.scrollWidth - area.clientWidth) / 2; area.scrollTop = (area.scrollHeight - area.clientHeight) / 2;
  });
  $("#zoom-mais").addEventListener("click", () => { zoom = Math.min(4, zoom * 1.3); aplicarZoom(); });
  $("#zoom-menos").addEventListener("click", () => { zoom = Math.max(1, zoom / 1.3); aplicarZoom(); });
  $("#mapa-fechar").addEventListener("click", () => grande.close());
  let arrasto = null;
  area.addEventListener("pointerdown", (e) => { if (e.target.closest("button")) return; arrasto = { x: e.clientX, y: e.clientY, l: area.scrollLeft, t: area.scrollTop }; area.classList.add("arrastando"); });
  addEventListener("pointermove", (e) => { if (!arrasto) return; area.scrollLeft = arrasto.l - (e.clientX - arrasto.x); area.scrollTop = arrasto.t - (e.clientY - arrasto.y); });
  addEventListener("pointerup", () => { arrasto = null; area.classList.remove("arrastando"); });

  /* ---------- 6. lendas ---------- */
  painel("lendas", carrossel("lista-criaturas", S.criaturas.map((c) => `
      <button type="button" class="cartao-p cartao-criatura" data-nome="${esc(T(c.nome))}">
        ${img(c.imagem, c.nome, ["#1b2420", "#5c7a3e"])}
        <span class="cartao-p-txt"><span class="cartao-p-grupo">${esc(T(c.onde))} · ${esc(T(c.escala))}</span><strong>${esc(T(c.nome))}</strong></span>
      </button>`).join(""), "carrossel-retratos") + `
    <div class="fosseis-faixa">
      <p class="miudo">${esc(U("fosseisMuseu"))}</p>
      <div class="fosseis-mini">${S.fosseis.map((f) => `<a href="${urlLocal("museu")}#fosseis" class="fossil-mini">${img(f.imagem, f.nome, ["#2a2418", "#c9a227"])}<i>${esc(f.nome)}</i></a>`).join("")}</div>
      <a class="botao botao-linha" href="${urlLocal("museu")}">${esc(U("verMuseu"))} →</a>
    </div>`, { titulo: U("tituloLendas"), etiqueta: U("etiquetas.lendas"),
    acao: `<a class="botao" href="criatura.html">${esc(U("verBestiario"))} →</a>` });
  $("#lista-criaturas").addEventListener("click", (e) => { const b = e.target.closest("[data-nome]"); if (b) abrirCriatura(b.dataset.nome); });

  /* ---------- 7. eventos ---------- */
  painel("eventos", carrossel("lista-eventos", S.eventos.map((ev) => `
      <a class="cartao-local" href="eventos.html#${esc(ev.id)}">
        ${img(ev.imagem, ev.nome, ["#2a1a2e", "#ff4f93"])}
        <span class="cartao-local-txt"><span class="local-tipo">${esc(T(ev.quando))} · ${esc(nomeOnde(ev.local))}</span>
          <strong>${esc(T(ev.nome))}</strong></span>
      </a>`).join(""), "carrossel-locais"), { titulo: U("menu.eventos"), etiqueta: U("etiquetas.eventos"),
    acao: `<a class="botao" href="eventos.html">${esc(U("todosEventos"))} →</a>` });

  /* ---------- 8. portfólio ---------- */
  const cats = [...new Set(S.portfolio.map((p) => T(p.categoria)))];
  const secPort = painel("portfolio", filtros(cats) + carrossel("lista-portfolio", "", "carrossel-obras"),
    { titulo: U("menu.portfolio"), etiqueta: U("etiquetas.portfolio"),
      acao: `<a class="botao" href="sobre.html">${esc(U("sobreArtista"))} →</a>` });
  function desenharPortfolio(cat) {
    $("#lista-portfolio").innerHTML = S.portfolio.map((p, i) => ({ p, i })).filter(({ p }) => cat === "*" || T(p.categoria) === cat).map(({ p, i }) => `
      <button type="button" class="obra" data-i="${i}">${img(p.imagem, p.titulo, ["#1b1b1b", i % 2 ? "#ff3d8b" : "#e8b623"])}
        <span class="obra-legenda"><b>${esc(T(p.titulo))}</b> ${esc(T(p.categoria))} · ${esc(p.ano)}</span></button>`).join("");
  }
  ligarFiltros(secPort, desenharPortfolio);
  desenharPortfolio("*");
  $("#lista-portfolio").addEventListener("click", (e) => {
    const b = e.target.closest(".obra"); if (!b) return;
    const p = S.portfolio[b.dataset.i];
    abrirCaixa(`<figure class="obra-grande">${img(p.imagem, p.titulo)}<figcaption><b>${esc(T(p.titulo))}</b> · ${esc(T(p.categoria))} · ${esc(p.ano)}</figcaption></figure>`, "caixa-larga");
  });

  /* ---------- 9. encomendas ---------- */
  const E = S.encomendas;
  painel("encomendas", `
    <div class="enc-grade">
      <div class="precos">${E.tipos.map((t) => `<div class="preco"><div><h3>${esc(T(t.nome))}</h3><p>${esc(T(t.detalhe))}</p></div>
        <span class="preco-valor"><small>${esc(U("aPartirDe"))}</small>${esc(E.moeda)} ${esc(t.preco)}</span></div>`).join("")}
        <ul class="extras">${T(E.extras).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="enc-meio">
        <h3>${esc(U("comoFunciona"))}</h3>
        <ol class="passos">${T(E.passos).map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
        <div class="faco"><div><h4>${esc(U("euDesenho"))}</h4><ul>${T(E.faco).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
          <div><h4>${esc(U("naoDesenho"))}</h4><ul>${T(E.naoFaco).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></div>
        <p class="miudo">${esc(U("pagamento"))}: ${esc(T(E.pagamento))}. ${esc(U("prazoMedio"))}: ${esc(T(E.prazo))}.</p>
      </div>
      <form class="pedido" id="form-pedido" novalidate>
        <h3>${esc(U("pedirOrcamento"))}</h3>
        <label for="f-nome">${esc(U("fNome"))}</label><input id="f-nome" name="nome" required autocomplete="name">
        <label for="f-email">${esc(U("fEmail"))}</label><input id="f-email" name="email" type="email" required autocomplete="email">
        <label for="f-tipo">${esc(U("fTipo"))}</label><select id="f-tipo" name="tipo">${E.tipos.map((t) => `<option>${esc(T(t.nome))}</option>`).join("")}<option>${esc(U("outro"))}</option></select>
        <label for="f-personagens">${esc(U("fPersonagens"))}</label><input id="f-personagens" name="personagens">
        <label for="f-descricao">${esc(U("fDescricao"))}</label><textarea id="f-descricao" name="descricao" rows="3" required></textarea>
        <label for="f-ref">${esc(U("fRef"))}</label><input id="f-ref" name="referencias">
        <button class="botao" type="submit">${esc(U("fEnviar"))}</button>
        <p class="form-msg" id="form-msg" role="status"></p>
      </form>
    </div>
    <div class="enc-rodape"></div>`, { titulo: U("menu.encomendas"),
    etiqueta: E.abertas ? `${U("abertas")} · ${T(E.vagas)}` : U("fechadas"), intro: U("introEncomendas") });
  $("#encomendas .etiqueta").classList.add(E.abertas ? "aberta" : "fechada");
  $("#encomendas .enc-rodape").appendChild(rodape());

  const form = $("#form-pedido"), msg = $("#form-msg");
  const pedido = new URLSearchParams(location.search).get("p");
  if (pedido) $("#f-personagens").value = pedido;
  if (!E.abertas) { form.querySelector("button").disabled = true; msg.textContent = U("fFechadas"); }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { msg.textContent = U("fErro"); form.reportValidity(); return; }
    const d = Object.fromEntries(new FormData(form));
    if (S.formspree) {
      msg.textContent = U("fEnviando");
      try {
        const r = await fetch(S.formspree, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
        if (!r.ok) throw new Error();
        form.reset(); msg.textContent = U("fOk");
      } catch { msg.textContent = `${U("fMailto")} ${S.email}`; }
      return;
    }
    const corpo = `Nome/Name: ${d.nome}\nE-mail: ${d.email}\nTipo/Type: ${d.tipo}\nPersonagens/Characters: ${d.personagens}\nRef: ${d.referencias}\n\n${d.descricao}`;
    location.href = `mailto:${S.email}?subject=${encodeURIComponent("Commission: " + d.tipo)}&body=${encodeURIComponent(corpo)}`;
    msg.textContent = `${U("fMailto")} ${S.email}.`;
  });

  /* ---------- navegação horizontal ---------- */
  const paineis = [...trilho.querySelectorAll(".painel")];
  const pontos = $("#pontos");
  pontos.innerHTML = paineis.map((p) => `<button type="button" aria-label="${esc(U("menu." + p.id))}" data-ir="${p.id}"></button>`).join("");
  let atual = 0;
  const irPara = (i, suave = true) => {
    i = Math.max(0, Math.min(paineis.length - 1, i));
    trilho.scrollTo({ left: paineis[i].offsetLeft, behavior: suave && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto" });
  };
  const indice = (id) => paineis.findIndex((p) => p.id === id);
  function marcar() {
    atual = Math.round(trilho.scrollLeft / trilho.clientWidth);
    const id = paineis[atual]?.id;
    topo.querySelectorAll("[data-painel]").forEach((a) => a.classList.toggle("ativo", a.dataset.painel === id));
    pontos.querySelectorAll("button").forEach((b, i) => b.classList.toggle("ativo", i === atual));
    $("#seta-esq").hidden = atual === 0; $("#seta-dir").hidden = atual === paineis.length - 1;
    if (id && location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
  }
  let marcarPend;
  trilho.addEventListener("scroll", () => { cancelAnimationFrame(marcarPend); marcarPend = requestAnimationFrame(marcar); });

  // qualquer link "#painel" passa para o lado em vez de pular
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"], [data-ir]');
    if (a) {
      const id = a.dataset.ir || a.getAttribute("href").slice(1);
      if (indice(id) >= 0) { e.preventDefault(); fecharCaixa(); irPara(indice(id)); }
    }
    const vm = e.target.closest("[data-ver-mapa]");
    if (vm) {
      fecharCaixa(); irPara(indice("mapa"));
      const i = S.mapa.marcadores.findIndex((m) => m.local === vm.dataset.verMapa);
      $("#mapa-quadro").querySelectorAll(".mapa-pin").forEach((p) => p.classList.toggle("ativa", +p.dataset.i === i));
    }
    const enc = e.target.closest("[data-encomendar]");
    if (enc) { e.preventDefault(); fecharCaixa(); $("#f-personagens").value = enc.dataset.encomendar; irPara(indice("encomendas")); }
  });
  $("#seta-esq").addEventListener("click", () => irPara(atual - 1));
  $("#seta-dir").addEventListener("click", () => irPara(atual + 1));
  addEventListener("keydown", (e) => {
    if (document.querySelector("dialog[open]") || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); irPara(atual + 1); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); irPara(atual - 1); }
  });

  // roda do mouse: rola o conteúdo do painel/fileira primeiro; no fim, passa de painel
  let acumulado = 0, travado = false;
  trilho.addEventListener("wheel", (e) => {
    if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const d = e.deltaY;
    const ry = e.target.closest(".rola-y");
    if (ry && ry.scrollHeight > ry.clientHeight + 2) {
      const fimY = d > 0 ? ry.scrollTop + ry.clientHeight >= ry.scrollHeight - 2 : ry.scrollTop <= 0;
      if (!fimY) return; // deixa a lista rolar sozinha
    }
    const car = e.target.closest(".carrossel");
    if (car && car.scrollWidth > car.clientWidth + 2) {
      const fim = d > 0 ? car.scrollLeft + car.clientWidth >= car.scrollWidth - 2 : car.scrollLeft <= 0;
      if (!fim) { e.preventDefault(); car.scrollLeft += d; return; }
    }
    const box = paineis[atual].querySelector(".painel-conteudo");
    const podeRolar = d > 0 ? box.scrollTop + box.clientHeight < box.scrollHeight - 2 : box.scrollTop > 0;
    if (podeRolar) return;
    e.preventDefault();
    if (travado) return;
    acumulado += d;
    if (Math.abs(acumulado) > 60) { travado = true; irPara(atual + Math.sign(acumulado)); acumulado = 0; setTimeout(() => (travado = false), 750); }
  }, { passive: false });

  // setas das fileiras
  document.addEventListener("click", (e) => {
    const s = e.target.closest(".carrossel-seta"); if (!s) return;
    const c = document.getElementById(s.dataset.alvo);
    c.scrollBy({ left: (s.classList.contains("esq") ? -1 : 1) * c.clientWidth * 0.85, behavior: "smooth" });
  });

  const inicial = indice(location.hash.slice(1));
  requestAnimationFrame(() => { if (inicial > 0) irPara(inicial, false); marcar(); });
  addEventListener("resize", () => irPara(atual, false));
})();
