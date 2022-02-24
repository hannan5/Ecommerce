import profile from '../../../images/profile2.jpg'
import '../productdetails/productdetail.css'

import ReactStars from 'react-rating-stars-component'

const Reviews = ({rev}) =>{

    const {name,rating,comment, user} = rev

    const options = {
        edit: false,
        readOnly: true,
        precision: 0.5,
        value: rating
    }

    return(
        <>
<div className='reviewcard'>
    <img src={profile} alt='profile'/>
    <p>{name}</p>
    <ReactStars {...options} />
    <span>{comment}</span>
</div>
        </>
    )
}
export default Reviews