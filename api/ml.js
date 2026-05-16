export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { q, id } = req.query;

  try {
    let url;
    if (id) {
      url = `https://api.mercadolibre.com/items/${encodeURIComponent(id)}`;
    } else if (q) {
      url = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(q)}&limit=20`;
    } else {
      return res.status(400).json({ error: 'Parâmetro q ou id obrigatório' });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MLRadar/1.0)',
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro na API do Mercado Livre' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno', details: err.message });
  }
}
