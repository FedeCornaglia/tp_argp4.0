"use client";
import Head from "next/head";
import Link from "next/link";
import "./home.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { createTask, getAllTasks,deleteTask,tasksAPI } from "./api/tasks";
import { Comp_1Paginaprincipal } from "./botones_ini_reg";
import { headers } from "../../next.config";
import { Content } from "next/font/google";



function Lista_Tareas() {
  const [datos, setDatos] = useState({
    
    title: "",
    description: "",
    completed: false,
    
    
   
    
   
    
  });
  const [tareas, setTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  // const [indiceEdicion, setIndiceEdicion] = useState(null);
  // const [filtro, setFiltro] = useState("");
  // const [campoOrden, setCampoOrden] = useState("titulo"); // Puede ser "titulo" o "descripcion"
  // const [ordenAscendente, setOrdenAscendente] = useState(true);
  // const [tablaOrdenada, setTablaOrdenada] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatos({ ...datos, [name]: value });
  };

  // const guardarTarea = (event) => {
  //   event.preventDefault();
  //   if (modoEdicion && indiceEdicion !== null) {
  //     const nuevasTareas = tareas.map((tarea, index) =>
  //       index === indiceEdicion ? { ...datos } : tarea
  //     );
  //     setTareas(nuevasTareas);
  //     setModoEdicion(false);
  //     setIndiceEdicion(null);
  //     setDatos({ titulo: "", descripcion: "" });
  //   } else {
  //     setTareas([...tareas, { ...datos, realizada: false }]); // Agregado: Propiedad "realizada"
  //     setDatos({ titulo: "", descripcion: "" });
  //   }
  // };

  // const editarTarea = (index) => {
  //   setModoEdicion(true);
  //   setIndiceEdicion(index);
  //   setDatos({ ...tareas[index] });
  // };

  // const toggleRealizada = (index) => {
  //   const nuevasTareas = [...tareas];
  //   nuevasTareas[index].realizada = !nuevasTareas[index].realizada;
  //   setTareas(nuevasTareas);
  // };

  // const borrarTarea = (index) => {
  //   const nuevasTareas = tareas.filter((_, i) => i !== index);
  //   setTareas(nuevasTareas);
  // };

  // const filtrarTareas = () => {
  //   let tareasFiltradas = tareas.filter((tarea) => {
  //     const lowerCasedFilter = filtro.toLowerCase();
  //     return (
  //       tarea.titulo.toLowerCase().includes(lowerCasedFilter) ||
  //       tarea.descripcion.toLowerCase().includes(lowerCasedFilter)
  //     );
  //   });

  //   if (tablaOrdenada) {
  //     tareasFiltradas = tareasFiltradas.slice().sort((a, b) => {
  //       const campoA = a[campoOrden].toLowerCase();
  //       const campoB = b[campoOrden].toLowerCase();
  //       if (campoA < campoB) {
  //         return ordenAscendente ? -1 : 1;
  //       }
  //       if (campoA > campoB) {
  //         return ordenAscendente ? 1 : -1;
  //       }
  //       return 0;
  //     });
  //   }

  //   return tareasFiltradas;
  // };

  // const tareasFiltradas = filtrarTareas();

  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      console.log(res);
      setTasks(res.data);
    }
    loadTasks();
  }, []);

  const handleSave = (event) =>  {event.preventDefault()
    if (datos.title === "") {
      console.log("error");
    } else if (datos.title != "") {
      createTask({
        ...datos,
        user: 1,
        due_data: "",
       
      });
      console.log("tarea enviada");
    } else {
      console.log("ocurrio algun error");
    }
  };

 const id=tasks.id
  
 
const deleteTask = id => tasksAPI.delete(`/${id}`)

  const acceptDelete = (loadTasks) => {
    if (window.confirm('Desea eliminar?')) {
      deleteTask(id)
     
    }
  };

  return (
    <div>
      <div className="fond_botonAgregar">
        <form>
          <div className="boton_agregar">
            <input
              onChange={handleInputChange}
              name="title"
              type="text"
              placeholder="agregar titulo"
              className="input_agregarTitulo"
              maxLength="15"
              value={datos.title}
            />
            <input
              onChange={handleInputChange}
              name="description"
              type="text"
              placeholder="agregar tarea a lista"
              className="input_agregarDescripcion"
              maxLength="40"
              value={datos.description}
            />
            <button className="bot_agre" type="submit" onClick={handleSave}>
              AGREGAR
            </button>
          </div>
        </form>
      </div>
      <div className="div_tabla">
        <table id="tabla_id">
          <thead>
            <tr>
              <td colSpan="4" className="tabla">
                Lista de tareas
              </td>
            </tr>
          </thead>
          <tbody>
            {tasks.map((tarea, index) => (
              <tr key={index}>
                <td
                  className={`td_descripcion ${
                    tarea.completed ? "tachado" : ""
                  }`}
                >
                  {modoEdicion && indiceEdicion === index ? (
                    <div>
                      <input
                        maxLength={15}
                        name="title"
                        type="text"
                        onChange={handleInputChange}
                        value={datos.title}
                        placeholder="Ingrese nueva Tarea"
                      />
                      <input
                        maxLength={40}
                        name="description"
                        type="text"
                        onChange={handleInputChange}
                        value={datos.description}
                        placeholder="Ingrese Descripcion Tarea"
                      />
                    </div>
                  ) : (
                    <div>
                      <b>{tarea.title}</b>: {tarea.description}
                    </div>
                  )}
                </td>
                <td className="td_realizada" id="td_check">
                  <label className="label">
                    Realizada
                    <input
                      onChange={handleInputChange}
                      name="completed"
                      type="checkbox"
                      defaultChecked={tarea.completed}
                      value={datos.completed}
                    />
                  </label>
                </td>
                <td id="td_boton">
                  {modoEdicion && indiceEdicion === index ? (
                    <button className="boton_guardarEeditarBorrar">
                      <b>Guardar</b>
                    </button>
                  ) : (
                    <button className="boton_guardarEeditarBorrar">
                      <b>Editar</b>
                    </button>
                  )}
                </td>
                <td id="td_boton">
                  <button  className="boton_guardarEeditarBorrar" key={tasks.id} onClick={acceptDelete} >
                    <b >x</b>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="div_filtro">
        <input
          type="text"
          placeholder="Filtrar por título o descripción"
          className="inputfiltrar"
        />
        <br />

        <button className="boton_ordenar">Limpiar Orden</button>
        <select>
          <option value="titulo">Título</option>
          <option value="descripcion">Descripción</option>
        </select>
        <button>Ordenar</button>
      </div>
    </div>
  );
}

// Componente aparte
function Primera() {
  return (
    <div>
      <Comp_1Paginaprincipal />
      <br />
      <Lista_Tareas />
    </div>
  );
}

export default Primera;
