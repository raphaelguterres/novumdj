const SOUND_CLOUD_PROFILE = 'https://soundcloud.com/djnovum/tracks';
const SPOTIFY_PROFILE = 'https://open.spotify.com/artist/1F3gUK3swGl27lTlPuM3qD';
const CACHE_SECONDS = 60 * 60;
const FALLBACK = Object.freeze({
  soundcloud: { plays: 33632, tracks: 10 },
  spotify: { plays: 22951, tracks: 5 },
});

function sendJson(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', `public, max-age=60, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=86400`);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return res.end(JSON.stringify(body));
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/json',
      'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
      'User-Agent': 'Mozilla/5.0 (compatible; NOVUMStats/1.0; +https://soundcloud.com/djnovum)',
    },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) throw new Error(`Upstream respondeu ${response.status}`);
  return response.text();
}

function parseSoundCloudHydration(html) {
  const match = html.match(/window\.__sc_hydration\s*=\s*(\[.*?\]);<\/script>/s);
  if (!match) throw new Error('Hydration do SoundCloud não encontrada');

  const hydration = JSON.parse(match[1]);
  const apiClient = hydration.find((item) => item.hydratable === 'apiClient')?.data?.id;
  const artist = hydration.find((item) => item.hydratable === 'user' && item.data?.permalink === 'djnovum')?.data;

  if (!apiClient || !artist?.id) throw new Error('Perfil do SoundCloud incompleto');
  return { apiClient, artistId: artist.id };
}

async function getSoundCloudStats() {
  const profileHtml = await fetchText(SOUND_CLOUD_PROFILE);
  const { apiClient, artistId } = parseSoundCloudHydration(profileHtml);
  const endpoint = new URL(`https://api-v2.soundcloud.com/users/${artistId}/tracks`);
  endpoint.search = new URLSearchParams({
    client_id: apiClient,
    limit: '100',
    offset: '0',
    linked_partitioning: '1',
    app_locale: 'pt_BR',
  });

  const payload = JSON.parse(await fetchText(endpoint));
  const tracks = Array.isArray(payload.collection) ? payload.collection : [];
  const ownTracks = tracks.filter((track) => track.kind === 'track' && Number(track.user_id) === Number(artistId));
  const plays = ownTracks.reduce((total, track) => total + Math.max(0, Number(track.playback_count) || 0), 0);

  if (!ownTracks.length || !Number.isSafeInteger(plays)) throw new Error('Contagens do SoundCloud indisponíveis');
  return { plays, tracks: ownTracks.length, live: true };
}

function parseSpotifyPublicCounts(html) {
  const counts = [...html.matchAll(/["']playcount["']\s*:\s*["']?(\d+)["']?/gi)]
    .map((match) => Number(match[1]))
    .filter(Number.isSafeInteger);

  if (counts.length < FALLBACK.spotify.tracks) throw new Error('Contagens públicas do Spotify indisponíveis');
  const publicCounts = counts.slice(0, FALLBACK.spotify.tracks);
  return {
    plays: publicCounts.reduce((total, count) => total + count, 0),
    tracks: publicCounts.length,
    live: true,
  };
}

async function getSpotifyStats() {
  return parseSpotifyPublicCounts(await fetchText(SPOTIFY_PROFILE));
}

async function readPlatform(result, fallback) {
  if (result.status === 'fulfilled') return result.value;
  return { ...fallback, live: false };
}

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return sendJson(res, 204, {});
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return sendJson(res, 405, { error: 'Método não permitido.' });
  }

  const [soundcloudResult, spotifyResult] = await Promise.allSettled([
    getSoundCloudStats(),
    getSpotifyStats(),
  ]);
  const soundcloud = await readPlatform(soundcloudResult, FALLBACK.soundcloud);
  const spotify = await readPlatform(spotifyResult, FALLBACK.spotify);

  return sendJson(res, 200, {
    soundcloud,
    spotify,
    total: soundcloud.plays + spotify.plays,
    updatedAt: new Date().toISOString(),
    refreshAfter: CACHE_SECONDS,
  });
};
