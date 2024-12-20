import { NavLink } from "react-router-dom"
import { CategoryNames } from "../../../models"




function MainCategoryMenu(): JSX.Element {
  return (
    <section className="content category-menu">
      <h2>Категории товаров</h2>
      <div className="category-grid">
        {[...CategoryNames.entries()].map(
          (category: [string, string], index: number) => (
            <NavLink to={`/catalog/${category[0]}`} key={index}>
              <article className="category">
                <img src={`img/categories/${category[0]}.png`}
                     alt={category[1]} />
                <p>{category[1]}</p>
              </article>
            </NavLink>
          ))}
      </div>
    </section>
  )
}




export default MainCategoryMenu
