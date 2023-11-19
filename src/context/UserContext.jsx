import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    const [userNot, setUserNot] = useState(JSON.parse(localStorage.getItem('UserCarritoNoRegistrado')) || { carrito: [] });
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('UserCarritoRegistrado')) || []);

    const userSesion = user.some(item => item.sesion === true);

    const userObjetoSesion = user.find(item => item.sesion);

    const descuentoCupon = userObjetoSesion && userObjetoSesion.subTotal ? (userObjetoSesion.subTotal * 0.25) : 0;

    const navigate = useNavigate();

    const handleAdd = (product) => {
        let actualizarDato;

        if (userSesion) {
            if (userObjetoSesion) {
                actualizarDato = user.map(item => {
                    if (item.sesion && item.id === userObjetoSesion.id) {
                        let totalFinal;

                        const nuevoCarrito = [
                            ...item.carrito,
                            {
                                ...product,
                                cantidad: 1,
                                total: product.precio
                            }
                        ];

                        if (userObjetoSesion.cupon && userObjetoSesion.cuponActivo) {
                            totalFinal = nuevoCarrito.reduce((total, product) => total + product.total, 0)
                            totalFinal -= (totalFinal * 0.25);
                            totalFinal += 3000
                        } else {
                            totalFinal = nuevoCarrito.reduce((total, product) => total + product.total, 3000)
                        }

                        const subTotal = nuevoCarrito.reduce((total, item) => total + item.total, 0);

                        return {
                            ...item,
                            carrito: nuevoCarrito,
                            subTotal: subTotal,
                            totalFinal: totalFinal,
                        };
                    }

                    return item;
                });

                setUser(actualizarDato)
                localStorage.setItem('UserCarritoRegistrado', JSON.stringify(actualizarDato));
            }
        } else {

            const historial = userNot.historial;

            actualizarDato = [
                ...userNot.carrito,
                {
                    ...product,
                    cantidad: 1,
                    total: product.precio
                }
            ];

            const subTotal = actualizarDato.reduce((total, item) => total + item.total, 0);

            const totalFinal = actualizarDato.reduce((total, item) => total + item.total, 0);

            const datoConTotal = { carrito: actualizarDato, historial: historial, subTotal, totalFinal };

            setUserNot(datoConTotal)

            localStorage.setItem('UserCarritoNoRegistrado', JSON.stringify(datoConTotal));
        }
    }

    const handleCantidadMas = (product) => {

        if (userSesion) {
            const productoEnCarrito = userObjetoSesion.carrito.find(item => item.id === product.id);

            if (productoEnCarrito) {
                const actualizarDato = userObjetoSesion.carrito.map(item => {
                    if (item.id === product.id) {
                        return {
                            ...item,
                            cantidad: item.cantidad + 1,
                            total: (item.cantidad + 1) * product.precio
                        };
                    }

                    return item;
                });

                let totalFinal;

                if (userObjetoSesion.cupon && userObjetoSesion.cuponActivo) {
                    totalFinal = actualizarDato.reduce((total, product) => total + product.total, 0)
                    totalFinal -= (totalFinal * 0.25);
                    totalFinal += 3000
                } else {
                    totalFinal = actualizarDato.reduce((total, product) => total + product.total, 3000)
                }

                const subTotal = actualizarDato.reduce((total, item) => total + item.total, 0);

                setUser((prevUser) => {
                    const actualizarUser = prevUser.map(item => {
                        if (item.sesion) {
                            return {
                                ...item,
                                carrito: actualizarDato,
                                subTotal: subTotal,
                                totalFinal: totalFinal
                            };
                        }
                        return item;
                    })
                    localStorage.setItem('UserCarritoRegistrado', JSON.stringify(actualizarUser));
                    return actualizarUser;
                })
            }
        } else {
            const historial = userNot.historial;

            const productoEnCarrito = userNot.carrito.find(item => item.id === product.id);

            if (productoEnCarrito) {
                const actualizarDato = userNot.carrito.map(item => {
                    if (item.id === product.id) {
                        return {
                            ...item,
                            cantidad: item.cantidad + 1,
                            total: (item.cantidad + 1) * product.precio
                        };
                    }

                    return item;
                });

                setUserNot(() => {
                    const subTotal = actualizarDato.reduce((total, item) => total + item.total, 0);
                    const totalFinal = actualizarDato.reduce((total, item) => total + item.total, 0);
                    const datoConTotal = { carrito: actualizarDato, historial: historial, subTotal, totalFinal };
                    localStorage.setItem('UserCarritoNoRegistrado', JSON.stringify(datoConTotal));
                    return datoConTotal;
                });
            }
        }
    }

    const handleCantidadMenos = (product) => {
        if (userSesion) {
            const productoEnCarrito = userObjetoSesion.carrito.find(item => item.id === product.id);

            if (productoEnCarrito) {
                const actualizarDato = userObjetoSesion.carrito.map(item => {
                    if (item.id === product.id) {
                        const nuevaCantidad = Math.max(1, item.cantidad - 1);
                        return {
                            ...item,
                            cantidad: nuevaCantidad,
                            total: nuevaCantidad * product.precio
                        };
                    }
                    return item;
                });

                let totalFinal;

                if (userObjetoSesion.cupon && userObjetoSesion.cuponActivo) {
                    totalFinal = actualizarDato.reduce((total, product) => total + product.total, 0)
                    totalFinal -= (totalFinal * 0.25);
                    totalFinal += 3000
                } else {
                    totalFinal = actualizarDato.reduce((total, product) => total + product.total, 3000)
                }

                const subTotal = actualizarDato.reduce((total, item) => total + item.total, 0);

                setUser((prevUser) => {
                    const actualizarUser = prevUser.map(item => {
                        if (item.sesion) {
                            return {
                                ...item,
                                carrito: actualizarDato,
                                subTotal: subTotal,
                                totalFinal: totalFinal
                            };
                        }
                        return item;
                    });

                    localStorage.setItem('UserCarritoRegistrado', JSON.stringify(actualizarUser));
                    return actualizarUser;
                });
            }
        } else {
            const historial = userNot.historial;

            const actualizarDato = userNot.carrito.map(item => {
                if (item.id === product.id) {
                    const nuevaCantidad = Math.max(1, item.cantidad - 1);
                    return {
                        ...item,
                        cantidad: nuevaCantidad,
                        total: nuevaCantidad * product.precio
                    };
                }
                return item;
            });

            const subTotal = actualizarDato.reduce((total, item) => total + item.total, 0);
            const totalFinal = actualizarDato.reduce((total, item) => total + item.total, 0);
            const datoConTotal = { carrito: actualizarDato, historial: historial, subTotal, totalFinal };

            setUserNot(() => {
                localStorage.setItem('UserCarritoNoRegistrado', JSON.stringify(datoConTotal));
                return datoConTotal;
            });
        }
    };

    const handleDelete = (product) => {
        if (userSesion) {
            let totalFinal;

            const eliminarDato = userObjetoSesion.carrito.filter(item => item.id !== product.id);
            userObjetoSesion.carrito = eliminarDato;

            if (userObjetoSesion.cupon && userObjetoSesion.cuponActivo && eliminarDato.length >= 1) {
                totalFinal = eliminarDato.reduce((total, product) => total + product.total, 0)
                totalFinal -= (totalFinal * 0.25);
                totalFinal += 3000
            } else if (eliminarDato.length >= 1) {
                totalFinal = eliminarDato.reduce((total, item) => total + item.total, 3000);
            } else {
                totalFinal = eliminarDato.reduce((total, item) => total + item.total, 0);
            }

            const subTotal = eliminarDato.reduce((total, item) => total + item.total, 0);

            setUser((prevUser) => {
                const actualizarUser = prevUser.map(item => {
                    if (item.sesion) {
                        return {
                            ...item,
                            carrito: eliminarDato,
                            subTotal: subTotal,
                            totalFinal: totalFinal
                        };
                    }
                    return item;
                });
                localStorage.setItem('UserCarritoRegistrado', JSON.stringify(actualizarUser));
                return actualizarUser;
            });
        } else {
            const historial = userNot.historial;
            const eliminarDato = userNot.carrito.filter(item => item.id !== product.id);
            const subTotal = eliminarDato.reduce((total, item) => total + item.total, 0);
            const totalFinal = eliminarDato.reduce((total, item) => total + item.total, 0);
            const datoConTotal = { carrito: eliminarDato, historial: historial, subTotal, totalFinal };
            setUserNot(datoConTotal);
            localStorage.setItem('UserCarritoNoRegistrado', JSON.stringify(datoConTotal));
        }
    }

    const handleOrdenar = () => {

        let actualizarDato;

        if (userSesion) {
            if (userObjetoSesion.carrito.length !== 0) {
                Swal.fire({
                    title: "¿Confirmar orden?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirmar"
                }).then((result) => {
                    if (result.isConfirmed) {

                        actualizarDato = user.map(item => {
                            if (item.sesion) {
                                const productCarrito = item.carrito;

                                return {
                                    ...item,
                                    carrito: [],
                                    historial: [
                                        ...(item.historial || []),
                                        {
                                            orden: {
                                                productos: productCarrito,
                                                estado: 'Preparando...',
                                                totalFinal: item.totalFinal
                                            },
                                            entrega: 'Domicilio'
                                        }
                                    ],
                                    cuponActivo: userObjetoSesion.cupon ? false : item.cuponActivo,
                                    subTotal: 0,
                                    totalFinal: 0
                                }
                            }
                            return item;
                        });

                        setUser(actualizarDato)
                        localStorage.setItem('UserCarritoRegistrado', JSON.stringify(actualizarDato));

                        Swal.fire({
                            title: "Orden realizada!",
                            text: "Pronto será entregada.",
                            icon: "success"
                        });

                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Carrito vacio!",
                    text: "No tienes productos en el carrito!",
                });
                return;
            }
        } else {

            if (userNot.carrito.length !== 0) {
                Swal.fire({
                    title: "¿Confirmar orden?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirmar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        const productCarrito = userNot.carrito;
                        let totalFinalCarrito = userNot.totalFinal;

                        const nuevaOrden = {
                            orden: {
                                productos: productCarrito,
                                estado: 'Preparando...',
                                totalFinal: totalFinalCarrito
                            },
                            entrega: 'Mesa'
                        };

                        actualizarDato = {
                            ...userNot,
                            carrito: [],
                            historial: [...(userNot.historial || []), nuevaOrden],
                            subTotal: 0,
                            totalFinal: 0
                        };

                        setUserNot(actualizarDato);

                        localStorage.setItem('UserCarritoNoRegistrado', JSON.stringify(actualizarDato));

                        Swal.fire({
                            title: "Orden realizada!",
                            text: "Pronto será entregada.",
                            icon: "success"
                        });
                    }
                });

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Carrito vacio!",
                    text: "No tienes productos en el carrito!",
                });
                return;
            }
        }
    }

    const handleEntregar = (ordenParametro) => {
        let actualizarDato;

        actualizarDato = user.map(item => {
            const historialActualizado = (item.historial || []).map(historialItem => {
                if (JSON.stringify(historialItem.orden) === JSON.stringify(ordenParametro)) {
                    return {
                        ...historialItem,
                        entrega: 'Domicilio',
                        orden: {
                            ...historialItem.orden,
                            estado: 'Entregado'
                        }
                    };
                }
                return historialItem;
            });

            return {
                ...item,
                historial: historialActualizado,
            };
        });

        setUser(actualizarDato)
        localStorage.setItem('UserCarritoRegistrado', JSON.stringify(actualizarDato));

        Swal.fire({
            title: "Pedido Entregado",
            icon: "success"
        });
    };

    const handleEntregarNot = (ordenParametro) => {
        let actualizarDato;

        actualizarDato = { ...userNot };

        actualizarDato.historial = (actualizarDato.historial || []).map(historialItem => {
            if (JSON.stringify(historialItem.orden) === JSON.stringify(ordenParametro)) {
                return {
                    ...historialItem,
                    entrega: 'Mesa',
                    orden: {
                        ...historialItem.orden,
                        estado: 'Entregado'
                    }
                };
            }
            return historialItem;
        });

        setUserNot(actualizarDato);
        localStorage.setItem('UserCarritoNoRegistrado', JSON.stringify(actualizarDato));

        Swal.fire({
            title: "Pedido Entregado",
            icon: "success"
        });
    };

    const handleDeleteAll = () => {
        const carritoEliminarTodo = userNot.carrito.splice(0, userNot.carrito.length);
        const historial = userNot.historial;
        const subTotal = 0;
        const totalFinal = 0;
        const datoConTotal = { carrito: carritoEliminarTodo, historial, subTotal, totalFinal };
        localStorage.setItem('UserCarritoNoRegistrado', JSON.stringify(datoConTotal));
    }

    if (userSesion) {
        handleDeleteAll();
    }

    const onLogout = () => {
        const usuarioLogout = user.find(
            (usuario) => usuario.sesion === true
        );

        usuarioLogout.sesion = false;
        localStorage.setItem('UserCarritoRegistrado', JSON.stringify(user));
        toast.success('Sesión cerrada');
        setTimeout(() => {
            navigate('/', { replace: true });
        }, 500);
    }

    const totalFinalConDescuento = () => {
        let actualizarDato = user.map(item => {
            if (item.sesion) {

                let totalFinal = userObjetoSesion.carrito.reduce((total, product) => total + product.total, 0)
                totalFinal -= (totalFinal * 0.25);
                totalFinal += 3000

                return {
                    ...item,
                    cupon: true,
                    totalFinal: totalFinal
                }
            }

            return item;
        })

        setUser(actualizarDato)
        localStorage.setItem('UserCarritoRegistrado', JSON.stringify(actualizarDato));
    }

    return (
        <UserContext.Provider value={{ userNot, user, userSesion, userObjetoSesion, descuentoCupon, setUser, setUserNot, handleAdd, handleDelete, handleCantidadMas, handleCantidadMenos, handleOrdenar, onLogout, totalFinalConDescuento, handleEntregar, handleEntregarNot }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext };