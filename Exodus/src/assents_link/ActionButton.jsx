import React from "react";
//estilo do css
import Style from "./ActionButton.module.css"; 

export default function ActionButton({ //coisas 
  //Texto do botão
  text,           
  //metodo de load da própria página
  loading,       
  //condições pra desabilitar o botão  
  disabled,       
  //evento de clique <---------- O MAIS IMPORTANTE 
  onClick,       
 



  
}) {
  return (
    <button
    //classe no css
      className={Style.btn}

      type={"submit"}
      onClick={onClick}
      disabled={disabled || loading}

    >
      {
      //if(loading) = loadingText; else = text
      loading ? "Carregando..." : text}
    </button>
  );
}
