export default async (req, res) => {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'GET only' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const messages = globalThis.messages || [];
  return new Response(JSON.stringify(messages), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};