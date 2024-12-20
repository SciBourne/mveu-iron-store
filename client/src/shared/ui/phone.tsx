interface phoneProps {
  number: string;
}


function Phone(props: phoneProps): JSX.Element {
  const countryCode: string = props.number.slice(0, 2)
  const regionCode: string = `(${ props.number.slice(2, 5) })`

  const abonentNumber: string = [
    props.number.slice(5, 8),
    props.number.slice(8, 10),
    props.number.slice(10)
  ].join('-')

  return (
    <span className="phone">
      <a href={ `tel:${ props.number }` }>
        { `${ countryCode } ${ regionCode } ${ abonentNumber }` }
      </a>
    </span>
  )
}




export default Phone
