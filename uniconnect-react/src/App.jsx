import React from 'react'
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

function App() {

  return (
    <>
    <div className='relative w-screen h-screen bg-[#0A7177] flex'>
      <div className='h-20 w-screen bg-[#184648] flex flex-row'>
        <div className='static self-center-safe'>
          <button className='bg-[#FF9D5E] pr-20 pl-20 pt-3 pb-3 mt-10 text-4xl text-[#ffe19a] rounded-4xl shadow-xl/50 shadow-[#210c03] justify-center justify-items-center self-center'>
            <h1 className='text-xl font-bold'>Open your mind, new reader</h1>
          </button>

          <button className='bg-[#FF9D5E] pr-20 pl-20 pt-3 pb-3 mt-10 text-4xl text-[#ffe19a] rounded-4xl shadow-xl/50 shadow-[#210c03] justify-center justify-items-center self-center'>
            <h1 className='text-xl font-bold'>Open your mind, new reader</h1>
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
