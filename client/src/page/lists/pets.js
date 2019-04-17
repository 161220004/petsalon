import React from 'react';
import { Table, Popconfirm, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import styles from './index.css';
import PetModal from './modals/PetModal';

const FormItem = Form.Item;

// 不论Owner的所有Pets混杂列表
// http://localhost:8000/pets
// 可以修改和删除
// 不能新建

class PetList extends React.Component {

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
    {
      title: '详细信息',
      dataIndex: 'links[0]',
      render(links_0) {
        //console.log('get links_0[]:');
        //console.log(links_0);
        var link = JSON.stringify(links_0.href).replace(/(\"|\/api)/g, '').replace(/(8080)/g, '8000');
        //console.log(`get link: ${links_0.href}`);
        return (
          <a href={link}>{link}</a>
        );
      },
    },
    {
      title: '主人',
      dataIndex: 'links[2]',
      render(links_2) {
        //console.log('get links_2[]:');
        //console.log(links_2);
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
    console.log('get page:');
    this.props.dispatch({
      type: 'pets/queryList',
    });
  }

  reloadAll = () => {
    this.props.dispatch({
      type: 'pets/queryList',
    });
  }

  editRow = (id, data) => {
    this.props.dispatch({
      type: 'pets/editOne',
      payload: { id, data },
    }).then(() => {
      this.reloadAll();
    });
  };

  deleteRow = (id) => {
    this.props.dispatch({
      type: 'pets/deleteOne',
      payload: id,
    }).then(() => {
      this.reloadAll();
    });
  };

  render() {
    const { petsList, petsLoading, form: { getFieldDecorator } } = this.props;

    return (
      <div>
        <Table columns={this.columns} dataSource={petsList} loading={petsLoading} rowKey="id" />
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