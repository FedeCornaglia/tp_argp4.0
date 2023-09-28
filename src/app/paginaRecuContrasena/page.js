import Link from 'next/link'
import './recuperacionContra.css'

function Comp_1PaginaRecuContra() {
  return (
    <div className="fondo1">
      <section className="seccion_contraseña" id="seccion_contraseña">
        <h1 className="texto_principal1"> RECUPERACION DE CONTRASEÑA </h1>
        <br />
        <h4 className="texto_SeEnviara">
          Se enviara al email nueva contraseña
        </h4>
        <input
          type="text"
          placeholder="ingrese su usuario"
          className="input_3"></input>{' '}
        <br />
        <input
          type="email"
          placeholder="ingrese su email"
          className="input_4"></input>{' '}
        <br />
        <button className="boton_EnviarContra">Enviar</button> <br />
        <Link href="/" className="boton_Home1">
          HOME{' '}
        </Link>
        <br />
      </section>
    </div>
  )
}

function Pcontra() {
  return <Comp_1PaginaRecuContra />
}

export default Pcontra
