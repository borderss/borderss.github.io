import { useEffect, useState } from "react"
import { getUser, loginUser, logoutUser, registerUser } from "../static/util"
import AuthSection from "./AuthSection"
import Boards from "./boards"

function App() {
  const [authStatus, setAuthStatus] = useState()

  let user = getUser()

  useEffect(() => {
    if (user && user.access_token) {
      setAuthStatus("logged_in")
    } else if (authStatus != "register") {
      setAuthStatus("login")
    }
  }, [authStatus])

  const handleFormSubmit = (e, submitType) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    function authStateCallback(state) {
      setAuthStatus(state)
    }

    console.log(submitType)

    switch (submitType) {
      case "logged_in":
        logoutUser(authStateCallback("login"))
        break

      case "login":
        loginUser(data.email, data.password, authStateCallback("logged_in"))
        break

      case "register":
        registerUser(
          data.username,
          data.email,
          data.password,
          authStateCallback("login")
        )
        break

      default:
        break
    }
  }

  const handleAuthState = (state) => {
    setAuthStatus(state)
    ;[...document.querySelectorAll(".form-field")].forEach((e) => {
      e.reset()
    })
  }

  return (
    <>
      <div className="title-bar">
        <div>
          <h1>Roadmap</h1>
          <AuthSection
            mode={authStatus}
            handleFormSubmit={handleFormSubmit}
            handleAuthState={handleAuthState}
          />
        </div>
        <br />
        <a href="https://www.isaacnc.com/" target="_blank">
          By Isaac N.C. <span>Visit website</span>
        </a>
      </div>
      <div className="content-field">
        {authStatus == "logged_in" ? (
          <Boards />
        ) : (
          <p>Please register or sign in.</p>
        )}
      </div>
    </>
  )
}

export default App