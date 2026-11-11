// =====================================================================
//  LOWEN LAKE RESCUE — motor do jogo (canvas 1280x720)
// =====================================================================
const tela = document.getElementById('tela');
const ctx = tela.getContext('2d');
const W = 1280, H = 720;
const FONTE_T = '"Bangers", "Impact", sans-serif';
const FONTE = '"Rubik", "Segoe UI", sans-serif';

// ---------------------------------------------------------------- imagens
const SPR = {
  jim: 'sprites/jim', jane: 'sprites/jane', asha: 'sprites/asha', fatboy: 'sprites/fatboy',
  filhote_jacare: 'sprites/folhas/animais1_1', tartaruga: 'sprites/folhas/animais1_2',
  mordedora: 'sprites/folhas/animais1_3', guaxinim: 'sprites/folhas/animais1_4',
  guaxinim_albino: 'sprites/folhas/animais1_5', cobra: 'sprites/folhas/animais1_6',
  garca: 'sprites/folhas/animais1_7',
  lontra: 'sprites/folhas/animais2_1', pato: 'sprites/folhas/animais2_2',
  cisne: 'sprites/folhas/animais2_3', puma: 'sprites/folhas/animais2_4',
  aguia: 'sprites/folhas/animais2_5', urso: 'sprites/folhas/animais2_6',
  veado: 'sprites/folhas/animais2_7',
  satanas: 'sprites/folhas/perigos_1', viktor: 'sprites/folhas/perigos_2',
  trudy: 'sprites/folhas/perigos_3', benny: 'sprites/folhas/perigos_4',
  drone: 'sprites/folhas/perigos_5', cascavel: 'sprites/folhas/perigos_6',
  picape: 'sprites/folhas/props_1', caixa: 'sprites/folhas/props_2',
  latao: 'sprites/folhas/props_3', caixote: 'sprites/folhas/props_4', barril: 'sprites/folhas/props_5',
};
const cacheImg = {};
function img(caminho, ext) {
  const k = caminho + (ext || '');
  if (!cacheImg[k]) {
    const im = new Image();
    im.ok = false;
    im.onload = () => { im.ok = true; };
    im.onerror = () => { im.falhou = true; };
    im.src = 'img/' + caminho + (ext || '');
    cacheImg[k] = im;
  }
  return cacheImg[k];
}
const sprite = n => img(SPR[n] || ('sprites/' + n), '.png');
const cena = n => img('cenas/' + n, '.jpg');
const retrato = n => img('retratos/' + n, '.jpg');

function preCarregar() {
  img('capa', '.jpg');
  Object.keys(SPR).forEach(sprite);
  Object.values(FALANTES).forEach(f => f.retrato && retrato(f.retrato));
  FASES.forEach(f => { img(f.mapa, '.jpg'); [...f.intro, ...f.fim].forEach(c => cena(c.img)); });
  EPILOGO.forEach(c => cena(c.img));
}

// ---------------------------------------------------------------- entrada
const teclas = {};
const apertou = {};
addEventListener('keydown', e => {
  Som.iniciar();
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Tab'].includes(e.key)) e.preventDefault();
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (!teclas[k]) apertou[k] = true;
  teclas[k] = true;
});
addEventListener('keyup', e => { const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; teclas[k] = false; });
addEventListener('blur', () => { for (const k in teclas) teclas[k] = false; });
let clique = null;
tela.addEventListener('mousedown', e => {
  Som.iniciar();
  const r = tela.getBoundingClientRect();
  clique = { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height };
});
let mouse = { x: -1, y: -1 };
tela.addEventListener('mousemove', e => {
  const r = tela.getBoundingClientRect();
  mouse = { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height };
});
const usar = k => { if (apertou[k]) { apertou[k] = false; return true; } return false; };
const confirmar = () => usar('Enter') || usar(' ') || usar('z');

function ajustarTela() {
  const esc = Math.min(innerWidth / W, innerHeight / H);
  tela.style.width = Math.floor(W * esc) + 'px';
  tela.style.height = Math.floor(H * esc) + 'px';
}
addEventListener('resize', ajustarTela);
ajustarTela();

// ---------------------------------------------------------------- progresso salvo
let progresso = { liberadas: 1, estrelas: [0, 0, 0, 0, 0] };
try { const s = JSON.parse(localStorage.getItem('llr_progresso')); if (s && s.liberadas) progresso = s; } catch (e) {}
function salvarProgresso() { try { localStorage.setItem('llr_progresso', JSON.stringify(progresso)); } catch (e) {} }

