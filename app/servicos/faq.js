import LISTA_FAQ from "../mocks/faq";

export default function buscarFaq() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(LISTA_FAQ);
        }, 500);
    });
}