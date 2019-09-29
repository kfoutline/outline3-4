import React, { Component } from "react";
import { Button, Form, Input } from "antd";
import {withUser} from '@/utils';
import Api from '@/api';
import {logout} from '@/store/action/common'

@withUser
@Form.create({ name: "changePassword" })
class Password extends Component{
  handleSubmit = e => {
    let {history,form,user,dispatch} = this.props
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let {password} = values;
        let data = await Api.patch(`/user/${user._id}`,{password});
        if(data.status === 200){
          // 修改密码成功后，退出登录状态并跳转登录页面
          dispatch(logout())
          history.replace('/login');
        }
      }
    });
  };
  render() {console.log('Password.props:',this.props)
    let {user,form} = this.props;
    let { getFieldDecorator,getFieldValue } = form;

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
          <h1>修改密码</h1>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="用户名">
              <Input disabled value={user.username} />
            </Form.Item>
            <Form.Item label="新密码" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "请输入密码"
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                确认修改
              </Button>
            </Form.Item>
          </Form>
      </div>
    );
  }
}

export default Password;