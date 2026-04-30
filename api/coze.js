export default async function handler(req, res) {
  // 配置跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 1. 处理 POST /api/coze（创建对话）
    if (req.method === 'POST') {
      const cozeUrl = 'https://api.coze.cn/v3/chat';
      const response = await fetch(cozeUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer pat_GuK6GuyxsIiDolDc0bKASy06uZQWOUYOpVxd1Rsic0iNfckNsA6atZmSePN5K6hT',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    // 2. 处理 GET /api/coze（获取对话结果）
    if (req.method === 'GET') {
      const { chat_id, conversation_id } = req.query;
      const cozeUrl = `https://api.coze.cn/v3/chat/retrieve?chat_id=${chat_id}&conversation_id=${conversation_id}`;
      const response = await fetch(cozeUrl, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer pat_GuK6GuyxsIiDolDc0bKASy06uZQWOUYOpVxd1Rsic0iNfckNsA6atZmSePN5K6hT',
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