// ---------------------------------------------------------------- utilidades
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const rnd = (a, b) => a + Math.random() * (b - a);
function texto(t, x, y, { tam = 24, cor = '#fff', fonte = FONTE, peso = '600', alin = 'left', base = 'alphabetic', contorno = 0, corContorno = '#000', italico = false } = {}) {
  ctx.font = `${italico ? 'italic ' : ''}${peso} ${tam}px ${fonte}`;
  ctx.textAlign = alin; ctx.textBaseline = base;
  if (contorno) { ctx.lineWidth = contorno; ctx.strokeStyle = corContorno; ctx.lineJoin = 'round'; ctx.strokeText(t, x, y); }
  ctx.fillStyle = cor; ctx.fillText(t, x, y);
}
function quebrar(t, larg, tam, fonte = FONTE, peso = '400') {
  ctx.font = `${peso} ${tam}px ${fonte}`;
  const palavras = t.split(' '); const linhas = []; let l = '';
  for (const p of palavras) {
    const tt = l ? l + ' ' + p : p;
    if (ctx.measureText(tt).width > larg && l) { linhas.push(l); l = p; } else l = tt;
  }
  if (l) linhas.push(l);
  return linhas;
}
function retArred(x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function desenharCover(im, x, y, w, h, zoom = 1, px = 0, py = 0) {
  if (!im || !im.ok) return false;
  const esc = Math.max(w / im.width, h / im.height) * zoom;
  const iw = im.width * esc, ih = im.height * esc;
  ctx.drawImage(im, x + (w - iw) / 2 + px * (iw - w) / 2, y + (h - ih) / 2 + py * (ih - h) / 2, iw, ih);
  return true;
}
function retratoCirculo(nome, x, y, r, borda) {
  const im = retrato(nome);
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.closePath();
  ctx.fillStyle = '#222'; ctx.fill(); ctx.clip();
  if (im.ok) ctx.drawImage(im, x - r, y - r, r * 2, r * 2);
  else texto((FALANTES[nome]?.nome || nome)[0], x, y + r * .35, { tam: r, alin: 'center', fonte: FONTE_T });
  ctx.restore();
  if (borda) { ctx.lineWidth = 4; ctx.strokeStyle = borda; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke(); }
}

// =====================================================================
//  MÁQUINA DE ESTADOS
// =====================================================================
let estado = 'titulo';
let tempoEstado = 0;
function mudar(e) { estado = e; tempoEstado = 0; for (const k in apertou) apertou[k] = false; clique = null; }

// ---------------------------------------------------------------- TÍTULO
const MENU = () => [T('jogar'), T('escolherFase'), T('comoJogar'), T('idioma')];
let menuSel = 0;
function titulo(dt) {
  Som.musica(5);
  const capa = img('capa', '.jpg');
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  const z = 1.04 + Math.sin(tempoEstado * .15) * .03;
  if (!desenharCover(capa, 0, 0, W, H, z)) { ctx.fillStyle = '#16301f'; ctx.fillRect(0, 0, W, H); }
  let g = ctx.createLinearGradient(0, 0, 0, 260); g.addColorStop(0, 'rgba(0,0,0,.75)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, 260);
  g = ctx.createLinearGradient(0, H - 260, 0, H); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.85)');
  ctx.fillStyle = g; ctx.fillRect(0, H - 260, W, 260);

  ctx.save(); ctx.translate(W / 2, 92); ctx.rotate(-0.025);
  texto('LOWEN LAKE', 0, 0, { tam: 104, fonte: FONTE_T, alin: 'center', cor: '#ffd23f', contorno: 12, peso: '400' });
  texto('RESCUE', 0, 70, { tam: 64, fonte: FONTE_T, alin: 'center', cor: '#e8458b', contorno: 10, peso: '400' });
  ctx.restore();
  texto(T('apresenta'), W / 2, 26, { tam: 16, alin: 'center', cor: '#d9c9a3', italico: true });

  // menu
  const y0 = 512;
  const itens = MENU();
  itens.forEach((m, i) => {
    const sel = i === menuSel;
    const y = y0 + i * 46;
    if (mouse.y > y - 30 && mouse.y < y + 10 && Math.abs(mouse.x - W / 2) < 160 && tempoEstado > .2) menuSel = i;
    texto((sel ? '▶ ' : '') + m + (sel ? ' ◀' : ''), W / 2, y, { tam: sel ? 40 : 32, fonte: FONTE_T, peso: '400', alin: 'center', cor: sel ? '#ffd23f' : '#fff', contorno: 6 });
  });
  texto(T('menuRodape'), W / 2, H - 14, { tam: 14, alin: 'center', cor: '#aaa' });

  if (usar('ArrowUp') || usar('w')) { menuSel = (menuSel + itens.length - 1) % itens.length; Som.sfx('menu'); }
  if (usar('ArrowDown') || usar('s')) { menuSel = (menuSel + 1) % itens.length; Som.sfx('menu'); }
  if (usar('l')) { aplicarIdioma(IDIOMA === 'pt' ? 'en' : 'pt'); Som.sfx('menu'); }
  let ok = confirmar();
  if (clique) { if (clique.y > y0 - 40 && clique.y < y0 + itens.length * 46) ok = true; clique = null; }
  if (ok) {
    Som.sfx('menu');
    if (menuSel === 0) iniciarFase(Math.min(progresso.liberadas, 5) - 1 === 0 ? 0 : 0, true);
    if (menuSel === 1) { selFase = Math.min(progresso.liberadas, 5) - 1; mudar('fases'); }
    if (menuSel === 2) mudar('ajuda');
    if (menuSel === 3) aplicarIdioma(IDIOMA === 'pt' ? 'en' : 'pt');
  }
}

// ---------------------------------------------------------------- ESCOLHER FASE
let selFase = 0;
function telaFases() {
  ctx.fillStyle = '#0b1210'; ctx.fillRect(0, 0, W, H);
  desenharCover(img('capa', '.jpg'), 0, 0, W, H, 1.1);
  ctx.fillStyle = 'rgba(5,10,8,.82)'; ctx.fillRect(0, 0, W, H);
  texto(T('tituloFases'), W / 2, 80, { tam: 64, fonte: FONTE_T, peso: '400', alin: 'center', cor: '#ffd23f', contorno: 8 });
  const lw = 220, gap = 20, x0 = (W - (lw * 5 + gap * 4)) / 2;
  FASES.forEach((f, i) => {
    const x = x0 + i * (lw + gap), y = 170, h = 380;
    const livre = i < progresso.liberadas;
    if (mouse.x > x && mouse.x < x + lw && mouse.y > y && mouse.y < y + h) selFase = i;
    const sel = i === selFase;
    ctx.save();
    retArred(x, y, lw, h, 14); ctx.fillStyle = '#111'; ctx.fill(); ctx.clip();
    const m = img(f.mapa, '.jpg');
    if (m.ok) { ctx.globalAlpha = livre ? 1 : .25; desenharCover(m, x, y, lw, h); ctx.globalAlpha = 1; }
    const g = ctx.createLinearGradient(0, y + h - 180, 0, y + h); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.95)');
    ctx.fillStyle = g; ctx.fillRect(x, y, lw, h);
    ctx.restore();
    ctx.lineWidth = sel ? 5 : 2; ctx.strokeStyle = sel ? '#ffd23f' : '#444'; retArred(x, y, lw, h, 14); ctx.stroke();
    texto(String(f.id), x + 20, y + 60, { tam: 60, fonte: FONTE_T, peso: '400', cor: livre ? '#fff' : '#555', contorno: 6 });
    const linhas = quebrar(f.titulo, lw - 30, 30, FONTE_T, '400');
    linhas.forEach((l, j) => texto(l, x + 15, y + h - 95 + j * 30 - (linhas.length - 1) * 30, { tam: 30, fonte: FONTE_T, peso: '400', cor: livre ? '#fff' : '#666' }));
    texto(f.local, x + 15, y + h - 58, { tam: 14, cor: '#bbb' });
    const est = progresso.estrelas[i] || 0;
    texto(livre ? '★★★'.slice(0, est) + '☆☆☆'.slice(0, 3 - est) : T('bloqueada'), x + 15, y + h - 22, { tam: livre ? 26 : 16, cor: '#ffd23f' });
  });
  texto(T('fasesRodape'), W / 2, 640, { tam: 18, alin: 'center', cor: '#aaa' });
  if (usar('ArrowLeft') || usar('a')) { selFase = (selFase + 4) % 5; Som.sfx('menu'); }
  if (usar('ArrowRight') || usar('d')) { selFase = (selFase + 1) % 5; Som.sfx('menu'); }
  let ok = confirmar();
  if (clique) { if (clique.y > 170 && clique.y < 550) ok = true; clique = null; }
  if (ok && selFase < progresso.liberadas) { Som.sfx('menu'); iniciarFase(selFase, true); }
  if (usar('Escape')) mudar('titulo');
}

// ---------------------------------------------------------------- COMO JOGAR
function telaAjuda() {
  ctx.fillStyle = '#0b1210'; ctx.fillRect(0, 0, W, H);
  desenharCover(img('capa', '.jpg'), 0, 0, W, H, 1.1);
  ctx.fillStyle = 'rgba(5,10,8,.88)'; ctx.fillRect(0, 0, W, H);
  texto(T('tituloAjuda'), W / 2, 74, { tam: 60, fonte: FONTE_T, peso: '400', alin: 'center', cor: '#ffd23f', contorno: 8 });
  const linhas = T('ajudaTeclas');
  linhas.forEach(([a, b], i) => { texto(a, 470, 140 + i * 34, { tam: 22, alin: 'right', cor: '#ffd23f', peso: '800' }); texto(b, 490, 140 + i * 34, { tam: 22 }); });
  texto(T('ajudaBichos'), W / 2, 300, { tam: 19, alin: 'center', cor: '#ddd' });
  const tipos = ['#e9f5db', HEROIS.jim.cor, HEROIS.jane.cor, HEROIS.asha.cor].map((c, i) => [c, ...T('ajudaTipos')[i]]);
  tipos.forEach(([cor, a, b], i) => {
    const x = 190 + i * 300, y = 370;
    ctx.lineWidth = 5; ctx.strokeStyle = cor; ctx.beginPath(); ctx.ellipse(x, y, 40, 14, 0, 0, Math.PI * 2); ctx.stroke();
    texto(a, x, y + 50, { tam: 20, alin: 'center', cor, peso: '800' });
    texto(b, x, y + 76, { tam: 16, alin: 'center', cor: '#bbb' });
  });
  ['jim', 'jane', 'asha'].forEach((h, i) => {
    const x = 120 + i * 360, y = 520;
    retratoCirculo(h, x, y, 38, HEROIS[h].cor);
    texto(`${HEROIS[h].nome} — ${HEROIS[h].habilidade}`, x + 50, y - 8, { tam: 22, cor: HEROIS[h].cor, peso: '800' });
    quebrar(HEROIS[h].desc, 270, 15).forEach((l, j) => texto(l, x + 50, y + 16 + j * 19, { tam: 15, cor: '#ccc', peso: '400' }));
  });
  texto(T('ajudaPerder'), W / 2, 640, { tam: 18, alin: 'center', cor: '#e88' });
  texto(T('ajudaRodape'), W / 2, 690, { tam: 16, alin: 'center', cor: '#888' });
  if (confirmar() || usar('Escape') || clique) { clique = null; mudar('titulo'); }
}

