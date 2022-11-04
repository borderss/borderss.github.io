import React from "react";

function board(props) {
  let target 

  const DragEnter = (e) => {
    if (e.target.classList.contains("board")) {
      target = e.target

      target.setAttribute("style", `box-shadow: 0px 20px 100px 0px #252525; background-color: var(--gray); outline: 2px dashed var(--board-outline); transform: translateY(5px); transition: box-shadow 0.5s, transform 0.5s`)
      return
    }
    
    if (e.target.classList.contains("card-container")) {
      target = e.target.parentNode

      target.setAttribute("style", `box-shadow: 0px 20px 100px 0px #252525; background-color: var(--gray); outline: 2px dashed var(--board-outline); transform: translateY(5px); transition: box-shadow 0.5s, transform 0.5s`)
    }
  }

  const DragLeave = (e) => {  
    target.style.removeProperty('outline')
    target.setAttribute("style", `background-color: var(--gray); transition: box-shadow 0.5s, transform 0.5s`)
  }

  const DragEnd = (e) => {
    document.querySelectorAll(".board").forEach(board => {
      board.style.removeProperty('outline')
      board.setAttribute("style", `background-color: var(--gray); transition: box-shadow 0.5s, transform 0.5s`)
    })
    document.querySelectorAll(".card").forEach(card => {
      card.style.removeProperty('outline')
      card.style.removeProperty('transform')
    })
  }

  let cardsData

  if (props.data.length != 0) {
    cardsData = props.data

  } else {
    cardsData = (
      <div className={"empty-card-hint"}>
        Drop a card here!
      </div>
    )
  }

  document.querySelectorAll(".board").forEach(board => {
    board.style.removeProperty('outline')
    board.setAttribute("style", `background-color: var(--gray); transition: box-shadow 0.5s, transform 0.5s`)
  })
  document.querySelectorAll(".card").forEach(card => {
    card.style.removeProperty('outline')
    card.style.removeProperty('transform')
  })

  return (
    <div 
    id={props.id} 
    className={"board"} 
    onDragOver={props.dragOver} 
    onDrop={props.onDrop}
    onDragEnter={e => DragEnter(e)}
    onDragLeave={e => DragLeave(e)}
    onDragEnd={e => DragEnd(e)}
    >
      <h2>{props.title}</h2>
      <div className={"card-container"}>
        {cardsData}
      </div>
    </div>
  )
}

export default board