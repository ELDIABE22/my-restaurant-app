import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useLogin(initialLogin = {}) {
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const [formIniciar, setFormIniciar] = useState(initialLogin);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormIniciar({
            ...formIniciar,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const usuarioEncontrado = user.find(
            (usuario) => usuario.correo === formIniciar.correo && usuario.contraseña === formIniciar.contraseña
        );

        if (formIniciar.contraseña && formIniciar.contraseña.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        if (usuarioEncontrado) {
            usuarioEncontrado.sesion = true;
            localStorage.setItem('UserCarritoRegistrado', JSON.stringify(user));
            toast.success('Inicio de sesión exitoso');
            setTimeout(() => {
                navigate('/menu', { replace: true });
            }, "500");
        } else {
            toast.error('Datos incorrectos. Verifica tu ID y contraseña.');
        }
    };
    
    return {
        ...formIniciar,
        formIniciar,
        handleChange,
        handleSubmit
    }
}

export default useLogin