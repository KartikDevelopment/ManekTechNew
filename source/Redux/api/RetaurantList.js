import apiService from "../axios-service"
import {Restaurant_LIST} from "../Constants/endpoints"
export const GetRestaurant =()=> apiService.get(Restaurant_LIST)