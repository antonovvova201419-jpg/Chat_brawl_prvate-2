export default async (request) => {
  // Поддержка CORS (preflight)
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST only' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { nick, text } = await request.json();

    if (!nick || !text || typeof nick !== 'string' || typeof text !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid data' }), { status: 400 });
    }

    const cleanNick = nick.substring(0, 20).replace(/[<>"'&]/g, '');
    const cleanText = text.substring(0, 200).replace(/[<>"'&]/g, '');

    if (!cleanNick || !cleanText) {
      return new Response(JSON.stringify({ error: 'Invalid content' }), { status: 400 });
    }

    if (!globalThis.messages) globalThis.messages = [];
    globalThis.messages.push({ nick: cleanNick, text: cleanText });

    if (globalThis.messages.length > 50) {
      globalThis.messages = globalThis.messages.slice(-50);
    }

    return new Response(JSON.stringify({ status: 'ok' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};