import React from 'react'
import ReactDOM from 'react-dom/client'

import { CalendarDiv } from './Calender-div'

const app = document.getElementById('app');

ReactDOM.createRoot(app).render(
  <React.StrictMode>
      <CalendarDiv />
  </React.StrictMode>
)