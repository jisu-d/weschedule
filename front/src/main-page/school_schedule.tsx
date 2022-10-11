import './school_schedule.css'
import { EVLILF } from '../../../public/type';
import { useEffect, useState } from 'react';
import { proxy } from "../proxy";

import { localda } from '../Search-page/local_data'

const changeDay = (i:number) => {
  const Day = new Date()
  Day.setDate(Day.getDate() + Number(i))
  const y: string = `${Day.getFullYear()}`.padStart(2, '0');
  const m: string = `${Day.getMonth() + 1}`.padStart(2, '0');
  const d: string = `${Day.getDate()}`.padStart(2, '0');

  return `${y}${m}${d}`
}

const da:EVLILF[] = await (await fetch(`${proxy}/schoolSchedule?school=${localda.schoolname}&startDay=${changeDay(0)}&lastDay=${changeDay(200)}`)).json()

export function School_schedule_Dday() {
  let [arr, setArr] = useState<JSX.Element>();
  let arr2: JSX.Element[] = []

  const Ddayelement = () => {
    arr2 = []
    da.forEach((_v) => {
      const date = new Date();
      const masTime = new Date(`${_v.day.start.slice(0, 4)}-${_v.day.start.slice(4, 6)}-${_v.day.start.slice(6, 8)}`);
      const diff = masTime.getTime() - date.getTime();
      const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
      arr2.push(
        <div>
          <span>{_v.eventName} </span>
          <span>D-{diffDay + 1}</span><br/>
        </div>
      )
    })

    setArr(
      <>
        {arr2}
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
    Ddayelement()
  }, []);

  return (
    <div>
      <div className='title d'>학사일정 D-Day</div>
      <div className='D-day-container'>
          {arr}
      </div>
    </div>
  )
}