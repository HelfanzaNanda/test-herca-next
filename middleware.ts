import { NextRequest, NextResponse } from 'next/server';
import { getJwtToken, isLogin } from './lib/authentication';
// var cookie = require("@boiseitguru/cookie-cutter");

const adminPage = (pathname: string) => {
    const paths = [
        '/',
        '/users',
        '/sales',
        '/revenue',

        // '/products',
    ];
    return paths.includes(pathname);
}
const customerPage = (pathname: string) => {
    const paths = [
        '/',
        '/sales',
        '/my-credit',
        '/credit',
    ];
    return paths.includes(pathname);
}

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('_r')?.value;
    
    const isLoggedIn = await isLogin();
    // const token = await getJwtToken();
    // const token = response.cookies.get("_r");

    // const token = cookie.get("_r");
    
    const { pathname } = req.nextUrl;
    

    console.log('isLoggedIn : ', isLoggedIn);
    console.log('token : ', token);
    console.log('pathname : ', pathname);
    

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    
    const role  = req.cookies.get('role');
    // console.log('ROLE : ', role);
    
    // if (pathname == '/login') {
    //     return NextResponse.redirect(new URL('/', req.url));
    // }
    if (role?.value == 'ADMIN' && !adminPage(pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    if (role?.value == 'CUSTOMER' && !customerPage(pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/sales', '/users']
};