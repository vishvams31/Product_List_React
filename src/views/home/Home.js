import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import ProductList from '../../components/productList/ProductList'
import "./home.css"


export default function Home() {
    return (
        <>
            <Topbar />
            <div >
                <ProductList />
            </div>

        </>
    )
}
