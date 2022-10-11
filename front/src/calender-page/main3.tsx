import React from 'react'
import ReactDOM from 'react-dom/client'

import { Calender } from './Calender-div'

const app = document.getElementById('app');

ReactDOM.createRoot(app).render(
  <React.StrictMode>
    <main>
      <Calender />
    </main>
  </React.StrictMode>
)