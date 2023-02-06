import { useEffect, createContext, useReducer } from "react";

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    loading:false,
    error:null
}

export const AuthContext=createContext(INITIAL_STATE)

const AuthReducer = (state, dispatch)=>{
    switch(dispatch.type){
        case "LOGIN_START":
            return{
                user:null,
                loading:true,
                error:null
            }
            case "LOGIN_SUCCESS":
                return{
                    user:dispatch.payload,
                    loading:false,
                    error:null
                }
                case "LOGIN_FAILURE":
                    return{
                        user:null,
                        loading:false,
                        error:dispatch.payload
                    }
                    case "LOGOUT":
                        return{
                            user:null,
                            loading:false,
                            error:null
                        }
                default:
                    return state
    }
}

export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE)
    
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])

    
return(
    <AuthContext.Provider value={{
        user:state.user,
        loading:state.loading,
        error:state.error,
        dispatch
    }}>{children}</AuthContext.Provider>
)

}