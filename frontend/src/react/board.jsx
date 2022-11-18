import React from "react";

function board(props) {
  let target 

  const DragEnter = (e) => {
    if (e.target.classList.contains("board")) {
      target = e.target

      target.setAttribute("style", `box-shadow: 0px 20px 100px 0px #252525; background-color: var(--gray); outline: 2px dashed var(--board-outline); transform: translateY(5px); transition: box-shadow 0.5s, transform 0.5s`)
      return
    }
  }

  const DragLeave = () => {  
    target.style.removeProperty('outline')
    target.setAttribute("style", `background-color: var(--gray); transition: box-shadow 0.5s, transform 0.5s`)
  }

  const DragEnd = () => {
    document.querySelectorAll(".board").forEach(board => {
      board.style.removeProperty('outline')
      board.setAttribute("style", `background-color: var(--gray); transition: box-shadow 0.5s, transform 0.5s`)
    })
  }

  let cardsData = props.taskData.length > 0 ? props.taskData : (
    <div className={"empty-card-hint"}>
      Drop a card here!
    </div>
  )

  document.querySelectorAll(".board").forEach(board => {
    board.style.removeProperty('outline')
    board.setAttribute("style", `background-color: var(--gray); transition: box-shadow 0.5s, transform 0.5s`)
  })

  return (
    <div 
    id={props.id} 
    className={"board"} 
    onDragOver={props.dragOver} 
    onDrop={props.onDrop}
    onDragEnter={e => DragEnter(e)}
    onDragLeave={_ => DragLeave()}
    onDragEnd={_ => DragEnd()}
    >
      <h2>{props.title}</h2>
      <div className={"card-container"}>
        {cardsData}
      </div>
    </div>
  )
}

export default board