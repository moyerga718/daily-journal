import React from "react";
import { useState, useEffect } from "react"
import "./EntryList.css"

export const Entry = ({ entry, mood, onEditButtonClick, onDeleteButtonClick }) => {
  const [entryTags, setEntryTags] = useState([])

  useEffect(
    () => {
      setEntryTags(entry?.tags) 
    },
    []
  )

  const getMessageType = () => {
    if (mood) {
      switch (mood.label) {
        case 'Angry':
          return 'is-danger'
        case 'Happy':
          return 'is-success'
        case 'Ok':
          return 'is-warning'
        case 'Sad':
          return 'is-primary'
        default:
          break;
      }
    }
  }

  return (
    <article className={`message ${getMessageType()}`} style={{width:"100%"}}>
      <div className="message-body">
        <p className="entry__concept">{entry.concept}</p>
        <p className="entry__entry">{entry.entry}</p>
        <p className="entry__date">{entry.date}</p>
        <p className="entry__mood">Mood: {entry?.mood?.label}</p>
        <p className="entry__tag__title">Tags: </p>
        <div className="entry__tag__container">
          {
            (entryTags)
            ? <>
            {
              entryTags.map( tag => (
                <div className="tag-div">{tag?.name}</div>
              ))
            }

            </>
            : <></>
          }
        </div>
        <div className="buttons">
          <button className={`button ${getMessageType()} is-outlined`} onClick={
            () => {
              onEditButtonClick(entry.id)
            }
          }>Edit</button>
          <button className={`button ${getMessageType()}`} onClick={
            () => {
              onDeleteButtonClick(entry.id)
            }
          }>Delete</button>
        </div>
      </div>
    </article>
  )
};
