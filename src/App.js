import { isEmpty, size } from 'lodash';
import React, { useState, useEffect } from 'react'
import shortid from 'shortid';
import { addDocument, getCollection, updateDocument, deleteDocument } from './actions';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
   (async () =>{
     const result = await getCollection('tasks');
     if(result.statusResponse){
        setTasks(result.data);
     } else {
       setError(result.error);
     } 
     
   })()
  }, [])

  const validForm = () =>{
    let isValid = true;
    setError('');
   
    if(isEmpty(task)){
      setError('Debes ingresar una tarea');
      isValid = false;     
    }

    return isValid;

  }

  const addTaks = async (e) =>{
    e.preventDefault(); 

    if(!validForm()){
      return;
    }  
   
    const result = await addDocument('tasks', {name: task});

    if(!result.statusResponse)
    {
      setError(result.error);
      return;
    }   
    setTasks([ ...tasks, { id: result.data.id, name: task } ]);
    setTask("");        
  }

  const deleteTask = async(id) => {

    const result = await deleteDocument('tasks', id);
    if(!result.statusResponse){
      setError(result.error);
      return;
    } 
    const filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
    if(filteredTasks.length === 0){
      setTask("")
    }
    
  }

  const editTask = (task) =>{
    setEditMode(true);
    setId(task.id);
    setTask(task.name);    
  }

  const saveTask = async(e) => {
    e.preventDefault();
    
    if(!validForm()){
      return;
    } 

    const result = await updateDocument('tasks', id, {id: id, name: task});
    if(!result.statusResponse){
      setError(result.error);
      return;
    }  
    const editedTask = tasks.map(item => item.id === id ? {id, name: task} : item);
      
    setTasks(editedTask);
    setTask("");
    setEditMode(false);
    setId("");
  }

  return (
    <div className='container mt-5'>
      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
            <h4 className="text-center">Lista de Tareas</h4>
            { 
              (size(tasks) === 0) ? (
                  <li className="list-group-item">Aun no hay tareas Programadas</li>
              ) : (
                <ul className="list-group">
                {
                  // eslint-disable-next-line array-callback-return
                  tasks.map((x) => 
                    <li className="list-group-item" key={x.id}>
                      
                      <span className="lead">{x.name}</span>
                      <button 
                          className="btn btn-danger btn-sm float-right mx-2"
                          onClick={() => deleteTask(x.id)}>
                            Eliminar
                      </button>
                      <button 
                        className="btn btn-warning btn-sm float-right"
                        onClick={() => editTask(x)}
                        >
                          Editar
                      </button>
                    </li>
                  )                
                }
              </ul>
              ) 
              
            }
        </div>
        <div className="col-4">
        <h4 className="text-center">{editMode ? "Modificar Tarea" :"Agregar Tarea"}</h4>
          <form onSubmit={editMode ? saveTask : addTaks}>
            
            <input type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea.."
              onChange={text => setTask(text.target.value)}
              value={task}
            />
            
          
            <button 
                className = {editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"} 
                type="submit"
                 >
                  {editMode ? "Guardar" :"Agregar"}
            </button><br/>
            {
              error && <span className='text-danger'>{error}</span>
            }
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default App;
