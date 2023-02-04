import './helpful_test.css';
import { MYOUN_DATA } from '../../../public/type';
import { useEffect, useState } from 'react';


export function MyoungEonDiv() {
    let [arr, setArr] = useState<JSX.Element>();
    const get = async () => {
        const helpful: MYOUN_DATA = await (await fetch('https://api.qwer.pw/request/helpful_text?apikey=guest')).json()
        setArr(
            <>
                {helpful[1].respond}
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
        get()
    }, []);

    return (
        <div>
            <div className='myou-container'>
                <div className='title d'>오늘의 명언</div>
                <div className='arrow'></div>
            </div>
            <div>
                {arr}
            </div>
        </div>
    )
}

export function Href2() {
    location.href = '/myounEon/'
}

export function Href3() {
    location.href = '/calender/'
}