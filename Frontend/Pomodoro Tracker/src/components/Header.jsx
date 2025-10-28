import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
// import '../App.css'
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'


library.add(fas)

function Header() {
  return (
    <div className='flex justify-between w-lg mt-10 border-b-2 border-black-50 p-4'>
     <div className='w-1/3 flex'>
       <FontAwesomeIcon icon="fa-solid fa-check" />
      <h2>PomoFocos</h2>
     </div>

     <div className='w-2/3 flex justify-between'>
      <button>
        <FontAwesomeIcon icon="fa-solid fa-chart-simple" /> 
        Report
      </button>
      <button>
        <FontAwesomeIcon icon="fa-solid fa-gear" />
        Settings
      </button>
      <button>
        <FontAwesomeIcon icon="fa-solid fa-user" />
        Sign in
      </button>

      <button>
        <FontAwesomeIcon icon="fa-solid fa-bars" />
      </button>
     </div>
    </div>
  )
}

export default Header
