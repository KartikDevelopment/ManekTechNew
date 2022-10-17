const INCREMENT = "INCREMENT"
import Auth from "../action-types/Auth"
const initalState={
   auth:{
        isLoggedIn:false,
        loading:false,
        success:false,
        error:""
    }
}
export default (state = initalState,action)=>{
    console.log(action)
    switch(action.type){
        case Auth.USER_LOGGED_IN.START:{
            return{
                ...state,
                auth:{
                    isLoggedIn:false,
                    loading:true,
                    error:""
                }
                
            }
        }
        case Auth.USER_LOGGED_IN.SUCCESS:{
            console.log("action.payload")
            console.log(action.payload)
            return{
                ...state,
                auth:{
                    isLoggedIn:action.payload.isLoggedIn,
                    success:action.payload.isLoggedIn,
                    loading:false,
                    error:""
                }
            }
        } 
        case Auth.USER_LOGGED_IN.FAIL:{
            return{
                ...state,
                auth:{
                    isLoggedIn:false,
                    success:false,
                    loading:false,
                    error:"Failed to Logged in"
                }
            }
        }
        default:{
            return state
        }
    }
}