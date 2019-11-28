import React from 'react'

export function Task({ task, _id, onRemove, onSave }) {
	const [input, setInput] = React.useState('')
	const [editing, setEditing] = React.useState(false)

	function handleChange(e) {
		setInput(e.target.value)
	}

	function handleSave() {
		onSave(_id, input)
		setEditing(false)
	}

	function handleEdit() {
		setInput(task)
		setEditing(true)
	}

	return (
		<div>
			{!editing && task}
			{editing && <input type="text" value={input} onChange={handleChange} />}
			<button className="edit" onClick={editing ? handleSave : handleEdit}>
				{editing ? 'Save' : 'Edit'}
			</button>
			<button className="delete" onClick={() => onRemove(_id)}>
				Remove
			</button>
		</div>
	)
}
