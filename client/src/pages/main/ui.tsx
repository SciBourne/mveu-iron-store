import { MainBanner } from "../../widgets/banner"
import MainCategoryMenu from "../../widgets/navigator/category-menu"
import RecomendedList from "../../widgets/recomended-list"




function MainPage(): JSX.Element {
  return (
    <>
      <main>
        <MainBanner />
        <MainCategoryMenu />
        <RecomendedList />
      </main>
    </>
  )
}




export default MainPage
