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
    {
      title: '主人',
      dataIndex: 'links',
      render(links) {
        console.log('get links[]:');
        console.log(links);
        var apiLink = links[2].href;
        var link = JSON.stringify(apiLink).replace(/(\"|\/api)/g, '').replace(/(8080)/g, '8000');
        console.log(`get link: ${apiLink}`);
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
    const { visible, id } = this.state;
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