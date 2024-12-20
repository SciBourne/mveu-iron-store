import Logo from "../../../shared/ui/logo"




function PageNotFound(): JSX.Element {
  return (
    <main className="content error-page">
      <Logo styleClass="logo-s" darkColors={ true } />
      <h2>Такой страницы не существует :(</h2>
    </main>
  )
}




export default PageNotFound
