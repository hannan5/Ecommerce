import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getProductDetails } from "../../../actions/productAction"
import './productdetail.css'
import Loading from "../../loader/loading"
import ReactStars from 'react-rating-stars-component'
import Reviews from "../productReview/productreviews"

const Productdetail = () => {

    const param = useParams()
    const dispatch = useDispatch()

    const id = param.id

    const { loading, error, product } = useSelector((state) => state.productDetail)
    // console.log(product);
    useEffect(async () => {
        dispatch(getProductDetails(id))
    }, [dispatch])

    let url = 'https://media.istockphoto.com/photos/blue-jean-shirt-isolated-on-white-background-picture-id584479824?k=20&m=584479824&s=612x612&w=0&h=TaUNU0xfxEMD4NM3DFGM73uVceElRKbd1BX2cygkzDA='

    const options = {
        edit: false,
        readOnly: true,
        precision: 0.5,
        value: product.ratings
    }
    return (
        <>
            <Fragment>
                {loading ? (
                    <Loading />
                ) :
                    (
                        <Fragment>
                            <div className="ProductDetails">
                                <div>
                                    <img src={url} className='carousal' />
                                </div>
                                <div>
                                    <div className="detailsBlock-1">
                                        <h2>{product.name}</h2>
                                        <p>Product # {product._id}</p>
                                    </div>
                                    <div className="detailsBlock-2">
                                        <ReactStars {...options} />
                                        <span className="detailsBlock-2-span">
                                            {" "}
                  ({product.numOfReviews} Reviews)
                </span>
                                    </div>
                                    <div className='detailsPrice'>
                                        <h2>{`Rs${product.price}`}</h2>

                                        <div className='btns'>
                                            <div className='stock'>
                                                <button>+</button>
                                                <input readOnly type='number' value='1' />
                                                <button>-</button>
                                            </div>
                                            <div className='buttons'>
                                                <button disabled={product.stock < 1 ? true : false}>Add to Cart</button>
                                            </div>
                                        </div>

                                        <p>Status:
                                    <b>{product.stock > 1 ? "InStock" : 'Out of Stock'}</b>
                                        </p>

                                        <div className='discription'>
                                            Description:  <p>{`${product.description}`}</p>
                                        </div>
                                        <button className='submitReview'>Submit Reviews</button>

                                    </div>
                                </div>
                            </div>

                            <h3 className='reviewName'>Product Reviews</h3>
                            {product.reviews && product.reviews[0] ? (
                                    <div className='reviews'>
                                        {product.reviews &&
                                         product.reviews.map((review) => (
                                            <Reviews key={review._id} rev={review} />
                                        ))}
                                    </div>
                                ) :(
                                        <p className='noReviews'>No Review yet</p>
                                    )}
                        </Fragment>

                    )}
            </Fragment>

        </>
    )
}
export default Productdetail;