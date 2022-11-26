import { useEffect } from 'react';
import './kakao.css'

export function Kakao_ad_fit1() {
    const element = (
        <>
            <ins className="kakao_ad_area"
            style={{
                display:"none"
            }}
            data-ad-unit = "DAN-vi152nWx4gPzYI1E"
            data-ad-width = "300"
            data-ad-height = "250">
            </ins>
        </>
    )
    return element
}

export function Kakao_ad_fit(){
    useEffect(()=>{
      let ins = document.createElement('ins');
      let scr = document.createElement('script');
      ins.className = 'kakao_ad_area';
      ins.style.display = "none;";
      ins.style.width = '100%'
      scr.async = true;
      scr.type = "text/javascript";
      scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
      ins.setAttribute('data-ad-width','320');
      ins.setAttribute('data-ad-height','100');
      ins.setAttribute('data-ad-unit','DAN-vi152nWx4gPzYI1E');
      document.querySelector('.adfit > div').appendChild(ins);
      document.querySelector('.adfit > div').appendChild(scr);
    }, [])    
    
    
    return(
        <>
            <div className="title d">오늘 정보</div>
            <div className="adfit">
                <div></div>
            </div>
        </>
    );
  }