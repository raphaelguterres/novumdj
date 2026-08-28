const test = require('node:test');
const assert = require('node:assert/strict');
const handler = require('../api/stats');

const originalFetch = global.fetch;

test.afterEach(() => {
  global.fetch = originalFetch;
});

function createResponse() {
  return {
    statusCode: 200,
    headers: new Map(),
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(key, value) {
      this.headers.set(key.toLowerCase(), value);
      return this;
    },
    end(body) {
      this.body = body ? JSON.parse(body) : null;
      return this;
    },
  };
}

function soundCloudProfile() {
  const hydration = [
    { hydratable: 'apiClient', data: { id: 'public-client' } },
    { hydratable: 'user', data: { id: 1397130156, permalink: 'djnovum' } },
  ];
  return `<script>window.__sc_hydration = ${JSON.stringify(hydration)};</script>`;
}

test('soma SoundCloud, Spotify e total geral', async () => {
  global.fetch = async (input) => {
    const url = String(input);
    if (url.includes('soundcloud.com/djnovum/tracks')) return new Response(soundCloudProfile());
    if (url.includes('api-v2.soundcloud.com')) {
      return Response.json({
        collection: [
          { kind: 'track', user_id: 1397130156, playback_count: 120 },
          { kind: 'track', user_id: 1397130156, playback_count: 80 },
        ],
      });
    }
    if (url.includes('open.spotify.com')) {
      return new Response('{"playcount":10,"playcount":20,"playcount":30,"playcount":40,"playcount":50}');
    }
    return new Response('not found', { status: 404 });
  };

  const response = createResponse();
  await handler({ method: 'GET' }, response);

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body.soundcloud, { plays: 200, tracks: 2, live: true });
  assert.deepEqual(response.body.spotify, { plays: 150, tracks: 5, live: true });
  assert.equal(response.body.total, 350);
  assert.equal(response.body.refreshAfter, 3600);
  assert.match(response.headers.get('cache-control'), /s-maxage=3600/);
});

test('preserva o último Spotify confirmado quando a página omite as contagens', async () => {
  global.fetch = async (input) => {
    const url = String(input);
    if (url.includes('soundcloud.com/djnovum/tracks')) return new Response(soundCloudProfile());
    if (url.includes('api-v2.soundcloud.com')) {
      return Response.json({ collection: [{ kind: 'track', user_id: 1397130156, playback_count: 500 }] });
    }
    if (url.includes('open.spotify.com')) return new Response('<html>sem contagens públicas</html>');
    return new Response('not found', { status: 404 });
  };

  const response = createResponse();
  await handler({ method: 'GET' }, response);

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body.soundcloud, { plays: 500, tracks: 1, live: true });
  assert.deepEqual(response.body.spotify, { plays: 22951, tracks: 5, live: false });
  assert.equal(response.body.total, 23451);
});

test('recusa métodos que não sejam GET ou OPTIONS', async () => {
  const response = createResponse();
  await handler({ method: 'POST' }, response);

  assert.equal(response.statusCode, 405);
  assert.equal(response.body.error, 'Método não permitido.');
  assert.equal(response.headers.get('allow'), 'GET, OPTIONS');
});
