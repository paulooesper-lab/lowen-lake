// =====================================================================
//  IDIOMA — Português (pt) / English (en)
//  Textos da interface em UI; textos do roteiro em inglês em EN_DADOS.
//  Os textos em português continuam em dados.js (são copiados ao iniciar).
// =====================================================================
let IDIOMA = 'pt';
try {
  const daUrl = new URLSearchParams(location.search).get('lang');
  if (daUrl === 'pt' || daUrl === 'en') localStorage.setItem('llr_idioma', daUrl);
} catch (e) {}
try {
  const salvo = localStorage.getItem('llr_idioma');
  if (salvo === 'pt' || salvo === 'en') IDIOMA = salvo;
  else IDIOMA = /^pt/i.test(navigator.language || 'pt') ? 'pt' : 'en';
} catch (e) {}

const UI = {
  pt: {
    apresenta: 'Turtles & Gators Rescue apresenta',
    jogar: 'Jogar', escolherFase: 'Escolher fase', comoJogar: 'Como jogar', idioma: 'Idioma: Português',
    menuRodape: 'Setas / mouse para escolher · ENTER confirma · L troca o idioma · M liga/desliga o som',
    tituloFases: 'ESCOLHER FASE', bloqueada: '🔒 bloqueada', fasesRodape: 'ENTER joga · ESC volta',
    tituloAjuda: 'COMO JOGAR',
    ajudaTeclas: [['WASD / setas', 'andar'], ['1 · 2 · 3  (ou TAB)', 'trocar entre Jim, Jane e Asha'],
                  ['ESPAÇO', 'habilidade do herói ativo'], ['P / ESC', 'pausa']],
    ajudaBichos: 'Encoste num bicho para pegá-lo e leve até a PICAPE. A cor do anel embaixo do bicho diz quem consegue:',
    ajudaTipos: [['Qualquer um', 'leve'], ['Só o JIM (1)', 'pesado'], ['Só a JANE (2)', 'arisco, foge de você'], ['Riff da ASHA (3)', 'assustado: acalme antes']],
    ajudaPerder: 'Perder todos os corações ou estourar o tempo = tentar de novo.',
    ajudaRodape: 'ENTER / ESC volta',
    cenaRodape: 'ESPAÇO/clique avança · ESC pula',
    saiPraLa: 'Sai pra lá!',
    entrevistaTrudy: 'ENTREVISTA! Trudy: "Sorria pro Gazette!"', entrevistaBenny: 'Benny: "Só mais um take!"',
    fatboy: 'O Fat Boy não gosta de visita!', drone: 'Pego pelo holofote da Área 52!',
    acalmaram: n => `${n} bichos se acalmaram!`, acalmou: 'Ele se acalmou! Agora qualquer um pode pegar.',
    peguei: 'Peguei!', levePicape: 'Agora leve até a picape!', salvo: nome => `${nome} salvo!`,
    machucaram: 'Os heróis se machucaram demais.', tempoAcabou: 'O tempo acabou!',
    espaco: hab => `ESPAÇO: ${hab}`, fase: 'FASE', salvos: (s, n) => `${s}/${n} salvos`,
    vitoria: 'RESGATE COMPLETO!', resumo: (s, t, c) => `${s} bichos salvos · ${t}s de sobra · ${c} ♥`, continuar: 'ENTER continua',
    derrota: 'ESSA NÃO!', precisam: 'Os bichos ainda precisam de você.', derrotaRodape: 'ENTER tenta de novo · ESC volta ao menu',
    pausa: 'PAUSA', pausa1: 'P ou ESC continua', pausa2: 'R reinicia a fase · Q volta ao menu',
  },
  en: {
    apresenta: 'Turtles & Gators Rescue presents',
    jogar: 'Play', escolherFase: 'Choose level', comoJogar: 'How to play', idioma: 'Language: English',
    menuRodape: 'Arrows / mouse to choose · ENTER confirms · L switches language · M toggles sound',
    tituloFases: 'CHOOSE LEVEL', bloqueada: '🔒 locked', fasesRodape: 'ENTER plays · ESC goes back',
    tituloAjuda: 'HOW TO PLAY',
    ajudaTeclas: [['WASD / arrows', 'move'], ['1 · 2 · 3  (or TAB)', 'switch between Jim, Jane and Asha'],
                  ['SPACE', 'active hero\'s ability'], ['P / ESC', 'pause']],
    ajudaBichos: 'Touch an animal to pick it up and carry it to the TRUCK. The ring color under the animal tells who can do it:',
    ajudaTipos: [['Anyone', 'light'], ['Only JIM (1)', 'heavy'], ['Only JANE (2)', 'skittish, runs away'], ['ASHA\'s riff (3)', 'scared: calm it first']],
    ajudaPerder: 'Lose all your hearts or run out of time = try again.',
    ajudaRodape: 'ENTER / ESC goes back',
    cenaRodape: 'SPACE/click advances · ESC skips',
    saiPraLa: 'Back off!',
    entrevistaTrudy: 'INTERVIEW! Trudy: "Smile for the Gazette!"', entrevistaBenny: 'Benny: "Just one more take!"',
    fatboy: 'Fat Boy doesn\'t like visitors!', drone: 'Caught in an Area 52 spotlight!',
    acalmaram: n => `${n} animals calmed down!`, acalmou: 'It calmed down! Now anyone can pick it up.',
    peguei: 'Got it!', levePicape: 'Now take it to the truck!', salvo: nome => `${nome} rescued!`,
    machucaram: 'The heroes got hurt too badly.', tempoAcabou: 'Time\'s up!',
    espaco: hab => `SPACE: ${hab}`, fase: 'LEVEL', salvos: (s, n) => `${s}/${n} rescued`,
    vitoria: 'RESCUE COMPLETE!', resumo: (s, t, c) => `${s} animals rescued · ${t}s left · ${c} ♥`, continuar: 'ENTER to continue',
    derrota: 'OH NO!', precisam: 'The animals still need you.', derrotaRodape: 'ENTER tries again · ESC back to menu',
    pausa: 'PAUSED', pausa1: 'P or ESC to resume', pausa2: 'R restarts the level · Q back to menu',
  },
};
function T(chave, ...args) {
  const v = UI[IDIOMA][chave] ?? UI.pt[chave];
  return typeof v === 'function' ? v(...args) : v;
}

