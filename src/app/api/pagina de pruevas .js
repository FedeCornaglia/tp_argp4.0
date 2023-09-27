"use client"
import Head from 'next/head'
import Link from 'next/link'
import './home.css'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { getAllTasks } from './api/tasks'
import { TaskCard } from './tasksCard'




function TackList() {
  const [tasks, setTasks]=useState([]);

  useEffect(() => {
    async function loadTasks() { const res = await getAllTasks(); console.log(res);setTasks(res.data) }
    loadTasks()
  }, []);

  return <div>{tasks.map (task =>(<TaskCard key={task.id} task={task}/>))}</div>
  
}








function Comp_1Paginaprincipal() {
  return (
    <div>
      <Link href="/pagina_registro" className='ir_registro'>ir a registro</Link><br />
      <Link href="/pagina_inicio_sesion" className='irIniciar_Sesion'>ir sesion</Link>
    </div>

  )
}

function Lista_Tareas() {
  const [datos, setDatos] = useState({ titulo: "", descripcion: "" });
  const [tareas, setTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [indiceEdicion, setIndiceEdicion] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [campoOrden, setCampoOrden] = useState("titulo"); // Puede ser "titulo" o "descripcion"
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [tablaOrdenada, setTablaOrdenada] = useState(false);



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatos({ ...datos, [name]: value });
  };

  const guardarTarea = (event) => {
    event.preventDefault();
    if (modoEdicion && indiceEdicion !== null) {
      const nuevasTareas = tareas.map((tarea, index) =>
        index === indiceEdicion ? { ...datos } : tarea
      );
      setTareas(nuevasTareas);
      setModoEdicion(false);
      setIndiceEdicion(null);
      setDatos({ titulo: "", descripcion: "" });
    } else {
      setTareas([...tareas, { ...datos, realizada: false }]); // Agregado: Propiedad "realizada"
      setDatos({ titulo: "", descripcion: "" });
    }
  };

  const editarTarea = (index) => {
    setModoEdicion(true);
    setIndiceEdicion(index);
    setDatos({ ...tareas[index] });
  };

  const toggleRealizada = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].realizada = !nuevasTareas[index].realizada;
    setTareas(nuevasTareas);
  };

  const borrarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };


  const filtrarTareas = () => {
    let tareasFiltradas = tareas.filter((tarea) => {
      const lowerCasedFilter = filtro.toLowerCase();
      return (
        tarea.titulo.toLowerCase().includes(lowerCasedFilter) ||
        tarea.descripcion.toLowerCase().includes(lowerCasedFilter)
      );
    });

    if (tablaOrdenada) {
      tareasFiltradas = tareasFiltradas.slice().sort((a, b) => {
        const campoA = a[campoOrden].toLowerCase();
        const campoB = b[campoOrden].toLowerCase();
        if (campoA < campoB) {
          return ordenAscendente ? -1 : 1;
        }
        if (campoA > campoB) {
          return ordenAscendente ? 1 : -1;
        }
        return 0;
      });
    }

    return tareasFiltradas;
  };


  const tareasFiltradas = filtrarTareas();

  return (
    <div>
      <div className='fond_botonAgregar'>
        <form onSubmit={guardarTarea}>
          <div className='boton_agregar'>
            <input
              onChange={handleInputChange}
              name="titulo"
              type='text'
              placeholder='agregar titulo'
              className='input_agregarTitulo'
              maxLength="15"
              value={datos.titulo}
            />
            <input
              onChange={handleInputChange}
              name='descripcion'
              type='text'
              placeholder='agregar tarea a lista'
              className='input_agregarDescripcion'
              maxLength="40"
              value={datos.descripcion}
            />
            <button className='bot_agre' type='submit'>AGREGAR</button>
          </div>
        </form>
      </div>
      <div className='div_tabla'>
        <table id='tabla_id'>
          <thead>
            <tr>
              <td colSpan="4" className='tabla'>
                Lista de tareas
              </td>
            </tr>
          </thead>
          <tbody>
            {tareasFiltradas.map((tarea, index) => (
              <tr key={index}>
                <td className={`td_descripcion ${tarea.realizada ? 'tachado' : ''}`}>
                  {modoEdicion && indiceEdicion === index ? (
                    <div>
                      <input
                        maxLength={15}
                        name='titulo'
                        type='text'
                        onChange={handleInputChange}
                        value={datos.titulo}
                        placeholder='Ingrese nueva Tarea'
                      />
                      <input
                        maxLength={40}
                        name='descripcion'
                        type='text'
                        onChange={handleInputChange}
                        value={datos.descripcion}
                        placeholder='Ingrese Descripcion Tarea'
                      />
                    </div>
                  ) : (
                    <div>
                      <b>{tarea.titulo}</b>: {tarea.descripcion}
                    </div>
                  )}
                </td>
                <td className='td_realizada' id='td_check'>
                  <label className='label' >
                    Realizada
                    <input
                      type='checkbox'
                      checked={tarea.realizada}
                      onChange={() => toggleRealizada(index)}
                    />
                  </label>
                </td>
                <td id='td_boton'>
                  {modoEdicion && indiceEdicion === index ? (
                    <button className='boton_guardarEeditarBorrar' onClick={guardarTarea}>
                      <b>Guardar</b>
                    </button>
                  ) : (
                    <button className='boton_guardarEeditarBorrar' onClick={() => editarTarea(index)}>
                      <b>Editar</b>
                    </button>
                  )}
                </td>
                <td id='td_boton'>
                  <button className='boton_guardarEeditarBorrar' onClick={() => borrarTarea(index)}>
                    <b>x</b>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='div_filtro'>


        <input
          type='text'
          placeholder='Filtrar por título o descripción'
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className='inputfiltrar'
        /><br />

        <button onClick={() => setTablaOrdenada(false)} className='boton_ordenar'>Limpiar Orden</button>
        <select value={campoOrden} onChange={(e) => setCampoOrden(e.target.value)}>
          <option value='titulo'>Título</option>
          <option value='descripcion'>Descripción</option>
        </select>
        <button onClick={() => setTablaOrdenada(true)} className='boton_ordenar'>Ordenar</button>
      </div>
    </div>
  );
}
function Primera() {
  return (<div>
    <Comp_1Paginaprincipal /><br />
    <Lista_Tareas />
    <TackList/>
  </div>
  )
}

export default Primera
