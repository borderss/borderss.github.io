import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getUserTasks, createTask, deleteTask, createLabel, deleteLabel, getUser } from "../static/util"
import Card from "./card"

var data = await getUserTasks()

function board(props) {
  const [taskData, setTaskData] = useState([])
  const [labelData, setLabelData] = useState([])
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    fetchUserTasks()
  }, [])

  useEffect(() => {
    genBoardCards()
  }, [taskData])

  async function fetchUserTasks() {
    if (getUser()) {
      var localTasks = new Array()

      data.tasks.forEach((task) => {
        if(task.board_id == props.id){
          localTasks.push(task)
        }
      })

      setTaskData(localTasks)
    }
  }

  let target 

  const genBoardCards = () => {
    let tempData = new Array()

    if (taskData) {
      taskData.forEach((task) => {
        tempData.push(
          <Card
            key={task.id}
            id={task.id}
            board_id={props.id}
            title={task.title}
            desc={task.desc}
            color={task.color}
            labels={task.labels}
            onCardDelete={handleCardDelete}
          />
        )
      })

      setTasks(tempData)
    }
  }

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

  let cardsData = tasks.length > 0 ? tasks : (
    <div className={"empty-card-hint"}>
      Drop a card here!
    </div>
  )

  document.querySelectorAll(".board").forEach(board => {
    board.style.removeProperty('outline')
    board.setAttribute("style", `background-color: var(--gray); transition: box-shadow 0.5s, transform 0.5s`)
  })

  const handleToggleAddCard = (event)=> {
    document.querySelectorAll(".addCard").forEach(e => {
      if (e != event.target.parentElement.parentElement.querySelector(".addCard")) {
        e.classList.add("hidden")
      }
    })
    event.target.parentElement.parentElement.querySelector(".addCard").classList.toggle("hidden")
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    let field = e.target
    let labelInput = field.querySelector("[name='label']")

    let form = e.target.closest("form")

    if (labelInput == document.activeElement) {
      if (labelInput.value != "" && labelInput.value.replace(/\s/g, '').length) {
        let container = field.querySelector(".labelContainer")
        let newTag = document.createElement("p")
        newTag.innerHTML = labelInput.value

        labelData.push(labelInput.value)
        setLabelData(labelData)

        container.append(newTag)
        labelInput.value = ""

        newTag.addEventListener("click", () => {
          newTag.remove()

          labelData.splice(labelData.indexOf(labelInput.value), 1)
          console.log(labelData)

          setLabelData(labelData)
        })
      }
    } else {
      let formData = Object.fromEntries(new FormData(form))
      
      if (formData.title == "") {
        alert("Title field must be filled.")
      } else {
        let cardData = await createTask(props.id, formData.title, formData.description, formData.color, labelData)

        taskData.push(cardData.data)
        setTaskData(taskData)
        genBoardCards()

        form.reset()
        setLabelData(new Array())

        field.querySelector(".labelContainer").innerHTML = ""
      }
    }
  }

  const handleCardDelete = (card_id) => {
    taskData.forEach(task => {
      if (task.id == card_id) {
        taskData.splice(taskData.indexOf(task), 1)

        setTaskData(taskData)
        genBoardCards()

        deleteTask(card_id)
      }
    })
  }

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
      <h2>{props.title} <span onClick={e => handleToggleAddCard(e)} className="toggleAddCard">+</span></h2>

      <form className="addCard hidden" action="" onSubmit={event => handleFormSubmit(event)} >
        <input name="title" placeholder="Title.." pattern="[a-zA-Z0-9 ]+"/>
        <textarea name="description" placeholder="Description.." pattern="[a-zA-Z0-9 ]+"></textarea>
        <div className="labels">
          <div className="labelContainer">
          </div>
          <div className="labelInsert">
            <input name="label" placeholder="New label..." maxLength="28" pattern="[a-zA-Z0-9 ]+"/>
            <span>Card color</span>
            <input type="color" name="color" className="color-picker" defaultValue="#7678D1"/>
          </div>
        </div>
        <button className="submitCreateCard">Create</button>
      </form>
      <div className={"cardContainer"}>
        {cardsData}
      </div>
    </div>
  )
}

export default board