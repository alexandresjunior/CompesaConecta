import USUARIO_LOGADO from "./usuarios";

let LISTA_PUBLICACOES = [
  {
    id: '1',
    autor: {
      id: '2',
      nome: 'Gestão de Mudança',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3874/3874136.png' // Ícone genérico
    },
    legenda: 'Olá, equipe! Bem-vindos ao COMPESA Conecta. Este é o nosso novo canal para comunicarmos todas as novidades sobre o processo de reestruturação. Fiquem ligados!',
    tipo: 'TEXTO',
    timestamp: '2025-09-26T10:00:00Z',
    curtidas: 15,
    comentarios: [
      { id: 'c1', autor: { id: '3', nome: 'Carla' }, texto: 'Ótima iniciativa!' },
      { id: 'c2', autor: { id: '1', nome: 'Alexandre Junior' }, texto: 'Parabéns pelo novo canal!' }
    ]
  },
  {
    id: '2',
    autor: {
      id: '1',
      nome: 'Alexandre Junior',
      avatar: 'https://github.com/alexandresjunior.png'
    },
    legenda: 'Compartilhando algumas fotos da nossa última visita técnica na ETA Tapacurá. O trabalho em equipe faz a diferença!',
    tipo: 'IMAGEM',
    imagens: [
      'https://www.agenciainfra.com/blog/wp-content/uploads/2023/11/Compesa.jpeg',
      'https://www.folhape.com.br/obj/1/276532,470,80,0,0,0,0,0,0,0.jpg',
      'https://jconlineimagem.ne10.uol.com.br/imagem/galeria/2019/03/22/153351_3238.jpg'
    ],
    timestamp: '2025-09-26T11:30:00Z',
    curtidas: 22,
    comentarios: []
  },
  {
    id: '3',
    autor: {
      id: '2',
      nome: 'Gestão de Mudança',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3874/3874136.png'
    },
    legenda: 'Confiram o vídeo institucional sobre as próximas etapas do nosso projeto de modernização.',
    tipo: 'VIDEO',
    videoUrl: 'https://www.youtube.com/watch?v=Wi9xt_p78a8',
    timestamp: '2025-09-25T15:00:00Z',
    curtidas: 30,
    comentarios: [
      { id: 'c3', autor: { id: '4', nome: 'Maria' }, texto: 'Muito esclarecedor!' }
    ]
  },
  {
    id: '4',
    autor: {
      id: '2',
      nome: 'Gestão de Mudança',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3874/3874136.png'
    },
    legenda: 'Qual o melhor dia para o nosso próximo workshop online?',
    tipo: 'ENQUETE',
    enquete: {
      opcoes: [
        { id: 'e1', texto: 'Segunda-feira', votos: 12 },
        { id: 'e2', texto: 'Quarta-feira', votos: 25 },
        { id: 'e3', texto: 'Sexta-feira', votos: 8 }
      ]
    },
    timestamp: '2025-09-24T09:00:00Z',
    curtidas: 10,
    comentarios: []
  }
];

export function listarPublicacoesMock() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...LISTA_PUBLICACOES].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    }, 1500);
  });
}

export function adicionarPublicacaoMock(novaPublicacao) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const id = (LISTA_PUBLICACOES.length + 1).toString();
      const post = {
        id,
        autor: { ...USUARIO_LOGADO },
        timestamp: new Date().toISOString(),
        curtidas: 0,
        comentarios: [],
        ...novaPublicacao
      };
      LISTA_PUBLICACOES.unshift(post);
      resolve(post);
    }, 500);
  });
}

export function adicionarComentarioMock(postId, textoComentario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const postIndex = LISTA_PUBLICACOES.findIndex(p => p.id === postId);
      if (postIndex === -1) {
        return reject(new Error('Post não encontrado.'));
      }

      const novoComentario = {
        id: `c${Math.random().toString(36).substr(2, 9)}`,
        autor: { ...USUARIO_LOGADO },
        texto: textoComentario,
        timestamp: new Date().toISOString(),
      };
      LISTA_PUBLICACOES[postIndex].comentarios.push(novoComentario);
      resolve(novoComentario);
    }, 300);
  });
}

export function removerComentarioMock(postId, comentarioId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const postIndex = LISTA_PUBLICACOES.findIndex(p => p.id === postId);
      if (postIndex === -1) {
        return reject(new Error('Post não encontrado.'));
      }

      const comentariosAntes = LISTA_PUBLICACOES[postIndex].comentarios.length;
      LISTA_PUBLICACOES[postIndex].comentarios = LISTA_PUBLICACOES[postIndex].comentarios.filter(c => c.id !== comentarioId);
      const comentariosDepois = LISTA_PUBLICACOES[postIndex].comentarios.length;

      if (comentariosAntes === comentariosDepois) {
        return reject(new Error('Comentário não encontrado.'));
      }
      resolve({ sucesso: true });
    }, 300);
  });
}