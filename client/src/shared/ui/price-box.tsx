import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { observer } from "mobx-react"

import { handleClickButton, handleQuantifier } from "../handlers/price-box"
import { Context } from "../../context"
import { Product } from "../../models"




interface priceProps {
  value: number
}

function Price(props: priceProps): JSX.Element {
  return (
    <span className="price">
      { props.value ? props.value.toLocaleString("RU-ru") : "0" } ₽
    </span>
  )
}




function CartIcon(): JSX.Element {
  return (
    <img className="cart-icon"
         src="/img/cart-plus.svg"
         alt="Корзина" />
  )
}


const ButtonStore = observer(
  (props: { product: Product }): JSX.Element => {
    const cart = useContext(Context)?.cart

    const activeContent = "В КОРЗИНУ"
    const disabledContent = "ДОБАВЛЕНО"

    return (
      <button onClick={ handleClickButton(props.product, cart) }
              disabled={ cart?.getItem(props.product._id) ? true : false }
              className="button-store"
              type="button">

        { cart?.getItem(props.product._id) ? disabledContent : activeContent }

      </button>
    )
  }
)




const Quantifier = observer(
  (props: {product: Product}): JSX.Element | null => {
    const stores = useContext(Context)

    if (stores && stores.cart) {
      const [leftDisabled, setLeftDisabled] = useState(true)
      const [rightDisabled, setRightDisabled] = useState(false)

      const cart = stores.cart

      useEffect(
        () => {
          cart.getQty(props.product._id) <= 1
              ? setLeftDisabled(true)
              : setLeftDisabled(false)

          cart.getQty(props.product._id) >= props.product.balance
              ? setRightDisabled(true)
              : setRightDisabled(false)
        },

        [cart.getQty(props.product._id)]
      )

      return (
        <div className="quantifier">
          <button type="button"
                  disabled={ leftDisabled }

                  onClick={
                    handleQuantifier(
                      "dec",
                      props.product._id,
                      cart,
                      [setLeftDisabled, setRightDisabled]
                    )
          }>
            <img src="/img/quantifier-minus.svg" alt="minus" />
          </button>

          <span className="qty">
            { cart.getQty(props.product._id) }
          </span>

          <button type="button"
                  disabled={ rightDisabled }

                  onClick={
                    handleQuantifier(
                      "inc",
                      props.product._id,
                      cart,
                      [setLeftDisabled, setRightDisabled]
                    )
          }>
            <img src="/img/quantifier-plus.svg" alt="plus" />
          </button>
        </div>
      )

    } else {
      return null
    }
  }
)




function PriceBox(props: { product: Product, theme?: string }): JSX.Element {
  const theme: string = props.theme ? "-" + props.theme : ""
  const location: string = useLocation().pathname

  let containerStyle: string = "price-box" + theme
  let payloadContent: JSX.Element

  switch ( props.theme ) {
    case "dark":
      payloadContent = (
        <>
          <Price value={ props.product.price } />
          <CartIcon />
        </>
      )

      break;

    case "dark-popup":
      payloadContent = (
        <>
          <Price value={ props.product.price } />
          <CartIcon />
        </>
      )

      break;

    default:
      payloadContent = (
        <>
          <CartIcon />
          <Price value={ props.product.price } />
        </>
      )

      break;
  }

  return (
    <form className={ containerStyle } >
      <div className="payload">
        { payloadContent }
      </div>

      {
        location == "/cart"
            ? <Quantifier product={ props.product } />
            : location == "/profile"
                  ? null
                  : <ButtonStore product={ props.product } />
      }

    </form>
  )
}




export default PriceBox
