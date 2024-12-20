import { action, computed, observable, runInAction } from "mobx"

import { Order, OrderRequest, OrderStatus } from "../models"
import { orders } from "../services"




class OrderStore {
  @observable accessor orderHistory: Order[] = []

  constructor() {
    setTimeout(
      () => {
        orders.getOrderHistory()
        .then(
          (orders) => {
            runInAction(() => this.orderHistory = orders)
          }
        )
      },

      1000
    )
  }

  @computed
  get content() {
    var result: Order[] = []

    this.orderHistory.forEach(
      (order) => {
        result.push(order)
      }
    )

    return result
  }

  @action
  async createOrder(orderRequest: OrderRequest): Promise<boolean> {
    try {
      const newOrder: Order | null = await orders.createOrder(orderRequest)

      if (newOrder) {
        this.orderHistory.push(newOrder)
        return true

      } else {
        return false
      }

    } catch (err) {
      console.log(err)
      return false
    }
  }

  @action
  async cancelOrder(orderID: string): Promise<boolean> {
    try {
      const status: boolean = await orders.cancelOrder(orderID)

      if (status) {
        this.orderHistory.forEach(
          (order) => {
            if (order._id == orderID) {
              order.status = OrderStatus.CANCELED
            }
          }
        )

        return true

      } else {
        return false
      }

    } catch (err) {
      console.log(err)
      return false
    }
  }

  @action
  clear() {
    this.orderHistory = []
  }
}




export { OrderStore }
