export default async (request) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST only' }), { status: 405 });
  }

  try {
    const { nick, text } = await request.json();
    if (!nick || !text) {
      return new Response(JSON.stringify({ error: 'nick and text required' }), { status: 400 });
    }

    // Простое хранилище (in-memory)
    if (!global.messages) global.messages = [];
    global.messages.push({ nick: String(nick), text: String(text) });

    if (global.messages.length > 100) {
      global.messages = global.messages.slice(-100);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
