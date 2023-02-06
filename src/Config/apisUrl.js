
export const apis={

    category:{
        addcategory:'/category/addCategory',
        allcategories:'/category/getAll',
        deletecategory:'/category/deletecategory/',
        updatecategory:'/category/putcategory/',
        
    },
    user:{
        register:'/User/createuser',
        login:'/User/createlogin',
        getUsers:'/User/getalluser',
        deleteUser:'/User/deleteuser/'
    },
    product:{
        allproducts:'/product/getAllProduct',
        deleteproduct:'/product/deleteprod/',
        updateproduct:'/product/updateProduct/',
        addproduct:'/product/createproduct',
        getproductbyid:'/product/getbyId/'
    },
    order:{
        createorder:'/order/createorder'
    }


}