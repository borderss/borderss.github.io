import { useState } from 'react';
import AuthSection from './AuthSection';
import Boards from './boards';

function App() {
  const [authStatus, setAuthStatus] = useState("logged_in");
  
  const handleFormSubmit = (e, submitType) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    formProps["submitType"] = submitType
    console.log(formProps)
  }

  const handleAuthState = (state) => {
    setAuthStatus(state)
    ;[...document.querySelectorAll(".form-field")].forEach(e => {
      e.reset()
    })
    console.log(state)
  }

  return (
    <>
      <div className="title-bar">
        <div>
          <h1>Roadmap</h1><AuthSection mode={authStatus} handleFormSubmit={handleFormSubmit} handleAuthState={handleAuthState}/>
        </div>
        <br/>
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
