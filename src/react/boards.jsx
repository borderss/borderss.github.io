import React, { useEffect, useState } from "react"
import card from "./card"
import Card from "./card"

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

    let originBoard =  strRegex.exec(cardKey)[0]
    let originId = numRegex.exec(cardKey)[0]

    let targetBoard = e.target.closest(".board").id
    let targetId = numRegex.exec(e.target.closest(".card").id)[0]
    
    let currData = Object.assign({}, data)

    let entry = currData[originBoard].splice(originId, 1)[0]

    currData[targetBoard].splice(targetId, 0, entry)

    console.log(currData)
    setData(currData)
  }

  // setData(fakeFetch())

  return (
    <div className={"boards"}>
      <div id={"backlog"} className={"board"} onDragOver={e=>handleDragOver(e)} onDrop={e=>handleBoardDrop(e)}>
        <h2>Backlog</h2>
        <div className={"card-container droppable"} onDragOver={e=>handleDragOver(e)} onDrop={e=>handleCardDrop(e)}>
          {genCards(data.backlog, "backlog")}
        </div>
      </div>
      <div id={"todo"} className={"board"} onDragOver={e=>handleDragOver(e)} onDrop={e=>handleBoardDrop(e)}>
        <h2>To do</h2>
        <div className={"card-container droppable"} onDragOver={e=>handleDragOver(e)} onDrop={e=>handleCardDrop(e)}>
          {genCards(data.todo, "todo")}
        </div>
      </div>
      <div id={"inprogress"} className={"board"} onDragOver={e=>handleDragOver(e)} onDrop={e=>handleBoardDrop(e)}>
        <h2>In progress</h2>
        <div className={"card-container droppable"} onDragOver={e=>handleDragOver(e)} onDrop={e=>handleCardDrop(e)}>
          {genCards(data.inprogress, "inprogress")}
        </div>
      </div>
      <div id={"designed"} className={"board"} onDragOver={e=>handleDragOver(e)} onDrop={e=>handleBoardDrop(e)}>
        <h2>Designed</h2>
        <div className={"card-container droppable"} onDragOver={e=>handleDragOver(e)} onDrop={e=>handleCardDrop(e)}>
          {genCards(data.designed, "designed")}
        </div>
      </div>
    </div>
  )
}
