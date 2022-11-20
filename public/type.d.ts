import { type } from "os"
// import { dataType } from '../main/src/server'

export interface Datai{
    [key:string]:[string, string][]
}

export interface Datac{
    [key:number]: string | number
}

export interface DBdata{
    schoolname: string
    year: number
    class: number
    login: number
}

export type msg = {
    RESULT:{
        CODE:String;
        MESSAGE:String;
    }
}

export type mSDI= {
    mealServiceDietInfo :[
        {
            head:[
                {
                    list_total_count:number
                },
                msg
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

export type CI = {
    classInfo:[
        {
            head:[
                {
                    list_total_count:number
                },
                msg
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
                msg
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
                msg
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
                msg
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


export type ME = [
    {
        result: string
    },
    {
        respond: string
    }
]

export type EVLILF = {
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

export type SCHDATA = {
    SchoolSchedule:[
        {
            head:[
                {list_total_count: number},
                msg
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

export type EVLI = {
    day: string,
    eventName:string
}