# Seam & Slate

**Design system da TopLine Pro Construction**
Versão 1.6 · 28/08/2026

---

## O que é

O sistema visual da TopLine Pro Construction — empresa familiar de roofing e serviços
exteriores sediada em Amherst (NH), com 16 anos de mercado e especialidade em standing
seam metal roofing fabricado na própria obra.

O nome vem das duas superfícies da empresa: a **costura** (*seam*) do painel metálico,
que é o diferencial técnico e comercial, e a **ardósia** (*slate*), o cinza-azulado que
sustenta tudo.

A v0.5 troca a camada de forma e de movimento. A **cor continua nossa** — sai por
amostragem de pixel do logotipo e não mudou uma linha desde a v0.1. A **geometria, o
ritmo, os controles, o vidro e o movimento vieram do Habitate**, template Framer
indicado pela cliente como referência de acabamento. O **display continua o do
Ironwood**: Cabinet Grotesk em caixa alta.

---

## O que mudou da v0.4

| Camada | v0.4 | v0.5 |
|---|---|---|
| Raio | 4px em tudo | Escala de cinco: 999 / 28 / 24 / 20 / 12 |
| Texto | Geist 400 | Manrope 500, tracking de `0.02em` |
| Superfície escura | Proibida | Permitida, só como moldura de mídia |
| Botão | Retângulo de 44px, chip quadrado de 32 | Pill de 52px, chip circular de 40 |
| Container | 1340 com goteira de 50 | 1400 com goteira de 64 |
| Seção | 120px em cima, 160 embaixo | 120 em cima, 128 embaixo |
| Reveal | 400ms, `cubic-bezier(.12,.23,.5,1)` | 900ms, `cubic-bezier(.22,1,.36,1)` |
| Tipografia (v0.6) | Cabinet Grotesk 800 + Manrope 500 | Inter em tudo, títulos em 500 |
| Fonte de dado (v0.9) | IBM Plex Mono | Inter, com caixa alta e tracking no lugar da família |
| Escala de título | Fixa, com salto no celular | Fluida, com `clamp()` |
| Vidro | Não existia | `backdrop-filter` em nav, painel e formulário |
| Régua de 6 colunas | Decoração de fundo | Removida |

O que **não** mudou: a rampa de cor, a dominância 80/12/8, o display em caixa alta, o
link sublinhado e nunca colorido, o corpo travado em 17px, o veto a ilustração e ícone
desenhado, e o `prefers-reduced-motion` zerando a sequência inteira.

---

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `tokens.css` | Variáveis CSS em duas camadas: primitivo e semântico. É o arquivo que o site consome. |
| `tokens.json` | Os mesmos valores em formato de dados, para Figma Tokens, Style Dictionary ou Tailwind. |
| `DESIGN-SYSTEM.md` | Este documento. A especificação completa. |
| `seam-and-slate.html` | Documento visual com espécimes vivos dos componentes. **Ainda na linguagem da v0.4.** |
| `marca-em-campo.html` | Direção criativa das aplicações físicas: placa, caminhonete, cartão, orçamento, uniforme. |
| `ironwood-ref/` | O sistema de referência extraído do Ironwood, namespaced em `--ref-*`. |
| `*.v04.*.bak` · `*.v03.*.bak` | Backups das versões anteriores. |

---

## Procedência

A tabela abaixo existe para que ninguém precise adivinhar de onde saiu cada decisão.

| Camada | Origem | Estado |
|---|---|---|
| **Cor** | Nossa | Intocada. Rampa ancorada em três pixels do logotipo. |
| **Atmosfera** | Nossa | Luz fria, grão de 3,2%, costura vertical. |
| **Tipografia** | Nossa | Inter em tudo, 400/500/600, escala fechada em `clamp()`. Substituiu Cabinet Grotesk, Archivo e Manrope na v0.6. |
| **Dado** | Nosso | IBM Plex Mono, o único papel que não é Inter. |
| **Forma** | Habitate | Pill de 999px, moldura de 28, card de 24, mídia de 20, campo de 12. |
| **Controles** | Habitate | Pill de 52px com chip circular de 40px e padding assimétrico. |
| **Vidro** | Habitate | `backdrop-filter: blur(14px)` na nav, `blur(20px)` em painel. |
| **Ritmo** | Habitate | Container 1400, goteira 64, herói de 100vh entre 700 e 915px. |
| **Movimento** | Habitate | 900ms, `cubic-bezier(.22,1,.36,1)`, blur de 10px, cascata de 62ms. |
| **Ground escuro** | Habitate | Moldura de mídia. Nosso navy `#0C1B29` no lugar do preto dela. |
| **Link** | Ironwood | Nunca colorido. Sublinhado, herdando a cor do texto. |

### O que não veio junto do Habitate

- O âmbar `#b57505`, que é a cor de acento dela. O nosso acento continua sendo o
  céu `#7BBDEC` sobre navy.
- O preto `#000` como ground. Usamos `#0C1B29`, que é o navy da marca puxado para baixo.
- O tema escuro completo. Aqui o escuro existe **só dentro de moldura de mídia**.
- A tipografia única. Ela roda Manrope em tudo; nós mantivemos o display em Cabinet
  Grotesk, caixa alta, porque é a assinatura da marca.

---

## Como usar

```html
<link rel="stylesheet" href="design-system/tokens.css?v=0.5">

<!-- Uma família só: Inter. -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
```

Consuma sempre os tokens semânticos (`--action-block`, `--text-muted`, `--ground`), nunca
os primitivos (`--blue-400`) direto na interface.

**Versione a URL do CSS.** O `?v=0.5` não é enfeite: sem ele o navegador serve a folha
antiga por horas depois de um deploy, e a página sai com metade dos tokens da versão
anterior. Suba o número a cada mudança de token.

> **Nota da v0.6.** As duas fontes vêm do Google Fonts. Acabou a dependência da Fontshare
> e, com ela, o problema de Content Security Policy que derrubava a Cabinet Grotesk em
> ambiente restrito.

---

## Cor

Camada intocada desde a v0.1. Os três tons-âncora do azul saem por amostragem direta de
pixel do PNG do logotipo.

### Rampa do azul

| Token | Valor | Papel |
|---|---|---|
| `--blue-50` | `#F2F8FD` | Fundo de destaque leve, hover de item de menu |
| `--blue-100` | `#DCEDF9` | Mapa, preenchimento leve |
| `--blue-200` | `#BCDCF3` | Estado desabilitado |
| `--blue-300` | `#9BCBEE` | Filete de hover em card |
| `--blue-400` | `#7BBDEC` | **Âncora — topo do degradê.** Bloco de CTA, ponto de badge |
| `--blue-500` | `#5A9BCE` | |
| `--blue-600` | `#3F7CAC` | Estrela de review |
| `--blue-700` | `#2F6088` | Rótulo mono, ênfase secundária |
| `--blue-800` | `#254A6A` | **Âncora — base do degradê** |
| `--blue-900` | `#16324A` | Tinta de marca, botão escuro, card de fechamento |

