import {LOGIN,LOGOUT} from '../action/common';
import Immutable,{Map,List} from 'immutable';

let initState = Map({
    user:Map({
        Authorization:'',
    })
})

function commonReducer(state=initState,action){
    switch(action.type){
        case LOGIN:
            // return state.set('user',Map(action.user));
            localStorage.setItem('user',JSON.stringify(action.user))
            return state.update('user',()=>action.user);
        case LOGOUT:
            // return state.set('user',Map({}))
            localStorage.removeItem('user');
            return state.update('user',()=>({}));
        default:
            return state;
    }
}

export default commonReducer;