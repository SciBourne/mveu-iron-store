import { NavLink } from "react-router-dom"

import Logo from "../../shared/ui/logo"
import Phone from "../../shared/ui/phone"
import Mail from "../../shared/ui/mail"
import Copyrigth from "../../shared/ui/copyright"




function Footer(): JSX.Element {
  return (
    <footer>
      <div className="content">
        <BottomMenu />
        <Logo styleClass="logo-m" />

        <div className="contacts">
          <Phone number="+79991234567"/>
          <Mail address="info@iron-store.ru" />
          <SocialLinks />
        </div>

      </div>
      <Copyrigth companyName="IRON Store" />
    </footer>
  )
}



function BottomMenu(): JSX.Element {
  return (
    <nav className="bottom-menu">
      <ul>
        <li>
          <NavLink to="/catalog">Категории товаров</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Личный кабинет</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Корзина</NavLink>
        </li>
      </ul>
    </nav>
  )
}



function SocialLinks(): JSX.Element {
  return (
    <div className="social-links">
      <a href="https://vk.com">
        <img src="/img/vk.svg" alt="VK" />
      </a>
      <a href="https://web.telegram.org">
        <img src="/img/telegram.svg" alt="Telegram" />
      </a>
      <a href="https://youtube.com">
        <img src="/img/youtube.svg" alt="YouTube" />
      </a>
    </div>
  )
}




export default Footer
