import { ObjectId } from "mongodb"
import { CartItemDetails } from "./cart"




enum OrderStatus {
  IN_PROGRESS = 0,
  CANCELED = 1,
  DELIVERED = 2,
  FINISHED = 3
}


interface OrderData {
  firstName: string
  secondName: string
  patronymic: string

  email: string
  phone: number

  region: string
  city: string
  street: string
  house: number
  apartment?: number

  comment?: string
  items: CartItemDetails[]
}


interface Order extends OrderData {
  _id: ObjectId
  date: Date
  status: OrderStatus
}


interface OrderHistory {
  _id: ObjectId
  content: Order[]
}




export {
  OrderStatus,

  type Order,
  type OrderData,
  type OrderHistory
}
