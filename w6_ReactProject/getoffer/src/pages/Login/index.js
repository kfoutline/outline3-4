import React, { Component } from "react";
import { Button, Form, Input, Icon,Checkbox } from "antd";
import Api from "@/api";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cartActionCreator from '@/store/action/common'
import qs from 'querystring';

const mapStateToProps = (state)=>({})
const mapDispatchToProps = (dispatch)=>bindActionCreators(cartActionCreator,dispatch)
@connect(mapStateToProps,mapDispatchToProps)
@Form.create({ name: "login" })
class Random extends Component {
  handleSubmit = e => {
      let {form,login,history,location} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let { username, password } = values;
        let result = await Api.get("/user/login", { username, password });

        if(result.status === 400){
            form.setFields({
                username:{
                    value:username,
                    errors:[{
                        "message": '用户名或密码不正确'
                    }]
                },
                password:{
                    value:password,
                    errors:[{
                        "message": '用户名或密码不正确'
                    }]
                }
            })
        }else if(result.status === 200){
            login(result.data);
            let params = qs.parse(location.search.slice(1));
            let path = params.targetUrl || '/mine'
            history.replace(path);
        }
      }
    });
  };
  render() {
    // let { data, loading } = this.state;
    let { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 18,
          offset: 6
        }
      }
    };
    return (
      <div>
        <h1>用户登录</h1>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="用户名">
            {getFieldDecorator("username", {
              validateTrigger: "onBlur",
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: "请输入用户名"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
              />
            )}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "请输入密码"
                }
              ]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
              />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <a style={{marginLeft:15}} href="#/forgotpwd">
              忘记密码?
            </a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
// Random = Form.create({ name: "login" })(Random);
// const mapStateToProps = (state)=>({})
// const mapDispatchToProps = (dispatch)=>bindActionCreators(cartActionCreator,dispatch)
// Random = connect(mapStateToProps,mapDispatchToProps)(Random);

export default Random;
