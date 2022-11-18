import React from "react";

function card(props) {
  let target
  let labelArr = new Array()

  if (props.labels) {
    props.labels.forEach(label => {
      labelArr.push(<p key={label.id} id={label.id} className="label">{label.value}</p>)
    })
  }

  function handleChange(e) {
      e.target.style.transition = ""
      e.target.style.height = "5px"
      e.target.style.height = e.target.scrollHeight + "px"
  }

  const handleDragStart = (e, key) => {
    e.dataTransfer.setData("key", key)
  }

  const handleDragEnter = (e) => {
    if(e.target.classList.contains("card")) {
      target = e.target.closest(".card")
    }
    target.setAttribute("style", `background-color: var(--${props.color}); outline: 2px dashed var(--outline); transform: scale(1.05); transition: transform 0.5s`)
  }

  const handleDragLeave = (e) => {
    if(e.target.classList.contains("card")) {
      target.setAttribute("style", `background-color: var(--${props.color}); transition: transform 0.5s`)
    }
  }

  const handleDragEnd = () => {
    document.querySelectorAll(".card").forEach(card => {
      card.style.removeProperty('outline')
      card.style.removeProperty('transform')
    })
  }

  return (
    <form 
    id={props.id}
    draggable 
    className="card draggable" 
    style={{backgroundColor: props.color}} 
    onDragStart={e => handleDragStart(e, props.id)}
    onDragEnter={e => handleDragEnter(e)}
    onDragLeave={e => handleDragLeave(e)}
    onDragEnd={_ => handleDragEnd()}>
      
      <input className="cardFormTitle" name="cardTitle" placeholder="Title.." required pattern="[a-zA-Z0-9 ]+" defaultValue={props.title}></input>
      {props.desc ? <textarea onInput={(e) => {handleChange(e)}} className="cardFormDesc" name="cardDescription" placeholder="Description.." pattern="[a-zA-Z0-9 ]+" defaultValue={props.desc}></textarea> : ""}
      {labelArr.length > 0 ? <div className="labelContainer">{labelArr}</div> : ""}

      <span className="hoverOptions">
        <button className="delete" name="deleteBtn" value="" type="button" onClick={(e) => {props.onCardDelete(props.id)}}>Delete card</button>
      </span>
    </form>
  )
}

export default card