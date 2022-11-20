import { front } from "./setting.js";
import fs from 'fs/promises';
import path from 'path';
import mime from './mime.json' assert { type: "json" };
export const route = async (fastify, option) => {
    const getIndex = async (req, rep) => {
        rep.type('text/html');
        return await fs.readFile(path.resolve(front, 'test1/dist/index.html'));
    };
    fastify.get('/', getIndex);
    fastify.get('/assets/*', async (req, rep) => {
        const _pathname = req.url.match(/(.+?)(\?|$)/)[1];
        const pathname = _pathname.replace(option.prefix, '');
        try {
            const dPath = path.resolve(front, `test1/dist/${pathname}`);
            const lstat = await fs.lstat(dPath);
            if (lstat.isDirectory()) {
                throw Error('directory');
            }
            const file = await fs.readFile(dPath);
            const type = path.extname(dPath).slice(1);
            if (mime[type]) {
                rep.type(mime[type]);
            }
            else {
                rep.type('application/octet-stream');
            }
            return file;
        }
        catch (err) {
            return await getIndex(req, rep);
        }
    });
    fastify.get('/*', async (req, rep) => {
        return '주소가 잘못 되었음';
    });
};
//# sourceMappingURL=frontRoute.js.map