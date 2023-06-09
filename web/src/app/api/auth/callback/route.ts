import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  try {
    const code = searchParams.get('code')

    const redirectTo = request.cookies.get('redirectTo')?.value

    const registerResponse = await api.post('/register', {
      code,
    })

    const { token } = registerResponse.data

    const redirectURL = redirectTo ?? new URL('/', request.url)

    const cookieExpiresInSeconds = 60 * 60 * 24 * 30

    if (!token) {
      return NextResponse.next()
    }

    return NextResponse.redirect(redirectURL, {
      headers: {
        'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
      },
    })
  } catch (error) {
    console.log('🚀 ~ file: route.ts:28 ~ GET ~ error:', error)
  }
}
