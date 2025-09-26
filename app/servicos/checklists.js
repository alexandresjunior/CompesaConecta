import api from "./api";

export default async function buscarChecklist(setChecklist, setCarregando, setErro) {
    await api.get("/modelos-checklist")
        .then((resposta) => setChecklist(resposta.data[0]))
        .catch((erro) => setErro(erro))
        .finally(() => setCarregando(false));
}
