import { Outlet, createBrowserRouter } from "react-router-dom"

import MainPage from "../pages/main"
import Header from "../widgets/header"
import Footer from "../widgets/footer"

import ProductsPage from "../pages/products"
import ProductsList from "../widgets/product-list"
import ProductDetails from "../widgets/product-details"
import CartPage from "../pages/cart"
import { LoginPage, ProfilePage, RegPage } from "../pages/profile"

import { PageNotFound } from "../widgets/errors"




function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}



const Router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: "/",
          element: <MainPage />
        },

        {
          path: "/catalog",
          element: <ProductsPage />,
          children: [
            {
              path: ":categoryName",
              element: <ProductsList />,
              children: [
                {
                  path: ":productID",
                  element: <ProductDetails />
                }
              ]
            }
          ]
        },

        {
          path: "/cart",
          element: <CartPage />,
        },

        {
          path: "/login",
          element: <LoginPage />
        },

        {
          path: "/reg",
          element: <RegPage />
        },

        {
          path: "/profile",
          element: <ProfilePage />
        }
      ]
    }
  ]
)




export default Router
