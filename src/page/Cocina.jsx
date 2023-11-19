import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../style/cocina.scss";

const Cocina = () => {
    const { user, userNot, handleEntregar, handleEntregarNot } = useContext(UserContext);

    return (
        <div className="contenedor-cocina">
            <header>
                <h1>ORDENES</h1>
            </header>
            <main className="main-cocina">
                <div className="contenedor-ordenes">
                    {user && user.length > 0
                        ? user
                            .filter((item) => item.historial && item.historial.length > 0)
                            .map((item) =>
                                item.historial.map(
                                    (orden, index) =>
                                        orden.orden.estado !== "Entregado" && (
                                            <div className="book" key={index}>
                                                <ul className="lists">
                                                    {orden.orden.productos.map((producto, subIndex) => (
                                                        <li className="list" key={subIndex}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                                                                <g
                                                                    strokeLinejoin="round"
                                                                    strokeLinecap="round"
                                                                    id="SVGRepo_tracerCarrier"
                                                                ></g>
                                                                <g id="SVGRepo_iconCarrier">
                                                                    <path
                                                                        fill="#00FF00"
                                                                        d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z"
                                                                        clipRule="evenodd"
                                                                        fillRule="evenodd"
                                                                    ></path>
                                                                </g>
                                                            </svg>
                                                            <span>
                                                                {producto.nombre} - {producto.cantidad}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button onClick={() => handleEntregar(orden.orden)}>ENTREGAR</button>
                                                <div className="cover">
                                                    <p> ORDEN </p>
                                                    <p>{orden.entrega}</p>
                                                </div>
                                            </div>
                                        )
                                )
                            )
                        : ""}

                    {userNot.historial && userNot.historial.length > 0
                        ? userNot.historial.map((orden, index) => (
                            orden.orden.estado !== "Entregado" && (
                                <div className="book" key={index}>
                                    <ul className="lists">
                                        {orden.orden.productos.map((item, subIndex) => (
                                            <li className="list" key={subIndex}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                                                    <g
                                                        strokeLinejoin="round"
                                                        strokeLinecap="round"
                                                        id="SVGRepo_tracerCarrier"
                                                    ></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path
                                                            fill="#00FF00"
                                                            d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z"
                                                            clipRule="evenodd"
                                                            fillRule="evenodd"
                                                        ></path>
                                                    </g>
                                                </svg>
                                                <span>
                                                    {item.nombre} - {item.cantidad}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button onClick={() => handleEntregarNot(orden.orden)}>ENTREGAR</button>
                                    <div className="cover">
                                        <p> ORDEN </p>
                                        <p>{orden.entrega}</p>
                                    </div>
                                </div>
                            )
                        ))
                        : ""}

                </div>
            </main>
        </div>
    );
};

export default Cocina;
