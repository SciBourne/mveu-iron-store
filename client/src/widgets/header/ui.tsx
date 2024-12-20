import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { observer } from "mobx-react"

import Logo from "../../shared/ui/logo"
import Phone from "../../shared/ui/phone"
import { Context } from "../../context"
import { postfixMaker } from "../../shared/lib"




function CartLink(): JSX.Element {
  return (
    <NavLink to="/cart">
      <img src="/img/cart.svg" alt="Корзина товаров" />
    </NavLink>
  )
}




function ProfileLink(): JSX.Element {
  return (
    <NavLink to="/profile">
      <img src="/img/user-profile.svg" alt="Профиль пользователя" />
    </NavLink>
  )
}




const CartInfo = observer(
  (): JSX.Element | null => {
    const stores = useContext(Context)

    if (stores && stores.cart) {
      const { total, amount } = stores.cart

      if (total > 0) {
        const postfix: string = postfixMaker(total)

        return (
          <>
            <span>
              <span className="cart-info-number">
                { total }
              </span>

              <span className="cart-info-text">
                товар{ postfix } на
              </span>

              <span className="cart-info-number">
                { amount.toLocaleString("Ru-ru") } ₽
              </span>
            </span>
          </>
        )
      }
    }

    return null
  }
)




function CartBlock(): JSX.Element {
  return (
    <>
      <CartLink />
      <CartInfo />
    </>
  )
}




function TopMenu(): JSX.Element{
  return (
    <div className="top-menu">
      <ProfileLink />
      <CartBlock />
    </div>
  )
}




function Header(): JSX.Element {
  return (
    <header>
      <div className="content">
        <Logo styleClass="logo-s" />
        <Phone number="+79991234567" />
        <TopMenu />
      </div>
    </header>
  )
}




export default Header
