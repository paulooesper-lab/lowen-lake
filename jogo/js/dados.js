// =====================================================================
//  LOWEN LAKE RESCUE — dados do jogo (personagens, bichos, fases, roteiro)
//  Tudo o que é texto/história/posição fica aqui. O motor está em jogo.js
// =====================================================================

// ---------- Personagens jogáveis ----------
const HEROIS = {
  jim:  { nome: 'Jim',  cor: '#7a9a4a', vel: 185, altura: 100, habilidade: 'Força',
          desc: 'Carrega bichos PESADOS e não se abala com perigos pequenos.' },
  jane: { nome: 'Jane', cor: '#e8458b', vel: 225, altura: 94, habilidade: 'Arrancada',
          desc: 'ESPAÇO dá uma arrancada. Única rápida o bastante para os bichos ARISCOS.' },
  asha: { nome: 'Asha', cor: '#c0392b', vel: 205, altura: 92, habilidade: 'Riff',
          desc: 'ESPAÇO toca um riff: acalma bichos ASSUSTADOS e atordoa perigos.' },
};

// ---------- Quem fala nas cutscenes (retrato + cor da plaquinha) ----------
const FALANTES = {
  narrador: { nome: '',          cor: '#d9c9a3' },
  jim:      { nome: 'Jim',       cor: '#7a9a4a', retrato: 'jim' },
  jane:     { nome: 'Jane',      cor: '#e8458b', retrato: 'jane' },
  asha:     { nome: 'Asha',      cor: '#c0392b', retrato: 'asha' },
  biglou:   { nome: 'Big Lou',   cor: '#b07a3c', retrato: 'biglou' },
  william:  { nome: 'William',   cor: '#3b6fb6', retrato: 'william' },
  viktor:   { nome: 'Viktor',    cor: '#d4572a', retrato: 'viktor' },
  trudy:    { nome: 'Trudy Klein', cor: '#e2b33c', retrato: 'trudy' },
  benny:    { nome: 'Benny',     cor: '#8a8a8a', retrato: 'benny' },
  ellen:    { nome: 'Xerife Ellen', cor: '#c9a227', retrato: 'ellen' },
  cross:    { nome: 'Gen. Cross', cor: '#56604a', retrato: 'cross' },
};

// ---------- Bichos ----------
// classe: leve (qualquer um pega) | pesado (só Jim) | arisco (foge; só Jane) | assustado (Asha acalma com riff)
const BICHOS = {
  filhote_jacare: { nome: 'Filhote de jacaré',      classe: 'arisco',    alt: 48, vel: 150 },
  tartaruga:      { nome: 'Tartaruga',              classe: 'leve',      alt: 48, vel: 25 },
  mordedora:      { nome: 'Tartaruga-mordedora',    classe: 'pesado',    alt: 73, vel: 18 },
  guaxinim:       { nome: 'Guaxinim',               classe: 'assustado', alt: 64, vel: 60 },
  guaxinim_albino:{ nome: 'Guaxinim albino',        classe: 'arisco',    alt: 64, vel: 170 },
  cobra:          { nome: "Cobra-d'água",           classe: 'pesado',    alt: 56, vel: 30 },
  garca:          { nome: 'Garça-azul',             classe: 'assustado', alt: 104, vel: 40 },
  lontra:         { nome: 'Lontra',                 classe: 'arisco',    alt: 56, vel: 165 },
  pato:           { nome: 'Pato-guardião',          classe: 'arisco',    alt: 53, vel: 155 },
  cisne:          { nome: 'Cisne',                  classe: 'assustado', alt: 87, vel: 35 },
  puma:           { nome: 'Filhote de puma branco', classe: 'assustado', alt: 70, vel: 70 },
  aguia:          { nome: 'Águia-vermelha',         classe: 'assustado', alt: 84, vel: 30 },
  urso:           { nome: 'Filhote de urso',        classe: 'pesado',    alt: 81, vel: 30 },
  veado:          { nome: 'Filhote de veado',       classe: 'arisco',    alt: 87, vel: 175 },
};

