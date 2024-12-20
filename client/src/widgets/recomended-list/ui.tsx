import { useEffect, useState } from "react"
import { Product } from "../../models/products"
import { PriceBox, ProductImage } from "../../shared"
import { catalog } from "../../services"




function RecomendedList(): JSX.Element {
  const [products, setProducts] = useState<Product[]>()

  useEffect(
    () => catalog.updateRecomendedList(setProducts), []
  )

  return (
    <section className="content recomended-list">
      <h2>Рекомендуемое</h2>
      <div className="recomended-list-grid">
        {
          products && (
            products.map(
              (product: Product) => (
                <article className="product-mini" key={ product._id }>

                  <ProductImage id={ product._id }
                                category={ product.category }
                                isLink={ true } />

                  <PriceBox theme="dark-popup"
                            product={ product } />

                  <span className="head">
                    { product.vendor } {product.model}
                  </span>
                </article>
              )
            )
          )
        }
      </div>
    </section>
  )
}




export default RecomendedList