// =====================================================================
//  CUTSCENES (imagem estática + diálogo)
// =====================================================================
let cs = null; // { cenas, i, f, chars, aoFim, fade }
function tocarCutscene(cenas, aoFim, musica = 5) {
  cs = { cenas, i: 0, f: 0, chars: 0, aoFim, t: 0, saindo: 0, musica };
  mudar('cena');
}
function cutscene(dt) {
  Som.musica(cs.musica);
  const c = cs.cenas[cs.i];
  const fala = c.falas[cs.f];
  cs.t += dt;
  // imagem com efeito Ken Burns
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  const im = cena(c.img);
  const dur = 10 + c.falas.length * 3;
  const p = Math.min(cs.t / dur, 1);
  const z = 1.02 + p * 0.08;
  const dir = cs.i % 2 ? 1 : -1;
  if (!desenharCover(im, 0, 0, W, H, z, dir * (p - .5) * .8, -0.1)) {
    ctx.fillStyle = '#1b2a22'; ctx.fillRect(0, 0, W, H);
    texto('[ arte: ' + c.img + ' ]', W / 2, H / 2 - 80, { tam: 22, alin: 'center', cor: '#577' });
  }
  // fade de entrada
  if (cs.t < .6) { ctx.fillStyle = `rgba(0,0,0,${1 - cs.t / .6})`; ctx.fillRect(0, 0, W, H); }

  // caixa de diálogo
  const quem = FALANTES[fala[0]] || FALANTES.narrador;
  const narr = fala[0] === 'narrador';
  const bx = 40, by = H - 180, bw = W - 80, bh = 156;
  const g = ctx.createLinearGradient(0, H - 260, 0, H); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.7)');
  ctx.fillStyle = g; ctx.fillRect(0, H - 260, W, 260);
  retArred(bx, by, bw, bh, 16); ctx.fillStyle = 'rgba(12,12,14,.88)'; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = quem.cor; ctx.stroke();
  let tx = bx + 34;
  if (!narr && quem.retrato) {
    retratoCirculo(quem.retrato, bx + 90, by + 42, 76, quem.cor);
    tx = bx + 190;
    retArred(tx - 8, by - 22, Math.max(120, quem.nome.length * 16 + 30), 40, 10); ctx.fillStyle = quem.cor; ctx.fill();
    texto(quem.nome.toUpperCase(), tx + 8, by + 8, { tam: 28, fonte: FONTE_T, peso: '400', cor: '#111' });
  }
  const tam = narr ? 25 : 25;
  const linhas = quebrar(fala[1], bx + bw - tx - 40, tam, FONTE, narr ? '400' : '400');
  let resto = Math.floor(cs.chars);
  const totalChars = fala[1].length;
  linhas.forEach((l, j) => {
    const vis = l.slice(0, Math.max(0, resto)); resto -= l.length + 1;
    texto(vis, narr ? W / 2 : tx, by + 58 + j * 34 - (narr ? (linhas.length - 1) * 10 : 0) + (narr ? 6 : 0), { tam, peso: '400', cor: narr ? '#e8dcc0' : '#fff', alin: narr ? 'center' : 'left', italico: narr });
  });
  const antes = Math.floor(cs.chars);
  cs.chars = Math.min(totalChars, cs.chars + dt * 48);
  if (Math.floor(cs.chars) > antes && Math.floor(cs.chars) % 3 === 0) Som.sfx('texto');
  const pronto = cs.chars >= totalChars;
  if (pronto && Math.floor(tempoEstado * 2.5) % 2 === 0) texto('▼', bx + bw - 34, by + bh - 18, { tam: 22, cor: quem.cor });
  texto(T('cenaRodape'), W - 20, 28, { tam: 14, alin: 'right', cor: 'rgba(255,255,255,.55)' });
  // pontinhos de progresso
  cs.cenas.forEach((_, k) => { ctx.fillStyle = k === cs.i ? '#fff' : 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.arc(24 + k * 16, 24, 5, 0, 7); ctx.fill(); });

  let avancar = confirmar();
  if (clique) { avancar = true; clique = null; }
  if (usar('Escape')) { const f = cs.aoFim; cs = null; f(); return; }
  if (avancar) {
    if (!pronto) cs.chars = totalChars;
    else {
      cs.f++; cs.chars = 0;
      if (cs.f >= c.falas.length) {
        cs.f = 0; cs.i++; cs.t = 0;
        if (cs.i >= cs.cenas.length) { const f = cs.aoFim; cs = null; f(); return; }
      }
    }
  }
}

// =====================================================================
//  JOGO
// =====================================================================
let J = null; // estado da fase
let faseAtual = 0;

function iniciarFase(i, comIntro) {
  faseAtual = i;
  const f = FASES[i];
  if (comIntro) tocarCutscene(f.intro, () => { prepararFase(i); mudar('cartao'); });
  else { prepararFase(i); mudar('cartao'); }
}

function prepararFase(i) {
  const f = FASES[i];
  const m = img(f.mapa, '.jpg');
  const mw = m.ok ? m.width : 1536, mh = m.ok ? m.height : 1024;
  const herois = ['jim', 'jane', 'asha'].map((id, k) => ({
    id, x: f.inicio[0] + (k - 1) * 50, y: f.inicio[1] + (k === 1 ? 0 : 30), dir: 1, anim: 0, movendo: false,
    leva: null, dashT: 0, dashCd: 0, habCd: 0, preso: 0, inv: 0, ...HEROIS[id],
  }));
  J = {
    f, mw, mh, herois, ativo: 1, tempo: f.tempo, coracoes: 5, salvos: 0,
    cam: { x: 0, y: 0 },
    bichos: f.bichos.map(([tipo, x, y], k) => ({
      tipo, ...BICHOS[tipo], x, y, casa: { x, y }, alvo: null, estado: 'livre', calmo: 0, k,
      dir: 1, anim: Math.random() * 9, dicaT: 0, fugindo: false, treme: 0,
    })),
    perigos: f.perigos.map(([tipo, x, y, rota], k) => ({
      tipo, ...PERIGOS[tipo], x, y, rota, rp: 0, atord: 0, cd: 0, alvo: null, dir: 1, anim: 0, bote: 0, k,
    })),
    caminhao: { x: f.caminhao[0], y: f.caminhao[1] },
    particulas: [], textos: [], aneis: [], toast: null, toastT: 0, dicaT: 7,
    vagalumes: Array.from({ length: 40 }, () => ({ x: rnd(0, mw), y: rnd(0, mh), f: rnd(0, 9) })),
    nevoa: Array.from({ length: 14 }, () => ({ x: rnd(0, mw), y: rnd(0, mh), r: rnd(160, 320), v: rnd(8, 22) })),
    fim: false, fimT: 0,
    props: (f.props || []).map(([nome, x, y, alt]) => ({ nome, x, y, alt })),
  };
  J.solidos = [...f.solidos, ...J.props.map(p => [p.x - p.alt * .4, p.y - p.alt * .18, p.alt * .8, p.alt * .3])];
  // benny segue a trudy
  const trudy = J.perigos.find(p => p.tipo === 'trudy');
  J.perigos.filter(p => p.tipo === 'benny').forEach(b => b.chefe = trudy);
  centralizarCamera(1);
}

function avisar(msg, dur = 2.4) { J.toast = msg; J.toastT = dur; }
function flutuar(x, y, t, cor = '#fff') { J.textos.push({ x, y, t, cor, vida: 1.4 }); }
function explodir(x, y, cor, n = 14) {
  for (let i = 0; i < n; i++) J.particulas.push({ x, y, vx: rnd(-160, 160), vy: rnd(-220, -40), vida: rnd(.5, 1), cor });
}

// ---- colisão
function bloqueado(x, y, r = 14) {
  if (x < r || y < r + 20 || x > J.mw - r || y > J.mh - r) return true;
  for (const [rx, ry, rw, rh] of J.solidos) {
    if (x + r > rx && x - r < rx + rw && y + r * .5 > ry && y - r * .5 < ry + rh) return true;
  }
  return false;
}
function naAgua(x, y) {
  if (J.f.seco) for (const [rx, ry, rw, rh] of J.f.seco) if (x > rx && x < rx + rw && y > ry && y < ry + rh) return false;
  if (J.f.aguaTudo) return true;
  for (const [rx, ry, rw, rh] of J.f.agua) if (x > rx && x < rx + rw && y > ry && y < ry + rh) return true;
  return false;
}
function mover(o, dx, dy, r) {
  let bateu = false;
  if (!bloqueado(o.x + dx, o.y, r)) o.x += dx; else bateu = true;
  if (!bloqueado(o.x, o.y + dy, r)) o.y += dy; else bateu = true;
  return bateu;
}

