interface mailProps {
  address: string
}


function Mail(props: mailProps): JSX.Element {
  return (
    <span className="mail">
      <a href={`mailto:${ props.address }`}>
        { props.address }
      </a>
    </span>
  )
}




export default Mail
