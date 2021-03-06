import {localda} from './localda';

import './user-div.css';

export function InfoDiv(){
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
    location.href = '/page/'
}