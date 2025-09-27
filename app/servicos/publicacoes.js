import { adicionarComentarioMock, adicionarPublicacaoMock, listarPublicacoesMock, removerComentarioMock } from "../mocks/publicacoes";

export function listarPublicacoes() {
  return listarPublicacoesMock();
}

export function criarPublicacao(novaPublicacao) {
  return adicionarPublicacaoMock(novaPublicacao);
}

export function adicionarComentario(postId, textoComentario) {
  return adicionarComentarioMock(postId, textoComentario);
}

export function removerComentario(postId, comentarioId) {
  return removerComentarioMock(postId, comentarioId);
}