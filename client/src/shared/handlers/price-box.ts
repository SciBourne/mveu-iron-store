import { MouseEventHandler } from "react"

import { CartStore } from "../../stores"
import { Product } from "../../models"




function handleClickButton(product: Product, cart?: CartStore): MouseEventHandler {
  return (_event) => {
    if (cart) cart.addProduct(product, 1)
  }
}




function handleQuantifier(action: "inc" | "dec",
                          productID: string,
                          cart: CartStore,
                          buttonSwitches: Function[]): MouseEventHandler {

  switch (action) {
    case "inc":
      var targetMethod = cart.incProductQty
      break

    case "dec":
      var targetMethod = cart.decProductQty
      break

    default:
      console.error("Unknown action")
      return (_) => {}
  }

  return (_event) => {
    buttonSwitches.forEach(
      (setButtonDisabled) => {
        setButtonDisabled(true)
      }
    )

    setTimeout(
      () => {
        targetMethod(productID)

        buttonSwitches.forEach(
          (setButtonDisabled) => {
            setButtonDisabled(false)
          }
        )
      },

      250
    )
  }
}




export { handleClickButton, handleQuantifier }