function podePegar(h, b) {
  if (b.classe === 'leve') return true;
  if (b.classe === 'pesado') return h.id === 'jim';
  if (b.classe === 'arisco') return h.id === 'jane';
  if (b.classe === 'assustado') return b.calmo > 0;
  return true;
}

function ferir(h, p) {
  if (h.inv > 0) return;
  if (p.pequeno && h.id === 'jim') {           // Jim não se abala com perigo pequeno
    if (p.atord <= 0) { p.atord = 1.8; flutuar(h.x, h.y - 110, T('saiPraLa'), HEROIS.jim.cor); Som.sfx('empurrao'); empurrar(p, h, 140); }
    return;
  }
  if (p.prende) {
    h.preso = p.prende; h.inv = p.prende + 1; p.cd = 5; p.atord = 1.5;
    avisar(p.tipo === 'trudy' ? T('entrevistaTrudy') : T('entrevistaBenny'));
    Som.sfx('entrevista'); explodir(h.x, h.y - 60, '#fff', 10);
    J.tempo = Math.max(1, J.tempo - 4); flutuar(h.x, h.y - 120, '-4s', '#ffd23f');
    soltar(h);
    return;
  }
  J.coracoes -= p.dano; h.inv = 1.6; Som.sfx('dano');
  const a = Math.atan2(h.y - p.y, h.x - p.x);
  mover(h, Math.cos(a) * 60, Math.sin(a) * 60, 14);
  flutuar(h.x, h.y - 110, p.dano > 1 ? '-2 ♥' : '-1 ♥', '#ff5050');
  explodir(h.x, h.y - 50, '#ff5050', 10);
  soltar(h);
  if (p.tipo === 'fatboy') avisar(T('fatboy'));
  if (p.tipo === 'drone') avisar(T('drone'));
}
function soltar(h) {
  if (!h.leva) return;
  const b = h.leva; h.leva = null; b.estado = 'livre';
  b.x = h.x + rnd(-50, 50); b.y = h.y + rnd(20, 50);
  if (bloqueado(b.x, b.y)) { b.x = h.x; b.y = h.y; }
  b.calmo = 0; b.alvo = null;
}
function empurrar(p, de, forca) {
  const a = Math.atan2(p.y - de.y, p.x - de.x);
  if (p.voa) { p.x += Math.cos(a) * forca; p.y += Math.sin(a) * forca; }
  else for (let i = 0; i < 10; i++) mover(p, Math.cos(a) * forca / 10, Math.sin(a) * forca / 10, 14);
}

function centralizarCamera(k) {
  const h = J.herois[J.ativo];
  const tx = clamp(h.x - W / 2, 0, Math.max(0, J.mw - W)), ty = clamp(h.y - H / 2 - 30, 0, Math.max(0, J.mh - H));
  J.cam.x += (tx - J.cam.x) * k; J.cam.y += (ty - J.cam.y) * k;
}

function atualizarJogo(dt) {
  const h = J.herois[J.ativo];
  // troca de herói
  const trocar = i => { if (i !== J.ativo) { J.ativo = i; Som.sfx('troca'); flutuar(J.herois[i].x, J.herois[i].y - 120, J.herois[i].nome + '!', J.herois[i].cor); } };
  if (usar('1')) trocar(0); if (usar('2')) trocar(1); if (usar('3')) trocar(2);
  if (usar('Tab') || usar('q')) trocar((J.ativo + 1) % 3);

  J.tempo -= dt;
  J.dicaT -= dt;

  // ---- herói ativo
  let ix = 0, iy = 0;
  if (teclas.ArrowLeft || teclas.a) ix--; if (teclas.ArrowRight || teclas.d) ix++;
  if (teclas.ArrowUp || teclas.w) iy--; if (teclas.ArrowDown || teclas.s) iy++;
  const n = Math.hypot(ix, iy) || 1; ix /= n; iy /= n;
  if (h.preso > 0) { h.preso -= dt; ix = iy = 0; }
  if (h.dashT > 0) { h.dashT -= dt; if (!ix && !iy) { ix = h.dir; } }
  let vel = h.vel * (h.dashT > 0 ? 2.5 : 1) * (naAgua(h.x, h.y) ? 0.55 : 1) * (h.leva && h.leva.classe === 'pesado' ? .85 : 1);
  h.movendo = !!(ix || iy);
  if (h.movendo) { mover(h, ix * vel * dt, iy * vel * dt, 14); if (ix) h.dir = ix > 0 ? 1 : -1; h.anim += dt * vel / 22; }

  // habilidade
  if (usar(' ')) {
    if (h.id === 'jane' && h.dashCd <= 0) { h.dashT = .28; h.dashCd = 1.1; Som.sfx('dash'); explodir(h.x, h.y, '#c9b28a', 8); }
    else if (h.id === 'asha' && h.habCd <= 0) {
      h.habCd = 3.5; Som.sfx('riff'); J.aneis.push({ x: h.x, y: h.y - 40, r: 10, vida: 1, cor: HEROIS.asha.cor });
      let acalmou = 0;
      J.bichos.forEach(b => { if (b.estado === 'livre' && dist(b, h) < 260 && b.classe === 'assustado') { b.calmo = 12; acalmou++; flutuar(b.x, b.y - 60, '♥', '#ff8fb1'); } });
      J.perigos.forEach(p => { if (dist(p, h) < 260) { p.atord = 3; flutuar(p.x, p.y - p.alt - 10, '♪ ♫', '#fff'); } });
      if (acalmou) avisar(acalmou > 1 ? T('acalmaram', acalmou) : T('acalmou'));
    } else if (h.id === 'jim' && h.habCd <= 0) {
      h.habCd = 2.5; Som.sfx('empurrao'); J.aneis.push({ x: h.x, y: h.y - 20, r: 10, vida: .6, cor: HEROIS.jim.cor });
      J.perigos.forEach(p => { if (dist(p, h) < 130 && p.tipo !== 'fatboy') { p.atord = 2.5; empurrar(p, h, 120); } });
    }
  }
  J.herois.forEach(o => { o.dashCd -= dt; o.habCd -= dt; o.inv -= dt; });

  // ---- seguidores (fila indiana)
  const ordem = [J.ativo, ...[0, 1, 2].filter(i => i !== J.ativo)];
  for (let k = 1; k < 3; k++) {
    const s = J.herois[ordem[k]], alvo = J.herois[ordem[k - 1]];
    const d = dist(s, alvo);
    s.preso = 0;
    if (d > 62) {
      const v = Math.min(h.vel * 1.15, (d - 50) * 5) * dt;
      const dx = (alvo.x - s.x) / d * v, dy = (alvo.y - s.y) / d * v;
      if (mover(s, dx, dy, 10)) { s.x += dx * .5; s.y += dy * .5; s.x = clamp(s.x, 10, J.mw - 10); s.y = clamp(s.y, 30, J.mh - 10); }
      s.movendo = true; s.anim += v / 22; if (Math.abs(dx) > .3) s.dir = dx > 0 ? 1 : -1;
    } else s.movendo = false;
  }

  // ---- pegar bichos
  if (!h.leva && h.preso <= 0) {
    const alcance = h.id === 'jane' ? (h.dashT > 0 ? 70 : 50) : 40;
    for (const b of J.bichos) {
      if (b.estado !== 'livre') continue;
      if (Math.hypot(b.x - h.x, (b.y - h.y) * 1.3) < alcance + b.alt * .3) {
        if (podePegar(h, b)) {
          b.estado = 'levado'; h.leva = b; b.portador = h; Som.sfx('pegar');
          flutuar(h.x, h.y - 120, T('peguei'), '#bff');
          if (!J.primeiraPega) { J.primeiraPega = true; avisar(T('levePicape')); }
          break;
        } else if (b.dicaT <= 0) {
          b.dicaT = 2.5; avisar(DICA_TIPO[b.classe]); Som.sfx('negado');
        }
      }
    }
  }
  // ---- entregar na picape (qualquer herói)
  J.herois.forEach(o => {
    if (o.leva && Math.hypot(o.x - J.caminhao.x, o.y - J.caminhao.y) < 120) {
      const b = o.leva; o.leva = null; b.estado = 'salvo'; J.salvos++;
      Som.sfx('salvar'); explodir(J.caminhao.x, J.caminhao.y - 60, '#ffd23f', 22);
      flutuar(J.caminhao.x, J.caminhao.y - 130, T('salvo', b.nome), '#ffd23f');
      J.tempo += 5; flutuar(J.caminhao.x, J.caminhao.y - 100, '+5s', '#9f9');
    }
  });

  atualizarBichos(dt);
  atualizarPerigos(dt);

  // efeitos
  J.particulas.forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 500 * dt; p.vida -= dt; });
  J.particulas = J.particulas.filter(p => p.vida > 0);
  J.textos.forEach(t => { t.y -= 40 * dt; t.vida -= dt; }); J.textos = J.textos.filter(t => t.vida > 0);
  J.aneis.forEach(a => { a.r += 520 * dt; a.vida -= dt * 1.4; }); J.aneis = J.aneis.filter(a => a.vida > 0);
  J.toastT -= dt;
  J.nevoa.forEach(n => { n.x += n.v * dt; if (n.x - n.r > J.mw) n.x = -n.r; });

  centralizarCamera(Math.min(1, dt * 6));

  // fim de fase
  if (J.salvos >= J.bichos.length && !J.fim) { J.fim = 'vitoria'; J.fimT = 0; Som.sfx('vitoria'); }
  if ((J.coracoes <= 0 || J.tempo <= 0) && !J.fim) { J.fim = 'derrota'; J.fimT = 0; Som.sfx('derrota'); J.motivo = J.coracoes <= 0 ? T('machucaram') : T('tempoAcabou'); }
}

