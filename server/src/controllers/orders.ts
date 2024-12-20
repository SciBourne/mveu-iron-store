import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

import { Order, OrderData } from "../models/orders"
import { orders } from "../services"




async function getOrderHistory(req: Request, res: Response) {
  const decodedToken = jwt.decode(
    req.cookies.ACCESS_TOKEN,
    { json: true }
  )

  if (decodedToken) {
    const userID: string = decodedToken.userID
    const data: Order[] | null = await orders.getOrderHistory(userID)

    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json({ message: "No orders found" })
    }
  }
}




async function createOrder(req: Request, res: Response) {
  const decodedToken = jwt.decode(
    req.cookies.ACCESS_TOKEN,
    { json: true }
  )

  if (decodedToken) {
    const userID: string = decodedToken.userID
    const body: OrderData = req.body

    const result: Order | null = await orders.createOrder(userID, body)

    if (result) {
      res.setHeader("location", `/orders/${result._id}`)
         .status(201)
         .json(result)
    }
  }
}




async function cancelOrder(req: Request, res: Response) {
  const decodedToken = jwt.decode(
    req.cookies.ACCESS_TOKEN,
    { json: true }
  )

  if (decodedToken) {
    const userID: string = decodedToken.userID
    const orderID: string = req.params.orderID

    const status = await orders.cancelOrder(userID, orderID)

    if (status) {
      res.status(204)
    }
  }
}




export { getOrderHistory, createOrder, cancelOrder }
