import { Link ,Navigate} from 'react-router-dom'
import {useContext} from "react"
import {AuthContext} from "../../Context/AuthContext"
import { Avatar} from 'antd';
import axios from "../../Config/axios";

export default()=>{


const {user, dispatch}= useContext(AuthContext)
console.log(user,"user")
  const Logout=async()=>{
    try {
      const res=await axios.post("/User/logout")
      dispatch({type:"LOGOUT" ,payload:res.data})
      Navigate("/")
    } catch (error) {
      console.log(error.message);
    }
  }
    return(
        <>
        <header>
            {/* Header Start */}
            <div className="header-area">
                <div className="main-header header-sticky">
                <div className="container-fluid">
                    <div className="menu-wrapper">
                    {/* Logo */}
                    <div className="logo">
                        <a href="/"><img src="img/logo/logo.png" alt /></a>
                    </div>
                    {/* Main-menu */}
                    <div className="main-menu d-none d-lg-block">
                        <nav>                                                
                        <ul id="navigation">  
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">shop</Link></li>
                            <li><Link to="/about">about</Link></li>
                            
                            <li className="hot"><a href="#">Latest</a>
                            <ul className="submenu">
                                <li><Link to="/productList"> Product list</Link></li>
                                <li><Link to="/categoryList"> Category list </Link></li>
                                <li><Link to="/addProduct"> Add Product </Link></li>
                                <li><Link to="/addCategory"> Add Category </Link></li>
                                <li><Link to="/users"> Users List </Link></li>
                            </ul>
                            </li>
                            
                            <li><a href="blog.html">Blog</a>
                            <ul className="submenu">
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Blog Details</a></li>
                            </ul>
                            </li>
                            <li><a href="#">Pages</a>
                            <ul className="submenu">
                                {user?
                                <li><Link onClick={Logout}>Logout</Link></li>:
                                <li><Link to="/login">Login</Link></li>
                                }
                                <li><Link to="/cart">Cart</Link></li>
                                <li><Link to="/productDetails">Product Details</Link></li>
                                <li><a href="confirmation.html">Confirmation</a></li>
                                <li><a href="checkout.html">Product Checkout</a></li>
                            </ul>
                            </li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                        </nav>
                    </div>
                    {/* Header Right */}
                    <div className="header-right">
                        <ul>
                        <li>
                            <div className="nav-search search-switch">
                            <span className="flaticon-search" />
                            </div>
                        </li>
                        <li>{user ? 
                            <Avatar size="large" style={{marginLeft:'25px'}}
                             src={'http://localhost:5000/getimage/'+user.user.picture}/>:
                            <Link to="/login"><span className="flaticon-user" /></Link>
                            
                            }
                        </li>
                        <li><Link to="/cart"><span className="flaticon-shopping-cart" /></Link></li>
                        </ul>
                    </div>
                    </div>
                    {/* Mobile Menu */}
                    <div className="col-12">
                    <div className="mobile_menu d-block d-lg-none" />
                    </div>
                </div>
                </div>
            </div>
            {/* Header End */}
        </header>

        </>
    )
}