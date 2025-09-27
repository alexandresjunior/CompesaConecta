import { adicionarFaqMock, buscarFaqMock, removerFaqMock } from "../mocks/faq";

export function buscarFaq() {
    return buscarFaqMock();
}

export function adicionarFaq(novaFaq) {
    return adicionarFaqMock(novaFaq);
}

export function removerFaq(faqId) {
    return removerFaqMock(faqId);
}