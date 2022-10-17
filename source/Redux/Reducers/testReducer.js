const INCREMENT = "INCREMENT"
import restaurantList from "../action-types/restaurantList"
export const increment =()=>({
    type:INCREMENT,
})
const initalState={
   count:0,
   loading:false,
    ListData:[],
    persistant:false,
}
export default (state = initalState,action)=>{
    console.log(action)
    switch(action.type){
        case restaurantList.RESTAURANT_LIST.START:{
            return {
                ...state,
                ListData:[],
                persistant:false,
                loading:true,
            }
        }
        case restaurantList.RESTAURANT_LIST.SUCCESS:{
            console.log(action.payload)
            let data = []
            for(let i=0;i<10;i++){
                data.push(...action.payload.data)
            }
            return {
                ...state,
                ListData:data,
                persistant:true,
                loading:false,
            }
        }
        case restaurantList.RESTAURANT_LIST.FAIL:{
            return {
                ...state,
                ListData:[],
                persistant:false,
            }
        }
        case INCREMENT:{
            return {
                ...state,
                count: state.count + 1
            }
        }
        default:{
            return state
        }
    }
}