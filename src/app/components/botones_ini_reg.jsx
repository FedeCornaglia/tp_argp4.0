import Link from 'next/link'

export function Paginaprincipal() {
  return (
    <div>
      <Link href="/pagina_registro" className="ir_registro">
        ir a registro
      </Link>
      <br />
      <Link href="/pagina_inicio_sesion" className="irIniciar_Sesion">
        ir sesion
      </Link>
    </div>
  )
}
