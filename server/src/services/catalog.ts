import { db } from "../services"

import {
  CategoryName,
  Product,
  RecomendedProduct,
  VisibilityMask
} from "../models"
import { ObjectId } from "mongodb"




const categories: CategoryName[] = Object.values(CategoryName)




async function getProduct(category: CategoryName,
                          id: string): Promise<Product | null> {

  return db.get().collection<Product>("products")
                    .findOne<Product>(
                      {
                        category: category,
                        _id: new ObjectId(id)
                      }
                    )
}




async function getProducts(name: CategoryName,
                           fields?: VisibilityMask): Promise<Product[]> {

  return db.get().collection<Product>("products")
                    .find({ category: name })
                    .project<Product>(fields ? fields : {})
                    .toArray()

}




async function getRecomended(fields?: VisibilityMask): Promise<Product[]> {
  const productsID: ObjectId[] = []

  const products: RecomendedProduct[] = (
    await db.get().collection<RecomendedProduct>("recomended")
                      .find()
                      .toArray()
  )

  products.forEach(
    (product: RecomendedProduct) => {
      productsID.push(product._id)
    }
  )

  return db.get().collection<Product>("products")
                     .find({ _id: { $in: productsID } })
                     .project<Product>(fields ? fields : {})
                     .toArray()
}




export {
  categories,

  getProducts,
  getRecomended,
  getProduct
}
