import { DBdata } from "../../../public/type"

export let schoolData: DBdata = {
    schoolname: "새솔고등학교",
    year: 1,
    class: 1,
    login: 1,
};

if(!localStorage.getItem('obj')) localStorage.setItem('obj', JSON.stringify(schoolData));

export const localda = JSON.parse(localStorage.getItem('obj')) as DBdata;

export const addLocalData = (data:DBdata) => {
    localStorage.setItem('obj', JSON.stringify(data))
}