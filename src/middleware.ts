import { withAuth } from 'next-auth/middleware'

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) =>
            req.nextUrl.pathname === '/' ||
            req.nextUrl.pathname.slice(0,10) === '/register/' ||
            req.nextUrl.pathname.slice(0,11) === '/documents/' ||
            req.nextUrl.pathname === '/join' ||
            !!token,
    }
})