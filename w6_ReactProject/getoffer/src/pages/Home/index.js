import React, { Component } from "react";
import { Carousel, Row, Col } from "antd";
import List from "@@/List";
import Api from "@/api";

import './home.scss';

class Home extends Component {
  state = {
    hotlist: [],
    recommend: [],
    difficulty:[]
  };
  onChange() {
    console.log(arguments);
  }
  goto = (id)=>{
    this.props.history.push(`/iq/${id}`);
  }
  async componentDidMount() {
    // 获取热门面试题
    let { data:hotlist } = await Api.get("/iq", {
      sort: "hot"
    });

    let { data:difficulty } = await Api.get("/iq", {
      sort: "difficulty"
    });

    this.setState({
      hotlist,
      difficulty,
      recommend:[...hotlist.slice(3,6),...difficulty.slice(3,5)]
    });
  }
  render() {
    let { hotlist, recommend,difficulty } = this.state;
    return (
      <div className="home">
        <Carousel afterChange={this.onChange} autoplay>
          {recommend.map(item => {
            return (
              <div key={item._id} onClick={this.goto.bind(null,item._id)}>
                <h3>{item.question}</h3>
              </div>
            );
          })}
        </Carousel>
        <h3>热门面试题</h3>
        <List data={hotlist} />
        <h3>重点难点面试题</h3>
        <List data={difficulty} />
      </div>
    );
  }
}

export default Home;
