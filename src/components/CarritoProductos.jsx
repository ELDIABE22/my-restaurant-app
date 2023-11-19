import { useContext } from "react"
import { UserContext } from "../context/UserContext"

/* eslint-disable react/prop-types */
const CarritoProductos = ({ product }) => {
    const { handleDelete, handleCantidadMas, handleCantidadMenos } = useContext(UserContext);
    
    return (
        <div className="product">
            <img src={product.imagen} alt={product.nombre} />
            <div className='nombre-product'>
                <span>{product.nombre}</span>
            </div>
                <div className="quantity">
                    <button onClick={() => handleCantidadMenos(product)}>
                        <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#47484b" d="M20 12L4 12"></path>
                        </svg>
                    </button>
                    <label>{product.cantidad}</label>
                    <button onClick={() => handleCantidadMas(product)}>
                        <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
                        </svg>
                    </button>
                </div>
            <button className="btnEliminar" onClick={() => handleDelete(product)}>
                <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="iconEliminar">
                    <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                </svg>
            </button>
            <label className="price small">${product.total.toLocaleString()}</label>
        </div>
    )
}

export default CarritoProductos