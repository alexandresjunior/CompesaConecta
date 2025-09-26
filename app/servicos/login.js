import USUARIO_LOGADO from "../mocks/usuarios";

export default function autenticarUsuario(usuario, senha) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        sucesso: true,
        usuario: USUARIO_LOGADO,
      });
    }, 1000);
  });
}
