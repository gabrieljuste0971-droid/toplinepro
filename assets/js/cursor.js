/* ==========================================================================
   TopLine Pro Construction — Cursor Dot Trail
   Porte do componente Pixelthrone. A física é a mesma do original:
   a cada quadro a velocidade recebe (alvo - posição) * spring, é multiplicada
   pela fricção e integra na posição. O rastro é uma fila de pontos com idade,
   descartados depois de --trail-duration.

   Não roda em dispositivo de toque nem com prefers-reduced-motion. O cursor
   nativo continua visível: o público da TopLine tem 45 a 65 anos e trocar o
   ponteiro do sistema por um ponto desenhado custa mais do que entrega.
   ========================================================================== */
(function () {
  'use strict';

  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || still) return;

  var CONFIG = {
    size: 9,             // diâmetro do ponto em repouso
    hoverSize: 40,       // diâmetro do anel sobre link e botão
    borderWidth: 1.5,    // espessura do anel
    spring: 0.18,        // quanto da distância vira velocidade por quadro
    friction: 0.72,      // quanto da velocidade sobrevive ao quadro seguinte
    trailDuration: 340,  // ms de vida de cada ponto do rastro
    transitionSpeed: 0.2 // lerp de raio e opacidade
  };

  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100vw;height:100vh;display:block;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var target = { x: 0, y: 0 };
  var pos = { x: 0, y: 0 };
  var vel = { x: 0, y: 0 };
  var trail = [];
  var radius = CONFIG.size / 2;
  var fillA = 1;
  var ringA = 0;
  var last = performance.now();
  var raf = null;
  var awake = false;

  function resize() {
    var dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!pos.x && !pos.y) {
      pos.x = target.x = window.innerWidth / 2;
      pos.y = target.y = window.innerHeight / 2;
    }
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  /* A cor sai do tom da seção sob o cursor, a mesma marcação que a navegação
     usa: data-nav-tone="dark". No tema escuro tudo é escuro. */
  function inkAt(el) {
    if (document.documentElement.getAttribute('data-theme') === 'dark') return '255,255,255';
    var dark = el && el.closest && el.closest('[data-nav-tone="dark"]');
    return dark ? '255,255,255' : '22,50,74';
  }

  function frame() {
    var now = performance.now();
    var dt = Math.min(now - last, 33);
    last = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    vel.x += (target.x - pos.x) * CONFIG.spring;
    vel.y += (target.y - pos.y) * CONFIG.spring;
    vel.x *= CONFIG.friction;
    vel.y *= CONFIG.friction;
    pos.x += vel.x;
    pos.y += vel.y;

    trail.push({ x: pos.x, y: pos.y, age: 0 });
    for (var i = 0; i < trail.length; i++) trail[i].age += dt;
    trail = trail.filter(function (p) { return p.age < CONFIG.trailDuration; });

    var under = document.elementFromPoint(target.x, target.y);
    var ink = inkAt(under);
    var interactive = !!(under && under.closest &&
      under.closest('a, button, [role~="button"], input, select, textarea, summary'));

    var wanted = interactive ? CONFIG.hoverSize / 2 : CONFIG.size / 2;
    radius = lerp(radius, wanted, CONFIG.transitionSpeed);
    fillA = lerp(fillA, interactive ? 0 : 1, CONFIG.transitionSpeed);
    ringA = lerp(ringA, interactive ? 1 : 0, CONFIG.transitionSpeed);

    // rastro: cada ponto encolhe e apaga junto com a idade
    for (var j = 0; j < trail.length; j++) {
      var p = trail[j];
      var life = 1 - p.age / CONFIG.trailDuration;
      if (life <= 0) continue;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.4, radius * life * 0.7), 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + ink + ',' + (life * 0.28 * (1 - ringA)).toFixed(3) + ')';
      ctx.fill();
    }

    // cabeça: ponto cheio em repouso, anel sobre elemento interativo
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    if (fillA > 0.01) {
      ctx.fillStyle = 'rgba(' + ink + ',' + fillA.toFixed(3) + ')';
      ctx.fill();
    }
    if (ringA > 0.01) {
      ctx.strokeStyle = 'rgba(' + ink + ',' + ringA.toFixed(3) + ')';
      ctx.lineWidth = CONFIG.borderWidth;
      ctx.stroke();
    }

    raf = requestAnimationFrame(frame);
  }

  function wake() {
    if (awake) return;
    awake = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function sleep() {
    awake = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trail.length = 0;
  }

  window.addEventListener('mousemove', function (e) {
    target.x = e.clientX;
    target.y = e.clientY;
    wake();
  }, { passive: true });

  window.addEventListener('resize', resize);
  document.addEventListener('mouseleave', sleep);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) sleep();
  });

  resize();
})();
