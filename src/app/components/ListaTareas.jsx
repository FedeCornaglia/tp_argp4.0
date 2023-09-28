'use client'
import { createTask, getAllTasks, deleteTask } from '@/app/api/tasks'
import { useState, useEffect } from 'react'

export default function ListaTareas() {
  const [tasks, setTasks] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [datos, setDatos] = useState({
    title: '',
    description: '',
    completed: false,
  })

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks()
      setTasks(res.data)
    }
    loadTasks()
  }, [tasks])

  const handleInputChange = event => {
    const { name, value } = event.target
    setDatos({ ...datos, [name]: value })
  }

  const handleSave = async event => {
    event.preventDefault()
    if (datos.title === '') {
      console.log('error')
    } else if (datos.title != '') {
      await createTask({
        ...datos,
        user: 1,
        due_data: '',
      })
      setDatos({
        title: '',
        description: '',
        completed: false,
      })
      console.log('tarea enviada')
    } else {
      console.log('ocurrio algun error')
    }
  }

  const acceptDelete = async () => {
    if (window.confirm('Desea eliminar?')) {
      await deleteTask(id)
    }
  }

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
                    tarea.completed ? 'tachado' : ''
                  }`}>
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
                  <button
                    className="boton_guardarEeditarBorrar"
                    key={tasks.id}
                    onClick={acceptDelete}>
                    <b>x</b>
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
  )
}
