import React,{Component} from 'react';

import axios from 'axios';

import {connect} from 'react-redux';

class Goods extends Component{
    componentWillMount(){
        this.props.changeBarStatus(false);
        console.log(this.props)
        let {id} = this.props.match.params;
        axios.get(`/jxapi/m_v1/goods/detailPromo/${id}`).then(res=>{
            console.log(res);
        })
    }
    componentWillUnmount(){
        this.props.changeBarStatus(true);
    }
	render(){
		return <div className="goods">
			商城
		</div>
	}
}
const mapStateToProps = state=>{
    return {

    }
}
const mapDispatchToProps = dispatch=>{console.log(dispatch)
    return {
        changeBarStatus(status){
            dispatch({
                type:'CHANGE_BAR_STATUS',
                payload:status
            })
        }
    }
}

Goods = connect(mapStateToProps,mapDispatchToProps)(Goods);

export default Goods;