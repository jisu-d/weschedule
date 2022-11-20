import React, { useRef, useState } from "react";

import { schoolData } from './local_data'

import { proxy } from "../proxy";

const fetchSchoolList = async (school:string) => {
    if(school !== ''){
        const da = await (await fetch(`${proxy}/schoolList?school=${school}`)).json() as [number, string, string, number][];
        
        return da
    } else{
        return []
    }
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

            if (d[0]) {
                setArr(d.map((v, i) => (
                <div key={`list-${i}`} className="school-list-arr">
                    <div>{v[1]}</div>
                    <div>{v[2]}</div>
                </div>
                )))
            } else{
                setArr(<div className="msg2">검색이 되지 않을시 <strong>"정확한 정보"</strong>을 입력후에 <strong>검색 버튼</strong>을 눌러주세요.</div>)
            }
        }, 500);
    }

    const onClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if(!(e.target instanceof HTMLDivElement)) return;
        if(e.target.textContent.length > 2 && e.target.textContent !== '검색이 되지 않아도 정확한 학교 학년 반을 입력후에 검색 버튼을 눌러주세요.'){
            schoolData.schoolname = e.target.textContent
            inputRef.current.value = e.target.textContent;
            setArr([])
        }
    }
        
    return (
        <div>
            <input onChange={onChange} placeholder='학교이름' ref={inputRef} type='text' />
            <div className="school-list" onClick={onClick}>
                {arr}
            </div>
        </div>
    );
}