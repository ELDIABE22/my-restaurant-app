import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import CarritoProductos from "./CarritoProductos";
import useCupon from "../hook/useCupon";

const CarroCompra = () => {
    const { userSesion, userObjetoSesion, userNot, setUserNot, descuentoCupon, handleOrdenar } = useContext(UserContext);

    const { cupon, handleChangeCupon, handleSubmitCupon } = useCupon({
        cupon: '',
    });

    const [propinaActive, setPropinaActive] = useState(false);

    const userNotPropina = userNot && userNot.carrito ? (userNot.subTotal ? (userNot.subTotal * 0.1).toLocaleString() : 0) : 0;

    const propinaCheckbox = () => {
        setPropinaActive(!propinaActive);
    };

    /// AGREGAR O QUITAR PROPINA ///
    useEffect(() => {
        if (propinaActive && userNotPropina) {
            setUserNot((prevUserNot) => {
                const totalFinalActualizado = parseInt(prevUserNot.subTotal) + parseInt(userNotPropina);

                const actualizarDato = {
                    ...prevUserNot,
                    totalFinal: totalFinalActualizado,
                };

                localStorage.setItem('UserCarritoNoRegistrado', JSON.stringify(actualizarDato));

                return actualizarDato;
            });
        } else {
            setUserNot((prevUserNot) => {
                const totalFinalActualizado = userNot.subTotal;

                const actualizarDato = {
                    ...prevUserNot,
                    totalFinal: totalFinalActualizado,
                };

                localStorage.setItem('UserCarritoNoRegistrado', JSON.stringify(actualizarDato));

                return actualizarDato;
            });
        }
    }, [propinaActive, setUserNot, userNot.subTotal, userNotPropina]);

    return (
        <div className="master-container">
            <div className="card cart">
                <label className="title">Tu carrito</label>
                <div className="products">
                    {
                        userSesion ?
                            userObjetoSesion.carrito && userObjetoSesion.carrito.length > 0 ?
                                (
                                    userObjetoSesion.carrito.map((product, index) => (
                                        <CarritoProductos key={index} product={product} />
                                    ))
                                ) :
                                (
                                    <p className="not-products">No tienes productos en el carrito.</p>
                                )
                            :
                            userNot.carrito && userNot.carrito.length > 0 ?
                                (
                                    userNot.carrito.map((product, index) => (
                                        <CarritoProductos key={index} product={product} />
                                    ))
                                ) :
                                (
                                    <p className="not-products">No tienes productos en el carrito.</p>
                                )
                    }
                </div>
            </div>
            <div className="cards">
                <div className="card info checkout">
                    <label className="title">Info</label>
                    <div className="details">
                        {userSesion ?
                            (
                                <>
                                    {/* <span>Mesa:</span>
                                    <span>5</span> */}
                                    <span>Nombre:</span>
                                    <span>{userObjetoSesion.nombreCompleto}</span>
                                    <span>Número de teléfono:</span>
                                    <span>{userObjetoSesion.telefono}</span>
                                    <span>Correo:</span>
                                    <span>{userObjetoSesion.correo}</span>
                                    <span>Dirección</span>
                                    <span>{userObjetoSesion.direccion}</span>
                                </>
                            ) : (
                                <>
                                    <span>Mesa:</span>
                                    <span>5</span>
                                </>
                            )
                        }

                    </div>
                </div>

                {userSesion ?
                    (
                        <div className="card coupons">
                            <label className="title">{'Aplicar cupon'}</label>
                            <form className="formCupon" onSubmit={handleSubmitCupon}>
                                <input
                                    type="text"
                                    placeholder="Aplica tu cupón aquí"
                                    className="input_field"
                                    name="cupon"
                                    value={cupon}
                                    onChange={handleChangeCupon}
                                />
                                <button>Aplicar</button>
                            </form>
                        </div>
                    ) : ''
                }

                <div className="card checkout">
                    <label className="title">Verificar</label>
                    <div className="details">
                        <span>Subtotal de su carrito:</span>
                        <span>{userSesion ?
                            userObjetoSesion.subTotal ? userObjetoSesion.subTotal.toLocaleString() : 0
                            :
                            userNot.carrito && userNot.subTotal ? userNot.subTotal.toLocaleString() : 0
                        }$
                        </span>
                        {userSesion ?
                            userObjetoSesion && userObjetoSesion.cuponActivo && userObjetoSesion.cupon ?
                                (
                                    <>
                                        <span>Descuento mediante cupones aplicados:</span>
                                        <span>{descuentoCupon.toLocaleString()}$</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Descuento mediante cupones aplicados:</span>
                                        <span>0$</span>
                                    </>
                                ) : ''
                        }
                        <span>{userSesion ?
                            'Domicilio:'
                            :
                            'Propina (Opcional):'
                        }
                        </span>
                        {userSesion ?
                            (
                                <span>3.000$</span>
                            )
                            :
                            (
                                <span>
                                    <input type="checkbox" onClick={propinaCheckbox} />
                                    Pagar propina: {userNotPropina}$
                                </span>
                            )
                        }
                    </div>
                    <div className="checkout--footer">
                        <label className="price">
                            <sup>$</sup>{userSesion ?
                                userObjetoSesion && userObjetoSesion.totalFinal ?
                                    userObjetoSesion.totalFinal.toLocaleString()
                                    :
                                    0
                                : propinaActive ?
                                    userNot && userNot.totalFinal ?
                                        (userNot.totalFinal).toLocaleString()
                                        :
                                        0
                                    :
                                    userNot && userNot.totalFinal ?
                                        userNot.totalFinal.toLocaleString()
                                        :
                                        0
                            }
                        </label>
                        {userSesion ?
                            (
                                <button className="checkout-btn" onClick={handleOrdenar}>Ordenar y pagar</button>
                            )
                            :
                            (
                                <button className="checkout-btn" onClick={handleOrdenar}>Ordenar</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarroCompra;
