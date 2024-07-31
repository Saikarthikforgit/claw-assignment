/* eslint-disable react/button-has-type */
// src/Home.js
import React, {useState} from 'react'
import './index.css'
import Header from '../Header' // Import the Header component

function Home() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem('todoList')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  const [todoInput, setTodoInput] = useState('')

  const handleAddTodo = () => {
    if (todoInput === '') {
      alert('Enter Valid Text')
      return
    }

    const newTodo = {
      text: todoInput,
      uniqueNo: Date.now(),
      completed: false,
    }

    const updatedTodoList = [...todoList, newTodo]
    setTodoList(updatedTodoList)
    setTodoInput('')
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList))
  }

  const handleDeleteTodo = id => {
    const updatedTodoList = todoList.filter(todo => todo.uniqueNo !== id)
    setTodoList(updatedTodoList)
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList))
  }

  const handleToggleTodo = id => {
    const updatedTodoList = todoList.map(todo =>
      todo.uniqueNo === id ? {...todo, completed: !todo.completed} : todo,
    )
    setTodoList(updatedTodoList)
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList))
  }

  return (
    <div className="todos-bg-container">
      <Header /> {/* Render the Header component */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="create-task-heading">
              Create <span className="create-task-heading-subpart">Task</span>
            </h1>
            <input
              type="text"
              value={todoInput}
              onChange={e => setTodoInput(e.target.value)}
              className="todo-user-input"
              placeholder="What needs to be done?"
            />
            <button className="button" onClick={handleAddTodo}>
              Add
            </button>
            <h1 className="todo-items-heading">
              My <span className="todo-items-heading-subpart">Tasks</span>
            </h1>
            <ul className="todo-items-container">
              {todoList.map(todo => (
                <li
                  key={todo.uniqueNo}
                  className="todo-item-container d-flex flex-row"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.uniqueNo)}
                    className="checkbox-input"
                  />
                  <div className="label-container d-flex flex-row">
                    <label
                      className={`checkbox-label ${
                        todo.completed ? 'checked' : ''
                      }`}
                    >
                      {todo.text}
                    </label>
                    <div className="delete-icon-container">
                      <li
                        className="far fa-trash-alt delete-icon"
                        onClick={() => handleDeleteTodo(todo.uniqueNo)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
