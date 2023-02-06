import {Table} from 'antd';
import Navbar from '../../Layouts/Navbar/navbar';
import Footer from '../../Layouts/Footer/footer';
import axios from "../../Config/axios"
import {apis} from "../../Config/apisUrl"
import {useState, useEffect} from 'react'

export default()=>
{
    const [listUsers, setlistUsers]=useState([])
 
    const allUsers=async()=>{
        axios.get(apis.user.getUsers)
        .then((res)=>{
            if(res.status === 200){
                setlistUsers(res.data.data)
            }
        })
    }

    const deleteUser =(id)=>{
        axios.delete(apis.user.deleteUser + id)
        .then((res)=>{
            let arr = [...listUsers]
            setlistUsers(arr.filter(u=>u._id !==id))
            console.log(res);
        })
        .catch(err=>{
            console.log(err , "Erreur Delete");
        })
    }

    useEffect (()=>{
        allUsers()
    },[])

    const columns = [
       
        
        {
            title: 'FullName',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
      
        {
          title: 'Delete',
          render:(text , record)=>
          <i class="las la-trash" 
            style={{display:'flex',justifyContent:'center', cursor:'pointer',
            color:'#ca1515',fontSize:'30px'}}
            onClick={()=>deleteUser(record._id)}></i>
        }
        ]
    return(
        
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-12 mt-5">
                   <div className="col-md-12 col-sn-12">
                        <h2 className="section-title text-center px-3">List of Users</h2>
                    </div>
                    {/* <div className="mb-5">
                        <Link to="/register">
                        <Button type="primary">Add User</Button>
                        </Link>
                    </div> */}
                    <Table columns={columns} dataSource={listUsers} />
                </div>
            </div>
           
        </div>
        
        <Footer/>
        </>
        
    )
}