const LISTA_PUBLICACOES = [
  {
    id: "1",
    autor: {
      id: "2",
      nome: "Gestão de Mudança",
      avatar:
        "https://yt3.googleusercontent.com/ytc/AIdro_k988mA_j-24Qk5h5M-Jza2y6_a_h0p-2-3eA=s176-c-k-c0x00ffffff-no-rj",
    },
    legenda:
      "Olá, equipe! Bem-vindos ao COMPESA Conecta. Este é o nosso novo canal para comunicarmos todas as novidades sobre o processo de reestruturação. Fiquem ligados!",
    tipo: "TEXTO",
    timestamp: "2025-09-26T10:00:00Z",
    curtidas: 15,
    comentarios: [
      { id: "c1", autor: { nome: "Carla" }, texto: "Ótima iniciativa!" },
      { id: "c2", autor: { nome: "João" }, texto: "Parabéns pelo novo canal!" },
    ],
  },
  {
    id: "2",
    autor: {
      id: "1",
      nome: "Alexandre Junior",
      avatar: "https://github.com/alexandresjunior.png",
    },
    legenda:
      "Compartilhando algumas fotos da nossa última visita técnica na ETA Tapacurá. O trabalho em equipe faz a diferença!",
    tipo: "IMAGEM",
    imagens: [
      "https://www.agenciainfra.com/blog/wp-content/uploads/2023/11/Compesa.jpeg",
      "https://www.folhape.com.br/obj/1/276532,470,80,0,0,0,0,0,0,0.jpg",
      "https://jconlineimagem.ne10.uol.com.br/imagem/galeria/2019/03/22/153351_3238.jpg",
    ],
    timestamp: "2025-09-26T11:30:00Z",
    curtidas: 22,
    comentarios: [],
  },
  {
    id: "3",
    autor: {
      id: "2",
      nome: "Gestão de Mudança",
      avatar:
        "https://yt3.googleusercontent.com/ytc/AIdro_k988mA_j-24Qk5h5M-Jza2y6_a_h0p-2-3eA=s176-c-k-c0x00ffffff-no-rj",
    },
    legenda:
      "Confiram o vídeo institucional sobre as próximas etapas do nosso projeto de modernização.",
    tipo: "VIDEO",
    videoUrl: "https://www.youtube.com/watch?v=kSZwD2V0z2s", // Exemplo de vídeo do YouTube
    timestamp: "2025-09-25T15:00:00Z",
    curtidas: 30,
    comentarios: [
      { id: "c3", autor: { nome: "Maria" }, texto: "Muito esclarecedor!" },
    ],
  },
  {
    id: "4",
    autor: {
      id: "2",
      nome: "Gestão de Mudança",
      avatar:
        "https://yt3.googleusercontent.com/ytc/AIdro_k988mA_j-24Qk5h5M-Jza2y6_a_h0p-2-3eA=s176-c-k-c0x00ffffff-no-rj",
    },
    legenda: "Qual o melhor dia para o nosso próximo workshop online?",
    tipo: "ENQUETE",
    enquete: {
      opcoes: [
        { id: "e1", texto: "Segunda-feira", votos: 12 },
        { id: "e2", texto: "Quarta-feira", votos: 25 },
        { id: "e3", texto: "Sexta-feira", votos: 8 },
      ],
    },
    timestamp: "2025-09-24T09:00:00Z",
    curtidas: 10,
    comentarios: [],
  },
];

export default LISTA_PUBLICACOES;
