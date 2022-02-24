import { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom";
import './search.css'
const Search = ({ history }) => {
    // const [setvalue, value] = useState('')

    // const inputHandler = (e) =>{
    //     const name = e.target.name
    //     const value = e.target.value
    //     setvalue({...value, [name]:value})
    //     console.log({[name]:value});
    // }
    // const submithandler = (e) => {
    //     e.preventDefault()
    //     // console.log(value, e, value.product);
    // }

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate()
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        console.log(keyword);
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };
    return (
        <>
            <Fragment>
                <form className='searchform' onSubmit={searchSubmitHandler}>
                    <input type='text' placeholder='Search a Product' name='product' onChange={(e) => setKeyword(e.target.value)} />
                    <input type='submit' value='Search' />
                </form>
            </Fragment>
        </>
    )
}
export default Search