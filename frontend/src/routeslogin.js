import { Routes as AppRoutes, Route } from "react-router-dom"
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/header";
import Product from "./components/product/product";
import Productdetail from "./components/product/productdetails/productDetails";
import Search from "./components/product/search/search";
import Home from "./pages/home/home";

const Routeslogin = () => {
    return (
        <>
            <Header />
            <AppRoutes>
                <Route path='/' element={<Home />} />
                <Route path='/product/:id' element={<Productdetail />} />
                <Route path='/products' element={<Product/>} />
                <Route path='/search' element={<Search/>} />
                <Route path='/products/:keyword' element={<Product/>} />
                {/* <Route path='*' element={<Home />} /> */}
            </AppRoutes>
            <Footer />
        </>
    )
}
export default Routeslogin