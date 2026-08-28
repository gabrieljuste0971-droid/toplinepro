# Design system — TopLine Pro Construction

**Seam & Slate v1.6**

A especificação completa está em **[DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)**.

| Arquivo | O que é |
|---|---|
| [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) | A especificação. Cor, tipografia, espaço, forma, vidro, controles, movimento, regras e checklist. |
| [`tokens.css`](tokens.css) | Variáveis CSS. É o arquivo que o site consome. Carregue com `?v=1.6.1`. |
| [`tokens.json`](tokens.json) | Os mesmos valores em dados, para Figma Tokens, Style Dictionary ou Tailwind. |
| `seam-and-slate.html` | Espécimes vivos dos componentes. **Ainda na linguagem da v0.4** — refazer. |
| `marca-em-campo.html` | Direção criativa das aplicações físicas: placa, caminhonete, cartão, orçamento, uniforme. |
| `ironwood-ref/` | Sistema de referência do Ironwood, em `--ref-*`. Origem do display e do reveal. |
| `*.v04.*.bak` · `*.v03.*.bak` | Backups das versões anteriores. |

## Em uma frase

Cor amostrada pixel a pixel do logotipo e display em caixa alta continuam nossos; a
geometria, o vidro, os controles e o movimento vieram do template Habitate — pill de
999px, moldura de mídia de 28px, card de 24px e um reveal de 900ms em
`cubic-bezier(.22,1,.36,1)`. A tipografia é Inter em 400, 500 e 600.

## v1.6

Serviços viraram um baralho de cards quadrados sobrepostos: o ativo em escala cheia com
borda branca, os laterais recuados em .86. Troca por clique, seta, teclado ou arrasto.

## v1.3

Números do herói contam de 0 até o valor com `easeOutExpo` quando a barra entra na tela, e
a barra foi reespaçada: colunas iguais, rótulo com duas linhas reservadas e linha de base
compartilhada.

## v1.2

Grade editorial na seção da diferença — cards de imagem cheia, descrição que abre no
hover, entrada alternada pelas laterais — e bloco de fechamento de navy para azul-claro.

## v1.1

Cursor com rastro, portado do *Cursor Dot Trail* da Pixelthrone: canvas fixo, ponto que
persegue o ponteiro por mola e fricção, rastro de pontos que envelhecem, e anel sobre
elemento interativo. Fora de toque e de `prefers-reduced-motion`.

## v1.0

Blur progressivo no topo ao rolar — cinco camadas de `backdrop-filter` com máscaras
defasadas, na receita do Gradient Depth Blur — e navegação que **inverte** conforme o tom
da seção que passa por baixo: logotipo, rótulos, controles e botão trocam entre a versão
clara e a escura.

## v0.9

**Inter em tudo.** A IBM Plex Mono saiu; o papel de dado técnico virou tratamento — caixa
alta, 14px, tracking. A barra de números do herói perdeu a caixa, o filete e o vidro:
agora são quatro colunas de texto solto sobre a foto.

## v0.8

Navegação virou **pill flutuante** na forma do Bouncy Nav Pill: 1200px, raio 36, blur de
14px, e uma pastilha azul-céu que persegue o item sob o cursor com mola
`cubic-bezier(.34,1.56,.64,1)` e volta ao item ativo quando o mouse sai.

## v0.7

Navegação refeita na geometria da **Habitate**: barra escura de largura total, menu num
painel claro centralizado que desce abaixo da barra e volta por um filete côncavo de 24px
de cada lado, e CTA em pill claro com chip circular. Sem estado `is-stuck` — a barra já
nasce opaca.

## v0.6

Tipografia inteira migrada para **Inter**, uma família só, com Escala fechada em `clamp()`, pesos 400/500/600 — nada de
700 ou 800 —, títulos em 500 e medidas de linha em token (`--measure-display`,
`--measure-heading`, `--measure-body`). Nenhuma seção inventa tamanho próprio: componente
novo reusa o token mais próximo.

## v0.5.1

Navegação refeita na geometria do template Visuvate — menu absoluto e centralizado,
grupos laterais de 154px, link em 0.6 de opacidade com filete que abre da esquerda, CTA
com preenchimento que sobe — mantendo o vidro da v0.5. Entrou o token `--r-nav` de 4px e
o **tema escuro opcional**, ligado só pelo botão da nav e gravado em `localStorage`. Não
há `prefers-color-scheme`: a página continua abrindo clara.

## O que mudou da v0.4

O raio único de 4px acabou. A Geist saiu para a Manrope. Passou a existir superfície
escura, e ela vale **só como moldura de mídia** — herói, formulário e CTA final — sempre
com foto por baixo e scrim por cima. Tema escuro continua não existindo.

A tabela completa de mudanças está no topo do [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).
