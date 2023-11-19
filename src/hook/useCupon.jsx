import Swal from 'sweetalert2';
import { useContext, useState } from "react";
import { UserContext } from '../context/UserContext';

const useCupon = (initialCupon = {}) => {
    const { userObjetoSesion, totalFinalConDescuento } = useContext(UserContext)

    const [formCupon, setFormCupon] = useState(initialCupon);

    const handleChangeCupon = ({ target }) => {
        const { name, value } = target;
        setFormCupon({
            ...formCupon,
            [name]: value,
        });
    };

    const handleSubmitCupon = (e) => {
        e.preventDefault();
        const cuponesValidos = ['bienvenido', 'diabe22'];

        const valueLowerCase = formCupon.cupon.toLowerCase();

        if (cuponesValidos.includes(valueLowerCase)) {
            const verificarCupon = userObjetoSesion.cupon;
            if (verificarCupon) {

                Swal.fire({
                    title: 'Usado!',
                    text: 'Este cupón ya ha sido utilizado.',
                    icon: 'info',
                    confirmButtonText: 'Listo'
                });

                setFormCupon({
                    cupon: '',
                });

            } else {

                totalFinalConDescuento();

                Swal.fire({
                    title: 'Activado!',
                    text: 'Cupon del 25% activado.',
                    icon: 'success',
                    confirmButtonText: 'Listo'
                });

                setFormCupon({
                    cupon: '',
                });

            }
        } else {

            Swal.fire({
                title: 'Inválido!',
                text: 'El cupón ingresado no es válido. Por favor, verifica el cupón.',
                icon: 'error',
                confirmButtonText: 'Listo'
            });

            setFormCupon({
                cupon: '',
            });

        }
    };

    return {
        ...formCupon,
        formCupon,
        setFormCupon,
        handleSubmitCupon,
        handleChangeCupon
    }
}

export default useCupon