// ---------------------------------------------------------------- roteiro em inglês
const EN_DADOS = {
  herois: {
    jim:  { habilidade: 'Strength', desc: 'Carries HEAVY animals and shrugs off small hazards.' },
    jane: { habilidade: 'Dash', desc: 'SPACE dashes. The only one fast enough for SKITTISH animals.' },
    asha: { habilidade: 'Riff', desc: 'SPACE plays a riff: calms SCARED animals and stuns hazards.' },
  },
  falantes: { ellen: 'Sheriff Ellen', cross: 'Gen. Cross' },
  bichos: {
    filhote_jacare: 'Baby gator', tartaruga: 'Turtle', mordedora: 'Snapping turtle', guaxinim: 'Raccoon',
    guaxinim_albino: 'Albino raccoon', cobra: 'Water snake', garca: 'Blue heron', lontra: 'Otter',
    pato: 'Guardian duck', cisne: 'Swan', puma: 'White puma cub', aguia: 'Red eagle', urso: 'Bear cub', veado: 'Fawn',
  },
  dicas: {
    pesado: 'Too heavy! Switch to JIM (key 1).',
    arisco: 'Too fast! Only JANE can catch it (key 2).',
    assustado: 'It\'s scared. ASHA can calm it with a riff (key 3 + SPACE).',
  },
  fases: [
    { titulo: 'After the Storm', local: 'Gator View Park',
      dica: 'Carry the animals to the truck. 1/2/3 switch heroes. SPACE uses the ability.',
      intro: [
        ['Lowen Lake. The worst storm in twenty years just rolled through Gator View Park.',
         'The wind ripped off half the fence. The other half is floating.',
         'Jane... does the trailer always shake like this?',
         'Only when the world\'s ending. Go back to sleep, princess.'],
        ['JIM WALKER! There\'s a gator on my porch and Satanás ran off after a turtle!',
         'Good morning to you too, Lou.',
         'The flood dragged half the swamp in here. Boots. Now.',
         'I just painted my nails...',
         'Then paint \'em with mud. I carry the heavy ones. Jane grabs the skittish ones. Asha, the scared ones calm down to your guitar.',
         'Everything goes in the truck bed. And watch out for Satanás: he bites shadows.'],
      ],
      fim: [
        ['Found this little devil hiding under my Buick. Thanks, Walkers.',
         'Three babies! Can I name them? This one\'s Waffles Junior.',
         'You can\'t give your cat\'s name to an alligator.',
         'Already did.',
         'Sanctuary for them. And the day\'s not over: William called. Says the bar is "infested."'],
      ] },
    { titulo: 'Big Swamp Chaos', local: 'Big Swamp Pub',
      dica: 'The raccoons are terrified: ASHA (3) needs to play a riff near them.',
      intro: [
        ['Jim, I got raccoons on the counter, a snake in the jukebox and a customer on top of the freezer. This is a bar, not a zoo.',
         'And if that white raccoon steals one more crawfish burger, I swear...'],
        ['Hey, hey, HEY! Turtles & Gators in action! This is gonna be the best episode on my channel!',
         'Viktor, get in my way one more time and I\'m throwing you in the swamp.',
         'Yes! Say that again, to the camera!',
         'The snake is mine. The raccoons are hiding and scared to death. Asha, get them out.',
         'A private show for raccoons. My childhood dream.'],
      ],
      fim: [
        ['Bar\'s clean, snake\'s out and only one broken stool. Burgers are on the house.',
         'Still tastes like swamp.',
         'Family recipe, young lady.',
         'Guys... who threw this pie?',
         'Nobody saw a thing.',
         'That was Ellen on the radio. Animals stuck in the Mossbend mud after the flood. And they say Fat Boy woke up.'],
      ] },
    { titulo: 'Night in Mossbend', local: 'Mossbend Swamp',
      dica: 'It\'s dark. Stay away from Fat Boy and the rattlesnakes.',
      intro: [
        ['Mossbend. Where the water is dark, the fog is thick and the legends are older than the town.',
         'Why does everything here have glowing eyes?',
         'Frogs. Probably frogs.',
         'PROBABLY?',
         'Snappers stuck in the mud, otters and a tangled heron. Flashlights on at all times.'],
        ['Five meters. One ton of bad mood. Fat Boy.',
         'Nobody touches him. He doesn\'t want us, he wants peace and quiet. Go around him, slowly.',
         'Mental note: never complain about Satanás again.'],
      ],
      fim: [
        ['Everyone in one piece. Even Fat Boy came out ahead: he went back to sleep.',
         'Jane... there\'s someone out there in the fog. Watching us.',
         'Don\'t look. Don\'t wave. Get in the truck.',
         'Was that... a fish? Standing up?',
         'In Mossbend, we don\'t ask.'],
      ] },
    { titulo: 'Catfish Festival', local: 'Big Blue Lake · Lakeshore Bay',
      dica: 'Dodge Trudy and Benny: if they catch you, it\'s interview time!',
      intro: [
        ['The next day, at Big Blue Lake. The Catfish Festival doesn\'t stop, not even for a flood.',
         'Day off! Ice cream! Ferris wheel!',
         'The guardian ducks are running loose through the fair, there\'s a swan caught in fishing line and an otter in the bait tank.',
         '...Day off canceled.'],
        ['Trudy Klein, Lowen Lake Gazette! The heroes of the swamp! A quick word? A photo? With me in the middle, of course!',
         'Trudy, the duck\'s biting my shoelace...',
         'Not now, Trudy.',
         'That was a "yes"! Benny, after them!',
         'If the reporter catches you, there goes a whole lot of time. Dodge her.'],
      ],
      fim: [
        ['Go on, beautiful. Free again.',
         'Jim... that shadow under the water is the size of a boat.',
         'That\'s Bruto. He likes festivals.',
         'That night, the truck radio crackled.',
         'Jim. An unmarked truck rolled over on SR-55, up in Echo Ridge. There are animals loose in the forest... and people in uniforms that aren\'t mine.'],
      ] },
    { titulo: 'Lost Cargo', local: 'Echo Ridge',
      dica: 'Stay out of the Area 52 drones\' spotlights!',
      intro: [
        ['Those lights in the sky... they\'re not planes, are they?',
         'Drones. Lots of them.',
         'Area 52. Stay close to me. If a spotlight catches you, run.'],
        ['The "Coffin Truck," tipped over. Empty cages. Tracks in the mud.',
         'White puma cub, red eagle, bear cub... That\'s no zoo cargo.',
         'Then we get them to the truck before the drones find them.',
         'And what if we find... something else?',
         'Then we run faster than it does.'],
      ],
      fim: [
        ['Mr. Walker. That is federal government property.',
         'That\'s a puma cub, General. And it\'s in my forest.',
         'And this road is my jurisdiction. Care to explain the truck to the Gazette, General Cross?',
         '...That truck never existed. And you were never here.',
         'Is that a "you can keep the animals"?',
         'It\'s a "get off my road before I change my mind."'],
      ] },
  ],
  epilogo: [
    ['The rescued animals went to the Low Bank Sanctuary. The ones that were ready went back to the wild.',
     'No animal gets left behind. Ever.'],
    ['Jim and Ellen had coffee together on the trailer porch. The first in many years.',
     'The town never sleeps, Jim. And neither do I.',
     'Then have another cup.'],
    ['Can the puma live with us?',
     'He\'s going to the sanctuary, Asha.',
     'I already named him Waffles the Third.',
     '...Of course you did.'],
    ['The Gazette headline: HEROES OF THE SWAMP. Nobody mentioned the truck.',
     'Front page! And I look great in this photo.'],
    ['Tonight the beer\'s on the house. ONLY tonight!',
     'Good evening, Lowen Lake! This one\'s for the animals!',
     'And for the raccoon, who\'s my business partner now.'],
    ['But in Echo Ridge, some things are still waiting in the dark...',
     'THE END?'],
  ],
  creditos: [
    'LOWEN LAKE RESCUE', '', 'Lowen Lake universe and characters', 'RaptorWedgie (rwedgie)', '',
    'Art generated with ChatGPT', 'from the official references', '',
    'Game programming and script', 'Claude (Anthropic)', '', 'Thanks for playing!',
  ],
};

