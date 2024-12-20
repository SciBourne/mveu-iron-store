import { useNavigate } from "react-router-dom"




function ButtonBack(): JSX.Element {
  const navigate = useNavigate()

  function onClickHandler() {
    navigate(-1)
  }

  return (
    <button className="button-back" onClick={ onClickHandler }>
      <img src="/img/button-back-icon.svg" alt="Back" />
      Назад
    </button>
  )
}




export default ButtonBack
