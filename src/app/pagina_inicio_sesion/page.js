
import Link from 'next/link'
import './tppaginainiciarsesion.css'



function Comp_1Paginainiciosesion() {
  return (<div className="fondo">
    <section className='seccion_ingreso' id='seccion_ingreso'>
      <h1 className='texto_principal'> BIENVENIDO Estimado Usuario </h1><br />

      <Link href="./paginaRecuContrasena" className='texto_olvidocontra'>Olvido su contraseña?</Link>
      <input type='text' placeholder='ingrese su usuario' className='input_1'></input> <br />
      <input type='password' placeholder='ingrese su contraseña' className='input_2'></input> <br />

      <button className='boton_InicioSesion'>INICIAR SESION</button> <br />
      <Link href="/" className='boton_Home'>HOME </Link><br />



    </section>
  </div>
  )
}

function Pinicio() {
  return (<Comp_1Paginainiciosesion />)
}

export default Pinicio
