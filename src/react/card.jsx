import React from "react";

function card(props) {
  const handleDragStart = (e, key) => {
    document.getElementById(props.id).style.filter = "blut(4px)"

    console.log("dragstart: ", key)
    e.dataTransfer.setData("key", key)
  }

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

  let target
  const handleDragEnter = (e) => {
    if (e.target.classList.contains("board") || e.target.parentElement.classList.contains("board")) {
      target = e.target.closest(".board")
    } else if(e.target.classList.contains("card") || e.target.parentElement.classList.contains("card")) {
      target = e.target.closest(".card")
    }

    target.setAttribute("style", `background-color: var(--${props.color}); outline: 2px dashed var(--outline); transform: scale(1.05); transition: transform 0.5s`)
  }

  const handleDragLeave = (e) => {
    if (e.target.classList.contains("board") || e.target.parentElement.classList.contains("board")) {
      target.setAttribute("style", `background-color: var(--${props.color}); transition: 0.5s`)
    } else if(e.target.classList.contains("card") || e.target.parentElement.classList.contains("card")) {
      target.setAttribute("style", `background-color: var(--${props.color}); transition: transform 0.5s`)
    }
  }

  const handleDragEnd = (e) => {
    document.querySelectorAll(".card").forEach(card => {
      card.style.removeProperty('outline')
      card.style.removeProperty('transform')
    })
    document.querySelectorAll(".board").forEach(board => {
      board.style.removeProperty('outline')
      board.setAttribute("style", `background-color: var(--gray); transition: box-shadow 0.5s, transform 0.5s`)
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
    onDragEnd={e => handleDragEnd(e)}>
      {cardContent}
    </div>
  )
}

export default card