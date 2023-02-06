import {Table,Button ,Modal} from 'antd';
import Navbar from '../../Layouts/Navbar/navbar';
import Footer from '../../Layouts/Footer/footer';
import { Link } from 'react-router-dom';
import axios from "../../Config/axios"
import {apis} from "../../Config/apisUrl"
import {useState, useEffect} from 'react'

export default()=>
{
    const [listCategory, setlistCategory]=useState([])
    
    const [selectedCategory , setSelectedCategory]=useState({})
    
    const allCategories=async()=>{
        axios.get(apis.category.allcategories)
        .then((res)=>{
            if(res.status === 200){
                setlistCategory(res.data.data)
            }
        })
    }

    const deleteCategory =(id)=>{
        axios.delete(apis.category.deletecategory+id)
        .then((res)=>{
            let arr = [...listCategory]
            setlistCategory(arr.filter(c=>c._id !==id))
            console.log(res);
        })
        .catch(err=>{
            console.log(err , "Erreur Delete");
        })
    }

    

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
    
    const UpdateCategory=(id)=>{
        console.log(id ,"id");
        axios.put(apis.category.updatecategory + id ,selectedCategory)
        .then((res)=>{
            console.log(res);
            allCategories()
            setIsModalOpen(false)
        }).catch((err)=>{
            console.log(err.message);
        })

    }

    useEffect (()=>{
        allCategories()
    },[])

    const columns = [
       
        {
          title: 'Icon',
          dataIndex: 'picture',
          key: 'picture',
          render:(text, record)=>(
            <img style={{height:'50px', width:'50px'}}
            src={'http://localhost:5000/getimage/' +record.picture}/>
          )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Update',
            render:(text , record)=>
            <i class="las la-edit"
            onClick={()=>{showModal(record._id);
                    setSelectedCategory(record);
                console.log(record._id ,"RECORD");}}
            style={{display:'flex',justifyContent:'center', cursor:'pointer',
            color:'#ca1515',fontSize:'30px'}}></i>
            
        },
        {
          title: 'Delete',
          render:(text , record)=>
          <i class="las la-trash" 
            style={{display:'flex',justifyContent:'center', cursor:'pointer',
            color:'#ca1515',fontSize:'30px'}}
            onClick={()=>deleteCategory(record._id)}></i>
        }
        ]
    return(
        
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-12 mt-5">
                   <div className="col-md-12 col-sn-12">
                        <h2 className="section-title text-center px-3">List of Categories</h2>
                    </div>
                    <div className="mb-5">
                        <Link to="/addCategory">
                        <Button type="primary">Add Category</Button>
                        </Link>
                    </div>
                    <Table columns={columns} dataSource={listCategory} />
                </div>
            </div>
            <Modal title="Update Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div style={{ width: '100%'}}>
            <input type="text" 
                value={selectedCategory.name}
                onChange={(e)=>setSelectedCategory({...selectedCategory, name:e.target.value})}
                className="form-control mt-4" placeholder="Category name" 
                aria-label="name" aria-describedby="basic-addon1" />
            </div>
            <div className='col-12 mt-5'>
                <button className='btn btn-primary w-100 py-3' 
                onClick={()=>UpdateCategory(selectedCategory._id)}>
                    update category
                </button>
            </div>
            </Modal>
        </div>
        
        <Footer/>
        </>
        
    )
}