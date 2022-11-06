import iconv from 'iconv-lite';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { fetchNet } from './fetch.js';
const urlList = {
    '학교찾기': '',
    '학교정보': '',
    'sc': '',
    '시간표번호_이번주': '',
    '시간표번호_다음주': '',
    '선생님이름': '',
    '과목리스트': '',
};
export async function getscNum() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const euc_ = await fetchNet('/st');
    const euc = euc_.euc;
    const d = [];
    for (var i = 0; i < 2; i++) {
        if (!d.length) {
            d.push(euc.indexOf('./', i));
        }
        else {
            d.push(euc.indexOf('./', d[0] + 2));
        }
    }
    urlList.학교찾기 = euc.slice(d[0] + 1, euc.indexOf(`'`, d[0] + 1));
    urlList.학교정보 = euc.slice(d[1] + 1, euc.indexOf(`'`, d[1] + 1));
    urlList.sc = euc.slice(euc.indexOf("sc_data('") + 9, euc.indexOf("_'", euc.indexOf("sc_data('")) + 1);
    urlList.시간표번호_이번주 = euc.slice(euc.indexOf("일일자료=자료.") + 8, euc.indexOf("일일자료=자료.") + 13);
    urlList.시간표번호_다음주 = euc.slice(euc.indexOf("원자료=자료.") + 7, euc.indexOf("원자료=자료.") + 12);
    urlList.선생님이름 = euc.slice(euc.indexOf("th<자료.") + 6, euc.indexOf("th<자료.") + 11);
    urlList.과목리스트 = euc.slice(euc.indexOf(`속성+"'>"+자료.`) + 11, euc.indexOf(`속성+"'>"+자료.`) + 16);
    // setInterval(async () => {
    //     // const date =  new Date()
    //     // if(daychang === 0){
    //     //     daychang = date.getDate()
    //     // } else if(date.getDate() !== daychang && daychang !== 0){
    //     //     await getscNum()
    //     // }
    //     getscNum()
    // }, 600 * 1000)
}
const parsingJson = async (res) => {
    const arr = [];
    res = res.slice(res.indexOf('{'));
    for (let i of res) {
        if (i.charCodeAt(0) !== 0) {
            arr.push(i);
        }
        else
            break;
    }
    return JSON.parse(arr.join(''));
};
export const schoolListFetch = async (school) => {
    let str = iconv.encode(school, 'euc-kr');
    let d = [];
    for (let i = 0; str.length > i; i++) {
        d.push(`%${str[i].toString(16).toUpperCase()}`);
    }
    // if(!urlList['학교찾기']){
    //     await getscNum(); 
    // }
    //이부분은 어짜피 트래픽이 많이 없어서 사이트 접속하면 데이터 얻어오는 걸로 변경 
    // 트레픽이 많이 발생하면 하루에 한번 가져 오는걸로 변경..!
    await getscNum();
    const euc = await fetchNet(`http://comci.kr:4082${urlList['학교찾기']}${d.join('')}`);
    return parsingJson(euc.utf);
};
const schoolInfoFetch = async (schoolNum) => {
    const url = Buffer.from(`${urlList['sc']}${schoolNum}_0_1`, 'utf8').toString('base64'); // -> 이거 오류가 있었음 `${urlList['sc']}_ <- 이거 유무${schoolNum}_0_1`
    const euc = await fetchNet(`http://comci.kr:4082${urlList['학교정보']}${url}`);
    return parsingJson(euc.utf);
};
export const getComciganData = async (school, a, b, num) => {
    // 학교 컴시간 데이터 요청하는곳 매개변수에 들어가는 학교이름이 정확해야함 -> 왜냐면 데이터 1개 오는걸 감안하고 만들었기 때문
    const schoolNum = await schoolListFetch(school); // 학교 고유번호 받아옴ㅋ
    const mainData = await schoolInfoFetch(schoolNum['학교검색'][0][3]); //schoolNum에서 받아온 데이터 넘겨줌
    const parsingData = await comciganDataParsing(mainData, a, b, num); //mainData에서 받은 데이터를 파싱해줌
    return parsingData;
};
const comciganDataParsing = async (arr, a, b, num) => {
    const data = {
        '월': [],
        '화': [],
        '수': [],
        '목': [],
        '금': [],
    };
    await fs.writeFile('./arr.json', JSON.stringify(arr), { encoding: 'utf-8' });
    const day = ['월', '화', '수', '목', '금'];
    const days = ['시간표번호_이번주', '시간표번호_다음주'];
    const myComciganData = arr[urlList[days[num]]][a][b];
    for (let i = 0; i < myComciganData.length; i++) {
        for (let j = 0; j < day.length + 4; j++) {
            const classNumData = String(arr[urlList[days[num]]][a][b][i][j]);
            if (classNumData.length === 3) {
                const l = parseInt(classNumData.slice(0, 1));
                const f = parseInt(classNumData.slice(2));
                data[day[i - 1]].push([`${arr[urlList.과목리스트][f]}`, `${arr[urlList.선생님이름][l].slice(0, 2)}`]);
            }
            else if (classNumData.length === 4) {
                const l = parseInt(classNumData.slice(0, 2));
                const f = parseInt(classNumData.slice(2));
                data[day[i - 1]].push([`${arr[urlList.과목리스트][f]}`, `${arr[urlList.선생님이름][l].slice(0, 2)}`]);
            }
            else if (classNumData.length === 0) {
                data[day[i - 1]].push(['', '']);
            }
        }
    }
    return data;
};
/**나이스 API URL or KEY */
const neisApis = {
    key: 'dd01d62062ee4a26a12d9ea34e7b77a7',
    학교기본정보: 'https://open.neis.go.kr/hub/schoolInfo',
    급식식단정보: 'https://open.neis.go.kr/hub/mealServiceDietInfo',
    반정보: 'https://open.neis.go.kr/hub/classInfo',
    학사일정: 'https://open.neis.go.kr/hub/SchoolSchedule',
};
const changeDay = (i) => {
    const Day = new Date();
    Day.setDate(Day.getDate() + Number(i));
    const y = `${Day.getFullYear()}`.padStart(2, '0');
    const m = `${Day.getMonth() + 1}`.padStart(2, '0');
    const d = `${Day.getDate()}`.padStart(2, '0');
    return `${y}${m}${d}`;
};
export const fetchSchoolInfo = async (schoolName) => {
    const res = await (await fetch(`${neisApis['학교기본정보']}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=100&SCHUL_NM=${schoolName}`)).json();
    const arr = {
        ATPT_OFCDC_SC_CODE: res.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE,
        SD_SCHUL_CODE: res.schoolInfo[1].row[0].SD_SCHUL_CODE,
        SCHUL_NMd: res.schoolInfo[1].row[0].SCHUL_NM,
    };
    return arr;
};
const getNameList = {
    testName: ['지필평가', '중간고사', '기말고사', '중간고사', '고사'],
};
/**매개변수는 학교 이름이다.*/
export const fetchSchoolScheduleDday = async (schoolName, startDay, lastDay) => {
    const data = await fetchSchoolInfo(schoolName);
    const scheduleData = await (await fetch(`${neisApis.학사일정}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${data.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${data.SD_SCHUL_CODE}&AA_FROM_YMD=${startDay}&AA_TO_YMD=${lastDay}`)).json();
    const parsingData = await schoolScheduleDataParsing(scheduleData);
    return parsingData;
};
export const fetchSchoolScheduleAll = async (schoolName, startDay, lastDay) => {
    const data = await fetchSchoolInfo(schoolName);
    const scheduleData = await (await fetch(`${neisApis.학사일정}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${data.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${data.SD_SCHUL_CODE}&AA_FROM_YMD=${startDay}&AA_TO_YMD=${lastDay}`)).json();
    const arr = [];
    const lastData = [];
    scheduleData.SchoolSchedule[1].row.flat().map((v) => { arr.push({ day: v.AA_YMD, eventName: v.EVENT_NM }); });
    arr.forEach((v) => {
        getNameList.testName.forEach((a, i) => {
            if (v.eventName.includes(a)) {
                lastData.push(v);
            }
        });
    });
    return arr;
};
/**D-day 태그로 만들기 위해 학사일정 데이터를 파싱하는 함수 */
const schoolScheduleDataParsing = (data) => {
    const arr = [];
    const lastData = [];
    data.SchoolSchedule[1].row.flat().map((v) => { arr.push({ day: v.AA_YMD, eventName: v.EVENT_NM }); });
    arr.forEach((v) => {
        getNameList.testName.forEach((a, i) => {
            if (v.eventName.includes(a)) {
                lastData.push(v);
            }
        });
    });
    const datas = [];
    const map = new Map();
    for (let i of lastData) {
        if (!map.has(i.eventName)) {
            map.set(i.eventName, []);
        }
        map.get(i.eventName).push(i.day);
    }
    for (let [key, value] of map) {
        value.sort((a, b) => a.localeCompare(b));
    }
    const keys = map.keys();
    map.forEach((i) => {
        datas.push({
            day: {
                start: i[0],
                last: i.at(-1)
            },
            eventName: keys.next().value
        });
    });
    //     // i.eventName을 찾고 없으면 하나 넣음
    //     // start, end를 똑같이 씀
    //     // i.eventName가 있는 경우
    //     // start보다 작으면 start에
    //     // end보다 크면 end에
    // }
    return datas;
};
export const fetchCookInfo = async (schoolName, getNum) => {
    const arr = await fetchSchoolInfo(schoolName);
    const dayList = [];
    for (let i = 0; i < 2; i++) {
        if (i !== 0) {
            dayList.push(changeDay(getNum));
        }
        else {
            const Day = new Date();
            const month = `${Day.getMonth() + 1}`.padStart(2, '0');
            const date = `${Day.getDate()}`.padStart(2, '0');
            const now = `${Day.getFullYear()}${month}${date}`;
            dayList.push(now);
        }
    }
    const res = await (await fetch(`${neisApis.급식식단정보}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${arr.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${arr.SD_SCHUL_CODE}&MLSV_FROM_YMD=${dayList[0]}&MLSV_TO_YMD=${dayList[1]}`)).json();
    if ('RESULT' in res) {
        if (res.RESULT.MESSAGE === '해당하는 데이터가 없습니다.') {
            return res;
        }
    }
    else if ('mealServiceDietInfo' in res) {
        return res;
    }
};
export const checkSchool = async (schoolName, year, Class) => {
    const schoolInfo = await fetchSchoolInfo(schoolName);
    const date = new Date();
    const res = await (await fetch(`${neisApis.반정보}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=10&ATPT_OFCDC_SC_CODE=${schoolInfo.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${schoolInfo.SD_SCHUL_CODE}&AY=${date.getFullYear()}&GRADE=${year}`)).json();
    if ('classInfo' in res) {
        if (res.classInfo[1].row.length >= Class) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};
//# sourceMappingURL=server.js.map