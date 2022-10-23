import "./Calender-div.css"

import React, { useEffect, useState } from "react";

let date = new Date();

const yearData = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    return (`${viewYear}년 ${viewMonth + 1}월`)
}

export function CalendarDiv() {
    let [arr, setArr] = useState<JSX.Element>()

    const renderCalendar = () => {
        const viewYear = date.getFullYear();
        const viewMonth = date.getMonth();

        const prevLast = new Date(viewYear, viewMonth, 0);
        const thisLast = new Date(viewYear, viewMonth + 1, 0);

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
            dates2.push(<div className="date" ><span className={condition} >{date}</span></div>);
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

        setArr(<>{dates2.join('')}</>)

    }

    const prevMonth = () => {
        date.setDate(1);
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    }

    const nextMonth = () => {
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
                <div className="dates">{arr}</div>
            </div>
        </div>
    )
}