const DICA_TIPO = {
  pesado:    'Pesado demais! Troque para o JIM (tecla 1).',
  arisco:    'Rápido demais! Só a JANE alcança (tecla 2).',
  assustado: 'Está assustado. A ASHA acalma com um riff (tecla 3 + ESPAÇO).',
};

// ---------- Perigos ----------
// cao: persegue | viktor: corre à toa | cascavel: parada, dá bote | fatboy: patrulha lenta
// trudy/benny: perseguem e "entrevistam" (prendem você) | drone: holofote de patrulha
const PERIGOS = {
  satanas:  { nome: 'Satanás',  alt: 56,  raio: 22, dano: 1, pequeno: true },
  viktor:   { nome: 'Viktor',   alt: 92,  raio: 22, dano: 1, pequeno: true },
  cascavel: { nome: 'Cascavel', alt: 34,  raio: 20, dano: 1 },
  fatboy:   { nome: 'Fat Boy',  alt: 120, raio: 70, dano: 2 },
  trudy:    { nome: 'Trudy',    alt: 92,  raio: 22, dano: 0, pequeno: true, prende: 2.2 },
  benny:    { nome: 'Benny',    alt: 92,  raio: 22, dano: 0, pequeno: true, prende: 1.2 },
  drone:    { nome: 'Drone',    alt: 62,  raio: 26, dano: 1, voa: true },
};

