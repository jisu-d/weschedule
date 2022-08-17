import './Sky_div'
import { sever_Sky } from '../../../public/type';

import { proxy } from "../proxy";

let da:sever_Sky

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

navigator.geolocation.getCurrentPosition(async (pos) => {
    const la = pos.coords.latitude
    const lo = pos.coords.longitude
    const apiKey = 'd931b3df313d8586e334f45873e59273'
    if(la !== 0 && lo !== 0){
        const da = await(await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lo}&appid=${apiKey}&lang=kr`)).json()
        console.log(da);
        
    }
})