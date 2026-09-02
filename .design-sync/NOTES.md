# design-sync — notas do repositório

## Formato deste repositório

- Este **não** é um pacote React. É um site estático (`index.html` + CSS), e o design
  system vive inteiramente em CSS. Por isso o sync roda no modo **tokens-only**:
  `_ds_bundle.js` sai vazio de propósito e toda a substância vai em `styles.css` →
  `_ds_bundle.css`.
- O `package.json` na raiz foi criado só para o pipeline do design-sync (o conversor
  precisa de um `package.json` com `name` para derivar `PKG_DIR`, nome e versão).
  Ele é `private`, não tem dependências e o site não depende dele. **Manter a versão
  em dia com a do `DESIGN-SYSTEM.md`** — ela aparece no README enviado ao projeto.
- `.design-sync/ds-entry.mjs` é o entry JS exigido pelo conversor. É um `export {}`
  vazio; é o que faz o `source-kit` cair no caminho `[ZERO_MATCH] → tokens-only`.

## Como o CSS é montado

`scripts/ds-css-bundle.mjs` concatena, **sem editar uma linha**, os dois stylesheets que
o `index.html` realmente carrega, nesta ordem: `design-system/tokens.css`, depois
`assets/css/home.css`. O `@import` da Inter (Google Fonts) é escrito no topo do arquivo,
porque `@import` só vale antes de qualquer regra. A saída fica em
`.design-sync/build/ds-styles.css` (gitignored) e é o `cfg.cssEntry`.

- `assets/css/hero-v2.css` **fica de fora de propósito**: o `index.html` não o carrega
  (é trabalho em andamento, ainda não versionado). Se ele entrar no `<link>` do site,
  adicione-o ao array `PARTS` do script.
- Não existe diretório `tokens/` no bundle. O `copyTokens` do conversor só sabe copiar
  de um pacote em `node_modules` (`cfg.tokensPkg`), e aqui os tokens são um arquivo do
  próprio repositório. Eles viajam dentro do `_ds_bundle.css`, que está no fecho de
  `@import` do `styles.css` — que é a única coisa que os designs renderizados recebem.
  Funciona; só não aparece separado no painel.

## Fontes

Inter vem do Google Fonts em tempo de execução, via `@import url(...)` no topo do CSS.
Nenhum `.woff2` é enviado. `cfg.runtimeFontPrefixes: ["Inter"]` existe para o validate
não acusar `[FONT_MISSING]`.

## A pegadinha do `data-reveal`

`[data-reveal]` começa com `opacity: 0` e só a classe `is-in` revela o elemento. Quem
adiciona `is-in` é o IntersectionObserver de `assets/js/home.js`, que **não** faz parte
do sync. Um design que use `data-reveal` sem `is-in` renderiza invisível. Isso está
documentado no `conventions.md` — se um dia o JS entrar no escopo do sync, revisar essa
seção.

## Ambiente

- Node 24 nesta máquina. Sem gerenciador de pacotes no repositório (não há lockfile);
  as dependências do conversor ficam isoladas em `.ds-sync/` (gitignored).
- Playwright + Chromium precisam estar instalados em `.ds-sync/` ou o
  `package-validate.mjs` falha com `[RENDER_SKIPPED]` — mesmo neste bundle, que tem
  zero previews para checar.
- O caminho do repositório tem um espaço (`TOP LINE PRO`). Scripts precisam usar
  `fileURLToPath()` em vez de `new URL(...).pathname`, senão o `%20` quebra o
  `readFileSync`.

## Riscos de re-sync

- **`conventions.md` é a maior parte do valor deste sync.** Ele enumera classes e tokens
  reais; se `home.css` ou `tokens.css` renomearem qualquer coisa, ele passa a mentir e o
  agente de design escreve vocabulário que não resolve. Revalidar a cada sync: comparar
  todo nome citado contra `ds-bundle/_ds_bundle.css`.
- Zero componentes significa zero verificação visual. O validate só confere forma de
  arquivo, resolução de `@import` e cobertura de token. Nada prova que o CSS renderiza
  bonito — isso depende do `index.html`, que não é enviado.
- A versão do `package.json` é escrita à mão e não tem nada que a mantenha alinhada com
  o `DESIGN-SYSTEM.md`.
- Se o site algum dia virar um pacote de componentes React de verdade, este sync deve ser
  refeito na forma `package` cheia (com `.d.ts`, previews e verificação), não estendido.

## Avisos conhecidos e esperados (não perseguir)

- `[DTS_REACT] @types/react not found` — o conversor procura em `node_modules` da raiz
  do repositório, que não existe. Sem componentes para tipar, não tem efeito.
- `[ZERO_MATCH] no component exports — treating as tokens-only DS` — é exatamente o
  caminho pretendido, não uma falha de descoberta.
- `[DETECT] ... found .storybook at []` — não há Storybook; `cfg.shape` já fixa `package`.
