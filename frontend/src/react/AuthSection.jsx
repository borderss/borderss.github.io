import React, { useEffect, useRef } from "react"

export default function AuthSection(props) {
  const handleClick = (e) => {
    if (e.target.parentElement) {
      e.target.parentElement
        .querySelector(".form-field")
        .classList.toggle("hidden")
    }
  }

  const profileBtnRef = useRef(null)

  function useOutsideAlert(ref) {
    useEffect(() => {
      function windowClickEventHandler(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (!ref.current.contains(event.target.querySelector("img"))) {
            ref.current.classList.add("hidden")
            ;[...document.querySelectorAll(".form-field")].forEach((e) => {
              e.reset()
            })
          }
        }
      }

      document.addEventListener("mousedown", windowClickEventHandler)
      return () => {
        document.removeEventListener("mousedown", windowClickEventHandler)
      }
    }, [ref])
  }

  useOutsideAlert(profileBtnRef)

  var form

  if (props.mode == "logged_in") {
    form = (
      <form
        ref={profileBtnRef}
        className="form-field hidden"
        onSubmit={(e) => props.handleFormSubmit(e, "logged_in")}
      >
        <button type="submit">Sign out</button>
      </form>
    )
  } else if (props.mode == "login") {
    form = (
      <form
        ref={profileBtnRef}
        className="form-field hidden"
        onSubmit={(e) => props.handleFormSubmit(e, "login")}
      >
        <h3>Login</h3>
        <input
          type="text"
          name="email"
          autoComplete="email"
          placeholder="example@gmail.com"
        />
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="password..."
        />
        <button type="submit">Log in</button>
        <p>
          Alternatively,{" "}
          <span onClick={() => props.handleAuthState("register")}>
            register.
          </span>
        </p>
      </form>
    )
  } else if (props.mode == "register") {
    form = (
      <form
        ref={profileBtnRef}
        className="form-field hidden"
        onSubmit={(e) => props.handleFormSubmit(e, "register")}
      >
        <h3>Registration</h3>
        <input
          type="text"
          name="username"
          autoComplete="username"
          placeholder="username"
        />
        <input
          type="text"
          name="email"
          autoComplete="email"
          placeholder="example@gmail.com"
        />
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="password..."
        />
        <button type="submit">Register</button>
        <p>
          Alternatively,{" "}
          <span onClick={() => props.handleAuthState("login")}>log in.</span>
        </p>
      </form>
    )
  }

  return (
    <div className="profile">
      <img
        src="/svg/profile.svg"
        onClick={(e) => handleClick(e)}
        alt="Profile"
      />
      {form}
    </div>
  )
}
