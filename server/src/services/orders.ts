import { ObjectId } from "mongodb"

import {
  OrderData,
  OrderStatus,
  Order,
  OrderHistory
} from "../models/orders"

import { db } from "."




async function getOrderHistory(userID: string): Promise<Order[] | null> {
  const findParams = {
    _id: new ObjectId(userID)
  }

  const result = await db.get().collection("orders")
                                  .findOne<OrderHistory>(findParams)

  return result ? result.content : null
}




async function createOrder(userID: string,
                           orderData: OrderData): Promise<Order | null> {

  const newOrder: Order = {
    _id: new ObjectId(),
    date: new Date(Date.now()),
    status: OrderStatus.IN_PROGRESS,

    ...orderData,
  }

  const findParams = {
    _id: new ObjectId(userID)
  }

  const updateParams = {
    $push: {
      content: newOrder
    }
  }

  const options = {
    upsert: true
  }

  const result = await db.get().collection("orders")
                                  .updateOne(
                                    findParams,
                                    updateParams as Record<string, any>,
                                    options
                                  )

  if (result.acknowledged) {
    const result = await db.get().collection("carts")
                                    .deleteOne(findParams)

    return result.acknowledged ? newOrder : null

  } else {
    return null
  }
}




async function cancelOrder(userID: string, orderID: string): Promise<boolean> {
  const findParams = {
    _id: new ObjectId(userID)
  }

  const updateParams = {
    $pop: {
      "content._id": new ObjectId(orderID)
    }
  }

  const result = await db.get().collection("orders")
                                  .updateOne(
                                    findParams,
                                    updateParams as Record<string, any>
                                  )

  return result.acknowledged
}




export { getOrderHistory, createOrder, cancelOrder }
