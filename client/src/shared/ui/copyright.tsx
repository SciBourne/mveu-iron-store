interface copyrigthProps {
  companyName: string
}


function Copyrigth(props: copyrigthProps): JSX.Element {
  const date: Date = new Date()

  return (
    <span className="copyright">
      { date.getFullYear() } &copy; { props.companyName }
    </span>
  )
}




export default Copyrigth
