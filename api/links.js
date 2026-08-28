const links = {
  instagram: 'https://www.instagram.com/novumdj/',
  spotify: 'https://open.spotify.com/artist/1F3gUK3swGl27lTlPuM3qD',
  soundcloud: 'https://soundcloud.com/djnovum',
  booking: 'mailto:booking@novumdj.com',
};

function sendJson(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return res.end(JSON.stringify(body));
}

module.exports = (req, res) => {
  if (req.method === 'OPTIONS') return sendJson(res, 204, {});
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return sendJson(res, 405, { error: 'Método não permitido.' });
  }

  return sendJson(res, 200, {
    artist: 'NOVUM',
    city: 'São Paulo',
    links,
  });
};
