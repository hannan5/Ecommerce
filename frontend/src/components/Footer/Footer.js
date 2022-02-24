import playstore from '../../images/playstore.png'
import appstore from '../../images/Appstore.png'
import './footer.css'
const Footer = () => {
    return (
        <>
            <div className='footer'>
                <div className='righfoot'>
                    <h4>DOWNLOAD OUR APP</h4>
                    <p>Dowmload App for Android and IOS Mobile Phone</p>
                    <img src={playstore} />
                    <img src={appstore} />
                </div>
                <div className='midfoot'>
                    <h2>ECOMMERCE</h2>
                    <p>High Quality is our first priorty</p>
                    <p>CopyRight 2022 @ Hannan</p>
                </div>
                <div className='leftfoot'>
                    <h4>Follow us</h4>
                    <h6><a href='#'>Facebook</a></h6>
                    <h6><a href='#'>Instagram</a></h6>
                    <h6><a href='#'>Youtube</a></h6>
                </div>
            </div>
        </>
    )
}
export default Footer