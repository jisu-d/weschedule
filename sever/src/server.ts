import iconv from 'iconv-lite';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { fetchNet } from './fetch.js';
import { Datai, msg, CI, mSDI, SCHDATA, EVLILF, EVLI, neisDataEls, neisDataMis, neisDataHis, COMSCHO, schoolInfo } from '../../public/type'
import { type } from 'os';

const urlList = {
    '학교찾기': '',
    '학교정보': '',
    'sc':'',
    '시간표번호_이번주': '',
    '시간표번호_다음주': '',
    '선생님이름': '',
    '과목리스트': '',
}

export async function getscNum(){ // 사이트 스크립트에 데이터 요청할떄 쓰는 고유 번호 가져옴 -> 고유번호가 맨날 바뀜..!
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const euc_ = await fetchNet('/st');

    const euc = euc_.euc
    
    const d: number[] = []
    for (var i = 0; i < 2; i++) {
        if (!d.length) {
            d.push(euc.indexOf('./', i))
        } else {
            d.push(euc.indexOf('./', d[0] + 2))
        }
    }

    urlList.학교찾기 = euc.slice(d[0] + 1, euc.indexOf(`'`, d[0] + 1));
    urlList.학교정보 = euc.slice(d[1] + 1, euc.indexOf(`'`, d[1] + 1));

    urlList.sc = euc.slice(euc.indexOf("sc_data('") + 9, euc.indexOf("_'", euc.indexOf("sc_data('")) + 1)

    urlList.시간표번호_이번주 = euc.slice(euc.indexOf("일일자료=자료.") + 8, euc.indexOf("일일자료=자료.") + 13)
    urlList.시간표번호_다음주 = euc.slice(euc.indexOf("원자료=자료.") + 7, euc.indexOf("원자료=자료.") + 12)

    urlList.선생님이름 = euc.slice(euc.indexOf("th<자료.") + 6, euc.indexOf("th<자료.") + 11)
    urlList.과목리스트 = euc.slice(euc.indexOf(`속성+"'>"+자료.`) + 11, euc.indexOf(`속성+"'>"+자료.`) + 16)

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

const parsingJson = async (res:string) => { // 0 삭제 -> JSON 변환해서 return
    const arr:string[] = []

    res = res.slice(res.indexOf('{'))
    
    for(let i of res){
        if(i.charCodeAt(0) !== 0){
            arr.push(i);
        } else break;
    }
    return JSON.parse(arr.join(''))
}


export const schoolListFetch = async (school:string) => { //학교 검색할때 쓰는 함수 -> 학교들
    let str = iconv.encode(school, 'euc-kr');
    let d = []

    for(let i = 0 ; str.length > i ; i++){
        d.push(`%${str[i].toString(16).toUpperCase()}`)
    }
    // if(!urlList['학교찾기']){
    //     await getscNum(); 
    // }
    //이부분은 어짜피 트래픽이 많이 없어서 사이트 접속하면 데이터 얻어오는 걸로 변경 
    // 트레픽이 많이 발생하면 하루에 한번 가져 오는걸로 변경..!
    await getscNum();
    const euc = await fetchNet(`http://comci.kr:4082${urlList['학교찾기']}${d.join('')}`);
    const pars: COMSCHO = await parsingJson(euc.utf)
    if(pars.학교검색[0]){
        return pars.학교검색[0]
    } else{
        const data: [number, string, string, number][] = []
        const res: schoolInfo = await (await fetch(`${neisApis['학교기본정보']}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=100&SCHUL_NM=${school}`)).json()
        res.schoolInfo[1].row.forEach((v) => {
            data.push([0, v.LCTN_SC_NM, v.SCHUL_NM, 0])
        })
        console.log(data);
        
        return  await data
    }
}

const schoolInfoFetch = async (schoolNum:number) => { // 여기에 들어가는 매개변수는 schoolListFetch()했을때 받은 값중에서 마지막 숫자
    const url = Buffer.from(`${urlList['sc']}${schoolNum}_0_1`, 'utf8').toString('base64') // -> 이거 오류가 있었음 `${urlList['sc']}_ <- 이거 유무${schoolNum}_0_1`
    const euc = await fetchNet(`http://comci.kr:4082${urlList['학교정보']}${url}`);

    return parsingJson(euc.utf)
}

/**컴시간 데이터 있는지 검색한후 없으면 나이스 데이터를 받아옴 */
export const getComciganData = async (school:string, Year:number, Class:number, num:number) => { 
    // 학교 컴시간 데이터 요청하는곳 매개변수에 들어가는 학교이름이 정확해야함 -> 왜냐면 데이터 1개 오는걸 감안하고 만들었기 때문
    const schoolNum = await schoolListFetch(school) // 학교 고유번호 받아옴
    if(schoolNum[0]){
        const mainData = await schoolInfoFetch(schoolNum[0][3]) //schoolNum에서 받아온 데이터 넘겨줌
        const parsingData:Datai = await comciganDataParsing(mainData, Year, Class, num) //mainData에서 받은 데이터를 파싱해줌
        return parsingData
    } else{
        const neisData = await fetchSchoolScheduleData(school, Year, Class)
        return neisData
    }
}

const comciganDataParsing = async (arr:any, Year:number, Class:number, num:number) => { //이거 여기서 데이터 받아서 파싱 하는 함수 임 getComciganData 여기서 받아서하면됨
    const data:Datai = {
        '월': [],
        '화': [],
        '수': [],
        '목': [],
        '금': [],
    }

    await fs.writeFile('./arr.json', JSON.stringify(arr), {encoding:'utf-8'});
    
    const day = ['월', '화', '수', '목', '금'] as const

    const days = ['시간표번호_이번주', '시간표번호_다음주'] as const

    const myComciganData:Array<7> = arr[urlList[days[num]]][Year][Class]
    
    for(let i = 0 ; i < myComciganData.length ; i++){
            for(let j = 0 ; j < day.length + 4; j++){
                const classNumData = String(arr[urlList[days[num]]][Year][Class][i][j])
                    if(classNumData.length === 3){
                        const l = parseInt(classNumData.slice(0, 1))
                        const f = parseInt(classNumData.slice(2))
                        
                        data[day[i - 1]].push([`${arr[urlList.과목리스트][f]}`, `${arr[urlList.선생님이름][l].slice(0, 2)}`])
                    } else if(classNumData.length === 4){
                        const l = parseInt(classNumData.slice(0, 2))
                        const f = parseInt(classNumData.slice(2))
                        data[day[i - 1]].push([`${arr[urlList.과목리스트][f]}`, `${arr[urlList.선생님이름][l].slice(0, 2)}`])
                    } else if(classNumData.length === 0){
                        data[day[i - 1]].push(['', ''])
                    }
            }
    }
    return data
}

/**나이스 API URL or KEY */
const neisApis = {
    key: 'dd01d62062ee4a26a12d9ea34e7b77a7',
    학교기본정보: 'https://open.neis.go.kr/hub/schoolInfo',
    급식식단정보: 'https://open.neis.go.kr/hub/mealServiceDietInfo',
    반정보: 'https://open.neis.go.kr/hub/classInfo',
    학사일정: 'https://open.neis.go.kr/hub/SchoolSchedule',
    초등학교_시간표: 'https://open.neis.go.kr/hub/elsTimetable',
    중학교_시간표: 'https://open.neis.go.kr/hub/misTimetable',
    고등학교_시간표: 'https://open.neis.go.kr/hub/hisTimetable',
}

const changeDay = (i:number) => {
    const Day = new Date()
    Day.setDate(Day.getDate() + Number(i))
    const y: string = `${Day.getFullYear()}`.padStart(2, '0');
    const m: string = `${Day.getMonth() + 1}`.padStart(2, '0');
    const d: string = `${Day.getDate()}`.padStart(2, '0');

    return `${y}${m}${d}`
}

interface SCINFO {
    ATPT_OFCDC_SC_CODE: string;
    SD_SCHUL_CODE: string;
    SCHUL_NMd: string;
}

/**학교명 -> 시도교육청코드, 표준학교코드, 학교명 */
export const fetchSchoolInfo = async (schoolName:string) => {  //학교 정보를 가져 오는 코드
    
    const res = await (await fetch(`${neisApis['학교기본정보']}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=100&SCHUL_NM=${schoolName}`)).json()
    console.log(`${neisApis['학교기본정보']}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=100&SCHUL_NM=${schoolName}`);
    
    const arr:SCINFO = {
        ATPT_OFCDC_SC_CODE: res.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE,
        SD_SCHUL_CODE: res.schoolInfo[1].row[0].SD_SCHUL_CODE,
        SCHUL_NMd: res.schoolInfo[1].row[0].SCHUL_NM,
    }
    return arr
}

/**학사일정 데이터에서 가져올 text list들 */
const getNameList = {
    textName: ['지필평가', '중간고사', '기말고사', '중간고사', '고사'],
}

/**D-day 태그로 만들기 위해 학사일정 데이터를 파싱하는 함수 */
const schoolScheduleDataParsing = (data:SCHDATA) => {
    const arr: EVLI[] = []
    const lastData: EVLI[] = []
    data.SchoolSchedule[1].row.flat().map((v) => {arr.push({ day: v.AA_YMD, eventName: v.EVENT_NM})});

    arr.forEach((v) => {
        getNameList.textName.forEach((a:string, i) => {
            if(v.eventName.includes(a)){
                lastData.push(v)
            }
        })
    })
    const datas:EVLILF[] = [];

    const map = new Map()
    for (let i of lastData) {
        if (!map.has(i.eventName)) {
            map.set(i.eventName, [])
        }
        map.get(i.eventName).push(i.day)
    }
    for(let [key, value] of map){
        value.sort((a: string, b: string) => a.localeCompare(b))
    }
    const keys = map.keys();
    

    map.forEach((i:string[]) => {
        datas.push({
            day: {
                start: i[0],
                last: i.at(-1)
            },
            eventName: keys.next().value
        })
    })

    //     // i.eventName을 찾고 없으면 하나 넣음
    //     // start, end를 똑같이 씀
    //     // i.eventName가 있는 경우
    //     // start보다 작으면 start에
    //     // end보다 크면 end에

    // }
    return datas
}

/**학교 이름을 Day태그만들기 위한 데이터를 리턴 함수*/
export const fetchSchoolScheduleDday = async (schoolName: string, startDay: string, lastDay: string) => {
    const data = await fetchSchoolInfo(schoolName)
    const scheduleData:SCHDATA = await (await fetch(`${neisApis.학사일정}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${data.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${data.SD_SCHUL_CODE}&AA_FROM_YMD=${startDay}&AA_TO_YMD=${lastDay}`)).json();
    const parsingData = await schoolScheduleDataParsing(scheduleData)
    return parsingData
}

/**학교의 시간표 데이터 리턴 함수 */
export const fetchSchoolScheduleData = async (schoolName: string, year:number, Class:number) => {
    const schoolData = await fetchSchoolInfo(schoolName)
    const data:Datai = {
        '월': [],
        '화': [],
        '수': [],
        '목': [],
        '금': [],
    }

    const day = ['월', '화', '수', '목', '금'] as const

    const d = new Date()
    d.setDate(d.getDate() - d.getDay())
    if(schoolName.includes('초등학교')){
        for (let i = 0; i < 5; i++) {
            d.setDate(d.getDate() + 1)
            const a = `${`${d.getFullYear()}`.padStart(2, '0')}${`${d.getMonth() + 1}`.padStart(2, '0')}${`${d.getDate()}`.padStart(2, '0')}`
            const neisData: neisDataEls = await (await fetch(`${neisApis.초등학교_시간표}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${schoolData.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${schoolData.SD_SCHUL_CODE}&ALL_TI_YMD=${a}&GRADE=${year}&CLASS_NM=${Class}`)).json()
            for(let j = 0 ; j < neisData.elsTimetable[1].row.length ; j++){
                data[day[d.getDay() - 1]].push([neisData.elsTimetable[1].row[j].ITRT_CNTNT, ''])
            }
        }
    } else if(schoolName.includes('중학교')){
        for (let i = 0; i < 5; i++) {
            d.setDate(d.getDate() + 1)
            const a = `${`${d.getFullYear()}`.padStart(2, '0')}${`${d.getMonth() + 1}`.padStart(2, '0')}${`${d.getDate()}`.padStart(2, '0')}`
            const neisData: neisDataMis = await (await fetch(`${neisApis.중학교_시간표}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${schoolData.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${schoolData.SD_SCHUL_CODE}&ALL_TI_YMD=${a}&GRADE=${year}&CLASS_NM=${Class}`)).json()
            for(let j = 0 ; j < neisData.misTimetable[1].row.length ; j++){
                data[day[d.getDay() - 1]].push([neisData.misTimetable[1].row[j].ITRT_CNTNT, ''])
            }
        }
    } else if(schoolName.includes('고등학교')){
        for (let i = 0; i < 5; i++) {
            d.setDate(d.getDate() + 1)
            const a = `${`${d.getFullYear()}`.padStart(2, '0')}${`${d.getMonth() + 1}`.padStart(2, '0')}${`${d.getDate()}`.padStart(2, '0')}`
            const neisData: neisDataHis = await (await fetch(`${neisApis.고등학교_시간표}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${schoolData.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${schoolData.SD_SCHUL_CODE}&ALL_TI_YMD=${a}&GRADE=${year}&CLASS_NM=${Class}`)).json()
            for(let j = 0 ; j < neisData.hisTimetable[1].row.length ; j++){
                data[day[d.getDay() - 1]].push([neisData.hisTimetable[1].row[j].ITRT_CNTNT, ''])
            }
        }
    } 

    return data
}

/**학교의 모든 학사 일정을 리턴 함수*/
export const fetchSchoolScheduleAll = async (schoolName: string, startDay: string, lastDay: string) => {
    const data = await fetchSchoolInfo(schoolName)
    const scheduleData:SCHDATA = await (await fetch(`${neisApis.학사일정}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${data.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${data.SD_SCHUL_CODE}&AA_FROM_YMD=${startDay}&AA_TO_YMD=${lastDay}`)).json();
    
    const arr: EVLI[] = []
    scheduleData.SchoolSchedule[1].row.flat().map((v) => {arr.push({ day: v.AA_YMD, eventName: v.EVENT_NM})});

    return arr
}

/**학교이름으로 급식 정보를 가져온다. */
export const fetchCookInfo = async (schoolName:string, getNum:number) => { 
    const arr = await fetchSchoolInfo(schoolName)
    const dayList:string[] = []

    for(let i = 0 ; i < 2 ; i++){
        if(i !== 0){
            dayList.push(changeDay(getNum))
        } else {
            const Day = new Date()  
            const month = `${Day.getMonth() + 1}`.padStart(2, '0');
            const date = `${Day.getDate()}`.padStart(2, '0');
            const now = `${Day.getFullYear()}${month}${date}`;
            dayList.push(now)
        }
    }

    const res: msg | mSDI = await (await fetch(`${neisApis.급식식단정보}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${arr.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${arr.SD_SCHUL_CODE}&MLSV_FROM_YMD=${dayList[0]}&MLSV_TO_YMD=${dayList[1]}`)).json();
    if('RESULT' in res){
        if(res.RESULT.MESSAGE === '해당하는 데이터가 없습니다.'){
            return res
        }
    } else if ('mealServiceDietInfo' in res){
        return res
    }
}

/**검색한 학교 학년 반 이 있는지 확인하는 함수 -> ture or false*/
export const checkSchool = async (schoolName:string, year:number, Class:number ) => {
    const schoolInfo = await fetchSchoolInfo(schoolName)

    const date = new Date()
    
    const res: msg | CI = await (await fetch(`${neisApis.반정보}?KEY=${neisApis.key}&Type=json&pIndex=1&pSize=10&ATPT_OFCDC_SC_CODE=${schoolInfo.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${schoolInfo.SD_SCHUL_CODE}&AY=${date.getFullYear()}&GRADE=${year}`)).json();
    if ('classInfo' in res) {
        if(res.classInfo[1].row.length >= Class){
            return true
        } else{
            return false
        }
    } else {
       return false;
    } 
}
