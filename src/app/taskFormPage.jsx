import { useForm } from 'react-hook-form';



export function TaskFormPage(){
    const {register,handleSubmit}= useForm()
    const onSubmit = handleSubmit(data=> {console.log (data)})
   
    
    return(<div>
          <div>
      <div className='fond_botonAgregar'>
        <form onSubmit={onSubmit}>
          <div className='boton_agregar'>
            <input
              {...register("titulo",{ require:true})}
              
              name="titulo"
              type='text'
              placeholder='agregar titulo'
              className='input_agregarTitulo'
              maxLength="15"
              
            />
            <input
            {...register("descripcion",{ require:true})}
             
              name='descripcion'
              type='text'
              placeholder='agregar tarea a lista'
              className='input_agregarDescripcion'
              maxLength="40"
              
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

    </div>)
}