function atualizarBichos(dt) {
  const ativo = J.herois[J.ativo];
  for (const b of J.bichos) {
    b.anim += dt; b.dicaT -= dt; b.calmo -= dt;
    if (b.estado === 'levado') {
      const p = b.portador; b.x = p.x; b.y = p.y; b.dir = p.dir; continue;
    }
    if (b.estado !== 'livre') continue;
    // herói mais próximo
    let perto = null, dp = 1e9;
    J.herois.forEach(o => { const d = dist(o, b); if (d < dp) { dp = d; perto = o; } });
    b.fugindo = false; b.treme = 0;
    let vx = 0, vy = 0, v = b.vel;
    if (b.classe === 'arisco' && dp < 190) {
      const a = Math.atan2(b.y - perto.y, b.x - perto.x) + Math.sin(b.anim * 3) * .5;
      vx = Math.cos(a); vy = Math.sin(a); b.fugindo = true;
      // canto: tenta escapar pelos lados
      if (bloqueado(b.x + vx * 30, b.y + vy * 30)) { const a2 = a + (b.k % 2 ? 1.6 : -1.6); vx = Math.cos(a2); vy = Math.sin(a2); }
    } else if (b.classe === 'assustado' && b.calmo > 0) {
      const asha = J.herois.find(o => o.id === 'asha');
      const d = dist(asha, b);
      if (d > 70 && d < 420) { vx = (asha.x - b.x) / d; vy = (asha.y - b.y) / d; v = Math.max(b.vel, 70); }
    } else {
      if (b.classe === 'assustado' && dp < 220) b.treme = 1;
      if (!b.alvo || dist(b, b.alvo) < 8 || Math.random() < dt * .15) {
        const raio = b.classe === 'arisco' ? 140 : 70;
        b.alvo = { x: b.casa.x + rnd(-raio, raio), y: b.casa.y + rnd(-raio, raio) };
        if (Math.random() < .4) b.alvo = { x: b.x, y: b.y }; // às vezes fica parado
      }
      const d = dist(b, b.alvo) || 1; vx = (b.alvo.x - b.x) / d; vy = (b.alvo.y - b.y) / d; v = b.vel * .35;
      if (d < 4) vx = vy = 0;
    }
    if (vx || vy) {
      if (mover(b, vx * v * dt, vy * v * dt, 12)) b.alvo = null;
      if (Math.abs(vx) > .1) b.dir = vx > 0 ? 1 : -1;
      b.andando = true;
    } else b.andando = false;
  }
}

function atualizarPerigos(dt) {
  const h = J.herois[J.ativo];
  for (const p of J.perigos) {
    p.anim += dt; p.cd -= dt;
    if (p.atord > 0) { p.atord -= dt; continue; }
    let vx = 0, vy = 0, v = 0;
    const d = dist(p, h);
    if (p.tipo === 'satanas') {
      if (d < 330 && h.inv <= 0) { vx = (h.x - p.x) / d; vy = (h.y - p.y) / d; v = 168; }
      else v = 70;
    } else if (p.tipo === 'viktor') v = 205;
    else if (p.tipo === 'trudy') {
      if (d < 420 && p.cd <= 0 && h.inv <= 0) { vx = (h.x - p.x) / d; vy = (h.y - p.y) / d; v = 150; } else v = 60;
    } else if (p.tipo === 'benny') {
      const c = p.chefe; if (c) { const dc = dist(p, c); if (dc > 60) { vx = (c.x + 40 - p.x) / dc; vy = (c.y + 30 - p.y) / dc; v = 170; } }
      if (d < 120 && p.cd <= 0 && h.inv <= 0) { vx = (h.x - p.x) / d; vy = (h.y - p.y) / d; v = 150; }
    } else if (p.tipo === 'fatboy' || p.tipo === 'drone') {
      const r = p.rota; if (r) {
        const alvo = { x: r[p.rp][0], y: r[p.rp][1] };
        const da = dist(p, alvo);
        if (da < 10) p.rp = (p.rp + 1) % r.length;
        else { vx = (alvo.x - p.x) / da; vy = (alvo.y - p.y) / da; }
        v = p.tipo === 'fatboy' ? 48 : 115;
      }
    } else if (p.tipo === 'cascavel') {
      p.bote = Math.max(0, p.bote - dt);
      if (d < 85 && p.bote <= 0) p.bote = .5;
    }
    // vagando (sem direção definida)
    if (v && !vx && !vy) {
      if (!p.alvo || dist(p, p.alvo) < 10 || Math.random() < dt * .2) p.alvo = { x: clamp(p.x + rnd(-300, 300), 60, J.mw - 60), y: clamp(p.y + rnd(-250, 250), 80, J.mh - 60) };
      const da = dist(p, p.alvo) || 1; vx = (p.alvo.x - p.x) / da; vy = (p.alvo.y - p.y) / da;
    }
    if (v) {
      if (p.voa) { p.x += vx * v * dt; p.y += vy * v * dt; }
      else if (mover(p, vx * v * dt, vy * v * dt, p.tipo === 'fatboy' ? 30 : 14)) p.alvo = null;
      if (Math.abs(vx) > .1) p.dir = vx > 0 ? 1 : -1;
    }
    // contato
    if (h.inv <= 0) {
      if (p.tipo === 'drone') {
        const lx = p.x, ly = p.y + 90;
        if (Math.hypot(h.x - lx, (h.y - ly) * 1.6) < 75) ferir(h, p);
      } else if (p.tipo === 'cascavel') {
        if (p.bote > .2 && d < 70) ferir(h, p);
      } else if (p.tipo === 'fatboy') {
        if (Math.hypot(h.x - p.x, (h.y - p.y) * 2.2) < p.raio + 10) ferir(h, p);
      } else if (d < p.raio + 18) ferir(h, p);
    }
  }
}