// =====================================================================
//  FASES
//  Coordenadas em pixels do mapa (1536 x 1024).
//  solidos: retângulos [x, y, w, h] onde não se anda.
//  agua:    retângulos [x, y, w, h] onde se anda devagar.
// =====================================================================
const FASES = [
  // ------------------------------------------------------------- FASE 1
  {
    id: 1, titulo: 'Depois da Tempestade', local: 'Gator View Park',
    mapa: 'mapas/f1', tempo: 150, musica: 0,
    inicio: [760, 560], caminhao: [420, 470],
    solidos: [
      [0, 0, 1536, 40], [325, 30, 355, 180], [778, 25, 350, 160], [1195, 90, 285, 190],
      [1290, 340, 185, 250], [1245, 675, 280, 230], [215, 150, 40, 230], [210, 460, 40, 380],
      [230, 830, 450, 50], [870, 925, 430, 50], [1490, 0, 46, 1024], [0, 965, 1536, 59],
    ],
    agua: [[300, 255, 230, 100], [930, 370, 190, 80], [300, 730, 180, 70], [900, 790, 200, 80], [1060, 600, 140, 40]],
    bichos: [
      ['filhote_jacare', 1040, 400], ['filhote_jacare', 1100, 760], ['filhote_jacare', 560, 700],
      ['tartaruga', 900, 270], ['tartaruga', 620, 330],
      ['mordedora', 1180, 520],
    ],
    perigos: [ ['satanas', 1000, 700] ],
    dica: 'Leve os bichos até a picape. 1/2/3 trocam de herói. ESPAÇO usa a habilidade.',
    intro: [
      { img: 'c1a', falas: [
        ['narrador', 'Lowen Lake. A pior tempestade em vinte anos acabou de passar por Gator View Park.'],
        ['jim', 'O vento arrancou metade da cerca. A outra metade tá boiando.'],
        ['asha', 'Jane... o trailer sempre balança assim?'],
        ['jane', 'Só quando o mundo tá acabando. Volta a dormir, princesa.'],
      ]},
      { img: 'c1b', falas: [
        ['biglou', 'JIM WALKER! Tem jacaré na minha varanda e o Satanás fugiu atrás de uma tartaruga!'],
        ['jane', 'Bom dia pra você também, Lou.'],
        ['jim', 'A enchente trouxe meio pântano pra cá. Botas. Agora.'],
        ['asha', 'Eu acabei de pintar as unhas...'],
        ['jim', 'Então pinta de lama. Eu carrego os pesados. Jane pega os ariscos. Asha, os assustados se acalmam com a sua guitarra.'],
        ['jane', 'Tudo pra caçamba da picape. E cuidado com o Satanás: ele morde até sombra.'],
      ]},
    ],
    fim: [
      { img: 'c1c', falas: [
        ['biglou', 'Achei esse capeta escondido debaixo do meu Buick. Valeu, Walkers.'],
        ['asha', 'Três filhotes! Posso dar nome? Esse aqui é o Waffles Júnior.'],
        ['jane', 'Você não pode dar o nome do seu gato pra um jacaré.'],
        ['asha', 'Já dei.'],
        ['jim', 'Pro santuário com eles. E o dia não acabou: o William ligou. Disse que o bar tá "infestado".'],
      ]},
    ],
  },
  // ------------------------------------------------------------- FASE 2
  {
    id: 2, titulo: 'Caos no Big Swamp', local: 'Big Swamp Pub',
    mapa: 'mapas/f2', tempo: 150, musica: 1,
    inicio: [760, 700], caminhao: [330, 940],
    solidos: [
      [0, 0, 1536, 30], [80, 0, 1060, 275], [240, 380, 360, 60], [750, 380, 370, 60],
      [305, 280, 85, 65], [445, 295, 100, 85], [820, 300, 95, 85], [955, 280, 100, 70],
      [105, 380, 215, 115], [975, 435, 140, 90], [1140, 0, 396, 285], [1140, 405, 396, 275],
      [1240, 680, 296, 180], [1195, 510, 30, 140], [1230, 640, 60, 80], [1290, 700, 80, 80],
      [1360, 770, 90, 90], [1020, 840, 430, 45], [20, 815, 190, 60], [35, 620, 25, 200], [0, 0, 80, 600],
    ],
    agua: [[170, 545, 190, 70], [900, 550, 100, 40], [900, 720, 120, 60], [500, 860, 120, 50]],
    props: [['latao', 520, 600, 60], ['caixote', 860, 640, 58], ['barril', 1100, 760, 60]],
    bichos: [
      ['guaxinim', 300, 530], ['guaxinim', 940, 540], ['guaxinim', 620, 330],
      ['guaxinim_albino', 700, 620],
      ['cobra', 1120, 580],
    ],
    perigos: [ ['viktor', 760, 600] ],
    dica: 'Os guaxinins estão apavorados: a ASHA (3) precisa tocar um riff perto deles.',
    intro: [
      { img: 'c2a', falas: [
        ['william', 'Jim, tem guaxinim no balcão, cobra na jukebox e um cliente em cima do freezer. Isso aqui é um bar, não um zoológico.'],
        ['william', 'E se aquele guaxinim branco roubar mais um hambúrguer de lagosta, eu juro que...'],
      ]},
      { img: 'c2b', falas: [
        ['viktor', 'Ei, ei, EI! Turtles & Gators em ação! Esse vai ser o melhor episódio do meu canal!'],
        ['jane', 'Viktor, se você entrar na minha frente de novo eu te jogo no pântano.'],
        ['viktor', 'Isso! Repete olhando pra câmera!'],
        ['jim', 'A cobra é comigo. Os guaxinins estão escondidos e morrendo de medo. Asha, tira eles de lá.'],
        ['asha', 'Um show particular pra guaxinins. Meu sonho de criança.'],
      ]},
    ],
    fim: [
      { img: 'c2c', falas: [
        ['william', 'Bar limpo, cobra fora e só um banco quebrado. Hambúrguer por conta da casa.'],
        ['asha', 'Ainda tem gosto de pântano.'],
        ['william', 'É receita de família, mocinha.'],
        ['viktor', 'Gente... quem jogou essa torta?'],
        ['jane', 'Ninguém viu nada.'],
        ['jim', 'Era a Ellen no rádio. Tem bicho preso na lama de Mossbend depois da cheia. E dizem que o Fat Boy acordou.'],
      ]},
    ],
  },
  // ------------------------------------------------------------- FASE 3
  {
    id: 3, titulo: 'Noite em Mossbend', local: 'Pântano de Mossbend',
    mapa: 'mapas/f3', tempo: 180, musica: 2, escuro: true,
    inicio: [340, 880], caminhao: [150, 900],
    solidos: [
      [0, 0, 1536, 20], [1180, 0, 356, 270], [740, 100, 140, 120], [540, 790, 150, 150],
      [920, 860, 200, 164], [0, 340, 90, 360], [90, 50, 90, 100], [1490, 380, 46, 300],
    ],
    // no pântano tudo é água rasa (anda devagar), menos o que é "seco"
    aguaTudo: true,
    agua: [],
    seco: [
      [530, 330, 570, 400], [0, 740, 430, 284], [0, 680, 180, 100],
      [180, 640, 280, 110], [380, 520, 140, 140], [440, 360, 80, 180], [440, 280, 200, 90],
      [600, 250, 450, 90], [1010, 220, 90, 150], [1050, 350, 140, 170], [1120, 500, 320, 90],
      [1400, 560, 110, 300], [1330, 840, 150, 80], [1200, 280, 160, 90], [0, 40, 430, 260],
    ],
    bichos: [
      ['mordedora', 700, 450], ['mordedora', 1250, 720],
      ['lontra', 900, 190], ['lontra', 300, 470],
      ['garca', 1300, 440],
      ['filhote_jacare', 950, 650],
    ],
    perigos: [ ['fatboy', 900, 480, [[600, 480], [1050, 480], [1050, 700], [600, 700]]],
               ['cascavel', 470, 620], ['cascavel', 1250, 545] ],
    dica: 'Está escuro. Fique longe do Fat Boy e das cascavéis.',
    intro: [
      { img: 'c3a', falas: [
        ['narrador', 'Mossbend. Onde a água é escura, a névoa é grossa e as lendas são mais velhas que a cidade.'],
        ['asha', 'Por que tudo aqui tem olho brilhando?'],
        ['jane', 'Sapos. Provavelmente sapos.'],
        ['asha', 'PROVAVELMENTE?'],
        ['jim', 'Mordedoras presas na lama, lontras e uma garça enroscada. Lanterna sempre ligada.'],
      ]},
      { img: 'c3b', falas: [
        ['narrador', 'Cinco metros. Uma tonelada de mau humor. Fat Boy.'],
        ['jim', 'Ninguém encosta nele. Ele não quer a gente, quer sossego. Contornem devagar.'],
        ['jane', 'Nota mental: nunca mais reclamar do Satanás.'],
      ]},
    ],
    fim: [
      { img: 'c3c', falas: [
        ['jane', 'Todo mundo inteiro. Até o Fat Boy saiu ganhando: voltou a dormir.'],
        ['asha', 'Jane... tem alguém ali na névoa. Olhando pra gente.'],
        ['jim', 'Não olhem. Não acenem. Entrem na picape.'],
        ['jane', 'Aquilo era... um peixe? Em pé?'],
        ['jim', 'Em Mossbend a gente não pergunta.'],
      ]},
    ],
  },
  // ------------------------------------------------------------- FASE 4
  {
    id: 4, titulo: 'Catfish Festival', local: 'Big Blue Lake · Lakeshore Bay',
    mapa: 'mapas/f4', tempo: 170, musica: 3,
    inicio: [760, 380], caminhao: [830, 235],
    solidos: [
      [0, 900, 1536, 124], [280, 700, 740, 200], [1130, 700, 110, 200], [1390, 700, 146, 200], [0, 690, 95, 210],
      [0, 200, 190, 380], [330, 0, 1250, 45], [430, 140, 260, 110], [685, 50, 195, 135], [935, 40, 205, 120],
      [1150, 115, 110, 95], [1240, 0, 296, 300], [1215, 290, 300, 240], [330, 300, 190, 190], [60, 440, 210, 240],
      [610, 230, 85, 60], [985, 210, 90, 55], [1045, 260, 90, 60], [495, 420, 90, 60], [425, 480, 95, 60],
      [1100, 470, 95, 60], [1195, 515, 95, 65], [1440, 300, 96, 400], [0, 0, 330, 20],
      [20, 125, 280, 40], [100, 270, 170, 40], [345, 40, 25, 110],
    ],
    agua: [],
    bichos: [
      ['pato', 1000, 350], ['pato', 700, 520], ['pato', 1300, 600],
      ['cisne', 450, 640],
      ['lontra', 1075, 800],
      ['tartaruga', 1180, 640],
    ],
    perigos: [ ['trudy', 1100, 460], ['benny', 1050, 410] ],
    dica: 'Fuja da Trudy e do Benny: se eles te alcançarem, é entrevista!',
    intro: [
      { img: 'c4a', falas: [
        ['narrador', 'No dia seguinte, no Big Blue Lake. O Catfish Festival não para nem por enchente.'],
        ['asha', 'Folga! Sorvete! Roda-gigante!'],
        ['jim', 'Os patos-guardiões tão correndo pela feira, tem um cisne preso em linha de pesca e uma lontra no tanque de iscas.'],
        ['jane', '...Folga cancelada.'],
      ]},
      { img: 'c4b', falas: [
        ['trudy', 'Trudy Klein, Lowen Lake Gazette! Os heróis do pântano! Uma palavrinha? Uma foto? Comigo no meio, claro!'],
        ['benny', 'Trudy, o pato tá mordendo meu cadarço...'],
        ['jane', 'Agora não, Trudy.'],
        ['trudy', 'Isso foi um "sim"! Benny, atrás deles!'],
        ['jim', 'Se a repórter te alcançar, lá se vai um tempão. Desvia.'],
      ]},
    ],
    fim: [
      { img: 'c4c', falas: [
        ['asha', 'Vai, lindo. Livre de novo.'],
        ['jane', 'Jim... aquela sombra embaixo d\'água tem o tamanho de um barco.'],
        ['jim', 'É o Bruto. Ele gosta de festival.'],
        ['narrador', 'Naquela noite, o rádio da picape chiou.'],
        ['ellen', 'Jim. Um caminhão sem placa capotou na SR-55, em Echo Ridge. Tem bicho solto na floresta... e gente de farda que não é minha.'],
      ]},
    ],
  },
  // ------------------------------------------------------------- FASE 5
  {
    id: 5, titulo: 'Carga Perdida', local: 'Echo Ridge',
    mapa: 'mapas/f5', tempo: 210, musica: 4, neblina: true,
    inicio: [330, 790], caminhao: [170, 760],
    solidos: [
      [0, 0, 1536, 110], [0, 0, 60, 700], [340, 180, 110, 80], [700, 150, 150, 130], [680, 320, 90, 70],
      [320, 420, 180, 110], [890, 520, 180, 90], [1280, 480, 120, 80], [1060, 40, 476, 270],
      [1340, 300, 120, 120], [600, 0, 80, 340], [1080, 450, 60, 250], [610, 700, 380, 190],
      [0, 890, 600, 134], [1000, 890, 536, 134], [1440, 380, 96, 330],
    ],
    agua: [[180, 100, 180, 250], [60, 350, 320, 340]],
    bichos: [
      ['puma', 1210, 400],
      ['aguia', 240, 470],
      ['urso', 1180, 790],
      ['veado', 520, 330], ['veado', 960, 330],
    ],
    perigos: [ ['drone', 450, 300, [[300, 300], [600, 300], [600, 600], [300, 600]]],
               ['drone', 1100, 420, [[1250, 420], [900, 420], [900, 650], [1250, 650]]],
               ['drone', 760, 560, [[500, 560], [1300, 560]]],
               ['cascavel', 1000, 300] ],
    dica: 'Fuja dos holofotes dos drones da Área 52!',
    intro: [
      { img: 'c5a', falas: [
        ['asha', 'Aquelas luzes no céu... não são aviões, né?'],
        ['jane', 'Drones. Muitos.'],
        ['jim', 'Área 52. Fiquem perto de mim. Se o holofote pegar vocês, corram.'],
      ]},
      { img: 'c5b', falas: [
        ['narrador', 'O "Caminhão-Caixão" tombado. Gaiolas vazias. Pegadas na lama.'],
        ['jim', 'Filhote de puma branco, águia-vermelha, filhote de urso... Isso não é carga de zoológico.'],
        ['jane', 'Então a gente leva eles pra picape antes que os drones achem.'],
        ['asha', 'E se a gente achar... outra coisa?'],
        ['jim', 'Aí a gente corre mais rápido que ela.'],
      ]},
    ],
    fim: [
      { img: 'c5c', falas: [
        ['cross', 'Senhor Walker. Isso é propriedade do governo federal.'],
        ['jim', 'Isso é um filhote de puma, general. E ele tá na minha floresta.'],
        ['ellen', 'E esta estrada é a minha jurisdição. Quer explicar o caminhão pro Gazette, General Cross?'],
        ['cross', '...Esse caminhão nunca existiu. E vocês nunca estiveram aqui.'],
        ['jane', 'Isso é um "podem ficar com os bichos"?'],
        ['cross', 'É um "saiam da minha estrada antes que eu mude de ideia".'],
      ]},
    ],
  },
];

