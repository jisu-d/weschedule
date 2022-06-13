import React, { useRef } from "react";

import { addLocalData } from './local_data'

import { schoolData } from './addData'

let proxy = '';

if (import.meta.env.DEV) {
    proxy = '/api'
}

export function Button(this: string) {
    const inputRef = useRef(null);

    const onclick = async () => {
        if(schoolData.year < 0 && schoolData.class < 0){
            alert('학교와 학년을 다시 입력해 주세요')
        } else{//존재 하는학교 반이 맞는지 확인
            const da = await (await fetch(`${proxy}/checkSchool?school=${schoolData.schoolname}&Year=${(schoolData.year)}&class=${schoolData.class}`)).text()

            let ch: true | false

            if(da === 'true'){
                ch = true
            } else {
                ch = false
            }

            if(!ch){// 이거 false true 값으로 지정 해주는 함수 찾기 임시로 json() 으로 대체
                addLocalData(schoolData)
            } else{
                alert('존재하지 않습니다.')
            }
        }
    }
        
    return (
        <>
        <button onClick={onclick}>클릭해줘요.</button>
        </>
    );
}