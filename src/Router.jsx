import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing';
import Payment from './pages/Payment/Payment';
import Orders from './pages/Orders/Orders';
import Cart from './pages/Cart/Cart'
import Results from './pages/Results/Results';
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Auth from './pages/Auth/Auth'; 
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';



const stripePromise = loadStripe('pk_test_51QQqrXHfZoRJV4058S8WQdBRYEMYMj9VTm9y5z2aYbMl07wmGPn2b3nzJ0hQcPYJHShlu3wJqG27F19blN0uD7K100MOUajnI8');
function Routing() {
  return (
        <Router>
            <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="/payments" element={
              <ProtectedRoute msg={"You must log in to pay"} redirect={"/payments"}>
                <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
              </ProtectedRoute>
              } />
            <Route path="/orders" element={
              <ProtectedRoute msg={"You must log in to access your orders"} redirect={"/orders"}>
                <Orders />
              </ProtectedRoute>
              } />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/category/:categoryName" element={<Results/>}/>
            <Route path="/products/:productId" element={<ProductDetail/>}/>
        </Routes>
    </Router>
  )
}

export default Routing