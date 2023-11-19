import { useState } from 'react'
import { menuPlatos } from "../data/menuPlatos"
import CardMenu from '../components/CardMenu'
import NavBar from '../components/NavBar'
import '../style/menu.scss'
import ScrollEffect from '../components/ScrollEffect'

const Menu = () => {
    const [filtro, setFiltro] = useState('todos');

    const handleChangeFiltro = (e) => {
        const opcion = e.target.value;
        setFiltro(opcion);
    };

    return (
        <div className='contenedor-menu'>
            <NavBar />
            <main>
                <div className='filtro'>
                    <label htmlFor="filtro-menu" className='label-filtro-menu'>Buscar por categoría: </label>
                    <select className='filtro-menu' id='filtro-menu' name='filtro-menu' onChange={handleChangeFiltro} value={filtro}>
                        <option value="todos">Todos</option>
                        <option value="hamburguesa">Hamburguesas</option>
                        <option value="pizza">Pizza</option>
                        <option value="tacos">Tacos</option>
                        <option value="sandwiches">Sándwiches</option>
                        <option value="sushi">Sushi</option>
                        <option value="salchipapa">Salchipapa</option>
                        <option value="pollo">Pollo frito</option>
                        <option value="perro caliente">Perro caliente</option>
                        <option value="postres">Postres</option>
                        <option value="bebidas">Bebidas</option>
                    </select>
                </div>
                <ScrollEffect>
                    <div className='menu'>
                        {menuPlatos
                            .filter((product) => filtro !== 'todos' ? JSON.stringify(product.categoria) === JSON.stringify(filtro) : true)
                            .map((product, index) => (
                                <CardMenu key={index} product={product} />
                            ))}
                    </div>
                </ScrollEffect>
            </main>
        </div>
    )
}

export default Menu