import Footer from "../../Layouts/Footer/footer"
import Navbar from "../../Layouts/Navbar/navbar"
import { useSelector,useDispatch } from "react-redux"
import {deleteProduct, resetCart} from "../../features/Cart/cartSlice"
import {useState, useEffect, useContext} from 'react'
import { Link ,Navigate,useNavigate} from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext"
import axios from '../../Config/axios'
import { apis } from "../../Config/apisUrl"

export default()=>{

    const cart = useSelector(state=>state.cart.cart)
    console.log(cart, "Cart Order");
    const dispatch =useDispatch()
    const navigate =useNavigate()
    const [total, settotal] = useState(0)
    const [counter, setCounter]=useState(1)
    const min=1;
    const max=10;
    const increment =()=>{
        if(counter<max){
        setCounter(counter+1)
        }
    }
    const decrement =()=>{
        if(counter>min){
        setCounter(counter-1)
        }
    }
    useEffect(() => {
        let sum=0
        
        for(let item of cart)
        {
         sum+= item.shop.price * item.qte
        }
        settotal(sum)
    }, [cart])
    console.log(cart,"cart")

    console.log(total , "totalprice");

    const {user}=useContext(AuthContext)

    console.log(user,"user");

    const createOrder=()=>{
        let p=[]
        for(let item of cart){
            p.push({
                shop:item.shop._id,
                qte:item.qte
            })
        }
        let data={
            user:user.user._id,
            products:p,
            totalPrice:total
        }
        axios.post(apis.order.createorder , data)
        .then((res)=>{
            dispatch(resetCart())
            navigate("/shop")
        }).catch(err=>{
            console.log(err.message);
        })
    }

    return(
        <>
        <Navbar/>
        <div className="slider-area ">
            <div className="single-slider slider-height2 d-flex align-items-center">
                <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                    <div className="hero-cap text-center">
                        <h2>Cart List</h2>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <section className="cart_area section_padding">
            <div className="container">
                <div className="cart_inner">
                <div className="table-responsive">
                    <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                            cart.map(c=>{
                                return(
                                    <tr>
                                    <td>
                                        <div className="media">
                                        <div className="d-flex">
                                            <img src={'http://localhost:5000/getimage/' +c.shop.pictures[0].name} alt />
                                        </div>
                                        <div className="media-body">
                                            <p>{c.shop.name}</p>
                                        </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h5>${c.shop.price}</h5>
                                    </td>
                                    <td>
                                        <div className="product_count">
                                        <span className="input-number-decrement" onClick={decrement}> <i className="ti-minus" /></span>
                                        <input className="input-number" type="text" value={counter} min={0} max={10} />
                                        <span className="input-number-increment" onClick={increment}> <i className="ti-plus" /></span>
                                        </div>
                                    </td>
                                    <td>
                                        <h5>${c.shop.price*counter}</h5>
                                    </td>
                                    <td className="cart__close">
                                    <i class="las la-trash" 
                                        style={{display:'flex',justifyContent:'center', cursor:'pointer',
                                        color:'#ca1515',fontSize:'30px'}}
                                        onClick={()=>dispatch(deleteProduct({id:c.shop._id}))}></i>
                                        
                                    </td>
                                    </tr>
                                )
                            })
                        }
                     
                        <tr className="bottom_button">
                        <td>
                            <a className="btn_1" href="#">Update Cart</a>
                        </td>
                        <td />
                        <td />
                        <td>
                            <div className="cupon_text float-right">
                            <a className="btn_1" href="#">Close Coupon</a>
                            </div>
                        </td>
                        </tr>
                        <tr>
                        <td />
                        <td />
                        <td>
                            <h5>Subtotal</h5>
                        </td>
                        <td>
                            <h5>${total}</h5>
                        </td>
                        </tr>
                        <tr className="shipping_area">
                        <td />
                        <td />
                        <td>
                            <h5>Shipping</h5>
                        </td>
                        <td>
                            <div className="shipping_box">
                            <ul className="list">
                                <li>
                                Flat Rate: $5.00
                                <input type="radio" aria-label="Radio button for following text input" />
                                </li>
                                <li>
                                Free Shipping
                                <input type="radio" aria-label="Radio button for following text input" />
                                </li>
                                <li>
                                Flat Rate: $10.00
                                <input type="radio" aria-label="Radio button for following text input" />
                                </li>
                                <li className="active">
                                Local Delivery: $2.00
                                <input type="radio" aria-label="Radio button for following text input" />
                                </li>
                            </ul>
                            <h6>
                                Calculate Shipping
                                <i className="fa fa-caret-down" aria-hidden="true" />
                            </h6>
                            <select className="shipping_select">
                                <option value={1}>Bangladesh</option>
                                <option value={2}>India</option>
                                <option value={4}>Pakistan</option>
                            </select>
                            <select className="shipping_select section_bg">
                                <option value={1}>Select a State</option>
                                <option value={2}>Select a State</option>
                                <option value={4}>Select a State</option>
                            </select>
                            <input className="post_code" type="text" placeholder="Postcode/Zipcode" />
                            <a className="btn_1" href="#">Update Details</a>
                            </div>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    <div className="checkout_btn_inner float-right">
                    <Link to="/shop" className="btn_1">Continue Shopping</Link>
                    <a onClick={()=>createOrder()} className="btn_1">Commander</a>
                    </div>
                </div>
                </div>
            </div>
        </section>


        <Footer/>
        </>
    )
}