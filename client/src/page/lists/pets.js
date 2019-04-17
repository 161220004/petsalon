import React from 'react';
import { Table, Popconfirm, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import styles from './index.css';
import PetModal from './modals/PetModal';

const FormItem = Form.Item;

class PetList extends React.Component {
  state = {
    visible: false,
    id: null,
  };

  columns = [
    {
      title: '昵称',
      dataIndex: 'name',
    },
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '种类',
      dataIndex: 'type',
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
      title: '主人',
      dataIndex: 'owner_url',
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
          <PetModal record={record} onOk={this.editRow.bind(null, record.id)}>
            <a>修改</a>
          </PetModal>
          <Popconfirm title="确认删除？" onConfirm={this.deleteRow.bind(null, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  componentDidMount() {
    this.props.dispatch({
      type: 'pets/queryList',
    });
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  addRow = (data) => {
    this.props.dispatch({
      type: 'pets/addOne',
      payload: data,
    });
  };

  editRow = (id, data) => {
    this.props.dispatch({
      type: 'pets/editOne',
      payload: { id, data },
    });
  };

  deleteRow = (id) => {
    console.log(`lists - deleteRow : payload id = ${id}`);
    this.props.dispatch({
      type: 'pets/deleteOne',
      payload: id,
    });
  };

  render() {
    const { visible, id } = this.state;
    const { petsList, petsLoading, form: { getFieldDecorator } } = this.props;

    return (
      <div>
        <Table columns={this.columns} dataSource={petsList} loading={petsLoading} rowKey="id" />

        <PetModal record={{}} onOk={this.addRow}>
            <Button type="primary">新建</Button>
        </PetModal>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    petsList: state.pets.petsList,
    petsLoading: state.loading.effects['pets/queryList']
  };
}

export default connect(mapStateToProps)(Form.create()(PetList));