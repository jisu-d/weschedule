import React from 'react'
import ReactDOM from 'react-dom/client'
import './local_data'

import { Table } from './Table'
import { InfoDiv } from './user-div'
import { CookDiv } from './Cook-div'
import { AdsensebyGoogleDiv } from './google_adsense'
import { MsgDiv } from './msg'
import { MyoungEonDiv } from './helpful_test'

import { Href } from './user-div'

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
        <div className="timetable-container box_shadow" id="timetable-container">
          <Table size={7} />
        </div>
        <div className="cooktable-container box_shadow" id="cooktable-container">
          <CookDiv />
        </div>
        {/* <div className='google_adsense box_shadow'>
            <AdsensebyGoogleDiv />
        </div> */}
        <div className='myoungEon-container box_shadow'>
          <MyoungEonDiv />
        </div>
        <div className='side-comment-container box_shadow'>
          <MsgDiv/>
        </div>
      </div>
    </main>
  </React.StrictMode>
)
