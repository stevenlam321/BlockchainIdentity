import { SET_LOADING,LOGIN,SET_TOKEN } from "../actionTypes";


const initialState = {
    loading: false,
    token: null,
    person:null
};

export default function (state = initialState,action){
    switch (action.type) {
        case SET_LOADING:{
            return {...state,loading:action.payload.loading};
        }
        case SET_TOKEN:{
            return {...state,token:action.payload.token};
        }
        case LOGIN:{
            return {...state,loading:action.payload.loading};
        }
        default:
            return state;    
    }
}