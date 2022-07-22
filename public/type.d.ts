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

export type ME = [
    {
        result: string
    },
    {
        respond: string
    }
]      