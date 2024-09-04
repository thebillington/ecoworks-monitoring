import { withAuth } from 'next-auth/middleware';

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) =>
            req.nextUrl.pathname === '/' ||
            req.nextUrl.pathname === '/register' ||
            req.nextUrl.pathname === '/api/gsheets/register-user' ||
            !!token,
    }
});