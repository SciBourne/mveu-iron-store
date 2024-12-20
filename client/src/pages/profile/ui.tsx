import { useContext, useState } from "react"
import { Navigate, NavLink, useNavigate } from "react-router-dom"
import { observer } from "mobx-react"

import { Context } from "../../context"

import {
  CartItemDetails,
  Order,
  OrderStatus,
  OrderStatusString,
  UserData,
  UserRegData
} from "../../models"

import {
  handleOnAuthChange,
  handleOnAuthSubmit,
  handleOnCancel,
  handleOnEditChange,
  handleOnEditSubmit,
  handleOnLogout,
  handleOnRegChange,
  handleOnRegSubmit
} from "./handlers"

import { ProductCard } from "../../shared"




const LoginPage = observer(
  (): JSX.Element | null => {
    const stores = useContext(Context)

    if (stores) {
      const [userAuth, setUserAuth] = useState({ login: "", password: "" })
      const [isErrAuth, setIsErrAuth] = useState(false)
      const navigate = useNavigate()

      return (
        <main className="content">
          <form className="login-form"
            onSubmit={
              handleOnAuthSubmit(
                stores.user,
                userAuth,
                setIsErrAuth,
                navigate
              )
            }
          >

            <label className="input-field">
              Логин

              <input defaultValue={userAuth.login}
                type="email"
                name="login"
                onChange={
                  handleOnAuthChange(
                    userAuth,
                    setUserAuth,
                    setIsErrAuth
                  )
                }
              />

            </label>

            <label className="input-field">
              Пароль

              <input defaultValue={userAuth.password}
                type="password"
                name="password"
                onChange={
                  handleOnAuthChange(
                    userAuth,
                    setUserAuth,
                    setIsErrAuth
                  )
                }
              />

            </label>

            <NavLink to="/reg">
              Регистрация
            </NavLink>

            <button className="button" type="submit">
              Войти
            </button>

            {
              isErrAuth && (
                <p className="error-msg">
                  * неверный логин или пароль
                </p>
              )
            }

          </form>
        </main>
      )

    } else {
      return null
    }
  }
)




function UserDataForm(
  props: {
    state: [UserRegData, Function],
    errState: [string, Function]
  }
): JSX.Element {

  const [errorInput, setErrorInput] = props.errState
  const [formData, setFormData] = props.state

  return (
    <div className="user-data">
      <div className="user-names">
        <label className="input-field">
          Имя

          <input value={formData.firstName}

            onChange={
              handleOnRegChange(
                formData,
                setFormData,
                setErrorInput
              )
            }

            required
            type="text"
            name="firstName" />

        </label>

        <label className="input-field">
          Фамилия

          <input value={formData.secondName}

            onChange={
              handleOnRegChange(
                formData,
                setFormData,
                setErrorInput
              )
            }

            required
            type="text"
            name="secondName" />

        </label>

        <label className="input-field">
          Отчество

          <input value={formData.patronymic}

            onChange={
              handleOnRegChange(
                formData,
                setFormData,
                setErrorInput
              )
            }

            required
            type="text"
            name="patronymic" />

        </label>
      </div>

      <div className="user-auth">
        <label className="input-field">
          E-mail

          <input value={formData.email}

            onChange={
              handleOnRegChange(
                formData,
                setFormData,
                setErrorInput
              )
            }

            required
            type="email"
            name="email" />

        </label>

        <label className="input-field">
          Телефон

          <input value={formData.phone}

            onChange={
              handleOnRegChange(
                formData,
                setFormData,
                setErrorInput
              )
            }

            required
            type="tel"
            name="phone" />

        </label>

        <label className="input-field">
          Пароль

          <input defaultValue={formData.password}

            onChange={
              handleOnRegChange(
                formData,
                setFormData,
                setErrorInput
              )
            }

            required
            type="password"
            name="password" />

        </label>

        <label className="input-field">
          Повторить пароль

          <input defaultValue={formData.passwordRepeat}

            onChange={
              handleOnRegChange(
                formData,
                setFormData,
                setErrorInput
              )
            }

            required
            type="password"
            name="passwordRepeat" />

          {
            errorInput == "passwordRepeat" && (
              <p className="error-msg">
                * пароли не совпадают
              </p>
            )
          }

        </label>
      </div>
    </div>
  )
}




