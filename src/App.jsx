import { Routes, Route } from 'react-router-dom';
import { IniciarSesion, Registro } from './page/IniciarOrRegistrar';
import Qr from './page/QR';
import Home from './page/Home';
import Menu from './page/Menu';
import Carrito from './page/Carrito';
import Cocina from './page/Cocina';
import HistorialOrden from './page/HistorialOrden';

function App() {
  return (
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/Qr' exact element={<Qr />} />
      <Route path='/iniciar-sesion' element={<IniciarSesion />} />
      <Route path='/registro' element={<Registro />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/carro' element={<Carrito />} />
      <Route path='/cocina' element={<Cocina />} />
      <Route path='/historial' element={<HistorialOrden />} />
    </Routes>
  )
}

export default App
