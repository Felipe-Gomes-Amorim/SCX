import React from "react";
//estilo do css
import Style from "./GenericButton.module.css"; 
import { useNavigate } from "react-router-dom";


export default function ActionButton({ //coisas 
  //Texto do botão
    text,                  
    //lugar pra onde vai no OnClick
    place
}) 
{
  const navigate = useNavigate();
  return (
    <button
    //classe no css
      className={Style.btn}
        
      type={"submit"}
      onClick={() => navigate(place)}
    >
      {text}
    </button>
  );
}
