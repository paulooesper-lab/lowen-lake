// =====================================================================
//  Som: efeitos e trilha punk feitos na hora com WebAudio (sem arquivos)
// =====================================================================
const Som = (() => {
  let ac = null, mestre = null, musicaGanho = null, mudo = false;
  let seqTimer = null, passo = 0, proxTempo = 0, faixaAtual = -1;

  function iniciar() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
    try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    mestre = ac.createGain(); mestre.gain.value = mudo ? 0 : 0.8; mestre.connect(ac.destination);
    musicaGanho = ac.createGain(); musicaGanho.gain.value = 0.32; musicaGanho.connect(mestre);
  }

  function env(g, t, a, d, pico) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(pico, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }
  function osc(tipo, freq, t, dur, vol, destino, freqFim) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = tipo; o.frequency.setValueAtTime(freq, t);
    if (freqFim) o.frequency.exponentialRampToValueAtTime(freqFim, t + dur);
    env(g, t, 0.005, dur, vol); o.connect(g); g.connect(destino || mestre);
    o.start(t); o.stop(t + dur + 0.05);
  }
  let ruidoBuf = null;
  function ruido(t, dur, vol, filtroFreq, destino) {
    if (!ruidoBuf) {
      ruidoBuf = ac.createBuffer(1, ac.sampleRate * 0.5, ac.sampleRate);
      const d = ruidoBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const s = ac.createBufferSource(), g = ac.createGain(), f = ac.createBiquadFilter();
    s.buffer = ruidoBuf; f.type = 'highpass'; f.frequency.value = filtroFreq;
    env(g, t, 0.002, dur, vol); s.connect(f); f.connect(g); g.connect(destino || mestre);
    s.start(t); s.stop(t + dur + 0.05);
  }
  let distCurva = null;
  function guitarra(freqs, t, dur, vol, destino) {
    if (!distCurva) {
      distCurva = new Float32Array(1024);
      for (let i = 0; i < 1024; i++) { const x = i / 512 - 1; distCurva[i] = Math.tanh(x * 6); }
    }
    const ws = ac.createWaveShaper(); ws.curve = distCurva;
    const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2400;
    const g = ac.createGain(); env(g, t, 0.01, dur, vol);
    ws.connect(lp); lp.connect(g); g.connect(destino || mestre);
    freqs.forEach(f => {
      const o = ac.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f;
      o.detune.value = (Math.random() - .5) * 12;
      const og = ac.createGain(); og.gain.value = 0.3;
      o.connect(og); og.connect(ws); o.start(t); o.stop(t + dur + 0.05);
    });
  }

  const SFX = {
    pegar()   { const t = ac.currentTime; osc('square', 520, t, .08, .15); osc('square', 780, t + .07, .1, .15); },
    salvar()  { const t = ac.currentTime; [523, 659, 784, 1047].forEach((f, i) => osc('triangle', f, t + i * .07, .18, .22)); },
    negado()  { const t = ac.currentTime; osc('square', 180, t, .12, .12); osc('square', 140, t + .1, .14, .12); },
    dano()    { const t = ac.currentTime; osc('sawtooth', 300, t, .3, .25, null, 60); ruido(t, .15, .2, 800); },
    dash()    { const t = ac.currentTime; ruido(t, .18, .18, 2500); osc('sine', 300, t, .15, .1, null, 900); },
    riff()    { const t = ac.currentTime; const r = 82.4;
                guitarra([r, r * 1.5, r * 2], t, .22, .35); guitarra([r * 1.19, r * 1.78, r * 2.38], t + .22, .22, .35);
                guitarra([r * 1.33, r * 2, r * 2.67], t + .44, .5, .4); },
    empurrao(){ const t = ac.currentTime; osc('sine', 120, t, .2, .4, null, 50); ruido(t, .08, .2, 400); },
    troca()   { const t = ac.currentTime; osc('triangle', 880, t, .06, .12); },
    texto()   { const t = ac.currentTime; osc('square', 900 + Math.random() * 200, t, .02, .03); },
    menu()    { const t = ac.currentTime; osc('triangle', 660, t, .07, .15); },
    vitoria() { const t = ac.currentTime; [392, 523, 659, 784, 659, 784, 1047].forEach((f, i) => osc('square', f, t + i * .11, .2, .14)); },
    derrota() { const t = ac.currentTime; [392, 349, 311, 262].forEach((f, i) => osc('triangle', f, t + i * .22, .3, .2)); },
    entrevista() { const t = ac.currentTime; ruido(t, .05, .3, 3000); osc('sine', 1800, t, .1, .1); },
  };

  // ------- trilha: 5 faixas (uma por fase) + menu -------
  // cada faixa: bpm, sequência de tônicas (em Hz) por compasso, estilo
  const FAIXAS = [
    { bpm: 168, notas: [82.4, 82.4, 98, 110], },          // 1 punk alegre (E E G A)
    { bpm: 176, notas: [110, 110, 130.8, 98], },          // 2 bar caótico
    { bpm: 120, notas: [73.4, 73.4, 87.3, 65.4], meio: true }, // 3 pântano noturno
    { bpm: 160, notas: [98, 130.8, 110, 146.8], },        // 4 festival
    { bpm: 140, notas: [82.4, 87.3, 82.4, 77.8], meio: true }, // 5 Echo Ridge tenso
    { bpm: 150, notas: [82.4, 110, 98, 73.4], },          // 5 = menu/cenas
  ];

  function tocarPasso(f, t) {
    const sem = 60 / f.bpm / 2;               // colcheia
    const compasso = Math.floor(passo / 8) % f.notas.length;
    const raiz = f.notas[compasso];
    const p = passo % 8;
    // bateria
    if (f.meio) {
      if (p === 0) osc('sine', 110, t, .25, .9, musicaGanho, 40);
      if (p === 4) ruido(t, .12, .35, 1500, musicaGanho);
      if (p % 2 === 0) ruido(t, .03, .12, 7000, musicaGanho);
    } else {
      if (p === 0 || p === 3 || p === 5) osc('sine', 120, t, .18, .9, musicaGanho, 45);
      if (p === 2 || p === 6) ruido(t, .12, .4, 1200, musicaGanho);
      ruido(t, .025, .1, 8000, musicaGanho);
    }
    // baixo em colcheias
    osc('sawtooth', raiz, t, sem * .9, f.meio ? .16 : .2, musicaGanho);
    // power chord no começo do compasso
    if (!f.meio && (p === 0 || p === 4)) guitarra([raiz * 2, raiz * 3], t, sem * 3.5, .09, musicaGanho);
    if (f.meio && p === 0 && compasso % 2 === 0) osc('triangle', raiz * 4, t, sem * 6, .05, musicaGanho);
  }

  function agendar() {
    if (!ac || faixaAtual < 0) return;
    const f = FAIXAS[faixaAtual];
    const sem = 60 / f.bpm / 2;
    while (proxTempo < ac.currentTime + 0.15) {
      tocarPasso(f, proxTempo);
      proxTempo += sem; passo++;
    }
  }

  return {
    iniciar,
    sfx(nome) { if (!ac || mudo) return; try { SFX[nome] && SFX[nome](); } catch (e) {} },
    musica(i) {
      if (!ac) return;
      if (i === faixaAtual) return;
      faixaAtual = i; passo = 0; proxTempo = ac.currentTime + 0.05;
      if (!seqTimer) seqTimer = setInterval(agendar, 50);
    },
    pararMusica() { faixaAtual = -1; },
    alternarMudo() {
      mudo = !mudo;
      if (mestre) mestre.gain.setTargetAtTime(mudo ? 0 : 0.8, ac.currentTime, 0.05);
      return mudo;
    },
    get mudo() { return mudo; },
  };
})();
