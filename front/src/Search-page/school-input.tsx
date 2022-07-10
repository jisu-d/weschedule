import React, { useRef, useState } from "react";

import { schoolData } from './local_data'

let proxy = '';

if(import.meta.env.DEV){
    proxy = '/api'
}

const fetchSchoolList = async (school:string) => {
    const da = await (await fetch(`${proxy}/schoolList?school=${school}`)).json() as [number, string, string, number][];
    return da
}

let Debounce: NodeJS.Timeout

export function School_Search_Input(this: string) {
    const inputRef = useRef(null);
    
    let [arr, setArr]  = useState<JSX.Element[] | JSX.Element>([])
    
    const onChange: React.ChangeEventHandler = async (e) => {
        const tar = e.currentTarget;
        if(!(tar instanceof HTMLInputElement)) return;
        schoolData.schoolname = tar.value
        if (Debounce) {
            clearTimeout(Debounce);
        }
        Debounce = setTimeout(async () => {
            const d = await fetchSchoolList(tar.value)
            
            if (d) {
                setArr(d.map((v, i) => (<div key={`list-${i}`}>{v[2]}</div>)))
            } else {
                setArr(<div></div>)
            }
        }, 800);
    }
    
    const onClick = (e:React.MouseEvent<HTMLDivElement>) => {
        const tar = e.currentTarget;
        if(!(e.target instanceof HTMLDivElement)) return;
        schoolData.schoolname = e.target.textContent
        inputRef.current.value = e.target.textContent;
        setArr([])
    }
        
    return (
        <div>
            <input onChange={onChange} placeholder='학교' ref={inputRef} type='text' />
            <div className="school-list" onClick={onClick}>
                {arr}
            </div>
        </div>
    );
}