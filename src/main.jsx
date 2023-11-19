import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/main.scss'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <App />
      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </UserProvider>
  </BrowserRouter>

)