### Rampa da prata

| Token | Valor | Papel |
|---|---|---|
| `--silver-50` | `#FAFBFC` | |
| `--silver-100` | `#F1F4F7` | Seção alternada |
| `--silver-200` | `#E4E9ED` | |
| `--silver-300` | `#CFD5DA` | Borda de controle |
| `--silver-400` | `#B2BAC1` | |
| `--silver-500` | `#8E979F` | Placeholder |
| `--silver-600` | `#62707B` | Texto secundário (5,09:1 sobre branco) |
| `--silver-700` | `#44525E` | Corpo (8,03:1 sobre branco) |
| `--silver-800` | `#31373C` | |
| `--silver-900` | `#101922` | Título e corpo primário (17,73:1) |

### Ground: a rampa nova

Dois tons e um trio RGB, para montar scrim com alpha.

| Token | Valor | Papel |
|---|---|---|
| `--ink-950` | `#0C1B29` | Fundo da moldura de mídia |
| `--ink-900` | `#12283B` | Bloco secundário dentro da moldura |
| `--ink-scrim` | `9, 20, 31` | Componentes RGB do scrim |

O ground é o navy da marca puxado para baixo até virar quase preto. Ele existe porque a
foto de telhado precisa de um fundo que não brigue com ela quando a imagem não cobre a
tela inteira — no carregamento, no celular deitado, na moldura arredondada.

### Tokens semânticos

| Token | Valor | Uso |
|---|---|---|
| `--surface-page` | `#FFFFFF` | Fundo padrão |
| `--surface-alt` | `--silver-100` | Seção alternada |
| `--surface-raised` | `#FFFFFF` | Card, painel |
| `--surface-brand` | `--blue-50` | Bloco de destaque leve |
| `--surface-invert` | `--blue-900` | Card de fechamento, botão escuro |
| `--ground` / `--ground-soft` | `--ink-950` / `--ink-900` | **Só moldura de mídia** |
| `--text-primary` | `--silver-900` | Título e corpo |
| `--text-body` | `--silver-700` | Parágrafo |
| `--text-muted` | `--silver-600` | Legenda, meta, especificação |
| `--on-ground` | `#FFFFFF` | Texto sobre o ground (17,44:1) |
| `--on-ground-2` | `rgba(255,255,255,.72)` | Parágrafo sobre o ground (9,43:1) |
| `--on-ground-3` | `rgba(255,255,255,.48)` | Meta sobre o ground (4,86:1 — limite) |
| `--line` | `#DDE4EA` | Filete de 1px em claro |
| `--glass-line` | `rgba(255,255,255,.18)` | Filete de 1px em vidro |
| `--action-block` / `--action-on-block` | `--blue-400` / `--blue-900` | Botão primário |
| `--action-dark` / `--action-on-dark` | `--blue-900` / `#FFFFFF` | Botão escuro |
| `--action-light` / `--action-on-light` | `#FFFFFF` / `--blue-900` | Botão claro |
| `--action-urgent` | `--copper-600` `#9A5F32` | Só emergência de neve e gelo |

### O bloco de ação

```css
background: var(--action-block);   /* #7BBDEC */
color:      var(--action-on-block);/* #16324A — 6,50:1 */
```

O `#7BBDEC` **reprova para texto sobre branco** (2,03:1). Sobre o ground escuro ele passa
com folga (8,58:1) e pode carregar texto lá. Sobre claro continua valendo a regra antiga:
só bloco, filete e anel de foco.

### Dominância 80 · 12 · 8

80% claro e prata, 12% navy, 8% azul-céu — **medido por área ocupada na tela**, não por
número de cores na paleta. A moldura escura conta como navy. Na home atual são três
molduras escuras — herói, formulário e CTA final — contra sete seções claras, e a conta
fecha.

### Tema

O briefing marcou **"Cores Claras"** e deixou **"Cores Escuras"** desmarcada. A v0.5
mantém isso na leitura que importa: **não existe tema escuro**. Não há bloco
`@media (prefers-color-scheme: dark)` nem `[data-theme="dark"]`, e a página não segue a
preferência do sistema operacional do visitante.

O que existe é **moldura de mídia escura**: um retângulo arredondado com foto por baixo e
scrim por cima. É tratamento de imagem, não tema. A regra prática está em
"Regras que não se negociam", item 2.

### Contraste verificado

| Combinação | Razão | Resultado |
|---|---|---|
| `#101922` sobre `#FFFFFF` | 17,73:1 | AAA |
| `#44525E` sobre `#FFFFFF` | 8,03:1 | AAA |
| `#62707B` sobre `#FFFFFF` | 5,09:1 | AA |
| `#62707B` sobre `#F1F4F7` | 4,61:1 | AA (limite) |
| `#16324A` sobre `#FFFFFF` | 13,2:1 | AAA |
| `#16324A` sobre `#7BBDEC` | 6,50:1 | AA (botão primário) |
| `#FFFFFF` sobre `#0C1B29` | 17,44:1 | AAA |
| branco a 72% sobre `#0C1B29` | 9,43:1 | AAA |
| branco a 48% sobre `#0C1B29` | 4,86:1 | AA (limite — só meta e rótulo) |
| `#7BBDEC` sobre `#0C1B29` | 8,58:1 | AAA |
| `#FFC4C4` sobre `#0C1B29` | 11,58:1 | AAA (erro em campo de vidro) |
| `#7BBDEC` sobre `#FFFFFF` | 2,03:1 | **Reprova.** Nunca como texto em claro |

---

## Tipografia

**Uma família para tudo: Inter.** Na v0.9 a IBM Plex Mono também saiu. O papel de dado
técnico continua existindo, mas agora ele é um **tratamento**, não uma segunda fonte:
caixa alta, 14px, peso 400 e tracking de `0.06em` a `0.1em`.

| Papel | Fonte | Token | Uso |
|---|---|---|---|
| Tudo | Inter | `--font-ui` | Título, corpo, botão, rótulo, campo, menu |
| — | apelidos | `--font-display`, `--font-body`, `--font-mono` | Todos apontam para `--font-ui` |

`--font-mono` continua no código para marcar *onde* mora o dado técnico. Se um dia a marca
quiser um mono de volta, é uma linha em `tokens.css` e ele reaparece em todos os lugares
certos.

### Princípios

Moderno, limpo, mínimo, editorial. Elegante em vez de denso. **Nada de peso 700 ou 800:**
a escala inteira vive em 400, 500 e 600, e todo título é 500. O peso vem do tamanho e do
tracking negativo, não da gordura da letra.

### Escala

