import React, { useEffect, useRef } from "react"
import { getUser, updateTask } from "../static/util"

function card(props) {
  let labelArr = new Array()
  const textAreaRef = useRef(null)

  if (props.labels) {
    props.labels.forEach((label) => {
      labelArr.push(
        <p key={label.id} id={label.id} className="label">
          {label.value}
        </p>
      )
    })
  }

  function handleChange(e, bool) {
    if (bool) {
      e.target.style.transition = ""
      e.target.style.height = "5px"
      e.target.style.height = e.target.scrollHeight + "px"
    }

    if (e.key == "Enter") {
      e.preventDefault()
      e.target.blur()

      let formData = Object.fromEntries(new FormData(e.target.closest("form")))

      console.log(
        props.id,
        props.board_id,
        getUser().user.id,
        formData.cardTitle,
        formData.cardDescription,
        props.color
      )

      updateTask(
        props.id,
        props.board_id,
        getUser().user.id,
        formData.cardTitle,
        formData.cardDescription,
        props.color
      )
    }
  }

  useEffect(() => {
    if (textAreaRef && textAreaRef.current && textAreaRef.current.style) {
      textAreaRef.current.style.transition = ""
      textAreaRef.current.style.height = "5px"
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"
    }
  })

  // const handleDragStart = (e, key) => {
  //   e.dataTransfer.setData("key", key)
  // }

  // const handleDragEnter = (e) => {
  //   if (e.target.classList.contains("card")) {
  //     target = e.target.closest(".card")
  //   }
  //   target.setAttribute(
  //     "style",
  //     `background-color: var(--${props.color}); outline: 2px dashed var(--outline); transform: scale(1.05); transition: transform 0.5s`
  //   )
  // }

  // const handleDragLeave = (e) => {
  //   if (e.target.classList.contains("card")) {
  //     target.setAttribute(
  //       "style",
  //       `background-color: var(--${props.color}); transition: transform 0.5s`
  //     )
  //   }
  // }

  // const handleDragEnd = () => {
  //   document.querySelectorAll(".card").forEach((card) => {
  //     card.style.removeProperty("outline")
  //     card.style.removeProperty("transform")
  //   })
  // }

  return (
    <form
      id={props.id}
      className="card"
      style={{ backgroundColor: props.color }}
      spellCheck="false">
      <input
        className="cardFormTitle"
        name="cardTitle"
        onKeyDown={(e) => {
          handleChange(e, false)
        }}
        placeholder="Title.."
        required
        pattern="[a-zA-Z0-9 ]+"
        defaultValue={props.title}></input>
      {props.desc ? (
        <textarea
          ref={textAreaRef}
          onKeyDown={(e) => {
            handleChange(e)
          }}
          className="cardFormDesc"
          name="cardDescription"
          placeholder="Description.."
          pattern="[a-zA-Z0-9 ]+"
          defaultValue={props.desc}></textarea>
      ) : (
        ""
      )}
      {labelArr.length > 0 ? (
        <div className="labelContainer">{labelArr}</div>
      ) : (
        ""
      )}

      <span className="hoverOptions">
        <button
          className="delete"
          name="deleteBtn"
          value=""
          type="button"
          onClick={() => {
            props.onCardDelete(props.id)
          }}>
          Delete card
        </button>
      </span>
    </form>
  )
}

export default card
