import React,{ Component } from "react";
import Api from '@/api';
import { connect } from "react-redux";
import commonAction from '../store/action/common'

export function withAuth(InnerComponent){
    @withUser
    class WrapComponent extends Component{
        gotoLogin(){
            let {history,match,dispatch} = this.props;
            history.replace('/login?targetUrl='+match.url);
            dispatch(commonAction.logout())
        }
        componentDidMount(){console.log('withAuth.didmount')
            // let user = localStorage.getItem('user');
            // if(!user){
            //     this.gotoLogin();
            //     return;
            // }
            // this.setState({
            //     Authorization
            // });

            // let result = await Api.get('/user/verify',{},{
            //     headers:{
            //         Authorization
            //     }
            // });

            // // token失效(过期/篡改)
            // if(result.status === 401){
            //     this.gotoLogin()
            // }

            let res = this.props.dispatch({type:'CHECK_LOGIN_STATUS'});
            console.log('CHECK_LOGIN_STATUS.res',res)
        }
        shouldComponentUpdate(nextProps,nextState){console.log('withAuth.should')
            if(!nextProps.user.Authorization){
                let {history,match} = this.props;
                history.replace('/login?targetUrl='+match.url);
                return false;
            }
            return true;

        }
        render(){
            return <InnerComponent {...this.props}/>
        }
    }

    return WrapComponent
}

export function withUser(InnerComponent){
    @connect(({common})=>({user:common.get('user')}))
    class WrapComponent extends Component{
        render(){
            return <InnerComponent {...this.props}/>
        }
    }
    return WrapComponent;
}

export default {
    withAuth,
    withUser
}