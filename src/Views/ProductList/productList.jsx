import {Table,Button,Modal } from 'antd';
import Navbar from '../../Layouts/Navbar/navbar';
import Footer from '../../Layouts/Footer/footer';
import { Link } from 'react-router-dom';
import axios from "../../Config/axios"
import {apis} from "../../Config/apisUrl"
import {useState, useEffect} from 'react'
 

export default ()=>{

    const [listProduct, setListproduct]=useState([])

    const [selectedProduct, setSelectedProduct]=useState({})

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const allProducts=async()=>{
        axios.get(apis.product.allproducts)
        .then((res)=>{
            if(res.status === 200){
                setListproduct(res.data.data)
            }
        })
    }

    const deleteProduct =(id)=>{
        axios.delete(apis.product.deleteproduct +id)
        .then((res)=>{
            let arr = [...listProduct]
            setListproduct(arr.filter(c=>c._id !==id))
            console.log(res);
        })
        .catch(err=>{
            console.log(err , "Erreur Delete");
        })
    }

    const UpdateProduct=(id)=>{
        console.log(id ,"id");
        axios.put(apis.product.updateproduct + id ,selectedProduct)
        .then((res)=>{
            console.log(res);
            allProducts()
            setIsModalOpen(false)
        }).catch((err)=>{
            console.log(err.message);
        })

    }

    useEffect (()=>{
        allProducts()
    },[])

    const columns= [
        {
          title: 'Picture',
          dataIndex: 'pictures',
          key: 'pictures',
          render:(text, record)=>(
            <img style={{height:'50px', width:'50px'}}
            src={'http://localhost:5000/getimage/' + record.pictures[0].name}/>
          )
          
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Update',
            render:(text , record)=>
            <i class="las la-edit"
            onClick={()=>{showModal(record._id);
                setSelectedProduct(record);}}
            style={{display:'flex',justifyContent:'center', cursor:'pointer',
            color:'#ca1515',fontSize:'30px'}}></i>
            
        },
        {
            title: 'Delete',
            render:(text , record)=>
            <i class="las la-trash" 
              style={{display:'flex',justifyContent:'center', cursor:'pointer',
              color:'#ca1515',fontSize:'30px'}}
              onClick={()=>deleteProduct(record._id)}
              ></i>
            
        }]
    return(
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-12 mt-5">
                    <div className="col-md-12 col-sn-12">
                        <h2 className="section-title text-center px-3">List of Products</h2>
                    </div>
                    <div className="mb-5">
                        <Link to="/">
                        <Button type="primary">Add Product</Button>
                        </Link>
                    </div>
                    <Table columns={columns} dataSource={listProduct}/>
                </div>
            </div>

            
            <Modal title="Update Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div style={{ width: '100%'}}>
            <input type="text" 
                value={selectedProduct.name}
                onChange={(e)=>setSelectedProduct({...selectedProduct, name:e.target.value})}
                className="form-control mt-4" placeholder="Product name" 
                aria-label="name" aria-describedby="basic-addon1" />
            </div>
            <div style={{ width: '100%'}}>
            <input type="text" 
                value={selectedProduct.price}
                onChange={(e)=>setSelectedProduct({...selectedProduct, price:e.target.value})}
                className="form-control mt-4" placeholder="Product price" 
                aria-label="name" aria-describedby="basic-addon1" />
            </div>
            <div style={{ width: '100%'}}>
            <input type="text" 
                value={selectedProduct.description}
                onChange={(e)=>setSelectedProduct({...selectedProduct, description:e.target.value})}
                className="form-control mt-4" placeholder="Product description" 
                aria-label="name" aria-describedby="basic-addon1" />
            </div>

            <div className='col-12 mt-5'>
                <button className='btn btn-primary w-100 py-3' 
                onClick={()=>UpdateProduct(selectedProduct._id)}>
                
                    update product
                </button>
            </div>
            </Modal>
        </div>
        
        <Footer/>

        </>
    )
}