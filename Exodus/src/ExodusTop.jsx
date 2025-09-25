import { Link } from "react-router-dom";
import Style from './login/Login.module.css'
function ExodusTop(){
    return (
      
      <header className={Style.login_header}>
        <Link to={"/"} className={Style.hyperText}><h1><strong>EXODUS</strong></h1></Link>
      </header>

    );
};

export default ExodusTop;