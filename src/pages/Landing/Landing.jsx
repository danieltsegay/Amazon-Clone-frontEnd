import React from 'react'
import LayOut from '../../components/Layout/LayOut'
import Carousel from '../../components/Carousel/Carousel'
import Category from '../../components/Catagory/Catagory'
import Product from '../../components/Product/Product'

function Landing() {
  return (
    <LayOut>
        <Carousel/>
        <Category/>
        <Product/>
    </LayOut>
  )
}

export default Landing