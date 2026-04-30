export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    let cozeUrl;
    if (req.url.includes('/retrieve')) {
      cozeUrl = 'https://api.coze.cn/v3/chat/retrieve' + req.url.split('/retrieve')[1];
    } else if (req.url.includes('/message/list')) {
      cozeUrl = 'https://api.coze.cn/v3/chat/message/list' + req.url.split('/message/list')[1];
    } else {
      cozeUrl = 'https://api.coze.cn/v3/chat';
    }

    const fetchOptions = {
      method: req.method,
      headers: {
        'Authorization': 'Bearer pat_GuK6GuyxsIiDolDc0bKASy06uZQWOUYOpVxd1Rsic0iNfckNsA6atZmSePN5K6hT',
        'Content-Type': 'application/json'
      }
    };

    if (req.method === 'POST' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(cozeUrl, fetchOptions);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
