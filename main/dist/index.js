import Fastify from "fastify";
import { getComciganData, fetchCookInfo, schoolListFetch, checkSchool } from './server.js';
import { route } from "./frontRoute.js";
import fastifyCors from '@fastify/cors';
const fastify = Fastify({
//logger:true
});
fastify.register(fastifyCors, instance => {
    return (req, callback) => {
        let corsOptions = { origin: false };
        const origin = req.headers.origin;
        // do not include CORS headers for requests from localhost
        const hostname = new URL(origin).hostname;
        console.log(hostname);
        if (hostname === "jisu-d.github.io") {
            corsOptions.origin = true;
        }
        callback(null, corsOptions); // callback expects two parameters: error and options
    };
});
fastify.register(route, { prefix: '/' }); //이거 슈밤바/f/main 해야함 /* 모든것
fastify.get('/schoolList', async (req, rep) => {
    let d;
    if (req.query.school) {
        d = await schoolListFetch(req.query.school);
    }
    else {
        d = '해당 데이터가 존재하지 않음.';
    }
    return d['학교검색'];
});
fastify.get('/cookInfo', async (req, rep) => {
    const queryObj = req.query;
    let d;
    if (queryObj.school && queryObj.getnum) {
        d = (await fetchCookInfo(queryObj.school, queryObj.getnum)).mealServiceDietInfo[1].row;
    }
    else {
        d = '해당 데이터가 존재하지 않음.';
    }
    return d;
});
fastify.get('/comciganData', async (req, rep) => {
    const queryObj = req.query;
    let d;
    if (queryObj.school && queryObj.Year && queryObj.class && queryObj.zeroOne) {
        d = await getComciganData(queryObj.school, queryObj.Year, queryObj.class, queryObj.zeroOne);
    }
    else {
        d = '해당 데이터가 존재하지 않음.';
    }
    return d;
});
fastify.get('/checkSchool', async (req, rep) => {
    const queryObj = req.query;
    let d;
    if (queryObj.school && queryObj.Year && queryObj.class) {
        d = await checkSchool(queryObj.school, queryObj.Year, queryObj.class);
    }
    else {
        d = '해당 데이터가 존재하지 않음.';
    }
    return d;
});
fastify.listen(3000, '0.0.0.0', () => {
    console.log('server listening...');
});
//# sourceMappingURL=index.js.map