import React, { useState, useEffect } from "react"

export const EntryForm = ({ entry, moods, tags, onFormSubmit }) => {
    const [editMode, setEditMode] = useState(false)
    const [updatedEntry, setUpdatedEntry] = useState(entry)
    const [tagBooleans, setTagBooleans] = useState([false,false,false,false])
    const [selectedTags, setSelectedTags] = useState([])

    useEffect(() => {
        setUpdatedEntry(entry)
        if ('id' in entry) {
            setEditMode(true)
        }
        else {
            setEditMode(false)
        }
    }, [entry])

    useEffect(
        () => {
            let selectedTagIds = []
            for (let i = 1; i<5; i++) {
                if (tagBooleans[i-1] === true) {
                    selectedTagIds.push(i)
                }
            }
            setSelectedTags(selectedTagIds)
        },
        [tagBooleans]
    )

    useEffect(
        () => {
            let entryCopy = {...updatedEntry}
            entryCopy.tags = selectedTags
            setUpdatedEntry(entryCopy)
        },
        [selectedTags]
    )

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry = { ...updatedEntry }
        newEntry[event.target.name] = event.target.value
        setUpdatedEntry(newEntry)
    }

    const handleTagBoolChange = (tagId) => {
        const boolCopy = [...tagBooleans]
        if (boolCopy[(tagId) - 1] === false) {
            boolCopy[(tagId) - 1] = true
        } else {
            boolCopy[(tagId) - 1] = false
        }
        setTagBooleans(boolCopy)
    }


    const constructNewEntry = () => {
        const copyEntry = { ...updatedEntry }
        copyEntry.moodId = parseInt(copyEntry.moodId)
        if (!copyEntry.date) {
            copyEntry.date = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
        }
        onFormSubmit(copyEntry)
        setTagBooleans([false,false,false,false])
    }

    return (
        <article className="panel is-info">
            <h2 className="panel-heading">{editMode ? "Update Entry" : "Create Entry"}</h2>
            <div className="panel-block">
                <form style={{ width: "100%" }}>
                    <div className="field">
                        <label htmlFor="concept" className="label">Concept: </label>
                        <div className="control">
                            <input type="text" name="concept" required autoFocus className="input"
                                proptype="varchar"
                                placeholder="Concept"
                                value={updatedEntry.concept}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="entry" className="label">Entry: </label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                name="entry"
                                value={updatedEntry.entry}
                                onChange={handleControlledInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="moodId" className="label">Mood: </label>
                        <div className="control">
                            <div className="select">
                                <select name="moodId"
                                    proptype="int"
                                    value={updatedEntry.moodId}
                                    onChange={handleControlledInputChange}>
                                    <option value="0">Select a mood</option>
                                    {moods.map(m => (
                                        <option key={m.id} value={m.id}>
                                            {m.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="tagId" className="label">Tags</label>
                        <div className="control">
                            <div className="checkboxes">
                                {
                                    tags.map(tag => (
                                        <div>
                                            <p>{tag.name}</p>
                                            <input
                                                type="checkbox"
                                                id="topping"
                                                name="topping"
                                                value={tag.id}
                                                onChange={() => handleTagBoolChange(tag.id)}
                                                checked={tagBooleans[(tag.id) - 1]}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit"
                                onClick={evt => {
                                    evt.preventDefault()
                                    constructNewEntry()
                                }}
                                className="button is-link">
                                {editMode ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </article>
    )
}