// ---------------------------------------------------------------- desenho do jogo
function desenharSprite(nome, x, y, alt, { flip = false, bob = 0, rot = 0, alpha = 1, sombra = true, tint = null } = {}) {
  const im = sprite(nome);
  if (sombra) { ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.beginPath(); ctx.ellipse(x, y, alt * .32, alt * .09, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(x, y - bob); ctx.rotate(rot);
  if (im.ok) {
    const esc = alt / im.height, w = im.width * esc;
    if (flip) ctx.scale(-1, 1);
    ctx.drawImage(im, -w / 2, -alt, w, alt);
  } else {
    ctx.fillStyle = tint || '#888'; ctx.beginPath(); ctx.ellipse(0, -alt / 2, alt * .3, alt / 2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
    texto(nome.slice(0, 6), 0, -alt / 2 + 5, { tam: 12, alin: 'center', cor: '#fff', contorno: 3 });
  }
  ctx.restore();
}

function corDoTipo(t) { return t === 'pesado' ? HEROIS.jim.cor : t === 'arisco' ? HEROIS.jane.cor : t === 'assustado' ? HEROIS.asha.cor : '#e9f5db'; }

function desenharJogo() {
  const { cam } = J;
  ctx.fillStyle = '#16301f'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(-Math.round(cam.x), -Math.round(cam.y));
  const m = img(J.f.mapa, '.jpg');
  if (m.ok) ctx.drawImage(m, 0, 0, J.mw, J.mh);
  else {
    ctx.strokeStyle = 'rgba(255,255,255,.06)';
    for (let x = 0; x < J.mw; x += 64) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, J.mh); ctx.stroke(); }
    for (let y = 0; y < J.mh; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(J.mw, y); ctx.stroke(); }
  }
  if (DEPURAR) { ctx.fillStyle = 'rgba(255,0,0,.3)'; J.solidos.forEach(r => ctx.fillRect(...r)); ctx.fillStyle = 'rgba(0,120,255,.3)'; J.f.agua.forEach(r => ctx.fillRect(...r)); ctx.fillStyle = 'rgba(255,220,0,.25)'; (J.f.seco || []).forEach(r => ctx.fillRect(...r)); }

  // zona de entrega
  const c = J.caminhao, pulso = (Math.sin(tempoEstado * 4) + 1) / 2;
  ctx.strokeStyle = `rgba(255,210,63,${.4 + pulso * .5})`; ctx.lineWidth = 4; ctx.setLineDash([12, 10]);
  ctx.beginPath(); ctx.ellipse(c.x, c.y, 120, 50, 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);

  // drones: holofote no chão (antes de tudo)
  J.perigos.filter(p => p.tipo === 'drone').forEach(p => {
    const g = ctx.createRadialGradient(p.x, p.y + 90, 5, p.x, p.y + 90, 80);
    const a = p.atord > 0 ? .12 : .6;
    const fx = ctx.createLinearGradient(0, p.y - 80, 0, p.y + 90);
    fx.addColorStop(0, `rgba(255,255,220,${a * .05})`); fx.addColorStop(1, `rgba(255,255,220,${a * .35})`);
    ctx.fillStyle = fx; ctx.beginPath(); ctx.moveTo(p.x - 6, p.y - 80); ctx.lineTo(p.x + 6, p.y - 80);
    ctx.lineTo(p.x + 78, p.y + 90); ctx.lineTo(p.x - 78, p.y + 90); ctx.closePath(); ctx.fill();
    g.addColorStop(0, `rgba(255,255,220,${a})`); g.addColorStop(1, 'rgba(255,255,220,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(p.x, p.y + 90, 80, 50, 0, 0, Math.PI * 2); ctx.fill();
  });

  // lista de desenho ordenada por y
  const lista = [];
  lista.push({ y: c.y, f: () => desenharSprite('picape', c.x, c.y + 20, 150, { flip: false, tint: '#6b7a3a' }) });
  J.props.forEach(p => lista.push({ y: p.y, f: () => desenharSprite(p.nome, p.x, p.y, p.alt, { tint: '#865' }) }));
  J.bichos.forEach(b => {
    if (b.estado !== 'livre') return;
    lista.push({ y: b.y, f: () => {
      const cor = corDoTipo(b.classe);
      ctx.lineWidth = 3; ctx.strokeStyle = cor; ctx.globalAlpha = .9;
      ctx.beginPath(); ctx.ellipse(b.x, b.y, b.alt * .5 + 6, b.alt * .17 + 4, 0, 0, Math.PI * 2); ctx.stroke(); ctx.globalAlpha = 1;
      const tr = b.treme ? Math.sin(b.anim * 50) * 2 : 0;
      desenharSprite(b.tipo, b.x + tr, b.y, b.alt, { flip: b.dir < 0, bob: b.andando ? Math.abs(Math.sin(b.anim * 12)) * 3 : 0, sombra: false, tint: cor });
      if (b.classe === 'assustado' && b.calmo > 0) texto('♥', b.x, b.y - b.alt - 8 - Math.sin(b.anim * 4) * 3, { tam: 22, alin: 'center', cor: '#ff8fb1', contorno: 3 });
      else if (b.treme) texto('!', b.x, b.y - b.alt - 6, { tam: 26, alin: 'center', cor: '#fff', fonte: FONTE_T, peso: '400', contorno: 4 });
      else if (b.fugindo) texto('💨', b.x - b.dir * 30, b.y - 10, { tam: 18, alin: 'center' });
    }});
  });
  J.perigos.forEach(p => {
    lista.push({ y: p.voa ? p.y + 120 : p.y, f: () => {
      const at = p.atord > 0;
      let bob = 0, rot = 0;
      if (p.voa) bob = 70 + Math.sin(p.anim * 3) * 6;
      else if (p.tipo === 'fatboy') rot = Math.sin(p.anim * 2) * .02;
      else bob = Math.abs(Math.sin(p.anim * 10)) * 4;
      if (p.tipo === 'cascavel' && p.bote > 0) bob = 10;
      if (p.voa) { ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(p.x, p.y, 22, 7, 0, 0, 7); ctx.fill(); }
      desenharSprite(p.tipo, p.x, p.y, p.alt, { flip: p.dir < 0, bob, rot, sombra: !p.voa, alpha: at ? .75 : 1, tint: '#a33' });
      if (at) texto('✦ ✧ ✦', p.x, p.y - p.alt - bob - 8 + Math.sin(p.anim * 6) * 3, { tam: 16, alin: 'center', cor: '#ffe', contorno: 3 });
    }});
  });
  J.herois.forEach((o, i) => {
    lista.push({ y: o.y, f: () => {
      if (i === J.ativo) { ctx.strokeStyle = o.cor; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(o.x, o.y, 30, 10, 0, 0, Math.PI * 2); ctx.stroke(); }
      const pisca = o.inv > 0 && o.preso <= 0 && Math.floor(o.inv * 12) % 2 === 0;
      const bob = o.movendo ? Math.abs(Math.sin(o.anim)) * 5 : Math.sin(tempoEstado * 2 + i) * 1;
      const rot = o.movendo ? Math.sin(o.anim) * .05 : 0;
      if (o.dashT > 0) for (let k = 1; k <= 3; k++) desenharSprite(o.id, o.x - o.dir * k * 18, o.y, o.altura, { flip: o.dir < 0, alpha: .2, sombra: false, tint: o.cor });
      desenharSprite(o.id, o.x, o.y, o.altura, { flip: o.dir < 0, bob, rot, alpha: pisca ? .35 : 1, tint: o.cor });
      if (o.leva) desenharSprite(o.leva.tipo, o.x, o.y - o.altura - bob + 14, o.leva.alt * .95, { flip: o.dir < 0, sombra: false, rot: Math.sin(tempoEstado * 5) * .08, tint: '#ccc' });
      if (o.preso > 0) texto('📸', o.x + 30, o.y - o.altura - 4, { tam: 26, alin: 'center' });
      if (i === J.ativo && !o.leva) {
        texto('▼', o.x, o.y - o.altura - 8 - bob + Math.sin(tempoEstado * 6) * 3, { tam: 18, alin: 'center', cor: o.cor, contorno: 3 });
      }
    }});
  });
  lista.sort((a, b) => a.y - b.y).forEach(e => e.f());

  // anéis e partículas
  J.aneis.forEach(a => { ctx.globalAlpha = Math.max(0, a.vida); ctx.strokeStyle = a.cor; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(a.x, a.y, a.r, a.r * .6, 0, 0, 7); ctx.stroke(); ctx.globalAlpha = 1; });
  J.particulas.forEach(p => { ctx.globalAlpha = Math.max(0, p.vida); ctx.fillStyle = p.cor; ctx.fillRect(p.x - 3, p.y - 3, 6, 6); ctx.globalAlpha = 1; });

  // neblina
  if (J.f.neblina) {
    J.nevoa.forEach(n => { const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r); g.addColorStop(0, 'rgba(210,220,230,.28)'); g.addColorStop(1, 'rgba(210,220,230,0)'); ctx.fillStyle = g; ctx.fillRect(n.x - n.r, n.y - n.r, n.r * 2, n.r * 2); });
  }
  J.textos.forEach(t => texto(t.t, t.x, t.y, { tam: 22, alin: 'center', cor: t.cor, contorno: 4, fonte: FONTE, peso: '800' }));
  ctx.restore();

  // escuridão (Mossbend à noite)
  if (J.f.escuro) desenharEscuro();
  if (J.f.neblina) { ctx.fillStyle = 'rgba(20,30,50,.18)'; ctx.fillRect(0, 0, W, H); }

  setasForaDaTela();
  desenharHUD();
}

let telaEscura = null;
function desenharEscuro() {
  if (!telaEscura) { telaEscura = document.createElement('canvas'); telaEscura.width = W; telaEscura.height = H; }
  const e = telaEscura.getContext('2d');
  e.globalCompositeOperation = 'source-over';
  e.clearRect(0, 0, W, H); e.fillStyle = 'rgba(4,8,24,.86)'; e.fillRect(0, 0, W, H);
  e.globalCompositeOperation = 'destination-out';
  const luz = (x, y, r) => { const g = e.createRadialGradient(x, y, r * .2, x, y, r); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)'); e.fillStyle = g; e.beginPath(); e.arc(x, y, r, 0, 7); e.fill(); };
  J.herois.forEach((o, i) => luz(o.x - J.cam.x + o.dir * (i === J.ativo ? 40 : 0), o.y - J.cam.y - 30, i === J.ativo ? 260 : 120));
  luz(J.caminhao.x - J.cam.x, J.caminhao.y - J.cam.y - 40, 180);
  ctx.drawImage(telaEscura, 0, 0);
  // vagalumes e olhos no escuro
  J.vagalumes.forEach(v => {
    v.f += .016; const x = v.x - J.cam.x + Math.sin(v.f) * 20, y = v.y - J.cam.y + Math.cos(v.f * .7) * 14;
    const a = (Math.sin(v.f * 3) + 1) / 2;
    ctx.fillStyle = `rgba(220,255,120,${a * .8})`; ctx.beginPath(); ctx.arc(x, y, 2.5, 0, 7); ctx.fill();
  });
  // olhos amarelos dos bichos livres brilham no escuro
  J.bichos.forEach(b => { if (b.estado === 'livre') { const x = b.x - J.cam.x, y = b.y - J.cam.y - b.alt * .7; ctx.fillStyle = 'rgba(255,240,140,.85)'; ctx.fillRect(x - 6, y, 3, 3); ctx.fillRect(x + 3, y, 3, 3); } });
  J.perigos.forEach(p => { if (p.tipo === 'fatboy') { const x = p.x - J.cam.x + p.dir * 70, y = p.y - J.cam.y - 70; ctx.fillStyle = 'rgba(255,120,40,.9)'; ctx.beginPath(); ctx.arc(x - 8, y, 4, 0, 7); ctx.arc(x + 8, y, 4, 0, 7); ctx.fill(); } });
}

function setasForaDaTela() {
  const h = J.herois[J.ativo];
  const alvos = [];
  const algumLevando = J.herois.some(o => o.leva);
  if (algumLevando) alvos.push({ x: J.caminhao.x, y: J.caminhao.y, cor: '#ffd23f', ic: '🛻' });
  J.bichos.forEach(b => { if (b.estado === 'livre') alvos.push({ x: b.x, y: b.y - 20, cor: corDoTipo(b.classe) }); });
  alvos.forEach(a => {
    const sx = a.x - J.cam.x, sy = a.y - J.cam.y;
    if (sx > 0 && sx < W && sy > 70 && sy < H) return;
    const cx = W / 2, cy = H / 2 + 30;
    const ang = Math.atan2(sy - cy, sx - cx);
    const px = clamp(sx, 30, W - 30), py = clamp(sy, 100, H - 30);
    ctx.save(); ctx.translate(px, py); ctx.rotate(ang);
    ctx.fillStyle = a.cor; ctx.strokeStyle = '#000'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(14, 0); ctx.lineTo(-8, -9); ctx.lineTo(-8, 9); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
    if (a.ic) texto(a.ic, px - Math.cos(ang) * 26, py - Math.sin(ang) * 26 + 8, { tam: 22, alin: 'center' });
  });
}

function desenharHUD() {
  const g = ctx.createLinearGradient(0, 0, 0, 96); g.addColorStop(0, 'rgba(0,0,0,.75)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, 96);
  // heróis
  J.herois.forEach((o, i) => {
    const x = 44 + i * 92, y = 44, at = i === J.ativo;
    ctx.globalAlpha = at ? 1 : .6;
    retratoCirculo(o.id, x, y, at ? 32 : 26, at ? o.cor : '#555');
    ctx.globalAlpha = 1;
    texto(String(i + 1), x - 26, y + 30, { tam: 18, fonte: FONTE_T, peso: '400', cor: '#fff', contorno: 4 });
    // recarga da habilidade
    const cd = o.id === 'jane' ? o.dashCd / 1.1 : o.habCd / (o.id === 'asha' ? 3.5 : 2.5);
    if (cd > 0) { ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, (at ? 32 : 26) + 5, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (1 - cd)); ctx.stroke(); }
    if (o.leva) { desenharSprite(o.leva.tipo, x + 24, y + 30, 26, { sombra: false, tint: '#ccc' }); }
  });
  texto(T('espaco', J.herois[J.ativo].habilidade), 18, 108, { tam: 15, cor: J.herois[J.ativo].cor, contorno: 3, peso: '800' });
  // título + tempo
  texto(`${T('fase')} ${J.f.id} · ${J.f.titulo.toUpperCase()}`, W / 2, 30, { tam: 26, fonte: FONTE_T, peso: '400', alin: 'center', cor: '#fff', contorno: 5 });
  const t = Math.max(0, Math.ceil(J.tempo));
  const urg = J.tempo < 20;
  texto(`⏱ ${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`, W / 2, 68, { tam: urg ? 34 + Math.sin(tempoEstado * 10) * 3 : 30, fonte: FONTE_T, peso: '400', alin: 'center', cor: urg ? '#ff5050' : '#ffd23f', contorno: 5 });
  // corações
  for (let i = 0; i < 5; i++) texto(i < J.coracoes ? '♥' : '♡', W - 30 - i * 30, 38, { tam: 30, alin: 'center', cor: i < J.coracoes ? '#ff4d6d' : '#666', contorno: 4 });
  // bichos
  const n = J.bichos.length;
  J.bichos.forEach((b, i) => {
    const x = W - 34 - (n - 1 - i) * 40, y = 84;
    ctx.globalAlpha = b.estado === 'salvo' ? 1 : .35;
    desenharSprite(b.tipo, x, y, 30, { sombra: false, tint: corDoTipo(b.classe) });
    ctx.globalAlpha = 1;
    if (b.estado === 'salvo') texto('✔', x + 12, y - 2, { tam: 16, cor: '#7f7', contorno: 3 });
  });
  texto(T('salvos', J.salvos, n), W - 20 - n * 40, 82, { tam: 17, alin: 'right', cor: '#fff', contorno: 4, peso: '800' });
  // dica inicial e avisos
  if (J.dicaT > 0) {
    ctx.globalAlpha = Math.min(1, J.dicaT);
    const l = quebrar(J.f.dica, 700, 20);
    retArred(W / 2 - 380, H - 70 - l.length * 26, 760, 30 + l.length * 26, 12); ctx.fillStyle = 'rgba(0,0,0,.7)'; ctx.fill();
    l.forEach((s, i) => texto(s, W / 2, H - 46 - (l.length - 1 - i) * 26 - 8, { tam: 20, alin: 'center', cor: '#ffd23f', peso: '600' }));
    ctx.globalAlpha = 1;
  } else if (J.toastT > 0) {
    ctx.globalAlpha = Math.min(1, J.toastT * 2);
    ctx.font = `600 22px ${FONTE}`; const w = ctx.measureText(J.toast).width + 40;
    retArred(W / 2 - w / 2, H - 76, w, 44, 12); ctx.fillStyle = 'rgba(0,0,0,.75)'; ctx.fill();
    texto(J.toast, W / 2, H - 46, { tam: 22, alin: 'center', cor: '#fff' });
    ctx.globalAlpha = 1;
  }
  texto(Som.mudo ? '🔇 M' : '🔊 M', W - 14, H - 12, { tam: 14, alin: 'right', cor: 'rgba(255,255,255,.5)' });
}

// ---------------------------------------------------------------- estados do jogo
function cartao(dt) {
  Som.musica(FASES[faseAtual].musica);
  const f = FASES[faseAtual];
  desenharJogo();
  ctx.fillStyle = `rgba(0,0,0,${tempoEstado < 2.2 ? .65 : .65 * Math.max(0, 1 - (tempoEstado - 2.2) / .5)})`; ctx.fillRect(0, 0, W, H);
  if (tempoEstado < 2.4) {
    const s = Math.min(1, tempoEstado * 3);
    ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(s, s); ctx.rotate(-.03);
    texto(`${T('fase')} ${f.id}`, 0, -70, { tam: 46, fonte: FONTE_T, peso: '400', alin: 'center', cor: '#e8458b', contorno: 8 });
    texto(f.titulo.toUpperCase(), 0, 10, { tam: 86, fonte: FONTE_T, peso: '400', alin: 'center', cor: '#ffd23f', contorno: 10 });
    texto(f.local, 0, 60, { tam: 24, alin: 'center', cor: '#fff', contorno: 4, italico: true });
    ctx.restore();
  }
  if (tempoEstado > 2.7 || (tempoEstado > .5 && confirmar())) mudar('jogo');
}

let DEPURAR = false;
function jogo(dt) {
  if (usar('p') || usar('Escape')) { mudar('pausa'); return; }
  if (usar('F2')) DEPURAR = !DEPURAR;
  if (!J.fim) atualizarJogo(dt);
  else {
    J.fimT += dt;
    J.particulas.forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 500 * dt; p.vida -= dt; });
    J.textos.forEach(t => { t.y -= 40 * dt; t.vida -= dt; });
  }
  desenharJogo();
  if (DEPURAR) { const h = J.herois[J.ativo]; texto(`x ${Math.round(h.x)}  y ${Math.round(h.y)}`, 20, H - 20, { tam: 18, cor: '#0ff', contorno: 3 }); }
  if (J.fim && J.fimT > 1.2) {
    if (J.fim === 'vitoria') {
      const sobra = J.tempo / J.f.tempo;
      J.estrelas = 1 + (sobra > .25 ? 1 : 0) + (sobra > .45 && J.coracoes >= 4 ? 1 : 0);
      progresso.estrelas[faseAtual] = Math.max(progresso.estrelas[faseAtual] || 0, J.estrelas);
      progresso.liberadas = Math.max(progresso.liberadas, Math.min(5, faseAtual + 2));
      salvarProgresso();
      mudar('vitoria');
    } else mudar('derrota');
  }
}

