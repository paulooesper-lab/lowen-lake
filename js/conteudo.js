/* =====================================================================
   LOWEN LAKE — CONTEÚDO DO SITE (português + inglês)
   ---------------------------------------------------------------------
   Este é o arquivo que você edita para mudar textos, personagens, locais,
   eventos, portfólio e preços.

   IDIOMAS: todo texto que aparece nos dois idiomas é escrito assim:
       { pt: "Texto em português", en: "Text in English" }
   Se um texto for igual nos dois idiomas (um nome, por exemplo),
   pode ser só "Texto".

   IMAGENS: coloque os arquivos em /img e escreva o caminho no campo
   "imagem". Para trocar, salve a imagem nova com o mesmo nome por cima.
   Se a imagem não existir, o site mostra um cartão provisório.

   Dica: mantenha as aspas e vírgulas. Se o site ficar em branco depois
   de uma edição, provavelmente faltou uma vírgula, uma chave ou aspas.
   ===================================================================== */

window.SITE = {

  /* ---------- Identidade geral ---------- */
  nomeArtista: "RaptorWedgie",
  email: "raptorwedgie@gmail.com",
  // Formspree (opcional, grátis): crie um formulário em formspree.io e cole o endereço aqui.
  // Vazio = o formulário abre o programa de e-mail do visitante.
  formspree: "",
  redes: [
    // { nome: "Instagram", url: "https://instagram.com/seu_usuario" },
  ],

  /* ---------- Banners (paisagem de fundo de cada painel) ---------- */
  banners: {
    inicio: "img/banners/inicio.jpg",
    cidade: "img/banners/cidade.jpg",
    personagens: "img/banners/personagens.jpg",
    locais: "img/banners/locais.jpg",
    mapa: "img/banners/mapa.jpg",
    lendas: "img/banners/lendas.jpg",
    eventos: "img/banners/eventos.jpg",
    portfolio: "img/banners/portfolio.jpg",
    encomendas: "img/banners/encomendas.jpg",
  },

  cidade: {
    nome: "Lowen Lake",
    condado: "Lowen Lake County",
    lema: { pt: "Unidos pela terra, guiados pelo espírito.", en: "United by the land, guided by the spirit." },
    resumo: {
      pt: "Uma cidade pequena do sudeste dos Estados Unidos, na borda dos Apalaches, entre pântanos, grandes lagos, montanhas e florestas de pinheiros. Aqui convivem cultura sulista, jovens punks, resgate de animais, lendas indígenas, criptídeos e uma instalação federal que oficialmente não existe.",
      en: "A small town in the southeastern United States, on the edge of the Appalachians, among swamps, big lakes, mountains and pine forests. Southern culture, punk kids, animal rescue, Native legends, cryptids and a federal facility that officially doesn't exist all share the same streets.",
    },
    tom: {
      pt: "Comédia dramática punk, humor físico, aventura, mistério local e criptozoologia. Numa mesma noite pode haver um show no ferro-velho, um jacaré atravessando a estrada e luzes estranhas sobre Echo Ridge.",
      en: "Punk dramedy, slapstick, adventure, small-town mystery and cryptozoology. One night can bring a junkyard show, an alligator crossing the road and strange lights over Echo Ridge.",
    },
    curiosidade: { rotulo: { pt: "Relógio da Prefeitura", en: "City Hall clock" }, valor: "3:47", nota: { pt: "parado desde 1972", en: "stopped since 1972" } },
  },

  historia: [
    { titulo: { pt: "Antes da cidade", en: "Before the town" },
      texto: { pt: "A região já era habitada por um povo indígena ancestral, com uma relação espiritual profunda com a terra, a floresta e as montanhas.", en: "The region was already home to an ancestral Native people with a deep spiritual bond with the land, the forest and the mountains." } },
    { titulo: { pt: "Lowen e Nayeli", en: "Lowen and Nayeli" },
      texto: { pt: "No início do século XIX chega Lowen, um explorador europeu. Nayeli, curandeira e líder espiritual, ensina a ele a respeitar a terra. Os dois são lembrados como fundadores da cidade. Se houve romance entre eles, ninguém sabe: é uma das lendas favoritas da cidade.", en: "In the early 1800s Lowen, a European explorer, arrives. Nayeli, a healer and spiritual leader, teaches him to respect the land. Both are remembered as the town's founders. Whether they were in love nobody knows: it's one of the town's favorite legends." } },
    { titulo: { pt: "A praça dos fundadores", en: "Founders' Square" },
      texto: { pt: "Em Old Hollow, uma estátua de Lowen e Nayeli traz bússola, máscara ritual e folhas de pinheiro. O pato selvagem é o símbolo da cidade e está no brasão.", en: "In Old Hollow, a statue of Lowen and Nayeli carries a compass, a ritual mask and pine needles. The wild duck is the town's symbol and sits on its seal." } },
    { titulo: { pt: "Guerra Fria", en: "Cold War" },
      texto: { pt: "Nos anos 1950–60, investigações federais sobre luzes no céu de Big Blue Lake e Echo Ridge dão origem à Área 52, escondida nas colinas do norte.", en: "In the 1950s–60s, federal investigations into lights over Big Blue Lake and Echo Ridge give birth to Area 52, hidden in the northern hills." } },
  ],

  cronologia: [
    { data: { pt: "Antes de Lowen", en: "Before Lowen" }, fato: { pt: "Povo indígena ancestral habita a região.", en: "An ancestral Native people live in the region." } },
    { data: { pt: "Início do séc. XIX", en: "Early 1800s" }, fato: { pt: "Lowen chega; a cidade nasce com Nayeli.", en: "Lowen arrives; the town is born with Nayeli." } },
    { data: "1857", fato: { pt: "Ano no brasão do Sheriff's Office.", en: "Year on the Sheriff's Office seal." } },
    { data: "1950–60", fato: { pt: "Criação da Área 52.", en: "Area 52 is founded." } },
    { data: "1972", fato: { pt: "O relógio da prefeitura para às 3h47.", en: "City Hall's clock stops at 3:47." } },
    { data: "1987", fato: { pt: "Acidente e interdição do Dock 4.", en: "Accident closes Dock 4." } },
    { data: "1998", fato: { pt: "Abre o Big Swamp Pub.", en: "The Big Swamp Pub opens." } },
    { data: { pt: "Hoje", en: "Today" }, fato: { pt: "Banda, resgates, festivais e mistérios.", en: "The band, rescues, festivals and mysteries." } },
  ],

  /* ---------- Personagens ----------
     grupo: uma das chaves de "grupos" abaixo. cor: cores do cartão provisório. */
  grupos: {
    punks: "Lowen Punks",
    amigos: { pt: "Amigos", en: "Friends" },
    cidade: { pt: "Família & Cidade", en: "Family & Town" },
    xerifado: { pt: "Xerifado", en: "Sheriff's Office" },
    area52: { pt: "Área 52", en: "Area 52" },
    fundadores: { pt: "Fundadores", en: "Founders" },
  },

  personagens: [
    { id: "jane", nome: "Jane Walker", idade: "19", grupo: "punks", imagem: "img/personagens/jane.jpg", cor: ["#1b1b1b", "#ff3d8b"],
      papel: { pt: "Vocal · Turtles & Gators Rescue", en: "Vocals · Turtles & Gators Rescue" },
      aparencia: { pt: "Moicano preto alto com mechas rosa e verde, olhos cor de mel, físico atlético, piercings no septo e na sobrancelha, alargadores e tatuagens.", en: "Tall black mohawk with pink and green streaks, honey eyes, athletic build, septum and eyebrow piercings, ear gauges and tattoos." },
      personalidade: { pt: "Líder, sarcástica, direta, corajosa, teimosa e leal. Protetora, principalmente com Asha.", en: "Leader, sarcastic, blunt, brave, stubborn and loyal. Protective, especially of Asha." },
      historia: { pt: "Nasceu em Miami e foi criada pelo tio Jim desde os quatro anos. Trabalha no resgate desde os 15, mora em Gator View Park, dirige um Jeep CJ-7 amarelo e joga roller derby. Namora Asha.", en: "Born in Miami and raised by her uncle Jim since age four. Has worked at the rescue since 15, lives in Gator View Park, drives a yellow Jeep CJ-7 and plays roller derby. Dating Asha." },
      relacoes: { pt: ["Asha (namorada)", "Jim (tio)", "Raven (mentora)"], en: ["Asha (girlfriend)", "Jim (uncle)", "Raven (mentor)"] } },

    { id: "asha", nome: "Asha Parker", idade: "18", grupo: "punks", imagem: "img/personagens/asha.jpg", cor: ["#3b2418", "#7fbf9a"],
      papel: { pt: "Guitarra", en: "Guitar" },
      aparencia: { pt: "Cabelo castanho-escuro longo e liso com franja reta, pele muito clara, olhos verdes, visual punk que ainda guarda algo de arrumado. Tatuagem de tubarão com orquídeas na coxa direita.", en: "Long straight dark-brown hair with blunt bangs, very fair skin, green eyes, a punk look that still keeps something polished. Shark-and-orchids tattoo on her right thigh." },
      personalidade: { pt: "Ex-popular e ex-líder de torcida das Gator Girls. Vaidosa, introspectiva e corajosa.", en: "Former popular girl and Gator Girls cheerleader. Vain, introspective and brave." },
      historia: { pt: "Mergulhou no punk quando se apaixonou por Jane. Mora em Lakeshore Bay com os pais Amelia e Greg e a irmã Katie. Tem um gato persa, Mr. Waffles.", en: "Dove into punk when she fell for Jane. Lives in Lakeshore Bay with her parents Amelia and Greg and her sister Katie. Owns a Persian cat, Mr. Waffles." },
      relacoes: { pt: ["Jane (namorada)", "Zoey Hart (ex)", "Katie (irmã)"], en: ["Jane (girlfriend)", "Zoey Hart (ex)", "Katie (sister)"] } },

    { id: "lia", nome: "Lia", idade: "18", grupo: "punks", imagem: "img/personagens/lia.jpg", cor: ["#9b6bd6", "#2a2030"],
      papel: { pt: "Baixo", en: "Bass" },
      aparencia: { pt: "Moicano lilás, pele pálida, delineador e batom escuros, piercings no lábio e na sobrancelha. Punk gótica elegante.", en: "Lilac mohawk, pale skin, dark eyeliner and lipstick, lip and eyebrow piercings. Elegant goth punk." },
      personalidade: { pt: "Inteligente, misteriosa, sarcástica e a mais radical no punk.", en: "Smart, mysterious, sarcastic and the most hardcore punk of the group." },
      historia: { pt: "De família rica de Lakeshore Bay, ex-aluna e ex-violinista da Saint Dymphna. Tem um rottweiler e um romance secreto com Viktor.", en: "From a wealthy Lakeshore Bay family; former Saint Dymphna student and violinist. Owns a rottweiler and has a secret romance with Viktor." },
      relacoes: { pt: ["Viktor (romance secreto)"], en: ["Viktor (secret romance)"] } },

    { id: "lily", nome: "Lily", idade: "18", grupo: "punks", imagem: "img/personagens/lily.jpg", cor: ["#f3f0e2", "#ff8fc0"],
      papel: { pt: "Bateria", en: "Drums" },
      aparencia: { pt: "A menor do grupo. Moicano platinado com a frente rosa, olhos azuis.", en: "The smallest of the group. Platinum mohawk with pink tips, blue eyes." },
      personalidade: { pt: "Inteligente, pacífica, curiosa e ligada à natureza. Nos vlogs, energia caótica.", en: "Smart, peaceful, curious and nature-loving. Pure chaos in the vlogs." },
      historia: { pt: "Filha de mãe hippie, tem dois irmãos gêmeos e mora numa casa cheia de plantas com a arara Lerya e o dálmata Lary.", en: "Daughter of a hippie mom, has twin little brothers and lives in a house full of plants with Lerya the macaw and Lary the Dalmatian." },
      relacoes: { pt: ["Lerya (arara)", "Lary (dálmata)"], en: ["Lerya (macaw)", "Lary (Dalmatian)"] } },

    { id: "debra", nome: "Debra", idade: "18–19", grupo: "amigos", imagem: "img/personagens/debra.jpg", cor: ["#c2502a", "#6fa8dc"],
      papel: { pt: "Fotógrafa dos vlogs", en: "Vlog photographer" },
      aparencia: { pt: "Ruiva de cabelo chanel, gordinha, óculos, cardigã, roupas confortáveis e câmera sempre no pescoço.", en: "Redhead with a bob, chubby, glasses, cardigan, comfy clothes and a camera always around her neck." },
      personalidade: { pt: "Nerd, estrategista e bem-humorada. Fã de ficção científica.", en: "Nerdy, strategic and funny. Sci-fi fan." },
      historia: { pt: "Registra os desafios e vlogs do grupo. Mora numa casa simples com um bulldog inglês e peixes japoneses.", en: "Shoots the group's stunts and vlogs. Lives in a simple house with an English bulldog and koi fish." },
      relacoes: { pt: ["Yuko (melhor amiga)"], en: ["Yuko (best friend)"] } },

    { id: "yuko", nome: "Yuko", idade: "18", grupo: "amigos", imagem: "img/personagens/yuko.jpg", cor: ["#111111", "#9fd36b"],
      papel: { pt: "Nerd de dinossauros", en: "Dinosaur nerd" },
      aparencia: { pt: "Japonesa, cabelo preto liso com franja, óculos grandes, moletom de dinossauro e meias longas.", en: "Japanese, straight black hair with bangs, big glasses, dinosaur hoodie and knee socks." },
      personalidade: { pt: "Autista, alegre, espontânea e curiosa. Apaixonada por dinossauros e pelas criaturas da cidade.", en: "Autistic, cheerful, spontaneous and curious. Obsessed with dinosaurs and the town's creatures." },
      historia: { pt: "Presença garantida no museu e na LowenCon. Cria baratas-de-madagascar, um gecko-leopardo, um camaleão, a rã-touro albina Yaburo e agapornis.", en: "Never misses the museum or LowenCon. Keeps Madagascar hissing cockroaches, a leopard gecko, a chameleon, Yaburo the albino bullfrog and lovebirds." },
      relacoes: { pt: ["Debra (melhor amiga)"], en: ["Debra (best friend)"] } },

    { id: "viktor", nome: "Viktor \"Red Smoke\"", idade: { pt: "20 e poucos", en: "early 20s" }, grupo: "amigos", imagem: "img/personagens/viktor.jpg", cor: ["#b8321f", "#2b2b2b"],
      papel: { pt: "Trambiqueiro e cinegrafista", en: "Hustler and cameraman" },
      aparencia: { pt: "Magro, cabelo e barba ruivos curtos, jaqueta de couro com patches.", en: "Skinny, short red hair and beard, leather jacket with patches." },
      personalidade: { pt: "Malandro, improvisador, provocador e às vezes irresponsável.", en: "Hustler, improviser, provocateur and sometimes reckless." },
      historia: { pt: "Vive numa van preta, vende de tudo e filma falsos documentários. Um guaxinim vive perseguindo ele.", en: "Lives in a black van, sells anything and films mockumentaries. A raccoon keeps chasing him." },
      relacoes: { pt: ["Lia (romance secreto)"], en: ["Lia (secret romance)"] } },

    { id: "zoey", nome: "Zoey Hart", idade: "19", grupo: "amigos", imagem: "img/personagens/zoey.jpg", cor: ["#1e7bff", "#2a2030"],
      papel: { pt: "Canal Blue Static", en: "Blue Static channel" },
      aparencia: { pt: "Cabelo azul-elétrico com laterais raspadas, batom escuro e um sol tatuado na mão direita.", en: "Electric-blue hair with shaved sides, dark lipstick and a sun tattoo on her right hand." },
      personalidade: { pt: "Sarcástica, espirituosa, confiante e provocadora.", en: "Sarcastic, witty, confident and teasing." },
      historia: { pt: "Tocava guitarra numa banda indie. Namorou Asha e ainda a chama de \"princesa elétrica\".", en: "Played guitar in an indie band. Dated Asha and still calls her \"electric princess\"." },
      relacoes: { pt: ["Asha (ex)"], en: ["Asha (ex)"] } },

    { id: "jim", nome: "James \"Jim\" Walker", idade: "~50", grupo: "cidade", imagem: "img/personagens/jim.jpg", cor: ["#5a4632", "#6b7a3a"],
      papel: { pt: "Fundador do Turtles & Gators Rescue", en: "Founder of Turtles & Gators Rescue" },
      aparencia: { pt: "Forte, barbudo, queimado de sol, tatuagens antigas, boné para trás.", en: "Burly, bearded, sunburned, old tattoos, backwards cap." },
      personalidade: { pt: "Ex-militar calado, prático, teimoso e protetor. Desconfia de autoridades.", en: "Quiet ex-military, practical, stubborn and protective. Distrusts authority." },
      historia: { pt: "Criou a sobrinha Jane. Mora num trailer ampliado em Gator View Park e dirige uma Ford F-250 verde-oliva.", en: "Raised his niece Jane. Lives in an expanded trailer in Gator View Park and drives an olive-green Ford F-250." },
      relacoes: { pt: ["Jane (sobrinha)", "Ellen (tensão antiga)"], en: ["Jane (niece)", "Ellen (old flame)"] } },

    { id: "ellen", nome: { pt: "Xerife Ellen", en: "Sheriff Ellen" }, idade: "~40", grupo: "xerifado", imagem: "img/personagens/ellen.jpg", cor: ["#e6c76a", "#7a5a32"],
      papel: "Lowen Lake County Sheriff's Office",
      aparencia: { pt: "Loira de cabelo chanel, olhos azuis, uniforme bege e distintivo dourado.", en: "Blonde bob, blue eyes, tan uniform and gold badge." },
      personalidade: { pt: "Séria, metódica, firme e ética. \"A cidade nunca dorme, e nem eu.\"", en: "Serious, methodical, firm and ethical. \"The town never sleeps, and neither do I.\"" },
      historia: { pt: "Comanda a polícia em Old Hollow e dirige uma Ford Bronco 1995, \"A Velha Bronca\". Suspeita da Área 52.", en: "Runs the police in Old Hollow and drives a 1995 Ford Bronco, \"Old Bronc\". Suspicious of Area 52." },
      relacoes: { pt: ["Jim (afeto antigo)", "Camila Reyes"], en: ["Jim (old flame)", "Camila Reyes"] } },

    { id: "william", nome: "William", idade: "50–60", grupo: "cidade", imagem: "img/personagens/william.jpg", cor: ["#3a2a20", "#2f7fb5"],
      papel: { pt: "Dono do Big Swamp Pub", en: "Owner of the Big Swamp Pub" },
      aparencia: { pt: "Homem negro grande, barba grisalha, camisa azul, boné de caminhoneiro e avental.", en: "Big Black man, graying beard, blue shirt, trucker cap and apron." },
      personalidade: { pt: "Carismático, protetor, paciente e de humor seco.", en: "Charismatic, protective, patient, with a dry sense of humor." },
      historia: { pt: "Figura paterna do grupo. Famoso pelo hambúrguer de lagosta de água doce.", en: "The group's father figure. Famous for his crawfish burger." },
      relacoes: { pt: ["Jane, Asha e Lia"], en: ["Jane, Asha and Lia"] } },

    { id: "raven", nome: "Raven", idade: { pt: "40 e poucos", en: "early 40s" }, grupo: "cidade", imagem: "img/personagens/raven.jpg", cor: ["#141414", "#8a1c2b"],
      papel: { pt: "Dona da Crimson Owl", en: "Owner of the Crimson Owl" },
      aparencia: { pt: "Cabelo preto curto e ondulado, braços tatuados, maquiagem escura e anéis.", en: "Short wavy black hair, tattooed arms, dark makeup and rings." },
      personalidade: { pt: "Mulher trans punk e gótica, de olhar afiado e elegância sombria.", en: "Punk goth trans woman with a sharp gaze and dark elegance." },
      historia: { pt: "Ex-integrante da banda The Blood Widows. Lê tarô e é mentora de Jane.", en: "Former member of The Blood Widows. Reads tarot and mentors Jane." },
      relacoes: { pt: ["Jane (mentorada)"], en: ["Jane (mentee)"] } },

    { id: "katie", nome: "Katie Parker", idade: "12", grupo: "cidade", imagem: "img/personagens/katie.jpg", cor: ["#6b4a30", "#f2a541"],
      papel: { pt: "Irmã da Asha", en: "Asha's sister" },
      personalidade: { pt: "Uma peste. Percebe mais do que os adultos imaginam.", en: "A pest. Notices more than the adults think." },
      historia: { pt: "Filha de Amelia e Greg Parker, cujo casamento está em crise.", en: "Daughter of Amelia and Greg Parker, whose marriage is in trouble." } },

    { id: "frank", nome: "Frank", grupo: "cidade", imagem: "img/personagens/frank.jpg", cor: ["#7a6a4a", "#6b7a3a"],
      papel: "Turtles & Gators Rescue",
      aparencia: { pt: "Caipira cabeludo, nariz grande, cara de cansado.", en: "Long-haired country boy, big nose, tired face." },
      personalidade: { pt: "Piadista e desajeitado, mas entende de bicho como ninguém.", en: "Joker and clumsy, but knows animals like no one else." } },

    { id: "rattles", nome: "Dwayne \"Rattles\" Holloway", grupo: "cidade", imagem: "img/personagens/rattles.jpg", cor: ["#4a3a2a", "#c9a227"],
      papel: "Turtles & Gators Rescue",
      aparencia: { pt: "Magricelo e excêntrico, sempre com uma cobra por perto.", en: "Skinny and eccentric, always with a snake nearby." },
      historia: { pt: "Criador amador de répteis que conhece cada canal de Mossbend.", en: "Amateur reptile breeder who knows every channel in Mossbend." } },

    { id: "biglou", nome: "Louanne \"Big Lou\" Prichard", grupo: "cidade", imagem: "img/personagens/biglou.jpg", cor: ["#7a3b2a", "#9aa69c"],
      papel: { pt: "Vizinha em Gator View Park", en: "Gator View Park neighbor" },
      personalidade: { pt: "Durona, de voz rouca.", en: "Tough, raspy-voiced." },
      historia: { pt: "Mecânica aposentada, dona do pitbull Satanás.", en: "Retired mechanic, owner of a pit bull named Satanás." } },

    { id: "niko", nome: "Nicholas \"Niko\" Reed", idade: { pt: "adolescente", en: "teen" }, grupo: "cidade", imagem: "img/personagens/niko.jpg", cor: ["#222222", "#e8b623"],
      papel: { pt: "Vizinho punk", en: "Punk neighbor" },
      personalidade: { pt: "Punk barulhento e ciumento em relação a Asha.", en: "Loud punk, jealous of Asha." } },

    { id: "millie", nome: { pt: "Vovó Millie", en: "Grandma Millie" }, grupo: "cidade", imagem: "img/personagens/millie.jpg", cor: ["#d8d2c0", "#5c7a3e"],
      papel: { pt: "Curandeira de Gator View Park", en: "Gator View Park healer" },
      personalidade: { pt: "Mística, de conselhos enigmáticos. Protege Jane.", en: "Mystic, full of cryptic advice. Looks out for Jane." } },

    { id: "martha", nome: { pt: "Prefeita Martha E. Kingsley", en: "Mayor Martha E. Kingsley" }, grupo: "cidade", imagem: "img/personagens/martha.jpg", cor: ["#8a8a8a", "#2f7fb5"],
      papel: { pt: "Prefeitura de Lowen Lake", en: "Lowen Lake City Hall" },
      personalidade: { pt: "Conservadora moderada, ética e protetora da cidade.", en: "Moderate conservative, ethical and protective of the town." },
      historia: { pt: "Viúva, dona do gato Thoreau. Sabe que a Área 52 existe.", en: "Widow, owner of a cat named Thoreau. Knows Area 52 exists." } },

    { id: "trudy", nome: "Trudy Klein", idade: { pt: "30 e poucos", en: "early 30s" }, grupo: "cidade", imagem: "img/personagens/trudy.jpg", cor: ["#e6c76a", "#c2502a"],
      papel: { pt: "Repórter do Lowen Lake Gazette", en: "Lowen Lake Gazette reporter" },
      personalidade: { pt: "Teatral, insistente e dramática. Adora aparecer nas fotos.", en: "Theatrical, pushy and dramatic. Loves being in the photos." },
      historia: { pt: "Trabalha com o cinegrafista Benny Cruz.", en: "Works with cameraman Benny Cruz." } },

    { id: "camila", nome: "Camila Reyes", idade: "~27", grupo: "xerifado", imagem: "img/personagens/camila.jpg", cor: ["#3b2418", "#e8b623"],
      papel: { pt: "Oficial", en: "Deputy" },
      personalidade: { pt: "Observadora, leal a Ellen, ótima pontaria e boa em investigação digital.", en: "Observant, loyal to Ellen, a sharp shooter and good at digital forensics." },
      historia: { pt: "Filha de imigrantes mexicanos.", en: "Daughter of Mexican immigrants." } },

    { id: "terry", nome: "Terry Blake", idade: "35", grupo: "xerifado", imagem: "img/personagens/terry.jpg", cor: ["#2a1d16", "#e8b623"],
      papel: { pt: "Oficial", en: "Deputy" },
      personalidade: { pt: "Sério, tímido e engraçado. Honesto.", en: "Serious, shy and funny. Honest." },
      historia: { pt: "Deixou outra polícia por recusar corrupção. Escreve poemas em segredo.", en: "Left another department after refusing to go corrupt. Writes poems in secret." } },

    { id: "kenken", nome: "Kenny \"Ken-Ken\" Dobbs", idade: "23", grupo: "xerifado", imagem: "img/personagens/kenken.jpg", cor: ["#c2502a", "#e8b623"],
      papel: { pt: "Policial em treinamento", en: "Deputy in training" },
      personalidade: { pt: "Inseguro, falante e louco para agradar. Idolatra Ellen e Camila.", en: "Insecure, chatty and eager to please. Idolizes Ellen and Camila." } },

    { id: "cross", nome: { pt: "General Evelyn Cross", en: "General Evelyn Cross" }, idade: "~48", grupo: "area52", imagem: "img/personagens/cross.jpg", cor: ["#4a3a2e", "#6b7a3a"],
      papel: { pt: "Comando da Área 52", en: "Area 52 command" },
      aparencia: { pt: "Rosto angular, cicatriz na sobrancelha, cabelo grisalho em coque baixo, uniforme camuflado.", en: "Angular face, scarred eyebrow, graying hair in a low bun, camo uniform." },
      personalidade: { pt: "Autoritária, disciplinada e de humor seco, com cuidado contido pelas recrutas.", en: "Authoritative, disciplined and dry-humored, with a quiet care for her recruits." } },

    { id: "mara", nome: "Mara Sloane", idade: "24", grupo: "area52", imagem: "img/personagens/mara.jpg", cor: ["#5a4030", "#d8d2c0"],
      papel: { pt: "Recruta · HRU", en: "Recruit · HRU" },
      aparencia: { pt: "Atlética, cabelo castanho com undercut, tatuagem do White Moth Man.", en: "Athletic, brown undercut, White Moth Man tattoo." },
      personalidade: { pt: "Intensa, confiante, irreverente e impulsiva.", en: "Intense, confident, irreverent and impulsive." } },

    { id: "nora", nome: "Nora Quinn", idade: "22", grupo: "area52", imagem: "img/personagens/nora.jpg", cor: ["#6b4a30", "#6b7a3a"],
      papel: { pt: "Recruta · Surface Ops", en: "Recruit · Surface Ops" },
      personalidade: { pt: "Calma, estável e observadora.", en: "Calm, steady and observant." } },

    { id: "sofia", nome: "Sofia Ramirez", idade: "23", grupo: "area52", imagem: "img/personagens/sofia.jpg", cor: ["#2a1d16", "#6b7a3a"],
      papel: { pt: "Recruta · Contenção e Transporte", en: "Recruit · Containment & Transport" },
      personalidade: { pt: "Extrovertida e prática.", en: "Outgoing and practical." } },

    { id: "emily", nome: "Emily Allen", idade: "21", grupo: "area52", imagem: "img/personagens/emily.jpg", cor: ["#e6c76a", "#6b7a3a"],
      papel: { pt: "Recruta · Sinais e Vigilância", en: "Recruit · Signals & Surveillance" },
      personalidade: { pt: "Otimista, confiável e animada.", en: "Optimistic, reliable and upbeat." } },

    { id: "priya", nome: "Priya Nair", idade: "25", grupo: "area52", imagem: "img/personagens/priya.jpg", cor: ["#1a1410", "#6b7a3a"],
      papel: { pt: "Recruta · Canil", en: "Recruit · K-9 unit" },
      personalidade: { pt: "Calorosa, equilibrada e perceptiva. O pastor-alemão K-52 Ranger obedece melhor a ela.", en: "Warm, balanced and perceptive. K-52 Ranger, the German shepherd, listens to her best." } },

    { id: "lowen", nome: "Lowen", idade: { pt: "séc. XIX", en: "1800s" }, grupo: "fundadores", imagem: "img/personagens/lowen.jpg", cor: ["#6b4a30", "#a08a5a"],
      papel: { pt: "Explorador e cofundador", en: "Explorer and co-founder" },
      aparencia: { pt: "Cabelo castanho ondulado, barba leve, roupas de explorador do século XIX.", en: "Wavy brown hair, light beard, 19th-century explorer clothes." },
      historia: { pt: "Explorador europeu que chegou no início do século XIX e deu nome à cidade.", en: "European explorer who arrived in the early 1800s and gave the town its name." } },

    { id: "nayeli", nome: "Nayeli", idade: { pt: "séc. XIX", en: "1800s" }, grupo: "fundadores", imagem: "img/personagens/nayeli.jpg", cor: ["#1a1410", "#c9a227"],
      papel: { pt: "Curandeira e cofundadora", en: "Healer and co-founder" },
      aparencia: { pt: "Pele morena, cabelos longos trançados, contas, penas e braceletes.", en: "Brown skin, long braided hair, beads, feathers and bracelets." },
      historia: { pt: "Líder espiritual e guardiã do Espelho da Alma. As fontes de Nayeli Springs levam seu nome.", en: "Spiritual leader and keeper of the Soul Mirror. Nayeli Springs is named after her." } },
  ],

  /* ---------- Locais ----------
     Cada local tem um cartão, uma caixa rápida e uma PÁGINA própria (local.html?id=...).
     pagina.secoes: blocos de texto da página. lista = itens com marcador.
     pagina.fosseis: true mostra a galeria de fósseis; pagina.personagens: ids de personagens. */
  locais: [
    { id: "museu", nome: { pt: "Museu de Lowen Lake", en: "Lowen Lake Museum" }, regiao: "oldhollow", imagem: "img/locais/museu.jpg",
      tipo: { pt: "Museu", en: "Museum" },
      resumo: { pt: "Dinossauros que só existiram aqui, a história dos fundadores e uma sala trancada que ninguém explica.", en: "Dinosaurs found nowhere else, the founders' story and a locked room nobody can explain." },
      pagina: {
        intro: { pt: "Prédio de tijolos vermelhos com vitrais e colunas, ao lado da prefeitura em Old Hollow. É o orgulho científico da cidade e, ao mesmo tempo, o lugar onde as lendas locais ganham vitrine. O museu separa com cuidado o que é ciência do que é folclore, mas os funcionários admitem que algumas peças nunca ficam no lugar.", en: "A red-brick building with stained glass and columns next to City Hall in Old Hollow. It's the town's scientific pride and also where local legends get a display case. The museum carefully separates science from folklore, but the staff admit some pieces never stay where they're put." },
        fatos: [
          { rotulo: { pt: "Endereço", en: "Address" }, valor: "Main Street, Old Hollow" },
          { rotulo: { pt: "Estrela", en: "Star exhibit" }, valor: "Lowenosaurus mystica" },
          { rotulo: { pt: "Visitante nº 1", en: "Biggest fan" }, valor: "Yuko" },
        ],
        secoes: [
          { titulo: { pt: "Alas do museu", en: "Museum wings" },
            lista: { pt: ["Founders Hall: mapas, artefatos e a maquete da primeira vila", "Nayeli Cultural Gallery: a cultura indígena da região", "Frontier & Settlement Gallery", "Paleontology Hall: os dinossauros de Lowen Lake", "Wildlife Hall: fauna de Echo Ridge, Mossbend e do lago", "Legends & Mysteries Gallery: criptídeos e casos sem solução", "Research Lab e exposições temporárias"], en: ["Founders Hall: maps, artifacts and a model of the first village", "Nayeli Cultural Gallery: the region's Native culture", "Frontier & Settlement Gallery", "Paleontology Hall: Lowen Lake's dinosaurs", "Wildlife Hall: wildlife from Echo Ridge, Mossbend and the lake", "Legends & Mysteries Gallery: cryptids and unsolved cases", "Research Lab and temporary exhibits"] } },
          { titulo: { pt: "Paleontology Hall", en: "Paleontology Hall" },
            texto: { pt: "O salão mais visitado. Seis espécies fósseis encontradas na região estão expostas, algumas em esqueletos montados, outras em reconstruções em tamanho real.", en: "The most visited hall. Six fossil species found in the region are on display, some as mounted skeletons, others as life-size reconstructions." }, fosseis: true },
          { titulo: { pt: "A sala trancada", en: "The locked room" },
            texto: { pt: "Nos arquivos restritos existe uma sala de \"objetos reativos\". Há rumores de que o porão do museu se liga ao Dock 4 e a Mossbend por túneis antigos.", en: "In the restricted archives there's a room of \"reactive objects\". Rumor says the basement connects to Dock 4 and Mossbend through old tunnels." } },
          { titulo: { pt: "Frota do museu", en: "Museum fleet" },
            lista: { pt: ["FF-1 Fossil Field Van: pesquisa de campo", "ME-1 Mobile Exhibit Truck: exposição itinerante", "DC-1 Dino Crate Transport: transporte de fósseis", "MG-1 Museum Golf Cart"], en: ["FF-1 Fossil Field Van: field research", "ME-1 Mobile Exhibit Truck: traveling exhibit", "DC-1 Dino Crate Transport: fossil transport", "MG-1 Museum Golf Cart"] } },
        ],
        personagens: ["yuko", "debra", "nayeli", "lowen"],
      } },

    { id: "area52", nome: { pt: "Área 52", en: "Area 52" }, regiao: "area52", imagem: "img/locais/area52.jpg",
      tipo: { pt: "Instalação federal (não existe)", en: "Federal facility (doesn't exist)" },
      resumo: { pt: "Uma estação geológica abandonada nas montanhas. Oficialmente.", en: "An abandoned geological station in the mountains. Officially." },
      pagina: {
        intro: { pt: "Complexo federal secreto criado na Guerra Fria, nos anos 1950–60, nas colinas e cavernas entre Echo Ridge e Northend. Nasceu para investigar luzes sobre o Big Blue Lake e Echo Ridge, estudar fragmentos de possível tecnologia não humana e guardar objetos não identificados. Hoje está oficialmente desativado. Na prática, continua monitorado pelo Exército dos EUA.", en: "A secret federal complex built during the Cold War, in the 1950s–60s, in the hills and caves between Echo Ridge and Northend. It was created to investigate lights over Big Blue Lake and Echo Ridge, study fragments of possibly non-human technology and store unidentified objects. Today it's officially decommissioned. In practice, the US Army still watches it." },
        fatos: [
          { rotulo: { pt: "Fachada", en: "Cover story" }, valor: { pt: "Estação geológica desativada", en: "Decommissioned geological station" } },
          { rotulo: { pt: "Comando", en: "Command" }, valor: "Gen. Evelyn Cross" },
          { rotulo: { pt: "Setor proibido", en: "Off-limits" }, valor: { pt: "Ala de Contenção B", en: "Containment Wing B" } },
        ],
        secoes: [
          { titulo: { pt: "O que se vê de fora", en: "What you see from outside" },
            texto: { pt: "Prédios enferrujados e aparentemente abandonados, uma entrada camuflada na rocha com porta metálica, antenas, torres, câmeras, sensores, drones e patrulhas armadas. Por baixo, laboratórios subterrâneos e uma pista de pouso disfarçada.", en: "Rusty, seemingly abandoned buildings, a camouflaged entrance in the rock with a steel door, antennas, towers, cameras, sensors, drones and armed patrols. Underneath: underground labs and a disguised airstrip." } },
          { titulo: { pt: "Divisões", en: "Divisions" },
            lista: { pt: ["SOD · Surface Operations: perímetro e portões", "SSD · Subterranean Systems: níveis subterrâneos", "SIGSURV · Signals & Surveillance: rádio, câmeras e sensores", "CRD · Cryptid Research: pesquisa de criaturas", "CTD · Containment & Transport: contenção e transporte de espécimes", "GAA · Geological & Atmospheric Analysis", "AID · Archives & Intelligence", "HRU · Hazard Response Unit: resposta rápida"], en: ["SOD · Surface Operations: perimeter and gates", "SSD · Subterranean Systems: underground levels", "SIGSURV · Signals & Surveillance: radio, cameras and sensors", "CRD · Cryptid Research: creature research", "CTD · Containment & Transport: specimen containment and transport", "GAA · Geological & Atmospheric Analysis", "AID · Archives & Intelligence", "HRU · Hazard Response Unit: rapid response"] } },
          { titulo: { pt: "Veículos", en: "Vehicles" },
            lista: { pt: ["ASTU-17 \"Caminhão-Caixão\": transporte blindado de criaturas", "ARV-18 \"Sapo de Ferro\": reconhecimento anfíbio em Mossbend e no lago", "MRT-19 \"Antena Fantasma\": radar móvel de avistamentos", "DWST-20 \"Caminhonete de mentira\": falso veículo meteorológico", "Humvees, helicóptero preto e enxame de drones"], en: ["ASTU-17 \"Coffin Truck\": armored creature transport", "ARV-18 \"Iron Frog\": amphibious recon in Mossbend and the lake", "MRT-19 \"Ghost Antenna\": mobile sighting radar", "DWST-20 \"Fake Pickup\": decoy weather truck", "Humvees, a black helicopter and a drone swarm"] } },
          { titulo: { pt: "O que a cidade sabe", en: "What the town knows" },
            texto: { pt: "A existência é oficialmente negada, mas a prefeita Martha Kingsley e parte da elite sabem da base. Na cidade circulam rumores de experimentos com animais, hibridização e \"abduções controladas\". A xerife Ellen suspeita, mas não pode investigar sem autorização federal. E ninguém diz o que está selado na Ala de Contenção B.", en: "Its existence is officially denied, but Mayor Martha Kingsley and part of the elite know about it. Around town there are rumors of animal experiments, hybridization and \"controlled abductions\". Sheriff Ellen is suspicious but can't investigate without federal clearance. And nobody says what's sealed in Containment Wing B." } },
        ],
        personagens: ["cross", "mara", "nora", "sofia", "emily", "priya"],
      } },

    { id: "big-swamp", nome: "Big Swamp Pub", regiao: "gatorview", imagem: "img/locais/big-swamp.jpg",
      tipo: { pt: "Bar", en: "Bar" },
      resumo: { pt: "O pub de beira de estrada do William, onde a cidade inteira acaba se encontrando.", en: "William's roadside pub, where the whole town ends up sooner or later." },
      pagina: {
        intro: { pt: "Na beira da estrada, perto da entrada da cidade e de Gator View Park. É ponto de encontro de moradores, pescadores, turistas, jovens e até policiais. Madeira escura, peixes empalhados, fotos de bagres e jacarés, poltronas vermelhas dos anos 80, jukebox e o neon \"Cold Beer\" que nunca apaga.", en: "On the roadside near the town entrance and Gator View Park. Locals, fishermen, tourists, kids and even cops meet here. Dark wood, mounted fish, photos of catfish and gators, red 80s booths, a jukebox and a \"Cold Beer\" neon that never goes off." },
        fatos: [
          { rotulo: { pt: "Desde", en: "Since" }, valor: "1998" },
          { rotulo: { pt: "Dono", en: "Owner" }, valor: "William" },
          { rotulo: { pt: "Prato da casa", en: "House special" }, valor: { pt: "Hambúrguer de lagosta de água doce", en: "Crawfish burger" } },
        ],
        secoes: [
          { titulo: { pt: "O logo", en: "The logo" }, texto: { pt: "Um bagre segurando uma caneca de cerveja com a nadadeira, como se fosse uma mão.", en: "A catfish holding a beer mug with its fin like a hand." } },
          { titulo: { pt: "Histórias do balcão", en: "Stories from the bar" },
            lista: { pt: ["O hambúrguer que, segundo Asha, \"tem gosto de pântano\"", "A noite em que Jane e Asha tiraram um guaxinim albino da cozinha", "A enchente em que William saiu remando com hambúrgueres", "A escopeta atrás do balcão que ninguém viu disparar"], en: ["The burger Asha says \"tastes like swamp\"", "The night Jane and Asha pulled an albino raccoon out of the kitchen", "The flood when William paddled out with burgers", "The shotgun behind the bar nobody has seen fired"] } },
        ],
        personagens: ["william", "jane", "asha", "viktor"],
      } },

    { id: "rescue", nome: "Turtles & Gators Rescue", regiao: "mossbend", imagem: "img/locais/rescue.jpg",
      tipo: { pt: "Resgate de animais", en: "Animal rescue" },
      resumo: { pt: "O resgate do Jim: tartarugas, jacarés, cobras e, de vez em quando, um urso.", en: "Jim's rescue: turtles, gators, snakes and, now and then, a bear." },
      pagina: {
        intro: { pt: "Fundado e comandado por Jim Walker, à beira do pântano. Atende tartarugas, tartarugas-mordedoras, jacarés, cobras e qualquer bicho que apareça numa piscina, numa estrada ou dentro do Big Swamp.", en: "Founded and run by Jim Walker on the edge of the swamp. Handles turtles, snapping turtles, gators, snakes and any animal that shows up in a pool, on a road or inside the Big Swamp." },
        fatos: [
          { rotulo: { pt: "Fundador", en: "Founder" }, valor: "Jim Walker" },
          { rotulo: { pt: "Veículo", en: "Truck" }, valor: { pt: "Ford F-250 verde-oliva", en: "Olive-green Ford F-250" } },
          { rotulo: { pt: "Paciente mais famoso", en: "Most famous patient" }, valor: "Fat Boy" },
        ],
        secoes: [
          { titulo: { pt: "A equipe", en: "The crew" }, texto: { pt: "Jim, Jane (desde os 15 anos), Frank e Dwayne \"Rattles\" Holloway. Asha aparece de uniforme ajudando sempre que pode.", en: "Jim, Jane (since she was 15), Frank and Dwayne \"Rattles\" Holloway. Asha shows up in uniform to help whenever she can." } },
          { titulo: { pt: "Ocorrências memoráveis", en: "Memorable calls" },
            lista: { pt: ["O jacaré na piscina dos Parker, onde Jane e Asha se conheceram", "Fat Boy dormindo no meio da estrada entre Blue Pines e Mossbend", "Três filhotes de jacaré atrás do trailer depois da tempestade"], en: ["The gator in the Parkers' pool, where Jane and Asha met", "Fat Boy asleep in the middle of the road between Blue Pines and Mossbend", "Three baby gators behind the trailer after the storm"] } },
        ],
        personagens: ["jim", "jane", "frank", "rattles"],
      } },

    { id: "crimson-owl", nome: "Crimson Owl", regiao: "oldhollow", imagem: "img/locais/crimson-owl.jpg",
      tipo: { pt: "Loja esotérica e brechó", en: "Occult shop and thrift store" },
      resumo: { pt: "Cristais, tarô, mapas antigos e a Raven atrás do balcão.", en: "Crystals, tarot, old maps and Raven behind the counter." },
      pagina: {
        intro: { pt: "Na Crimson Owl Lane, em Old Hollow. Metade loja esotérica, metade brechó, com uma coruja empalhada na vitrine que parece seguir quem passa.", en: "On Crimson Owl Lane in Old Hollow. Half occult shop, half thrift store, with a stuffed owl in the window that seems to follow passersby." },
        fatos: [
          { rotulo: { pt: "Dona", en: "Owner" }, valor: "Raven" },
          { rotulo: { pt: "Endereço", en: "Address" }, valor: "Crimson Owl Lane" },
        ],
        secoes: [
          { titulo: { pt: "Nas prateleiras", en: "On the shelves" },
            lista: { pt: ["Cristais, amuletos e ervas", "Cartas de tarô", "Mapas antigos da região", "Réplicas do Espelho da Alma de Nayeli", "Esculturas de Bruto, do Lowenosaurus e do Homem do Pântano"], en: ["Crystals, amulets and herbs", "Tarot cards", "Old maps of the region", "Replicas of Nayeli's Soul Mirror", "Carvings of Bruto, Lowenosaurus and the Swamp Man"] } },
        ],
        personagens: ["raven", "jane"],
      } },

    { id: "prefeitura", nome: { pt: "Prefeitura", en: "City Hall" }, regiao: "oldhollow", imagem: "img/locais/prefeitura.jpg",
      tipo: "Main Street",
      resumo: { pt: "Prédio neoclássico, porão misterioso e um relógio parado às 3h47 desde 1972.", en: "Neoclassical building, mysterious basement and a clock stuck at 3:47 since 1972." },
      pagina: {
        intro: { pt: "O prédio neoclássico da Main Street já viu dias melhores. Ninguém consertou o relógio da torre, parado às 3h47 desde 1972, e ninguém explica direito o que tem no porão.", en: "The neoclassical building on Main Street has seen better days. Nobody has fixed the tower clock, stuck at 3:47 since 1972, and nobody quite explains what's in the basement." },
        fatos: [
          { rotulo: { pt: "Prefeita", en: "Mayor" }, valor: "Martha E. Kingsley" },
          { rotulo: { pt: "Relógio", en: "Clock" }, valor: "3:47" },
          { rotulo: { pt: "Lema", en: "Motto" }, valor: "Honoring the Past, Protecting the Wild" },
        ],
        secoes: [
          { titulo: { pt: "Quem trabalha aqui", en: "Who works here" }, texto: { pt: "A prefeita Martha Kingsley e Amelia Parker, mãe da Asha. Obras Públicas também sai daqui, com a frota RC-1, BI-2, FP-1 (bomba de enchente), SI-1 e o PF-1, que leva os carros alegóricos dos festivais.", en: "Mayor Martha Kingsley and Amelia Parker, Asha's mom. Public Works also runs from here, with units RC-1, BI-2, FP-1 (flood pump), SI-1 and PF-1, which hauls the festival floats." } },
        ],
        personagens: ["martha", "ellen"],
      } },

    { id: "high-school", nome: "Lowen Lake High School", regiao: "bluepines", imagem: "img/locais/high-school.jpg",
      tipo: { pt: "Escola pública", en: "Public high school" },
      resumo: { pt: "Casa dos Fighting Gators. \"Go Gators! Bite Back!\"", en: "Home of the Fighting Gators. \"Go Gators! Bite Back!\"" },
      pagina: {
        intro: { pt: "Prédio de tijolos vermelhos dos anos 1970 em Blue Pines, um pouco desgastado, pintado de azul royal e amarelo-ouro. O jacaré musculoso do logo está em todo lugar.", en: "A worn 1970s red-brick building in Blue Pines, painted royal blue and gold. The buff gator logo is everywhere." },
        fatos: [
          { rotulo: { pt: "Mascote", en: "Mascot" }, valor: "Fighting Gators" },
          { rotulo: { pt: "Lema", en: "Motto" }, valor: "Strength Through Struggle" },
          { rotulo: { pt: "Grito", en: "Chant" }, valor: "Go Gators! Bite Back!" },
        ],
        secoes: [
          { titulo: { pt: "Vida escolar", en: "School life" },
            lista: { pt: ["Gator Girls, as líderes de torcida (Asha foi uma delas)", "Fighting Gators Football Team", "Gator Bowl, Homecoming e o Blue Moon Pep Rally"], en: ["Gator Girls, the cheer squad (Asha was one)", "Fighting Gators Football Team", "Gator Bowl, Homecoming and the Blue Moon Pep Rally"] } },
        ],
        personagens: ["asha", "jane"],
      } },

    { id: "st-dymphna", nome: "Saint Dymphna Academy for Girls", regiao: "stdymphna", imagem: "img/locais/st-dymphna.jpg",
      tipo: { pt: "Internato", en: "Boarding school" },
      resumo: { pt: "Internato neogótico, rígido e cheio de boatos de túneis e salas ocultas.", en: "A strict neo-Gothic boarding school full of rumors about tunnels and hidden rooms." },
      pagina: {
        intro: { pt: "Escola particular e internato exclusivo para garotas, numa colina arborizada entre Blue Pines e Echo Ridge. Chega-se por uma estrada estreita e sinuosa até um portão de ferro antigo.", en: "A private all-girls boarding school on a wooded hill between Blue Pines and Echo Ridge, reached by a narrow winding road ending at an old iron gate." },
        fatos: [
          { rotulo: { pt: "Lema", en: "Motto" }, valor: "Virtus per Silentium" },
          { rotulo: { pt: "Ex-aluna famosa", en: "Famous alumna" }, valor: "Lia" },
        ],
        secoes: [
          { titulo: { pt: "O brasão", en: "The crest" }, texto: { pt: "Chama dourada, cruz celta, flor-de-lis invertida e um espelho espinhoso.", en: "A golden flame, a Celtic cross, an inverted fleur-de-lis and a thorned mirror." } },
          { titulo: { pt: "De Volta à Jaula", en: "Back to the Cage" }, texto: { pt: "O dia em que Lia voltou à frente da escola de moicano lilás, tachas e botas, e a Irmã Martha quase desmaiou. Algumas alunas nunca mais foram as mesmas.", en: "The day Lia came back to the school gates with a lilac mohawk, studs and boots, and Sister Martha nearly fainted. Some students were never the same." } },
        ],
        personagens: ["lia"],
      } },

    { id: "rusthook", nome: "Rusthook Salvage Yard", regiao: "rusthook", imagem: "img/locais/rusthook.jpg",
      tipo: { pt: "Ferro-velho e palco punk", en: "Junkyard and punk stage" },
      resumo: { pt: "Ferro-velho à beira do lago e, lá dentro, o palco dos Lowen Punks.", en: "A lakeside junkyard with the Lowen Punks' stage inside." },
      pagina: {
        intro: { pt: "Ferro-velho às margens do Rusthook Lake, cheio de carros empilhados. Numa área separada fica o Rusthook Yard Stage, palco DIY de pallets, grafite e luz reaproveitada, onde a banda faz os shows e o grupo inventa os desafios.", en: "A junkyard on the shore of Rusthook Lake, full of stacked cars. In a separate area sits the Rusthook Yard Stage, a DIY stage of pallets, graffiti and salvaged lights where the band plays and the crew dreams up its stunts." },
        fatos: [
          { rotulo: { pt: "Banda da casa", en: "House band" }, valor: "Lowen Punks" },
        ],
        secoes: [
          { titulo: "Lowen Punks", lista: { pt: ["Jane: vocal", "Asha: guitarra", "Lia: baixo", "Lily: bateria"], en: ["Jane: vocals", "Asha: guitar", "Lia: bass", "Lily: drums"] } },
        ],
        personagens: ["jane", "asha", "lia", "lily"],
      } },

    { id: "gator-view", nome: "Gator View Park", regiao: "gatorview", imagem: "img/locais/gator-view.jpg",
      tipo: { pt: "Parque de trailers", en: "Trailer park" },
      resumo: { pt: "Onde Jane mora com Jim. Ninguém entra no Trailer 17.", en: "Where Jane lives with Jim. Nobody goes into Trailer 17." },
      pagina: {
        intro: { pt: "Parque de trailers de baixa renda na entrada da cidade. Jim e Jane moram num trailer antigo ampliado com anexo de madeira e telhado de zinco, que cheira a óleo, mofo e café.", en: "A low-income trailer park at the town entrance. Jim and Jane live in an old expanded trailer with a wooden add-on and tin roof that smells of oil, mildew and coffee." },
        fatos: [
          { rotulo: { pt: "Vizinhos", en: "Neighbors" }, valor: "Big Lou, Niko, Vovó Millie" },
          { rotulo: { pt: "Não entre", en: "Keep out" }, valor: "Trailer 17" },
        ],
        secoes: [
          { titulo: { pt: "Trailer 17", en: "Trailer 17" }, texto: { pt: "Abandonado e supostamente assombrado. Niko e Viktor investigaram; a melhor explicação até agora é um guaxinim.", en: "Abandoned and supposedly haunted. Niko and Viktor investigated; the best explanation so far is a raccoon." } },
          { titulo: { pt: "A enchente", en: "The flood" }, texto: { pt: "Quando a tempestade alagou o parque, o trailer de Jane virou abrigo, e Fat Boy apareceu nadando entre os varais.", en: "When the storm flooded the park, Jane's trailer became a shelter, and Fat Boy showed up swimming between the clotheslines." } },
        ],
        personagens: ["jane", "jim", "biglou", "niko", "millie"],
      } },

    { id: "dock4", nome: "Dock 4", regiao: "lake", imagem: "img/locais/dock4.jpg",
      tipo: { pt: "Píer abandonado", en: "Abandoned pier" },
      resumo: { pt: "Interditado desde 1987. A Maldição do Pier 4 é contada toda noite no Big Swamp.", en: "Closed since 1987. The Pier 4 Curse gets retold every night at the Big Swamp." },
      pagina: {
        intro: { pt: "Um píer de madeira no Big Blue Lake, interditado depois de um acidente em 1987. Desde então a fita de interdição nunca foi trocada, e os pescadores evitam lançar linha por perto.", en: "A wooden pier on Big Blue Lake, closed after an accident in 1987. The caution tape has never been replaced, and fishermen avoid casting nearby." },
        fatos: [ { rotulo: { pt: "Interditado", en: "Closed" }, valor: "1987" } ],
        secoes: [
          { titulo: { pt: "A maldição", en: "The curse" }, texto: { pt: "Dizem que o porão do museu tem um túnel que sai aqui. Dizem também que, em noites de neblina, se ouve um sino submerso.", en: "They say the museum basement has a tunnel that comes out here. They also say you can hear a sunken bell on foggy nights." } },
        ] } },

    { id: "santuario", nome: { pt: "Santuário da Margem Baixa", en: "Low Bank Sanctuary" }, regiao: "baileys", imagem: "img/locais/santuario.jpg",
      tipo: { pt: "Santuário", en: "Sanctuary" },
      resumo: { pt: "Cais rústico e cabana isolada onde ficam os animais resgatados.", en: "A rustic dock and isolated cabin where rescued animals recover." },
      pagina: {
        intro: { pt: "Em Bailey's Hollow, no extremo sul de Mossbend: cais rústico, tanques improvisados e uma cabana isolada. Recebe pouco apoio da prefeitura e sobrevive na base do improviso.", en: "In Bailey's Hollow at the far south of Mossbend: a rustic dock, makeshift tanks and an isolated cabin. It gets little support from City Hall and survives on improvisation." },
        fatos: [ { rotulo: { pt: "Acesso", en: "Access" }, valor: "Bailey's Hollow Trail" } ] } },

    { id: "fly-drones", nome: "Fly Drones Camping", regiao: "flydrones", imagem: "img/locais/fly-drones.jpg",
      tipo: { pt: "Acampamento", en: "Campground" },
      resumo: { pt: "Acampamento de nerds e drones entre a floresta e o lago.", en: "A campground for nerds and drones between the forest and the lake." },
      pagina: {
        intro: { pt: "Entre Blue Pines e Mossbend, perto do lago e das matas. Barracas, antenas, notebooks em mesas de piquenique e drones zumbindo até de madrugada.", en: "Between Blue Pines and Mossbend, near the lake and the woods. Tents, antennas, laptops on picnic tables and drones buzzing until dawn." } } },
  ],

  /* ---------- Mapa ----------
     imagem: desenho base. rotulos: nomes por cima (x/y em %). marcadores: ícones clicáveis.
     local = id de um local (abre a caixa do local); criatura = nome de uma criatura. */
  mapa: {
    imagem: "img/mapa/base.jpg",
    rotulos: [
      { texto: "Echo Ridge", regiao: "echoridge", x: 45, y: 6 },
      { texto: "Northend", regiao: "northend", x: 88, y: 12 },
      { texto: { pt: "Área 52", en: "Area 52" }, regiao: "area52", x: 70, y: 15, estilo: "perigo" },
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
      { icone: "img/mapa/icones/pub.png", local: "big-swamp", x: 5, y: 61 },
      { icone: "img/mapa/icones/trailer.png", local: "gator-view", x: 12, y: 52 },
      { icone: "img/mapa/icones/resgate.png", local: "rescue", x: 31, y: 66 },
      { icone: "img/mapa/icones/camping.png", local: "fly-drones", x: 45, y: 67 },
      { icone: "img/mapa/icones/prefeitura.png", local: "prefeitura", x: 41, y: 33 },
      { icone: "img/mapa/icones/museu.png", local: "museu", x: 35, y: 46 },
      { icone: "img/mapa/icones/coruja.png", local: "crimson-owl", x: 36, y: 27 },
      { icone: "img/mapa/icones/xerife.png", regiao: "oldhollow", x: 30, y: 38 },
      { icone: "img/mapa/icones/fontes.png", regiao: "springs", x: 44, y: 48 },
      { icone: "img/mapa/icones/escola.png", local: "high-school", x: 20, y: 30 },
      { icone: "img/mapa/icones/stdymphna.png", local: "st-dymphna", x: 33, y: 21 },
      { icone: "img/mapa/icones/dock4.png", local: "dock4", x: 49, y: 51 },
      { icone: "img/mapa/icones/area52.png", local: "area52", x: 70, y: 9 },
      { icone: "img/mapa/icones/rusthook.png", local: "rusthook", x: 92, y: 44 },
      { icone: "img/mapa/icones/santuario.png", local: "santuario", x: 85, y: 80 },
      { icone: "img/mapa/icones/fatboy.png", criatura: "Fat Boy", x: 20, y: 82 },
      { icone: "img/mapa/icones/mossfoot.png", criatura: "Mossfoot", x: 63, y: 77 },
      { icone: "img/mapa/icones/mothman.png", criatura: "White Moth Man", x: 14, y: 9 },
      { icone: "img/mapa/icones/longlong.png", criatura: "Long-Long", x: 63, y: 29 },
      { icone: "img/mapa/icones/bruto.png", criatura: "Bruto", x: 70, y: 52 },
    ],
    regioes: {
      echoridge: { nome: "Echo Ridge", texto: { pt: "Montanhas ao norte: pinheiros, vento, neblina, mirantes e minas abandonadas. Pumas, ursos ocasionais e luzes estranhas.", en: "Northern mountains: pines, wind, fog, lookouts and abandoned mines. Cougars, the odd bear and strange lights." } },
      northend: { nome: "Northend", texto: { pt: "Estradas madeireiras perto de Echo Ridge, o Great Pine e o caminho para a Área 52.", en: "Logging roads near Echo Ridge, the Great Pine and the way to Area 52." } },
      area52: { nome: { pt: "Área 52", en: "Area 52" }, texto: { pt: "Oficialmente, uma estação geológica desativada.", en: "Officially, a decommissioned geological station." } },
      stdymphna: { nome: "Saint Dymphna", texto: { pt: "Internato neogótico numa colina entre Blue Pines e Echo Ridge.", en: "Neo-Gothic boarding school on a hill between Blue Pines and Echo Ridge." } },
      bluepines: { nome: "Blue Pines", texto: { pt: "Bairro residencial de casas de madeira entre pinheiros. O Crooked River corta o bairro.", en: "Residential neighborhood of wooden houses among the pines. Crooked River runs through it." } },
      oldhollow: { nome: "Old Hollow", texto: { pt: "Centro histórico: prefeitura, xerifado, museu, Crimson Owl e a praça dos fundadores.", en: "Historic downtown: City Hall, the sheriff's office, the museum, the Crimson Owl and Founders' Square." } },
      lake: { nome: "Big Blue Lake", texto: { pt: "O maior lago da região. Pesca, festivais, o bagre Bruto e o monstro Long-Long.", en: "The region's biggest lake. Fishing, festivals, Bruto the catfish and the Long-Long monster." } },
      lakeshore: { nome: "Lakeshore Bay", texto: { pt: "Margem rica do lago: marina, mansões, hotéis e cafés caros. Lia e os Parker moram aqui.", en: "The wealthy shore: marina, mansions, hotels and pricey cafés. Lia and the Parkers live here." } },
      gatorview: { nome: "Gator View Park", texto: { pt: "Parque de trailers na entrada da cidade.", en: "Trailer park at the town entrance." } },
      mossbend: { nome: "Mossbend", texto: { pt: "Pântano ao sul: água escura, ciprestes, passarelas e um cemitério meio submerso. Território do Fat Boy.", en: "Southern swamp: dark water, cypresses, boardwalks and a half-sunken cemetery. Fat Boy's turf." } },
      baileys: { nome: "Bailey's Hollow", texto: { pt: "Extremo sul de Mossbend.", en: "The far south of Mossbend." } },
      rusthook: { nome: "Rusthook", texto: { pt: "Rusthook Lake, o ferro-velho e o palco punk.", en: "Rusthook Lake, the junkyard and the punk stage." } },
      springs: { nome: "Nayeli Springs", texto: { pt: "Fontes sagradas perto da praça dos fundadores. Dizem que a água cura, ou revela coisas.", en: "Sacred springs near Founders' Square. They say the water heals, or reveals things." } },
      flydrones: { nome: "Fly Drones Camping", texto: { pt: "Acampamento nerd entre Blue Pines e Mossbend.", en: "Nerd campground between Blue Pines and Mossbend." } },
    },
  },

  /* ---------- Bestiário ---------- */
  criaturas: [
    { nome: "Fat Boy", escala: "5 m", onde: "Mossbend", imagem: "img/criaturas/fatboy.jpg", texto: { pt: "Jacaré-americano enorme e gordíssimo. Costuma dormir no meio da estrada.", en: "A huge, very fat American alligator. Likes to nap in the middle of the road." } },
    { nome: "White Moth Man", escala: "1,80 m", onde: "Echo Ridge", imagem: "img/criaturas/white-moth.jpg", texto: { pt: "Humanoide alado, branco e espectral. Presságio de luzes estranhas.", en: "A pale, ghostly winged humanoid. An omen of strange lights." } },
    { nome: "Gray Strider", escala: { pt: "até 4 m", en: "up to 4 m" }, onde: "Echo Ridge", imagem: "img/criaturas/gray-strider.jpg", texto: { pt: "Alto, magro, cinzento e de rosto alienígena. Deixa interferência no rádio.", en: "Tall, thin, gray and alien-faced. Leaves radio static behind." } },
    { nome: "Mossfoot", escala: { pt: "até 3 m", en: "up to 3 m" }, onde: "Mossbend", imagem: "img/criaturas/mossfoot.jpg", texto: { pt: "Criatura peluda e territorial coberta de lama e musgo.", en: "Hairy, territorial creature covered in mud and moss." } },
    { nome: "Long-Long", escala: "5 m", onde: "Big Blue Lake", imagem: "img/criaturas/long-long.jpg", texto: { pt: "Monstro do lago de pescoço longo e corpo escuro.", en: "Long-necked, dark-bodied lake monster." } },
    { nome: "Bruto", escala: "4 m", onde: "Big Blue Lake", imagem: "img/criaturas/bruto.jpg", texto: { pt: "Bagre gigante que nunca foi pescado. Estrela do Catfish Festival.", en: "Giant catfish no one has ever caught. Star of the Catfish Festival." } },
    { nome: "Drypine Hag", escala: "1,70 m", onde: { pt: "Florestas", en: "Forests" }, imagem: "img/criaturas/drypine.jpg", texto: { pt: "Entidade de pinheiros secos e fungos que cria trilhas falsas.", en: "A spirit of dead pines and fungi that makes false trails." } },
    { nome: "Swamp Dude", escala: "?", onde: "Mossbend", imagem: "img/criaturas/swamp-dude.jpg", texto: { pt: "Humanoide-peixe pálido. Observa e quase nunca ataca.", en: "Pale fish-man. Watches and almost never attacks." } },
    { nome: "Puma Host", escala: "puma", onde: "Echo Ridge", imagem: "img/criaturas/puma-host.jpg", texto: { pt: "Puma branco. Talvez só um animal raro cercado de lendas.", en: "A white cougar. Maybe just a rare animal wrapped in legend." } },
    { nome: "Yardlings", escala: { pt: "minúsculos", en: "tiny" }, onde: { pt: "Jardins", en: "Gardens" }, imagem: "img/criaturas/yardlings.jpg", texto: { pt: "Criaturinhas presas dentro de anões de jardim de cerâmica.", en: "Little creatures trapped inside ceramic garden gnomes." } },
  ],

  fosseis: [
    { id: "lowenosaurus", nome: "Lowenosaurus mystica", imagem: "img/fosseis/lowenosaurus.jpg", tamanho: "6–8 m",
      texto: { pt: "Hadrossauro herbívoro com crista. O símbolo paleontológico da cidade e, para alguns, um guardião místico do pântano.", en: "Crested herbivorous hadrosaur. The town's paleontological symbol and, to some, a mystical guardian of the swamp." } },
    { id: "carchodonax", nome: "Carchodonax minimus", imagem: "img/fosseis/carchodonax.jpg", tamanho: { pt: "pequeno", en: "small" },
      texto: { pt: "Pequeno terópode predador, ágil e emboscador. Apelido: \"Cão de Caça do Lago\".", en: "Small, agile ambush-predator theropod. Nickname: \"the Lake Hound\"." } },
    { id: "lowenotitan", nome: "Lowenotitan aculeodorsis", imagem: "img/fosseis/lowenotitan.jpg", tamanho: "7–8,5 m",
      texto: { pt: "Titanossauro do Cretáceo Superior (76–72 milhões de anos), com placas e dois espinhos dorsais altos.", en: "Late Cretaceous titanosaur (76–72 million years ago) with bony plates and two tall dorsal spines." } },
    { id: "lowenpterus", nome: "Lowenpterus serracrista", imagem: "img/fosseis/lowenpterus.jpg", tamanho: { pt: "4,5–5,8 m de envergadura", en: "4.5–5.8 m wingspan" },
      texto: { pt: "Pterossauro piscívoro de bico dentado e grande crista ocre (78–72 milhões de anos).", en: "Fish-eating pterosaur with a toothed beak and a large ochre crest (78–72 million years ago)." } },
    { id: "lowenmammuthus", nome: "Lowenmammuthus borealis", imagem: "img/fosseis/lowenmammuthus.jpg", tamanho: { pt: "menor que o mamute-lanoso", en: "smaller than a woolly mammoth" },
      texto: { pt: "O Mamute-do-Brejo, de pelagem marrom-escura, que vivia junto ao antigo Big Blue Lake glacial.", en: "The Marsh Mammoth, with dark-brown fur, which lived by the ancient glacial Big Blue Lake." } },
    { id: "alligatrosuchus", nome: "Alligatrosuchus lowenensis", imagem: "img/fosseis/alligatrosuchus.jpg", tamanho: "2,5 m",
      texto: { pt: "Crocodilomorfo fóssil local, o \"Rastejante Assombrado\".", en: "Local fossil crocodylomorph, the \"Haunted Crawler\"." } },
  ],

  /* ---------- Eventos (página eventos.html) ---------- */
  eventos: [
    { id: "catfish", nome: "Catfish Festival", imagem: "img/eventos/catfish.jpg", local: "lake",
      quando: { pt: "Começo do verão (junho)", en: "Early summer (June)" },
      texto: { pt: "O festival mais tradicional da cidade, em homenagem ao bagre e à lenda de Bruto, o bagre gigante que nunca foi pescado. Bandeirinhas, barracas de comida, roda-gigante e o lago cheio de barcos.", en: "The town's most traditional festival, honoring the catfish and the legend of Bruto, the giant catfish no one has ever caught. Bunting, food stalls, a Ferris wheel and a lake full of boats." },
      destaques: { pt: ["Concurso do maior bagre", "Desfile com o carro alegórico do Bruto", "Barraca do Big Swamp com hambúrguer de lagosta"], en: ["Biggest catfish contest", "Parade with the Bruto float", "Big Swamp stall with crawfish burgers"] } },
    { id: "bluemoon", nome: "Blue Moon Fest", imagem: "img/eventos/bluemoon.jpg", local: "lake",
      quando: { pt: "Verão, noite de lua cheia", en: "Summer, full-moon night" },
      texto: { pt: "Noite de fogueiras, barcos iluminados, música e lendas às margens do Big Blue Lake.", en: "A night of bonfires, lit-up boats, music and legends on the shores of Big Blue Lake." },
      destaques: { pt: ["Viktor pilotando a lancha", "Jane e Asha dançando na margem", "Lily chamando o Lary, que pulou no lago"], en: ["Viktor driving the speedboat", "Jane and Asha dancing on the shore", "Lily calling Lary, who jumped in the lake"] } },
    { id: "lowencon", nome: "LowenCon", imagem: "img/eventos/lowencon.jpg", local: "oldhollow",
      quando: { pt: "Anual", en: "Yearly" },
      texto: { pt: "A convenção nerd da cidade, com toques steampunk, numa estação ferroviária abandonada. Cosplays, estandes e o vlog \"LowenCon Chaos\" filmado por Debra.", en: "The town's nerd convention, with a steampunk twist, held in an abandoned train station. Cosplay, booths and the \"LowenCon Chaos\" vlog shot by Debra." },
      destaques: { pt: ["Concurso de cosplay de criaturas locais", "Estande do museu com réplicas de fósseis", "Yuko em estado de êxtase"], en: ["Local-cryptid cosplay contest", "Museum booth with fossil replicas", "Yuko in pure bliss"] } },
    { id: "monsterjam", nome: "Monster Jam", imagem: "img/eventos/monsterjam.jpg", local: "rusthook",
      quando: { pt: "Fim de semana de outono", en: "A fall weekend" },
      texto: { pt: "Show de monster trucks com os favoritos da cidade: Punk Duck Squad, Swamp Gator Crusher, Long-Long, Mossfoot, White Moth, Catfish King, Lowenosaurus e o Area 52 Interceptor.", en: "A monster-truck show with the town favorites: Punk Duck Squad, Swamp Gator Crusher, Long-Long, Mossfoot, White Moth, Catfish King, Lowenosaurus and the Area 52 Interceptor." },
      destaques: { pt: ["Punk Duck Squad: amarelo, preto, rosa e verde, com bico e moicano", "Rubber Duck Rampage, o desafio de quadriciclo"], en: ["Punk Duck Squad: yellow, black, pink and green, with a beak and a mohawk", "Rubber Duck Rampage, the ATV challenge"] } },
    { id: "halloween", nome: "Halloween", imagem: "img/eventos/halloween.jpg", local: "lakeshore",
      quando: { pt: "31 de outubro", en: "October 31" },
      texto: { pt: "Lowen Lake leva o Halloween a sério. O ponto alto é o \"Punk-o-Ween\" na casa da Asha, decorada por ela e Jane, com Lia filmando.", en: "Lowen Lake takes Halloween seriously. The highlight is \"Punk-o-Ween\" at Asha's house, decorated by her and Jane, with Lia filming." },
      destaques: { pt: ["O esqueleto de decoração que caiu em cima da Asha", "\"The Van Makeover\" na van do Viktor"], en: ["The decoration skeleton that fell on Asha", "\"The Van Makeover\" in Viktor's van"] } },
    { id: "homecoming", nome: "Homecoming & Gator Bowl", imagem: "img/eventos/homecoming.jpg", local: "bluepines",
      quando: { pt: "Outono", en: "Fall" },
      texto: { pt: "O jogo dos Fighting Gators, o baile de Homecoming e o Blue Moon Pep Rally da Lowen Lake High. Asha já foi princesa de Homecoming.", en: "The Fighting Gators game, the Homecoming dance and Lowen Lake High's Blue Moon Pep Rally. Asha was once Homecoming princess." },
      destaques: { pt: ["\"Go Gators! Bite Back!\"", "As Gator Girls na arquibancada"], en: ["\"Go Gators! Bite Back!\"", "The Gator Girls in the stands"] } },
    { id: "lendas", nome: { pt: "Noite das Lendas Vivas", en: "Night of Living Legends" }, imagem: "img/eventos/lendas.jpg", local: "oldhollow",
      quando: { pt: "Outono", en: "Fall" },
      texto: { pt: "Desfile noturno pelas ruas de Old Hollow em que os moradores se fantasiam das criaturas locais: White Moth Man, Mossfoot, Bruto e companhia.", en: "A night parade through Old Hollow where locals dress up as the town's creatures: White Moth Man, Mossfoot, Bruto and friends." },
      destaques: { pt: ["Passeios Swamp Tour e Echo Ridge Trail Explorer", "Contação de histórias na praça dos fundadores"], en: ["Swamp Tour and Echo Ridge Trail Explorer tours", "Storytelling at Founders' Square"] } },
  ],

  /* ---------- Portfólio ---------- */
  portfolio: [
    { titulo: { pt: "Lowen Punks ao vivo no Rusthook", en: "Lowen Punks live at Rusthook" }, categoria: { pt: "Desenhos", en: "Drawings" }, ano: "2025", imagem: "img/portfolio/01.jpg" },
    { titulo: { pt: "Ficha de personagem: Jane", en: "Character sheet: Jane" }, categoria: { pt: "Fichas", en: "Sheets" }, ano: "2026", imagem: "img/portfolio/02.jpg" },
    { titulo: { pt: "Fat Boy na estrada", en: "Fat Boy on the road" }, categoria: { pt: "Quadrinhos", en: "Comics" }, ano: "2025", imagem: "img/portfolio/03.jpg" },
    { titulo: { pt: "Asha e Mr. Waffles", en: "Asha and Mr. Waffles" }, categoria: { pt: "Desenhos", en: "Drawings" }, ano: "2026", imagem: "img/portfolio/04.jpg" },
    { titulo: { pt: "Expedição a Echo Ridge, pág. 1", en: "Echo Ridge Expedition, p. 1" }, categoria: { pt: "Quadrinhos", en: "Comics" }, ano: "2026", imagem: "img/portfolio/05.jpg" },
    { titulo: { pt: "Recrutas da Área 52", en: "Area 52 recruits" }, categoria: { pt: "Fichas", en: "Sheets" }, ano: "2026", imagem: "img/portfolio/06.jpg" },
  ],

  /* ---------- Encomendas (commissions) ---------- */
  encomendas: {
    abertas: true,
    vagas: { pt: "3 vagas este mês", en: "3 slots this month" },
    moeda: "US$",
    // PREÇOS DE EXEMPLO: troque pelos seus valores antes de divulgar.
    tipos: [
      { nome: "Sketch", preco: "25", detalhe: { pt: "Traço sem cor. 1 personagem.", en: "Line art, no color. 1 character." } },
      { nome: { pt: "Busto colorido", en: "Color bust" }, preco: "45", detalhe: { pt: "Do peito para cima, fundo simples.", en: "Chest up, simple background." } },
      { nome: { pt: "Corpo inteiro", en: "Full body" }, preco: "80", detalhe: { pt: "Colorido, com sombra e fundo simples.", en: "Colored and shaded, simple background." } },
      { nome: { pt: "Ficha de personagem", en: "Character sheet" }, preco: "120", detalhe: { pt: "Frente, lado, costas, rosto e paleta.", en: "Front, side, back, face and palette." } },
      { nome: { pt: "Página de quadrinho", en: "Comic page" }, preco: "150", detalhe: { pt: "Até 6 quadros, arte-final e cor.", en: "Up to 6 panels, inked and colored." } },
    ],
    extras: { pt: ["Personagem adicional: +70%", "Fundo detalhado: a partir de +30", "Uso comercial: sob consulta"], en: ["Extra character: +70%", "Detailed background: from +30", "Commercial use: ask me"] },
    faco: { pt: ["Personagens originais (OCs)", "Fan art", "Personagens de Lowen Lake", "Animais e criaturas"], en: ["Original characters (OCs)", "Fan art", "Lowen Lake characters", "Animals and creatures"] },
    naoFaco: { pt: ["Ódio ou discriminação", "Imitar o traço de outro artista", "Pessoas reais sem autorização"], en: ["Hate or discrimination", "Copying another artist's style", "Real people without consent"] },
    passos: { pt: ["Você envia o pedido.", "Eu respondo com orçamento e prazo.", "Pagamento de 50% para começar.", "Rascunho para aprovar ajustes.", "Arte final em alta resolução."], en: ["You send your request.", "I reply with a quote and timeline.", "50% upfront to start.", "Sketch for your approval.", "Final art in high resolution."] },
    pagamento: { pt: "PayPal, Pix ou Wise", en: "PayPal, Pix or Wise" },
    prazo: { pt: "2 a 4 semanas", en: "2 to 4 weeks" },
  },

  /* ---------- Textos da interface (botões, menus, avisos) ---------- */
  ui: {
    menu: {
      inicio: { pt: "Início", en: "Home" }, cidade: { pt: "A cidade", en: "The town" }, personagens: { pt: "Personagens", en: "Characters" },
      locais: { pt: "Locais", en: "Places" }, mapa: { pt: "Mapa", en: "Map" }, lendas: { pt: "Lendas", en: "Legends" },
      eventos: { pt: "Eventos", en: "Events" }, portfolio: { pt: "Portfólio", en: "Portfolio" }, encomendas: { pt: "Encomendas", en: "Commissions" },
    },
    etiquetas: {
      cidade: { pt: "Arquivo municipal", en: "Town records" }, personagens: { pt: "Moradores", en: "Residents" }, locais: { pt: "Pontos de interesse", en: "Points of interest" },
      mapa: { pt: "Sem escala", en: "Not to scale" }, lendas: { pt: "Avistamentos", en: "Sightings" }, eventos: { pt: "Calendário", en: "Calendar" },
      portfolio: { pt: "Desenhos e quadrinhos", en: "Drawings and comics" },
    },
    tituloLendas: { pt: "Lendas e criaturas", en: "Legends and creatures" },
    cronologia: { pt: "Cronologia", en: "Timeline" },
    conhecer: { pt: "Conheça os moradores", en: "Meet the locals" },
    encomendar: { pt: "Encomendar arte", en: "Commission art" },
    todos: { pt: "Todos", en: "All" },
    saibaMais: { pt: "Saiba mais", en: "Learn more" },
    verNoMapa: { pt: "Ver no mapa", en: "Show on map" },
    ampliarMapa: { pt: "Ampliar mapa", en: "Enlarge map" },
    fechar: { pt: "Fechar", en: "Close" },
    dicaMapa: { pt: "Toque num ícone ou num nome. Use \"Ampliar\" para ver de perto.", en: "Tap an icon or a name. Use \"Enlarge\" for a closer look." },
    regiao: { pt: "Região", en: "Region" },
    aqui: { pt: "Aqui", en: "Here" },
    avistamento: { pt: "Avistamento", en: "Sighting" },
    fosseisMuseu: { pt: "No Paleontology Hall do museu", en: "At the museum's Paleontology Hall" },
    verMuseu: { pt: "Visitar o museu", en: "Visit the museum" },
    todosEventos: { pt: "Ver todos os eventos", en: "See all events" },
    voltar: { pt: "Voltar para Lowen Lake", en: "Back to Lowen Lake" },
    quem: { pt: "Quem você encontra aqui", en: "Who you'll meet here" },
    outrosLocais: { pt: "Outros locais", en: "Other places" },
    quando: { pt: "Quando", en: "When" },
    onde: { pt: "Onde", en: "Where" },
    destaques: { pt: "Destaques", en: "Highlights" },
    encomendarPersonagem: { pt: "Encomendar arte deste personagem", en: "Commission art of this character" },
    aparencia: { pt: "Aparência", en: "Appearance" }, personalidade: { pt: "Personalidade", en: "Personality" },
    historia: { pt: "História", en: "Story" }, relacoes: { pt: "Relações", en: "Relationships" }, anos: { pt: "anos", en: "years old" },
    abertas: { pt: "Abertas", en: "Open" }, fechadas: { pt: "Fechadas no momento", en: "Closed for now" },
    introEncomendas: { pt: "Arte sob encomenda dos personagens de Lowen Lake, dos seus personagens ou de fan art.", en: "Commissioned art of Lowen Lake characters, your own characters or fan art." },
    aPartirDe: { pt: "a partir de", en: "from" },
    comoFunciona: { pt: "Como funciona", en: "How it works" },
    euDesenho: { pt: "Eu desenho", en: "I draw" }, naoDesenho: { pt: "Eu não desenho", en: "I don't draw" },
    pagamento: { pt: "Pagamento", en: "Payment" }, prazoMedio: { pt: "Prazo médio", en: "Typical turnaround" },
    pedirOrcamento: { pt: "Pedir orçamento", en: "Request a quote" },
    fNome: { pt: "Seu nome", en: "Your name" }, fEmail: { pt: "Seu e-mail", en: "Your email" }, fTipo: { pt: "Tipo de arte", en: "Type of art" },
    fPersonagens: { pt: "Personagem(ns)", en: "Character(s)" }, fDescricao: { pt: "Descreva a ideia", en: "Describe your idea" },
    fRef: { pt: "Links de referência (opcional)", en: "Reference links (optional)" }, fPrazo: { pt: "Prazo desejado (opcional)", en: "Deadline (optional)" },
    fEnviar: { pt: "Enviar pedido", en: "Send request" }, outro: { pt: "Outro", en: "Other" },
    fErro: { pt: "Preencha nome, e-mail válido e a descrição da ideia.", en: "Please fill in your name, a valid email and your idea." },
    fEnviando: { pt: "Enviando…", en: "Sending…" },
    fOk: { pt: "Pedido enviado. Respondo por e-mail em até 3 dias.", en: "Request sent. I'll reply by email within 3 days." },
    fMailto: { pt: "Seu programa de e-mail deve abrir com o pedido pronto. Se não abrir, escreva para", en: "Your email app should open with the request ready. If it doesn't, write to" },
    fFechadas: { pt: "As encomendas estão fechadas. Mande um e-mail para entrar na lista de espera.", en: "Commissions are closed. Email me to join the waitlist." },
    contato: { pt: "Contato", en: "Contact" }, copiar: { pt: "Copiar", en: "Copy" }, copiado: { pt: "Copiado", en: "Copied" },
    direitos: { pt: "Universo e arte de {artista}. Personagens e cenários são obras originais; não reutilize sem autorização.", en: "Universe and art by {artista}. Characters and settings are original works; do not reuse without permission." },
    imagemEmBreve: { pt: "IMAGEM EM BREVE", en: "IMAGE COMING SOON" },
    anterior: { pt: "Anterior", en: "Previous" }, proximo: { pt: "Próximo", en: "Next" },
    naoEncontrado: { pt: "Local não encontrado.", en: "Place not found." },
  },
};
