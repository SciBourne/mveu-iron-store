import { action, computed, observable, runInAction } from "mobx"

import { CartItemDetails, Product } from "../models"
import { cart } from "../services"




class CartStore {
  @observable accessor localCart: CartItemDetails[] = []

  constructor() {
    setTimeout(
      () => {
        cart.getCart()
        .then(
          (cart) => {
            runInAction(() => this.localCart = cart)
          }
        )
      },

      1000
    )
  }

  getItem(productID: string): CartItemDetails | undefined {
    return this.localCart.find(
      item => productID === item._id
    )
  }

  getQty(productID: string): number {
    return this.getItem(productID)?.qty ?? 0
  }

  @computed
  get content(): CartItemDetails[] {
    var result: CartItemDetails[] = []

    this.localCart.forEach(
      (item) => {
        result.push(item)
      }
    )

    return result
  }

  @computed
  get total(): number {
    var totalQty = 0

    this.localCart.forEach(
      (item) => {
        totalQty += item.qty
      }
    )

    return totalQty
  }

  @computed
  get amount(): number {
    var amountPrice = 0

    this.localCart.forEach(
      (item) => {
        amountPrice += item.price * item.qty
      }
    )

    return amountPrice
  }

  @action.bound
  clear() {
    this.localCart = []
  }

  @action.bound
  async addProduct(product: Product, qty: number) {
    const status = await cart.addProduct(product._id, qty)

    if (status) {
      runInAction(
        () => this.localCart.push({ ...product, qty })
      )
    }
  }

  @action.bound
  async remProduct(productID: string) {
    let item = this.getItem(productID)

    if (item) {
      this.localCart = this.localCart.filter(
        item => item._id != productID
      )

      try {
        const status = await cart.remProduct(productID)
        if (!status) runInAction(() => this.localCart.push(item))

      } catch (err) {
        console.log(err)
        runInAction(() => this.localCart.push(item))
      }
    }
  }

  @action.bound
  async incProductQty(productID: string) {
    let item = this.getItem(productID)

    if (item) {
      item.qty++

      try {
        const status = await cart.updateProductQty(productID, item.qty)
        !status ? runInAction(() => item.qty--) : null

      } catch (err) {
        console.log(err)
        runInAction(() => item.qty--)
      }
    }
  }

  @action.bound
  async decProductQty(productID: string) {
    let item = this.getItem(productID)

    if (item) {
      item.qty--

      try {
        const status = await cart.updateProductQty(productID, item.qty)
        !status ? runInAction(() => item.qty++) : null

      } catch (err) {
        console.log(err)
        runInAction(() => item.qty++)
      }
    }
  }
}




export { CartStore }
