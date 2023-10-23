import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Game from './components/Game'
import "./app.css"

function App() {
  const [show, setShow] = useState(false)
  const [hiddenBtn, setHidenBtn] = useState(false)
  const handleShow = () => {
    setShow(!show)
    setHidenBtn(true)
  }
  return (
    <div className='app'>
      <h1 className='title' hidden={hiddenBtn}>TIC-TAC-TOE GAME</h1>
      <button hidden={hiddenBtn} className='btn-play' onClick={handleShow}>Play</button>
      {show && <Game />}
    </div>
  )
}

export default App
