import { Fragment, useEffect } from 'react'
import Productcard from '../../components/product/productcard'
import './home.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../actions/productAction'
import Loading from '../../components/loader/loading'

const Home = () => {
    const dispatch = useDispatch()
    const { loading, error, products } = useSelector(
        (state) => state.products)
    // console.log(products);
    useEffect(async () => {
        dispatch(getProduct())
    }, [dispatch])
    return (
        <>
            <Fragment>
                {loading ? (
                    <Loading />
                ) : (
                        <Fragment>
                            <div className='banner'>
                                <h3>Welcome to Ecommerce</h3>
                                <h1>Find Amazing Products Below</h1>
                                <button>Scroll</button>
                            </div>
                            {/* </div> */}
                            <h3 className='headings'>Featured Products</h3>
                            <div className='container'>
                                {products && products.map((pro) => (
                                    <Productcard product={pro} />
                                ))}
                            </div>
                        </Fragment>

                    )
                }
            </Fragment>
        </>
    )
}

export default Home