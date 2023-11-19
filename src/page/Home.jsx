import { Link } from "react-router-dom";
import "../style/home.scss";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Home = () => {
    const { userSesion, onLogout } = useContext(UserContext);

    return (
        <div className="contenedor-home">
            <div className="contenedor-text">
                <h2>ONLINE</h2>
                <h1>DIABE DELICIAS</h1>
                <p>Cada plato es una experiencia única, y cada visita es especial. </p>
                {userSesion ?
                    (
                        <button className="boton-cerrar-sesion" onClick={onLogout} > Cerrar Sesión </button>
                    ) : (
                        <Link to='/iniciar-sesion'>
                            <button className="boton-iniciar-sesion"> Iniciar Sesión </button>
                        </Link>
                    )
                }
                <Link to='/menu'>
                    <button className="boton-menu"> Menu </button>
                </Link>
                <Link to='/cocina'>
                    <button className="boton-menu"> Cocina </button>
                </Link>
            </div>
            <div className="contenedor-img"></div>
        </div>
    );
};

export default Home;
