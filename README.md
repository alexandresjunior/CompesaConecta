<div align='center' style='margin-bottom: 10px;'>
   <img src='assets/images/compesa_conecta_logo_horizontal.png' width='200px'>
</div>

 **COMPESA Conecta** é a rede social corporativa interna da COMPESA, desenvolvida para ser a principal plataforma de comunicação e engajamento entre os colaboradores. O aplicativo foi projetado para disseminar informações importantes, especialmente durante o processo de reestruturação interna da empresa, fortalecendo a cultura e o alinhamento entre as equipes.

Este projeto foi desenvolvido utilizando **React Native** com **Expo**.

## ✨ Funcionalidades Principais

  * **Autenticação de Usuário**: Tela de _login_ com opção de "Mantenha-me conectado" para persistência de sessão.
  * **Feed de Publicações**: Visualização de posts em ordem cronológica, com suporte para:
      * Texto
      * Imagens (múltiplas, em formato carrossel)
      * Vídeos
      * Enquetes interativas
  * **Interação Social**:
      * Curtir publicações.
      * Comentar em posts (com permissão para exclusão/moderação por usuários do tipo administrador).
      * Compartilhar o conteúdo de uma publicação externamente (via WhatsApp, por exemplo).
  * **Gerenciamento de Conteúdo por Nível de Acesso**:
      * **Nível 1 (Leitor)**: Visualiza e comenta.
      * **Nível 2 (Publicador)**: Cria publicações e adiciona FAQs.
      * **Nível 3 (Administrador)**: Todas as permissões anteriores, mais a capacidade de remover publicações, comentários e FAQs.
  * **Seção de FAQ**: Uma área de Perguntas Frequentes, onde usuários autorizados podem adicionar novos itens.
  * **Perfil de Usuário**: Tela com informações do usuário logado e botão para Sair (_Logout_).
  * **Interface Responsiva e Intuitiva**: Foco na usabilidade, com _previews_ de mídia, tratamento de estado offline e feedback visual para o usuário.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias e bibliotecas principais:

  * **React Native**: Estrutura principal para o desenvolvimento mobile.
  * **Expo**: Plataforma para facilitar o desenvolvimento e _build_ do aplicativo.
  * **Expo Router**: Para navegação baseada em arquivos (_file-based routing_).
  * **Expo Image Picker & Video Thumbnails**: Para seleção e _ de mídias da galeria do usuário.
  * **React Native Safe Area Context**: Para garantir que a UI se ajuste corretamente em dispositivos com _notches_ e ilhas dinâmicas.
  * **Expo Checkbox**: Para o componente de _checkbox_ na tela de _login_.
  * **Axios**: Para as chamadas de API.

## ⚙️ Começando

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

  * Node.js (versão 22.20.0 ou superior)
  * npm (versão 10.9.3 ou superior)
  * [Expo Go](https://expo.dev/go) instalado no seu smartphone (Android/iOS) ou um emulador/simulador configurado.

  Este aplicativo foi desenvolvido de forma compatível com o novo SDK 34.

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/alexandresjunior/CompesaConecta.git
    cd CompesaConecta
    ```

2.  **Instale as dependências do projeto:**

    ```bash
    npm install
    ```

3. **Inicie o aplicativo:**
    Com o servidor _backend_ no ar, inicie o projeto Expo:

    ```bash
    npm start
    ```

Após a execução, um QR Code aparecerá no terminal. Escaneie-o com o aplicativo Expo Go no seu celular, ou escolha uma das opções para abrir em um emulador/simulador.

## 📁 Estrutura do Projeto

A estrutura de pastas está organizada da seguinte forma:

```
/
|-- app/                  # Contém todas as telas e a lógica de navegação
|   |-- (tabs)/           # Grupo de rotas para telas com barra de navegação
|   |   |-- Feed/
|   |   |-- Faq/
|   |   |-- Perfil/
|   |   `-- _layout.jsx   # Layout da barra de navegação (Tabs)
|   |-- Comentarios/
|   |-- Login/
|   |-- NovaPublicacao/
|   `-- _layout.tsx       # Layout principal da aplicação (Stack)
|-- assets/               # Imagens, fontes e outros arquivos estáticos
|-- componentes/          # Componentes reutilizáveis (Post, FaqItem, etc.)
|-- mocks/                # Arquivos com dados e lógica de simulação do backend
|-- servicos/             # Funções para interagir com a API (ou mocks)
`-- package.json          # Dependências e scripts do projeto
```

-----