Fechada. **Nenhuma seção inventa tamanho, peso ou entrelinha próprios.** Componente novo
reusa o token mais próximo — não existe "só nesse card eu uso 15px".

| Token | Tamanho | Peso | Entrelinha | Tracking |
|---|---|---|---|---|
| `--text-display` | `clamp(56px, 6vw, 96px)` | 500 | 0.98 | `-0.04em` |
| `--text-h1` | `clamp(48px, 5vw, 72px)` | 500 | 1 | `-0.035em` |
| `--text-h2` | `clamp(40px, 4vw, 56px)` | 500 | 1.05 | `-0.03em` |
| `--text-h3` | `clamp(28px, 2.4vw, 36px)` | 500 | 1.1 | `-0.02em` |
| `--text-h4` | `clamp(20px, 1.6vw, 24px)` | 500 | 1.2 | `-0.015em` |
| `--text-lead` | `clamp(18px, 1.4vw, 20px)` | 400 | 1.55 | `-0.01em` |
| `--text-md` | 16px | 400 | 1.6 | `-0.005em` |
| `--text-ui` | 15px | 500 | 1 | `-0.01em` |
| `--text-sm` | 14px | 400 | 1.5 | 0 |
| `--text-xs` | 12px | 400 | 1.5 | `0.1em`, caixa alta |

`--text-display` é o título do herói. `--text-h1` é o título das páginas internas.
`--text-ui` é nav e botão — mesmo tamanho, mesmo peso, mesma entrelinha nos dois.

### Escala no celular

Sem salto brusco: os mesmos `clamp()` com piso e teto menores, trocados em 810px.

| Token | Celular |
|---|---|
| `--text-display` | `clamp(40px, 9vw, 52px)` |
| `--text-h1` | `clamp(40px, 8.5vw, 48px)` |
| `--text-h2` | `clamp(32px, 7vw, 40px)` |
| `--text-h3` | `clamp(24px, 5.4vw, 28px)` |
| `--text-md` | 16px — **nunca abaixo de 15px** |

Medido a 394px de viewport: herói 40px, h2 32px, corpo 16px, texto pequeno 14px.

### Medida de linha

Largura máxima por papel, em token. Não usar `ch` solto.

| Token | Valor | Uso |
|---|---|---|
| `--measure-display` | 1100px | Título de herói |
| `--measure-heading` | 820px | Título de seção (`h1`, `h2` já saem com ele) |
| `--measure-body` | 620px | Parágrafo (`p` já sai com ele) |
| `--measure` | 860px | Prosa centralizada, depoimento |

### Caixa alta

`--case-display: uppercase` continua no `h1` e no `h2`. A diferença é que agora ela roda
em peso **500** com `-0.04em`: pesa pela forma e pelo tamanho, não pela gordura. `h3` e
`h4` são caixa normal.

Título sempre com `text-wrap: balance`. Parágrafo nunca centralizado.

## Espaço e layout

Base 8px. O ritmo de seção encolheu na base porque a moldura arredondada já cria respiro.

| Token | Valor | Uso |
|---|---|---|
| `--space-1` … `--space-8` | 4, 8, 12, 16, 20, 24, 32px | Espaçamento interno |
| `--space-12` | 48px | Gap de cabeçalho para conteúdo |
| `--space-14` | 56px | Gap interno dominante de seção |
| `--space-20` | 80px | Padding de seção curta |

| Token | Valor | Uso |
|---|---|---|
| `--shell` | 1400px | Container de conteúdo |
| `--shell-nav` | 1200px | Pill da navegação |
| `--pad-x` | 64px (40 em 1200, 20 em 810) | Goteira |
| `--measure` | 860px | Prosa centralizada, depoimento |
| `--frame-inset` | 20px (10 no celular) | Respiro entre moldura de mídia e viewport |
| `--section-pad` | `120px 0 128px` | Seção padrão |
| `--section-pad-sm` | `96px 0 104px` | Seção curta |

```css
.section    { padding: var(--section-pad); }
.section--sm{ padding: var(--section-pad-sm); }
```

A régua de 6 colunas da v0.4 foi removida. Ela competia com a moldura arredondada e não
sobrevivia ao raio de 28px.

### Herói

| Token | Valor |
|---|---|
| `--hero-h` | `100vh` |
| `--hero-min` | 700px |
| `--hero-max` | 915px |

A estrutura, herdada da referência:

- Moldura de `--r-frame` com `--frame-inset` de folga em relação à viewport
- Foto sangrando dentro da moldura, com zoom de `1.08` para `1` em 2600ms
- Scrim duplo: um vertical, para segurar a barra de números na base, e um diagonal a
  78°, para segurar o título à esquerda
- Costura de 1px a cada 34px sobre a foto, a 4,5% de branco
- Título, parágrafo e CTA empilhados e alinhados à esquerda, em coluna de 860px
- Barra de números **sem caixa**: quatro colunas de texto solto sobre a foto

No celular a linha vira coluna: título, apoio, botões, números. Nunca grade com célula
vazia.

---

## Forma e elevação

**Sete raios, cada um com um trabalho.**

| Token | Valor | Uso |
|---|---|---|
| `--r-pill` | 999px | Botão, nav, chip, badge, selo, barra fixa do celular |
| `--r-frame` | 28px (22 no celular) | Moldura de mídia sangrando: herói e CTA final |
| `--r-card` | 24px | Card, painel, formulário, dropdown, sheet, popup |
| `--r-card-lg` | 40px | Card grande de mídia: os 380px do baralho de serviços |
| `--r-media` | 20px | Foto de projeto, mapa, vídeo dentro de grade |
| `--r-sm` | 12px | Campo de formulário, item pequeno |
| `--r-nav` | 4px | Reservado. A nav da v0.7 usa pill e o arco de 24px |

`--radius` continua existindo como apelido de `--r-card`.

Se um componente novo pede um oitavo valor, ou ele é um dos sete ou o componente está
errado. A escala acompanha o tamanho do elemento: 12 no campo, 20 na foto de grade, 24 no
card, 28 na moldura, 40 no card de 380px. O `--r-nav` de 4px é a exceção declarada: a nav inteira veio da Visuvate, que
trabalha em 4px, e a cliente pediu a cópia exata.

**Elevação em superfície clara: quase nenhuma.** Profundidade vem de bloco de cor e de
filete de 1px por `inset box-shadow`, não de sombra projetada.

| Token | Valor | Uso |
|---|---|---|
| `--shadow-none` | `none` | O padrão de card e seção |
| `--shadow-sm` | `0 2px 4px rgba(22,50,74,.15)` | Raro |
| `--shadow-nav` | `0 10px 30px -18px rgba(12,27,41,.45)` | Nav preenchida, barra do celular |
| `--shadow-pop` | `0 24px 60px -30px rgba(12,27,41,.5)` | Dropdown |
| `--shadow-modal` | `0 40px 90px -40px rgba(9,20,31,.8)` | Popup de entrada |

