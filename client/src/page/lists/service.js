import React from 'react';
import { Table, Popconfirm, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import styles from './index.css';
import ServiceModal from './modals/ServiceModal';

const FormItem = Form.Item;

class ServiceList extends React.Component {
  state = {
    visible: false,
    id: null,
  };

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
    /*
    {
      title: '链接',
      dataIndex: 'url',
      render(value) {
        return (
          <a href={value}>{value}</a>
        );
      },
    },
    {
      title: '宠物',
      dataIndex: 'pet_url',
      render(value) {
        return (
          <a href={value}>{value}</a>
        );
      },
    },
    */
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
    this.props.dispatch({
      type: 'service/queryList',
    });
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  addRow = (data) => {
    this.props.dispatch({
      type: 'service/addOne',
      payload: data,
    });
  };

  editRow = (id, data) => {
    this.props.dispatch({
      type: 'service/editOne',
      payload: { id, data },
    });
  };

  deleteRow = (id) => {
    console.log(`lists - deleteRow : payload id = ${id}`);
    this.props.dispatch({
      type: 'service/deleteOne',
      payload: id,
    });
  };

  render() {
    const { visible, id } = this.state;
    const { serviceList, serviceLoading, form: { getFieldDecorator } } = this.props;

    return (
      <div>
        <Table columns={this.columns} dataSource={serviceList} loading={serviceLoading} rowKey="id" />

        <ServiceModal record={{}} onOk={this.addRow}>
            <Button type="primary">新建</Button>
        </ServiceModal>
        
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