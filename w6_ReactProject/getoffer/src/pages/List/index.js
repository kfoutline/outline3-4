import React, { Component } from "react";
import { Button, Tag, Icon, List } from "antd";
import Api from "@/api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import cartActionCreator from "@/store/action/common";
import Datalist from "@@/Datalist";
import qs from "querystring";

class InfiniteList extends Component {
  state = {
    category:[],
    data: [],
    loading: false,
    hasMore: true
  };
  async componentDidMount() {
    let { search } = this.props.location;
    let params = qs.parse(search.slice(1));
    let {size=10} = params
    console.log("InfiniteList.search:", search, params);
    let url = "/iq";

    //如来自搜索页面，则使用搜索接口
    if (params.keyword) {
      url += "/search";
    }
    let { data } = await Api.get(url, {...params,size});
    console.log(data);

    //获取分类
    let {data:category} = await Api.get('/category');
    this.setState({
      category,
      data: data.result
    });
  }
  render() {
    let { data, loading, hasMore,category } = this.state;
    return (
      <div style={{ height: "100%", overflowY: "auto" }}>
        <List
          dataSource={data}
          renderItem={(item, idx) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                title={
                  <>
                    {idx + 1}. <a href={"#/iq/" + item._id}>{item.question}</a>
                  </>
                }
                description={item.tags&&item.tags.map(tag=><Tag>{tag}</Tag>)}
              />
              <Button size="small" type="dashed" disabled>{category.filter(cat=>cat.code==item.category)[0].name}</Button>
            </List.Item>
          )}
        >
          {loading && hasMore && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
        </List>
      </div>
    );
  }
}

export default InfiniteList;
