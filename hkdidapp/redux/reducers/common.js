import { SET_LOADING } from "../actionTypes";


const initialState = {
    loading: false,
    token: '12345'
};

export default function (state = initialState,action){
    switch (action.type) {
        case SET_LOADING:{
            var status = {...state,loading:action.payload.loading};
            // console.log('action:'+ JSON.stringify(action));
            // console.log('status:'+JSON.stringify(status));
            return status;
        }
        default:
            return state;    
    }
}