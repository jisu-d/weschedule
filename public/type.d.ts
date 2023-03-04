
export interface WEEK_SCHEDULE_DATA{
    [key:string]:[string, string][]
}

export interface DBdata{
    schoolname: string
    year: number
    class: number
    login: number
}

export type SEVER_MSG = {
    RESULT:{
        CODE:String;
        MESSAGE:String;
    }
}

export type NEIS_API_COOK_DATA = {
    mealServiceDietInfo :[
        {
            head:[
                {
                    list_total_count:number
                },
                SEVER_MSG
            ]
        },
        {
            row: {
                ATPT_OFCDC_SC_CODE: string
                ATPT_OFCDC_SC_NM: string
                CAL_INFO: string
                DDISH_NM: string
                MLSV_FGR: string
                MLSV_FROM_YMD: string
                MLSV_TO_YMD: string
                MLSV_YMD: string
                MMEAL_SC_CODE: string
                MMEAL_SC_NM: string
                NTR_INFO: string
                ORPLC_INFO: string
                SCHUL_NM: string
                SD_SCHUL_CODE: string
            }[]
        }
    ]
}

export type NEIS_API_CLASS_DATA = {
    classInfo:[
        {
            head:[
                {
                    list_total_count:number
                },
                SEVER_MSG
            ]
        },
        {
            row:{
                ATPT_OFCDC_SC_CODE: string
                ATPT_OFCDC_SC_NM: string
                AY: string
                CLASS_NM: string
                DDDEP_NM: string
                DGHT_CRSE_SC_NM: string
                GRADE: string
                LOAD_DTM: string
                ORD_SC_NM: string
                SCHUL_CRSE_SC_NM: string
                SCHUL_NM: string
                SD_SCHUL_CODE: string  
            }[]
        }
    ]
}

export type neisDataEls = {
    elsTimetable:[
        {
            head:[
                {
                    list_total_count: number
                }, 
                SEVER_MSG
            ]
        },
        {
            row:{
                    ALL_TI_YMD:string
                    ATPT_OFCDC_SC_CODE:string
                    ATPT_OFCDC_SC_NM:string
                    AY:string
                    CLASS_NM:string
                    GRADE:string
                    ITRT_CNTNT:string
                    LOAD_DTM:string
                    PERIO:string
                    SCHUL_NM:string
                    SD_SCHUL_CODE:string
                    SEM:string
                }[]
        }
    ]
}

export type neisDataMis = {
    misTimetable:[
        {
            head:[
                {
                    list_total_count: number
                }, 
                SEVER_MSG
            ]
        },
        {
            row:{
                    ALL_TI_YMD:string
                    ATPT_OFCDC_SC_CODE:string
                    ATPT_OFCDC_SC_NM:string
                    AY:string
                    CLASS_NM:string
                    GRADE:string
                    ITRT_CNTNT:string
                    LOAD_DTM:string
                    PERIO:string
                    SCHUL_NM:string
                    SD_SCHUL_CODE:string
                    SEM:string
                }[]
        }
    ]
}

export type neisDataHis = {
    hisTimetable:[
        {
            head:[
                {
                    list_total_count: number
                }, 
                SEVER_MSG
            ]
        },
        {
            row:{
                    ALL_TI_YMD:string
                    ATPT_OFCDC_SC_CODE:string
                    ATPT_OFCDC_SC_NM:string
                    AY:string
                    CLASS_NM:string
                    GRADE:string
                    ITRT_CNTNT:string
                    LOAD_DTM:string
                    PERIO:string
                    SCHUL_NM:string
                    SD_SCHUL_CODE:string
                    SEM:string
                }[]
        }
    ]
}


export type MYOUN_DATA = [
    {
        result: string
    },
    {
        respond: string
    }
]

export type SCHOOL_EVENT_DAY_INFO = {
    day: {
        start: string,
        last: string,
    },
    eventName:string
}

