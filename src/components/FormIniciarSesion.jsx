import { Link } from "react-router-dom"
import useLogin from "../hook/useLogin";
import ScrollEffect from "./ScrollEffect";

// eslint-disable-next-line react/prop-types
const FormIniciarSesion = () => {
    const { correo, contraseña, handleChange, handleSubmit } = useLogin({
        correo: '',
        contraseña: ''
    });

    return (
        <ScrollEffect>
            <form className="form" onSubmit={handleSubmit}>
                <div className="header">Iniciar Sesión</div>
                <div className="inputs">
                    <input required placeholder="Email" className="input" name="correo" type="email" value={correo} onChange={handleChange} />
                    <input required placeholder="Contraseña" className="input" name="contraseña" type="password" value={contraseña} onChange={handleChange} />
                    <div className="checkbox-container">
                        <label className="checkbox">
                            <input type="checkbox" id="checkbox" />
                        </label>
                        <label htmlFor="checkbox" className="checkbox-text">
                            Recordar cuenta
                        </label>
                    </div>
                    <button className="signin-btn">Iniciar</button>
                    <a className="forget" href="#">
                        Se te olvido tu contraseña?
                    </a>
                    <p className="signup-link">
                        No tienes cuenta? <Link to='/registro' >Registrarse</Link>
                    </p>
                </div>
            </form>
        </ScrollEffect>
    )
}

export default FormIniciarSesion