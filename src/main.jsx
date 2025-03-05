// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppLayout from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './components/Header/About/About.jsx';
import ContactClass from './components/Header/Contact/Contact.jsx'; //this is class based component
import Error from './components/Error/Error.jsx';
import Body from './components/Body/Body.jsx';
// import RestaurantMenu from './components/Body/RestaurantContainer/RestaurantMenu/RestaurantMenu.jsx';
// import Grocery from './components/Grocery/Grocery.jsx';
import { lazy, Suspense } from 'react';
import ShimmerUI from './components/Body/RestaurantContainer/ShimmerUI/ShimmerUI.jsx';
import ShimmerUICard from './components/Body/RestaurantContainer/ShimmerUI/ShimmerUICard/ShimmerUICard.jsx';

// Lazy Loading, On Demand Loading
// this import is a function which takes the path of the component
// this is a dynamic import. when user clicks on grocery link on UI then only react loads this component. not at the beginning.
// we have to place the component inside <Suspense></Suspense> and can provide a fallback. fallback is a placeholder which is loaded till the time react fetches the bundle for grocery.
// refer below route for fallback syntax and implementation
const Grocery = lazy(() => import("./components/Body/Grocery/Grocery.jsx"));
const RestaurantMenu = lazy(() => import("./components/Body/RestaurantContainer/RestaurantMenu/RestaurantMenu.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <ContactClass />
      }, 
      {
        path: '/restaurant/:resturantId',
        element: <Suspense fallback={<ShimmerUICard />}><RestaurantMenu /></Suspense>
      },
      {
        path: "/grocery",
        element: <Suspense fallback={<ShimmerUI />}><Grocery /></Suspense>
      }
    ],
    errorElement: <Error />
  }

]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RouterProvider router={appRouter} />
  // </StrictMode>,
)


