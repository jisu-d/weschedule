import React, { useRef } from "react";

import { schoolData } from './local_data'


export function Year_Search_Input(this: string) {
    const onChange: React.ChangeEventHandler = async (e) => {
        const tar = e.currentTarget;
        if(!(tar instanceof HTMLInputElement)) return;
        schoolData.year = Number(tar.value)
    }
        
    return (
        <>
        <input onChange={onChange} type="number" placeholder='학년' />
        </>
    );
}