function painel(titulo, cor, linhas, rodape) {
  ctx.fillStyle = 'rgba(0,0,0,.7)'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(W / 2, H / 2 - 120); const s = Math.min(1, .5 + tempoEstado * 2); ctx.scale(s, s); ctx.rotate(-.025);
  texto(titulo, 0, 0, { tam: 92, fonte: FONTE_T, peso: '400', alin: 'center', cor, contorno: 10 });
  ctx.restore();
  linhas.forEach((l, i) => texto(l, W / 2, H / 2 + i * 40, { tam: 26, alin: 'center', cor: '#fff', contorno: 4 }));
  if (rodape) texto(rodape, W / 2, H - 60, { tam: 20, alin: 'center', cor: '#ffd23f', contorno: 4 });
}

function vitoria() {
  desenharJogo();
  const e = J.estrelas;
  painel(T('vitoria'), '#ffd23f', [T('resumo', J.salvos, Math.ceil(J.tempo), J.coracoes)], T('continuar'));
  for (let i = 0; i < 3; i++) {
    const s = clamp((tempoEstado - .4 - i * .3) * 4, 0, 1);
    if (s <= 0) continue;
    if (s >= 1 && !J['som' + i] && i < e) { J['som' + i] = true; Som.sfx('pegar'); }
    ctx.save(); ctx.translate(W / 2 + (i - 1) * 110, H / 2 + 110); ctx.scale(s * 1.2, s * 1.2);
    texto('★', 0, 30, { tam: 90, alin: 'center', cor: i < e ? '#ffd23f' : '#444', contorno: 6 });
    ctx.restore();
  }
  if (tempoEstado > 1.2 && (confirmar() || clique)) {
    clique = null;
    const f = FASES[faseAtual];
    tocarCutscene(f.fim, () => {
      if (faseAtual < FASES.length - 1) iniciarFase(faseAtual + 1, true);
      else tocarCutscene(EPILOGO, () => mudar('creditos'), 5);
    }, f.musica);
  }
}