Sombra é sempre tingida de navy, nunca preto neutro, e só aparece em elemento que
realmente flutua sobre outro.

### Vidro

| Token | Valor | Uso |
|---|---|---|
| `--glass` | `rgba(255,255,255,.10)` | Preenchimento sobre ground |
| `--glass-strong` | `rgba(255,255,255,.16)` | Item ativo |
| `--glass-line` | `rgba(255,255,255,.18)` | Filete sobre ground |
| `--glass-nav` | `rgba(12,27,41,.34)` | Nav sobre o herói |
| `--glass-nav-stuck` | `rgba(255,255,255,.82)` | Nav depois de rolar |
| `--glass-panel` | `rgba(255,255,255,.92)` | Dropdown, popup |
| `--blur-glass` | `blur(14px) saturate(1.2)` | Nav |
| `--blur-panel` | `blur(20px) saturate(1.1)` | Painel, formulário, popup |

Vidro só sobre foto ou sobre ground. Vidro sobre fundo chapado é enfeite e não entra.
Todo `backdrop-filter` vem com `-webkit-` ao lado e com uma cor de fundo que já sustenta
o contraste sozinha, para o caso de o navegador não suportar o filtro.

---

## Controles

### Botão

| Token | Valor |
|---|---|
| `--control-h` | 52px — CTA de página |
| `--control-h-sm` | 44px — nav, secundário, botão de ícone |
| `--control-pad` | `6px 8px 6px 24px` |
| `--control-pad-flat` | `6px 26px` — variante sem chip |
| `--control-gap` | 14px |
| `--icon-chip` | 40px |
| `--icon-chip-sm` | 34px |
| `--icon` | 15px |

O padding é assimétrico porque a seta mora num chip circular de 40px encostado na borda
direita do pill de 52px. Tirou-se o chip, usa-se `--control-pad-flat`.

| Variante | Fundo | Rótulo | Chip |
|---|---|---|---|
| `block` | `#7BBDEC` | `#16324A` | navy com seta branca |
| `dark` | `#16324A` | branco | céu com seta navy |
| `light` | branco com filete | `#16324A` | navy com seta branca |
| `ghost` | vidro sobre ground | branco | sem chip |
| `urgent` | `#9A5F32` | branco | — |
| desabilitado | `#BCDCF3` | `#8E979F` | — |

**Estados.** Hover é **opacidade 0.86** e a seta gira exatos **45°**. `:active` encolhe
para `scale(.985)`. Não há mudança de cor e não há elevação.

**Texto de botão** é sempre verbo + objeto: *Get a free estimate*, *Book a consultation*.
Nunca *Saiba mais*. Uma ação primária por tela.

### Campo

| Propriedade | Claro | Sobre vidro escuro |
|---|---|---|
| Altura | 52px | 52px |
| Padding | `14px 16px` | `14px 16px` |
| Fundo | `--surface-page` | `rgba(255,255,255,.07)` |
| Borda | 1px `--line` | 1px `--glass-line` |
| Raio | `--r-sm` (12px) | `--r-sm` |
| Foco | `outline: 2px solid #7BBDEC; outline-offset: 2px` | igual |
| Erro | `--feedback-danger-fg` | `--feedback-danger-on-ground` |

Input, select e textarea compartilham borda, raio e anel de foco — sem exceção. Rótulo
sempre visível acima do campo, em 13px caixa alta com `0.04em`; placeholder nunca
substitui rótulo. `option` de select sempre com fundo sólido e texto escuro, porque o
menu nativo não herda o vidro. Mensagem de erro diz **como corrigir**, não repete o
problema.

### Link

Nunca colorido. Sublinhado, `text-underline-offset: 3px`, herdando a cor do texto.

---

## Marcadores

### Badge

O olho-mágico acima de todo título de seção. Pill com ponto de 6px na frente.

```css
padding: 9px 16px;
border-radius: var(--r-pill);
background: var(--blue-50);
color: var(--blue-900);
box-shadow: inset 0 0 0 1px var(--line);
font-size: 13px; font-weight: 600;
text-transform: uppercase; letter-spacing: .08em;
```

Sobre ground, a variante `--glass` troca o fundo por vidro e o texto por branco. O badge
nunca repete a palavra do h2 logo abaixo dele.

### Chip

Rótulo de categoria em card. Pill de `6px 12px`, fundo `--surface-alt`, mono em 11px com
`0.1em`. É onde entra a especificação técnica, no lugar do ícone que o briefing vetou.

### Selo da faixa de confiança

Círculo de 44px com filete de 1px, mono em 10px. Para os dois itens sem logotipo — o HIC
e a garantia — o círculo é navy chapado com o texto em branco.

### Ponto de carrossel

Inativo é um círculo de 10px com 22% de opacidade. O ativo **estica** para uma pílula de
32px com opacidade cheia, animando a largura.

---

## Card, nav e superfícies

### Card

Plano, com filete de 1px por `inset` e raio de 24px. Sem sombra.

```
tag      chip mono, 11px, caixa alta          ← no lugar do ícone
title    display, 21px, 700
body     Manrope, 15px, 1.5, --text-body
```

Hover levanta 4px e troca o filete para `--blue-300`. Uma única transição, 400ms.

Variante `card--block`: um tile inteiro preenchido de azul-céu. No máximo um por grade.

### Baralho de serviços

Porte do *Card Carousel*. Cards quadrados sobrepostos no centro do palco: o ativo em
escala cheia com borda branca grossa, os laterais recuados e com a borda fina.

| Propriedade | Valor |
|---|---|
| Palco | 560px de altura (480 em tablet, 420 no celular), `overflow: hidden`, fundo `--surface-alt` |
| Card | `clamp(min(w*.32, h*.74), 300, 380)` no desktop; `clamp(min(w*.42, h*.72), 260, 340)` em tablet; `clamp(w*.78, 220, min(w-40, h*.64))` no celular |
| Distância | 184px no desktop; `card * (1 - .12)` no celular |
| Posição | `translateX((i - ativo) * distância)` |
| Escala | 1 no ativo, `.86` nos laterais |
| Opacidade | `.55` além do segundo vizinho |
| `z-index` | 50 no ativo, `50 - distância` nos outros |
| Borda | 10px `#FFF` no ativo, 8.5px a 90% no hover, 5.5px a 50% no resto |
| Raio | `--r-card-lg` 40px |
| Curva | `cubic-bezier(.4,0,.2,1)`, 500ms |

O conteúdo — título, uma linha e o botão *Discover* — só existe no card ativo: ele entra
de `opacity: 0` e `translateY(14px)`.

