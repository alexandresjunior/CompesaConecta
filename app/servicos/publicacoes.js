import { adicionarComentarioMock, adicionarPublicacaoMock, listarPublicacoesMock, removerComentarioMock, removerPublicacaoMock } from "../mocks/publicacoes";

export function listarPublicacoes() {
  return listarPublicacoesMock();
}

export function criarPublicacao(novaPublicacao) {
  return adicionarPublicacaoMock(novaPublicacao);
}

export function removerPublicacao(postId) {
  return removerPublicacaoMock(postId);
}

export function adicionarComentario(postId, textoComentario) {
  return adicionarComentarioMock(postId, textoComentario);
}

export function removerComentario(postId, comentarioId) {
  return removerComentarioMock(postId, comentarioId);
}
