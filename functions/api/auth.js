export async function onRequest({ request, env }) {
  const origin = new URL(request.url).origin;
  const state = crypto.randomUUID();
  const u = new URL('https://github.com/login/oauth/authorize');
  u.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  u.searchParams.set('redirect_uri', origin + '/api/callback');
  u.searchParams.set('scope', 'repo,user');
  u.searchParams.set('state', state);
  return new Response(null, { status: 302, headers: {
    Location: u.toString(),
    'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; Path=/; Max-Age=600; SameSite=Lax`
  }});
}
