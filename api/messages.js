export default async (request) => {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'GET only' }), { status: 405 });
  }

  const messages = global.messages || [];
  return new Response(JSON.stringify(messages), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
