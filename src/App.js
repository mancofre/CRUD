import { isEmpty, size } from 'lodash';
import React, { useState } from 'react'
import shortid from 'shortid';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTaks = (e) =>{
    e.preventDefault();
    if(isEmpty(task)){
      console.log('el campo tarea está vacío.');
      return;
    }

    const newTak = {
      id: shortid.generate(),
      name: task
    }
   
    setTasks([ ...tasks, newTak ]);
    setTask("");
    console.log(tasks)
  }

  const deleteTask = (id) =>{
    const filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
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
                  <h5 className="text-center">Aun no hay tareas Programadas</h5>
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
                      <button className="btn btn-warning btn-sm float-right">Editar</button>
                    </li>
                  )                
                }
              </ul>
              ) 
              
            }
        </div>
        <div className="col-4">
        <h4 className="text-center">Formulario</h4>
          <form onSubmit={addTaks}>
            <input type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea.."
              onChange={text => setTask(text.target.value)}
              value={task}
            />
            <button 
                className="btn btn-dark btn-block"
                type="submit"
                >Agregar</button>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default App;
