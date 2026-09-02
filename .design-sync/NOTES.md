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

## Anotações `@kind` nos tokens

O self-check do claude.ai/design classifica cada custom property e grava o resultado em
`_ds_manifest.json` (campo `kind`: `color`, `font`, `spacing`, `radius`, `shadow`,
`other`). A classificação é por nome e valor, e erra em dois padrões:

- **Aliases via `var()` cujo nome não sugere a família** caem em `color`. Foi o caso de
  `--container`, `--container-max`, `--gutter`, `--fw-display`, `--fw-bold`,
  `--lh-tight`, `--lh-heading` e `--ease-reveal`.
- **Valores que não são cor nem medida** (curvas de easing, durações, `blur()`,
  gradientes, `uppercase`) caem em `other` ou em família errada.

A correção é um comentário `/* @kind <família> */` logo depois do valor. **O parser só
aceita o comentário puro** — `/* @kind other — saída de UI */` é ignorado em silêncio.
Qualquer prosa depois do nome da família mata a anotação. Explicação vai numa linha de
comentário acima da declaração. Confirmação: `_ds_manifest.json` ganha um campo
`annotation` por token quando a anotação foi lida; token sem esse campo não foi anotado.
Em variável de componente, a anotação também precisa fechar a regra — `--drift` no meio
de um bloco de uma linha não era lido; mover para a última declaração resolveu. Já aplicado em
`design-system/tokens.css` (82 declarações) e em `assets/css/home.css` (`--p` do
`.closer__line` e os quatro `--drift` dos `.closer__chip--*`, que são estado de animação
por elemento, não token). **Ao adicionar token novo, anote junto** — senão o próximo
sync volta a classificar errado.

Duas divergências deliberadas em relação ao que o agente de design sugeriu:
`--link-color: currentColor` continua `color` (é cor), e `--shadow-none` continua
`shadow` (o compilador já acertou; `other` seria pior).

## Tokens de movimento aparecem como `0ms` no manifesto

O compilador lê a **última** declaração de cada token. Como `tokens.css` tem um bloco
`@media (prefers-reduced-motion: reduce)` no fim que zera `--dur-*`, `--stagger*`,
`--delay-enter` e `--blur-enter`, o manifesto mostra `0ms`/`0px` para todos eles. Pelo
mesmo motivo `--hero-h` aparece como `auto` e `--shell`/`--pad-x`/`--section-pad` trazem
os valores do breakpoint mais largo, não os da base.

Isso **não afeta o que renderiza** — o CSS enviado está correto e completo. Afeta só o
painel de tokens que o agente de design lê. Não tem correção possível na fonte sem
quebrar o `prefers-reduced-motion`; é limitação do last-wins do compilador.
