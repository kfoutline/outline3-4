import React, { Component } from "react";
import {connect} from 'react-redux';
import action from './store/action/common';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Layout, Button, Menu, Dropdown,Icon, Row, Col,Avatar } from "antd";
const { Header, Footer, Sider, Content } = Layout;

import Home from "~/Home";
import Random from "~/Random";
import Section from "~/Section";
import Add from "~/Add";
import Mine from "~/Mine";
import Details from "~/Details";
import Reg from "~/Reg";
import Login from "~/Login";
import List from "~/List";

import MyBreadcrumb from "@@/Breadcrumb";
import {withUser} from './utils';

import './App.scss'

@withRouter
@withUser
@connect((state)=>{
  return {}
},dispatch=>{
  return {
    logout(){
      dispatch(action.logout())
    },
    dispatch
  }
})
class App extends Component {
  state = {
    current: ["/home"],
    breadcrumb: ["首页"],
    menu: [
      {
        name: "Home",
        path: "/home",
        text: "首页"
      },
      {
        name: "Random",
        path: "/random",
        text: "随机面试"
      },
      {
        name: "Section",
        path: "/section",
        text: "阶段面试"
      },
      {
        name: "Add",
        path: "/add",
        text: "添加面试题"
      },
      {
        name: "Mine",
        path: "/mine",
        text: "我的"
      }
    ]
  };

  changeMenu = ({ key }) => {
    
    let currentMenu = this.state.menu.filter(item => item.path === key)[0];
    let breadcrumb =
      currentMenu.name === "Home"
        ? [currentMenu.text]
        : ["首页", currentMenu.text];
    this.setState({
      current: [key],
      breadcrumb
    });

    this.goto(key);
  };

  goto = path=>{
    let { history } = this.props;
    history.push(path);
  }

  
  componentDidMount() {
    let { pathname } = this.props.location;
    this.setState({
      current: [pathname]
    });
    
    // 刷新检测登录状态
    this.props.dispatch({type:'CHECK_LOGIN_STATUS'})
    
  }

  render() {
    const { current, menu, breadcrumb } = this.state;
    let {user,logout} = this.props;
    const usermenu = (
      <Menu>
        <Menu.Item>{user.username}</Menu.Item>
        <Menu.Item><Icon type="profile"/>个人中心</Menu.Item>
        <Menu.Item><Icon type="unordered-list" />我的面试题</Menu.Item>
        <Menu.Item><Icon type="pushpin" />我的回答</Menu.Item>
        <Menu.Item onClick={logout}><Button type="primary" size="small" ghost block>退出</Button></Menu.Item>
      </Menu>
    );
    return (
      <Layout>
        <Header>
          <Row>
            <Col span={4}>
              <div
                className="logo"
                style={{ color: "#fc0", overflow: "hidden", maxHeight: 64 }}
                title="面试宝典，助你拿下offer！"
              >
                <Icon type="crown" style={{fontSize:36,margin:'0 8px 10px 0',verticalAlign:'middle'}} />
                面试宝典
              </div>
            </Col>
            <Col span={17}>
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={current}
                style={{ lineHeight: "64px" }}
                onClick={this.changeMenu}
              >
                {menu.map(item => {
                  return (
                    <Menu.Item title={item.name} key={item.path}>
                      {item.text}
                    </Menu.Item>
                  );
                })}
              </Menu>
            </Col>
            <Col span={3} style={{textAlign:'right'}}>
              {
                user.username
                ?
                <Dropdown overlay={usermenu} placement="bottomRight">
                  <Avatar icon="user" />
                </Dropdown>
                :
                <Button.Group size="small">
                  <Button type="link" onClick={this.goto.bind(this,'/login')}>登录</Button>
                  <Button type="link" onClick={this.goto.bind(this,'/reg')}>注册</Button>
                </Button.Group>
              }
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <MyBreadcrumb data={breadcrumb} />
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/random" component={Random} />
              <Route path="/section" component={Section} />
              <Route path="/add" component={Add} />
              <Route path="/mine" component={Mine} />
              <Route path="/search" component={List} />
              <Route path="/iq" component={List} exact />
              <Route path="/iq/:id" component={Details} />
              <Route path="/reg" component={Reg} />
              <Route path="/login" component={Login} />
              <Route path="/forgotpwd" render={() => <div>忘记密码找laoxie</div>} />
              <Redirect from="/" to="/home" exact />
              <Route render={() => <div>404</div>} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <Footer>&copy; laoxie</Footer>
        </Footer>
      </Layout>
    );
  }
}

// App = withRouter(App);

export default App;
