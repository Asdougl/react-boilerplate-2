import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NavBar } from './features/NavBar'
import { Home } from './views/Home'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
