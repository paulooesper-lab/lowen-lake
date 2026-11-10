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
          <a class="botao botao-linha" href="index.html?p=${encodeURIComponent(T(p.nome))}#encomendas" data-encomendar="${esc(T(p.nome))}">${esc(U("encomendarPersonagem"))}</a>
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

  function abrirCriatura(nome) {
    const c = S.criaturas.find((x) => T(x.nome) === nome || x.nome === nome); if (!c) return;
    abrirCaixa(`
      <div class="caixa-local">
        ${img(c.imagem, c.nome, ["#1b2420", "#5c7a3e"], "caixa-local-img caixa-retrato")}
        <div class="caixa-local-txt">
          <span class="etiqueta">${esc(U("avistamento"))} · ${esc(T(c.escala))}</span>
          <h3>${esc(T(c.nome))}</h3>
          <p class="miudo">${esc(T(c.onde))}</p>
          <p>${esc(T(c.texto))}</p>
        </div>
      </div>`, "caixa-larga");
  }

  /* ---------- rodapé ---------- */
  function rodape() {
    const f = document.createElement("footer");
    f.className = "rodape";
    f.innerHTML = `
      <div class="envolve rodape-grade">
        <p class="miudo">${esc(U("direitos").replace("{artista}", S.nomeArtista))}</p>
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

  window.LL = { S, LANG, T, U, esc, $, img, acharLocal, locaisVisiveis, acharPersonagem, nomeOnde, urlLocal, cabecalho, abrirCaixa, fecharCaixa,
    abrirPersonagem, abrirLocal, abrirCriatura, rodape, ligarCopiar, idadeTexto, SECOES };
})();
