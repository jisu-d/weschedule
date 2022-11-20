import "./Calender-div.css"

import React, { useEffect, useState } from "react";

import { proxy } from "../proxy";

import { localda } from '../login-page/local_data'

import { EVLI } from '../../../public/type'

let date = new Date();

const yearData = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();
    
    return (`${viewYear}년 ${viewMonth + 1}월`)
}

// const changeDay = (i:number) => {
//     const Day = new Date()
//     Day.setDate(Day.getDate() + Number(i))
//     const y: string = `${Day.getFullYear()}`.padStart(2, '0');
//     const m: string = `${Day.getMonth() + 1}`.padStart(2, '0');
//     const d: string = `${Day.getDate()}`.padStart(2, '0');
  
//     return `${y}${m}${d}`
//   }

const changeDay = (date:Date) => {
    const y: string = `${date.getFullYear()}`.padStart(2, '0');
    const m: string = `${date.getMonth() + 1}`.padStart(2, '0');
    const d: string = `${date.getDate()}`.padStart(2, '0');
  
    return `${y}${m}${d}`
  }

export function CalendarDiv() {
    let [arr, setArr] = useState<JSX.Element>()
    let [day, setday] = useState<string>()
    
    const renderCalendar = async () => {
        const viewYear = date.getFullYear();
        const viewMonth = date.getMonth();
        
        const prevLast = new Date(viewYear, viewMonth, 0);
        const thisLast = new Date(viewYear, viewMonth + 1, 0);
        
        const nowDate = {
            start:changeDay(new Date(viewYear, viewMonth, 1)), 
            last:changeDay(new Date(viewYear, viewMonth + 1, 0)),
        }

        const SchoolScheduleAllData:EVLI[] = await (await fetch(`${proxy}/fetchSchoolScheduleAll?school=${localda.schoolname}&startDay=${nowDate.start}&lastDay=${nowDate.last}`)).json()
        
        const PLDate = prevLast.getDate();
        const PLDay = prevLast.getDay();

        const TLDate = thisLast.getDate();
        const TLDay = thisLast.getDay();

        const prevDates = [];
        const thisDates = [...Array(TLDate + 1).keys()].slice(1);
        const nextDates = [];

        if (PLDay !== 6) {
            for (let i = 0; i < PLDay + 1; i++) {
                prevDates.unshift(PLDate - i);
            }
        }

        for (let i = 1; i < 7 - TLDay; i++) {
            nextDates.push(i)
        }

        const dates = prevDates.concat(thisDates, nextDates);
        const dates2: JSX.Element[] = []

        const firstDateIndex = dates.indexOf(1);
        const lastDateIndex = dates.lastIndexOf(TLDate);
        dates.forEach((date, i) => {
            const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
                if(SchoolScheduleAllData.length > 0 && date === Number(SchoolScheduleAllData[0].day.slice(6))){
                    dates2.push(
                        <div className="date" key={`data-date-num-${i}`}>
                            <span className={condition}>
                                {date}
                            </span>
                            <div className="eventname">{SchoolScheduleAllData[0].eventName}</div>
                        </div>
                    );
                    SchoolScheduleAllData.shift()
                } else{
                    dates2.push(<div className="date" key={`data-date-num-${i}`}><span className={condition}>{date}</span></div>);
                }
        })

        const today = new Date();

        // if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        //     for (let date of document.querySelectorAll('.this')) {
        //         if (date.innerHTML === today.getDate()) {
        //             date.classList.add('today');
        //             break;
        //         }
        //     }
        // }

        setArr(<>{dates2}</>)

    }

    const prevMonth = () => {
        setday('')
        date.setDate(1);
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    }

    const nextMonth = () => {
        setday('')
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    }

    const goToday = () => {
        date = new Date();
        renderCalendar();
    }

    useEffect(() => {
        renderCalendar()
    }, [])

    return (
        <>
        <div className="calendar">
            <div className="header">
                <div className="year-month">{yearData()}</div>
                <div className="nav">
                    <button className="nav-btn go-prev" onClick={prevMonth}>&lt;</button>
                    <button className="nav-btn go-today" onClick={goToday}>Today</button>
                    <button className="nav-btn go-next" onClick={nextMonth}>&gt;</button>
                </div>
            </div>
            <div className="main">
                <div className="days">
                    <div className="day">일</div>
                    <div className="day">월</div>
                    <div className="day">화</div>
                    <div className="day">수</div>
                    <div className="day">목</div>
                    <div className="day">금</div>
                    <div className="day">토</div>
                </div>
                <div className="dates" onClick={(e) => {
                    const tar = e.target as HTMLDivElement;
                    if(tar.className === 'eventname'){
                        setday(tar.innerHTML)
                    } else if (tar.className === 'date' && tar.querySelector('.eventname')){
                        setday(tar.querySelector('.eventname').innerHTML)
                    }
                    
                }}>{arr}</div>
            </div>
        </div>
        <div>
            <div className="m-nav">
                <div className="m-btn" onClick={prevMonth}>&lt;</div>
                <div className="click-day">{day}</div>
                <div className="m-btn" onClick={nextMonth}>&gt;</div>
            </div>
        </div>
        </>
    )
}

const on = (e:Event) => {
    console.log(e.currentTarget);
}