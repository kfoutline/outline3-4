import React,{Component} from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Layout, Button, Menu, Breadcrumb, Row, Col } from "antd";
const { Header, Footer, Sider, Content } = Layout;

import Home from "~/Home";
import Random from "~/Random";
import Section from "~/Section";
import Add from "~/Add";
import Details from "~/Details";

import MyBreadcrumb from "@@/Breadcrumb";

class App extends Component {
  state = {
    current:['/home'],
    breadcrumb:['首页'],
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
      }
    ]
  };

  goto = ({key}) => {
    let {history} = this.props;
    let currentMenu = this.state.menu.filter(item=>item.path===key)[0];
    let breadcrumb = currentMenu.name==='Home' ? [currentMenu.text] : ['首页',currentMenu.text];
    this.setState({
      current:[key],
      breadcrumb
    })
    history.push(key);
  }

  componentDidMount(){
    let {pathname} = this.props.location
    this.setState({
      current:[pathname]
    })
  }

  render() {
    const { current,menu,breadcrumb } = this.state;
    
    return (
      <Layout>
        <Header>
          <Row>
            <Col span={4}>
              <div
                className="logo"
                style={{ color: "#fff", overflow: "hidden", maxHeight: 64 }}
              >
                面试宝典，助你拿下offer
              </div>
            </Col>
            <Col span={20}>
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={current}
                style={{ lineHeight: "64px" }}
                onClick={this.goto}
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
              <Route path="/iq/:id" component={Details} />
              <Redirect from="/" to="/home" />
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

App = withRouter(App);

export default App;
