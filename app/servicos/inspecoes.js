import api from "./api";

export default async function listarInspecoes(setInspecoes, setCarregando, setErro) {
    await api.get("/inspecoes")
        .then((resposta) => setInspecoes(resposta.data))
        .catch((erro) => setErro(erro))
        .finally(() => setCarregando(false));
}
