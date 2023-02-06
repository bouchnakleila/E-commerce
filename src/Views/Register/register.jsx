import Footer from "../../Layouts/Footer/footer"
import Navbar from "../../Layouts/Navbar/navbar"
import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import axios from '../../Config/axios'
import {apis} from '../../Config/apisUrl'

export default()=>{
    const [fullname, setFullname]=useState("")
    const [email,setEmail]=useState("") 
    const [password, setPassword]=useState("")
    const [phone, setPhone]=useState("")
    const [adress, setAdress]=useState("")
    const [picture, setPicture] =useState(null)
    const navigate=useNavigate()

    const Register=()=>{
        let data = new FormData()

        data.append("fullname",fullname)
        data.append("email",email)
        data.append("password",password)
        data.append("phone",phone)
        data.append("picture",picture)
        data.append("adress",adress)
        axios.post(apis.user.register , data)
        .then((res)=>{
            console.log('compte créé!');
            if(res.status === 201){
                navigate("/login") //dans App.js
            }
        })
        .catch((err)=>{
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
                        <h2>Create An Account </h2>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>


            <section className="contact-section">
                <div className="container">

                <div className="row">
                    <div className="col-12">
                        <h2 className="contact-title">Register</h2>
                    </div>
                    <div className="col-lg-8">
                        <form className="form-contact contact_form">
                        <div className="row">
                            <div className="col-12">
                            <div className="form-group">   
                            <input className="form-control valid" name="picture" 
                                id="picture" type="file" onfocus="this.placeholder = ''" 
                                onBlur="this.placeholder = 'upload a picture'" placeholder="Uplod a picture"
                                onChange={(e)=>setPicture(e.target.files[0])}/>
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <input className="form-control valid" name="fullname" 
                                id="name" type="text" onfocus="this.placeholder = ''" 
                                onBlur="this.placeholder = 'Enter your name'" placeholder="Enter your name" 
                                onChange={(e)=>setFullname(e.target.value)}/>
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <input className="form-control valid" name="email" 
                                id="email" type="email" onfocus="this.placeholder = ''" 
                                onBlur="this.placeholder = 'Enter email address'" placeholder="Email" 
                                onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <input className="form-control valid" name="phone" 
                                id="phone" type="number" onfocus="this.placeholder = ''" 
                                onBlur="this.placeholder = 'Enter your phone'" placeholder="Phone" 
                                onChange={(e)=>setPhone(e.target.value)}/>
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <input className="form-control valid" name="adress" 
                                id="adress" type="text" onfocus="this.placeholder = ''" 
                                onBlur="this.placeholder = 'Enter address'" placeholder="Address" 
                                onChange={(e)=>setAdress(e.target.value)}/>
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <input className="form-control valid" name="password" 
                                id="password" type="password" onfocus="this.placeholder = ''" 
                                onBlur="this.placeholder = 'Enter password'" placeholder="Password" 
                                onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            </div>
                            
                        </div>
                        <div className="form-group mt-3">
                            <button type="submit" onClick={Register} className="button button-contactForm boxed-btn">Send</button>
                        </div>
                        </form>
                    </div>
                    <div className="col-lg-3 offset-lg-1">
                        <div className="media contact-info">
                        <span className="contact-info__icon"><i className="ti-home" /></span>
                        <div className="media-body">
                            <h3>Buttonwood, California.</h3>
                            <p>Rosemead, CA 91770</p>
                        </div>
                        </div>
                        <div className="media contact-info">
                        <span className="contact-info__icon"><i className="ti-tablet" /></span>
                        <div className="media-body">
                            <h3>+1 253 565 2365</h3>
                            <p>Mon to Fri 9am to 6pm</p>
                        </div>
                        </div>
                        <div className="media contact-info">
                        <span className="contact-info__icon"><i className="ti-email" /></span>
                        <div className="media-body">
                            <h3>support@colorlib.com</h3>
                            <p>Send us your query anytime!</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>
                </section>
        <Footer/>
        </>
    )
}