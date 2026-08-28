/* ==========================================================================
   TopLine Pro Construction — Home
   Nav, sheet do celular, revelação ao rolar, faixa de confiança, carrossel de
   reviews, validação do formulário e popup de entrada.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav: sombra ao rolar, blur do topo e inversão por seção ----------
     A barra flutua sobre o conteúdo, então ela precisa saber o tom da seção
     que está passando por baixo. Seções escuras são marcadas no HTML com
     data-nav-tone="dark"; o resto é claro. No tema escuro tudo é escuro. */
  var nav = document.getElementById('nav');
  var topblur = document.getElementById('topblur');
  var toned = Array.prototype.slice.call(
    document.querySelectorAll('main > section, .footer, [data-nav-tone]')
  );
  var ticking = false;

  function toneUnderNav() {
    if (document.documentElement.getAttribute('data-theme') === 'dark') return 'dark';
    var probe = nav.getBoundingClientRect().bottom - 10;
    var tone = 'light';
    for (var i = 0; i < toned.length; i++) {
      var r = toned[i].getBoundingClientRect();
      if (r.top <= probe && r.bottom >= probe) {
        tone = toned[i].getAttribute('data-nav-tone') || 'light';
      }
    }
    return tone;
  }

  function syncNav() {
    var scrolled = window.scrollY > 24;
    nav.classList.toggle('is-stuck', scrolled);
    if (topblur) topblur.classList.toggle('is-on', scrolled);

    var light = toneUnderNav() === 'light';
    nav.classList.toggle('nav--light', light);
    if (topblur) topblur.classList.toggle('is-light', light);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      // libera a trava antes de rodar: se syncNav lançar, o scroll não fica
      // travado para sempre
      ticking = false;
      syncNav();
    });
  }

  syncNav();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  // requestAnimationFrame não roda em aba escondida: ao voltar, resincroniza
  // direto, sem esperar o próximo scroll.
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) syncNav();
  });

  /* ---- Pastilha do menu -------------------------------------------------
     Persegue o item sob o cursor com mola e volta ao item ativo quando o mouse
     sai do trilho. Largura e posição vêm do próprio link, então o desenho
     acompanha rótulo de qualquer tamanho. */
  var indicator = document.getElementById('navIndicator');
  var menu = document.querySelector('.nav__menu');
  if (indicator && menu) {
    var links = Array.prototype.slice.call(menu.querySelectorAll('.nav__link'));
    var home = menu.querySelector('.nav__link--feature') || links[0];
    var lit = null;

    function moveTo(link, animate) {
      if (!link) return;
      // offsetLeft é relativo ao <li>, que é position:relative — mede pelo rect
      // do próprio <ul>, que é o offsetParent do indicador.
      var wrapRect = menu.getBoundingClientRect();
      var rect = link.getBoundingClientRect();
      if (!animate) indicator.style.transition = 'none';
      indicator.style.width = rect.width + 'px';
      indicator.style.transform = 'translateX(' + (rect.left - wrapRect.left) + 'px)';
      indicator.classList.add('is-on');
      if (lit && lit !== link) lit.classList.remove('is-lit');
      link.classList.add('is-lit');
      lit = link;
      if (!animate) {
        // força o reflow antes de devolver a transição, senão o primeiro
        // movimento real sai sem mola
        void indicator.offsetWidth;
        indicator.style.transition = '';
      }
    }

    links.forEach(function (link) {
      link.addEventListener('mouseenter', function () { moveTo(link, true); });
      link.addEventListener('focus', function () { moveTo(link, true); });
    });

    menu.addEventListener('mouseleave', function () { moveTo(home, true); });
    menu.addEventListener('focusout', function () {
      if (!menu.contains(document.activeElement)) moveTo(home, true);
    });

    // posição inicial sem animar
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { moveTo(home, false); });
    } else {
      moveTo(home, false);
    }
    window.addEventListener('resize', function () { moveTo(lit || home, false); });
  }

  /* ---- Dropdown por teclado ------------------------------------------- */
  document.querySelectorAll('.nav__item').forEach(function (item) {
    var trigger = item.querySelector('[aria-haspopup="true"]');
    var menu = item.querySelector('.dropdown');
    if (!trigger || !menu) return;

    item.addEventListener('focusin', function () { trigger.setAttribute('aria-expanded', 'true'); });
    item.addEventListener('focusout', function () {
      if (!item.contains(document.activeElement)) trigger.setAttribute('aria-expanded', 'false');
    });
    item.addEventListener('mouseenter', function () { trigger.setAttribute('aria-expanded', 'true'); });
    item.addEventListener('mouseleave', function () { trigger.setAttribute('aria-expanded', 'false'); });
  });

  /* ---- Botão de tema ---------------------------------------------------
     Preferência explícita do visitante, gravada em localStorage. O padrão é
     claro e a preferência do sistema operacional é ignorada de propósito: o
     briefing marcou "Cores Claras" e deixou "Cores Escuras" desmarcada. */
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    var root = document.documentElement;

    function applyTheme(mode) {
      if (mode === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
      themeBtn.setAttribute('aria-checked', mode === 'dark' ? 'true' : 'false');
      themeBtn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', mode === 'dark' ? '#0C1B29' : '#16324A');
    }

    var stored = null;
    try { stored = localStorage.getItem('tlp-theme'); } catch (err) {}
    applyTheme(stored === 'dark' ? 'dark' : 'light');

    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('tlp-theme', next); } catch (err) {}
      if (typeof syncNav === 'function') syncNav();
    });
  }

  /* ---- Sheet do celular ------------------------------------------------ */
  var sheet = document.getElementById('sheet');
  var burger = document.querySelector('[data-sheet-open]');
  function openSheet() {
    sheet.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var first = sheet.querySelector('a, button');
    if (first) first.focus();
  }
  function closeSheet() {
    sheet.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    burger.focus();
  }
  if (burger) burger.addEventListener('click', openSheet);
  sheet.querySelectorAll('[data-sheet-close]').forEach(function (el) { el.addEventListener('click', closeSheet); });
  sheet.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeSheet); });

  /* ---- Revelação ao rolar --------------------------------------------- */
  var targets = document.querySelectorAll('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- Baralho de serviços ----------------------------------------------
     Mesma matemática do Card Carousel: cada card recebe x = (i - ativo) * gap,
     escala 1 no ativo e .86 nos laterais, opacidade .55 além do segundo vizinho
     e z-index decrescente pela distância. Clique, seta, teclado e arrasto
     trocam o ativo. */
  var deck = document.getElementById('deck');
  if (deck) {
    var stage = document.getElementById('deckStage');
    var cards = Array.prototype.slice.call(stage.querySelectorAll('.deckcard'));
    var dots = document.getElementById('deckDots');
    var active = Math.floor(cards.length / 2);
    var cardSize = 356;
    var gap = 171;

    function clamp(v, a, b) { return Math.min(Math.max(v, a), b); }

    function measure() {
      var w = stage.clientWidth || 1200;
      var h = stage.clientHeight || 640;
      /* O card é 3:4: a altura manda. Largura máxima = altura útil * 3/4. */
      var byHeight = h * 0.74 * 0.75;
      if (w < 640) {
        cardSize = clamp(Math.min(w * 0.72, byHeight), 200, w - 40);
        gap = cardSize * 0.88;
      } else if (w < 1024) {
        cardSize = clamp(Math.min(w * 0.36, byHeight), 240, 320);
        gap = cardSize * 0.48;
      } else {
        cardSize = clamp(Math.min(w * 0.27, byHeight), 280, 356);
        gap = cardSize * 0.48;
      }
      stage.style.setProperty('--card', Math.round(cardSize) + 'px');
    }

    function render() {
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var rel = i - active;
        var dist = Math.abs(rel);
        var isActive = rel === 0;
        card.style.transform = 'translateX(' + (rel * gap) + 'px) scale(' + (isActive ? 1 : 0.86) + ')';
        card.style.opacity = dist > 2 ? '0.72' : '1';
        /* Desfoque curto e progressivo: 1.4px no vizinho, teto em 3.6px. Acima
           disso a foto vira mancha e o baralho perde a leitura de profundidade. */
        card.style.setProperty('--blur', (isActive ? 0 : Math.min(1.4 * dist, 3.6)).toFixed(2) + 'px');
        card.style.setProperty('--sat', (isActive ? 1 : Math.max(1 - 0.07 * dist, 0.82)).toFixed(2));
        card.style.zIndex = isActive ? 50 : 50 - dist;
        card.classList.toggle('is-active', isActive);
        card.setAttribute('tabindex', isActive ? '-1' : '0');
        var cta = card.querySelector('.deckcard__cta');
        if (cta) cta.setAttribute('tabindex', isActive ? '0' : '-1');
      }
      if (dots) {
        Array.prototype.forEach.call(dots.children, function (d, i) {
          d.setAttribute('aria-current', i === active ? 'true' : 'false');
        });
      }
    }

    function go(i) {
      active = clamp(i, 0, cards.length - 1);
      render();
    }
    function prev() { go(active === 0 ? cards.length - 1 : active - 1); }
    function next() { go(active === cards.length - 1 ? 0 : active + 1); }

    cards.forEach(function (card, i) {
      card.addEventListener('click', function (e) {
        if (i === active) return;
        if (e.target.closest('.deckcard__cta')) return;
        go(i);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(i); }
      });
    });

    var prevBtn = deck.querySelector('[data-deck-prev]');
    var nextBtn = deck.querySelector('[data-deck-next]');
    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    if (dots) {
      for (var d = 0; d < cards.length; d++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Service ' + (d + 1));
        dot.addEventListener('click', (function (n) { return function () { go(n); }; })(d));
        dots.appendChild(dot);
      }
    }

    // arrasto: limiar de 56px no desktop, 36 no celular
    var dragX = null;
    stage.addEventListener('pointerdown', function (e) { dragX = e.clientX; });
    stage.addEventListener('pointerup', function (e) {
      if (dragX === null) return;
      var delta = e.clientX - dragX;
      var threshold = stage.clientWidth < 640 ? 36 : 56;
      if (delta > threshold) prev();
      else if (delta < -threshold) next();
      dragX = null;
    });
    stage.addEventListener('pointercancel', function () { dragX = null; });

    stage.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    });

    measure();
    render();
    window.addEventListener('resize', function () { measure(); render(); });
  }

  /* ---- Contador dos números do herói ------------------------------------
     Mesma matemática do componente da referência: easeOutExpo sobre o tempo
     decorrido, valor formatado a cada quadro. Dispara quando a barra entra na
     tela e roda uma vez só. */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var COUNT_DUR = 1.6;   // segundos

    function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

    function runCount(el) {
      var end = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var start = performance.now();

      function step(now) {
        var t = Math.min((now - start) / (COUNT_DUR * 1000), 1);
        var value = easeOutExpo(t) * end;
        // O sufixo sai do escopo do tabular-nums: na Inter a figura tabular
        // alarga o hífen e "25-Year" ganha um vão no meio.
        el.innerHTML = value.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }) + '<span class="stats__suffix">' + suffix + '</span>';
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (reduced || !('IntersectionObserver' in window)) {
      // sem movimento: o valor final já está no HTML, não há o que fazer
    } else {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countObserver.unobserve(entry.target);
          runCount(entry.target);
        });
      }, { threshold: 0.4 });
      Array.prototype.forEach.call(counters, function (el) { countObserver.observe(el); });
    }
  }

  /* ---- Faixa de confiança: duplica a trilha para o loop ---------------- */
  var track = document.getElementById('trustTrack');
  if (track && !reduced && window.matchMedia('(min-width: 811px)').matches) {
    track.innerHTML += track.innerHTML;
  }

  /* ---- Carrossel de reviews ------------------------------------------- */
  var rTrack = document.getElementById('reviewsTrack');
  var rDots = document.getElementById('reviewsDots');
  if (rTrack && rDots) {
    var slides = rTrack.children.length;
    var perView = function () { return window.matchMedia('(min-width: 981px)').matches ? 3 : 1; };
    var index = 0;

    function pages() { return Math.max(1, slides - perView() + 1); }

    function render() {
      var step = 100 / perView();
      rTrack.style.transform = 'translateX(calc(' + (-index * step) + '% - ' + index + ' * var(--gutter)))';
      Array.prototype.forEach.call(rDots.children, function (dot, i) {
        dot.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    }

    function buildDots() {
      rDots.innerHTML = '';
      for (var i = 0; i < pages(); i++) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Review ' + (i + 1));
        b.addEventListener('click', (function (n) { return function () { index = n; render(); }; })(i));
        rDots.appendChild(b);
      }
      if (index > pages() - 1) index = 0;
      render();
    }

    buildDots();
    window.addEventListener('resize', buildDots);
  }

  /* ---- Formulário: validação que diz como corrigir --------------------- */
  var form = document.getElementById('estimateForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      // Honeypot: bot preencheu o campo escondido, descarta em silêncio.
      if (form.company.value !== '') { e.preventDefault(); return; }

      var firstInvalid = null;
      form.querySelectorAll('[required]').forEach(function (field) {
        var wrap = field.closest('.field');
        var ok = field.checkValidity() && field.value.trim() !== '';
        wrap.classList.toggle('is-invalid', !ok);
        field.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (!ok && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        e.preventDefault();
        firstInvalid.focus();
      }
      // reCAPTCHA v3 invisível entra aqui, antes do envio.
    });

    form.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('input', function () {
        if (field.checkValidity() && field.value.trim() !== '') {
          field.closest('.field').classList.remove('is-invalid');
          field.setAttribute('aria-invalid', 'false');
        }
      });
    });
  }

  /* ---- Popup de entrada ------------------------------------------------
     5s no desktop, 15s no celular (o Google penaliza intersticial intrusivo),
     nunca em /thank-you, uma vez por sessão. */
  var promo = document.getElementById('promo');
  if (promo && !/\/thank-you/.test(window.location.pathname)) {
    var seen;
    try { seen = sessionStorage.getItem('tlp-promo-seen'); } catch (err) { seen = null; }

    if (!seen) {
      var isMobile = window.matchMedia('(max-width: 810px)').matches;
      var lastFocus = null;

      var timer = window.setTimeout(function () {
        lastFocus = document.activeElement;
        promo.classList.add('is-open');
        try { sessionStorage.setItem('tlp-promo-seen', '1'); } catch (err) {}
        var close = promo.querySelector('.promo__close');
        if (close) close.focus();
      }, isMobile ? 15000 : 5000);

      var closePromo = function () {
        window.clearTimeout(timer);
        promo.classList.remove('is-open');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      };

      promo.querySelectorAll('[data-promo-close]').forEach(function (el) {
        el.addEventListener('click', closePromo);
      });

      // Leva ao formulário com o campo oculto promo=500OFF preenchido.
      var claim = promo.querySelector('[data-promo-claim]');
      if (claim) {
        claim.addEventListener('click', function () {
          var hidden = document.getElementById('promoField');
          if (hidden) hidden.value = '500OFF';
          closePromo();
        });
      }

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && promo.classList.contains('is-open')) closePromo();
      });
    }
  }

  /* ---- Escape fecha o sheet ------------------------------------------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sheet.classList.contains('is-open')) closeSheet();
  });

  /* ---- Sanfona de projetos ----------------------------------------------
     Painéis só de apresentação: nada de link, um aberto por vez. No ponteiro a
     abertura segue o mouse; no toque, o toque abre. Teclado abre no foco e
     também em Enter/Espaço, já que o painel se anuncia como botão. */
  var accord = document.getElementById('projectsAccord');
  if (accord) {
    var panels = Array.prototype.slice.call(accord.querySelectorAll('.accord__panel'));
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    function open(panel) {
      for (var i = 0; i < panels.length; i++) {
        var on = panels[i] === panel;
        panels[i].classList.toggle('is-open', on);
        panels[i].setAttribute('aria-expanded', on ? 'true' : 'false');
      }
    }

    panels.forEach(function (panel) {
      if (canHover) {
        panel.addEventListener('mouseenter', function () { open(panel); });
      }
      panel.addEventListener('focus', function () { open(panel); });
      panel.addEventListener('click', function () { open(panel); });
      panel.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(panel); }
      });
    });
  }

  /* ---- Texto que preenche no scroll --------------------------------------
     Cada palavra vira um span e acende dentro da sua fatia do progresso. O
     progresso é a travessia do parágrafo por uma faixa da tela: começa quando
     o topo entra a 78% da altura e fecha quando a base passa de 34%. */
  var revealText = document.querySelectorAll('[data-reveal-text]');
  if (revealText.length && !reduced) {
    var blocks = [];
    Array.prototype.forEach.call(revealText, function (el) {
      var words = el.textContent.split(/(\s+)/);
      el.textContent = '';
      var spans = [];
      words.forEach(function (w) {
        if (!w.trim()) { el.appendChild(document.createTextNode(w)); return; }
        var span = document.createElement('span');
        span.className = 'rt-word';
        span.textContent = w;
        el.appendChild(span);
        spans.push(span);
      });
      blocks.push({ el: el, words: spans });
      el.setAttribute('data-reveal-text', 'on');
    });

    /* Fatia por palavra com sobreposição: a anterior ainda está subindo quando
       a seguinte começa, senão a leitura fica em staccato. */
    var OVERLAP = 2.4;
    function paint() {
      var vh = window.innerHeight || 800;
      for (var b = 0; b < blocks.length; b++) {
        var rect = blocks[b].el.getBoundingClientRect();
        var startY = vh * 0.78;
        var endY = vh * 0.34;
        var span = (rect.height + (startY - endY)) || 1;
        var p = (startY - rect.top) / span;
        p = p < 0 ? 0 : (p > 1 ? 1 : p);
        var words = blocks[b].words;
        var n = words.length;
        for (var i = 0; i < n; i++) {
          var w = (p * (n + OVERLAP) - i) / OVERLAP;
          words[i].style.setProperty('--w', String(w < 0 ? 0 : (w > 1 ? 1 : w)));
        }
      }
    }

    var queued = false;
    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; paint(); });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    paint();
  }

  /* ---- Rastro de fotos no cursor ------------------------------------------
     A cada trecho percorrido pelo ponteiro dentro da dobra, uma foto entra na
     posição do cursor e some em sequência. Sem biblioteca: a animação é uma
     keyframe CSS e o JS só posiciona e recicla um punhado de nós. Fica fora
     de toque e de quem pediu menos movimento. */
  var trail = document.querySelector('.closer__trail');
  if (trail && !reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var shots = [
      'assets/img/project-01.jpeg', 'assets/img/project-02.jpeg',
      'assets/img/project-03.jpeg', 'assets/img/project-04.jpeg',
      'assets/img/project-05.jpeg', 'assets/img/project-06.jpeg'
    ];
    var POOL = 9;          /* nós reciclados: o rastro nunca cresce sem limite */
    var STEP = 120;        /* distância entre uma foto e a próxima, em px */
    var LIFE = 980;        /* precisa bater com a duração da keyframe */
    var nodes = [];
    var next = 0;
    var shot = 0;
    var lastX = null, lastY = null, travelled = 0;

    for (var n = 0; n < POOL; n++) {
      var img = document.createElement('img');
      img.className = 'trail-shot';
      img.alt = '';
      img.decoding = 'async';
      img.style.animation = 'none';
      trail.appendChild(img);
      nodes.push(img);
    }

    function drop(x, y) {
      var node = nodes[next];
      next = (next + 1) % POOL;
      node.src = shots[shot];
      shot = (shot + 1) % shots.length;
      node.style.left = x + 'px';
      node.style.top = y + 'px';
      node.style.setProperty('--rot', (Math.random() * 10 - 5).toFixed(2) + 'deg');
      /* Reinicia a keyframe no nó reciclado: sem o reflow ela não roda de novo. */
      node.style.animation = 'none';
      void node.offsetWidth;
      node.style.animation = 'trail-shot ' + LIFE + 'ms var(--ease-out) forwards';
    }

    /* O ouvinte é do documento: o palco sangra além do bloco, então o que
       delimita o rastro é o retângulo do palco, não o elemento sob o cursor. */
    document.addEventListener('mousemove', function (e) {
      var rect = trail.getBoundingClientRect();
      var inside = e.clientX >= rect.left && e.clientX <= rect.right &&
                   e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) { lastX = null; lastY = null; travelled = 0; return; }
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      if (lastX === null) { lastX = x; lastY = y; drop(x, y); return; }
      travelled += Math.hypot(x - lastX, y - lastY);
      lastX = x; lastY = y;
      if (travelled < STEP) return;
      travelled = 0;
      drop(x, y);
    }, { passive: true });
  }

  /* ---- Ano do rodapé --------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
