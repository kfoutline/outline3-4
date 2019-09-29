import React, { Component } from "react";
import {connect} from 'react-redux';
import { Button, Input, List, Menu, Dropdown, Icon,message } from "antd";

import Api from '@/api'
import {withAuth} from '@/utils';

@withAuth
class Add extends Component {
  state = {
    interviewQuestions: "",
    result: [],
    category: []
  };
  onChange = e => {
    let interviewQuestions = e.currentTarget.value;
    this.setState({
      interviewQuestions
      //   result: this.formatData(interviewQuestions)
    });
  };
  changeCategory = (idx, { key ,item}) => {
    let result = this.state.result.map((iq, i) => {
      if (i === idx) {
        iq.category = key;
      }
      return iq;
    });
    this.setState({
      result
    });
  };
  formatData(data) {
    // string -> array
    if (!data) return [];
    data = data.trim().replace(/^[\*\d\s]+[、\\，\,\.]?|[？\?。\.；\;]$/gm, "");
    return data.split("\n").map(item => ({
      question: item,
      category: "",
      hot:1
    }));
  }
  addIQ = async ()=>{
    let {user} = this.props;
    let result = await Api.post('/iq',{userid:user._id,iq:this.state.result});
    
    
    message.success('添加面试题成功，感谢你的付出')

    this.setState({
      interviewQuestions:''
    });
    this.refs.iq.focus();
  }
  getCategoryName = (code)=>{
    if(!code) return "设置分类"
    let current = this.state.category.filter(item=>item.code == code)[0]
    return current.name;
  }
  async componentDidMount(){
    //获取分类
    let {data:category} = await Api.get('/category');
    this.setState({
      category
    })
  }
  componentWillUnmount(){
    // Api.cancel();
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log("componentWillUpdate:", nextState);
    // 输入框与列表数据映射处理
    if (nextState.interviewQuestions != this.state.interviewQuestions) {
      // 如何实现保留result原有数据（如category）
      let newData = this.formatData(nextState.interviewQuestions);
      this.setState({
        result: newData
      });
    }

    if (nextState.result.length != this.state.result.length) {
      this.setState({
        interviewQuestions: nextState.result.map(item => item.question).join("\n")
      });
    }
  }
  componentDidUpdate(nextProps, nextState) {
    // console.log("componentDidUpdate:", nextState);
  }
  render() {
    let { interviewQuestions, result, category } = this.state;

    return (
      <div>
        <Input.TextArea
          placeholder="输入面试题，每行一道"
          value={interviewQuestions}
          onChange={this.onChange}
          autosize={{ minRows: 5 }}
          ref="iq"
        ></Input.TextArea>
        {/* 自动识别数据（分阶段） */}
        <List
          style={{ marginTop: 15 }}
          itemLayout="vertical"
          size="small"
          dataSource={result}
          renderItem={(item, idx) => (
            <List.Item
              key={item.question}
              actions={[]}
              extra={[
                <Dropdown
                  overlay={
                    <Menu onClick={this.changeCategory.bind(this, idx)}>
                      {category.map(item => (
                        <Menu.Item key={item.code}>{item.name}</Menu.Item>
                      ))}
                    </Menu>
                  }
                  key="menu"
                >
                  <Button size="small">
                    {this.getCategoryName(item.category)}
                    <Icon type="down" />
                  </Button>
                </Dropdown>,
                <Button
                  key="btn"
                  type="link"
                  icon="close"
                  size="small"
                  shape="circle"
                  style={{ marginLeft: 20 }}
                  onClick={() => {
                    result = result.filter((item, i) => i != idx);
                    console.log("result:", result);
                    //   interviewQuestions = result.join('\n');
                    this.setState({
                      result
                      //   interviewQuestions
                    });
                  }}
                ></Button>
              ]}
            >
              {idx + 1} - {item.question}
            </List.Item>
          )}
        />
        <Button size="large" type="primary" style={{ marginTop: 15 }}
        onClick={this.addIQ}
        >
          添加
        </Button>
      </div>
    );
  }
}

export default Add;
