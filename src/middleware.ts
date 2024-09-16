import { withAuth } from 'next-auth/middleware'

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) =>
            req.nextUrl.pathname === '/' ||
            req.nextUrl.pathname.slice(0,9) === '/register' ||
            req.nextUrl.pathname === '/join' ||
            !!token,
    }
})