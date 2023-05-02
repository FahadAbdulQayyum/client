import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const App = () => {

  const [msg, setMsg] = useState()
  const [msgArr, setMsgArr] = useState([])

  useEffect(() => {
  }, [msgArr])

  const onSend = async (e) => {
    e.preventDefault();

    console.log('message sent', msg)
    msgArr.push(msg + ' l')
    setMsgArr(...[msgArr])

    let respond = await axios.post('http://localhost:3001/userMsg',
      {
        "to_number": '923232846250',
        "message": msg,
        "type": 'text',
        "prev": msgArr[msgArr.length - 2]
      }
    )
    console.log('respond', respond)
    msgArr.push(respond.data.reply + ' r')
    setMsgArr(...[msgArr])
    setMsg('')
  }

  return (
    <div>
      <form>
        <h1>Talk to ChatBot!</h1>
        <div
          className='float'
        >
          {msgArr.map((v, i) => <div
            className={`${v[v.length - 1] === 'l' ? 'left floa' : 'right'}`}
            key={i}
          >
            {v.slice(0, v.length - 1)}
          </div>)}
        </div>
        <div className="d-flex align-items-center mt-3">
          <div className="form-group">
            <label htmlFor="userMessage">Type Your Message</label>
            <input type="text" className="form-control" id="userMessage" value={msg} placeholder="Your Message Here" onChange={e => setMsg(e?.target?.value)} />
          </div>
          <button type="submit" className="btn btn-primary h-25 ml-2 mt-3" onClick={(e) => onSend(e)}>Send</button>
        </div>
      </form>
    </div>
  )
}

export default App
