import { MouseEventHandler } from "react";
import { CartStore } from "../../stores";




function handleRemove(productID: string, cart: CartStore): MouseEventHandler {
  return (_event) => {
    cart.remProduct(productID)
  }
}




export { handleRemove }
