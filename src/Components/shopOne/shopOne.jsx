import axios from "../../Config/axios"
import {apis} from "../../Config/apisUrl"
import {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {addProduct} from "../../features/Cart/cartSlice"


export default({shop})=>{
    const [product, setProduct] = useState({})
    const navigate = useNavigate()
    const getProductById=async(id)=>{
            axios.get(apis.product.getproductbyid + id, {state:{id:id}})
            .then((res)=>{
                if(res.status === 200){
                    navigate("/productDetails/"+id ,{state:{id:id}})
                    setProduct(res.data.data)
                }
            })
    }

    const cart= useSelector(state=>state.cart.cart)
    console.log("Cart",cart);
    const dispatch =useDispatch()
    const addProductToCart=()=>{
        
        let proshop={
            shop:shop,
            qte:1
        }
        dispatch(addProduct({productshop:proshop}))
        
    }
    return(
        
        <>
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <div className="single-popular-items mb-50 text-center">
                        <div className="popular-img">
                            <img src={'http://localhost:5000/getimage/' +shop.pictures[0].name} alt />
                            <div className="img-cap">
                            <span onClick={addProductToCart}>Add to cart</span>
                            </div>
                            <div className="favorit-items">
                            <span className="flaticon-heart" />
                            </div>
                        </div>
                        <div className="popular-caption">
                            <h3><a onClick={()=>getProductById(shop._id)}>{shop.name}</a></h3>
                            <span>$ {shop.price}</span>
                        </div>
                        </div>
                    </div>
        </>
    )
}