**Quatro formas de trocar de card**, todas do original: clique no card lateral, setas do
teclado, arrasto horizontal com limiar de 56px no desktop e 36px no celular, e os botões
de seta. Os pontos abaixo do palco fazem o mesmo e marcam a posição.

**O scrim do ativo é mais forte que o do original.** A referência usa preto chapado a 42%
sobre foto de estúdio; aqui a foto é telhado com céu claro e o texto branco não sobrevive
com isso. O gradiente vai de 88% na base a 22% no topo, medido sobre a foto mais clara do
conjunto.

### Grade editorial### Grade editorial

Porte do *Editorial Card Grid*. Três cards de imagem cheia encostados um no outro, sem
gap, separados por um filete de 1px. O título fica sempre visível; a descrição abre no
hover.

| Propriedade | Valor |
|---|---|
| Grade | `repeat(3, 1fr)`, sem gap, raio `--r-card` com `overflow: hidden` |
| Card | `aspect-ratio: 3/4` |
| Filete | 1px `rgba(255,255,255,.10)`, absoluto na lateral esquerda a partir do segundo |
| Foto | `scale(1)` para `scale(1.06)` em 750ms `--ease-standard` |
| Scrim | `to top`, de 86% a 0 sobre `--ink-scrim`; adensa no hover |
| Corpo | absoluto na base, padding `32px 28px` |
| Olho-mágico | `--text-xs`, peso 500, tracking `.18em`, `--on-ground-3` |
| Título | `--text-h4`, peso 500, `line-height: 1.15` |
| Descrição | `--text-sm`, `max-height: 0` para `12em` em 400ms, opacidade com 50ms de atraso |
| Entrada | alterna `translateX(∓72px)`, 900ms em `--ease-editorial`, cascata de 80ms |

`--ease-editorial` é `cubic-bezier(.16,1,.3,1)`, a curva da referência. É a única entrada
do site que desliza pela lateral em vez de subir — e ela não leva blur, ao contrário dos
`rise-*`.

**No celular** o hover não existe: a grade vira uma coluna, o card afrouxa para `16/10` e
**a descrição já nasce aberta**. Um efeito que só se revela no hover é um efeito que
metade do público nunca vê.

### Card de fechamento

O bloco de raio 24px que fecha a seção da diferença. Era navy chapado até a v1.2; agora é
`--surface-brand` — o azul-claro `#F2F8FD` — com filete de 1px e texto em
`--text-primary`.

A troca devolve a regra de dominância: o navy voltou a ser **tinta**, não superfície. As
três superfícies escuras da página passaram a ser só as molduras de mídia, que têm foto
por baixo.

### Nav

Geometria do **Bouncy Nav Pill**. Um pill flutuante com logotipo à esquerda, menu no meio
e ações à direita. A pastilha de destaque persegue o item sob o cursor com mola.

| Propriedade | Valor |
|---|---|
| Posição | `fixed`, `--nav-inset` 20px do topo, centralizado |
| Largura | `calc(var(--shell) - var(--pad-x) * 2)`, com goteira `calc(var(--pad-x) + var(--frame-inset))` |
| Linha | padding `--nav-pad` `12px 12px 12px 24px`, sem fundo e sem filete |
| Moldura | só em volta do menu: padding 6px, raio `--nav-radius` 36px, `--nav-bar`, filete `--nav-line`, `--nav-shadow`, `blur(14px)` |
| Logotipo | 40px de altura no desktop, 34px no celular |
| Fundo | `--nav-bar`, filete de 1px em `--nav-line`, `--nav-shadow`, `backdrop-filter: blur(14px)` |
| Link | padding `12px 16px`, 16px peso 400, `letter-spacing: -.02em`, `line-height: 1.1`, raio pill |
| Gap entre links | `--nav-gap` 2px — a pastilha cobre o vão sem deixar buraco |
| Pastilha | `--nav-indicator` azul-céu, rótulo em `--nav-on-indicator` navy (6,50:1) |
| Caret | 13×13, `stroke-width: 2.2`, pontas redondas |
| CTA | mesmo padding do link, fundo da pastilha, peso 500 |

**Onde a moldura mora.** Ela envolve **só os links**, de *Metal Roofing* a *About*. O
logotipo à esquerda e o grupo da direita — telefone, botão de tema e CTA — pousam direto
sobre a foto, nas mesmas posições que ocupavam quando a moldura era a linha inteira. Como
eles perderam o fundo, ganharam `drop-shadow` e `text-shadow` curtos em navy, para
sobreviver quando a foto do herói tiver céu claro atrás.

**A largura.** O pill não tem largura própria: ele repete a conta do conteúdo. A goteira é
`--pad-x` somada ao `--frame-inset` da moldura de mídia, e o teto é `--shell` menos duas
goteiras. Resultado medido: em 1440 o pill vai de 84 a 1341 e a barra de números do herói
vai de 84 a 1341; em 1200, ambos de 60 a 1125. Se o container mudar, os dois mudam juntos.

**A mola.** A pastilha é um `<span>` absoluto atrás dos links. No hover, o JavaScript mede
o link com `getBoundingClientRect`, escreve `width` e `translateX`, e a transição em
`--ease-bounce` `cubic-bezier(.34,1.56,.64,1)` por `--dur-bounce` 520ms dá o passo além
seguido do assentamento. Quando o cursor sai do trilho, ela volta ao item ativo — na home,
*Metal Roofing*.

> **Cuidado ao reimplementar.** `offsetLeft` não serve aqui: cada link mora num `<li
> class="nav__item">` com `position: relative` para ancorar o dropdown, então o
> `offsetParent` é o próprio `<li>` e o valor sai sempre 0. A posição tem que ser medida
> contra o rect do `<ul>`. Foi exatamente esse o bug da primeira versão: a pastilha
> mudava de largura e não saía do lugar.
>
> O indicador é um `<li>` dentro do próprio `<ul>`, não um irmão do trilho. Fora do `<ul>`
> ele herdaria o padding de 6px da moldura e ficaria deslocado. Medido depois da mudança:
> a pastilha bate com o link em 0px de diferença, na posição e na largura.

A posição inicial é escrita com a transição desligada, depois de `document.fonts.ready`,
para a pastilha não vir deslizando da esquerda no carregamento e para a largura considerar
a fonte já carregada. `prefers-reduced-motion` troca a mola por troca imediata.

**O telefone** entra como ícone de 17px com `aria-label` e `title`; o número por extenso
vive no herói, no rodapé e na barra fixa do celular.

No celular o trilho e o telefone somem: ficam logotipo, botão de tema e hambúrguer, com o
pill em padding `10px 10px 10px 18px`.

### Barra de números do herói

Quatro colunas de texto solto. **Sem caixa, sem filete, sem divisória, sem vidro** — o
scrim do herói já escurece a base da foto o suficiente para o texto ficar em 9,43:1.

