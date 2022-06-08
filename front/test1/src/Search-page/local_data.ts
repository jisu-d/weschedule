import { DBdata } from "../../../../public/type"

export const addLocalData = (data:DBdata) => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1)
    localStorage.setItem('obj', JSON.stringify(data))
    document.cookie = `id=${data.schoolname}; expires=${d.toUTCString()};`;
}