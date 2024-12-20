import getServerStatus from "./root"

import getCatalog from "./catalog"
import { getProduct, getProducts } from "./products"
import { getRecomended } from "./recomended"

import {
  getCart,
  getCartItem,
  addToCart,
  remFromCart,
  updateQty
} from "./cart"

import {
  getOrderHistory,
  createOrder,
  cancelOrder
} from "./orders"

import {
  login,
  logout,
  register,
  getUserData,
  updateUserData
} from "./users"




export {
  getServerStatus,

  getCatalog,
  getProducts,
  getRecomended,
  getProduct,

  getCart,
  getCartItem,
  addToCart,
  remFromCart,
  updateQty,

  getOrderHistory,
  createOrder,
  cancelOrder,

  login,
  logout,
  register,
  getUserData,
  updateUserData
}
