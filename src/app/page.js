import './home.css'
import ListaTareas from '@/app/components/ListaTareas'
import { Paginaprincipal } from '@/app/components/botones_ini_reg'

function Primera() {
  return (
    <div>
      <Paginaprincipal />
      <br />
      <ListaTareas />
    </div>
  )
}

export default Primera
