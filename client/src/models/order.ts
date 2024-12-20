import { CartItemDetails } from "./cart"




enum OrderStatus {
  IN_PROGRESS = 0,
  CANCELED = 1,
  DELIVERED = 2,
  FINISHED = 3
}


enum OrderStatusString {
  "В обработке" = 0,
  "Отменён" = 1,
  "В доставке" = 2,
  "Завешён" = 3
}


interface OrderRequest {
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


interface Order extends OrderRequest {
  _id: string
  date: Date | string
  status: OrderStatus | number
}




export {
  type Order,
  type OrderRequest,

  OrderStatus,
  OrderStatusString
}
