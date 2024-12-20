import axios, { AxiosRequestConfig } from "axios"

import { SRV_HOST, SRV_PORT, SRV_ENTRY_POINT } from "../config"
import { CartItem, CartItemDetails } from "../models"




const BASE_URL: string = `http://${SRV_HOST}:${SRV_PORT}${SRV_ENTRY_POINT}`
const CART_LOCATION: string = "/cart"

const REQ_CONFIG: AxiosRequestConfig = {
  withCredentials: true
}



async function getCart(): Promise<CartItemDetails[]> {
  try {
    let response = await axios.get(BASE_URL + CART_LOCATION, REQ_CONFIG)

    switch (response.status) {
      case 200:
        return response.data

      default:
        console.log(response.status, response.data)
        return []
    }

  } catch (err) {
    console.log(err)
    return []
  }
}




async function addProduct(productID: string, qty: number): Promise<boolean> {
  const body: CartItem = {
    _id: productID,
    qty: qty
  }

  try {
    let response = await axios.post(
      BASE_URL + CART_LOCATION,
      body,
      REQ_CONFIG
    )

    switch (response.status) {
      case 201:
        return true

      default:
        console.log(response.status, response.data)
        return false
    }

  } catch (err) {
    console.log(err)
    return false
  }
}




async function remProduct(productID: string): Promise<boolean> {
  const resource: string = "/" + productID

  try {
    let response = await axios.delete(
      BASE_URL + CART_LOCATION + resource,
      REQ_CONFIG
    )

    switch (response.status) {
      case 204:
        return true

      default:
        console.log(response.status, response.data)
        return false
    }

  } catch (err) {
    console.log(err)
    return false
  }
}




async function updateProductQty(productID: string, qty: number) {
  const resource: string = "/" + productID
  const body = { qty }

  try {
    let response = await axios.patch(
      BASE_URL + CART_LOCATION + resource,
      body,
      REQ_CONFIG
    )

    switch (response.status) {
      case 204:
        return true

      default:
        console.log(response.status, response.data)
        return false
    }

  } catch (err) {
    console.log(err)
    return false
  }
}




export {
  getCart,

  addProduct,
  remProduct,

  updateProductQty
}
