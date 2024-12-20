import { createContext } from "react"

import { CartStore } from "../stores"
import { OrderStore } from "../stores"
import { UserStore } from "../stores/user"




interface Stores {
  cart: CartStore,
  orders: OrderStore,
  user: UserStore,

  clear(): void
}


const stores: Stores = {
  cart: new CartStore(),
  orders: new OrderStore(),
  user: new UserStore(),

  clear(): void {
    stores.cart.clear()
    stores.orders.clear()
    stores.user.clear()
  }
}


const Context = createContext<Stores | undefined>(undefined)




export { type Stores, Context, stores }
