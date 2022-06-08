import React from 'react'
import ReactDOM from 'react-dom/client'
import './local_data'

import { Table } from './Table'
import { InfoDiv } from './user-div'
import { CookDiv } from './Cook-div'
import { MsgDiv } from './msg'


import './index.css'

const app = document.getElementById('app');

ReactDOM.createRoot(app).render(
  <React.StrictMode>
    <main>
      {/*<a href="/page/">page로 가기</a>*/}
      <div>
        <div>
          <div className="user-info-container" id="user-info-container">
            <InfoDiv />
          </div>
        </div>
        <div className="timetable-container box_shadow" id="timetable-container">
          {<Table size={7} />}
        </div>
        <div className="cooktable-container box_shadow" id="cooktable-container">
          <CookDiv />
        </div>
      </div>
    </main>
    <div className='side-comment-container'>
      <MsgDiv/>
    </div>
  </React.StrictMode>
)
