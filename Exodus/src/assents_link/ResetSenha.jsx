import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Style from "./ResetSenha.module.css";    
export default function Login() {


  

  return (
    <Link to="/emailresetSenha" className={Style.text}>
    Esqueceu sua senha?
    </Link>
  );
}
