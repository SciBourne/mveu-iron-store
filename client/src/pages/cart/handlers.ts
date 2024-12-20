import { FormEventHandler, FormEvent } from "react"

import { CartStore, OrderStore } from "../../stores"
import { OrderRequest } from "../../models"




function handleOnChange(formData: OrderRequest, setFormData: Function): FormEventHandler {
  return (event: FormEvent) => {
    const target = event.target as HTMLFormElement

    setFormData(
      {
        ...formData,
        [target.name]: target.value
      }
    )
  }
}




function handleCartSubmit(cart: CartStore,
                          orders: OrderStore,
                          formData: OrderRequest): FormEventHandler {

  return async (event: FormEvent) => {
    event.preventDefault()

    try {
      const status = await orders.createOrder(formData)

      if (status) cart.clear()

    } catch (err) {
      console.log(err)
    }
  }
}




export { handleOnChange, handleCartSubmit }
