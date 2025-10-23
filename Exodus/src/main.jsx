import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import Login from './login/Login.jsx'

import Register from './cadastro/register.jsx'
import RegisterADM from './cadastro/registerFirstADM.jsx'
import RegisterExam from './cadastro/registerExam.jsx'
import RegisterClinic from './cadastro/registerClinic.jsx'
import RegisterLaboratory from './cadastro/registerLab.jsx'
import RegisterDoctor from './cadastro/registerDoctor.jsx'

import CheckDoctor from './cadastro/Check-in Fluxo/CheckDoctor.jsx' 
import CheckLaboratory from './cadastro/Check-in Fluxo/CheckLab.jsx'

import Perfil from './perfil/Perfil.jsx'
import ResetSenha from './login/ResetSenha.jsx'
import FirstLogin from './login/FirstLogin.jsx'

import SelectAll from './select_all/SelectAll.jsx'
import RegisterSecretaria from './cadastro/registerSecretaria.jsx'
import RegisterConsulta from './cadastro/registerConsulta.jsx'



import { createBrowserRouter, RouterProvider} from "react-router-dom";


//ROTAS!!!!!!!!!!!!!!!!!
const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/login", element: <Login />},

  {path: "/register", element: <Register />},
  {path: "/registeradm", element: <RegisterADM />},
  {path: "/registerExam", element: <RegisterExam/>},
  {path: "/registerClinica", element: <RegisterClinic/>},
  {path: "/registerLaboratory", element: <RegisterLaboratory/>},
  {path: "/registerMedico", element: <RegisterDoctor/>},
  {path: "/perfil", element: <Perfil/>},
  {path: "/resetSenha", element: <ResetSenha/>},
  {path: "/firstLogin/:token?", element: <FirstLogin/>},
  {path: "/checkDoctor", element: <CheckDoctor/>},
  {path: "/checkLab", element: <CheckLaboratory/>},
  { path: "/selectAll/:role?", element: <SelectAll /> },
  { path: "/registerSecretaria", element: <RegisterSecretaria /> },
  { path: "/registerConsulta", element: <RegisterConsulta /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>
);
