/* =====================================================================
   LOWEN LAKE — CONTEÚDO DO SITE
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para mudar textos,
   personagens, locais, portfólio e preços.

   IMAGENS: coloque os arquivos na pasta /img (ex.: img/personagens/jane.jpg)
   e escreva o caminho no campo "imagem". Se a imagem não existir,
   o site mostra automaticamente um cartão provisório com as iniciais.

   Dica: mantenha as aspas e vírgulas. Se o site ficar em branco depois
   de uma edição, provavelmente faltou uma vírgula ou aspas.
   ===================================================================== */

window.SITE = {

  /* ---------- Identidade geral ---------- */
  nomeArtista: "RaptorWedgie",
  email: "raptorwedgie@gmail.com",
  // Formspree (opcional, grátis): crie um formulário em formspree.io e cole o endereço aqui,
  // ex.: "https://formspree.io/f/abcdwxyz". Vazio = o formulário abre o e-mail do visitante.
  formspree: "",
  redes: [
    // { nome: "Instagram", url: "https://instagram.com/seu_usuario" },
    // { nome: "DeviantArt", url: "https://deviantart.com/seu_usuario" },
  ],

  /* ---------- Banners (paisagem no topo de cada seção) ----------
     Troque o arquivo na pasta img/banners/ mantendo o nome, ou mude o caminho aqui.
     Deixe "" para a seção ficar sem banner. Tamanho ideal: 1600x900 ou maior, JPG. */
  banners: {
    inicio: "img/banners/inicio.jpg",
    cidade: "img/banners/cidade.jpg",
    personagens: "img/banners/personagens.jpg",
    locais: "img/banners/locais.jpg",
    mapa: "img/banners/mapa.jpg",
    lendas: "img/banners/lendas.jpg",
    portfolio: "img/banners/portfolio.jpg",
    encomendas: "img/banners/encomendas.jpg",
  },

  cidade: {
    nome: "Lowen Lake",
    condado: "Lowen Lake County",
    lema: "Unidos pela terra, guiados pelo espírito.",
    lemaIngles: "United by the land, guided by the spirit.",
    resumo: "Uma cidade pequena do sudeste dos Estados Unidos, na borda dos Apalaches, entre pântanos, grandes lagos, montanhas e florestas de pinheiros. Aqui convivem cultura sulista, jovens punks, resgate de animais, lendas indígenas, criptídeos e uma instalação federal que oficialmente não existe.",
    tom: "Comédia dramática punk, humor físico, aventura, mistério local e criptozoologia. Numa mesma noite pode haver um show no ferro-velho, um jacaré atravessando a estrada e luzes estranhas sobre Echo Ridge.",
    curiosidade: { rotulo: "Relógio da Prefeitura", valor: "3:47", nota: "parado desde 1972" },
  },

  /* ---------- História / fundadores ---------- */
  historia: [
    { titulo: "Antes da cidade", texto: "A região já era habitada por um povo indígena ancestral, com uma relação espiritual profunda com a terra, a floresta e as montanhas." },
    { titulo: "Lowen e Nayeli", texto: "No início do século XIX chega Lowen, um explorador europeu. Nayeli, curandeira e líder espiritual, ensina a ele a respeitar a terra e as tradições locais. Os dois são lembrados como fundadores da cidade e de uma proposta de convivência entre culturas. Se houve romance entre eles, ninguém sabe ao certo: é uma das lendas favoritas da cidade." },
    { titulo: "A praça dos fundadores", texto: "Em Old Hollow, uma estátua conjunta de Lowen e Nayeli traz bússola, máscara ritual e folhas de pinheiro, com a inscrição \"Unidos pela terra, guiados pelo espírito\". O pato selvagem é o símbolo da cidade e está no brasão." },
    { titulo: "Guerra Fria", texto: "Nos anos 1950–1960, investigações federais sobre luzes no céu de Big Blue Lake e Echo Ridge dão origem à Área 52, escondida nas colinas e cavernas do norte." },
  ],

  cronologia: [
    { data: "Antes de Lowen", fato: "Povo indígena ancestral habita a região." },
    { data: "Início do séc. XIX", fato: "Chegada de Lowen; formação da cidade com Nayeli." },
    { data: "1857", fato: "Ano gravado no brasão do Sheriff's Office." },
    { data: "1865", fato: "Época das cenas históricas de Lowen e Nayeli." },
    { data: "1950–60", fato: "Criação da Área 52." },
    { data: "1972", fato: "O relógio da prefeitura para às 3h47." },
    { data: "1987", fato: "Acidente e interdição do Dock 4." },
    { data: "1998", fato: "Abre o Big Swamp Pub." },
    { data: "Hoje", fato: "Jane, Asha, Lia e Lily: banda, resgates, festivais e mistérios." },
  ],

  /* ---------- Personagens ----------
     grupo: use exatamente um destes nomes →
     "Lowen Punks", "Amigos", "Família & Cidade", "Xerifado", "Área 52", "Fundadores"
     cor: duas cores usadas no cartão provisório (cabelo / destaque)            */
  personagens: [
    { id: "jane", nome: "Jane Walker", idade: "19", grupo: "Lowen Punks", papel: "Vocal da banda · Turtles & Gators Rescue",
      imagem: "img/personagens/jane.jpg", cor: ["#1b1b1b", "#ff3d8b"],
      aparencia: "Moicano preto alto com laterais raspadas e mechas rosa e verde, olhos cor de mel, físico atlético, piercings no septo e na sobrancelha, alargadores e tatuagens.",
      personalidade: "Líder, sarcástica, direta, corajosa, teimosa e leal. Protetora, principalmente com Asha.",
      historia: "Nasceu em Miami e foi criada pelo tio Jim desde os quatro anos. Trabalha no resgate desde os 15, mora em Gator View Park, dirige um Jeep CJ-7 amarelo e joga roller derby. Namora Asha.",
      relacoes: ["Asha (namorada)", "Jim (tio)", "Raven (mentora)", "William (figura paterna)"] },

    { id: "asha", nome: "Asha Parker", idade: "18", grupo: "Lowen Punks", papel: "Guitarra",
      imagem: "img/personagens/asha.jpg", cor: ["#3b2418", "#7fbf9a"],
      aparencia: "Cabelo castanho-escuro longo e liso com franja reta, pele muito clara, olhos verdes, visual punk que ainda guarda algo de arrumado. Tatuagem de tubarão com duas orquídeas vermelhas na coxa direita. Sem piercing no nariz.",
      personalidade: "Ex-popular e ex-líder de torcida das Gator Girls. Vaidosa, introspectiva e corajosa. A mais boba do grupo de desafios.",
      historia: "Mergulhou no punk quando se apaixonou por Jane. Mora em Lakeshore Bay com os pais Amelia e Greg e a irmã Katie, de 12 anos. Dirige um Honda Civic coupé preto e tem um gato persa, Mr. Waffles.",
      relacoes: ["Jane (namorada)", "Zoey Hart (ex)", "Katie (irmã)"] },

    { id: "lia", nome: "Lia", idade: "18", grupo: "Lowen Punks", papel: "Baixo",
      imagem: "img/personagens/lia.jpg", cor: ["#9b6bd6", "#2a2030"],
      aparencia: "Moicano lilás com laterais raspadas, pele pálida, delineador e batom escuros, piercings no lábio e na sobrancelha. Punk gótica elegante e refinada.",
      personalidade: "Inteligente, misteriosa, sarcástica e irônica. A mais radical no punk e a mais zangada do grupo.",
      historia: "Vem de família rica, mora numa casa luxuosa em Lakeshore Bay e é ex-aluna e ex-violinista da Saint Dymphna. Tem um rottweiler e um romance secreto com Viktor.",
      relacoes: ["Viktor (romance secreto)", "Jane e Asha (trio principal)"] },

    { id: "lily", nome: "Lily", idade: "18", grupo: "Lowen Punks", papel: "Bateria",
      imagem: "img/personagens/lily.jpg", cor: ["#f3f0e2", "#ff8fc0"],
      aparencia: "A menor do grupo. Moicano platinado, quase branco, com a frente rosa e laterais raspadas, olhos azuis. Punk com alguns detalhes artesanais.",
      personalidade: "Inteligente, pacífica, curiosa, excêntrica e ligada à natureza. Nos vlogs, energia caótica.",
      historia: "Filha de mãe hippie, tem dois irmãos gêmeos mais novos e mora numa casa de madeira cheia de plantas. Seus bichos: a arara vermelha falante Lerya e o dálmata Lary.",
      relacoes: ["Lerya (arara)", "Lary (dálmata)"] },

    { id: "debra", nome: "Debra", idade: "18–19", grupo: "Amigos", papel: "Fotógrafa dos vlogs",
      imagem: "img/personagens/debra.jpg", cor: ["#c2502a", "#6fa8dc"],
      aparencia: "Ruiva de cabelo chanel, gordinha, óculos, roupas confortáveis e câmera sempre no pescoço.",
      personalidade: "Nerd, estrategista e bem-humorada. Fã de Star Wars.",
      historia: "Registra os desafios e vlogs do grupo. Mora numa casa simples, afastada do centro, com um bulldog inglês e peixes japoneses.",
      relacoes: ["Yuko (melhor amiga)"] },

    { id: "yuko", nome: "Yuko", idade: "18", grupo: "Amigos", papel: "Nerd de dinossauros",
      imagem: "img/personagens/yuko.jpg", cor: ["#111111", "#9fd36b"],
      aparencia: "Japonesa, cabelo preto liso com franja, óculos grandes e meias longas.",
      personalidade: "Autista, alegre, espontânea e curiosa. Apaixonada por dinossauros e pelas criaturas da cidade.",
      historia: "Presença garantida no museu, na LowenCon e no Catfish Festival. Cria baratas-de-madagascar, um gecko-leopardo, um camaleão, a rã-touro albina Yaburo e agapornis.",
      relacoes: ["Debra (melhor amiga)"] },

    { id: "viktor", nome: "Viktor \"Red Smoke\"", idade: "20 e poucos", grupo: "Amigos", papel: "Trambiqueiro e cinegrafista",
      imagem: "img/personagens/viktor.jpg", cor: ["#b8321f", "#2b2b2b"],
      aparencia: "Magro, cabelo ruivo curto, barba ruiva curta, jaqueta de couro com patches.",
      personalidade: "Malandro, improvisador, provocador e às vezes irresponsável.",
      historia: "Vive numa van preta, vende de tudo e filma falsos documentários com o grupo. Um guaxinim vive perseguindo ele.",
      relacoes: ["Lia (romance secreto)", "Jim (respeita)"] },

    { id: "zoey", nome: "Zoey Hart", idade: "19", grupo: "Amigos", papel: "Canal Blue Static",
      imagem: "img/personagens/zoey.jpg", cor: ["#1e7bff", "#2a2030"],
      aparencia: "Cabelo azul-elétrico com laterais raspadas, olhos castanho-claros, batom escuro e um sol tatuado na mão direita.",
      personalidade: "Sarcástica, espirituosa, confiante e provocadora.",
      historia: "Tocava guitarra numa banda indie e mantém o canal Blue Static. Namorou Asha depois de um festival em Lakeshore Bay e ainda a chama de \"princesa elétrica\".",
      relacoes: ["Asha (ex)"] },

    { id: "jim", nome: "James \"Jim\" Walker", idade: "~50", grupo: "Família & Cidade", papel: "Fundador do Turtles & Gators Rescue",
      imagem: "img/personagens/jim.jpg", cor: ["#5a4632", "#6b7a3a"],
      aparencia: "Forte, barbudo, queimado de sol, tatuagens antigas, boné para trás e regatas manchadas.",
      personalidade: "Ex-militar calado, prático, teimoso e protetor. Desconfia de autoridades.",
      historia: "Criou a sobrinha Jane. Mora num trailer ampliado em Gator View Park e dirige uma Ford F-250 verde-oliva com o logo do resgate.",
      relacoes: ["Jane (sobrinha)", "Ellen (tensão antiga)", "Frank e Rattles (equipe)"] },

    { id: "ellen", nome: "Xerife Ellen", idade: "~40", grupo: "Xerifado", papel: "Lowen Lake County Sheriff's Office",
      imagem: "img/personagens/ellen.jpg", cor: ["#e6c76a", "#7a5a32"],
      aparencia: "Loira de cabelo chanel, olhos azuis, uniforme bege com gravata marrom e distintivo dourado.",
      personalidade: "Séria, metódica, firme e ética. \"A cidade nunca dorme, e nem eu.\"",
      historia: "Comanda a polícia em Old Hollow e dirige uma Ford Bronco 1995, \"A Velha Bronca\". Suspeita da Área 52, mas esbarra em impedimentos federais. Tem uma paixão antiga por Jim.",
      relacoes: ["Jim (afeto antigo)", "Camila Reyes (braço direito)"] },

    { id: "william", nome: "William", idade: "50–60", grupo: "Família & Cidade", papel: "Dono do Big Swamp Pub",
      imagem: "img/personagens/william.jpg", cor: ["#3a2a20", "#2f7fb5"],
      aparencia: "Homem negro grande, barba bem cuidada e grisalha, camisa azul, boné de caminhoneiro e avental do Big Swamp.",
      personalidade: "Carismático, protetor, paciente e de humor seco.",
      historia: "Cozinha, serve e conta histórias no pub. Figura paterna do grupo. Famoso pelo hambúrguer de lagosta de água doce com tempero de família.",
      relacoes: ["Jane, Asha e Lia (protege)"] },

    { id: "raven", nome: "Raven", idade: "40 e poucos", grupo: "Família & Cidade", papel: "Dona da Crimson Owl",
      imagem: "img/personagens/raven.jpg", cor: ["#141414", "#8a1c2b"],
      aparencia: "Cabelo preto curto e ondulado, braços tatuados, maquiagem escura, anéis, regata rasgada e voz rouca.",
      personalidade: "Mulher trans punk e gótica, de olhar afiado e elegância sombria.",
      historia: "Ex-integrante da banda The Blood Widows. Lê tarô, conhece o folclore local e é mentora de Jane.",
      relacoes: ["Jane (mentorada)"] },

    { id: "katie", nome: "Katie Parker", idade: "12", grupo: "Família & Cidade", papel: "Irmã da Asha",
      imagem: "img/personagens/katie.jpg", cor: ["#6b4a30", "#f2a541"],
      aparencia: "", personalidade: "Uma peste. Percebe mais do que os adultos imaginam.",
      historia: "Filha de Amelia (funcionária da prefeitura) e Greg Parker (seguros), cujo casamento está em crise.",
      relacoes: ["Asha (irmã)"] },

    { id: "frank", nome: "Frank", idade: "", grupo: "Família & Cidade", papel: "Turtles & Gators Rescue",
      imagem: "img/personagens/frank.jpg", cor: ["#7a6a4a", "#6b7a3a"],
      aparencia: "Caipira cabeludo, nariz grande, cara de cansado.",
      personalidade: "Piadista e desajeitado, mas entende de bicho como ninguém. Chama Jane de \"garoto\".",
      historia: "Parceiro antigo de Jim no resgate.", relacoes: ["Jim (parceiro)"] },

    { id: "rattles", nome: "Dwayne \"Rattles\" Holloway", idade: "", grupo: "Família & Cidade", papel: "Turtles & Gators Rescue",
      imagem: "img/personagens/rattles.jpg", cor: ["#4a3a2a", "#c9a227"],
      aparencia: "Magricelo e excêntrico.", personalidade: "Leal a Jim e Jane.",
      historia: "Criador amador de répteis, convive com cobras e bichos exóticos e conhece cada canal de Mossbend.", relacoes: [] },

    { id: "biglou", nome: "Louanne \"Big Lou\" Prichard", idade: "", grupo: "Família & Cidade", papel: "Vizinha em Gator View Park",
      imagem: "img/personagens/biglou.jpg", cor: ["#7a3b2a", "#9aa69c"],
      aparencia: "Mulher grande de voz rouca.", personalidade: "Durona.",
      historia: "Mecânica aposentada, dona do pitbull Satanás.", relacoes: ["Jane (vizinha)"] },

    { id: "niko", nome: "Nicholas \"Niko\" Reed", idade: "adolescente", grupo: "Família & Cidade", papel: "Vizinho punk",
      imagem: "img/personagens/niko.jpg", cor: ["#222222", "#e8b623"],
      aparencia: "", personalidade: "Punk barulhento e ciumento em relação a Asha.",
      historia: "Amigo de Jane em Gator View Park.", relacoes: [] },

    { id: "millie", nome: "Vovó Millie", idade: "", grupo: "Família & Cidade", papel: "Curandeira de Gator View Park",
      imagem: "img/personagens/millie.jpg", cor: ["#d8d2c0", "#5c7a3e"],
      aparencia: "", personalidade: "Mística, de conselhos enigmáticos.",
      historia: "Protetora de Jane.", relacoes: ["Jane (protege)"] },

    { id: "martha", nome: "Prefeita Martha E. Kingsley", idade: "", grupo: "Família & Cidade", papel: "Prefeitura de Lowen Lake",
      imagem: "img/personagens/martha.jpg", cor: ["#8a8a8a", "#2f7fb5"],
      aparencia: "", personalidade: "Conservadora moderada, ética e protetora da cidade.",
      historia: "Viúva, dona do gato Thoreau. Sabe que a Área 52 existe.", relacoes: [] },

    { id: "trudy", nome: "Trudy Klein", idade: "30 e poucos", grupo: "Família & Cidade", papel: "Repórter do Lowen Lake Gazette",
      imagem: "img/personagens/trudy.jpg", cor: ["#e6c76a", "#c2502a"],
      aparencia: "Loira, blazer e jeans.", personalidade: "Teatral, insistente e dramática. Adora aparecer nas fotos.",
      historia: "Trabalha com o cinegrafista Benny Cruz, engraçado e meio medroso.", relacoes: ["Benny Cruz (cinegrafista)"] },

    { id: "camila", nome: "Camila Reyes", idade: "~27", grupo: "Xerifado", papel: "Oficial",
      imagem: "img/personagens/camila.jpg", cor: ["#3b2418", "#e8b623"],
      aparencia: "Pele morena clara, cabelo castanho-escuro em coque.",
      personalidade: "Observadora, leal a Ellen, ótima pontaria e boa em investigação digital.",
      historia: "Filha de imigrantes mexicanos.", relacoes: ["Ellen (chefe)"] },

    { id: "terry", nome: "Terry Blake", idade: "35", grupo: "Xerifado", papel: "Oficial",
      imagem: "img/personagens/terry.jpg", cor: ["#2a1d16", "#e8b623"],
      aparencia: "Negro, alto e atlético.", personalidade: "Sério, tímido e engraçado. Honesto.",
      historia: "Deixou outra polícia por recusar corrupção. Escreve poemas em segredo, e só Camila sabe.", relacoes: [] },

    { id: "kenken", nome: "Kenny \"Ken-Ken\" Dobbs", idade: "23", grupo: "Xerifado", papel: "Policial em treinamento",
      imagem: "img/personagens/kenken.jpg", cor: ["#c2502a", "#e8b623"],
      aparencia: "Magro, ruivo e sardento; parece mais novo.", personalidade: "Inseguro, falante e louco para agradar.",
      historia: "Técnico de suporte do departamento. Idolatra Ellen e Camila.", relacoes: [] },

    { id: "cross", nome: "General Evelyn Cross", idade: "~48", grupo: "Área 52", papel: "Comando da Área 52",
      imagem: "img/personagens/cross.jpg", cor: ["#4a3a2e", "#6b7a3a"],
      aparencia: "Rosto angular, cicatriz discreta na sobrancelha, cabelo castanho-escuro grisalho em coque baixo rígido, uniforme camuflado completo.",
      personalidade: "Autoritária, disciplinada e de humor seco, com um cuidado contido, quase maternal, pelas recrutas.",
      historia: "Comanda o complexo oficialmente desativado em Echo Ridge.", relacoes: ["Recrutas da Área 52"] },

    { id: "mara", nome: "Mara Sloane", idade: "24", grupo: "Área 52", papel: "Recruta · HRU",
      imagem: "img/personagens/mara.jpg", cor: ["#5a4030", "#d8d2c0"],
      aparencia: "Atlética e forte, pele clara, cabelo castanho com undercut. Tatuagem do White Moth Man.",
      personalidade: "Intensa, confiante, irreverente, destemida e impulsiva.",
      historia: "Hazard Response Unit, treinada pelo Lt. Andre Peters e pelo Sgt. Diego Alvarez.", relacoes: [] },

    { id: "nora", nome: "Nora Quinn", idade: "22", grupo: "Área 52", papel: "Recruta · Surface Ops",
      imagem: "img/personagens/nora.jpg", cor: ["#6b4a30", "#6b7a3a"],
      aparencia: "Cabelo castanho em trança.", personalidade: "Calma, estável e observadora.", historia: "Patrulha com o cão K-52 Ranger.", relacoes: [] },

    { id: "sofia", nome: "Sofia Ramirez", idade: "23", grupo: "Área 52", papel: "Recruta · Containment & Transport",
      imagem: "img/personagens/sofia.jpg", cor: ["#2a1d16", "#6b7a3a"],
      aparencia: "Pele morena, cabelo escuro em coque.", personalidade: "Extrovertida e prática.", historia: "", relacoes: [] },

    { id: "emily", nome: "Emily Allen", idade: "21", grupo: "Área 52", papel: "Recruta · Signals & Surveillance",
      imagem: "img/personagens/emily.jpg", cor: ["#e6c76a", "#6b7a3a"],
      aparencia: "Loira de coque bagunçado e sardas.", personalidade: "Otimista, confiável e animada.", historia: "", relacoes: [] },

    { id: "priya", nome: "Priya Nair", idade: "25", grupo: "Área 52", papel: "Recruta · Canil",
      imagem: "img/personagens/priya.jpg", cor: ["#1a1410", "#6b7a3a"],
      aparencia: "Cabelos escuros cacheados presos.", personalidade: "Calorosa, equilibrada e perceptiva.",
      historia: "O pastor-alemão K-52 Ranger obedece melhor a ela do que a qualquer outra pessoa.", relacoes: ["K-52 Ranger"] },

    { id: "lowen", nome: "Lowen", idade: "séc. XIX", grupo: "Fundadores", papel: "Explorador e cofundador",
      imagem: "img/personagens/lowen.jpg", cor: ["#6b4a30", "#a08a5a"],
      aparencia: "Cabelo castanho ondulado, barba e bigode leves, roupas e botas de explorador do século XIX.",
      personalidade: "Aprendeu com Nayeli a respeitar a terra.",
      historia: "Explorador europeu que chegou à região no início do século XIX e deu nome à cidade.", relacoes: ["Nayeli"] },

    { id: "nayeli", nome: "Nayeli", idade: "séc. XIX", grupo: "Fundadores", papel: "Curandeira e cofundadora",
      imagem: "img/personagens/nayeli.jpg", cor: ["#1a1410", "#c9a227"],
      aparencia: "Pele morena, olhos castanhos, cabelos longos e escuros trançados, contas, penas, colares e braceletes.",
      personalidade: "Líder espiritual, ponte entre culturas e defensora das tradições indígenas.",
      historia: "Guardiã do Espelho da Alma, que dizem revelar o espírito das pessoas. As fontes de Nayeli Springs levam seu nome.", relacoes: ["Lowen"] },
  ],

  /* ---------- Locais ----------
     regiao: id da região no mapa (veja "mapa.regioes" abaixo) */
  locais: [
    { nome: "Big Swamp Pub", regiao: "gatorview", tipo: "Bar", imagem: "img/locais/big-swamp.jpg",
      texto: "Pub de beira de estrada do William, perto de Gator View Park. Madeira, peixes empalhados, poltronas vermelhas anos 80, neon \"Cold Beer\". Logo: um bagre segurando uma caneca. EST 1998." },
    { nome: "Turtles & Gators Rescue", regiao: "mossbend", tipo: "Resgate de animais", imagem: "img/locais/rescue.jpg",
      texto: "Centro de resgate fundado por Jim. Tartarugas, mordedoras, jacarés, cobras e, de vez em quando, um urso." },
    { nome: "Crimson Owl", regiao: "oldhollow", tipo: "Loja esotérica e brechó", imagem: "img/locais/crimson-owl.jpg",
      texto: "Na Crimson Owl Lane. Cristais, ervas, tarô, mapas antigos, réplicas do espelho de Nayeli e uma coruja empalhada na vitrine. Dona: Raven." },
    { nome: "Museu de Lowen Lake", regiao: "oldhollow", tipo: "Museu", imagem: "img/locais/museu.jpg",
      texto: "Founders Hall, Nayeli Cultural Gallery, Paleontology Hall, Wildlife Hall e a Legends & Mysteries Gallery. Dizem que há uma sala trancada de objetos que reagem." },
    { nome: "Prefeitura", regiao: "oldhollow", tipo: "Main Street", imagem: "img/locais/prefeitura.jpg",
      texto: "Prédio neoclássico meio decadente, com um porão misterioso e um relógio parado às 3h47 desde 1972." },
    { nome: "Lowen Lake High School", regiao: "bluepines", tipo: "Escola pública", imagem: "img/locais/high-school.jpg",
      texto: "Tijolos vermelhos dos anos 70, azul royal e amarelo-ouro. Casa dos Fighting Gators: \"Go Gators! Bite Back!\"" },
    { nome: "Saint Dymphna Academy for Girls", regiao: "stdymphna", tipo: "Internato", imagem: "img/locais/st-dymphna.jpg",
      texto: "Internato neogótico numa colina arborizada, portão de ferro e lema \"Virtus per Silentium\". Correm boatos de túneis e salas ocultas." },
    { nome: "Rusthook Salvage Yard", regiao: "rusthook", tipo: "Ferro-velho e palco punk", imagem: "img/locais/rusthook.jpg",
      texto: "Ferro-velho às margens do Rusthook Lake. Lá dentro, o Rusthook Yard Stage: palco DIY de pallets, grafite e luz reaproveitada, onde tocam os Lowen Punks." },
    { nome: "Gator View Park", regiao: "gatorview", tipo: "Parque de trailers", imagem: "img/locais/gator-view.jpg",
      texto: "Onde Jane mora com Jim, entre Big Lou, Niko e Vovó Millie. Ninguém entra no Trailer 17, que dizem ser assombrado." },
    { nome: "Dock 4", regiao: "lake", tipo: "Píer abandonado", imagem: "img/locais/dock4.jpg",
      texto: "Interditado desde um acidente em 1987. A Maldição do Pier 4 é uma das lendas mais contadas no Big Swamp." },
    { nome: "Santuário da Margem Baixa", regiao: "baileys", tipo: "Santuário", imagem: "img/locais/santuario.jpg",
      texto: "Cais rústico, tanques improvisados e uma cabana isolada em Bailey's Hollow, onde ficam animais resgatados." },
    { nome: "Fly Drones Camping", regiao: "flydrones", tipo: "Acampamento", imagem: "img/locais/fly-drones.jpg",
      texto: "Acampamento de nerds e tecnologia entre Blue Pines e Mossbend, perto do lago e das matas." },
  ],

  /* ---------- Mapa ----------
     imagem: o desenho base do mapa (img/mapa/base.jpg). Vazio = mapa simples desenhado em código.
     rotulos: nomes das regiões escritos por cima do mapa. x e y são porcentagens
              (x: 0 = borda esquerda, 100 = direita; y: 0 = topo, 100 = base).
     marcadores: ícones clicáveis por cima do mapa (img/mapa/icones/). Mesma regra de x e y.
       regiao = qual texto de "regioes" abre ao clicar; local = nome de um item da lista "locais" (opcional). */
  mapa: {
    imagem: "img/mapa/base.jpg",
    // estilo: "" (normal), "agua", "perigo" ou "via"
    rotulos: [
      { texto: "Echo Ridge", regiao: "echoridge", x: 45, y: 6 },
      { texto: "Northend", regiao: "northend", x: 88, y: 12 },
      { texto: "Área 52", regiao: "area52", x: 70, y: 15, estilo: "perigo" },
      { texto: "Blue Pines", regiao: "bluepines", x: 15, y: 40 },
      { texto: "Old Hollow", regiao: "oldhollow", x: 36, y: 54 },
      { texto: "Big Blue Lake", regiao: "lake", x: 57, y: 39, estilo: "agua" },
      { texto: "Lakeshore Bay", regiao: "lakeshore", x: 82, y: 24 },
      { texto: "Rusthook", regiao: "rusthook", x: 92, y: 53 },
      { texto: "Gator View Park", regiao: "gatorview", x: 13, y: 66 },
      { texto: "Mossbend", regiao: "mossbend", x: 45, y: 86 },
      { texto: "Bailey's Hollow", regiao: "baileys", x: 85, y: 93 },
      { texto: "Crooked River", x: 22, y: 13, estilo: "via" },
      { texto: "Hwy 1", x: 5, y: 34, estilo: "via" },
    ],
    marcadores: [
      { icone: "img/mapa/icones/pub.png", regiao: "gatorview", local: "Big Swamp Pub", x: 5, y: 61 },
      { icone: "img/mapa/icones/trailer.png", regiao: "gatorview", local: "Gator View Park", x: 12, y: 52 },
      { icone: "img/mapa/icones/resgate.png", regiao: "mossbend", local: "Turtles & Gators Rescue", x: 31, y: 66 },
      { icone: "img/mapa/icones/camping.png", regiao: "flydrones", local: "Fly Drones Camping", x: 45, y: 67 },
      { icone: "img/mapa/icones/prefeitura.png", regiao: "oldhollow", local: "Prefeitura", x: 41, y: 33 },
      { icone: "img/mapa/icones/museu.png", regiao: "oldhollow", local: "Museu de Lowen Lake", x: 35, y: 46 },
      { icone: "img/mapa/icones/coruja.png", regiao: "oldhollow", local: "Crimson Owl", x: 36, y: 27 },
      { icone: "img/mapa/icones/xerife.png", regiao: "oldhollow", x: 30, y: 38 },
      { icone: "img/mapa/icones/fontes.png", regiao: "springs", x: 44, y: 48 },
      { icone: "img/mapa/icones/escola.png", regiao: "bluepines", local: "Lowen Lake High School", x: 20, y: 30 },
      { icone: "img/mapa/icones/stdymphna.png", regiao: "stdymphna", local: "Saint Dymphna Academy for Girls", x: 33, y: 21 },
      { icone: "img/mapa/icones/dock4.png", regiao: "lake", local: "Dock 4", x: 49, y: 51 },
      { icone: "img/mapa/icones/area52.png", regiao: "area52", x: 70, y: 9 },
      { icone: "img/mapa/icones/rusthook.png", regiao: "rusthook", local: "Rusthook Salvage Yard", x: 92, y: 44 },
      { icone: "img/mapa/icones/santuario.png", regiao: "baileys", local: "Santuário da Margem Baixa", x: 85, y: 80 },
      { icone: "img/mapa/icones/fatboy.png", regiao: "mossbend", criatura: "Fat Boy", x: 20, y: 82 },
      { icone: "img/mapa/icones/mossfoot.png", regiao: "mossbend", criatura: "Mossfoot", x: 63, y: 77 },
      { icone: "img/mapa/icones/mothman.png", regiao: "echoridge", criatura: "White Moth Man", x: 14, y: 9 },
      { icone: "img/mapa/icones/longlong.png", regiao: "lake", criatura: "Long-Long", x: 63, y: 29 },
      { icone: "img/mapa/icones/bruto.png", regiao: "lake", criatura: "Bruto", x: 70, y: 52 },
    ],
    regioes: {
      echoridge: { nome: "Echo Ridge", texto: "Montanhas ao norte: pinheiros, vento, neblina, mirantes, minas abandonadas e estradas madeireiras. Pumas, ursos ocasionais e luzes estranhas." },
      northend: { nome: "Northend", texto: "Estradas florestais perto de Echo Ridge. Avistamentos, o Great Pine e o caminho para a Área 52." },
      area52: { nome: "Área 52", texto: "Complexo federal da Guerra Fria disfarçado de estação geológica desativada. Entrada camuflada na rocha e Ala de Contenção B selada. Oficialmente, não existe." },
      stdymphna: { nome: "Saint Dymphna", texto: "Internato neogótico numa colina entre Blue Pines e Echo Ridge." },
      bluepines: { nome: "Blue Pines", texto: "Bairro residencial de casas de madeira entre pinheiros e trilhas. Lowen Lake High School. O Crooked River corta o bairro." },
      oldhollow: { nome: "Old Hollow", texto: "Centro histórico: prefeitura, xerifado, museu, Crimson Owl e a praça dos fundadores." },
      lake: { nome: "Big Blue Lake", texto: "O maior lago da região. Pesca, festivais, o bagre lendário Bruto e o monstro Long-Long." },
      lakeshore: { nome: "Lakeshore Bay", texto: "Margem rica do lago: marina, praia artificial, mansões, hotéis e cafés caros. Lia e os Parker moram aqui." },
      gatorview: { nome: "Gator View Park", texto: "Parque de trailers na entrada da cidade, ao lado do Big Swamp Pub. Casa de Jane e Jim." },
      mossbend: { nome: "Mossbend", texto: "Pântano ao sul: água escura, ciprestes, passarelas de madeira, casas sobre palafitas e um cemitério meio submerso. Território do Fat Boy." },
      baileys: { nome: "Bailey's Hollow", texto: "Extremo sul de Mossbend. Santuário da Margem Baixa." },
      rusthook: { nome: "Rusthook", texto: "Rusthook Lake, o ferro-velho e o palco punk Rusthook Yard Stage." },
      springs: { nome: "Nayeli Springs", texto: "Fontes consideradas sagradas perto da praça dos fundadores. Dizem que a água cura, ou revela coisas." },
      flydrones: { nome: "Fly Drones Camping", texto: "Acampamento nerd entre Blue Pines e Mossbend." },
    },
  },

  /* ---------- Bestiário ---------- */
  criaturas: [
    { nome: "Fat Boy", escala: "5 m", onde: "Mossbend", imagem: "img/criaturas/fatboy.jpg", texto: "Jacaré-americano enorme e gordíssimo. Costuma dormir no meio da estrada." },
    { nome: "White Moth Man", escala: "1,80 m", onde: "Echo Ridge / Northend", imagem: "img/criaturas/white-moth.jpg", texto: "Humanoide alado, branco e espectral. Presságio de luzes estranhas e desaparecimentos." },
    { nome: "Gray Strider", escala: "até 4 m", onde: "Echo Ridge", imagem: "img/criaturas/gray-strider.jpg", texto: "Alto, magro, cinzento e de rosto alienígena. Pegadas, batidas ocas e interferência de rádio." },
    { nome: "Mossfoot", escala: "até 3 m", onde: "Mossbend", imagem: "img/criaturas/mossfoot.jpg", texto: "Criatura peluda e territorial coberta de lama e musgo." },
    { nome: "Long-Long", escala: "5 m", onde: "Big Blue Lake", imagem: "img/criaturas/long-long.jpg", texto: "Monstro do lago de pescoço longo e corpo escuro." },
    { nome: "Bruto", escala: "4 m", onde: "Big Blue Lake", imagem: "img/criaturas/bruto.jpg", texto: "Bagre gigante, cheio de cicatrizes, que nunca foi pescado. Estrela do Catfish Festival." },
    { nome: "Drypine Hag", escala: "1,60–1,80 m", onde: "Florestas", imagem: "img/criaturas/drypine.jpg", texto: "Entidade de pinheiros secos, fungos e líquens que cria trilhas falsas e círculos de cogumelos." },
    { nome: "Swamp Dude", escala: "?", onde: "Canais de Mossbend", imagem: "img/criaturas/swamp-dude.jpg", texto: "Humanoide-peixe pálido e semiaquático. Observa e quase nunca ataca." },
    { nome: "Puma Host", escala: "puma", onde: "Echo Ridge / Blue Pines", imagem: "img/criaturas/puma-host.jpg", texto: "Puma branco ou albino. Talvez só um animal raro cercado de lendas." },
    { nome: "Yardlings", escala: "minúsculos", onde: "Jardins", imagem: "img/criaturas/yardlings.jpg", texto: "Criaturinhas esverdeadas de orelhas pontudas presas dentro de anões de jardim de cerâmica." },
  ],

  fosseis: [
    { nome: "Lowenosaurus mystica", texto: "Hadrossauro herbívoro com crista. Símbolo paleontológico da cidade." },
    { nome: "Carchodonax minimus", texto: "Pequeno terópode predador, estrela do museu." },
    { nome: "Lowenotitan aculeodorsis", texto: "Titanossauro com placas e dois espinhos dorsais altos." },
    { nome: "Lowenpterus serracrista", texto: "Pterossauro piscívoro de bico dentado e grande crista ocre." },
    { nome: "Lowenmammuthus borealis", texto: "Mamute-do-brejo de pelagem marrom-escura, do antigo lago glacial." },
    { nome: "Alligatrosuchus lowenensis", texto: "Crocodilomorfo fóssil, o \"Rastejante Assombrado\"." },
  ],

  eventos: [
    { nome: "Catfish Festival", texto: "Festival de verão em honra ao bagre e à lenda de Bruto. Bandeirinhas, barracas e roda-gigante." },
    { nome: "Blue Moon Fest", texto: "Verão no Big Blue Lake: fogueiras, barcos, música e lendas." },
    { nome: "LowenCon", texto: "Convenção nerd com toques steampunk numa estação ferroviária abandonada." },
    { nome: "Monster Jam", texto: "Show de monster trucks." },
  ],

  /* ---------- Portfólio ----------
     categoria: "Desenhos", "Quadrinhos" ou "Fichas" (pode criar outras) */
  portfolio: [
    { titulo: "Lowen Punks ao vivo no Rusthook", categoria: "Desenhos", ano: "2025", imagem: "img/portfolio/01.jpg" },
    { titulo: "Ficha de personagem: Jane", categoria: "Fichas", ano: "2026", imagem: "img/portfolio/02.jpg" },
    { titulo: "Fat Boy na estrada", categoria: "Quadrinhos", ano: "2025", imagem: "img/portfolio/03.jpg" },
    { titulo: "Asha e Mr. Waffles", categoria: "Desenhos", ano: "2026", imagem: "img/portfolio/04.jpg" },
    { titulo: "Expedição a Echo Ridge, pág. 1", categoria: "Quadrinhos", ano: "2026", imagem: "img/portfolio/05.jpg" },
    { titulo: "Recrutas da Área 52", categoria: "Fichas", ano: "2026", imagem: "img/portfolio/06.jpg" },
    { titulo: "Big Swamp Pub", categoria: "Desenhos", ano: "2025", imagem: "img/portfolio/07.jpg" },
    { titulo: "Lia volta à Saint Dymphna", categoria: "Quadrinhos", ano: "2026", imagem: "img/portfolio/08.jpg" },
  ],

  /* ---------- Encomendas (commissions) ---------- */
  encomendas: {
    abertas: true,            // true = "Abertas", false = "Fechadas"
    vagas: "3 vagas este mês",
    moeda: "US$",
    // PREÇOS DE EXEMPLO: troque pelos seus valores antes de publicar.
    tipos: [
      { nome: "Sketch", preco: "25", detalhe: "Lápis ou traço digital, sem cor. 1 personagem." },
      { nome: "Busto colorido", preco: "45", detalhe: "Do peito para cima, cor chapada e fundo simples." },
      { nome: "Corpo inteiro", preco: "80", detalhe: "Colorido, com sombra e fundo simples." },
      { nome: "Ficha de personagem", preco: "120", detalhe: "Frente, lado, costas, close do rosto e paleta." },
      { nome: "Página de quadrinho", preco: "150", detalhe: "Até 6 quadros, arte-final e cor." },
    ],
    extras: [
      "Personagem adicional: +70% do valor base",
      "Fundo detalhado: a partir de +30",
      "Uso comercial: sob consulta",
    ],
    faco: ["Personagens originais (OCs)", "Fan art", "Personagens de Lowen Lake", "Animais e criaturas", "Punk, terror leve e comédia"],
    naoFaco: ["Ódio ou discriminação", "Arte que imite traço de outro artista", "Pessoas reais sem autorização"],
    passos: [
      "Você envia o pedido pelo formulário ou por e-mail.",
      "Eu respondo com orçamento e prazo.",
      "Pagamento de 50% para começar (ou 100% para pedidos pequenos).",
      "Envio o rascunho para você aprovar ajustes.",
      "Finalizo, você paga o restante e recebe o arquivo em alta resolução.",
    ],
    pagamento: "PayPal, Pix ou Wise",
    prazo: "2 a 4 semanas",
  },
};
