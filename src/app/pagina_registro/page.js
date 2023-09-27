
import Link from 'next/link'
import './tppaginaregistro.css'


function Comp_1PaginaRegistro() {
  return (<div>
    <section className='sesion'>
      <h1 className='textoRegistro'> Registro de Usuario</h1><br />
      

      <input type='text' placeholder='Ingrese Nombre y Apellido' className='inputs'></input> <br />
      <input type='password' placeholder='ingrese su contraseña' className='inputs'></input> <br />
      <input type='email' placeholder='ingrese su email' className='inputs'></input> <br />
      <input type='number' placeholder='ingrese su dni' className='inputs'></input> <br />

      <button className='boton_R'>REGISTRARSE</button> <br />
      <Link href="./pagina_inicio_sesion" className='boton_I'>INICIAR SESION</Link>
      <Link href="/" className='boton_H'>HOME</Link> <br />



    </section>
  </div>
  )
}

function Registro() {
  return (<Comp_1PaginaRegistro />)
}

export default Registro