function DeliveryDataForm(props: { state: [UserRegData, Function] }): JSX.Element {
  const [checkBoxValue, setCheckBoxValue] = useState(false)
  const [formData, setFormData] = props.state

  return (
    <>
      <h3>Адрес доставки</h3>
      <div className="delivery-data">
        <label className="input-field">
          Регион

          <input value={formData.region}
            onChange={handleOnRegChange(formData, setFormData)}
            required
            type="text"
            name="region" />

        </label>

        <label className="input-field">
          Населённый пункт

          <input value={formData.city}
            onChange={handleOnRegChange(formData, setFormData)}
            required
            type="text"
            name="city" />

        </label>

        <label className="input-field">
          Улица

          <input value={formData.street}
            onChange={handleOnRegChange(formData, setFormData)}
            required
            type="text"
            name="street" />

        </label>

        <label className="input-field">
          Дом

          <input value={formData.house}
            onChange={handleOnRegChange(formData, setFormData)}
            required
            type="number"
            name="house" />

        </label>

        <div className="input-apartment">
          <label className="input-field">
            Квартира
            <input value={formData.apartment}
              onChange={handleOnRegChange(formData, setFormData)}
              disabled={checkBoxValue}
              required
              type="number"
              name="apartment" />
          </label>

          <label className="input-checkbox">
            <input onChange={() => setCheckBoxValue(!checkBoxValue)}
              type="checkbox"
              name="is-private-house" />
            У меня частный дом
          </label>

        </div>
      </div>
    </>
  )
}




const RegPage = observer(
  (): JSX.Element | null => {
    const stores = useContext(Context)

    const [regData, setRegData] = useState({} as UserRegData)
    const [errorInput, setErrorInput] = useState("")

    if (stores) {
      return (
        <main className="content">
          <form className="user-reg-form"
            onSubmit={
              handleOnRegSubmit(
                stores.user,
                regData,
                [errorInput, setErrorInput]
              )
            }
          >

            <h2>Регистрация</h2>

            <UserDataForm state={[regData, setRegData]}
              errState={[errorInput, setErrorInput]} />

            <DeliveryDataForm state={[regData, setRegData]} />

            <button className="button" type="submit">
              Создать аккаунт
            </button>

            {
              errorInput == "email" && (
                <p className="error-msg">
                  * пользователь с данным email уже зарегистрирован
                </p>
              )
            }

          </form>
        </main>
      )

    } else {
      return null
    }
  }
)



function convertPhone(phoneNumber: number): string {
  const phone = phoneNumber.toString()

  const countryCode = phone.slice(0, 2)
  const opCode = phone.slice(2, 5)

  const part1 = phone.slice(5, 8)
  const part2 = phone.slice(8, 10)
  const part3 = phone.slice(10)

  return `${countryCode} (${opCode}) ${part1}-${part2}-${part3}`
}




function OrderCart(props: { order: Order }): JSX.Element {
  const orderID: string = props.order._id

  const date: string = new Date(props.order.date).toLocaleString()
  const comment: string | undefined = props.order.comment

  const status: OrderStatus | number = props.order.status
  const statusString: string = OrderStatusString[status]

  let totalQty = 0
  let totalPrice = 0

  props.order.items.forEach(
    (item: CartItemDetails) => {
      totalQty += item.qty
      totalPrice += item.price * item.qty
    }
  )

  return (
    <div className="order-card">
      <div className="order-info">
        <div className="item">
          <span className="header">Количество:</span>
          <span className="data">{totalQty}</span>
        </div>
        <div className="item">
          <span className="header">Сумма:</span>
          <span className="data">{totalPrice.toLocaleString()} ₽</span>
        </div>
        <div className="item">
          <span className="header">Дата:</span>
          <span className="data">{date}</span>
        </div>
        <div className="item">
          <span className="header">Номер заказа:</span>
          <span className="data">{orderID}</span>
        </div>
      </div>

      {
        props.order.items.map(
          (item: CartItemDetails) => {
            return <ProductCard {...item} key={item._id} />
          }
        )
      }

      {
        comment && (
          <div className="order-comment">
            <span className="header">Комментарий к заказу:</span>
            <p className="data">«{comment}»</p>
          </div>
        )
      }

      <div className="order-status">
        <span className="status">Статус:
          <span className="data">
            {statusString}
          </span>
        </span>

        {
          status == OrderStatus.IN_PROGRESS && (
            <button className="cancel-button" onClick={() => { }}>
              <img src="/img/button-cancel-icon.svg" alt="calcel" />
              <span>Отменить заказ</span>
            </button>
          )
        }

      </div>
    </div>
  )
}




function OrderList(props: { orders: Order[] }): JSX.Element {
  return (
    <div className="order-list">
      {
        props.orders.map(
          (order: Order) => (
            <OrderCart order={order} key={order._id} />
          )
        )
      }
    </div>
  )
}




