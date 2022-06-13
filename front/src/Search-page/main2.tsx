import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './local_data'

import {School_Search_Input} from './school-input'
import {Year_Search_Input} from './year-input'
import {Class_Search_Input} from './class-input'
import {Button} from './button'

const app = document.getElementById('app');


ReactDOM.createRoot(app).render(
  <React.StrictMode>
    <main>
        <div>
          <div className='box_shadow serch-input'>
            <div className='title'>학교 찾기</div>
            <div className='small-title'>학교와 학년을 입력해주세요.</div>
            <div className='input-container'>
              {<School_Search_Input />}
              {<Year_Search_Input />}
              {<Class_Search_Input />}
              {<Button />}
            </div>
          </div>
        </div>
    </main>
  </React.StrictMode>
)

