import React,{Component} from 'react';

import axios from 'axios';

import {withRouter} from 'react-router-dom';

import { Grid,Carousel,SearchBar,List  } from 'antd-mobile';

import {connect} from 'react-redux';
import {addToCart,updateCart} from '../actions/cart-actions';

class Home extends Component{
	constructor(){
		super();
		this.state = {
			ad:[],
			goodslist:[]
		}
	}
	componentWillMount(){console.log('ajax')
		axios.get('/jxapi/m_v1/promote/qgajax.do',{
			params:{
				t:Date.now(),
				pagenum:1,
				tabnum:1
			}
		}).then(res=>{
			let data = res.data;console.log(data)
			
			this.setState({
				ad:data.killProList.slice(0,4),
				goodslist:data.killProList.slice(4)
			});
		});
	}

	handlerAddToCart(goods,idx){
		// 获取购物车中已有数据
		// let data = store.getState().shoppingCart.cart;
		let {cartList:data,onClickGoods} = this.props;console.log(this.props)

		// 判断购物车中是否存在当前商品
		let res = data.filter(item=>item.proId===goods.proId)[0];
		let action;

		if(res){
			// 存在，则数量+1
			action = updateCart({proId:goods.proId,qty:res.qty+1});
			
		}else{
			//不存在，则添加到购物车列表
			action = addToCart({...goods,qty:1});
		}
		onClickGoods(action);
	}

	//到详情页
	handlerGotoDetails(goods,idx){
		let {history} = this.props;

		history.push(`/goods/${goods.proId}`);
	}
	render(){
		return <div className="home">
			<SearchBar/>
			<button onClick={()=>{
				this.props.dispatch({type:'DO_TEST_ASYNC'})
			}}>Saga {this.props.testNum}</button>
			<Carousel>
				{this.state.ad.map(goods => (
				    <div
		              key={goods.proId}
		            >
		              <img
		              	alt={goods.proName}
		                src={goods.proImg}
		                style={{ width: '100%', height:'200px',verticalAlign: 'top' }}
		                onLoad={() => {
		                  // fire window resize event to change height
		                  window.dispatchEvent(new Event('resize'));
		                  // this.setState({ imgHeight: 'auto' });
		                }}
		              />
		            </div>
		          ))}
			</Carousel>

			{/* <List>
				{
					this.state.goodslist.map(goods=>{
						return (
							<List.Item key={goods.proId} thumb={goods.proImg} arrow='horizontal' onClick={this.handlerDetail.bind(this,goods.proId)}>
								{goods.proName}
								<List.Item.Brief>{goods.slogan}</List.Item.Brief>
								<List.Item.Brief className="price">价格：<span>{goods.proPrice}</span></List.Item.Brief>
							</List.Item>
						)
					})
				}
				
			</List> */}

			<Grid data={this.state.goodslist}
				onClick={this.handlerGotoDetails.bind(this)}
				columnNum={2}
				renderItem={goods => (
					<div style={{ padding: '12.5px' }}>
						<img src={goods.proImg} style={{ width: '75px', height: '75px' }} alt="" />
						<div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
							{goods.proName}
							<p className="price">价格：<span>{goods.proPrice}</span></p>
						</div>
					</div>
				)}
			/>
		</div>
	}
}


function mapStateToProps(state) {
  return {
	cartList: state.shoppingCart.cart,
	testNum:state.common.testNum
  }
}
function mapDispatchToProps(dispatch) {
  return {
	onClickGoods: (action) => dispatch(action),
	dispatch
  }
}
Home = connect(mapStateToProps,mapDispatchToProps)(Home);

export default Home;