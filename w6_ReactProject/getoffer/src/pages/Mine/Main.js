import React, { Component } from "react";
import { Button, Row, Col, Icon, List,Divider } from "antd";
import Api from "@/api";
import { withAuth } from "@/utils";

@withAuth
class Mine extends Component {
  state = {
    menu: [
      {
        name: "info",
        icon: "profile",
        text: "个人资料"
      },
      {
        name: "password",
        icon: "schedule",
        text: "修改密码"
      },
      // {
      //   name:'myIQ',
      //   icon:'sliders',
      //   text:'我的面试题'
      // },{
      //   name:'commented',
      //   icon:'message',
      //   text:'我的回答'
      // },
      {
        name: "focus",
        icon: "heart",
        text: "关注面试题"
      }
    ],
    myIQ:{
      data:[]
    },
    myAnswer:{
      data:[]
    },
    // typeList: [
    //   {
    //     name: "myIQ",
    //     title: "我的面试题",
    //     icon: "sliders",
    //     data: []
    //   },
    //   {
    //     name: "myAnswer",
    //     title: "我的回答",
    //     icon: "message",
    //     data: []
    //   }
    // ]
  };
  gotoIQ = (id)=>{
    
    this.goto(`/iq/${id}`)
  }
  goto = (path)=>{
    let {history} = this.props;
    history.push(path);
  }
  async componentDidMount() {console.log('didMount')
    let {user} = this.props;
    // 获取我添加的面试题
    // let myIQ = await Api.get('/iq',{
    //   username:user.username
    // })
  // }
  // async componentWillUpdate(nextProps){
  //   let {user} = this.props;
    let {typeList} = this.state;console.log('userid',user._id)
    // if(user.username != nextProps.user.username){
      let {data:myIQ} = await Api.get('/iq',{
        userid:user._id,
        sort:'addtime'
      });

      let {data:myAnswer} = await Api.get('/answer',{
        userid:user._id
      });

      // typeList[0].data = myIQ.result;
      // typeList[1].data = myAnswer.result;

      this.setState({
        myIQ,
        myAnswer:{
          result:myAnswer
        }
      })
    // }
  }
  render() {
    let { menu, myIQ, myAnswer } = this.state;
    let {match} = this.props;
    return (
      <div>
        
        <Row gutter={16}>
          {menu.map(item => {
            return (
              <Col key={item.name} span={6}>
                <div style={{ textAlign: "center", height: 100 }} onClick={this.goto.bind(this,`${match.url}/${item.name}`)}>
                  <Icon
                    type={item.icon}
                    theme="twoTone"
                    style={{ fontSize: "36px", margin: 5, color: "#08c" }}
                  />
                  <h4>{item.text}</h4>
                </div>
              </Col>
            );
          })}
        </Row>
        <Divider/>
          <div style={{marginTop:15}}>
            <h4>我的面试题</h4>
            <List
              dataSource={myIQ.result}
              renderItem={(item,idx) => (
                <List.Item key={item._id} actions={[<Icon type="right" />]} onClick={this.gotoIQ.bind(this,item._id)}>
                  <List.Item.Meta
                    title={<>{idx+1}. {item.question}</>}
                  />
                </List.Item>
              )}
            />
          </div>
          <div style={{marginTop:15}}>
            <h4>我的回答</h4>
            <List
              dataSource={myAnswer.result}
              renderItem={(item,idx) => (
                <List.Item key={item._id} actions={[<Icon type="right" />]} onClick={this.gotoIQ.bind(this,item.iqid)}>
                  <List.Item.Meta
                    title={<>{idx+1}. {item.content}</>}
                  />
                </List.Item>
              )}
            />
          </div>
      </div>
    );
  }
}

export default Mine;
