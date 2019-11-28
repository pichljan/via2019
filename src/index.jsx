// The imports are handled by react
// The result is single file with the dependencies injected into code
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'

import './style.css'

ReactDOM.render(<App />, document.getElementById('app'))
