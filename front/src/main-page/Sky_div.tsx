import './Sky_div'
import { sever_Sky, Skydata } from '../../../public/type';

import { proxy } from "../proxy";


// navigator.geolocation.getCurrentPosition(async (pos) => {
//     const la = pos.coords.latitude
//     const lo = pos.coords.longitude
//     if(la !== 0 && lo !== 0){
//         da = await(await fetch(`${proxy}/Skydata?x=${la}&y=${lo}`)).json()
//     }
// })

// export function Sky_div() {
//     const arr:JSX.Element[] = []
//     da.data.map((v:string) => arr.push(<div>{v}</div>))
//     return(
//         <div>
//             <div>
//                 {arr}
//             </div>
//         </div>
//     )
// }

let la = 0
let lo = 0

navigator.geolocation.getCurrentPosition((pos) => {
    la = pos.coords.latitude
    lo = pos.coords.longitude
})

let arr: JSX.Element
const SkyDiv = async () => {
    const apiKey = 'd931b3df313d8586e334f45873e59273'
    const da: Skydata = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lo}&appid=${apiKey}&lang=kr`)).json()
    const imgUrl = `http://openweathermap.org/img/wn/${da.weather[0].icon}@2x.png`

    arr = (
        <div>
            <div>
                <img src={imgUrl} />
                <div>{da.weather[0].description}°C</div>
            </div>
            <div>현재온도 {da.main.feels_like}도</div>
            <div>{da.weather[0].description}</div>
        </div>
    )
}


export function Sky_div() {
    SkyDiv()
    return (
        arr
    )
}