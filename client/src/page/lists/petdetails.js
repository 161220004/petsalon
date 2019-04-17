import React from 'react';
import { Table, Popconfirm, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './index.css';
import ServiceModal from './modals/ServiceModal';

const FormItem = Form.Item;

function getPetId() {
  var this_url = window.location.pathname; // 获取当前页面url的host以外的部分
  //console.log(`getPageURL: ${this_url}`);
  var id_array = this_url.match(/\d+/g); // 查找url中的数字
  //console.log(`getPetId: ${id_array[0]}`);
  if (id_array)
    return id_array[0];
  else
    return "";
}
const getId = getPetId();

// Pet的id为getPetId的Service列表
// http://localhost:8000/pets/{petId}
// 可以修改和删除
// 可以新建

class PetDetails extends React.Component {

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
      type: 'pets/queryOne',
      payload: { id: getId },
    });
    this.props.dispatch({
      type: 'service/queryMine',
      payload: { petId: getId },
    });
  }

  reloadService = () => {
    this.props.dispatch({
      type: 'service/queryMine',
      payload: { petId: getId },
    });
  }

  addRow = (data) => {
    this.props.dispatch({
      type: 'service/addOne',
      payload: { petId: getId, data },
    }).then(() => {
      this.reloadService();
    });
  };

  editRow = (id, data) => {
    this.props.dispatch({
      type: 'service/editOne',
      payload: { id, data },
    }).then(() => {
      this.reloadService();
    });
  };

  deleteRow = (id) => {
    console.log(`lists - deleteRow : payload id = ${id}`);
    this.props.dispatch({
      type: 'service/deleteOne',
      payload: id,
    }).then(() => {
      this.reloadService();
    });
  };

  render() {
    const { pet, serviceList } = this.props;

    return (
      <div>
        <ul className={styles.list}>
          <h1 className={styles.bigbold}>{pet.name}</h1>
          <Link to="/pets">Go to Pets List</Link>
          <br /><br />
          <li>种类：{pet.type}</li>
          <li>编号：{pet.id}</li>
          <li>服务历史：</li>
        </ul>

        <Table columns={this.columns} dataSource={serviceList} rowKey="id" />

        <ServiceModal record={{}} onOk={this.addRow}>
            <Button type="primary">新建</Button>
        </ServiceModal>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pet: state.pets.pet,
    serviceList: state.service.serviceList,
  };
}

export default connect(mapStateToProps)(Form.create()(PetDetails));