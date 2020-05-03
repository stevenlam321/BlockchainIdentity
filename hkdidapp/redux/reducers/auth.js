import { LOGIN, LOGOUT } from "../actionTypes";


export default function (state,action){
    switch (action.type) {
        case LOGIN:{
            return state;
        }
        default:
            return state;    
    }
}