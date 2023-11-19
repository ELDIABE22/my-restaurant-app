import '../style/historialOrden.scss'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { CardHistorialOrden } from '../components/CardHistorialOrden'
import NavBar from '../components/NavBar'
import ScrollEffect from '../components/ScrollEffect'

const HistorialOrden = () => {
    const { userObjetoSesion, userSesion, userNot } = useContext(UserContext);

    return (
        <div className='contenedor-historial'>
            <NavBar />
            <main className='main-historial'>
                <ScrollEffect>
                    <div className='contenedor-historial-ordenes'>
                        {userSesion ?
                            userObjetoSesion.historial && userObjetoSesion.historial.length > 0 ?
                                (
                                    userObjetoSesion.historial.map((orden, index) => (
                                        <CardHistorialOrden key={index} orden={orden.orden} />
                                    ))
                                )
                                :
                                (
                                    <p className='text-pendiente'>No tienes pedidos pendientes.</p>
                                )
                            :
                            userNot.historial && userNot.historial.length > 0 ?
                                (
                                    userNot.historial.map((orden, index) => (
                                        <CardHistorialOrden key={index} orden={orden.orden} />
                                    ))
                                )
                                :
                                (
                                    <p className='text-pendiente'>No tienes pedidos pendientes</p>
                                )
                        }
                    </div>
                </ScrollEffect>
            </main>
        </div>
    )
}

export default HistorialOrden