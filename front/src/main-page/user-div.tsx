import {localda} from '../local_data'

import './user-div.css';

export function InfoDiv(){
    // const element = (
    //     <>
    //     <div className='school-container'>
    //         <div>{localda.schoolname}</div>
    //         <div className='arrow'></div>
    //     </div>
    //     <div>
    //         <span>{localda.year + '학년 '}</span>
    //         <span>{localda.class + '반'}</span>
    //     </div>
    //     </>
    // )
    // return element
    const element = (
        <>
        <div className='school-container'>
            <div>{localda.schoolname}</div>
            <div className='arrow'></div>
        </div>
        <div>
            <span>{localda.year + '학년 '}</span>
            <span>{localda.class + '반'}</span>
        </div>
        </>
    )
    return element
}

export function Href() {
    location.href = '/login/'
}