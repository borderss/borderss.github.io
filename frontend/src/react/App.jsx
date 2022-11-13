import { useState } from 'react'
import Boards from './boards'

function App() {
  return (
    <>
      <div className="title-bar">
        <h1>Roadmap</h1>
        <a href="https://www.isaacnc.com/" target="_blank">
          By Isaac N.C. <span>Visit website</span>
        </a>
      </div>
      <div className='content-field'>
        <Boards/>
      </div>
    </>
  )
}

export default App
