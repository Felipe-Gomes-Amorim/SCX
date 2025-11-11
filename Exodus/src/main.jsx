import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Login from './login/Login.jsx';
import Sobre from './sobre.jsx';
import Register from './cadastro/register.jsx';
import RegisterADM from './cadastro/registerFirstADM.jsx';
import RegisterExam from './cadastro/registerExam.jsx';
import RegisterClinic from './cadastro/registerClinic.jsx';
import RegisterLaboratory from './cadastro/registerLab.jsx';
import RegisterDoctor from './cadastro/registerDoctor.jsx';
import SelectClinics from './select_all/SelectClinics.jsx';
import CheckDoctor from './cadastro/Check-in Fluxo/CheckDoctor.jsx';
import CheckLaboratory from './cadastro/Check-in Fluxo/CheckLab.jsx';
import Home from './home/Home.jsx';
import ResetSenha from './login/EmailResetSenha.jsx';
import ResetPassword from './login/FirstLogin.jsx';
import Notifications from './select_all/NotificList.jsx';
import CheckPatient from './cadastro/Check-in Fluxo/CheckPatient.jsx';
import SelectAll from './select_all/SelectAll.jsx';
import RegisterSecretaria from './cadastro/registerSecretaria.jsx';
import RegisterConsulta from './cadastro/registerAtendimento.jsx';
import RequisitarExame from './cadastro/registerRequisicaoExame.jsx';
import Profile from './login/Profile.jsx';
import AdmArea from './home/AdmArea.jsx';
import RegisterRequisicaoExame from './cadastro/registerRequisicaoExame.jsx';
import RegisterTicket from './cadastro/registerTicket.jsx';
import ResponseTicket from './cadastro/registerTicketResponse.jsx';
import { ToastProvider } from './context/ToastProvider.jsx';

// ROTAS
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
  { path: "/emailresetSenha", element: <ResetSenha /> },
  { path: "/resetpassword/:token?", element: <ResetPassword /> },
  { path: "/checkDoctor", element: <CheckDoctor /> },
  { path: "/checkLab", element: <CheckLaboratory /> },
  { path: "/checkPatient", element: <CheckPatient /> },
  { path: "/selectAll/:role?", element: <SelectAll /> },
  { path: "/registerSecretaria", element: <RegisterSecretaria /> },
  { path: "/registerConsulta", element: <RegisterConsulta /> },
  { path: "/requisitarExame", element: <RequisitarExame /> },
  { path: "/registerTicket", element: <RegisterTicket /> },
  { path: "/responseTicket/:id", element: <ResponseTicket /> },
  { path: "/selectAll/clinics", element: <SelectClinics /> },
  { path: "/profile/:role?", element: <Profile /> },
  { path: "/notification", element: <Notifications /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </StrictMode>
);
