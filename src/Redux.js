import {createStore} from 'redux';

const FETCH_REQUEST="FETCH_REQUEST";
const FETCH_SUCCESS="FETCH_SUCCESS";
const FETCH_FAILURE="FETCH_FAILURE";

const initialState={
	loading:false,
	users:[],
	error:""
}

export const fetchRequest=()=>{
	return {
		type:FETCH_REQUEST,
	}
}

export const fetchSuccess=(users)=>{
	return {
		type:FETCH_SUCCESS,
		payload:users
	}
}

export const fetchFailure=(error)=>{
	return {
		type:FETCH_FAILURE,
		payload:error
	}
}

const reducer=(state=initialState,action)=>{
	switch(action.type){
		case FETCH_REQUEST:
		   return{
		   	...state,
		   	loading:true
		   }
		case FETCH_SUCCESS:
		   return{
		   	loading:false,
		   	users:action.payload,
		   	error:""
		   } 
		case FETCH_FAILURE:
		   return{
		   	loading:false,
		   	users:[],
		   	error:action.payload
		   }
		default: return state        
	}
}

const store=createStore(reducer);

export default store;