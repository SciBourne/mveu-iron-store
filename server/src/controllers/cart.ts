import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

import { cart } from "../services"




async function getCart(req: Request, res: Response) {
  const accessToken = req.cookies.ACCESS_TOKEN
  const decodedToken = jwt.decode(accessToken, { json: true })

  if (decodedToken) {
    cart.getCart(decodedToken.userID)
          .then(
            (cart) => {
              res.status(200).json(cart)
            }
          )
  }
}




async function getCartItem(req: Request, res: Response) {
  const decodedToken = jwt.decode(
    req.cookies.ACCESS_TOKEN,
    { json: true }
  )

  if (decodedToken) {
    cart.getCartItem(decodedToken.userID, req.params.productID)
          .then(
            (item) => {
              if (item) {
                res.status(200).json(item)
              } else {
                res.status(404).json({ message: "Cart item not found" })
              }
            }
          )
  }
}




async function addToCart(req: Request, res: Response) {
  const decodedToken = jwt.decode(
    req.cookies.ACCESS_TOKEN,
    { json: true }
  )

  if (decodedToken) {
    cart.addToCart(decodedToken.userID, req.body)
          .then(
            (status) => {
              if (status) {
                res.setHeader("location", `/cart/${req.body._id}`)
                      .status(201)
                      .send()
              }
            }
          )
  }
}




async function remFromCart(req: Request, res: Response) {
  const decodedToken = jwt.decode(
    req.cookies.ACCESS_TOKEN,
    { json: true }
  )

  if (decodedToken) {
    cart.remFromCart(decodedToken.userID, req.params.productID)
          .then(
            (status) => {
              if (status) {
                res.status(204)
              }
            }
          )
  }
}




async function updateQty(req: Request, res: Response) {
  const decodedToken = jwt.decode(
    req.cookies.ACCESS_TOKEN,
    { json: true }
  )
  if (decodedToken) {
    cart.updateQty(decodedToken.userID, req.params.productID, req.body.qty)
          .then(
            (status) => {
              if (status) {
                res.status(204)
              }
            }
          )
  }
}




export {

  getCart,
  getCartItem,
  addToCart,
  remFromCart,
  updateQty

}
