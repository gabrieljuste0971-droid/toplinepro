// Concatena, sem alterar uma linha, os stylesheets que o site realmente carrega
// (ver <link> em index.html) num único arquivo que o design-sync consome como
// cfg.cssEntry. A fonte é remota (Google Fonts), então entra como @import no
// topo — @import só é válido antes de qualquer regra.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = join(ROOT, '.design-sync', 'build', 'ds-styles.css');

const FONT_IMPORT =
  '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap");';

const PARTS = [
  'design-system/tokens.css',
  'assets/css/home.css',
];

const chunks = [
  '/* Gerado por scripts/ds-css-bundle.mjs — não editar à mão.',
  '   Concatenação literal dos stylesheets que index.html carrega. */',
  FONT_IMPORT,
  '',
];

for (const rel of PARTS) {
  chunks.push(`/* ===== ${rel} ===== */`);
  chunks.push(readFileSync(join(ROOT, rel), 'utf8').replace(/@import[^;]*;/g, (m) => `/* removido (movido para o topo): ${m} */`));
  chunks.push('');
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, chunks.join('\n'));
console.error(`ds-css-bundle: ${PARTS.length} arquivos -> ${OUT}`);