function derrota() {
  desenharJogo();
  painel(T('derrota'), '#ff5050', [J.motivo, T('precisam')], T('derrotaRodape'));
  if (tempoEstado > .8 && (confirmar() || clique)) { clique = null; prepararFase(faseAtual); mudar('cartao'); }
  if (usar('Escape')) mudar('titulo');
}

function pausa() {
  desenharJogo();
  painel(T('pausa'), '#fff', [T('pausa1'), T('pausa2')], null);
  if (usar('p') || usar('Escape') || confirmar()) mudar('jogo');
  if (usar('r')) { prepararFase(faseAtual); mudar('cartao'); }
  if (usar('q')) mudar('titulo');
}

function creditos() {
  Som.musica(5);
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = .35; desenharCover(img('capa', '.jpg'), 0, 0, W, H, 1.05); ctx.globalAlpha = 1;
  const y0 = H + 40 - tempoEstado * 55;
  CREDITOS.forEach((l, i) => texto(l, W / 2, y0 + i * 52, { tam: i === 0 ? 72 : 30, fonte: i === 0 ? FONTE_T : FONTE, peso: i === 0 ? '400' : '600', alin: 'center', cor: i === 0 ? '#ffd23f' : '#fff', contorno: 5 }));
  if (y0 + CREDITOS.length * 52 < -20 || (tempoEstado > 1 && (confirmar() || usar('Escape') || clique))) { clique = null; mudar('titulo'); }
}

// ---------------------------------------------------------------- laço principal
let ultimo = performance.now();
function quadro(agora) {
  const dt = Math.min(0.05, (agora - ultimo) / 1000); ultimo = agora;
  tempoEstado += dt;
  if (usar('m')) Som.alternarMudo();
  ctx.setLineDash([]); ctx.globalAlpha = 1;
  switch (estado) {
    case 'titulo': titulo(dt); break;
    case 'fases': telaFases(); break;
    case 'ajuda': telaAjuda(); break;
    case 'cena': cutscene(dt); break;
    case 'cartao': cartao(dt); break;
    case 'jogo': jogo(dt); break;
    case 'vitoria': vitoria(); break;
    case 'derrota': derrota(); break;
    case 'pausa': pausa(); break;
    case 'creditos': creditos(); break;
  }
  clique = null;
  requestAnimationFrame(quadro);
}
preCarregar();
(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(quadro));
tela.focus();
