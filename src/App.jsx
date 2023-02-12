// https://chat.openai.com/chat/896c1d74-fe2f-4cb2-bffc-45a9c6c96672
import React, { useEffect, useState } from 'react'
import './App.css'

function TodoApp() {
  // const [todos, setTodos] = useState([
  //   { text: 'Learn React', completed: false },
  //   { text: 'Learn CSS', completed: false },
  //   { text: 'Learn HTML', completed: false }
  // ])

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  )

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const newTodos = [...todos, { text, completed: false }]
    setTodos(newTodos)
  }

  const removeTodo = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  const completeTodo = (index) => {
    const newTodos = [...todos]
    newTodos[index].completed = true
    setTodos(newTodos)
  }

  return (
    <div className='todo-app'>
      <h1>Todo List</h1>
      <div className='todo-list'>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )
}

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className='todo'>
      <div className='todo-text' onClick={() => completeTodo(index)}>
        {todo.text}
      </div>
      <button onClick={() => removeTodo(index)} className='delete-button'>
        Delete
      </button>
    </div>
  )
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value) return
    addTodo(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      <input
        type='text'
        className='input'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type='submit' className='add-button'>
        Add
      </button>
    </form>
  )
}

export default TodoApp
