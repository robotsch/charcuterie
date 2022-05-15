import { useState } from 'react'
import './App.scss'

import MenuItem from './components/MenuItem'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MenuItem></MenuItem>
    </div>
  )
}

export default App
