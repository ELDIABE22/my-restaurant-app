/* eslint-disable react/prop-types */

import { useContext } from "react"
import { UserContext } from "../context/UserContext";

// eslint-disable-next-line react/prop-types
const CardMenu = ({ product }) => {
    const { userSesion, userNot, userObjetoSesion, handleAdd, handleDelete } = useContext(UserContext);

    const productExist = userNot.carrito.some(item => item.id === product.id);

    const userProductExist = userObjetoSesion && userObjetoSesion.carrito && userObjetoSesion.carrito.some(item => item.id === product.id);

    return (
        <div className="platos">
            <img src={product.imagen} alt={product.nombre} />
            <div className="contenedor-texto-platos">
                <div className="titlePlatos">{product.nombre}</div>
                <div className="precio">Precio: {product.precio.toLocaleString()}</div>
                {
                    userSesion
                        ? userProductExist
                            ? <button className="isCarrito" onClick={() => handleDelete(product)}>Eliminar del carrito</button>
                            : <button className="notCarrito" onClick={() => handleAdd(product)}>Agregar al carrito</button>
                        : productExist
                            ? <button className="isCarrito" onClick={() => handleDelete(product)}>Eliminar del carrito</button>
                            : <button className="notCarrito" onClick={() => handleAdd(product)}>Agregar al carrito</button>
                }
            </div>
        </div>
    )
}

export default CardMenu