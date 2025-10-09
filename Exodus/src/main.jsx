import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './login/Login.jsx'
import Register from './cadastro/register.jsx'
import RegisterADM from './cadastro/registerADM.jsx'
import Perfil from './perfil/Perfil.jsx'
import RegisterExam from './cadastro/registerExam.jsx'


import { createBrowserRouter, RouterProvider} from "react-router-dom";
//ROTAS!!!!!!!!!!!!!!!!!
const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />},
  {path: "/registeradm", element: <RegisterADM />},
  {path: "/perfil", element: <Perfil/>},
  {path: "/registerExam", element: <RegisterExam/>}
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>
);
