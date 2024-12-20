import { useOutletContext, useParams } from "react-router-dom"
import { useEffect, useReducer } from "react"

import {
  ProductBalance,
  ProductDescription,
  ProductImage,
  ProductLabel,
  PriceBox
} from "../../shared"

import { catalog, reducers } from "../../services"
import { Product } from "../../models"




function ProductDetails(): JSX.Element {
  const [_, setVisibleProduct] = useOutletContext<[boolean, Function]>()

  const productState: reducers.InitialState = {
    data: {} as Product,
    loading: false,
    error: null
  }

  const [state, updateState] = useReducer(reducers.reducer, productState)
  const { data, loading, error } = state

  const params = useParams()
  const category = params.categoryName as string
  const id = params.productID as string

  useEffect(
    () => {
      setVisibleProduct(true)
      catalog.updateProduct(category, id, updateState)

      return () => setVisibleProduct(false)
    },

    []
  )

  return (
    <div className="product-page">
      <ProductImage id={ id } category={ category } />
      {
        loading
            ? <h2>Loading...</h2>
            : error
                ? <p>{ error }</p>
                : (
                    <div className="info">
                      <ProductLabel vendor={ data.vendor } model={ data.model } />
                      <ProductDescription style="short" content={ data.shortDescription } />
                      <PriceBox theme="dark" product={ data } />
                      <ProductBalance balance={ data.balance } />
                      <ProductDescription content={ data.description } />
                    </div>
                  )
        }
    </div>
  )
}




export default ProductDetails
