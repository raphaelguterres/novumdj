const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('hero mantém copy, métricas e CTA esperados', () => {
  const html = read('outputs/index.html');

  assert.match(html, /MONTE SEU EVENTO/i);
  assert.match(html, /data-stat="total"/);
  assert.match(html, /SPOTIFY\s*\/\s*SOUNDCLOUD/);
  assert.match(html, /FAÇA SEU BAILE/i);
  assert.match(html, /MONTE SEU EVENTO/i);
});

test('captação continua direcionada ao WhatsApp correto', () => {
  const script = read('outputs/script.js');

  assert.match(script, /5551982171591/);
  assert.match(script, /https:\/\/wa\.me\//);
  assert.match(script, /fetch\('\/api\/stats'/);
});

test('rotas públicas preservam a arquitetura estática e as Functions', () => {
  const config = JSON.parse(read('vercel.json'));
  const rewrites = new Map(config.rewrites.map(({ source, destination }) => [source, destination]));

  assert.equal(rewrites.get('/'), '/outputs/index.html');
  assert.equal(rewrites.get('/styles.css'), '/outputs/styles.css');
  assert.equal(rewrites.get('/script.js'), '/outputs/script.js');
  assert.equal(rewrites.get('/assets/:path*'), '/outputs/assets/:path*');
});