```
grid   repeat(4, minmax(0, 1fr)), gap 32px
número --text-h3, peso 500, line-height 1, tabular-nums
sufixo font-variant-numeric: normal
rótulo --text-sm, peso 400, caixa alta, tracking .06em, --on-ground-2,
       max-width 20ch, min-height 2.8em
```

O `min-height` do rótulo reserva duas linhas. Sem ele, "Google Rating" ocupa uma linha e
"Metal Workmanship Warranty" ocupa duas, e as colunas param de dividir a mesma linha de
base. Medido: os quatro números em `top: 754`, os quatro rótulos em `top: 801`.

**O sufixo sai do escopo do `tabular-nums`.** A figura tabular é necessária durante a
contagem, senão o número muda de largura a cada quadro e a linha treme; mas na Inter ela
alarga o hífen, e "25-Year" ganha um vão no meio. Por isso o sufixo vive num `<span>`
próprio com `font-variant-numeric: normal`.

### Contagem dos números

Porte do contador da referência, incluindo a curva. `easeOutExpo` sobre o tempo decorrido:

```js
function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
var t = Math.min((now - start) / (duration * 1000), 1);
var value = easeOutExpo(t) * end;
```

A expo sobe quase todo o caminho no primeiro terço e depois rasteja até o alvo — é o que
faz o número parecer que "assenta" em vez de parar seco.

| Parâmetro | Valor |
|---|---|
| Duração | 1.6s |
| Disparo | `IntersectionObserver`, `threshold: 0.4`, uma vez só |
| Formato | `toLocaleString('en-US')` com casas decimais por elemento |

A marcação carrega o valor final e os parâmetros:

```html
<dt class="stats__num" data-count="500" data-suffix="+" data-decimals="0">
  500<span class="stats__suffix">+</span>
</dt>
```

O valor final está no HTML, não no script. Com `prefers-reduced-motion` o observador nem
é criado e o número já nasce certo; sem JavaScript, idem.

### Blur progressivo do topo

Uma faixa fixa de `--topblur-h` 140px, atrás da navegação, que entra depois de 24px de
rolagem. Ela existe para o conteúdo passar por baixo da barra sem virar ruído.

A opacidade é ligada por classe (`.is-on`) com `transition: opacity var(--dur-mid)
var(--ease-out)`.

> **Tentativa descartada.** Uma versão presa à rolagem — opacidade indo de 0 a 1 ao longo
> dos primeiros 220px numa smoothstep — foi implementada e revertida. Fica registrada aqui
> porque a ideia volta: se um dia ela for retomada, use smoothstep, nunca `ease-out`, que
> entrega 30% do blur nos primeiros 20px de rolagem.

Cinco camadas empilhadas, cada uma com `backdrop-filter` maior e a máscara entrando 20%
mais alto:

| Camada | Blur | Máscara |
|---|---|---|
| 1 | 0.6px | `transparent 0%, #000 20%` |
| 2 | 2.5px | `transparent 20%, #000 40%` |
| 3 | 5.6px | `transparent 40%, #000 60%` |
| 4 | 10px | `transparent 60%, #000 80%` |
| 5 | 16px | `transparent 80%, #000 100%` |

```css
.topblur span:nth-child(3) {
  backdrop-filter: blur(5.6px);
  mask-image: linear-gradient(to top, transparent 0%, transparent 40%, #000 60%, #000 100%);
}
```

O gradiente é `to top`: nítido embaixo, desfocado no topo. Um `backdrop-filter` único
deixaria uma borda dura na altura onde ele acaba; o empilhamento com máscaras defasadas
dissolve essa borda.

**Dois desvios da receita original.** A referência usa oito camadas e vai até 40px de
blur. Aqui são cinco, com teto de 16px: numa faixa de 140px o ganho visual acima disso é
nulo e o custo de composição aparece na rolagem. No celular duas camadas somem, sobrando
três.

Acompanha um véu de contraste em `::after` — o blur sozinho não segura texto branco sobre
céu claro. Ele inverte junto com a barra: navy sobre seção escura, branco sobre clara.

### Inversão por seção

A barra flutua sobre o conteúdo, então precisa saber o tom do que passa por baixo.

Seções escuras carregam `data-nav-tone="dark"` no HTML — hoje são herói, formulário e CTA
final. O resto é claro por padrão. A cada quadro de rolagem, dentro de um
`requestAnimationFrame`, o script mede um ponto 10px acima da base da barra e procura qual
seção o contém.

Sobre seção clara entra `.nav--light`, e com ela:

| Elemento | Escuro | Claro |
|---|---|---|
| Logotipo | versão branca, com `drop-shadow` | versão colorida, sem sombra |
| Moldura do menu | `--nav-bar` navy translúcido | branco a 82% com filete `--line` |
| Rótulo | branco | `--text-primary` |
| Telefone | branco com `text-shadow` | `--text-primary`, sem sombra |
| Botão de tema | branco a 24% | `--blue-900` |
| CTA | azul-céu com rótulo navy | navy com rótulo branco |

No tema escuro a função devolve `dark` direto: lá todas as seções são escuras e não há o
que inverter.

### Cursor com rastro

Porte do componente *Cursor Dot Trail* da Pixelthrone. Um `<canvas>` fixo em `z-index:
9999`, `pointer-events: none`, redimensionado pelo `devicePixelRatio`.

**A física, igual à do original.** A cada quadro:

```js
vel.x += (target.x - pos.x) * spring;   // 0.18
vel.y += (target.y - pos.y) * spring;
vel.x *= friction;                      // 0.72
vel.y *= friction;
pos.x += vel.x;
pos.y += vel.y;
```

O ponto não segue o cursor, ele **persegue** o cursor. A mola acelera na direção do alvo e
a fricção freia, o que dá o atraso elástico e o overshoot leve na parada.

**O rastro** é uma fila de pontos com idade. A cada quadro entra um ponto na posição atual,
todos envelhecem pelo delta de tempo (limitado a 33ms para o rastro não explodir quando a
aba volta do segundo plano) e os que passam de `trailDuration` saem. Cada ponto encolhe e
apaga junto com a idade.

| Parâmetro | Valor |
|---|---|
| `size` | 9px em repouso |
| `hoverSize` | 40px sobre elemento interativo |
| `borderWidth` | 1.5px |
| `spring` | 0.18 |
| `friction` | 0.72 |
| `trailDuration` | 340ms |
| `transitionSpeed` | 0.2 |

**Sobre link, botão ou campo** o ponto cheio vira anel: o raio interpola para `hoverSize/2`,
o preenchimento apaga e a borda entra. A detecção é `elementFromPoint` seguido de `closest`.

**A cor sai do tom da seção** — a mesma marcação `data-nav-tone="dark"` que a navegação usa.
Navy sobre claro, branco sobre escuro, branco sempre no tema escuro.

