import shirt from '../../images/shirt.jpg'
import ReactStars from 'react-rating-stars-component'
import {Link} from 'react-router-dom'
const Productcard = ({product}) =>{
    const options = {
        edit:false,
        readOnly: true,
        precision: 0.5,
        value:product.ratings
    } 
    return(
        <>
        <Link to={`product/${product._id}`} style={{textDecoration:'none'}}>
        <div className='product'>
            <div className='productimg'>
                <img src={product.images[0].url} alt={product.name}/>
                </div>
            <h4>{product.name}</h4>
            <div className='rate'>
                <ReactStars {...options}/>
                <span>({product.numberOfReviews} Reviews)</span>
            </div>
            <p>₨{product.price}</p>
        </div>
        </Link>
        </>
    )
}
export default Productcard