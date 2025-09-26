import api from "./api";

export default async function listarUnidades(setUnidades, setCarregando, setErro) {
    await api.get("/unidades")
        .then((resposta) => setUnidades(resposta.data))
        .catch((erro) => setErro(erro))
        .finally(() => setCarregando(false));
}
