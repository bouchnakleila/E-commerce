
import Navbar from "../../Layouts/Navbar/navbar"
import Footer from "../../Layouts/Footer/footer"
import "./addcategory.css"
import { useState } from 'react';
import { Button } from 'antd';
import axios from "../../Config/axios"
import {apis} from "../../Config/apisUrl"
import {Link} from "react-router-dom"


export default()=>{
    const [picture, setPicture]=useState(null)
    const [name , setName]=useState("")
    const [success, setSuccess]=useState(false)

    const addCategory=()=>{
        let data=new FormData()
        data.append("name", name)
        data.append("picture",picture)
        console.log(data, "DATA");
        console.log(name, "NAME");
        console.log(picture, "PICTURE");
        axios.post(apis.category.addcategory , data)
        .then(res=>{console.log(res, "Res");
         if(res.status === 201){
            setSuccess(true)
            setTimeout(()=>{
                setSuccess(false)
            },1500)}
            })
        .catch(err=>{console.log(err.message);})
        
    }
    return(
        <>
        <Navbar/>
        
        <div className="container">
            <div className="row">
                <div className="col-md-12 mt-5">
                    <div className="col-md-12 col-sn-12">
                        <h2 className="section-title text-center px-3">Add Categories</h2>
                    </div>
                 
                
                    <div className="mb-5">
                        <Link to="/categoriesList"><Button type="primary">List of categories</Button></Link>
                    </div>
                </div>
            </div>
            
            <div className="category_form">
                <div className="icondiv">
                    
                    <input type="file" id="iconupload" hidden 
                    onChange={(e)=>setPicture(e.target.files[0])}/>
                    { picture ?
                     <i class="las la-check-double"></i>
                    :
                    <i class="las la-file-upload" 
                    onClick={()=>document.getElementById('iconupload').click()}></i>
                    }
                   
                </div>
                <div style={{ width: '100%' }}>
                <input type="text" 
                onChange={(e)=>setName(e.target.value)}
                className="form-control mt-4" placeholder="Category name" 
                aria-label="name" aria-describedby="basic-addon1" />

                </div>
                 <Button className="btn button w-100 h-50 mt-4" 
                 style={{backgroundColor:"#ca1515",color:"white"}} 
                 onClick={addCategory}>Add category</Button>
                {
                success &&
                    <div class="alert alert-success" role="alert">
                        A simple success alert—check it out!
                    </div>
                }
            </div>
            
        </div>
        
        
        <Footer/>
        </>
    )
}