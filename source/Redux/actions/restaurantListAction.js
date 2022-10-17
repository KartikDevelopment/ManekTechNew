import common from "../action-types/common";
import restaurantList from "../action-types/restaurantList";
import { GetRestaurant } from "../api/RetaurantList";
export const GetRestaurantLists =()=>({
    type:common.COMMON_API_CALL,
    subtypes:restaurantList.RESTAURANT_LIST,
    promise: ()=>GetRestaurant()
})