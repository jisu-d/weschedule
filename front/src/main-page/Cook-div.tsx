import './Cook-div.css';
import { localda } from '../Search-page/local_data'

import { proxy } from "../proxy";

const da = await (await fetch(`${proxy}/cookInfo?school=${localda.schoolname}&getnum=5`)).json()
//이거 급식 불러오는 날짜수정 필요함

export function CookDiv() {
    const element = (
        <>
            <div className="title">오늘 급식</div>
            <div className="cook-List">{createCook()}</div>
        </>
    )
    return element
}

const createCook = () => {
    const arr:JSX.Element[] = [];
    for(let i = 0 ; i < da.length; i++){
        const element = (
            <div className="cooktable" key={`cook-${i}`}>
                <div className='kcal'>
                    <span>{da[i].CAL_INFO}</span>
                </div>
                <div className='food-list'>{da[i].DDISH_NM.replace(/[\.0-9\(\)]/g, '').split('<br/>').map((v:string, j:number) => (<div key={`cook-menu-${j}`}>{v}</div>))}</div>
                                                       
                <div className='date'>{da[i].MLSV_TO_YMD.slice(4).replace(/(\d{2})(\d{2})/, '$1월 $2일')}</div>
            </div>
        )
        arr.push(element)
    }
    
    return (
        <>
            {arr}
        </>
    )
}