// ---------- Epílogo: a clássica sequência final de imagens estáticas ----------
const EPILOGO = [
  { img: 'f1', falas: [
    ['narrador', 'Os bichos resgatados foram para o Santuário da Margem Baixa. Os que estavam prontos voltaram para a natureza.'],
    ['jim', 'Nenhum bicho fica pra trás. Nunca.'],
  ]},
  { img: 'f2', falas: [
    ['narrador', 'Jim e Ellen tomaram café juntos na varanda do trailer. O primeiro em muitos anos.'],
    ['ellen', 'A cidade nunca dorme, Jim. E nem eu.'],
    ['jim', 'Então toma mais um café.'],
  ]},
  { img: 'f3', falas: [
    ['asha', 'O puma pode morar com a gente?'],
    ['jane', 'Ele vai pro santuário, Asha.'],
    ['asha', 'Eu já chamei ele de Waffles Terceiro.'],
    ['jane', '...Claro que chamou.'],
  ]},
  { img: 'f4', falas: [
    ['narrador', 'A manchete do Gazette: HEROES OF THE SWAMP. Ninguém falou do caminhão.'],
    ['trudy', 'Primeira página! E eu tô ótima nessa foto.'],
  ]},
  { img: 'f5', falas: [
    ['william', 'Hoje a cerveja é por conta da casa. SÓ hoje!'],
    ['jane', 'Boa noite, Lowen Lake! Essa é pros bichos!'],
    ['viktor', 'E pro guaxinim, que agora é meu sócio.'],
  ]},
  { img: 'f6', falas: [
    ['narrador', 'Mas em Echo Ridge, algumas coisas continuam esperando no escuro...'],
    ['narrador', 'FIM?'],
  ]},
];

const CREDITOS = [
  'LOWEN LAKE RESCUE',
  '',
  'Universo e personagens de Lowen Lake',
  'RaptorWedgie (rwedgie)',
  '',
  'Artes geradas com ChatGPT',
  'a partir das referências oficiais',
  '',
  'Programação e roteiro do jogo',
  'Claude (Anthropic)',
  '',
  'Obrigado por jogar!',
];
