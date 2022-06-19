import { DBdata } from "../../../public/type"

export let schoolData: DBdata = {
    schoolname: "",
    year: 0,
    class: 0
};

if(!localStorage.getItem('obj')) localStorage.setItem('obj', JSON.stringify(schoolData));

export const localda = JSON.parse(localStorage.getItem('obj')) as DBdata;

export const addLocalData = (data:DBdata) => {
    // d = new Date();
    //d.setMonth(d.getMonth() + 1)
    localStorage.setItem('obj', JSON.stringify(data))
    //document.cookie = `id=${data.schoolname}; expires=${d.toUTCString()};`;
}