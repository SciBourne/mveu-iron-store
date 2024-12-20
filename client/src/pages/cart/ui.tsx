import { MouseEventHandler, useContext, useEffect, useState } from "react"
import { observer } from "mobx-react"

import SideNavigator from "../../widgets/navigator/side-navigator"
import { ButtonBack, ProductCard } from "../../shared"
import { CartItemDetails, OrderRequest } from "../../models"
import { Context } from "../../context"
import { postfixMaker } from "../../shared/lib"
import { EmptyCart } from "../../widgets/errors"
import { CartStore } from "../../stores"
import { handleCartSubmit, handleOnChange } from "./handlers"




function CartList(props: {content: CartItemDetails[]}): JSX.Element {
  return (
    <div className="cart-item-list">
      {
        props.content.map(
          (item: CartItemDetails) => {
            return (
              <ProductCard { ...item } key={ item._id } />
            )
          }
        )
      }
    </div>
  )
}




function AmountBox(
  props: {
    type: "submit" | "button"
    qty: number,
    amount: number,
    buttonHandler?: MouseEventHandler
  }

): JSX.Element {

  const postfix: string = postfixMaker(props.qty)

  switch (props.type) {
    case "button":
      var buttonContent = "ОФОРМИТЬ ЗАКАЗ"
      break

    case "submit":
      var buttonContent = "ПОДТВЕРДИТЬ ЗАКАЗ"
      break
  }

  return (
    <div className="amount-box">
      <span className="amount-box-header">
        Итого:
      </span>

      <span className="amount-box-qty">
        { props.qty } товар{postfix}
      </span>

      <span className="amount-box-amount">
        { props.amount.toLocaleString("Ru-ru") } ₽
      </span>

      <button type={ props.type }
              className="button-store"
              onClick={ props.buttonHandler }>

        { buttonContent }

      </button>
    </div>
  )
}




function CartContent(props: {cart: CartStore, toggleVisible: Function}): JSX.Element {
  return (
    <div className="cart-grid">
      <CartList content={ props.cart.content } />

      <AmountBox type="button"
                 qty={ props.cart.total }
                 amount={ props.cart.amount }
                 buttonHandler={ () => props.toggleVisible(true) } />
    </div>
  )
}




function UserData(props: {state: [OrderRequest, Function]}): JSX.Element {
  const [formData, setFormData] = props.state

  return (
    <div className="user-data">
      <h2>Данные пользователя</h2>

      <div className="user-names">
        <label className="input-field">
          Имя

          <input value={ formData.firstName }
                 onChange={ handleOnChange(formData, setFormData) }
                 required
                 type="text"
                 name="firstName" />

        </label>

        <label className="input-field">
          Фамилия

          <input value={ formData.secondName }
                 onChange={ handleOnChange(formData, setFormData) }
                 required
                 type="text"
                 name="secondName" />

        </label>

        <label className="input-field">
          Отчество

          <input value={ formData.patronymic }
                 onChange={ handleOnChange(formData, setFormData) }
                 required
                 type="text"
                 name="patronymic" />

        </label>
      </div>

      <div className="user-contacts">
        <label className="input-field">
          E-mail

          <input value={ formData.email }
                 onChange={ handleOnChange(formData, setFormData) }
                 required
                 type="email"
                 name="email" />

        </label>

        <label className="input-field">
          Телефон

          <input value={ formData.phone }
                 onChange={ handleOnChange(formData, setFormData) }
                 required
                 type="tel"
                 name="phone" />

        </label>
      </div>
    </div>
  )
}




function DeliveryData(props: {state: [OrderRequest, Function]}): JSX.Element {
  const [checkBoxValue, setCheckBoxValue] = useState(false)
  const [formData, setFormData] = props.state

  return (
    <>
      <div className="delivery-data">
        <h2>Адрес доставки</h2>
        <label className="input-field">
          Регион

          <input value={ formData.region }
                 onChange={ handleOnChange(formData, setFormData) }
                 required
                 type="text"
                 name="region" />

        </label>

        <label className="input-field">
          Населённый пункт

          <input value={ formData.city }
                 onChange={ handleOnChange(formData, setFormData) }
                 required
                 type="text"
                 name="city" />

        </label>

        <label className="input-field">
          Улица

          <input value={ formData.street }
                 onChange={ handleOnChange(formData, setFormData) }
                 required
                 type="text"
                 name="street" />

        </label>

        <label className="input-field">
          Дом

          <input value={ formData.house }
                 onChange={ handleOnChange(formData, setFormData) }
                 required
                 type="number"
                 name="house" />

        </label>

        <label className="input-field">
          Квартира

          <input value={ formData.apartment }
                 onChange={ handleOnChange(formData, setFormData) }
                 disabled={ checkBoxValue }
                 required
                 type="number"
                 name="apartment" />

        </label>

        <label className="input-checkbox">

          <input onChange={ () => setCheckBoxValue(!checkBoxValue) }
                 type="checkbox"
                 name="is-private-house" />

          У меня частный дом
        </label>
      </div>
    </>
  )
}




function CommentData(props: {state: [OrderRequest, Function]}): JSX.Element {
  const [formData, setFormData] = props.state

  return (
    <label className="input-comment">
      <h2>Комментарий</h2>

      <textarea value={ formData.comment || undefined }
                onChange={ handleOnChange(formData, setFormData) }
                name="comment"
                rows={ 6 } />

    </label>
  )
}




const OrderRegForm = observer(
  (): JSX.Element | null => {
    const stores = useContext(Context)
    const [formData, setFormData] = useState({} as OrderRequest)

    if (stores) {
      const cart = stores.cart
      const orders = stores.orders

      useEffect(
        () => {
          setFormData(
            {
              ...formData,
              items: cart.content
            }
          )
        },

        []
      )

      return (
        <div className="order-reg-position">
          <form className="order-reg"
                onSubmit={ handleCartSubmit(cart, orders, formData) } >

            <UserData state={ [formData, setFormData] } />
            <DeliveryData state={ [formData, setFormData] } />
            <CommentData state={ [formData, setFormData] } />

            <AmountBox type="submit"
                       qty={ cart.total }
                       amount={ cart.amount } />

          </form>
        </div>
      )
    }

    return null
  }
)




const CartPage = observer(
  (): JSX.Element | null => {
    const stores = useContext(Context)

    if (stores && stores.cart) {
      const cart = stores.cart

      const visibleNavState = useState(true)
      const [orderRegVisible, setOrderRegVisible] = useState(false)

      return (
        <main className="content">
          <ButtonBack />
          <div className="cart-page">
            <SideNavigator context={ visibleNavState } />
            {
              cart.total > 0
                  ? orderRegVisible
                      ? <OrderRegForm />
                      : <CartContent cart={ cart } toggleVisible={ setOrderRegVisible } />
                  : <EmptyCart />
            }
          </div>
        </main>
      )
    }

    return null
  }
)




export default CartPage