export type Skydata = {
    "coord": {
        "lon": number,
        "lat": number
    },
    "weather": [
        {
            "id": number,
            "main": string,
            "description": string,
            "icon": string
        }
    ],
    "base": string,
    "main": {
        "temp": number,
        "feels_like": number,
        "temp_min": number,
        "temp_max": number,
        "pressure": number,
        "humidity": number
    },
    "visibility": number,
    "wind": {
        "speed": number,
        "deg": number
    },
    "clouds": {
        "all": number
    },
    "dt": number,
    "sys": {
        "type": number,
        "id": number,
        "message": number,
        "country": string,
        "sunrise": number,
        "sunset": number
    },
    "timezone": number,
    "id": number,
    "name": string,
    "cod": number
}

export type NEIS_API_SCHEDULE_DATA = {
    SchoolSchedule:[
        {
            head:[
                {list_total_count: number},
                SEVER_MSG
            ]
        },
        {
            row:[
                {
                    AA_YMD: string
                    ATPT_OFCDC_SC_CODE: string
                    ATPT_OFCDC_SC_NM: string
                    AY: string
                    DGHT_CRSE_SC_NM: string
                    EVENT_CNTNT: null
                    EVENT_NM: string
                    FIV_GRADE_EVENT_YN: string
                    FR_GRADE_EVENT_YN: string
                    LOAD_DTM: string
                    ONE_GRADE_EVENT_YN: string
                    SBTR_DD_SC_NM: string
                    SCHUL_CRSE_SC_NM: string
                    SCHUL_NM: string
                    SD_SCHUL_CODE: string
                    SIX_GRADE_EVENT_YN: string
                    THREE_GRADE_EVENT_YN: string
                    TW_GRADE_EVENT_YN: string
                }[]
            ]
        }
    ]
}

export type SCHOOL_EVENT = {
    day: string,
    eventName:string
}

export type COMSCHO = {
    학교검색:
    [
        number,
        string,
        string,
        number
    ][]
}

export type COMSCHO2 =
    [
        number,
        string,
        string,
        number
    ][]


export type schoolInfo = {
    schoolInfo: [
        {
            head: [
                { list_total_count: number },
                SEVER_MSG
            ]
        },
        {
            row: {
                ATPT_OFCDC_SC_CODE: string
                ATPT_OFCDC_SC_NM: string
                COEDU_SC_NM: string
                DGHT_SC_NM: string
                ENE_BFE_SEHF_SC_NM: string
                ENG_SCHUL_NM: string
                FOAS_MEMRD: string
                FOND_SC_NM: string
                FOND_YMD: string
                HMPG_ADRES: string
                HS_GNRL_BUSNS_SC_NM: string
                HS_SC_NM: string
                INDST_SPECL_CCCCL_EXST_YN: string
                JU_ORG_NM: string
                LCTN_SC_NM: string
                LOAD_DTM: string
                ORG_FAXNO: string
                ORG_RDNDA: string
                ORG_RDNMA: string
                ORG_RDNZC: string
                ORG_TELNO: string
                SCHUL_KND_SC_NM: string
                SCHUL_NM: string
                SD_SCHUL_CODE: string
                SPCLY_PURPS_HS_ORD_NM: null | string
            }[]
        }
    ]
}

export type 숏날짜 = `${number}${number}-${number}${number}-${number}${number}`;
export type 날짜 = `${number}${number}${숏날짜}`;
export type 일과시간 = `${number}(${number}${number}:${number}${number})`;
export type JA = [void, number[][][], number[][][], number[][][]]

type ComSiGanDataWithout자료 = {
    교사수:number;
    학급수:[number, number, number, number];
    요일별시수:[void, number[], number[], number[]];
    전일제:[number, number, number];
    버전:string;
    담임:[number[], number[], number[]];
    기상학급수:[number, number, number, number];
    특별실수:number;
    열람제한일:날짜;
    학기시작일자:날짜;
    학교명:string;
    지역명:string;
    학년도:number;
    복수교사:string[];
    시작일:날짜;
    강의실: number[];
    일과시간:일과시간[];
    일과자료:[number, `${숏날짜} ~ ${숏날짜}`][];
    오늘r:number;
}

export type 자료 = {
    [p in `${''|'긴'}자료${number}`]?:string[]|JA;
}

export type ComSiGanData = ComSiGanDataWithout자료 & 자료;