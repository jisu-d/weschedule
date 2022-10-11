import './Calender-div.css'
import React, { useState, useEffect } from 'react';


const Dayname = ['일', '월', '화', '수', '목', '금', '토']
function DaysTable(date:Date){
    const arr:JSX.Element[] = [];
    const lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    console.log(lastDay);
    for(let i = 0 ; i < 5 ; i++){
        for(let j = 0 ; j < Dayname.length ; j++){

        }
    }
    
    // return(

    // )
}

const firstTable = () => {
    const arr:JSX.Element[] = []
    Dayname.map((v, i) => arr.push(<td key={`first-${i}`}>{v}</td>))
    
    return(
        <tr>
            <td></td>
            {arr}
        </tr>
    )
}

export function Calender() {
    let [arr, setArr] = useState<JSX.Element>();
    let [date, setDate] = useState<Date>(new Date());

    const makeTable = () => {
        setArr(
            <>
                <div className='heder'>
                    <button onClick={leftBtn}>&lsaquo;</button>
                    <div className='Day'>{date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일</div>
                    <button onClick={rightBtn}>&rsaquo;</button>
                </div>
                <div className='calender-div'>
                    <table>
                        <tbody>
                            {firstTable()}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

    const leftBtn = () => {
        setDate(new Date(date.setMonth(date.getMonth() - 1)))
        makeTable()
        DaysTable(date)
    }

    const rightBtn = () => {
        setDate(new Date(date.setMonth(date.getMonth() + 1)))
        makeTable()
        DaysTable(date)
    }

    useEffect(() => {
        setArr(
            <div className='loading' >
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
        makeTable()
    }, [])

    return(
        <>
            {arr}
        </>
    )
}