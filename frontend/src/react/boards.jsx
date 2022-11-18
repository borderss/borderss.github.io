import React, { useEffect, useState } from "react"
import { getBoards, getUser, getUserTasks } from "../static/util"
import Card from "./card"
import Board from "./board"

export default function Boards() {
  const [tasks, setTasks] = useState([])

  const [boards, setBoards] = useState([])

  async function fetchBoards() {
    if (getUser()) {
      var result = await getBoards()      
      setBoards(result)
    }
  }

  async function fetchUserTasks() {
    if (getUser()) {
      var taskData = await getUserTasks()
      setTasks(taskData.tasks)
    }
  }

  const genBoards = () => {
    let taskDataArr = {
      1: [],
      2: [],
      3: [],
      4: []
    }

    if (tasks) {
      tasks.forEach((task) => {
        console.log(task)
        if (!task.labels && !task.desc) {
          taskDataArr[task.board_id].push(<Card key={task.id} id={task.id} title={task.title} color={task.color}/>)
        } else if (!task.labels && task.desc) {
          taskDataArr[task.board_id].push(<Card key={task.id} id={task.id} title={task.title} desc={task.desc} color={task.color}/>)
        } else if(task.labels && task.desc) {
          taskDataArr[task.board_id].push(<Card key={task.id} id={task.id} title={task.title} desc={task.desc} color={task.color} labels={task.labels}/>)
        }
      })
    }

    let output = new Array()

    if (boards && boards.data) {
      boards.data.forEach((board, index) => {
        output.push(
          <Board 
          key={index}
          id={board.id}
          taskData={taskDataArr[board.id]}
          title={board.name} 
          dragOver={e=>handleDragOver(e)} 
          onDrop={e=>handleCardDrop(e)}/>
        )
      })
    }

    return output
  }
  
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleCardDrop = (e) => {
    const strRegex = /([^\d]+)/
    const numRegex = /([\d]+)/

    let cardKey = e.dataTransfer.getData("key")
    if (cardKey == "") {
      useForceRefresh()
      return
    }

    let originBoard = strRegex.exec(cardKey)[0]
    let originId = numRegex.exec(cardKey)[0]

    let currData = Object.assign({}, data)
    let entry = currData[originBoard].splice(originId, 1)[0]
    
    let targetBoard = e.target.closest(".board").id


    if (e.target.classList.contains("board") || e.target.parentElement.classList.contains("board")) {
      currData[targetBoard].splice(0, 0, entry)
    } else if(e.target.classList.contains("card") || e.target.parentElement.classList.contains("card")) {
      currData[targetBoard].splice(numRegex.exec(e.target.closest(".card").id)[0], 0, entry)
    }

    setData(currData)
  }

  useEffect(() => {
    fetchBoards()
    fetchUserTasks()
  }, [])
  

  // <div id="backlog" class="new-card hidden">
  //   <form method="post" >
  //     <input name="title" placeholder="Title.." required pattern="[a-zA-Z0-9 ]+">
  //     <textarea name="description" placeholder="Description.." pattern="[a-zA-Z0-9 ]+"></textarea>
  //     <input type="hidden" name="labels" value="{}">
  //     <input type="hidden" name="board" value="backlog">
  //     <input type="hidden" name="backlogBoard" value="backlog">
  //     <div class="labels">
  //       <div>
  //       </div>
  //       <div>
  //         <input name="label" placeholder="New label..." maxlength="28" pattern="[a-zA-Z0-9 ]+">
  //         <span>Card color</span>
  //         <input type="color" name="color" class="color-picker" value="#7678D1">
  //       </div>
  //     </div>
  //     <button class="submitCreateCard" name="submit">Create</button>
  //   </form>
  // </div>

  return (
    <div className={"boards"}>
      {genBoards()}
    </div>
  )
}
