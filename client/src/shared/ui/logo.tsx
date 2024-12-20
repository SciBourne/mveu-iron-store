import { NavLink } from "react-router-dom";



interface logoProps {
  styleClass: string
  darkColors?: boolean
}


function Logo(props: logoProps): JSX.Element {
  let logoPath: string = props.darkColors ? "/img/logo-dark.svg" : "/img/logo.svg"

  return (
    <NavLink to="/">
      <img className={ props.styleClass } src={ logoPath } alt="Логотип" />
    </NavLink>
  )
}




export default Logo
