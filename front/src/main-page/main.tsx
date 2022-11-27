import React from 'react'
import ReactDOM from 'react-dom/client'
import './cook_check'

import { Table } from './Table'
import { InfoDiv } from './user-div'
import { CookDiv } from './Cook-div'
import { MsgDiv } from './msg'
import { MyoungEonDiv } from './helpful_test'
import { Sky_div } from './Sky_div'

import { Href } from './user-div'
import { Href2, Href3 } from './helpful_test'

import { Kakao_ad_fit } from './kakao'

import { School_schedule_Dday } from './school_schedule'

// import { MyApp } from './school_schedule'

import './index.css'

const app = document.getElementById('app');

ReactDOM.createRoot(app).render(
  <React.StrictMode>
    <main>
      <div>
        <div>
          <div className="user-info-container" id="user-info-container" onClick={Href}>
            <InfoDiv />
          </div>
        </div>
        <div className="SkyDiv-container box_shadow">
          <Sky_div />
        </div>
        <div className="timetable-container box_shadow" id="timetable-container">
          <Table size={7} />
        </div>
        <div className="cooktable-container box_shadow" id="cooktable-container">
          <CookDiv />
        </div>
        {/* <div className='google_adsense box_shadow'>
            <AdsensebyGoogleDiv />
        </div> */}
        {/* <div>
          <MyApp />
        </div> */}
        <div className='school_schedule box_shadow' onClick={Href3}>
          <School_schedule_Dday />
        </div>
        <div className='myoungEon-container box_shadow' onClick={Href2}>
          <MyoungEonDiv />
        </div>
        <div className='kakaoAdfit-container box_shadow' >
          {/* <Kakao_ad_fit /> */}
        </div>
        <div className='side-comment-container box_shadow'>
          <MsgDiv/>
        </div>
      </div>
    </main>
  </React.StrictMode>
)
