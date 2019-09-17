import React, { Component } from "react";
import { Button, Tabs,List } from "antd";
const { TabPane } = Tabs;

import Api from "@/api";
import IQList from "@@/List";

class Section extends Component {
  state = {
    sections:[],
  }
  changeTab = (code) => {
    
    let currentTabData = this.state.sections.filter(item=>item.code==code)[0];
    console.log('code',code,currentTabData)
    if(currentTabData && currentTabData.data) return;

    this.getTabData(code);
  }
  getTabData = async code=>{
    let sections = [...this.state.sections];
    let {data} = await Api.get('/iq',{
      category:code
    });

    // 把数据写入相应tab
    sections.map(item=>{
      if(item.code == code){
        item.data = data;
      }
    })

    this.setState({
      sections
    })
  }
  async componentDidMount(){
    let {data} = await Api.get('/category');

    this.setState({
      sections:data
    });

    //获取第一个tab的数据
    this.getTabData(data[0].code);
  }
  render() {
    let {sections,data} = this.state;
    return (
      <div>
        <h1>阶段面试题</h1>
        <p>点击不同的阶段，随机出现相应阶段的面试题</p>
        <Tabs defaultActiveKey="1" onChange={this.changeTab}>
          {
            sections.map(item=>{
              return <TabPane tab={item.name} key={item.code}>
                <IQList data={item.data} pagination={{pageSize:5}} />
              </TabPane>
            })
          }
          
        </Tabs>
        <Button type="primary" icon="redo" ghost block>换一批</Button>
      </div>
    );
  }
}

export default Section;