**Onde não roda:** sem `(hover: hover) and (pointer: fine)`, ou seja, nenhum dispositivo de
toque; e sob `prefers-reduced-motion: reduce`, onde o script sai antes de criar o canvas.
Também dorme quando o ponteiro deixa a janela ou a aba fica escondida.

**O cursor nativo continua visível.** O original substitui o ponteiro do sistema. Aqui não:
o público tem 45 a 65 anos, e trocar um ponteiro que a pessoa reconhece por um ponto
desenhado custa mais do que entrega.

### Botão de tema

Copiado da referência: pill de **38×20px**, padding 3px, raio 999px, com botão branco
circular de 14px e `box-shadow: 0 2px 4px rgba(0,0,0,.15)`. O botão desliza 18px em
`transform`, não em `justify-content`, para a transição ser interpolável.

Marcação: `<button role="switch" aria-checked>`, com `aria-label` que muda de
*Switch to dark mode* para *Switch to light mode*.

### Tema escuro opcional

**Existe desde a v0.5.1, e só por escolha explícita do visitante.** O botão da nav grava
`tlp-theme` em `localStorage` e o atributo `data-theme="dark"` entra no `<html>`.

Três coisas continuam valendo:

1. **Não existe `@media (prefers-color-scheme: dark)`.** A página abre clara em qualquer
   sistema operacional. O briefing marcou "Cores Claras" e isso não mudou.
2. O tema é aplicado por um script inline no `<head>`, antes da primeira pintura, para a
   página não piscar branco antes de virar escura.
3. As molduras de mídia não mudam entre os temas. Elas já eram escuras.

O bloco `[data-theme="dark"]` troca só a camada semântica: `--surface-page` vira
`--ink-950`, `--surface-alt` vira `--ink-900`, `--surface-raised` vira `--blue-900`, o
texto vira branco com 76% e 56%, e `--line` vira branco a 16%. A rampa de cor primitiva
não é tocada.

### Moldura de mídia

O componente novo da v0.5. Herói, formulário e CTA final usam a mesma peça:

```
frame     border-radius: var(--r-frame); overflow: hidden; isolation: isolate
media     position: absolute; inset: 0; z-index: -2; object-fit: cover
scrim     position: absolute; inset: 0; z-index: -1; --scrim-* + --seam-light
content   position: relative; padding: var(--shell) centralizado
```

Três scrims prontos: `--scrim-hero` (duplo, vertical e diagonal), `--scrim-panel`
(vertical, para formulário) e `--scrim-side` (horizontal, para CTA final).

---

## Movimento

### Curvas

| Token | Valor | Uso |
|---|---|---|
| `--ease-soft` | `cubic-bezier(.22,1,.36,1)` | **A curva assinatura.** Todo reveal e entrada |
| `--ease-out` | `cubic-bezier(.16,.84,.24,1)` | Hover, transição de UI |
| `--ease-standard` | `cubic-bezier(.4,0,.2,1)` | Transição neutra |
| `--ease-glide` | `cubic-bezier(.25,.1,.25,1)` | Deslize de carrossel |
| `--ease-bounce` | `cubic-bezier(.34,1.56,.64,1)` | **Só a pastilha da nav e o botão de tema.** Passa do alvo e volta |

### Durações

| Token | Valor | Uso |
|---|---|---|
| `--dur-fast` | 150ms | Rotação da seta |
| `--dur-quick` | 240ms | Opacidade, hover |
| `--dur-base` | 300ms | Transição padrão de UI |
| `--dur-mid` | 400ms | Fundo, filete, elevação de card |
| `--dur-reveal` | 800ms | Revelação ao rolar |
| `--dur-in` | 900ms | Entrada na carga |
| `--dur-zoom` | 2600ms | Zoom da foto do herói |
| `--dur-bounce` | 520ms | Percurso da pastilha da nav |
| `--stagger` | 80ms | Entre cards |
| `--stagger-word` | 62ms | Entre palavras do título |
| `--delay-enter` | 360ms | Primeira palavra do herói |
| `--blur-enter` | 10px | Estado inicial de todo reveal |

### O reveal palavra a palavra

A assinatura do sistema, herdada do Ironwood e retemporizada. O título é dividido em um
`<span>` por palavra e cada um roda três animações em paralelo: opacidade de `0.001` para
`1`, `blur(10px)` para `blur(0)` e `translateY(14px)` para zero. 900ms, curva `soft`,
cascata de 62ms.

```html
<h1 class="reveal-words">
  <span style="--i:0">SEAM</span>
  <span style="--i:1">&amp;</span>
  <span style="--i:2">SLATE</span>
</h1>
```

```css
.reveal-words > span {
  display: inline-block;
  opacity: .001;
  filter: blur(var(--blur-enter));
  transform: translateY(14px);
  animation: word-in var(--dur-in) var(--ease-soft) both;
  animation-delay: calc(var(--delay-enter) + var(--i,0) * var(--stagger-word));
}
```

Roda **uma vez, na carga**. Os elementos vizinhos do herói — eyebrow, apoio, barra de
números — usam `.enter`, que é a mesma curva com cascata de 90ms.

### Revelação ao rolar

Quatro pré-estados, mesma duração e mesma curva, disparados por `IntersectionObserver`
com `rootMargin: 0px 0px -12% 0px`:

| Nome | Estado inicial |
|---|---|
| `rise-lg` | `translateY(40px) scale(.96)` |
| `rise-md` | `translateY(28px)` |
| `rise-sm` | `translateY(20px)` |
| `rise-left` | `translate(-26px, 26px)` |

Grade de cards usa cascata de 80ms. Cada elemento revela uma vez e sai do observador.

### Micro-interações

São quatro, e só quatro:

1. Seta do botão girando 45° no hover.
2. Card levantando 4px e trocando o filete.
3. Foto de projeto com zoom de 4,5% em 900ms no hover.
4. Pastilha da nav perseguindo o item sob o cursor, com mola.

Nada mais anima. É isso que separa um site caro de um site nervoso.

### Redução de movimento

`prefers-reduced-motion: reduce` zera todas as durações, o blur e a cascata no próprio
`tokens.css`, e a folha da página entrega tudo visível no primeiro quadro — inclusive o
zoom do herói e o marquee da faixa de confiança. Não é opcional: metade do público passa
dos 55 anos.

---

## Responsivo

| Padrão | Desktop | Celular |
|---|---|---|
| Herói | Linha: título à esquerda, apoio à direita | Coluna — nunca grade com célula vazia |
| Barra de números | 4 colunas em vidro | 2 colunas |
| Nav | Pill de 1200px com menu | Pill com hambúrguer + sheet lateral |
| Ação fixa | CTA na nav | Barra pill fixa embaixo: ligar e orçamento |
| Grade de serviços | 3 colunas | 1 coluna |
| Projetos | 3 colunas | 1 coluna |
| Formulário | 3 campos lado a lado | Empilhado, botão em `width: 100%` |
| Lista longa | Grade | Acordeão por categoria — nunca rolagem horizontal |
| Faixa de confiança | Marquee contínuo | Rolagem com scroll-snap |

