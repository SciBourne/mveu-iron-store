import { MouseEventHandler, useEffect, useState } from "react"
import { Product } from "../../models"




interface pageButtonProps {
  page: number
  index: number
  startPage: number
  disabled: boolean

  toggleStartPage: (page: number) => void
}


function PageButton(props: pageButtonProps): JSX.Element {
  return (
    <button key={ "page-button-" + props.page }
            disabled={ props.index === props.startPage }
            onClick={ () => props.toggleStartPage(props.index) }>
      { props.page }
    </button>
  )
}




interface arrowPageButtonProps {
  orientation: string
  allowToggle: boolean
  startPage: number
  shiftPanel: number
  amountPages: number
  startButton: JSX.Element
  middleButton: JSX.Element

  setShiftPanel: (shift: number) => void
  toggleStartPage: (page: number) => void
}


function arrowButtonHandler(newStartPage: number,
                            startDisabled: boolean,
                            middleDisabled: boolean,
                            props: arrowPageButtonProps): MouseEventHandler {
  return (
    function () {
      switch ( props.orientation ) {
        case "prev":
          if ( startDisabled ) {
            props.setShiftPanel(props.shiftPanel - 1)
          }

          if ( props.startPage > props.amountPages * 3 ) {
            props.setShiftPanel(props.amountPages - 4)
          }

          break;

        case "next":
          if ( middleDisabled &&
               newStartPage < props.amountPages * 3 ) {
            props.setShiftPanel(props.shiftPanel + 1)
          }

          break;
      }

      props.toggleStartPage(newStartPage)
    }
  )
}


function ArrowPageButton(props: arrowPageButtonProps): JSX.Element {
  var content: string = ""
  var newStartPage: number = props.startPage

  switch (props.orientation) {
    case "prev":
      newStartPage -= 4
      content = "<"
      break;

    case "next":
      newStartPage += 4
      content = ">"
      break;
  }

  return (
    <button disabled={ !props.allowToggle }
            onClick={ arrowButtonHandler( newStartPage,
                                          props.startButton.props.disabled,
                                          props.middleButton.props.disabled,
                                          props )}>
      { content }
    </button>
  )
}




interface paginatorProps {
  products: Product[]
  startPage: number
  toggleStartPage: (page: number) => void
}


function Paginator(props: paginatorProps): JSX.Element {
  const amountPages: number = Math.ceil(props.products.length / 4)
  const pageButtons: JSX.Element[] = []
  let middleButton: JSX.Element

  const [allowPrev, setAllowPrev] = useState(false)
  const [allowNext, setAllowNext] = useState(true)

  const [shiftPanel, setShiftPanel] = useState(0)

  useEffect(
    () => {
      setAllowPrev(props.startPage != 0)
      setAllowNext(props.startPage != (amountPages * 4) - 4)
    },

    [ props.startPage, props.products ]
  )

  for (let page = 1, i = 0; page <= amountPages; page++, i = i + 4) {
    if ( page < 4 ) {
      pageButtons.push(
        <PageButton page={ page + shiftPanel }
                    key={ i }
                    index={ i + (shiftPanel * 4) }
                    startPage={ props.startPage }
                    toggleStartPage={ props.toggleStartPage }
                    disabled={ i + (shiftPanel * 4) === props.startPage } />
      )
    } else if ( page === amountPages ) {
      pageButtons.push(
        <PageButton page={ page }
                    key={ i }
                    index={ i }
                    startPage={ props.startPage }
                    toggleStartPage={ props.toggleStartPage }
                    disabled={ i + (shiftPanel * 4) === props.startPage } />
      )
    }
  }

  if ( pageButtons.length < amountPages ) {
    middleButton = pageButtons[2]
    pageButtons.splice(3, 0, <span key="sep">. . .</span>)

  } else {
    middleButton = pageButtons[pageButtons.length - 1]
  }

  return (
    <div className="paginator">
      <ArrowPageButton  orientation="prev"
                        allowToggle={ allowPrev }
                        startPage={ props.startPage }
                        amountPages={ amountPages }
                        startButton={ pageButtons[0] }
                        middleButton={ middleButton }
                        shiftPanel={ shiftPanel }
                        toggleStartPage={ props.toggleStartPage }
                        setShiftPanel={ setShiftPanel }
                        key="left-arrow-button" />

      { pageButtons }

      <ArrowPageButton  orientation="next"
                        allowToggle={ allowNext }
                        startPage={ props.startPage }
                        amountPages={ amountPages }
                        startButton={ pageButtons[0] }
                        middleButton={ middleButton }
                        shiftPanel={ shiftPanel }
                        toggleStartPage={ props.toggleStartPage }
                        setShiftPanel={ setShiftPanel }
                        key="right-arrow-button" />
    </div>
  )
}




export default Paginator
