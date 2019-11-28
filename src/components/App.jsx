import React from 'react'
import { Task } from './Task'
import axios from 'axios'

export const App = () => {
	const [input, setInput] = React.useState('Hello world')
	const [init, setInit] = React.useState(false)
	const [tasks, setTasks] = React.useState([{ _id: 1, text: 'Task 1' }])

	React.useEffect(() => {
		if (!init) {
			axios.get('http://localhost:5000/', {headers: {'Accept': 'application/json'}} )
    		.then(response => { console.log(response); setTasks(JSON.parse(response.data)) })
			setInit(true)
		}

  	});


	function handleChange(e) {
		setInput(e.target.value)
	}

	function handleAdd() {
		setTasks([
			{ id: Math.max(...tasks.map(t => t._id)) + 1, text: input },
			...tasks
		])
		const response = axios.post(
		  'http://localhost:5000/new',
		  { "text": input },
		  { headers: { 'Content-Type': 'application/json' } }
		)
		console.log(response.data)
	}

	function handleRemove(id) {
		setTasks(
			tasks.filter(function(task) {
				return task._id !== id
			})
		)
	}

	function handleSave(id, text) {
		setTasks(
			tasks.map(function(task) {
				if (task._id === id) {
					return { _id: id, text: text }
				}
				return task
			})
		)
	}

	return (
		<div>
			<input type="text" onChange={handleChange} value={input} />
			<button onClick={handleAdd}>Add task</button>
			<div className="list">
				{tasks.map(function(task) {
					return (
						<Task
							task={task.text}
							_id={task._id}
							key={task._id}
							onSave={handleSave}
							onRemove={handleRemove}
						/>
					)
				})}
			</div>
		</div>
	)
}
