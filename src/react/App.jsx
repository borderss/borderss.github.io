import { useState } from 'react'
import Title from './title'
import Boards from './boards'

function App() {
  return (
    <div className='content-field'>
      <Title/>
      <Boards/>
    </div>
  )
}

export default App
