import './Sky_div'
import { sever_Sky, Skydata } from '../../../public/type';

import { proxy } from "../proxy";
import React, { useEffect } from "react";

let la = 0
let lo = 0

navigator.geolocation.getCurrentPosition((pos) => {
    la = pos.coords.latitude
    lo = pos.coords.longitude
})

const apiKey = 'd931b3df313d8586e334f45873e59273'
const da: Skydata = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lo}&appid=${apiKey}&lang=kr`)).json()

let skyImg: string
let temp: number
let description: string
let feelsLike: number
// useEffect(() => {
//     skyImg = `http://openweathermap.org/img/wn/${da.weather[0].icon}@2x.png`
//     temp = da.main.temp
//     description = da.weather[0].description
//     feelsLike = da.main.feels_like
// }, [da])

export function Sky_div() {

    const element = (
        <div>
            <div>
                <img src={`http://openweathermap.org/img/wn/${da.weather[0].icon}@2x.png`} />
                <div>{da.main.temp}°C</div>
            </div>
            <div>현재온도 {da.weather[0].description}도</div>
            <div>{da.main.feels_like}</div>
        </div>
    )

    useEffect(() => {
        return () => {
            element
        }
    }, [element])

    return (
        <div>
            <div>
                <img src={skyImg} />
                <div>{temp}°C</div>
            </div>
            <div>현재온도 {description}도</div>
            <div>{feelsLike}</div>
        </div>
    )
}