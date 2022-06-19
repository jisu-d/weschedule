import cookie from '@fastify/cookie';
import fastify from 'fastify';
const app = fastify();
app.register(cookie, {
    secret: "my-secret",
    parseOptions: {} // options for parsing cookies
});
app.get('/', (req, reply) => {
    const result = reply.unsignCookie(req.cookies.myCookie);
    if (result.valid && result.renew) {
        // Setting the same cookie again, this time plugin will sign it with a new key
        reply.setCookie('myCookie', result.value, {
            domain: 'http://localhost:4000/page/',
            path: '/',
            signed: true
        });
    }
});
//# sourceMappingURL=cookie.js.map