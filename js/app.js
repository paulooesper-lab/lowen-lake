/* Monta o site a partir de js/conteudo.js. Normalmente não é preciso mexer aqui. */
(function () {
  const S = window.SITE;
  const $ = (sel) => document.querySelector(sel);
  const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pegar = (caminho) => caminho.split(".").reduce((o, k) => (o ? o[k] : ""), S);

  /* ---------- imagem provisória quando o arquivo não existe ---------- */
  function iniciais(nome) {
    return nome.replace(/["“”].*?["“”]/g, "").replace(/^(Xerife|General|Prefeita|Vovó)\s+/i, "")
      .split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
  }
  function provisoria(nome, cores) {
    const [a, b] = cores || ["#2a3a30", "#e8b623"];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
      <rect width="300" height="400" fill="${a}"/>
      <path d="M0 400 L0 300 Q150 220 300 300 L300 400Z" fill="${b}" opacity=".85"/>
      <circle cx="150" cy="170" r="70" fill="${b}" opacity=".35"/>
      <text x="150" y="196" font-family="Bungee, Impact, sans-serif" font-size="72" fill="#f4efe0" text-anchor="middle">${esc(iniciais(nome))}</text>
      <text x="150" y="372" font-family="Overpass, Arial, sans-serif" font-size="15" fill="#111" text-anchor="middle" letter-spacing="2">IMAGEM EM BREVE</text>
    </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function img(src, nome, cores, cls = "") {
    const reserva = provisoria(nome, cores);
    return `<img class="${cls}" src="${esc(src || reserva)}" alt="${esc(nome)}" loading="lazy"
      onerror="this.onerror=null;this.src='${reserva}'">`;
  }

  /* ---------- banners de paisagem ---------- */
  const B = S.banners || {};
  if (B.inicio) $("#inicio").style.setProperty("--banner", `url("${new URL(B.inicio, location.href).href}")`);
  document.querySelectorAll("section.secao[id]").forEach((sec) => {
    const src = B[sec.id]; if (!src) return;
    const b = document.createElement("div");
    b.className = "banner";
    b.innerHTML = `<img src="${esc(src)}" alt="" loading="lazy" onerror="this.parentNode.remove()">`;
    sec.prepend(b); sec.classList.add("com-banner");
  });

  /* ---------- textos simples ---------- */
  document.querySelectorAll("[data-campo]").forEach((el) => (el.textContent = pegar(el.dataset.campo)));
  const cur = S.cidade.curiosidade;
  if (cur) { $("#relogio-rot").textContent = cur.rotulo; $("#relogio-val").textContent = cur.valor; $("#relogio-nota").textContent = cur.nota; }

  $("#historia").innerHTML = S.historia.map((h) => `<article><h3>${esc(h.titulo)}</h3><p>${esc(h.texto)}</p></article>`).join("");
  $("#cronologia").innerHTML = S.cronologia.map((c) => `<li><span>${esc(c.data)}</span>${esc(c.fato)}</li>`).join("");

  /* ---------- filtros genéricos ---------- */
  function filtros(alvo, categorias, aoMudar) {
    const caixa = $(alvo);
    const todas = ["Todos", ...categorias];
    caixa.innerHTML = todas.map((c, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    caixa.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      caixa.querySelectorAll("button").forEach((x) => x.setAttribute("aria-selected", x === b));
      aoMudar(b.dataset.cat);
    });
  }
  const unicos = (lista, campo) => [...new Set(lista.map((x) => x[campo]))];

  /* ---------- personagens ---------- */
  function desenharPersonagens(cat) {
    const lista = S.personagens.filter((p) => cat === "Todos" || p.grupo === cat);
    $("#lista-personagens").innerHTML = lista.map((p) => `
      <button type="button" class="cartao-p" data-id="${esc(p.id)}">
        ${img(p.imagem, p.nome, p.cor)}
        <span class="cartao-p-txt">
          <span class="cartao-p-grupo">${esc(p.grupo)}</span>
          <strong>${esc(p.nome)}</strong>
          <span>${esc(p.papel)}${p.idade ? " · " + esc(p.idade) : ""}</span>
        </span>
      </button>`).join("");
  }
  filtros("#filtro-personagens", unicos(S.personagens, "grupo"), desenharPersonagens);
  desenharPersonagens("Todos");

  const ficha = $("#ficha");
  function abrirFicha(html) {
    $("#ficha-conteudo").innerHTML = html;
    if (ficha.showModal) ficha.showModal(); else ficha.setAttribute("open", "");
  }
  ficha.querySelector(".fechar").addEventListener("click", () => ficha.close());
  ficha.addEventListener("click", (e) => { if (e.target === ficha) ficha.close(); });

  $("#lista-personagens").addEventListener("click", (e) => {
    const b = e.target.closest(".cartao-p"); if (!b) return;
    const p = S.personagens.find((x) => x.id === b.dataset.id);
    const campo = (rot, t) => (t ? `<dt>${rot}</dt><dd>${esc(t)}</dd>` : "");
    abrirFicha(`
      <div class="ficha-grade">
        ${img(p.imagem, p.nome, p.cor, "ficha-img")}
        <div>
          <span class="etiqueta">${esc(p.grupo)}</span>
          <h3>${esc(p.nome)}</h3>
          <p class="ficha-papel">${esc(p.papel)}${p.idade ? " · " + esc(p.idade) + (/^\d+$/.test(p.idade) ? " anos" : "") : ""}</p>
          <dl>
            ${campo("Aparência", p.aparencia)}
            ${campo("Personalidade", p.personalidade)}
            ${campo("História", p.historia)}
            ${p.relacoes && p.relacoes.length ? `<dt>Relações</dt><dd>${p.relacoes.map(esc).join(" · ")}</dd>` : ""}
          </dl>
          <a class="botao botao-linha" href="#encomendas" onclick="document.getElementById('ficha').close();document.getElementById('f-personagens').value=${esc(JSON.stringify(p.nome))}">Encomendar arte deste personagem</a>
        </div>
      </div>`);
  });

  /* ---------- locais ---------- */
  $("#lista-locais").innerHTML = S.locais.map((l) => `
    <article class="local">
      ${img(l.imagem, l.nome, ["#22302a", "#2f7fb5"])}
      <div>
        <span class="local-tipo">${esc(l.tipo)} · ${esc((S.mapa.regioes[l.regiao] || {}).nome || "")}</span>
        <h3>${esc(l.nome)}</h3>
        <p>${esc(l.texto)}</p>
      </div>
    </article>`).join("");

  /* ---------- mapa ---------- */
  const R = S.mapa.regioes;
  const mapaSVG = `
  <svg viewBox="0 0 1000 720" class="mapa-svg" role="group" aria-label="Mapa ilustrado de Lowen Lake">
    <defs>
      <pattern id="pnt" width="18" height="12" patternUnits="userSpaceOnUse"><path d="M2 8 q4 -5 8 0 M10 4 q3 -3 6 0" stroke="var(--m-pantano-linha)" fill="none" stroke-width="1.4"/></pattern>
      <pattern id="pin" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M13 4 l6 12 h-12z" fill="var(--m-pinho)"/></pattern>
    </defs>
    <rect width="1000" height="720" fill="var(--m-terra)"/>
    <g class="reg" data-reg="echoridge"><path d="M0 0 H1000 V150 Q860 200 720 170 Q560 140 420 185 Q260 230 120 170 Q60 150 0 165Z" fill="var(--m-monte)"/>
      <path d="M40 140 l50 -90 l50 90z M150 150 l70 -120 l70 120z M300 160 l45 -80 l45 80z M440 150 l60 -105 l60 105z M580 130 l40 -70 l40 70z" fill="var(--m-pico)"/></g>
    <g class="reg" data-reg="northend"><path d="M760 40 H1000 V250 Q900 270 820 235 Q760 200 760 150Z" fill="url(#pin)" stroke="var(--m-borda)" stroke-dasharray="6 5"/></g>
    <g class="reg" data-reg="bluepines"><path d="M30 200 Q140 175 260 210 Q320 240 330 300 Q250 330 140 320 Q50 310 30 270Z" fill="url(#pin)" stroke="var(--m-borda)" stroke-dasharray="6 5"/></g>
    <g class="reg" data-reg="lake"><path d="M420 280 Q520 230 650 255 Q760 280 740 360 Q720 450 600 470 Q470 480 420 420 Q380 350 420 280Z" fill="var(--m-agua)"/></g>
    <path d="M230 120 Q250 180 210 230 Q180 280 260 300 Q340 320 425 330" fill="none" stroke="var(--m-agua)" stroke-width="7" stroke-linecap="round"/>
    <path d="M560 470 Q540 540 600 600 Q640 650 620 720" fill="none" stroke="var(--m-agua)" stroke-width="6" stroke-linecap="round"/>
    <g class="reg" data-reg="lakeshore"><path d="M745 300 Q830 300 870 350 Q860 430 760 450 Q720 450 712 430 Q745 390 745 300Z" fill="var(--m-rico)" stroke="var(--m-borda)"/></g>
    <g class="reg" data-reg="oldhollow"><path d="M230 345 Q320 330 395 360 Q405 420 360 450 Q280 465 230 430Z" fill="var(--m-cidade)" stroke="var(--m-borda)"/>
      <path d="M260 370 h20 v20 h-20z M290 362 h28 v30 h-28z M330 372 h22 v22 h-22z M275 405 h30 v20 h-30z M318 402 h26 v26 h-26z" fill="var(--m-casa)"/></g>
    <g class="reg" data-reg="mossbend"><path d="M0 560 Q160 520 320 545 Q480 570 640 540 Q820 515 1000 560 V720 H0Z" fill="var(--m-pantano)"/><rect y="530" width="1000" height="190" fill="url(#pnt)" style="pointer-events:none"/></g>
    <g class="reg" data-reg="gatorview"><path d="M90 470 h150 v60 h-150z" fill="var(--m-trailer)" stroke="var(--m-borda)"/>
      <path d="M105 485 h30 v12 h-30z M145 485 h30 v12 h-30z M185 485 h30 v12 h-30z M105 508 h30 v12 h-30z M145 508 h30 v12 h-30z" fill="var(--m-casa)"/></g>
    <g class="reg" data-reg="baileys"><circle cx="760" cy="660" r="40" fill="var(--m-pantano-escuro)" stroke="var(--m-borda)" stroke-dasharray="4 4"/></g>
    <g class="reg" data-reg="rusthook"><ellipse cx="905" cy="470" rx="55" ry="30" fill="var(--m-agua)"/><path d="M850 505 h80 v28 h-80z" fill="var(--m-ferrugem)"/></g>
    <g class="reg" data-reg="stdymphna"><path d="M330 220 l18 -30 l18 30 v28 h-36z" fill="var(--m-casa)" stroke="var(--m-borda)"/></g>
    <g class="reg" data-reg="springs"><circle cx="400" cy="480" r="14" fill="var(--m-agua)" stroke="var(--m-borda)"/></g>
    <g class="reg" data-reg="flydrones"><path d="M450 515 l14 -22 l14 22z M478 515 l14 -22 l14 22z" fill="var(--m-casa)" stroke="var(--m-borda)"/></g>
    <g class="reg reg-secreta" data-reg="area52"><circle cx="690" cy="105" r="22" fill="none" stroke="var(--m-perigo)" stroke-width="3" stroke-dasharray="5 4"/><text x="690" y="112" text-anchor="middle" class="m-x">?</text></g>
    <path d="M0 500 Q120 500 165 470 Q220 430 260 420" fill="none" stroke="var(--m-estrada)" stroke-width="5" stroke-dasharray="14 8"/>
    <path d="M340 345 Q330 260 360 210 Q420 140 520 60" fill="none" stroke="var(--m-estrada)" stroke-width="4" stroke-dasharray="14 8"/>
    <path d="M390 360 Q420 250 560 245 Q700 245 760 300" fill="none" stroke="var(--m-estrada)" stroke-width="3" stroke-dasharray="10 8"/>
    <g class="m-rotulos">
      <text x="300" y="75">ECHO RIDGE</text><text x="880" y="200">NORTHEND</text><text x="690" y="150" class="m-perigo">ÁREA 52</text>
      <text x="170" y="280">BLUE PINES</text><text x="570" y="370" class="m-agua">BIG BLUE LAKE</text><text x="800" y="380">LAKESHORE BAY</text>
      <text x="310" y="448">OLD HOLLOW</text><text x="165" y="460">GATOR VIEW PARK</text><text x="300" y="640">MOSSBEND</text>
      <text x="760" y="710">BAILEY'S HOLLOW</text><text x="905" y="560">RUSTHOOK</text><text x="350" y="185">ST. DYMPHNA</text>
      <text x="400" y="510">NAYELI SPRINGS</text><text x="478" y="540">FLY DRONES</text>
      <text x="40" y="490" class="m-via">HWY 1</text><text x="455" y="105" class="m-via">SR-55</text><text x="190" y="215" class="m-via">CROOKED RIVER</text>
    </g>
    <g transform="translate(940 640)" class="m-rosa"><circle r="26" fill="none" stroke="var(--m-borda)"/><path d="M0 -22 l7 22 l-7 -5 l-7 5z" fill="var(--m-borda)"/><text y="-30" text-anchor="middle">N</text></g>
  </svg>`;
  function infoRegiao(regId, localNome, criaturaNome) {
    const r = R[regId] || { nome: "", texto: "" };
    const loc = localNome && S.locais.find((l) => l.nome === localNome);
    const cri = criaturaNome && S.criaturas.find((c) => c.nome === criaturaNome);
    const aqui = S.locais.filter((l) => l.regiao === regId).map((l) => l.nome);
    $("#mapa-info").innerHTML = loc
      ? `${img(loc.imagem, loc.nome, ["#22302a", "#2f7fb5"], "mapa-info-img")}<span class="etiqueta">${esc(loc.tipo)} · ${esc(r.nome)}</span><h3>${esc(loc.nome)}</h3><p>${esc(loc.texto)}</p>`
      : cri
      ? `${img(cri.imagem, cri.nome, ["#1b2420", "#5c7a3e"], "mapa-info-img")}<span class="etiqueta">Avistamento · ${esc(cri.escala)}</span><h3>${esc(cri.nome)}</h3><p>${esc(cri.texto)}</p>`
      : `<span class="etiqueta">Região</span><h3>${esc(r.nome)}</h3><p>${esc(r.texto)}</p>${aqui.length ? `<p class="miudo">Aqui: ${aqui.map(esc).join(" · ")}</p>` : ""}`;
  }
  const clicavel = (el, fn) => {
    el.addEventListener("click", fn);
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } });
  };

  function mapaSimples() {
    $("#mapa-quadro").innerHTML = mapaSVG;
    $("#mapa-quadro").querySelectorAll(".reg").forEach((g) => {
      const r = R[g.dataset.reg]; if (!r) return;
      g.setAttribute("tabindex", "0"); g.setAttribute("role", "button"); g.setAttribute("aria-label", r.nome);
      clicavel(g, () => {
        $("#mapa-quadro").querySelectorAll(".reg").forEach((x) => x.classList.toggle("ativa", x === g));
        infoRegiao(g.dataset.reg);
      });
    });
  }

  if (S.mapa.imagem) {
    const pos = (o) => `left:${o.x}%;top:${o.y}%`;
    $("#mapa-quadro").innerHTML = `
      <div class="mapa-ilustrado">
        <img class="mapa-base" src="${esc(S.mapa.imagem)}" alt="Mapa ilustrado de Lowen Lake">
        ${(S.mapa.rotulos || []).map((r) => r.regiao
          ? `<button type="button" class="mapa-rotulo${r.estilo ? " " + esc(r.estilo) : ""}" style="${pos(r)}" data-reg="${esc(r.regiao)}">${esc(r.texto)}</button>`
          : `<span class="mapa-rotulo${r.estilo ? " " + esc(r.estilo) : ""}" style="${pos(r)}">${esc(r.texto)}</span>`).join("")}
        ${(S.mapa.marcadores || []).map((m, i) => `
          <button type="button" class="mapa-pin" style="${pos(m)}" data-i="${i}" aria-label="${esc(m.local || m.criatura || (R[m.regiao] || {}).nome || "")}">
            <img src="${esc(m.icone)}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'mapa-pin-ponto'}))">
          </button>`).join("")}
      </div>`;
    $("#mapa-quadro .mapa-base").addEventListener("error", mapaSimples);
    $("#mapa-quadro").querySelectorAll("button.mapa-rotulo").forEach((b) => clicavel(b, () => infoRegiao(b.dataset.reg)));
    $("#mapa-quadro").querySelectorAll(".mapa-pin").forEach((b) => {
      const m = S.mapa.marcadores[b.dataset.i];
      clicavel(b, () => {
        $("#mapa-quadro").querySelectorAll(".mapa-pin").forEach((x) => x.classList.toggle("ativa", x === b));
        infoRegiao(m.regiao, m.local, m.criatura);
      });
    });
  } else {
    mapaSimples();
  }

  /* ---------- lendas ---------- */
  $("#lista-criaturas").innerHTML = S.criaturas.map((c) => `
    <article class="criatura">
      ${img(c.imagem, c.nome, ["#1b2420", "#5c7a3e"])}
      <div><div class="criatura-topo"><h3>${esc(c.nome)}</h3><span class="escala">${esc(c.escala)}</span></div>
      <span class="local-tipo">${esc(c.onde)}</span><p>${esc(c.texto)}</p></div>
    </article>`).join("");
  $("#lista-fosseis").innerHTML = S.fosseis.map((f) => `<li><i>${esc(f.nome)}</i> ${esc(f.texto)}</li>`).join("");
  $("#lista-eventos").innerHTML = S.eventos.map((f) => `<li><b>${esc(f.nome)}</b> ${esc(f.texto)}</li>`).join("");

  /* ---------- portfólio ---------- */
  function desenharPortfolio(cat) {
    const lista = S.portfolio.filter((p) => cat === "Todos" || p.categoria === cat);
    $("#lista-portfolio").innerHTML = lista.map((p, i) => `
      <button type="button" class="obra" data-i="${S.portfolio.indexOf(p)}">
        ${img(p.imagem, p.titulo, ["#1b1b1b", i % 2 ? "#ff3d8b" : "#e8b623"])}
        <span class="obra-legenda"><b>${esc(p.titulo)}</b> ${esc(p.categoria)} · ${esc(p.ano)}</span>
      </button>`).join("");
  }
  filtros("#filtro-portfolio", unicos(S.portfolio, "categoria"), desenharPortfolio);
  desenharPortfolio("Todos");
  $("#lista-portfolio").addEventListener("click", (e) => {
    const b = e.target.closest(".obra"); if (!b) return;
    const p = S.portfolio[b.dataset.i];
    abrirFicha(`<figure class="obra-grande">${img(p.imagem, p.titulo, ["#1b1b1b", "#e8b623"])}<figcaption><b>${esc(p.titulo)}</b> · ${esc(p.categoria)} · ${esc(p.ano)}</figcaption></figure>`);
  });

  /* ---------- encomendas ---------- */
  const E = S.encomendas;
  const st = $("#status-encomendas");
  st.textContent = E.abertas ? `Abertas · ${E.vagas}` : "Fechadas no momento";
  st.classList.add(E.abertas ? "aberta" : "fechada");
  $("#lista-precos").innerHTML = E.tipos.map((t) => `
    <div class="preco"><span class="preco-valor"><small>a partir de</small>${esc(E.moeda)} ${esc(t.preco)}</span><h3>${esc(t.nome)}</h3><p>${esc(t.detalhe)}</p></div>`).join("");
  $("#lista-extras").innerHTML = E.extras.map((x) => `<li>${esc(x)}</li>`).join("");
  $("#lista-passos").innerHTML = E.passos.map((x) => `<li>${esc(x)}</li>`).join("");
  $("#lista-faco").innerHTML = E.faco.map((x) => `<li>${esc(x)}</li>`).join("");
  $("#lista-naofaco").innerHTML = E.naoFaco.map((x) => `<li>${esc(x)}</li>`).join("");
  $("#info-pagamento").textContent = `Pagamento: ${E.pagamento}. Prazo médio: ${E.prazo}.`;
  $("#f-tipo").innerHTML = E.tipos.map((t) => `<option>${esc(t.nome)}</option>`).join("") + "<option>Outro</option>";

  const form = $("#form-pedido"), msg = $("#form-msg");
  if (!E.abertas) { form.querySelector("button").disabled = true; msg.textContent = "As encomendas estão fechadas. Mande um e-mail para entrar na lista de espera."; }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { msg.textContent = "Preencha nome, e-mail válido e a descrição da ideia."; form.reportValidity(); return; }
    const d = Object.fromEntries(new FormData(form));
    if (S.formspree) {
      msg.textContent = "Enviando…";
      try {
        const r = await fetch(S.formspree, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
        if (!r.ok) throw new Error();
        form.reset(); msg.textContent = "Pedido enviado. Respondo por e-mail em até 3 dias.";
      } catch { msg.textContent = `Não foi possível enviar agora. Mande direto para ${S.email}.`; }
      return;
    }
    const corpo = `Nome: ${d.nome}\nE-mail: ${d.email}\nTipo: ${d.tipo}\nPersonagens: ${d.personagens}\nPrazo: ${d.prazo}\nReferências: ${d.referencias}\n\n${d.descricao}`;
    location.href = `mailto:${S.email}?subject=${encodeURIComponent("Encomenda: " + d.tipo)}&body=${encodeURIComponent(corpo)}`;
    msg.textContent = `Seu programa de e-mail deve abrir com o pedido pronto. Se não abrir, mande para ${S.email}.`;
  });

  /* ---------- rodapé ---------- */
  $("#nome-artista").textContent = S.nomeArtista;
  const link = $("#email-link"); link.textContent = S.email; link.href = "mailto:" + S.email;
  $("#copiar-email").addEventListener("click", (e) => {
    const b = e.currentTarget;
    navigator.clipboard.writeText(S.email).then(() => (b.textContent = "Copiado"), () => {
      const r = document.createRange(); r.selectNodeContents(link); getSelection().removeAllRanges(); getSelection().addRange(r);
    });
  });
  $("#lista-redes").innerHTML = (S.redes || []).map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.nome)}</a>`).join("");
})();
