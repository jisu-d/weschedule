import React, { useRef } from "react";

import { schoolData } from './local_data'

export function Class_Search_Input(this: string) {
    const onChange: React.ChangeEventHandler = async (e) => {
        const tar = e.currentTarget;
        if(!(tar instanceof HTMLInputElement)) return;
        schoolData.class = Number(tar.value)
    }
        
    return (
        <>
        <input onChange={onChange} type="number" placeholder='반'  />
        </>
    );
}