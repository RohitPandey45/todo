
// import './App.css'
import { useEffect, useState } from 'react'
import {Navbar} from './navbar'
import {v4 as uuidv4} from 'uuid'


function App() {
  const [todo,setTodo]=useState("")
  const [todos,setTodos]=useState([])
  const [showFinished,setshowFinished]=useState(true)


  useEffect(()=>{
    let todostring=localStorage.getItem("todos")
    if(todostring){
      let todoss=JSON.parse(localStorage.getItem("todos"))
      setTodos(todoss)
    }

  },[])
  const saveTOLS=()=>{
    localStorage.setItem("todos",JSON.stringify(todos)) 
   }

  const toggleFinished=()=>{
    setshowFinished(!showFinished)
 } 

  const HandleEdit=(e,id)=>{
     let t= todos.filter(i=>i.id===id)
      setTodo(t[0].todo)
      let newTodos=todos.filter(item=>{
        return item.id!==id
      })
      setTodos(newTodos)
      saveTOLS()
  }
  const HandleDelete=(e,id)=>{
    let newTodods=todos.filter(item=>{
      return item.id !==id
    })
    setTodos(newTodods)
    saveTOLS()
  }

  const HandleAdd=()=>{
      setTodos([...todos,{id: uuidv4() , todo,isCompleted:false}])
      setTodo("")
      saveTOLS()
  }

  const handleChange=(e)=>{
      setTodo(e.target.value)
  }

  const handleCheckbox=(e)=>{
      let id=e.target.name
      let index=todos.findIndex(item=>{
        return item.id === id
      })

      let newtodos=[...todos]
      newtodos[index].isCompleted= !newtodos[index].isCompleted
      setTodos(newtodos)
      saveTOLS()

  }

  return (
    <>
  <Navbar/>

    
      <div className='md:bg-violet-100 container mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2'>
      <div className="addTodo my-5">
        <h2 className='font-bold ' >Add a Todo</h2>

        <input onChange={handleChange} value={todo} type="text" className='w-80' />
        <button onClick={HandleAdd} disabled={todo.length<1} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md ms-5'>Add</button>
      </div>
      <input  onChange={toggleFinished} type='checkbox' checked={showFinished}/> showFinished
      <h2 className='font-bold ' >Your Todos </h2>
      <div className="todos">
        {todos.length===0 && <div>No Todos to display</div>}
        {todos.map(item=>{

      return (showFinished || !item.isCompleted) && <div key={item.id} className='todos flex md:w-1/2 my-3 justify-between'>
        <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  />
        <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
        <div className="buttons">
      <button onClick={(e)=>HandleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 '>Edit</button>
      <button onClick={(e)=>{HandleDelete(e,item.id)}}className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md my-2 '>Delete</button>
      </div>
      </div>
       })}
      </div>


      </div>

    </>
  )
}

export default App
