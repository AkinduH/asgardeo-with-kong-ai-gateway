import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { orgName, clientId, codeChallenge } = await request.json();

    if (!orgName || !clientId || !codeChallenge) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Build the Asgardeo authorization URL with PKCE
    const baseUrl = `https://api.asgardeo.io/t/${orgName}`;
    const redirectUri = process.env.REDIRECT_URI || 'http://localhost:3000';
    const scope = process.env.SCOPE || 'openid profile';

    const authUrl = new URL(`${baseUrl}/oauth2/authorize`);
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('code_challenge', codeChallenge);
    authUrl.searchParams.append('code_challenge_method', 'S256');

    return NextResponse.json({
      success: true,
      authUrl: authUrl.toString(),
    });
  } catch (error) {
    console.error('Error creating auth URL:', error);
    return NextResponse.json(
      { error: 'Failed to create authentication URL' },
      { status: 500 }
    );
  }
}
