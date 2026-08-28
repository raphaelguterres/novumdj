const email = 'booking@novumdj.com';

function sendJson(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return res.end(JSON.stringify(body));
}

module.exports = (req, res) => {
  if (req.method === 'OPTIONS') return sendJson(res, 204, {});
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return sendJson(res, 405, { error: 'Método não permitido.' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const event = typeof body.event === 'string' ? body.event.trim() : '';
  const date = typeof body.date === 'string' ? body.date.trim() : '';

  if (!name || !event || !date) {
    return sendJson(res, 400, {
      error: 'Informe nome, evento e data.',
      fields: ['name', 'event', 'date'],
    });
  }

  const subject = encodeURIComponent(`Booking NOVUM — ${event}`);
  const message = encodeURIComponent(`Nome: ${name}\nEvento: ${event}\nData: ${date}`);
  return sendJson(res, 200, {
    ok: true,
    message: 'Pedido validado. Continue pelo e-mail para concluir o contato.',
    contactUrl: `mailto:${email}?subject=${subject}&body=${message}`,
  });
};
