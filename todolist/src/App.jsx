import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { MdOutlineDone } from "react-icons/md";
import { PiTrashSimple } from "react-icons/pi";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [completedTask, setCompletedTask] = useState([]);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Load completed tasks from localStorage on initial render
  useEffect(() => {
    const savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    setCompletedTask(savedCompletedTasks);
  }, []);

  // Save completed tasks to localStorage whenever completedTask state changes
  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTask));
  }, [completedTask]);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  }

  const submitTasks = (e) => {
    e.preventDefault();
    setTasks([...tasks, inputValue]);
    setInputValue('');
  }

  const handleDelete = (index) => {
    const newTodos = [...tasks];
    newTodos.splice(index, 1);
    setTasks(newTodos);
  }

  const handleComplete = (index) => {
    const completedTaskItem = tasks[index];
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setCompletedTask([...completedTask, completedTaskItem]);
  };

  const handleDeleteCompleted = (index) => {
    const newTodos = [...completedTask];
    newTodos.splice(index, 1);
    setCompletedTask(newTodos);
  }

  const numberOfTasks = tasks.length;
  const numberOfCompletedTasks = completedTask.length;

  return (
    <Task>
      <form className='input_box' onSubmit={submitTasks}>
        <input type="text" placeholder='Add new task' value={inputValue} onChange={handleInputValue} />
        <button type='submit'>+</button>
      </form>

      <p>{`Tasks to do : ${numberOfTasks}`}</p>

      <div className='task_to_do'>
        {tasks.map((todo, index) => (
          <div className='task' key={index}>
            {todo}
            <div className='task_icons'>
              <MdOutlineDone onClick={() => handleComplete(index)} className='done' />
              <PiTrashSimple onClick={() => handleDelete(index)} className='delete' />
            </div>
          </div>
        ))}
      </div>

      <div className='task_status'>
        <p>{`Completed Tasks :  ${numberOfCompletedTasks}`}</p>
        <div>
          {completedTask.map((todo, index) => (
            <div className='task_done' key={index}>
              <p>{todo}</p>
              <div className='task_icons'>
                <PiTrashSimple onClick={() => handleDeleteCompleted(index)} className='delete' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Task>
  )
}

export default App


const Task = styled.div`

p{
  color:white;
}
.input_box{
  display: flex;
  gap: 20px;
  margin-bottom: 60px;
}

.input_box input{
  padding: 10px 20px;
  width: 380px;
  font-size: 1rem;
  border-radius: 10px;
  border: 2px solid #3E1671;
  color: grey;
  outline: #3E1671;
  cursor: pointer;
  background-color: transparent;
  
}

.input_box button{
  height: 40px;
  width: 40px;
  font-size: 2rem;
  border-radius: 10px;
  cursor: pointer;
  background-color: #9d85bc;
  color: white;
  border: none;
  transition: 0.5s ease;
}

.input_box button:hover{
  background-color: #5f3c8e;
}

.task_to_do{
  
}

.task_to_do p{
  color: white;
}

.task_to_do .task{
  background-color: #15101C;
  padding:20px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  margin-bottom: 16px;
  color: #9E78CF;
}

.task_to_do .task .task_icons{
  display: flex;
  column-gap: 10px;
  font-size: 1.5rem;
}

.task_to_do .task .task_icons .done, .delete{
  cursor: pointer;
  color: #9E78CF;
  font-size: 1.5rem;
}
.task_to_do .task .task_icons .done:hover,.delete:hover{
  color:#3E1671;
}

.task_status p{
  color: white;
}

.task_status .task_done{
  background-color: #15101C;
  padding:10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
}
.task_status .task_done p{
  color: #78CFB0;
text-decoration: line-through;
}

`