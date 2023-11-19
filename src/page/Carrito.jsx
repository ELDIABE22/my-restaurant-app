import CarroCompra from '../components/CarroCompra'
import NavBar from '../components/NavBar'
import '../style/carrito.scss'

const Carrito = () => {
    return (
        <div className='contenedor-carrito'>
            <NavBar />
            <main className='main-carrito'>
                <CarroCompra />
            </main>
        </div>
    )
}

export default Carrito