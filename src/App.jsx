import { useState } from 'react'
import './App.css'
import Search from './components/Search'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper" />
        <header>
          <img src="src/assets/hero-img.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1> 
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      
    </main>
  )
}

export default App
