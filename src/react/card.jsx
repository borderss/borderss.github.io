import React from "react";

function card(props) {
  const handleDragStart = (e, key) => {
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

  return (
    <div id={props.id} draggable className="card draggable" style={{"backgroundColor": `var(--${props.color})`}} onDragStart={e => handleDragStart(e, props.id)}>
      {cardContent}
    </div>
  )
}

export default card