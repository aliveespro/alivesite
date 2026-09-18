# Instituto Alíve — Plataforma Institucional & Comunitária

> **"Cultive saber, transforme viver."**  
> Plataforma digital oficial do Instituto Alíve, promovendo impacto social transformador através dos três pilares fundamentais: **Saúde**, **Cultura** e **Educação**.

---

## 📌 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Os Três Pilares](#-os-três-pilares)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar](#-como-executar)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Boas Práticas Adotadas](#-boas-práticas-adotadas)
- [Contato & Suporte](#-contato--suporte)

---

## 📖 Sobre o Projeto

O **Instituto Alíve** é uma iniciativa social dedicada a conectar comunidades a oportunidades transformadoras de desenvolvimento humano. Esta aplicação web é o portal central do projeto, oferecendo:

- Apresentação institucional e história do movimento;
- Acompanhamento de projetos e iniciativas sociais ativas;
- Inscrição da comunidade em workshops, cursos e eventos presenciais;
- Galeria de fotos de ações em campo;
- Módulo de participação cívica (voluntariado, doações e parcerias);
- Painel de administração (CMS local) para gerenciamento de conteúdo institucional.

---

## 🌿 Os Três Pilares

1. **Saúde (Verde)**: Promoção do bem-estar biopsicossocial, saúde preventiva, hábitos saudáveis e apoio comunitário.
2. **Cultura (Laranja)**: Valorização da identidade local, expressões artísticas, memória e fortalecimento de laços comunitários.
3. **Educação (Amarelo)**: Formação contínua, capacitação profissional, apoio pedagógico e oficinas práticas para jovens e famílias.

---

## ✨ Principais Funcionalidades

- **Design Responsivo & Acessível**: Interface adaptada para smartphones, tablets e desktops seguindo os padrões WCAG AA de contraste e tipografia fluida.
- **Barra de Navegação Dinâmica (`Navbar`)**: Acesso rápido às seções com o emblema oficial do Instituto Alíve e gatilhos para modais administrativos e históricos.
- **Banner Institucional com Padrão Exclusivo (`AliveBrandBanner`)**: Apresentação da marca, lema e arte representativa dos três pilares.
- **Catálogo de Projetos (`ProjectsSection`)**: Visualização de projetos com filtros por pilar, etiquetas de status e modal descritivo detalhado.
- **Agenda de Eventos e Inscrições (`EventsSection`)**: Controle de vagas e formulário interativo de inscrição para participantes com feedback em tempo real.
- **Galeria Multimídia (`GallerySection`)**: Exibição em grade com visualizador imersivo em tela cheia (`LightboxModal`).
- **Canal de Participação Comunitária (`ParticipateSection`)**: Fluxos dedicados para voluntários, doadores e parceiros institucionais.
- **Notícias e Atualizações (`NewsSection`)**: Artigos informativos com modais de leitura completa.
- **Painel Administrativo CMS Integrado (`AdminCMSModal`)**: Ferramenta para gerenciar projetos, eventos e notícias com persistência de estado e histórico de exclusões (`HistoryModal`).
- **Notificações Globais (`Toast`)**: Sistema de alertas não intrusivos para feedback de ações do usuário.

---

## 🛠 Tecnologias Utilizadas

- **[React 19](https://react.dev/)**: Biblioteca central para construção da interface com hooks e componentes funcionais.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática em 100% do código para maior previsibilidade e manutenibilidade.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Estilização utilitária com sistema moderno de variáveis, tokens visuais e responsividade mobile-first.
- **[Vite 6](https://vite.dev/)**: Ferramenta de build ultrarrápida para desenvolvimento e empacotamento de produção.
- **[Motion](https://motion.dev/)**: Biblioteca de animações fluidas para transições de modais e micro-interações.
- **[Lucide React](https://lucide.dev/)**: Conjunto consistente de ícones vetoriais.
- **[Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)**: Efeito comemorativo de celebração em confirmações e inscrições.

---

## 📂 Estrutura do Projeto

```text
.
├── public/                     # Arquivos estáticos servidos diretamente
│   ├── Alive-logo.png
│   └── logo2-alive.png
├── src/
│   ├── assets/                 # Recursos visuais e imagens geradas
│   ├── components/             # Componentes modulares da interface
│   │   ├── AboutSection.tsx    # Seção sobre o Instituto
│   │   ├── AdminCMSModal.tsx   # Painel de controle e gerenciamento
│   │   ├── AliveBrandBanner.tsx# Banner oficial com marca e padrões
│   │   ├── AliveLogo.tsx       # Componente versátil para exibição do logo
│   │   ├── ContactSection.tsx  # Canais de atendimento e formulário
│   │   ├── EventsSection.tsx   # Listagem e inscrição em eventos
│   │   ├── Footer.tsx          # Rodapé institucional
│   │   ├── GallerySection.tsx  # Galeria de fotos com lightbox
│   │   ├── Hero.tsx            # Destaque principal de entrada
│   │   ├── Navbar.tsx          # Menu de navegação fixo
│   │   ├── ProjectsSection.tsx # Lista e filtros de projetos
│   │   └── Toast.tsx           # Notificações visuais
│   ├── context/
│   │   └── AliveContext.tsx    # Estado global e ações da aplicação
│   ├── data/
│   │   └── initialData.ts      # Dados semente institucionais (projetos, eventos, notícias)
│   ├── App.tsx                 # Composição da página principal e modais
│   ├── index.css               # Estilos globais e importação do Tailwind
│   ├── main.tsx                # Ponto de entrada da aplicação React
│   ├── types.ts                # Definições de tipos e interfaces TypeScript
│   └── vite-env.d.ts           # Declarações de tipos para o Vite e imagens
├── index.html                  # Template HTML base
├── metadata.json               # Metadados e configurações da plataforma
├── package.json                # Dependências e scripts de execução
├── tsconfig.json               # Configurações do compilador TypeScript
└── vite.config.ts              # Configuração do Vite
```

---

## 🚀 Como Executar

### Pré-requisitos
- **Node.js** (versão 18 ou superior recomendada)
- **npm** (ou gerenciador compatível: pnpm / yarn)

### Passos de Instalação

1. Clone o repositório ou acesse a pasta do projeto:
   ```bash
   cd alive-platform
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra no navegador:
   ```text
   http://localhost:3000
   ```

---

## 📋 Scripts Disponíveis

No arquivo `package.json`:

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento na porta `3000`. |
| `npm run build` | Compila os arquivos para a pasta `dist/` para ambiente de produção. |
| `npm run preview` | Executa um servidor local servindo a pasta de build (`dist/`). |
| `npm run lint` | Executa a validação de tipos TypeScript (`tsc --noEmit`). |
| `npm run clean` | Remove os diretórios temporários e de compilação. |

---

## 🛡️ Boas Práticas Adotadas

- **Separação de Responsabilidades**: Componentização enxuta, desacoplando lógica de apresentação, estado global (`Context API`) e tipagem (`types.ts`).
- **Strict Typing**: Código fortemente tipado com TypeScript, prevenindo erros em tempo de compilação.
- **Mobile-First & Responsividade**: Layouts flexíveis e grids inteligentes adaptados para qualquer largura de tela.
- **Acessibilidade (a11y)**: Uso de tags semânticas (`<main>`, `<section>`, `<nav>`), atributos `aria-label`, contraste adequado e foco navegável.
- **Performance**: Importação sob demanda de assets, vetores otimizados e bundle minificado pelo Vite.

---

## 📬 Contato & Suporte

- **Organização**: Instituto Alíve
- **E-mail**: [alive.espro@gmail.com](mailto:alive.espro@gmail.com)
- **Valores**: *Saúde • Cultura • Educação*
