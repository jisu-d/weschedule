import { useRef } from "react";

import { addLocalData, schoolData } from './local_data'

let proxy = '';

if (import.meta.env.DEV) {
    proxy = '/api'
}

export function Button(this: string) {
    const inputRef = useRef(null);

    const onclick = async () => {
        if(schoolData.year && schoolData.class && schoolData.schoolname){
            if(schoolData.year < 0 || schoolData.class < 0){
                alert('학교와 학년을 다시 입력해 주세요')
            } else{//존재 하는학교 반이 맞는지 확인
                const da = await (await fetch(`${proxy}/checkSchool?school=${schoolData.schoolname}&Year=${(schoolData.year)}&class=${schoolData.class}`)).text()
    
                let tf: true | false
    
                if(da === 'true'){
                    tf = true
                } else {
                    tf = false
                }

                if(tf){
                    schoolData.login++
                    addLocalData(schoolData)
                    location.href = '/'
                } else {
                    alert('존재하지 않습니다.')
                }
            }
            
        }
    }
        
    return (
        <>
        <button onClick={onclick}>검색</button>
        </>
    );
}