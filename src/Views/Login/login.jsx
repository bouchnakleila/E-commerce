import Footer from "../../Layouts/Footer/footer"
import Navbar from "../../Layouts/Navbar/navbar"
import { Link ,useNavigate} from 'react-router-dom'
import axios from "../../Config/axios"
import {useState ,useContext} from 'react'
import { AuthContext } from "../../Context/AuthContext"

export default () => {
    const [credentials, setCredentials] = useState({
        email:undefined,
        password:undefined
    })
    const navigate = useNavigate()

    const {loading, error ,dispatch}= useContext(AuthContext)
    
    const handelChange=(e)=>{
        setCredentials(prev=>({
            ...prev,[e.target.id]:e.target.value
        }))
    }
    
    const Login= async e =>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try {
            const res= await axios.post("/user/createlogin", credentials)
            dispatch({type:"LOGIN_SUCCESS" , payload:res.data})
            navigate("/shop")
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE" ,payload:error.response.data})
        }
    }
    
    
    return (
        <>
            <Navbar />
            <div className="slider-area ">
                <div className="single-slider slider-height2 d-flex align-items-center">
                    <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                        <div className="hero-cap text-center">
                            <h2>Login</h2>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <section className="login_part section_padding ">
                <div className="container">
                    <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="login_part_text text-center">
                        <div className="login_part_text_iner">
                            <h2>New to our Shop?</h2>
                            <p>There are advances being made in science and technology
                            everyday, and a good example of this is the</p>
                            <Link to="/register" className="btn_3">Create an Account</Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="login_part_form">
                        <div className="login_part_form_iner">
                            <h3>Welcome Back ! <br />
                            Please Sign in now</h3>
                            <form className="row contact_form">
                            <div className="col-md-12 form-group p_star">
                                <input type="email" className="form-control" 
                                    id="email" name="email" placeholder="Email" 
                                    onChange={handelChange}/>
                            </div>
                            <div className="col-md-12 form-group p_star">
                                <input type="password" className="form-control" 
                                    id="password" name="password" placeholder="Password" 
                                    onChange={handelChange}/>
                            </div>
                            <div className="col-md-12 form-group">
                                <div className="creat_account d-flex align-items-center">
                                <input type="checkbox" id="f-option" name="selector" />
                                <label htmlFor="f-option">Remember me</label>
                                </div>
                                <div className="col-md-12">
                                     {error && <span>{error.message}</span>}
                                </div>
                                <button className="btn_3" onClick={Login}>
                                log in
                                </button>
                                <a className="lost_pass" href="#">forget password?</a>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        <Footer />
    </>
    )
}