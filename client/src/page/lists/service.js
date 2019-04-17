import React from 'react';
import { Table, Popconfirm, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import styles from './index.css';
import ServiceModal from './modals/ServiceModal';

const FormItem = Form.Item;

// 不论Pet的所有Service混杂列表
// http://localhost:8000/service
// 可以修改和删除
// 不能新建

class ServiceList extends React.Component {

  columns = [
    {
      title: '服务类型',
      dataIndex: 'category',
    },
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '日期',
      dataIndex: 'date',
    },
    {
      title: '费用',
      dataIndex: 'fee',
    },
    {
      title: '宠物',
      dataIndex: 'links[2]',
      render(links_2) {
        //console.log('get links[]:');
        //console.log(links);
        var link = JSON.stringify(links_2.href).replace(/(\"|\/api)/g, '').replace(/(8080)/g, '8000');
        //console.log(`get link: ${links_2.href}`);
        return (
          <a href={link}>{link}</a>
        );
      },
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (_, record) => (
        <span className={styles.operation}>
          <ServiceModal record={record} onOk={this.editRow.bind(null, record.id)}>
            <a>修改</a>
          </ServiceModal>
          <Popconfirm title="确认删除？" onConfirm={this.deleteRow.bind(null, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  componentDidMount() {
    console.log('get page:');
    this.props.dispatch({
      type: 'service/queryList',
    });
  }

  reloadAll = () => {
    this.props.dispatch({
      type: 'service/queryList',
    });
  }

  editRow = (id, data) => {
    this.props.dispatch({
      type: 'service/editOne',
      payload: { id, data },
    }).then(() => {
      this.reloadAll();
    });
  };

  deleteRow = (id) => {
    console.log(`lists - deleteRow : payload id = ${id}`);
    this.props.dispatch({
      type: 'service/deleteOne',
      payload: id,
    }).then(() => {
      this.reloadAll();
    });
  };

  render() {
    const { serviceList, serviceLoading, form: { getFieldDecorator } } = this.props;

    return (
      <div>
        <Table columns={this.columns} dataSource={serviceList} loading={serviceLoading} rowKey="id" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    serviceList: state.service.serviceList,
    serviceLoading: state.loading.effects['service/queryList']
  };
}

export default connect(mapStateToProps)(Form.create()(ServiceList));