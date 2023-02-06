import {createSlice} from '@reduxjs/toolkit'


const initialState={
    cart:[],
    isLoading:false,
    message:'',
    isError:false,
    isSuccess:false
}
export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addProduct:(state,action)=>{
            state.cart.push(action.payload.productshop)
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.message=''
        },
        deleteProduct:(state,action)=>{
            state.cart=state.cart.filter(c=>c.shop._id !== action.payload.id)
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.message=''
        },
        resetCart:(state)=>{
            state.cart=[]
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.message=''
        }
    }
})

export const {addProduct,deleteProduct,resetCart}= cartSlice.actions

export default cartSlice.reducer