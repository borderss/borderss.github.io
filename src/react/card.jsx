import React from "react";

function card(props) {
  let target
  let cardContent

  if (!props.tag && !props.desc) {
    cardContent = (
      <h3>{props.title}</h3>
    )
  } else if (!props.tag && props.desc) {
    cardContent = (
      <>
        <h3>{props.title}</h3>
        <p>{props.desc}</p>
      </>
    )
  } else if(props.tag && props.desc) {
    cardContent = (
      <>
        <h3>{props.title}</h3>
        <p>{props.desc}</p>
        <div>{props.tag}</div>
      </>
    )
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
    <div 
    id={props.id} 
    draggable 
    className="card draggable" 
    style={{backgroundColor: `var(--${props.color})`}} 
    onDragStart={e => handleDragStart(e, props.id)}
    onDragEnter={e => handleDragEnter(e)}
    onDragLeave={e => handleDragLeave(e)}
    onDragEnd={_ => handleDragEnd()}>
      {cardContent}
    </div>
  )
}

export default card