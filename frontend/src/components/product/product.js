import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import Loading from "../loader/loading";
import './product.css'
import Productcard from "./productcard";
import Pagination from 'react-js-pagination'
import Typography from '@mui/material/Typography';
import { Slider } from "@mui/material";

const Product = ({ }) => {
    const dispatch = useDispatch()
    const { products, err, loading, productsCount, productsPerPage, productFilter } = useSelector((state) => state.products)
    const param = useParams()
    const keyword = param.keyword
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState(0);
    const [price, setPrice] = useState([0, 11000]);
    const [category, setCategory] = useState('');

    let categories =[
        'electronics',
        'Category'
    ]
    // let count = productFilter
console.log(category);
    const CurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    const priceHandler =async (e, newprice) => {
        await setPrice(newprice)
    }
    useEffect(async () => {
        dispatch(getProduct(keyword, currentPage, price,category))
        setPage(Math.ceil(productsCount / productsPerPage))
    }, [dispatch, keyword, currentPage,price,category])
    return (
        <>
            <Fragment>
                {loading ? (<Loading />) : (
                    <Fragment>
                        <h1>Products</h1>
                        <div className='main-products'>
                            {products.map((product) => (
                                <Productcard product={product} key={product._id} />
                            ))}
                        </div>

                        <div className='filterBox'>
                            <Typography>
                                price
                            </Typography>
                            <Slider
                                value={price}
                                size="medium"
                                min={0}
                                max={11000}
                                valueLabelDisplay="auto"
                                onChange={priceHandler}
                                step={1000}
                            ></Slider>
                        </div>

                        <div className='category'>
                            <Typography>Category</Typography>
                            <ul>{categories.map((category)=>(
                                <li
                                className='categ'
                                value={category}
                                onClick={()=>{setCategory(category)}}>{category}</li>
                            ))}</ul>
                        </div>
{/* {productsPerPage < count && ( */}
                        <div className='paginationBox'>

                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={productsPerPage}
                                totalItemsCount={productsCount}
                                onChange={CurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                                className='pagination'
                            ></Pagination>
                        </div>
                        {/* )} */}
                    </Fragment>
                )}
            </Fragment>

        </>
    )
}
export default Product