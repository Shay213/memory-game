import './App.css'
import { useState } from 'react'
import createRandomCards from './utils/createRandomCards';

function App() {
  console.log(createRandomCards());
  return (
    <div className="App">
    </div>
  )
}

export default App
