import { BsFillCartFill } from 'react-icons/bs'
import { RiFileHistoryFill } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import '../style/navBar.scss'

const NavBar = () => {
    const { userSesion, userObjetoSesion, userNot, onLogout } = useContext(UserContext);
    const location = useLocation();
    const longitudHistorialSinEntregadosNot = userNot?.historial?.filter(item => item.orden?.estado !== "Entregado")?.length ?? 0;
    const longitudHistorialSinEntregados = userObjetoSesion?.historial?.filter(orden => orden.orden?.estado !== "Entregado")?.length ?? [];
    const esEnMenu = location.pathname === '/menu';
    const esEnCarrito = location.pathname === '/carro';
    const esEnHistorial = location.pathname === '/historial';

    return (
        <div className='contenedor-navbar'>
            {esEnMenu && (
                <div className='title'>
                    <p>MENU</p>
                    <h1>DIABE DELICIAS</h1>
                </div>
            )}
            {esEnCarrito && (
                <div className='title'>
                    <p>CARRITO DE COMPRA</p>
                    <h1>DIABE DELICIAS</h1>
                </div>
            )}
            {esEnHistorial && (
                <div className='title'>
                    <p>HISTORIAL DE PEDIDOS</p>
                    <h1>DIABE DELICIAS</h1>
                </div>
            )}
            <div className='botones-acceso'>
                {esEnMenu ?
                    ''
                    :
                    (
                        <Link to='/menu'>
                            <button className='btn-menu' >
                                Menu
                            </button>
                        </Link>
                    )
                }
                {userSesion ?
                    (
                        <button className='btn-cerrar-sesion' onClick={onLogout}>
                            Cerrar Sesión
                        </button>
                    ) : (<Link to='/iniciar-sesion'>
                        <button className='btn-iniciar-sesion'>
                            Iniciar Sesión
                        </button>
                    </Link>
                    )}
                <Link to='/carro'>
                    <div className='carrito'>
                        <BsFillCartFill />
                        <span className='contador'>{userSesion ? userObjetoSesion ? userObjetoSesion.carrito.length : 0 : userNot ? userNot.carrito.length : 0}</span>
                    </div>
                </Link>
                <Link to='/historial'>
                    <div className='historial-ordenes'>
                        <RiFileHistoryFill />
                        <span className='contador'>
                            {userSesion ?
                                longitudHistorialSinEntregados
                                :
                                longitudHistorialSinEntregadosNot
                            }
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default NavBar