function EditionDataForm(
  props: {
    currentData: UserData,
    newDataState: [UserData, Function]
  }

): JSX.Element {

  const [checkBoxValue, setCheckBoxValue] = useState(
    props.currentData.apartment ? false : true
  )

  const [newData, setNewData] = props.newDataState

  return (
    <form className="user-edit-form" id="edit-form" >

      <h3>Данные пользователя</h3>

      <div className="user-data">
        <div className="user-names">

          <label className="input-field">
            Имя
            <input type="text"
                   name="firstName"
                   defaultValue={ props.currentData.firstName }
                   onChange={ handleOnEditChange(newData, setNewData) } />
          </label>

          <label className="input-field">
            Фамилия
            <input type="text"
                   name="secondName"
                   defaultValue={ props.currentData.secondName }
                   onChange={ handleOnEditChange(newData, setNewData) } />
          </label>

          <label className="input-field">
            Отчество
            <input type="text"
                   name="patronymic"
                   defaultValue={ props.currentData.patronymic }
                   onChange={ handleOnEditChange(newData, setNewData) } />
          </label>

        </div>

        <div className="user-contacts">
          <label className="input-field">
            Телефон
            <input type="tel"
                   name="phone"
                   defaultValue={ props.currentData.phone }
                   onChange={ handleOnEditChange(newData, setNewData) } />
          </label>
        </div>

      </div>

      <h3>Адрес доставки</h3>

      <div className="delivery-data">

        <label className="input-field">
          Регион
          <input type="text"
                 name="region"
                 defaultValue={ props.currentData.region }
                 onChange={ handleOnEditChange(newData, setNewData) } />
        </label>

        <label className="input-field">
          Населённый пункт
          <input type="text"
                 name="city"
                 defaultValue={ props.currentData.city }
                 onChange={ handleOnEditChange(newData, setNewData) } />
        </label>

        <label className="input-field">
          Улица
          <input type="text"
                 name="street"
                 defaultValue={ props.currentData.street }
                 onChange={ handleOnEditChange(newData, setNewData) } />
        </label>

        <label className="input-field">
          Дом
          <input type="number"
                 name="house"
                 defaultValue={ props.currentData.house }
                 onChange={ handleOnEditChange(newData, setNewData) } />
        </label>

        <div className="input-apartment">

          <label className="input-field">
            Квартира
            <input type="number"
                   name="apartment"
                   defaultValue={ props.currentData.apartment }
                   disabled={ checkBoxValue }
                   onChange={ handleOnEditChange(newData, setNewData) } />
          </label>

          <label className="input-checkbox">
            <input type="checkbox"
                   name="is-private-house"
                   checked={ checkBoxValue }
                   onChange={ () => setCheckBoxValue(!checkBoxValue) } />
            У меня частный дом
          </label>

        </div>
      </div>
    </form>
  )
}




const ProfilePage = observer(
  (): JSX.Element | null => {
    const stores = useContext(Context)

    if (stores) {
      const [isFormVisible, setFormVisible] = useState(false)

      const user = stores.user
      const orders = stores.orders
      const data = user.data

      if (user.isAuth) {
        const [newData, setNewData] = useState({ ...data } as UserData)

        if (data) {
          return (
            <main className="content profile-page">
              <button className="button-dangerous button-logout"
                      onClick={ handleOnLogout(stores) }>
                Выйти
              </button>

              <div className="user-info">
                <h2>{data.firstName} {data?.patronymic} {data?.secondName}</h2>
                <span>{data.email}</span>
                <span>{convertPhone(data.phone)}</span>
                <span>
                  Россия,&nbsp;
                  {data.region},&nbsp;
                  г. {data.city},&nbsp;
                  ул. {data.street},&nbsp;
                  д. {data.house}
                  {data.apartment && ", кв. " + data.apartment}
                </span>
              </div>

              {
                isFormVisible && (
                  <EditionDataForm currentData={ data }
                                   newDataState={ [newData, setNewData] } />
                )
              }

              <div className="button-form-block">
                {
                  isFormVisible && (
                    <button className="button-dangerous"
                            onClick={ handleOnCancel(setFormVisible, setNewData, data) } >
                      Отмена
                    </button>
                  )
                }

                <button className="button"
                        type="submit"
                        form="edit-form"

                        onClick={
                          handleOnEditSubmit(
                            [isFormVisible, setFormVisible],
                            [newData, setNewData],
                            data,
                            user
                          )
                        }
                >
                  { isFormVisible ? "Сохранить данные" : "Редактировать данные" }
                </button>
              </div>

              <h2>История заказов</h2>

              {
                  orders.content.length != 0
                      ? <OrderList orders={orders.content} />
                      : <p>Пока пусто...</p>
              }

            </main>
          )

        } else {
          return <Navigate to="/" />
        }

      } else {
        return <Navigate to="/login" />
      }

    } else {
      return null
    }
  }
)




export { LoginPage, RegPage, ProfilePage }
