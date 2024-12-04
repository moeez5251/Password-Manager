import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Manager from './components/Manager'
import Footer from './components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Manager />
      {/* <Footer/> */}
    </>
  )
}

export default App
