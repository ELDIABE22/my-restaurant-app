import { useContext, useState } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const useForm = (initialForm = {}) => {
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const [formRegistro, setFormRegistro] = useState(initialForm);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormRegistro({
            ...formRegistro,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevoUsuario = { ...formRegistro };

        const verificarCorreo = user.find(usuario => usuario.correo === nuevoUsuario.correo);
        const verificarTelefono = user.find(usuario => usuario.telefono === nuevoUsuario.telefono);

        if (formRegistro.nombreCompleto && /\d/.test(formRegistro.nombreCompleto)) {
            toast.error("El nombre no debe contener números");
            return;
        }

        const nombres = formRegistro.nombreCompleto.split(" ");

        if (nombres.length < 2) {
            toast.error("Por favor, ingresa al menos un nombre y un apellido");
            return;
        }

        if (verificarCorreo) {
            toast.error('El correo ya esta registrado')
            return;
        }

        if (formRegistro.telefono && formRegistro.telefono.length !== 10) {
            toast.error("El número de teléfono debe tener 10 dígitos");
            return;
        }

        if (verificarTelefono) {
            toast.error('El telefono ya esta registrado')
            return;
        }

        if (formRegistro.contraseña && formRegistro.contraseña.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        user.push(nuevoUsuario);
        localStorage.setItem('UserCarritoRegistrado', JSON.stringify(user));
        toast.success('Registrado exitosamente');
        navigate('/iniciar-sesion', { replace: true });
    }

    return {
        ...formRegistro,
        formRegistro,
        setFormRegistro,
        handleChange,
        handleSubmit
    }
}