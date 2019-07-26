import React, { Component } from 'react';

import { TabBar } from 'antd-mobile'

import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faHome, faFingerprint, faUser } from '@fortawesome/free-solid-svg-icons';

// 组件
import Home from './components/Home';
import Cart from './components/Cart';
import Discover from './components/Discover';
import Mine from './components/Mine';
import Goods from './components/Goods';

import { connect } from 'react-redux';
import axios from 'axios';

import 'antd-mobile/dist/antd-mobile.css';
import './sass/common.scss';

// 配置baseUrl：week1_Nodejs/server/data_server.js
// axios.defaults.baseURL = 'http://localhost:4004';

library.add(faShoppingBasket, faHome, faFingerprint, faUser);


class App extends Component {
    constructor() {
        super();
        this.state = {
            tabs: [
                {
                    id: 1,
                    name: 'Home',
                    path: '/home',
                    text: '首页',
                    icon: 'home'
                }, {
                    id: 2,
                    name: 'Cart',
                    path: '/cart',
                    text: '购物车',
                    icon: 'shopping-basket'
                }, {
                    id: 3,
                    name: 'Discover',
                    path: '/discover',
                    text: '发现',
                    icon: 'fingerprint'
                }, {
                    id: 4,
                    name: 'Mine',
                    path: '/mine',
                    text: '我的',
                    icon: 'user'
                }
            ],
            currentTab: 'Home',
            cartLength: 0,
        }

    }


    componentWillMount() {
        // 刷新保持当前Tab高亮
        let { pathname } = this.props.location;
        pathname = pathname.slice(1);
        if (pathname) {
            this.setState({
                currentTab: pathname[0].toUpperCase() + pathname.slice(1)
            });
        }

        // axios.get('http://localhost:4004',{
        //     params:{
        //         url:'http://www.juooo.com/Index/ajaxGetCityRecommendData'
        //     }
        // }).then(res=>{
        //     console.log(res)
        // })

        axios.get('/proxy/Index/ajaxGetCityRecommendData').then(res=>{
            console.log(res)
        })

    }

    // 改变tab
    handlerChangeTab(tab) {
        let { history } = this.props;
        this.setState({
            currentTab: tab.name
        }, () => {
            // 手动跳转路由
            history.push(tab.path);
        });
    }
    render() {
        return (
            <div className="myapp">
                <div className="content">
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/cart' component={Cart} />
                        <Route path='/discover' component={Discover} />
                        <Route path='/mine' component={Mine} />
                        <Route path='/goods/:id' component={Goods} />
                        <Redirect from="/" to="/home" exact />
                    </Switch>
                </div>
                <TabBar noRenderContent hidden={!this.props.showTabbar}>
                    {
                        this.state.tabs.map(tab => <TabBar.Item
                            title={tab.text}
                            key={tab.id}
                            icon={<FontAwesomeIcon icon={tab.icon} />}
                            selectedIcon={<FontAwesomeIcon icon={tab.icon} />}
                            selected={this.state.currentTab === tab.name}
                            onPress={this.handlerChangeTab.bind(this, tab)}
                            badge={tab.name === 'Cart' ? this.props.cartList.length : ''}
                        >

                        </TabBar.Item>

                        )
                    }
                </TabBar>

            </div>
        );
    }
}




function mapStateToProps(state,ownprops) {
    return {
        showTabbar:state.common.showTabbar,
        cartList: state.shoppingCart.cart
    }
}
App = connect(mapStateToProps)(App);

App = withRouter(App);
export default App;