import React, { Component } from "react";
import { Comment, Avatar, Tooltip, Button, Form, Input, Icon,Rate } from "antd";

import apiserver from "@/api";

// 自定义评论框
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        添加答案
      </Button>
    </Form.Item>
  </div>
);

class Details extends Component {
  state = {
    data: {},
    likes: 0,
    dislikes: 0,
    action: null,
  };

  async componentDidMount() {
    let { id } = this.props.match.params;

    let url = `/iq/${id}`;
    let { data } = await apiserver.get(url);
    data = data[0];
    this.setState({
      data
    });

    // 增加热度
    console.log("ajax:", data.hot);
    apiserver.patch(url, {
      hot: data.hot + 1
    });
  }

  render() {
    let { data, likes, dislikes, action} = this.state;

    const actions = [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={action === "liked" ? "filled" : "outlined"}
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: "auto" }}>{likes}</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={action === "disliked" ? "filled" : "outlined"}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: "auto" }}>{dislikes}</span>
      </span>
    ];
    return (
      <div>
        <h1>{data.question}</h1>
        <p>热度：{data.hot}</p>
        <div>难度：<Rate value={data.difficulty} disabled /></div>

        <Comment
          actions={actions}
          author={<a>laoxie</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <p>
              We supply a series of design principles, practical patterns and
              high quality design resources (Sketch and Axure), to help people
              create their product prototypes beautifully and efficiently.
            </p>
          }
          datetime={
            // <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            //   <span>{moment().fromNow()}</span>
            // </Tooltip>
            <span>2019-9-16</span>
          }
        />
        <Editor />
      </div>
    );
  }
}

export default Details;
