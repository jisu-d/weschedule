import './Cook-div.css';
import { localda } from '../login-page/local_data'

import { proxy } from "../proxy";

import { msg, mSDI } from "../../../public/type"
import { useEffect, useState } from 'react';

// let da: msg | mSDI  = await (await fetch(`${proxy}/cookInfo?school=${localda.schoolname}&getnum=5`)).json()
//이거 급식 불러오는 날짜수정 필요함

export function CookDiv() {
    let [arr, setArr] = useState<JSX.Element>();
    
    const createCook = async () => {
        let da: msg | mSDI  = await (await fetch(`${proxy}/cookInfo?school=${localda.schoolname}&getnum=14`)).json()
        const arr:JSX.Element[] = [];
        if('RESULT' in da){
            if(da.RESULT.MESSAGE === '해당하는 데이터가 없습니다.'){
                return da.RESULT.MESSAGE
            }
        } else if ('mealServiceDietInfo' in da){
            const data = da.mealServiceDietInfo[1].row
            for(let i = 0 ; i < data.length; i++){
                const element = (
                    <div className="cooktable" key={`cook-${i}`}>
                        <div className='kcal'>
                            <span>{data[i].CAL_INFO}</span>
                        </div>
                        <div className='food-list'>{data[i].DDISH_NM.replace(/[\.0-9\(\)]/g, '').split('<br/>').map((v:string, j:number) => (<div key={`cook-menu-${j}`}>{v}</div>))}</div>
                                                               
                        <div className='date'>{data[i].MLSV_TO_YMD.slice(4).replace(/(\d{2})(\d{2})/, '$1월 $2일')}</div>
                    </div>
                )
                arr.push(element)
            }
        }
    
        setArr(
            <>
                {arr}
            </>
        )
    }

    useEffect(() => {
        setArr(
            <div className='loading' >
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
        createCook()
    }, []);

    const element = (
        <>
            <div className="title">오늘 급식</div>
            <div className="cook-List">{arr}</div>
        </>
    )
    return element
}

const click = (e:Event) => {
    console.log(e.target);
     
}