import { ObjectId } from "mongodb"
import { CategoryName } from "./category"



interface Product {
  _id: ObjectId
  category: CategoryName
  vendor: string
  model: string
  price: number
  balance: number
  shortDescription: string
  description?: string
}


interface VisibilityMask {
  _id?: number
  category?: number
  vendor?: number
  model?: number
  price?: number
  balance?: number
  shortDescription?: number
  description?: number
}




export { Product, VisibilityMask }
