/* ECHO RIDGE · gerador de licença de pesca e de caça (lembrança, não é documento oficial).
   Cartão no tamanho padrão de identidade/carteira dos EUA (CR80: 85,6 × 54 mm), desenhado em canvas a 300 dpi.
   A foto do usuário é lida só no navegador: nada é enviado para lugar nenhum.
   Artes: img/licenca/truta.jpg, img/licenca/veado.jpg, img/marca/selo-fw.png, img/licenca/pato.png, img/marca/emblema.png */
(() => {
  const W = 1011, H = 638; // 85,6 × 53,98 mm a 300 dpi
  const $ = (s, e = document) => e.querySelector(s);
  const lang = () => (document.documentElement.lang || "pt").startsWith("pt") ? "pt" : "en";
  const ler = (k, p) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : p; } catch (e) { return p; } };
  const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ok */ } };

  const TXT = {
    pt: { pesca: "Pesca", caca: "Caça", foto: "Sua foto", fotoDica: "A foto fica só no seu navegador: nada é enviado.", zoom: "Zoom", posX: "Posição horizontal", posY: "Posição vertical",
      nome: "Nome", sobrenome: "Sobrenome", nasc: "Data de nascimento", cidade: "Cidade e estado", altura: "Altura (pés-polegadas)", olhos: "Olhos", resid: "Residência",
      residente: "Residente do condado", naoResidente: "Visitante (não residente)", privilegios: "Permissões incluídas", frente: "Frente", verso: "Verso",
      baixarFrente: "Baixar frente (PNG)", baixarVerso: "Baixar verso (PNG)", imprimir: "Imprimir em tamanho real",
      dicaImpressao: "Na impressão, use escala 100% (\"tamanho real\"). Recorte na linha pontilhada, cole frente e verso e plastifique.",
      aviso: "Lembrança do universo Lowen Lake. Não é uma licença válida e não substitui documento oficial.",
      erro: "Para baixar, abra o site online ou por um servidor local (o navegador bloqueia imagens abertas direto do disco).",
      olhosOp: { BRO: "Castanhos", BLU: "Azuis", GRN: "Verdes", HAZ: "Mel", GRY: "Cinza", BLK: "Pretos" } },
    en: { pesca: "Fishing", caca: "Hunting", foto: "Your photo", fotoDica: "Your photo stays in your browser: nothing is uploaded.", zoom: "Zoom", posX: "Horizontal position", posY: "Vertical position",
      nome: "First name", sobrenome: "Last name", nasc: "Date of birth", cidade: "City and state", altura: "Height (ft-in)", olhos: "Eyes", resid: "Residency",
      residente: "County resident", naoResidente: "Visitor (non-resident)", privilegios: "Included privileges", frente: "Front", verso: "Back",
      baixarFrente: "Download front (PNG)", baixarVerso: "Download back (PNG)", imprimir: "Print at actual size",
      dicaImpressao: "When printing, use 100% scale (\"actual size\"). Cut along the dotted line, glue front to back and laminate.",
      aviso: "Lowen Lake universe souvenir. Not a valid license and not an official document.",
      erro: "To download, open the site online or through a local server (browsers block images opened straight from disk).",
      olhosOp: { BRO: "Brown", BLU: "Blue", GRN: "Green", HAZ: "Hazel", GRY: "Gray", BLK: "Black" } },
  };
  const tx = k => TXT[lang()][k];

  /* tipos de documento: cores, arte, permissões e regras do verso (cartão sempre em inglês, como um documento dos EUA) */
  const TIPOS = {
    pesca: {
      titulo: "FISHING LICENSE", letra: "F", arte: "img/licenca/truta.jpg",
      fundo: "#e3f0ef", fundo2: "#cfe5e6", cor: "#17647d", escura: "#0d3443", destaque: "#2a8fb0", linha: "rgba(23,100,125,.13)",
      privs: [["TROUT", { pt: "Selo de truta (riachos nativos)", en: "Trout stamp (native streams)" }, true], ["ICE", { pt: "Pesca no gelo", en: "Ice fishing" }, false],
              ["FLY", { pt: "Fly fishing (só isca artificial)", en: "Fly fishing (artificial lures only)" }, true], ["BOAT", { pt: "Barco e canoa nos lagos", en: "Boat & canoe on lakes" }, false]],
      regras: ["Daily limit: 5 trout · minimum size 18 cm (7 in)", "Native brook trout streams: artificial lures and barbless hooks only", "Hellbender salamanders must be released immediately", "Ice fishing only when rangers post SAFE ICE", "Carry this license while fishing · show it to any ranger on request"],
      blocoTitulo: "DAILY CATCH LOG",
    },
    caca: {
      titulo: "HUNTING LICENSE", letra: "H", arte: "img/licenca/veado.jpg",
      fundo: "#f3e9d6", fundo2: "#ead8b8", cor: "#c4511c", escura: "#3f2a12", destaque: "#e2742d", linha: "rgba(196,81,28,.13)",
      privs: [["DEER", { pt: "Veado (arco e rifle) · 2 lacres", en: "Deer (bow & rifle) · 2 tags" }, true], ["TURKEY", { pt: "Peru-selvagem (primavera) · 1 lacre", en: "Wild turkey (spring) · 1 tag" }, true],
              ["BEAR", { pt: "Urso-negro (sorteio especial)", en: "Black bear (special lottery)" }, false], ["ARCH", { pt: "Temporada de arco", en: "Archery season" }, false]],
      regras: ["Blaze orange vest and cap required during all firearm seasons", "No hunting within 150 m of trails, campgrounds, cabins or roads", "Moose, cougar, bobcat, eagles and owls are PROTECTED", "No hunting at the ski resort or near the geological station", "Tag every harvest immediately and report it within 48 hours"],
      blocoTitulo: "HARVEST TAGS",
    },
  };

  /* estado */
  const st = Object.assign({ tipo: "pesca", nome: "", sobrenome: "", nasc: "", cidade: "Lowen Lake", altura: "5-07", olhos: "BRO", resid: "R", privs: {} }, ler("er-licenca", {}));
  let foto = null, fz = 1, fx = 50, fy = 40;
  const imgs = {};
  const carregar = src => imgs[src] || (imgs[src] = new Promise(ok => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = src; }));

  /* ---------- utilidades de desenho ---------- */
  function arred(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function capa(c, img, x, y, w, h, zoom = 1, px = 50, py = 50) {
    const s = Math.max(w / img.width, h / img.height) * zoom, sw = w / s, sh = h / s;
    const sx = (img.width - sw) * px / 100, sy = (img.height - sh) * py / 100;
    c.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }
  function guilhoche(c, T) { // linhas de segurança, como nas cédulas e documentos
    c.save(); c.strokeStyle = T.linha; c.lineWidth = 1.2;
    for (let k = 0; k < 26; k++) {
      c.beginPath();
      for (let x = 0; x <= W; x += 6) {
        const y = H * .5 + Math.sin(x / 70 + k * .45) * (90 + k * 6) * Math.cos(x / 260 + k * .2);
        x ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.stroke();
    }
    c.restore();
  }
  function roseta(c, cx, cy, r, cor) {
    c.save(); c.strokeStyle = cor; c.lineWidth = 1;
    for (let k = 0; k < 36; k++) {
      c.beginPath();
      for (let a = 0; a <= Math.PI * 2 + .01; a += .05) {
        const rr = r * (.55 + .45 * Math.sin(a * 6 + k * .35));
        const x = cx + Math.cos(a + k * .09) * rr, y = cy + Math.sin(a + k * .09) * rr;
        a ? c.lineTo(x, y) : c.moveTo(x, y);
      }
      c.stroke();
    }
    c.restore();
  }
  function hash(s) { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
  function numeroLicenca() {
    const T = TIPOS[st.tipo];
    const n = String(hash(`${st.nome}|${st.sobrenome}|${st.nasc}|${st.tipo}`) % 1000000).padStart(6, "0");
    return `LL-${T.letra} ${new Date().getFullYear() % 100}-${n.slice(0, 3)} ${n.slice(3)}`;
  }
  const fmtData = d => d ? `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}` : "--/--/----";
  function datas() {
    const hoje = new Date();
    const exp = new Date(hoje.getFullYear() + 1, 2, 31); // temporadas vencem em 31 de março do ano seguinte
    return { iss: fmtData(hoje), exp: fmtData(exp) };
  }
  function campo(c, rotulo, valor, x, y, T, tam = 26, larg = 0) {
    c.fillStyle = T.cor; c.font = "700 13px 'Source Sans 3', Arial, sans-serif"; c.fillText(rotulo, x, y);
    c.fillStyle = "#14130f"; c.font = `700 ${tam}px 'Source Sans 3', Arial, sans-serif`;
    let v = String(valor || "—").toUpperCase();
    if (larg) while (c.measureText(v).width > larg && v.length > 3) v = v.slice(0, -2) + "…";
    c.fillText(v, x, y + tam + 2);
  }
  function microtexto(c, y, cor) {
    c.save(); c.fillStyle = cor; c.font = "700 10px 'Source Sans 3', Arial, sans-serif";
    const t = "SOUVENIR · NOT A VALID LICENSE · LOWEN LAKE COUNTY · ECHO RIDGE · ";
    let x = 10; while (x < W) { c.fillText(t, x, y); x += c.measureText(t).width; }
    c.restore();
  }

  /* ---------- FRENTE ---------- */
  async function desenharFrente(cv) {
    const T = TIPOS[st.tipo], c = cv.getContext("2d");
    const [arte, selo, pato] = await Promise.all([carregar(T.arte), carregar("img/marca/selo-fw.png"), carregar("img/licenca/pato.png")]);
    cv.width = W; cv.height = H;
    // fundo
    const g = c.createLinearGradient(0, 0, W, H); g.addColorStop(0, T.fundo); g.addColorStop(1, T.fundo2);
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    guilhoche(c, T);
    // arte de vida selvagem à direita, desvanecendo para a esquerda
    if (arte) {
      c.save(); arred(c, 560, 128, W - 560 - 22, 250, 14); c.clip();
      capa(c, arte, 560, 128, W - 582, 250, 1, 75, 45);
      const f = c.createLinearGradient(560, 0, 760, 0); f.addColorStop(0, T.fundo); f.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = f; c.fillRect(560, 128, 200, 250);
      c.restore();
    }
    // faixa do topo
    const fx2 = c.createLinearGradient(0, 0, W, 0); fx2.addColorStop(0, T.escura); fx2.addColorStop(1, T.cor);
    c.fillStyle = fx2; c.fillRect(0, 0, W, 112);
    c.fillStyle = T.destaque; c.fillRect(0, 112, W, 6);
    if (pato) c.drawImage(pato, 18, 8, 96, 96);
    c.fillStyle = "#fff"; c.font = "800 34px Fraunces, Georgia, serif"; c.fillText("LOWEN LAKE COUNTY", 124, 52);
    c.font = "700 17px 'Source Sans 3', Arial, sans-serif"; c.fillStyle = "rgba(255,255,255,.88)";
    c.fillText("FISH & WILDLIFE DEPARTMENT · ECHO RIDGE DISTRICT", 126, 84);
    c.textAlign = "right"; c.fillStyle = "#fff"; c.font = "800 34px 'Source Sans 3', Arial, sans-serif"; c.fillText(T.titulo, W - 26, 50);
    const ano = new Date().getFullYear();
    c.font = "700 17px 'Source Sans 3', Arial, sans-serif"; c.fillStyle = "rgba(255,255,255,.88)"; c.fillText(`SEASON ${ano}–${ano + 1}`, W - 26, 82);
    c.textAlign = "left";
    // foto
    c.save(); arred(c, 28, 140, 214, 272, 12); c.fillStyle = "#c9c2b0"; c.fill(); c.clip();
    if (foto) capa(c, foto, 28, 140, 214, 272, fz, fx, fy);
    else { c.fillStyle = "#9c947f"; c.beginPath(); c.arc(135, 245, 52, 0, 7); c.fill(); c.beginPath(); c.ellipse(135, 400, 95, 90, 0, Math.PI, 0); c.fill(); }
    c.restore();
    c.strokeStyle = T.escura; c.lineWidth = 3; arred(c, 28, 140, 214, 272, 12); c.stroke();
    // número
    c.fillStyle = T.cor; c.font = "700 13px 'Source Sans 3', Arial, sans-serif"; c.fillText("LICENSE NO.", 266, 152);
    c.fillStyle = "#b3261e"; c.font = "700 32px 'Courier New', monospace"; c.fillText(numeroLicenca(), 264, 184);
    // nome
    c.fillStyle = T.cor; c.font = "700 13px 'Source Sans 3', Arial, sans-serif"; c.fillText("NAME", 266, 216);
    c.fillStyle = "#14130f"; let tn = 34; const nomeTxt = `${(st.sobrenome || "LAST").toUpperCase()}, ${(st.nome || "FIRST").toUpperCase()}`;
    c.font = `800 ${tn}px 'Source Sans 3', Arial, sans-serif`;
    while (c.measureText(nomeTxt).width > 300 && tn > 18) { tn -= 2; c.font = `800 ${tn}px 'Source Sans 3', Arial, sans-serif`; }
    c.fillText(nomeTxt, 264, 252);
    const nasc = st.nasc ? fmtData(new Date(st.nasc + "T12:00")) : "--/--/----";
    campo(c, "DOB", nasc, 266, 282, T, 24);
    campo(c, "HGT", st.altura, 420, 282, T, 24);
    campo(c, "EYES", st.olhos, 500, 282, T, 24);
    campo(c, "ADDRESS", st.cidade, 266, 334, T, 22, 290);
    campo(c, "RESIDENCY", st.resid === "R" ? "RESIDENT" : "NON-RESIDENT", 266, 384, T, 22);
    const d = datas();
    campo(c, "ISSUED", d.iss, 266, 434, T, 22);
    c.save(); campo(c, "EXPIRES", d.exp, 420, 434, T, 22); c.restore();
    // permissões como selos
    let px = 28; const py = 440;
    c.font = "800 15px 'Source Sans 3', Arial, sans-serif";
    T.privs.filter(p => st.privs[st.tipo + p[0]] ?? p[2]).forEach(p => {
      const w = c.measureText(p[0]).width + 22;
      if (px + w > 250) return;
      c.fillStyle = T.cor; arred(c, px, py, w, 28, 6); c.fill();
      c.fillStyle = "#fff"; c.fillText(p[0], px + 11, py + 20); px += w + 6;
    });
    // assinatura
    c.strokeStyle = "rgba(20,19,15,.55)"; c.lineWidth = 1.5; c.beginPath(); c.moveTo(28, 556); c.lineTo(520, 556); c.stroke();
    c.fillStyle = "#1c2b5a"; c.font = "700 44px Caveat, 'Segoe Print', cursive";
    c.fillText(`${st.nome || ""} ${st.sobrenome || ""}`.trim() || " ", 40, 548);
    c.fillStyle = T.cor; c.font = "700 12px 'Source Sans 3', Arial, sans-serif"; c.fillText("LICENSEE SIGNATURE", 28, 574);
    // foto fantasma
    if (foto) {
      c.save(); c.globalAlpha = .28; c.filter = "grayscale(1)"; arred(c, 600, 400, 92, 118, 8); c.clip();
      capa(c, foto, 600, 400, 92, 118, fz, fx, fy); c.restore(); c.filter = "none";
    }
    // selo com efeito holográfico
    const sx = 850, sy = 488, sr = 92;
    roseta(c, sx, sy, sr + 12, T.linha.replace(".13", ".35"));
    if (selo) c.drawImage(selo, sx - sr, sy - sr, sr * 2, sr * 2);
    if (c.createConicGradient) {
      const h = c.createConicGradient(0.6, sx, sy);
      ["#ff6ad5", "#c774e8", "#94d0ff", "#8affc1", "#fff59d", "#ff6ad5"].forEach((cor, i) => h.addColorStop(i / 5, cor));
      c.save(); c.globalAlpha = .26; c.globalCompositeOperation = "overlay"; c.beginPath(); c.arc(sx, sy, sr + 4, 0, 7); c.fillStyle = h; c.fill(); c.restore();
    }
    c.save(); c.fillStyle = T.escura; c.font = "800 14px 'Source Sans 3', Arial, sans-serif"; c.textAlign = "center";
    c.fillText("OFFICIAL SOUVENIR", sx, sy + sr + 26); c.restore();
    // faixa de microtexto e borda
    c.fillStyle = T.escura; c.fillRect(0, H - 28, W, 28);
    microtexto(c, H - 10, "rgba(255,255,255,.75)");
    c.strokeStyle = T.escura; c.lineWidth = 2; c.strokeRect(1, 1, W - 2, H - 2);
  }

  /* ---------- VERSO ---------- */
  async function desenharVerso(cv) {
    const T = TIPOS[st.tipo], c = cv.getContext("2d");
    const [selo, emblema] = await Promise.all([carregar("img/marca/selo-fw.png"), carregar("img/marca/emblema.png")]);
    cv.width = W; cv.height = H;
    c.fillStyle = T.fundo; c.fillRect(0, 0, W, H);
    guilhoche(c, T);
    if (selo) { c.save(); c.globalAlpha = .08; c.drawImage(selo, W / 2 - 230, H / 2 - 230, 460, 460); c.restore(); }
    // cabeçalho
    c.fillStyle = T.escura; c.fillRect(0, 0, W, 54);
    c.fillStyle = "#fff"; c.font = "800 22px 'Source Sans 3', Arial, sans-serif"; c.fillText("CONDITIONS · REGULATIONS · PRIVILEGES", 24, 36);
    c.textAlign = "right"; c.font = "700 18px 'Courier New', monospace"; c.fillText(numeroLicenca(), W - 24, 35); c.textAlign = "left";
    // regras
    c.fillStyle = "#14130f"; c.font = "600 19px 'Source Sans 3', Arial, sans-serif";
    T.regras.forEach((r, i) => {
      c.fillStyle = T.cor; c.beginPath(); c.arc(32, 86 + i * 34, 5, 0, 7); c.fill();
      c.fillStyle = "#14130f";
      let s = r; while (c.measureText(s).width > 560 && s.length > 10) s = s.slice(0, -2);
      c.fillText(s === r ? r : s + "…", 46, 93 + i * 34);
    });
    // privilégios marcados
    c.fillStyle = T.cor; c.font = "700 13px 'Source Sans 3', Arial, sans-serif"; c.fillText("PRIVILEGES", 28, 280);
    c.font = "700 18px 'Source Sans 3', Arial, sans-serif";
    T.privs.forEach((p, i) => {
      const on = st.privs[st.tipo + p[0]] ?? p[2];
      const x = 28, y = 292 + i * 27;
      c.strokeStyle = T.escura; c.lineWidth = 2; c.strokeRect(x, y, 20, 20);
      if (on) { c.strokeStyle = T.cor; c.lineWidth = 3.5; c.beginPath(); c.moveTo(x + 4, y + 10); c.lineTo(x + 9, y + 16); c.lineTo(x + 17, y + 4); c.stroke(); }
      c.fillStyle = on ? "#14130f" : "rgba(20,19,15,.45)"; c.fillText(p[1].en.toUpperCase(), x + 30, y + 17);
    });
    // bloco da direita: lacres de caça ou registro de pesca
    const bx = 620, by = 74, bw = W - bx - 24, bh = 300;
    c.fillStyle = T.cor; c.font = "800 15px 'Source Sans 3', Arial, sans-serif"; c.fillText(T.blocoTitulo, bx, by + 2);
    c.setLineDash([8, 6]); c.strokeStyle = T.escura; c.lineWidth = 2;
    if (st.tipo === "caca") {
      ["DEER TAG 1", "DEER TAG 2", "TURKEY TAG"].forEach((tg, i) => {
        const y = by + 14 + i * 94;
        c.strokeRect(bx, y, bw, 82);
        c.save(); c.setLineDash([]); c.fillStyle = "#14130f"; c.font = "800 20px 'Source Sans 3', Arial, sans-serif"; c.fillText(tg, bx + 14, y + 30);
        c.font = "700 15px 'Courier New', monospace"; c.fillText(`#${(hash(st.nome + tg + st.nasc) % 900000 + 100000)}`, bx + 14, y + 56);
        c.font = "600 13px 'Source Sans 3', Arial, sans-serif"; c.fillStyle = T.cor; c.fillText("DATE ____  COUNTY ____", bx + 140, y + 56); c.restore();
      });
    } else {
      c.strokeRect(bx, by + 14, bw, bh - 30);
      c.save(); c.setLineDash([]); c.strokeStyle = "rgba(20,19,15,.3)"; c.lineWidth = 1;
      c.fillStyle = T.cor; c.font = "700 12px 'Source Sans 3', Arial, sans-serif";
      ["DATE", "WATER", "SPECIES", "QTY"].forEach((h, i) => c.fillText(h, bx + 12 + i * 92, by + 36));
      for (let r = 0; r < 7; r++) { const y = by + 50 + r * 31; c.beginPath(); c.moveTo(bx + 10, y); c.lineTo(bx + bw - 10, y); c.stroke(); }
      c.restore();
    }
    c.setLineDash([]);
    // código de barras decorativo a partir do número
    const num = numeroLicenca(); let x = 28; const yb = 412; let h = hash(num);
    c.fillStyle = "#14130f";
    while (x < 470) { h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0; const w = 2 + (h % 4); if ((h >> 3) & 1) c.fillRect(x, yb, w, 70); x += w + 1 + ((h >> 5) % 3); }
    c.font = "700 16px 'Courier New', monospace"; c.fillText(num.replace(/\s/g, ""), 28, yb + 90);
    // contato e assinatura da chefe
    c.fillStyle = "#14130f"; c.font = "600 15px 'Source Sans 3', Arial, sans-serif";
    c.fillText("Echo Ridge Ranger Station · SR-55, mile 14 · Radio ch. 16 · (555) 018-0055", 28, 540);
    c.fillStyle = "#1c2b5a"; c.font = "700 40px Caveat, 'Segoe Print', cursive"; c.fillText("Rosa Delgado", 640, 470);
    c.strokeStyle = "rgba(20,19,15,.55)"; c.lineWidth = 1.5; c.beginPath(); c.moveTo(620, 480); c.lineTo(W - 140, 480); c.stroke();
    c.fillStyle = T.cor; c.font = "700 12px 'Source Sans 3', Arial, sans-serif"; c.fillText("CHIEF RANGER · FISH & WILDLIFE", 620, 498);
    if (emblema) c.drawImage(emblema, W - 122, 396, 100, 100);
    // aviso de lembrança bem visível
    c.fillStyle = "#b3261e"; c.font = "800 15px 'Source Sans 3', Arial, sans-serif";
    c.fillText("SOUVENIR OF THE LOWEN LAKE UNIVERSE · NOT A VALID LICENSE · NOT AN OFFICIAL DOCUMENT", 28, 574);
    c.fillStyle = T.escura; c.fillRect(0, H - 28, W, 28);
    microtexto(c, H - 10, "rgba(255,255,255,.75)");
    c.strokeStyle = T.escura; c.lineWidth = 2; c.strokeRect(1, 1, W - 2, H - 2);
  }

  /* ---------- formulário ---------- */
  const raiz = $("#licencaArea");
  if (!raiz) return;
  function montar() {
    const T = TIPOS[st.tipo], L = lang();
    raiz.innerHTML = `
      <form class="licenca-form rola-y" id="licForm" autocomplete="off">
        <div class="lic-tipos" role="tablist">${Object.keys(TIPOS).map(k => `<button type="button" data-tipo="${k}" class="${k === st.tipo ? "ativo" : ""}" role="tab" aria-selected="${k === st.tipo}">${tx(k)}</button>`).join("")}</div>
        <fieldset><legend>${tx("foto")}</legend>
          <input type="file" id="licFoto" accept="image/*">
          <p class="miudo">${tx("fotoDica")}</p>
          <label>${tx("zoom")}<input type="range" id="licZoom" min="1" max="3" step=".05" value="${fz}"></label>
          <label>${tx("posX")}<input type="range" id="licX" min="0" max="100" value="${fx}"></label>
          <label>${tx("posY")}<input type="range" id="licY" min="0" max="100" value="${fy}"></label>
        </fieldset>
        <div class="lic-linha"><label>${tx("nome")}<input id="licNome" maxlength="20" value="${st.nome}"></label>
          <label>${tx("sobrenome")}<input id="licSobrenome" maxlength="22" value="${st.sobrenome}"></label></div>
        <div class="lic-linha"><label>${tx("nasc")}<input type="date" id="licNasc" value="${st.nasc}"></label>
          <label>${tx("altura")}<input id="licAltura" maxlength="6" value="${st.altura}"></label></div>
        <div class="lic-linha"><label>${tx("olhos")}<select id="licOlhos">${Object.entries(tx("olhosOp")).map(([k, v]) => `<option value="${k}" ${k === st.olhos ? "selected" : ""}>${v}</option>`).join("")}</select></label>
          <label>${tx("resid")}<select id="licResid"><option value="R" ${st.resid === "R" ? "selected" : ""}>${tx("residente")}</option><option value="N" ${st.resid === "N" ? "selected" : ""}>${tx("naoResidente")}</option></select></label></div>
        <label>${tx("cidade")}<input id="licCidade" maxlength="30" value="${st.cidade}"></label>
        <fieldset><legend>${tx("privilegios")}</legend>
          ${T.privs.map(p => `<label class="lic-check"><input type="checkbox" data-priv="${p[0]}" ${(st.privs[st.tipo + p[0]] ?? p[2]) ? "checked" : ""}> ${p[1][L]}</label>`).join("")}
        </fieldset>
        <p class="lic-aviso">${tx("aviso")}</p>
      </form>
      <div class="licenca-preview">
        <div class="lic-cartoes">
          <figure><canvas id="licFrente" width="${W}" height="${H}"></canvas><figcaption>${tx("frente")}</figcaption></figure>
          <figure><canvas id="licVerso" width="${W}" height="${H}"></canvas><figcaption>${tx("verso")}</figcaption></figure>
        </div>
        <div class="lic-botoes">
          <button type="button" class="botao" id="licBaixarF">↓ ${tx("baixarFrente")}</button>
          <button type="button" class="botao botao-linha" id="licBaixarV">↓ ${tx("baixarVerso")}</button>
          <button type="button" class="botao botao-linha" id="licImprimir">⎙ ${tx("imprimir")}</button>
        </div>
        <p class="miudo">${tx("dicaImpressao")}</p>
      </div>`;
    raiz.querySelectorAll("[data-tipo]").forEach(b => (b.onclick = () => { st.tipo = b.dataset.tipo; salvar(); montar(); }));
    const liga = (id, k) => $("#" + id).addEventListener("input", e => { st[k] = e.target.value; salvar(); desenhar(); });
    liga("licNome", "nome"); liga("licSobrenome", "sobrenome"); liga("licNasc", "nasc"); liga("licAltura", "altura");
    liga("licOlhos", "olhos"); liga("licResid", "resid"); liga("licCidade", "cidade");
    raiz.querySelectorAll("[data-priv]").forEach(cb => cb.addEventListener("change", () => { st.privs[st.tipo + cb.dataset.priv] = cb.checked; salvar(); desenhar(); }));
    $("#licZoom").oninput = e => { fz = +e.target.value; desenhar(); };
    $("#licX").oninput = e => { fx = +e.target.value; desenhar(); };
    $("#licY").oninput = e => { fy = +e.target.value; desenhar(); };
    $("#licFoto").onchange = e => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { const i = new Image(); i.onload = () => { foto = i; desenhar(); }; i.src = r.result; };
      r.readAsDataURL(f);
    };
    $("#licBaixarF").onclick = () => baixar($("#licFrente"), "frente");
    $("#licBaixarV").onclick = () => baixar($("#licVerso"), "verso");
    $("#licImprimir").onclick = imprimir;
    desenhar();
  }
  function salvar() { const { tipo, nome, sobrenome, nasc, cidade, altura, olhos, resid, privs } = st; guardar("er-licenca", { tipo, nome, sobrenome, nasc, cidade, altura, olhos, resid, privs }); }
  let pendente = 0;
  async function desenhar() {
    const meu = ++pendente;
    await Promise.all([document.fonts.load("800 34px Fraunces"), document.fonts.load("700 44px Caveat"), document.fonts.load("700 20px 'Source Sans 3'")]).catch(() => {});
    if (meu !== pendente) return;
    await desenharFrente($("#licFrente"));
    await desenharVerso($("#licVerso"));
  }
  function nomeArquivo(lado) { return `licenca-${st.tipo === "pesca" ? "pesca" : "caca"}-${(st.sobrenome || "echo-ridge").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${lado}.png`; }
  function baixar(cv, lado) {
    try {
      cv.toBlob(b => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = nomeArquivo(lado); document.body.appendChild(a); a.click(); a.remove(); });
    } catch (e) { alert(tx("erro")); }
  }
  function imprimir() {
    let f, v;
    try { f = $("#licFrente").toDataURL("image/png"); v = $("#licVerso").toDataURL("image/png"); } catch (e) { alert(tx("erro")); return; }
    let area = $("#licImpressao");
    if (!area) { area = document.createElement("div"); area.id = "licImpressao"; document.body.appendChild(area); }
    area.innerHTML = `<img src="${f}" alt=""><img src="${v}" alt="">`;
    const imgsP = [...area.querySelectorAll("img")];
    Promise.all(imgsP.map(i => i.decode().catch(() => {}))).then(() => window.print());
  }
  document.addEventListener("er-idioma", montar);
  montar();
})();
