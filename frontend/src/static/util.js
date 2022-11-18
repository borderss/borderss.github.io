let api = "http://127.0.0.1:8000/api"

const apiMethod = async (endpoint = "", requestParams) => {
  const response = await fetch(api + endpoint, requestParams)
  const data = await response.json()

  return data
}

const setLS = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const getLS = (key) => {
  let value = window.localStorage.getItem(key)

  return value != undefined ? JSON.parse(value) : null
}

const removeLS = (key) => {
  window.localStorage.removeItem(key)
}

const getUser = () => {
  return getLS("user") != undefined ? getLS("user") : null
}

const getToken = () => {
  let user = getLS("user")

  if (user) {
    return user.access_token
  }
}

const loginUser = (email, password, callback = null) => {
  if (!userExists()) {
    apiMethod("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((data) => {
      setLS("user", data)
      if (callback) { callback() }
      window.location.reload()
      return data
    })
  } else {
    console.warn("Logging in with a user token")
    return null
  }
}

const registerUser = (name, email, password, callback = null) => {
  if (!userExists()) {
    apiMethod("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((data) => {
      if (callback) { callback() }
      ;[...document.querySelectorAll(".form-field")].forEach((e) => {
        e.reset()
      })
      return data
    })
  } else {
    console.warn("Registering with a user token")
    return null
  }
}

const logoutUser = (callback = null) => {
  if (userExists()) {
    let token = getToken()
    removeLS("user")
    apiMethod("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => {
      if (callback) { callback() }
      return data
    })
  } else {
    console.warn("Unauthenticated.")
    
    return null
  }
}

const userExists = () => {
  let user = getUser()
  if (user) {
    return true
  } else {
    return false
  }
}

const getBoards = () => {
  if (userExists()) {
    var data = apiMethod("/boards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })

    return data
  } else {
    console.warn("Unauthenticated.")
    return null
  }
}

const getUserTasks = () => {
  if (userExists()) {
    var data = apiMethod("/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })

    return data
  } else {
    console.warn("Unauthenticated.")
    return null
  }
}

const createTask = async (board, title, desc = null, color, labels = null) => {
  if (userExists()) {
    let data = await apiMethod("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        user_id: getUser().user.id,
        board_id: board,
        title: title,
        desc,
        labels,
        color: color
      })
    })

    return data
  } else {
    console.warn("Unauthenticated.")
    return null
  }
}

const deleteTask = (id) => {
  if (userExists()) {
    apiMethod(`/tasks/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      }
    }).then((data) => {
      return data
    })
  } else {
    console.warn("Unauthenticated.")
    return null
  }
}

const createLabel = (task_id, value) => {
  console.log(typeof(task_id), typeof(value))
  if (userExists()) {
    apiMethod("/labels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        task_id: task_id,
        value: value,
      })
    }).then((data) => {
      data
    }).catch(err => {
      console.log(err)
    })
  } else {
    console.warn("Unauthenticated.")
    return null
  }
}

const deleteLabel = (id) => {
  if (userExists()) {
    var data = apiMethod(`/labels/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((data) => {
      data
    })
  } else {
    console.warn("Unauthenticated.")
    return null
  }
}

export {
  apiMethod,
  setLS,
  getLS,
  removeLS,
  getUser,
  getToken,
  loginUser,
  registerUser,
  logoutUser,
  userExists,
  getBoards,
  getUserTasks,
  createTask,
  deleteTask,
  createLabel,
  deleteLabel
}
