# Segundo Eleição no Brasil — plano de implementação

## Escopo

Criar uma interface mobile-first para uma enquete política independente e recreativa. A pessoa se cadastra com e-mail e data de nascimento, escolhe entre Lula e Flávio Bolsonaro e recebe uma confirmação de voto. A primeira entrega é uma interface demonstrativa em React/TSX que compila para HTML, CSS e JavaScript no navegador; a persistência real será conectada posteriormente ao Supabase Free.

A comunicação deve deixar visível que a experiência **não é uma eleição oficial, não é pesquisa registrada e não representa resultado eleitoral**.

## Arquitetura e dependências

- **Frontend:** React + TypeScript do starter `web-db-user`, com CSS próprio mobile-first.
- **Destino de hospedagem:** Vercel Hobby para o frontend e Supabase Free para autenticação/dados, conforme escolha do usuário.
- **Estado da primeira versão:** fluxo demonstrativo no navegador, usando `localStorage` apenas para simular o bloqueio de voto no protótipo; nenhum dado real deve ser tratado como apuração oficial.
- **Integração posterior:** substituir o armazenamento local por Supabase Auth/Database e impor a unicidade no banco com uma restrição por participante.
- **Assets:** duas fotos públicas identificadas de Wikimedia Commons, copiadas para `client/public/assets/candidates/`, com crédito na interface.
- **Rotas:** página principal em `/` e manifesto estático em `/manus-routes.json`.

## Design

### Movimento

**Editorial cívico contemporâneo**: uma mistura de boletim público, cartaz de debate e interface de votação simples. O visual é informativo, direto e acolhedor, sem estética de campanha.

### Princípios

1. **Equilíbrio visível:** os dois candidatos recebem o mesmo espaço, hierarquia e oportunidades de interação.
2. **Clareza antes da conversão:** cada etapa explica o que está acontecendo e evita linguagem de resultado oficial.
3. **Leveza responsável:** efeitos nas fotos são decorativos, equivalentes e não ofensivos.
4. **Mobile por padrão:** blocos empilhados, áreas de toque amplas e formulário legível em uma mão.

### Cor

Fundo marfim e tinta grafite dão sensação de papel editorial; verde profundo comunica confiança e conversa com o contexto brasileiro sem virar identidade partidária; amarelo solar é reservado para detalhes de destaque e estados selecionados. As fotos ficam em molduras neutras para não sugerir preferência.

### Layout

Fluxo vertical em uma coluna, com uma faixa de contexto no topo, cartões de candidato lado a lado apenas em telas maiores e uma barra de progresso curta nas etapas de cadastro/votação. A composição usa uma linha vertical de acento e pequenos selos editoriais em vez de um dashboard genérico.

### Elementos de assinatura

- Marca textual `SEB` em um selo circular com linha de registro.
- Etiqueta `ENQUETE INDEPENDENTE` com aparência de carimbo.
- Moldura dupla nas imagens, com uma ação lúdica igual para cada candidato.

### Interações e animação

- Abertura da etapa seguinte com transição curta de opacidade e deslocamento vertical.
- Seleção de candidato com anel de foco, leve elevação e barra de seleção.
- Toque na foto alterna um efeito de brilho/moldura, sem alterar o conteúdo ou favorecer a escolha.
- Respeitar `prefers-reduced-motion`.

### Tipografia

Usar `DM Sans` como fonte de interface, com fallback de sistema, e `Fraunces` para títulos editoriais. Títulos curtos têm peso alto e espaçamento compacto; textos explicativos ficam em corpo confortável e alto contraste.

### Essência da marca

**Posicionamento:** uma enquete digital independente para registrar uma escolha política de forma simples, transparente e respeitosa.

**Personalidade:** clara, equilibrada, participativa.

**Voz:** direta, cordial e sem tom de campanha. Exemplos: “Escolha com calma. Aqui, cada pessoa participa uma vez.” e “Opinião registrada — sem transformar enquete em promessa.”

### Wordmark e cor proprietária

O wordmark combina `SEB` em caixa alta com a assinatura “Segundo Eleição” em serifada editorial. A cor proprietária é **verde mata #16463B**, usada como eixo de confiança e neutralidade institucional.

## Estrutura do projeto

- `client/src/App.tsx`: fluxo da interface, cadastro demonstrativo, seleção de candidato, interações nas fotos e confirmação.
- `client/src/index.css`: tokens visuais, layout responsivo, estados de foco e animações.
- `client/public/assets/candidates/`: fotos públicas locais dos candidatos.
- `client/src/pages/Playground.tsx`: segunda página `/brincar`, com estúdio de molduras, brilho, corações e confetes equivalentes para as duas fotos.
- `client/public/manus-routes.json`: declaração das rotas públicas da aplicação.
- A página inicial também inclui um termômetro visual com percentuais demonstrativos, identificado como não oficial até a integração com o Supabase.
- `plan.md`: decisões de produto, arquitetura e design.
- `TODO.md`: entregas e critérios concretos para a próxima fase.

## Limites da entrega atual

A interface não deve insinuar que os dados locais são votos reais, não deve exibir porcentagens inventadas e não deve substituir a integração segura com o Supabase. A conexão com autenticação, validação de idade, consentimento LGPD, rate limiting, unicidade de voto e apuração pública permanece como próxima etapa.
