import React, { Component } from "react";
import { Button, Input, List, Menu, Dropdown, Icon } from "antd";

import apiserver from '@/api'

class Add extends Component {
  state = {
    interviewQuestions: "",
    result: [],
    category: ["一阶段", "二阶段", "三阶段", "人事"]
  };
  onChange = e => {
    let interviewQuestions = e.currentTarget.value;
    this.setState({
      interviewQuestions
      //   result: this.formatData(interviewQuestions)
    });
  };
  changeCategory = (idx, { key }) => {
    let result = this.state.result.map((item, i) => {
      if (i === idx) {
        item.category = key;
      }
      return item;
    });
    this.setState({
      result
    });
  };
  formatData(data) {
    // string -> array
    if (!data) return [];
    data = data.trim().replace(/^[\*\d\s]+[、，\,\.]?|[？\?。\.；\;]$/gm, "");
    return data.split("\n").map(item => ({
      question: item,
      category: "",
      hot:1
    }));
  }
  addIQ = async ()=>{
    let data = await apiserver.post('/iq',{userid:'laoxie',iq:this.state.result});
    console.log('data:',data);

    this.setState({
      interviewQuestions:''
    });
    this.refs.iq.focus();
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log("componentWillUpdate:", nextState);
    if (nextState.interviewQuestions != this.state.interviewQuestions) {
      this.setState({
        result: this.formatData(nextState.interviewQuestions)
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
                        <Menu.Item key={item}>{item}</Menu.Item>
                      ))}
                    </Menu>
                  }
                  key="menu"
                >
                  <Button size="small">
                    {item.category ? item.category : "设置分类"}{" "}
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
