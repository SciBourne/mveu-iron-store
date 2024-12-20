import { Link, useLocation } from "react-router-dom"
import { useContext } from "react"
import { observer } from "mobx-react"

import { ROOT_PRODUCT_IMAGE as ROOT_IMG } from "../../config"
import { CartItemDetails, Product } from "../../models"
import { Context } from "../../context"

import { PriceBox } from ".."
import { handleRemove } from "../handlers/product-card"




interface productImageProps {
  id: string
  category: string
  isLink?: boolean
}

function ProductImage(props: productImageProps): JSX.Element {
  const image: JSX.Element = (
    <div className="product-image">
      <img src={ `${ROOT_IMG}/${ props.category }/${ props.id }.webp` }
           alt={ props.id } />
    </div>
  )

  if ( props.isLink ) {
    return (
      <Link className="product-image"
            to={`/catalog/${props.category}/${ props.id }`}>
        { image }
      </Link>
    )
  } else { return image }
}



interface productLabelProps {
  vendor: string
  model: string
}

function ProductLabel(props: productLabelProps): JSX.Element {
  return (
    <div className="card-label">
      <span className="vendor">
        { props.vendor }
      </span>
      <span className="model">
        { props.model }
      </span>
    </div>
  )
}



interface productDescriptionProps {
  style?: string
  content: string
}

function ProductDescription(props: productDescriptionProps): JSX.Element {
  let textStyle: string
  let header: undefined | JSX.Element
  let content: JSX.Element | JSX.Element[]

  switch (props.style) {
    case "short":
      textStyle = "short-description"
      content = <p>{ props.content }</p>
      break;

    default:
      textStyle = "description"
      header = <h2>Описание</h2>
      content = props.content
                        ? props.content
                                  .split('\n')
                                  .map( (line, index) => <p key={ index }>{ line }</p>)
                        : <p>...</p>
      break;
  }

  return (
    <>
      { header }
      <div className={ textStyle }>
        { content }
      </div>
    </>
  )
}



interface productBalanceProps {
  balance: number
}

function ProductBalance(props: productBalanceProps): JSX.Element {
  return (
    <p className="product-balance">
      Осталось: <span>{ props.balance } шт</span>
    </p>
  )
}



function ItemQty(props: { qty: number }): JSX.Element {
  return (
    <p className="item-qty">
      Количество: <span className="data">{ props.qty }</span>
    </p>
  )
}




const RemoveButton = observer(
  (props: { productID: string }): JSX.Element | null => {
    const stores = useContext(Context)

    if (stores && stores.cart) {
      const cart = stores.cart

      return (
        <button className="remove-button" onClick={ handleRemove(props.productID, cart) }>
          <img src="/img/cart-remove.svg" alt="remove" />
          <span>Удалить</span>
        </button>
      )

    } else {
      return null
    }
  }
)




function ProductInfo(props: Product | CartItemDetails): JSX.Element {
  const location: string = useLocation().pathname

  return (
    <div className="info">
      <ProductLabel vendor={ props.vendor } model={ props.model } />
      <ProductDescription style="short" content={ props.shortDescription } />

      {
        location == "/profile"
            ? "qty" in props && <ItemQty qty={ props.qty } />
            : <ProductBalance balance={ props.balance } />
      }

      {
        location == "/cart" && <RemoveButton productID={ props._id } />
      }

    </div>
  )
}




function ProductCard(props: Product | CartItemDetails): JSX.Element {
  return (
    <article className="product">
      <ProductImage id={ props._id }
                    category={ props.category }
                    isLink={ true } />

      <ProductInfo { ...props } />
      <PriceBox product={ props } />
    </article>
  )
}




export {
   ProductCard,
   ProductImage,
   ProductLabel,
   ProductInfo,
   ProductDescription,
   ProductBalance
}
