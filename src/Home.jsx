import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./App.css";


function Home() {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <h1>HELLO in AkhmimGPT</h1>
      <button className='feature' onClick={() => navigate("/text")}>Want to generate text</button>
      <button className='feature' onClick={() => navigate("/image")}>Want to generate image</button>
      <button className='feature' onClick={() => navigate("/chat")}>Want to generate chat</button>
      <button className='feature' onClick={() => navigate("/transcription")}>Want to generate transcription</button>
          </div>
  )
}

export default Home
