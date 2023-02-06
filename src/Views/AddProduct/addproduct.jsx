import {Button,Steps ,theme} from 'antd';
import Navbar from '../../Layouts/Navbar/navbar';
import Footer from '../../Layouts/Footer/footer';
import { Link } from 'react-router-dom';
import axios from "../../Config/axios"
import {apis} from "../../Config/apisUrl"
import {useState, useEffect} from 'react'
import './addproduct.css'


export default ()=>{

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const allCategories=async()=>{
      axios.get(apis.category.allcategories)
      .then((res)=>{
            if(res.status === 200)
            {
              setCategories(res.data.data)
            }
           
      })
      
    }

    useEffect(()=>{
        allCategories()
    },[])
    console.log("list categories",categories);
    console.log(category,"idcategory");
    const CategoriesStep=()=>{
        return(
            <>
                <div className="row">
                  {
                    categories.map(c =>{
                      return(
                      <div onClick={()=>setCategory(c._id)}
                        className={`category_item col-md-2 col-sm-1
                        ${c._id === category ? 'category_selected' : ''}`}>
                        <img  className='cat-item'
                        src={'http://localhost:5000/getimage/' + c.picture} alt="" />
                        <span className='categoryname'>{c.name}</span>
                      </div>
                      )
                    })
                  }
                </div>
            </>
        )
      }

      const [images, setImages] = useState([])

      const handleImages=e=>{
          //copie d'images
          let imgs=[]
          const {files} = e.target
          let j= [...images].length+1
          for(let i=0; i<files.length ; i++)
          {
              imgs.push({
                id:j+1,
                thumb:URL.createObjectURL(files[i]),
                file:files[i]
              })
              j+=1
          }
          setImages((prevImages)=>prevImages.concat(imgs))
          e.target= null

      }
      console.log(images,"img");

      const removeImage=id=>{
        let arr = [...images]
        let filtredim = arr.filter(i => i.id !== id)
        setImages(filtredim)
      }
      const PicturesStep=()=>{
        return(
          <>
            <div className="images">
              <div className="row">

                <input onChange={handleImages}
                    type="file" id="uploadimages" hidden multiple/>
                    {
                      images.map(i=>{
                        return(
                          <div className="col-md-2 col-sm-4 image_item mt-4">
                            <img src={i.thumb} alt="" />
                            <i class="las la-times-circle" onClick={()=>removeImage(i.id)}></i>
                          </div>
                        )
                      })
                    }
                  <div onClick={()=>document.getElementById('uploadimages').click()}
                    className='uploadinput m-3'>
                    {/* <i className="las la-image"></i> */}
                    <img  className='cat-item' src="img/icons8-picture-94.png" alt="" />
                  </div>
              </div>
            </div>
          </>
        )
      }

      const DetailStep=()=>{
        const [details,setDetails]=useState({
          name:"",
          description:"",
          price:""
        })
        const handleChange=e=>{
          const {value, name}=e.target
          setDetails(prev=>({
            ...prev , [name]:value
          }))
         // console.log(details);
          localStorage.setItem('details',
          JSON.stringify({...details, [name]:value}))
        }
      
        return(
          <>
          <div className="details p-3">
          
                                <input type="text" 
                                onChange={handleChange} name="name"
                                className="form-control" placeholder="Product name" 
                                aria-label="name" aria-describedby="basic-addon1" />
                                  
                            
                                <input type="text" 
                                onChange={handleChange} name="description"
                                className="form-control mt-3" placeholder="Product description" 
                                aria-label="description" aria-describedby="basic-addon1" />
                            
                                <input type="text" 
                                onChange={handleChange} name="price"
                                className="form-control mt-3" placeholder="Product price" 
                                aria-label="price" aria-describedby="basic-addon1" />
              </div>
          </>
        )
      }
      
    const steps = [
        {
          title: 'Category',
          content: <CategoriesStep/>,
        },
        {
          title: 'Pictures',
          content: <PicturesStep/>,
        },
        {
          title: 'Details',
          content: <DetailStep/>,
        },
      ];
      
      const next = () => {
        setCurrent(current + 1);
      };
      const prev = () => {
        setCurrent(current - 1);
      };
      const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
      }));
      const contentStyle = {
       
      };

      const addProduct=()=>{
        let data=new FormData()
            data.append("category", category)
            for(let item of images){
              data.append('pictures',item.file)
            }
            const product=JSON.parse(localStorage.getItem('details'))
            data.append('name', product.name)
            data.append('description', product.description)
            data.append('price',product.price)
            axios.post(apis.product.addproduct , data)
            .then(res=>{
              setCategory()
              setImages([])
              localStorage.removeItem('details')
              setCurrent(0)
            })
            .catch(err=>{console.log(err.message);})
      }
     
    return(
        <>
        <Navbar/>

        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <h2 className='section-title text-center px-3'>
                        new product
                    </h2>
                </div>
                <div className="mb-5">
                    <Link to="/productsList">
                        <Button type="primary">List of product</Button>
                    </Link>
                </div>
            </div>
            <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div
        style={{
          marginTop: 24,
        }}
        >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={()=>addProduct()}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
      </div>
    
      <Footer/>
      </>
    )
}