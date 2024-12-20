import { FormEventHandler, FormEvent } from "react"

import { UserAuth, UserData, UserRegData } from "../../models"
import { UserStore } from "../../stores/user"
import { Stores } from "../../context"




function handleOnAuthChange(
  state: UserAuth,
  setState: Function,
  setErr: Function

): FormEventHandler {

  return (event: FormEvent) => {
    const target = event.target as HTMLFormElement

    setErr(false)
    setState({ ...state, [target.name]: target.value })
  }
}



function handleOnAuthSubmit(
  user: UserStore,
  authData: UserAuth,
  setErr: Function,
  navigate: Function

): FormEventHandler {

  return async (event: FormEvent) => {
    event.preventDefault()

    try {
      await user.login(authData.login, authData.password)

      if (user.isAuth) {
        navigate("/profile")

      } else {
        setErr(true)
      }

    } catch (err) {
      console.log(err)
    }
  }
}




function handleOnRegChange(
  state: UserRegData,
  setState: Function,
  setError?: Function

): FormEventHandler {

  return (event: FormEvent) => {
    const target = event.target as HTMLFormElement

    if (setError) {
      if (target.name == "passwordRepeat") {
        if (target.value != state.password) {
          setError("passwordRepeat")

        } else {
          setError("")
        }

      } else {
        setError("")
      }
    }

    setState({ ...state, [target.name]: target.value })
  }
}




function handleOnRegSubmit(
  user: UserStore,
  regData: UserRegData,
  errState: [string, Function]

): FormEventHandler {

  return async (event: FormEvent) => {
    const [errorInput, setErrorInput] = errState

    event.preventDefault()

    try {
      if (!errorInput) {
        const status = await user.register(regData)

        if (status) {
          window.location.href = "/profile"
        } else {
          setErrorInput("email")
        }
      }

    } catch (err) {
      console.log(err)
    }
  }
}




function handleOnEditChange(
  state: UserData,
  setState: Function

): FormEventHandler {

  return (event: FormEvent) => {
    const target = event.target as HTMLFormElement

    setState({ ...state, [target.name]: target.value })
  }
}




function handleOnEditSubmit(
  formState: [boolean, Function],
  newUserDataState: [UserData, Function],
  userData: UserData,
  userStore: UserStore,

): FormEventHandler {

  return async (event: FormEvent) => {
    const [newUserData, setNewUserData] = newUserDataState
    const [isFormVisible, setFormVisible] = formState

    event.preventDefault()

    switch (isFormVisible) {
      case true:
        if (JSON.stringify(userData) != JSON.stringify(newUserData)) {
          try {
            await userStore.updateData(newUserData)
            setNewUserData(userData)

          } catch (err) {
            console.log(err)
          }
        }

        setFormVisible(false)
        break

      case false:
        setFormVisible(true)
        break
    }
  }
}




function handleOnCancel(
  setFormVisible: Function,
  setNewData: Function,
  currentData: UserData

): FormEventHandler {

  return async (_event: FormEvent) => {
    setNewData({ ...currentData } as UserData)
    setFormVisible(false)
  }
}




function handleOnLogout(stores: Stores): FormEventHandler {
  return async (_event: FormEvent) => {
    try {
      await stores.user.logout()
      stores.clear()

      window.location.href = "/"

    } catch (err) {
      console.log(err)
    }
  }
}




export {
  handleOnAuthChange,
  handleOnAuthSubmit,

  handleOnRegChange,
  handleOnRegSubmit,

  handleOnEditChange,
  handleOnEditSubmit,

  handleOnCancel,
  handleOnLogout
}