// ---------------------------------------------------------------- aplicar idioma
const PT_DADOS = {
  herois: Object.fromEntries(Object.entries(HEROIS).map(([k, h]) => [k, { habilidade: h.habilidade, desc: h.desc }])),
  falantes: Object.fromEntries(Object.entries(FALANTES).map(([k, f]) => [k, f.nome])),
  bichos: Object.fromEntries(Object.entries(BICHOS).map(([k, b]) => [k, b.nome])),
  dicas: { ...DICA_TIPO },
  fases: FASES.map(f => ({ titulo: f.titulo, local: f.local, dica: f.dica,
    intro: f.intro.map(c => c.falas.map(x => x[1])), fim: f.fim.map(c => c.falas.map(x => x[1])) })),
  epilogo: EPILOGO.map(c => c.falas.map(x => x[1])),
  creditos: [...CREDITOS],
};

function aplicarIdioma(lang) {
  IDIOMA = lang;
  try { localStorage.setItem('llr_idioma', lang); } catch (e) {}
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  const D = lang === 'en' ? EN_DADOS : PT_DADOS;
  for (const k in HEROIS) Object.assign(HEROIS[k], D.herois[k]);
  for (const k in FALANTES) FALANTES[k].nome = D.falantes[k] ?? PT_DADOS.falantes[k];
  for (const k in BICHOS) BICHOS[k].nome = D.bichos[k];
  Object.assign(DICA_TIPO, D.dicas);
  FASES.forEach((f, i) => {
    const d = D.fases[i];
    f.titulo = d.titulo; f.local = d.local; f.dica = d.dica;
    f.intro.forEach((c, j) => c.falas.forEach((x, k) => { x[1] = d.intro[j][k]; }));
    f.fim.forEach((c, j) => c.falas.forEach((x, k) => { x[1] = d.fim[j][k]; }));
  });
  EPILOGO.forEach((c, j) => c.falas.forEach((x, k) => { x[1] = D.epilogo[j][k]; }));
  CREDITOS.splice(0, CREDITOS.length, ...D.creditos);
}
aplicarIdioma(IDIOMA);
