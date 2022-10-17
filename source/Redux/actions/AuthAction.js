import common from "../action-types/common";
import Auth from "../action-types/Auth";
export const UserLoggedIn =(data)=>({
    type:common.COMMON_API_CALL,
    subtypes: Auth.USER_LOGGED_IN,
    promise: ()=>({data:{isLoggedIn:data}})
})
export const UserLoggedOut =()=>({
    type:common.COMMON_API_CALL,
    subtypes: Auth.USER_LOGGED_IN,
    promise: ()=>({data:{isLoggedIn:false}})
})