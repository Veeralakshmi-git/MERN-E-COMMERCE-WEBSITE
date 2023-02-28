import Login from './pages/Login'
import Home from './pages/Home'
import Product from './pages/Product'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import Cart from './pages/Cart'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Navigate } from 'react-router-dom'
import Pay from './pages/pay/Pay'
import Success from './pages/success/Success'
import { useSelector } from 'react-redux'
import Payment from './components/Payment'
import {useEffect} from "react"
import axios from "axios"
import { publicRequest } from '../requestMethods'

const App = () => {


  useEffect (() => {
    const {data} = publicRequest.get('/payment/stripeapi')
    //console.log(data)
  })
  const user = useSelector(state=> state.user.user.currentUser)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products/:category" element={<ProductList/>}/>
      <Route path="/product/:id" element={<Product/>}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/Login" element={user ? <Navigate to="/" /> : <Login/>}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/pay/:id" element={<Pay />}/>
      <Route path="/success" element={<Success />}/>
      <Route path="/payment" element={<Payment />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
