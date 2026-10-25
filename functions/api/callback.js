export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = (request.headers.get('Cookie') || '').match(/oauth_state=([^;]+)/);
  let status = 'error', content = { message: 'Login gagal' };
  if (code && state && cookie && cookie[1] === state) {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code })
    });
    const t = await r.json();
    if (t.access_token) { status = 'success'; content = { token: t.access_token, provider: 'github' }; }
    else content = { message: t.error_description || 'Token tidak diterima' };
  }
  const msg = `authorization:github:${status}:${JSON.stringify(content)}`;
  const html = `<!doctype html><script>(function(){
function r(e){window.opener.postMessage(${JSON.stringify(msg)},e.origin);window.removeEventListener('message',r,false);}
window.addEventListener('message',r,false);window.opener.postMessage('authorizing:github','*');})();</script>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Set-Cookie': 'oauth_state=; Max-Age=0; Path=/' } });
}
