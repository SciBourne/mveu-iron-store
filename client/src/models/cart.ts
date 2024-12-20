import { Product } from "./products"




interface CartItem {
  _id: string
  qty: number
}


interface CartItemDetails extends Product {
  qty: number
}




export type { CartItem, CartItemDetails }
