export default async function handler(req, res) {
  // 配置跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 把所有请求都转发到正确的 Coze 接口
    const baseCozeUrl = 'https://api.coze.cn';
    // 把前端的 /api/coze/xxx 转换成 /v3/chat/xxx
    const cozePath = req.url.replace('/api/coze', '/v3/chat');
    const cozeUrl = baseCozeUrl + cozePath;

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
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