### Pontos de quebra

| Token | Valor | O que acontece |
|---|---|---|
| `--bp-lg` | 1200px | Goteira cai para 40px |
| `--bp-md` | 1024px | Menu vira hambúrguer, herói vira coluna, grades caem para 2 |
| `--bp-sm` | 810px | Celular pleno: grades para 1, botão em largura total, barra fixa |
| — | 480px | Espaçamento compacto |

Alvo de toque mínimo de 48×48px (`--tap-min`), com 12px entre alvos vizinhos.

---

## Regras que não se negociam

1. **Não existe tema escuro automático.** Nenhum `@media (prefers-color-scheme: dark)`.
   A página abre clara em qualquer sistema operacional. O `[data-theme="dark"]` existe,
   mas só entra quando o visitante aperta o botão da nav.
2. **Superfície escura só existe como moldura de mídia**, com foto por baixo e scrim por
   cima. Seção de texto com fundo escuro chapado não entra. Hoje são três: herói,
   formulário e CTA final.
3. **Fundo de seção clara nunca é `#FFFFFF` chapado** — sempre com atmosfera: wash, grão
   ou seção alternada.
4. **Sete raios, e só sete.** Se um componente novo pede um sexto valor, o componente
   está errado.
5. **`#7BBDEC` nunca é cor de texto sobre claro.** Sobre o ground escuro ele pode, com
   8,58:1.
6. **Uma ação primária por tela.** Texto de botão é verbo + objeto.
7. **Rótulo de campo sempre visível acima do campo.** Placeholder não é rótulo.
8. **Link é sublinhado, não colorido.**
9. **Display sempre em caixa alta**, em peso 500. Nada de 700 ou 800 em lugar nenhum.
   A escala inteira vive em 400, 500 e 600.
10. **Foco de teclado sempre visível**, anel de 2px em `#7BBDEC` com offset de 3px.
11. **Sem ilustração, ícone desenhado, mascote ou elemento de desenho.** Vetado no
    briefing. Onde caberia um ícone, entra o chip mono de especificação ou a foto da obra.
    A seta do botão e os ícones de rede social são a exceção funcional.
12. **Sem cor vibrante ou saturada.** Cobre `#9A5F32` isolado, só para emergência de
    inverno — não é cor de marca.
13. **Quatro micro-interações no site inteiro.** Seta, card, foto e a pastilha da nav.
    O blur do topo e a inversão da barra não contam: são estado, não interação. O rastro
    do cursor também não: ele é uma camada global, não um comportamento de componente.
14. **`prefers-reduced-motion` zera a sequência inteira**, incluindo zoom e marquee.
15. **Vidro só sobre foto ou sobre ground**, e sempre com cor de fundo de reserva.
16. **A URL do CSS é versionada.** Sem `?v=`, o deploy sai pela metade.
17. **Nenhuma seção inventa tipografia.** Tamanho, peso, entrelinha e tracking saem dos
    tokens da escala. Componente novo reusa o token mais próximo — nunca um valor solto.

---

## Checklist de entrega

Rodar antes de fechar qualquer tela. Se um item falhar, a tela não sai.

**Qualidade visual**
- [ ] Fundo claro com atmosfera — nunca `#FFFFFF` chapado
- [ ] Superfície escura só em moldura de mídia, com foto e scrim
- [ ] Dominância 80/12/8, contando a moldura escura como navy
- [ ] Todo raio é um dos sete da escala
- [ ] Nenhuma sombra fora das cinco documentadas
- [ ] Uma ação primária por tela
- [ ] Display em caixa alta, em peso 500
- [ ] Nenhum `font-size`, `font-weight` ou `line-height` fora dos tokens da escala
- [ ] Parágrafo dentro de `--measure-body`; título dentro de `--measure-heading`
- [ ] Badge não repete a palavra do h2

**Formulário**
- [ ] Input, select e textarea com a mesma borda, raio e foco
- [ ] Rótulo visível acima do campo
- [ ] `option` de select legível em fundo sólido
- [ ] Erro em `--feedback-danger-on-ground` quando o campo está sobre vidro escuro
- [ ] Mensagem de erro diz como corrigir
- [ ] Honeypot presente e reCAPTCHA v3 invisível — nunca captcha de checkbox

**Responsivo**
- [ ] Herói vira coluna, sem célula vazia
- [ ] Toda grade colapsa para 1 coluna em 810px
- [ ] Lista longa vira acordeão, nunca rolagem horizontal
- [ ] Corpo permanece em 16px, nunca abaixo de 15px
- [ ] Alvo de toque de 48px, botão principal em largura total
- [ ] Barra fixa de ação não cobre o conteúdo do rodapé

**Acessibilidade**
- [ ] Texto em 4,5:1, controle em 3:1 (WCAG AA), medido sobre o fundo real
- [ ] Texto sobre vidro testado com o `backdrop-filter` desligado
- [ ] Tela conferida nos dois temas, claro e escuro
- [ ] Foco de teclado sempre visível
- [ ] HTML semântico: `nav`, `main`, `section`, `article`
- [ ] Texto alternativo em toda foto de obra
- [ ] `prefers-reduced-motion` zera a sequência

---

## Pendências

| Item | Impacto |
|---|---|
| **Logotipo em vetor (SVG/AI/EPS)** | Trava 8 das 10 peças de aplicação. Só existe PNG de 3240px, e ele veio com 60% de margem vazia, que precisou ser recortada à mão para a nav. Sem vetor, cada fornecedor redesenha por cima. Também não há favicon. |
| **Fotos dos donos e da máquina Englert** | O briefing marcou "fotos pessoais" e o maior diferencial da empresa não tem imagem própria. Hoje a seção da família usa uma foto de obra como reserva. |
| **Depoimentos reais** | Os três cards de review estão marcados como placeholder e o texto sai da API do Google. Nada de depoimento inventado no ar. |
| **Mapa de cobertura** | O SVG atual é esquemático. Trocar pelos contornos reais antes de publicar. |
| **`seam-and-slate.html`** | Os espécimes vivos ainda estão na linguagem da v0.4: raio de 4px, botão retangular, sem vidro. Refazer. |
| **`marca-em-campo.html`** | As peças físicas continuam válidas — placa e colete não têm `backdrop-filter` —, mas o raio das peças impressas precisa ser revisto contra a escala nova. |
| **`seam-and-slate.html` e `marca-em-campo.html`** | As duas peças ainda mostram Cabinet Grotesk, Manrope e IBM Plex Mono. Refazer na Inter. |
