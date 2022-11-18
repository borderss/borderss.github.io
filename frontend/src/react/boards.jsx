import React, { useEffect, useState } from "react"
import { getBoards, getUser } from "../static/util"
import Board from "./board"

export default function Boards() {
  const [boards, setBoards] = useState([])
  const [result, setResult] = useState([])

  async function fetchBoards() {
    if (getUser()) {
      var boardData = await getBoards()
      setBoards(boardData)
    }
  }

  const genBoards = () => {
    let output = new Array()

    if (boards && boards.data) {
      boards.data.forEach((board, index) => {
        output.push(
          <Board
            key={index}
            id={board.id}
            title={board.name}
            dragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleCardDrop(e)}
          />
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

    if (
      e.target.classList.contains("board") ||
      e.target.parentElement.classList.contains("board")
    ) {
      currData[targetBoard].splice(0, 0, entry)
    } else if (
      e.target.classList.contains("card") ||
      e.target.parentElement.classList.contains("card")
    ) {
      currData[targetBoard].splice(
        numRegex.exec(e.target.closest(".card").id)[0],
        0,
        entry
      )
    }

    setData(currData)
  }

  useEffect(() => {
    fetchBoards()
  }, [])
  
  return (
    <div className={"boards"}>
      {genBoards()}
    </div>
  )
}
