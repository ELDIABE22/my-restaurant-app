import FondoComida from '../assets/fondo-comida.png'
import '../style/iniciarOrRegistrar.scss'
import FormRegistro from '../components/FormRegistro'
import FormIniciarSesion from '../components/FormIniciarSesion'

export const IniciarSesion = () => {
    return (
        <div className='contenedor-iniciar-sesion'>
            <div className='box-iniciar-sesion'>
                <div className='bg-iniciar-sesion'>
                    <img src={FondoComida} alt="" />
                </div>
                <div className='contenedor-form'>
                    <FormIniciarSesion />
                </div>
            </div>
        </div>
    )
}

export const Registro = () => {
    return (
        <div className='contenedor-iniciar-sesion'>
            <div className='box-iniciar-sesion'>
                <div className='bg-iniciar-sesion'>
                    <img src={FondoComida} alt="" />
                </div>
                <div className='contenedor-form'>
                    <FormRegistro />
                </div>
            </div>
        </div>
    )
}