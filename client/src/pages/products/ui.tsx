import { useState } from "react"
import { Outlet } from "react-router-dom"
import SideNavigator from "../../widgets/navigator/side-navigator"
import { ButtonBack } from "../../shared"




function ProductsPage(): JSX.Element {
  const visibleProductState = useState(false)
  let gridStyle: string = visibleProductState[0] ? "category-col" : ""

  return (
    <main className={ "content" } >
      <ButtonBack />
      <div className={ "category " + gridStyle }>
        <SideNavigator context={ visibleProductState } />
        <Outlet context={ visibleProductState } />
      </div>
    </main>
  )
}




export default ProductsPage
