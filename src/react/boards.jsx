import React, { useEffect, useState } from "react"
import Card from "./card"
import Board from "./board"

export default function Boards() {
  const [data, setData] = useState(
    {
      backlog: [
        {
          title: "Twilio integration",
          desc: "Create new note via SMS. Support text, audio, links, and media.",
          color: "pink",
        },
        {
          title: "Markdown support",
          desc: "Markdown shorthand converts to formatting",
          tag: "Formatting",
          color: "purple",
        },
      ],
      todo: [
        {
          title: "Audio recording in note",
          desc: "Show audio in a note and playback UI",
          tag: "Note interface",
          color: "purple",
        },
        {
          title: "Tablet view",
          color: "red",
        },
        {
          title: "Bookmark in note",
          desc: "Show rich link UI in a note, and feature to render website screenshot",
          tag: "Note interface",
          color: "purple",
        },
        {
          title: "Image viewer",
          desc: "Opens when clicking on the thumbnail in the list or on the image in the note",
          color: "purple",
        },
      ],
      inprogress: [
        {
          title: "Mobile view",
          desc: "Functions for both web responsive and native apps. Note: Android and iOS will need unique share icons",
          color: "red",
        },
        {
          title: "Desktop view",
          desc: "PWA for webiste and native apps. Note: Windows and Mac will need unique share icons.",
          color: "red",
        },
        {
          title: "Formatting options",
          desc: "Mobile formatting bar expands and collapses when tapping the format icon.",
          color: "blue",
        },
        {
          title: "Media in note",
          desc: "Image & video with player UI",
          tag: "Note interface",
          color: "purple",
        },
      ],
      designed: [
        {
          title: "Audio recording",
          desc: "Interface for when recording a new audio note",
          tag: "New note",
          color: "green",
        },
        {
          title: "Bookmarking",
          desc: "Interface for when creating a new link note.",
          tag: "New note",
          color: "green",
        },
        {
          title: "Mobile home screen",
          desc: "Folders, tags, and notes lists are sorted by recent.",
          color: "blue",
        },
      ]
    }
  )

  const fakeFetch = () => {
    return {
      backlog: [
        {
          title: "Twilio integration",
          desc: "Create new note via SMS. Support text, audio, links, and media.",
          color: "pink",
        },
        {
          title: "Markdown support",
          desc: "Markdown shorthand converts to formatting",
          tag: "Formatting",
          color: "purple",
        },
      ],
      todo: [
        {
          title: "Audio recording in note",
          desc: "Show audio in a note and playback UI",
          tag: "Note interface",
          color: "purple",
        },
        {
          title: "Tablet view",
          color: "red",
        },
        {
          title: "Bookmark in note",
          desc: "Show rich link UI in a note, and feature to render website screenshot",
          tag: "Note interface",
          color: "purple",
        },
        {
          title: "Image viewer",
          desc: "Opens when clicking on the thumbnail in the list or on the image in the note",
          color: "purple",
        },
      ],
      inprogress: [
        {
          title: "Mobile view",
          desc: "Functions for both web responsive and native apps. Note: Android and iOS will need unique share icons",
          color: "red",
        },
        {
          title: "Desktop view",
          desc: "PWA for webiste and native apps. Note: Windows and Mac will need unique share icons.",
          color: "red",
        },
        {
          title: "Formatting options",
          desc: "Mobile formatting bar expands and collapses when tapping the format icon.",
          color: "blue",
        },
        {
          title: "Media in note",
          desc: "Image & video with player UI",
          tag: "Note interface",
          color: "purple",
        },
      ],
      designed: [
        {
          title: "Audio recording",
          desc: "Interface for when recording a new audio note",
          tag: "New note",
          color: "green",
        },
        {
          title: "Bookmarking",
          desc: "Interface for when creating a new link note.",
          tag: "New note",
          color: "green",
        },
        {
          title: "Mobile home screen",
          desc: "Folders, tags, and notes lists are sorted by recent.",
          color: "blue",
        },
      ],
    }
  }

  const genCards = (board, boardName) => {
    const output = new Array()

    for (let i = 0; i < board.length; i++) {
      const card = board[i];

      if (!card.tag && !card.desc) {
        output.push(<Card key={i} id={boardName + i} title={card.title} color={card.color}/>)
      } else if (!card.tag && card.desc) {
        output.push(<Card key={i} id={boardName + i} title={card.title} desc={card.desc} color={card.color}/>)
      } else if(card.tag && card.desc) {
        output.push(<Card key={i} id={boardName + i} title={card.title} desc={card.desc} tag={card.tag} color={card.color}/>)
      }
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
    let currData = Object.assign({}, data)

    let originBoard = strRegex.exec(cardKey)[0]
    let originId = numRegex.exec(cardKey)[0]
    let entry = currData[originBoard].splice(originId, 1)[0]

    let targetBoard = e.target.closest(".board").id


    if (e.target.classList.contains("board") || e.target.parentElement.classList.contains("board")) {
      currData[targetBoard].splice(0, 0, entry)
    } else if(e.target.classList.contains("card") || e.target.parentElement.classList.contains("card")) {
      currData[targetBoard].splice(numRegex.exec(e.target.closest(".card").id)[0], 0, entry)
    }

    setData(currData)
  }

  // setData(fakeFetch())

  return (
    <div className={"boards"}>
      <Board id={"backlog"} title={"Backlog"} data={genCards(data.backlog, "backlog")} dragOver={e=>handleDragOver(e)} onDrop={e=>handleCardDrop(e)}/>
      <Board id={"todo"} title={"To do"} data={genCards(data.todo, "todo")} dragOver={e=>handleDragOver(e)} onDrop={e=>handleCardDrop(e)}/>
      <Board id={"inprogress"} title={"In progress"} data={genCards(data.inprogress, "inprogress")} dragOver={e=>handleDragOver(e)} onDrop={e=>handleCardDrop(e)}/>
      <Board id={"designed"} title={"Designed"} data={genCards(data.designed, "designed")} dragOver={e=>handleDragOver(e)} onDrop={e=>handleCardDrop(e)}/>
    </div>
  )
}
