/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

// eslint-disable-next-line react/prop-types
const ScrollEffect = ({ children }) => {
    const config1 = {
        origin: 'top',
        distance: '85px',
        duration: 1500,
        reset: false,
    };

    const config2 = {
        duration: 1000,
        origin: 'bottom',
        distance: '20px',
        delay: 50,
        interval: 100,
        useDelay: 'always',
        reset: true,
    }

    useEffect(() => {
        ScrollReveal().reveal(document.querySelector('.form'), config1);
        ScrollReveal().reveal(document.querySelector('.menu'), config2);
        ScrollReveal().reveal(document.querySelector('.contenedor-historial-ordenes'), config2);
    }, [config1, config2]);

    return <div>{children}</div>;
}

export default ScrollEffect