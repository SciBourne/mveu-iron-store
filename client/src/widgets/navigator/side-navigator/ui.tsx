import { NavLink } from "react-router-dom"
import { CategoryNames } from "../../../models"
import { useEffect, useState } from "react"




interface SideNavigatorProps {
  context: [boolean, Function]
}


function SideNavigator(props: SideNavigatorProps): JSX.Element {
  const [visibleMenu, setVisibleMenu] = useState(true)
  const [visibleProduct, setVisibleProduct] = props.context

  useEffect(
    () => {
      if ( !visibleProduct ) {
        setVisibleMenu(true)
      } else {
        setVisibleMenu(false)
      }
    },

    [ visibleProduct ]
  )

  const menu: JSX.Element[] = [...CategoryNames.entries()].map(
    (category: [string, string], index: number) => (

      <NavLink to={`/catalog/${ category[0] }`}
          key={ index }

          className={
            ({ isActive }) => {
              return isActive ? 'item-active' : 'item'
            }
          }

          onClick={ () => setVisibleProduct(false) }>

        { category[1] }

      </NavLink>

    )
  )

  return (
    <nav className="side-navigator " >
      <button className={ visibleMenu ?
                          "dropdown-button" :
                          "dropdown-button-alone"}
              type="button"
              onClick={ () => setVisibleMenu(!visibleMenu) }>
        <img src="/img/menu.svg" alt="Меню" />
        <span>Категории</span>
      </button>
      {
        visibleMenu && (
          <div className="side-navigator-content" >
            {menu}
          </div>
        )
      }
    </nav>
  )
}




export default SideNavigator
