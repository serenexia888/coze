export default async function handler(req, res) {
  // 配置跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const baseCozeUrl = 'https://api.coze.cn/v3/chat';
    const url = new URL(req.url, 'http://localhost');
    const pathname = url.pathname;
    const query = url.searchParams.toString();

    let targetUrl;
    if (pathname.includes('/retrieve')) {
      targetUrl = `https://api.coze.cn/v3/chat/retrieve?${query}`;
    } else if (pathname.includes('/message/list')) {
      targetUrl = `https://api.coze.cn/v3/chat/message/list?${query}`;
    } else {
      // 默认转发到创建对话接口
      targetUrl = baseCozeUrl;
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

    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
