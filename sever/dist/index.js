import Fastify from "fastify";
import { getComciganData, fetchCookInfo, schoolListFetch, checkSchool, fetchSchoolScheduleDday, fetchSchoolScheduleAll } from './server.js';
import { route } from "./frontRoute.js";
import fastifyCors from '@fastify/cors';
const fastify = Fastify({
    logger: true
});
await fastify.register(fastifyCors, {
    //origin:"https://weschedule.kr"dfghm
    origin: "/*"
});
fastify.register(route, { prefix: '/' }); //이거 슈밤바/f/main 해야함 /* 모든것
// type Sky = {
//     x: number,
//     y: number,
// }
const notDataMsg = '해당 데이터가 존재하지 않음.';
fastify.get('/schoolList', async (req, rep) => {
    let d;
    if (req.query.school) {
        d = await schoolListFetch(req.query.school);
    }
    else {
        d = notDataMsg;
    }
    return d;
});
fastify.get('/cookInfo', async (req, rep) => {
    const queryObj = req.query;
    let d;
    if (queryObj.school && queryObj.getnum) {
        d = await fetchCookInfo(queryObj.school, queryObj.getnum);
    }
    else {
        d = notDataMsg;
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
        d = notDataMsg;
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
        d = notDataMsg;
    }
    return d;
});
fastify.get('/schoolSchedule', async (req, rep) => {
    const queryObj = req.query;
    let d;
    if (queryObj.school && queryObj.startDay && queryObj.lastDay) {
        d = await fetchSchoolScheduleDday(queryObj.school, queryObj.startDay, queryObj.lastDay);
    }
    else {
        d = notDataMsg;
    }
    return d;
});
fastify.get('/fetchSchoolScheduleAll', async (req, rep) => {
    const queryObj = req.query;
    let d;
    if (queryObj.school && queryObj.startDay && queryObj.lastDay) {
        d = await fetchSchoolScheduleAll(queryObj.school, queryObj.startDay, queryObj.lastDay);
    }
    else {
        d = notDataMsg;
    }
    return d;
});
fastify.listen(3000, '0.0.0.0', () => {
    console.log('server listening...');
});
//# sourceMappingURL=index.js.map