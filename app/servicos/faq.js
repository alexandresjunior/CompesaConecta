import { adicionarFaqMock, buscarFaqMock } from "../mocks/faq";

export function buscarFaq() {
    return buscarFaqMock();
}

export function adicionarFaq(novaFaq) {
    return adicionarFaqMock(novaFaq);
}