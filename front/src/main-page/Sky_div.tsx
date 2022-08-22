import './Sky_div.css'
import { sever_Sky, Skydata } from '../../../public/type';
import React, { useEffect, useState } from "react";

// const getPosition = () => {
//     let la = 0
//     let lo = 0

//     navigator.geolocation.getCurrentPosition((pos) => {
//         la = pos.coords.latitude
//         lo = pos.coords.longitude
//     })

//     return { la: la, lo: lo }
// }

export function Sky_div() {
    let la = 0
    let lo = 0
    let [da, setDa] = useState<Skydata>(null);
    let [arr, setArr] = useState<JSX.Element>();
    const getData = async () => {
        const apiKey = 'd931b3df313d8586e334f45873e59273'
        const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lo}&appid=${apiKey}&units=metric&lang=kr`)).json();
        setDa(data);
    }
    useEffect(() => {
        setArr(
            <div className='loading' >
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
        navigator.geolocation.getCurrentPosition((pos) => {
            la = pos.coords.latitude
            lo = pos.coords.longitude
            getData();
            setArr(
                <>
                    <div className='img_temp_container'>
                        <img src={`http://openweathermap.org/img/wn/${da?.weather[0].icon}@2x.png`} />
                        <div>{Math.floor(da?.main.temp)}°C</div>
                    </div><div className='small_info'>
                        <div>
                            <div>체감온도 {Math.floor(da?.main.feels_like)}°</div>
                            <div>{Math.floor(da?.main.temp_max)}°/{Math.floor(da?.main.temp_min)}°</div>
                        </div>
                        <div>
                            <div>습도 {da?.main.humidity}%</div>
                            <div>{da?.weather[0].description}</div>
                        </div>
                    </div>
                </>
            );
        })
    }, []);

    return (
        <div className='container'>
            {arr}
        </div>
    )
}