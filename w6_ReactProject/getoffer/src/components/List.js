import React from "react";
import {withRouter} from 'react-router-dom';
import { Button, Table } from "antd";

let defaultData = [
];
let sections = ['一','二','三','人事','其他']

function List({ data = defaultData,history,pagination=false }) {
  const columns = [
    {
      title: "#",
      dataIndex:"rowNumber",
      render(text, row, idx) {
        return idx + 1;
      }
    },
    {
      title: "面试题",
      dataIndex: "question",
    },
    {
      title: "阶段",
      dataIndex: "category",
      render(text,row,idx){
        return <Button size="small" shape="round">
        {isNaN(text) ? text : text+'阶段'}
        </Button>;
      }
    },
    {
      title: "热度",
      dataIndex: "hot",
    },
    {
      title: "操作",
      dataIndex: "actions",
      render(text,row,idx) {
        return (
          <Button.Group size="small">
            <Button type="primary" ghost onClick={()=>{
              history.push(`/iq/${row._id}`)
            }}>
              查看
            </Button>
            {/* <Button ghost type="danger" icon="heart">
            </Button> */}
          </Button.Group>
        );
      }
    }
  ];
  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={pagination}
      rowKey="_id"
      size="middle"
      className="iq-list"
    />
  );
}

export default withRouter(List);
