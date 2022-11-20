import { DBdata } from "../../../public/type"

export let schoolData: DBdata = {
    schoolname: "",
    year: 0,
    class: 0,
    login: 0,
};

export const addLocalData = (data:DBdata) => {
    localStorage.setItem('obj', JSON.stringify(data))
}