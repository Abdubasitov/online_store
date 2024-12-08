import { createBrowserRouter, RouterProvider } from "react-router-dom";
import All from "./components/All/All";
import Basket from "./components/Basket/Basket";
import Cloth from "./components/Cloth/Cloth";
import Favorites from "./components/Favorites/Favorites";
import Gadgets from "./components/Gadgets/Gadgets";
import Interior from "./components/Interior/Interior";
import Toys from "./components/Toys/Toys";
import './App.css'
import Beauty from "./components/Beauty/Beauty";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProductPage from "./components/ProductPage/ProductPage";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import MyOrdersPage from "./components/MyOrdersPage/MyOrdersPage";




const router = createBrowserRouter([
    

 {     path: '/',
  element: <Header/>,
  children: [
    {
      path: '/',
      element: <Home/>
  },  {
    path: '/login',
    element: <Login/>
},{
  path: "/product/:id",
  element: <ProductPage/>
},  

    {
    path: '/all',
    element: <All/>
},

{
  path: '/basket',
  element: <Basket/>
},{
  path: '/check',
  element: <CheckoutPage/>
},{
  path: '/order',
  element: <MyOrdersPage/>
},
{
  path: '/beuty',
  element: <Beauty/>
},  
{
  path: '/register',
  element: <Register/>
},        
{
  path: '/cloth',
  element: <Cloth/>
},

{
path: '/favorites',
element: <Favorites/>
},
{
path: '/gadgets',
element: <Gadgets/>
},        {
  path: '/interior',
  element: <Interior/>
},

{
path: '/toys',
element: <Toys/>
}]}

])

function App() {




  return (
    <RouterProvider router={router}>
    <div className="App">
      <Header/>
    </div>
  </RouterProvider>
  );
}

export default App;
