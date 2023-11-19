import { Link } from "react-router-dom"
import { useForm } from "../hook/useForm";
import ScrollEffect from "./ScrollEffect";

// eslint-disable-next-line react/prop-types
const FormRegistro = () => {
    const { nombreCompleto, correo, telefono, direccion, contraseña, handleChange, handleSubmit } = useForm({
        nombreCompleto: '',
        correo: '',
        telefono: '',
        direccion: '',
        contraseña: '',
        sesion: false,
        cupon: false,
        cuponActivo: true,
        carrito: [],
        historial: []
    });

    return (
        <ScrollEffect>
            <form className="form" onSubmit={handleSubmit}>
                <div className="header">Registro</div>
                <div className="inputs">
                    <input required placeholder="Nombre Completo" className="input" name="nombreCompleto" value={nombreCompleto} onChange={handleChange} type="text" />
                    <input required placeholder="Correo" className="input" name="correo" value={correo} onChange={handleChange} type="email" />
                    <input required placeholder="Teléfono" className="input" name="telefono" value={telefono} onChange={handleChange} type="number" min='1' />
                    <input required placeholder="Dirección" className="input" name="direccion" value={direccion} onChange={handleChange} type="text" />
                    <input required placeholder="Contraseña" className="input" name="contraseña" value={contraseña} onChange={handleChange} type="password" />
                    <div className="checkbox-container">
                        <label className="checkbox">
                            <input type="checkbox" id="checkbox" />
                        </label>
                        <label htmlFor="checkbox" className="checkbox-text">
                            Recibir notificaciones de descuento
                        </label>
                    </div>
                    <button className="signin-btn">Registrar</button>
                    <p className="signup-link">
                        Ya tienes cuenta? <Link to='/iniciar-sesion' >Iniciar Sesión</Link>
                    </p>
                </div>
            </form>
        </ScrollEffect>
    )
}

export default FormRegistro