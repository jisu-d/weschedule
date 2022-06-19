import iconv from 'iconv-lite';
import { Socket } from 'net';
import { getscNum } from './server.js';
const req = (str) => `GET ${str} HTTP/1.1
Host: comci.kr:4082
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7`;
export const fetchNet = (pathname) => new Promise(res => {
    const client = new Socket();
    const chunks = [];
    client.connect(4082, 'comci.kr', () => {
        client.write(req(pathname).replaceAll('\n', '\r\n'));
    });
    client.on('data', serverData => {
        // console.log(`[client] received data from server:`);
        chunks.push(serverData);
        //console.log(serverData)
    });
    client.on('error', err => {
        console.error(err);
    });
    client.on('end', async () => {
        const buf = Buffer.concat(chunks);
        if (buf.length < 10) {
            await getscNum();
        }
        const utf = iconv.decode(buf, 'utf8');
        const euc = iconv.decode(buf, 'euc-kr');
        res({ utf, euc });
    });
});
//# sourceMappingURL=fetch.js.map