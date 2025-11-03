import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import Login from './login/Login.jsx'
import Sobre from './sobre.jsx'

import Register from './cadastro/register.jsx'
import RegisterADM from './cadastro/registerFirstADM.jsx'
import RegisterExam from './cadastro/registerExam.jsx'
import RegisterClinic from './cadastro/registerClinic.jsx'
import RegisterLaboratory from './cadastro/registerLab.jsx'
import RegisterDoctor from './cadastro/registerDoctor.jsx'
import SelectClinics from './select_all/SelectClinics.jsx'

import CheckDoctor from './cadastro/Check-in Fluxo/CheckDoctor.jsx'
import CheckLaboratory from './cadastro/Check-in Fluxo/CheckLab.jsx'

import Home from './home/Home.jsx'
import ResetSenha from './login/ResetSenha.jsx'
import FirstLogin from './login/FirstLogin.jsx'


import SelectAll from './select_all/SelectAll.jsx'
import RegisterSecretaria from './cadastro/registerSecretaria.jsx'
import RegisterConsulta from './cadastro/registerConsulta.jsx'
import RequisitarExame from './cadastro/registerRequisicaoExame.jsx'
import Profile from './login/Profile.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdmArea from './home/AdmArea.jsx'
import RegisterRequisicaoExame from './cadastro/registerRequisicaoExame.jsx'
import RegisterTicket from './cadastro/registerTicket.jsx'
import ResponseTicket from './cadastro/registerTicketResponse.jsx'

//ROTAS!!!!!!!!!!!!!!!!!
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/sobre", element: <Sobre /> },
  { path: "/register", element: <Register /> },
  { path: "/registeradm", element: <RegisterADM /> },
  { path: "/registerExam/:id?", element: <RegisterExam /> },
  { path: "/registerClinica", element: <RegisterClinic /> },
  { path: "/registerLaboratory", element: <RegisterLaboratory /> },
  { path: "/registerMedico", element: <RegisterDoctor /> },
  { path: "/home", element: <Home /> },
  { path: "/resetSenha", element: <ResetSenha /> },
  { path: "/firstLogin/:token?", element: <FirstLogin /> },
  { path: "/checkDoctor", element: <CheckDoctor /> },
  { path: "/checkLab", element: <CheckLaboratory /> },
  { path: "/selectAll/:role?", element: <SelectAll /> },
  { path: "/registerSecretaria", element: <RegisterSecretaria /> },
  { path: "/registerConsulta", element: <RegisterConsulta /> },
  { path: "/requisitarExame", element: <RequisitarExame /> },
  { path: "/registerTicket", element: <RegisterTicket /> },
  { path: "/responseTicket/:id", element: <ResponseTicket /> },
  { path: "/selectAll/clinics", element: <SelectClinics /> },
  { path: "/profile/:role?", element: <Profile /> },



]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
