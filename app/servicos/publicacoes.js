import LISTA_PUBLICACOES from "../mocks/publicacoes";

export default function listarPublicacoes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(LISTA_PUBLICACOES);
    }, 1500);
  });
}
