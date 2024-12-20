import axios, { AxiosRequestConfig } from "axios"

import {
  SRV_ENTRY_POINT,
  SRV_HOST,
  SRV_PORT
} from "../config"

import { Order, OrderRequest, OrderStatus } from "../models"




const BASE_URL: string = `http://${SRV_HOST}:${SRV_PORT}${SRV_ENTRY_POINT}`
const ORDERS_LOCATION: string = "/orders"

const REQ_CONFIG: AxiosRequestConfig = {
  withCredentials: true
}




async function getOrderHistory(): Promise<Order[]> {
  try {
    let response = await axios.get(
      BASE_URL + ORDERS_LOCATION,
      REQ_CONFIG
    )

    switch (response.status) {
      case 200:
        return response.data

      default:
        console.log(response.status, response.data)
        break
    }

  } catch (err) {
    if (axios.isAxiosError(err)) {
      switch (err.response?.status) {
        case 404:
          break

        default:
          console.log(err)
          break
      }
    }
  }

  return []
}




async function createOrder(body: OrderRequest): Promise<Order | null> {
  try {
    let response = await axios.post(
      BASE_URL + ORDERS_LOCATION,
      body,
      REQ_CONFIG
    )

    switch (response.status) {
      case 201:
        return response.data

      default:
        console.log(response.status, response.data)
        return null
    }

  } catch (err) {
    console.log(err)
    return null
  }
}




async function cancelOrder(orderID: string): Promise<boolean> {
  const body = {
    status: OrderStatus.CANCELED
  }

  try {
    let response = await axios.patch(
      BASE_URL + ORDERS_LOCATION + `/${orderID}`,
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




export { getOrderHistory, createOrder, cancelOrder }
