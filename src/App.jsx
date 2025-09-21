import { useState } from 'react'
import ProductCard from './components/productCard'

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    /*<>
        { <div className="h-[700px] w-[700px] bg-gray-200 border-[5px] flex justify-center items-center "> 
        <div className="h-[600px] w-[600px] relative bg-yellow-400 flex flex-col justify-center items-center">
         <div className="h-[100px] w-[100px] bg-red-400">
       </div>
         <div className="h-[100px] w-[100px] fixed bottom-0 left-0 bg-blue-400" >
         </div>
           <div className="h-[100px] w-[100px] absolute bg-green-400 top-[5px] right-[5px]">
           </div>
          <div className="h-[100px] w-[100px] bg-purple-400">
           </div>
          
           </div>
         </div>

     }  
      

      <div className=" w-[500px] h-[500px] border-[3px] flex justify-center items-center">
        
      <div className ="w-[300px] h-[150px] bg-yellow-300 flex justify-center items-center relative">
       <h1 classname = "text-black">
           Hello World
        </h1>
       <button className ="bg-red-900 absolute top-[0px] right-[0px]" > X </button>
       <button className="bg-green-400 fixed bottom-[0px] left-[0px]"> OK </button>
        </div>
        </div>  
     


     </> */

     <BrowserRouter>
      <div className="w-full h-[100vh] bg-red-900">
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/register" element={<h1>Register Page</h1>} />
          <Route path="/admin" element={<h1>Admin Page</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
