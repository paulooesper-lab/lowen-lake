/* Funções usadas por todas as páginas: idioma, cabeçalho, imagens, fichas e caixas. */
(function () {
  const S = window.SITE;

  /* ---------- idioma ---------- */
  function idiomaInicial() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "pt" || q === "en") { try { localStorage.setItem("ll-lang", q); } catch (e) {} return q; }
    try { const g = localStorage.getItem("ll-lang"); if (g === "pt" || g === "en") return g; } catch (e) {}
    return (navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en";
  }
  const LANG = idiomaInicial();
  document.documentElement.lang = LANG === "pt" ? "pt-BR" : "en";

  // T(valor): texto no idioma atual. Aceita "texto" ou { pt, en }.
  const T = (v) => (v && typeof v === "object" && !Array.isArray(v) ? (v[LANG] ?? v.pt ?? "") : v ?? "");
  const U = (chave) => T(chave.split(".").reduce((o, k) => (o ? o[k] : ""), S.ui));
  const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const $ = (sel, raiz = document) => raiz.querySelector(sel);

  function trocarIdioma(novo) {
    try { localStorage.setItem("ll-lang", novo); } catch (e) {}
    const url = new URL(location.href);
    url.searchParams.delete("lang");
    location.href = url.toString();
  }

  /* ---------- imagem com reserva automática ---------- */
  function iniciais(nome) {
    return nome.replace(/["“”].*?["“”]/g, "").replace(/^(Xerife|Sheriff|General|Prefeita|Mayor|Vovó|Grandma)\s+/i, "")
      .split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
  }
  function provisoria(nome, cores) {
    const [a, b] = cores || ["#2a3a30", "#e8b623"];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
      <rect width="300" height="400" fill="${a}"/>
      <path d="M0 400 L0 300 Q150 220 300 300 L300 400Z" fill="${b}" opacity=".85"/>
      <circle cx="150" cy="170" r="70" fill="${b}" opacity=".35"/>
      <text x="150" y="196" font-family="Bungee, Impact, sans-serif" font-size="72" fill="#f4efe0" text-anchor="middle">${esc(iniciais(nome))}</text>
      <text x="150" y="372" font-family="Overpass, Arial, sans-serif" font-size="15" fill="#111" text-anchor="middle" letter-spacing="2">${esc(U("imagemEmBreve"))}</text>
    </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function img(src, nome, cores, cls = "") {
    const reserva = provisoria(T(nome), cores);
    return `<img class="${cls}" src="${esc(src || reserva)}" alt="${esc(T(nome))}" loading="lazy"
      onerror="this.onerror=null;this.src='${reserva}'">`;
  }

  /* ---------- buscas ---------- */
  const acharLocal = (id) => S.locais.find((l) => l.id === id);
  const locaisVisiveis = () => S.locais.filter((l) => !l.oculto);
  const acharPersonagem = (id) => S.personagens.find((p) => p.id === id);
  const nomeOnde = (id) => { const l = acharLocal(id); if (l) return T(l.nome); const r = S.mapa.regioes[id]; return r ? T(r.nome) : ""; };
  const urlLocal = (id) => `local.html?id=${encodeURIComponent(id)}`;

  /* ---------- cabeçalho ---------- */
  const SECOES = ["inicio", "cidade", "personagens", "locais", "mapa", "lendas", "eventos", "portfolio", "encomendas"];
  function cabecalho(naHome) {
    const h = document.createElement("header");
    h.className = "topo";
    h.innerHTML = `
      <a class="marca" href="${naHome ? "#inicio" : "index.html"}">${S.logo ? `<img class="marca-pato" src="${esc(S.logo)}" alt="" onerror="this.remove()">` : ""}<span>Lowen&nbsp;Lake</span></a>
      <nav class="menu" aria-label="Menu">
        ${SECOES.slice(1).map((s) => {
          const href = s === "eventos" && !naHome ? "eventos.html" : naHome ? `#${s}` : `index.html#${s}`;
          return `<a href="${href}" data-painel="${s}"${s === "encomendas" ? ' class="menu-cta"' : ""}>${esc(U("menu." + s))}</a>`;
        }).join("")}
      </nav>
      <div class="idioma" role="group" aria-label="Idioma / Language">
        <button type="button" data-lang="pt" aria-pressed="${LANG === "pt"}">PT</button>
        <button type="button" data-lang="en" aria-pressed="${LANG === "en"}">EN</button>
      </div>`;
    h.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => b.dataset.lang !== LANG && trocarIdioma(b.dataset.lang)));
    document.body.prepend(h);
    return h;
  }

  /* ---------- caixa (modal) genérica ---------- */
  let caixa;
  function abrirCaixa(html, classe = "") {
    if (!caixa) {
      caixa = document.createElement("dialog");
      caixa.className = "ficha";
      caixa.innerHTML = `<button class="fechar" type="button" aria-label="${esc(U("fechar"))}">×</button><div class="ficha-conteudo"></div>`;
      document.body.appendChild(caixa);
      caixa.querySelector(".fechar").addEventListener("click", () => caixa.close());
      caixa.addEventListener("click", (e) => { if (e.target === caixa) caixa.close(); });
    }
    caixa.className = "ficha " + classe;
    caixa.querySelector(".ficha-conteudo").innerHTML = html;
    if (!caixa.open) caixa.showModal ? caixa.showModal() : caixa.setAttribute("open", "");
    return caixa;
  }
  const fecharCaixa = () => caixa && caixa.open && caixa.close();

  function idadeTexto(p) {
    const i = T(p.idade);
    return i ? " · " + esc(i) + (/^\d+$/.test(i) ? " " + esc(U("anos")) : "") : "";
  }

  function abrirPersonagem(id) {
    const p = acharPersonagem(id); if (!p) return;
    const campo = (rot, t) => (T(t) ? `<dt>${esc(U(rot))}</dt><dd>${esc(T(t))}</dd>` : "");
    const rel = T(p.relacoes);
    abrirCaixa(`
      <div class="ficha-grade">
        ${img(p.imagem, p.nome, p.cor, "ficha-img")}
        <div>
          <span class="etiqueta">${esc(T(S.grupos[p.grupo]))}</span>
          <h3>${esc(T(p.nome))}</h3>
          <p class="ficha-papel">${esc(T(p.papel))}${idadeTexto(p)}</p>
          <dl>
            ${campo("aparencia", p.aparencia)}${campo("personalidade", p.personalidade)}${campo("historia", p.historia)}
            ${rel && rel.length ? `<dt>${esc(U("relacoes"))}</dt><dd>${rel.map(esc).join(" · ")}</dd>` : ""}
          </dl>
          <div class="caixa-acoes">
            <a class="botao botao-linha" href="index.html?p=${encodeURIComponent(T(p.nome))}#encomendas" data-encomendar="${esc(T(p.nome))}">${esc(U("encomendarPersonagem"))}</a>
            ${(S.relacoesMapa || []).some((r) => r[0] === p.id || r[1] === p.id) && document.body.dataset.pagina !== "relacoes" ? `<a class="botao botao-linha" href="relacoes.html?id=${encodeURIComponent(p.id)}">${esc(U("mapaRelacoes"))} →</a>` : ""}
          </div>
        </div>
      </div>`);
  }

  // caixa rápida de um local, com "Saiba mais"
  function abrirLocal(id, extras = "") {
    const l = acharLocal(id); if (!l) return;
    const reg = S.mapa.regioes[l.regiao];
    abrirCaixa(`
      <div class="caixa-local">
        ${img(l.imagem, l.nome, ["#22302a", "#2f7fb5"], "caixa-local-img")}
        <div class="caixa-local-txt">
          <span class="etiqueta">${esc(T(l.tipo))}${reg ? " · " + esc(T(reg.nome)) : ""}</span>
          <h3>${esc(T(l.nome))}</h3>
          <p>${esc(T(l.resumo))}</p>
          <div class="caixa-acoes">
            <a class="botao" href="${urlLocal(l.id)}">${esc(U("saibaMais"))} →</a>
            ${extras}
          </div>
        </div>
      </div>`, "caixa-larga");
  }

  const urlCriatura = (id) => `criatura.html?id=${encodeURIComponent(id)}`;
  const acharCriatura = (chave) => S.criaturas.find((x) => x.id === chave || T(x.nome) === chave || x.nome === chave || (x.nome && x.nome.pt === chave));
  function abrirCriatura(nome) {
    const c = acharCriatura(nome); if (!c) return;
    abrirCaixa(`
      <div class="caixa-local">
        ${img(c.imagem, c.nome, ["#1b2420", "#5c7a3e"], "caixa-local-img caixa-retrato")}
        <div class="caixa-local-txt">
          <span class="etiqueta">${esc(U("avistamento"))} · ${esc(T(c.escala))}</span>
          <h3>${esc(T(c.nome))}</h3>
          <p class="miudo">${esc(T(c.onde))}</p>
          <p>${esc(T(c.texto))}</p>
          ${c.id ? `<div class="caixa-acoes"><a class="botao" href="${urlCriatura(c.id)}">${esc(U("saibaMais"))} →</a></div>` : ""}
        </div>
      </div>`, "caixa-larga");
  }

  /* ---------- ícones das redes ---------- */
  const ICONES = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.3" cy="6.7" r="1.3" fill="currentColor"/>',
    x: '<path d="M4 3h4.6l4.1 5.6L17.6 3H20l-6.2 7.1L21 21h-4.6l-4.5-6.1L6.4 21H4l6.8-7.8z" fill="currentColor"/>',
    deviantart: '<path d="M18 2h-4.3l-.6.9-3 5.1H6v5.4h2.8L6 18.6V22h4.3l.6-.9 3-5.1H18v-5.4h-2.8L18 5.4z" fill="currentColor"/>',
    bluesky: '<path d="M12 10.8C10.9 8.6 7.9 4.6 5.1 2.6 2.4.7 1.4 1 .7 1.3 0 1.7 0 2.9 0 3.6c0 .7.4 5.6.6 6.4.9 2.9 3.9 3.8 6.7 3.5-4.1.6-7.7 2.1-3 7.3 5.2 5.4 7.1-1.1 8.1-4.5.6 2.1 1.8 6.6 6.1 6.9 3.1.2 4.6-1.6 1.7-4.4-2.3-2-4.4-2.9-6.1-3.3 2.8.3 5.8-.6 6.7-3.5.2-.8.6-5.7.6-6.4 0-.7 0-1.9-.7-2.3-.7-.3-1.7-.6-4.4 1.3-2.8 2-5.8 6-6.9 8.2z" fill="currentColor" transform="translate(.6 .4) scale(.95)"/>',
  };
  const iconeRede = (r) => `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">${ICONES[r] || ""}</svg>`;
  const redesHTML = (cls = "redes") => (S.redes || []).length ? `<ul class="${cls}">${S.redes.map((r) => `
    <li><a href="${esc(r.url)}" target="_blank" rel="noopener" aria-label="${esc(r.nome)}">${iconeRede(r.rede)}<span><b>${esc(r.nome)}</b><small>${esc(r.usuario || "")}</small></span></a></li>`).join("")}</ul>` : "";

  /* ---------- rodapé ---------- */
  function rodape() {
    const f = document.createElement("footer");
    f.className = "rodape";
    f.innerHTML = `
      <div class="envolve rodape-grade">
        <p class="miudo">${esc(U("direitos").replace("{artista}", S.nomeArtista))}
          <br><a href="sobre.html">${esc(U("sobreArtista"))}</a> · <a href="relacoes.html">${esc(U("mapaRelacoes"))}</a> · <a href="criatura.html">${esc(U("bestiario"))}</a></p>
        ${redesHTML("redes redes-mini")}
        <div class="email-linha"><span class="miudo">${esc(U("contato"))}</span>
          <a class="email" href="mailto:${esc(S.email)}">${esc(S.email)}</a>
          <button class="copiar" type="button">${esc(U("copiar"))}</button></div>
      </div>`;
    ligarCopiar(f);
    return f;
  }
  function ligarCopiar(raiz) {
    raiz.querySelectorAll(".copiar").forEach((b) => b.addEventListener("click", () => {
      const alvo = b.parentNode.querySelector(".email");
      navigator.clipboard.writeText(S.email).then(() => (b.textContent = U("copiado")), () => {
        const r = document.createRange(); r.selectNodeContents(alvo); getSelection().removeAllRanges(); getSelection().addRange(r);
      });
    }));
  }

  window.LL = { S, LANG, T, U, esc, $, img, acharLocal, locaisVisiveis, urlCriatura, acharCriatura, acharPersonagem, nomeOnde, urlLocal, cabecalho, abrirCaixa, fecharCaixa,
    abrirPersonagem, abrirLocal, abrirCriatura, rodape, ligarCopiar, idadeTexto, SECOES, redesHTML, iconeRede };
})();
