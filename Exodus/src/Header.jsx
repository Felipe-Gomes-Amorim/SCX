import Style from './Header.module.css'

function Header(){
  return (
  <header className={Style.top_bar}>
    <div className={Style.top_info}>
      <span><a href="mailto:emailteste@gmail.com.br">emailteste@gmail.com.br</a></span>
      <span>Rua Teste de endereço, 777 - Vila Teste - Belo Horizonte / MG</span>
      <span>(11) 4444 4444</span>
    </div>
  </header>
  )
}

export default Header
