import React from 'react';
import { Table, Popconfirm, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './index.css';
import PetModal from './modals/PetModal';

const FormItem = Form.Item;

function getOwnerId() {
  var this_url = window.location.pathname; // 获取当前页面url的host以外的部分
  //console.log(`getPageURL: ${this_url}`);
  var id_array = this_url.match(/\d+/g); // 查找url中的数字
  //console.log(`getOwnerId: ${id_array[0]}`);
  if (id_array)
    return id_array[0];
  else
    return "";
}
const getId = getOwnerId();

// Owner的id为getOwnerId的Pets列表
// http://localhost:8000/owners/{ownerId}
// 可以修改和删除
// 可以新建

class OwnerDetails extends React.Component {

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
      dataIndex: 'links',
      render(links_0) {
        //console.log('get links_0[]:');
        //console.log(links_0);
        var apiLink = links_0[0].href;
        var link = JSON.stringify(apiLink).replace(/(\"|\/api)/g, '').replace(/(8080)/g, '8000');
        //console.log(`get link: ${apiLink}`);
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
      type: 'owners/queryOne',
      payload: { id: getId },
    });
    this.props.dispatch({
      type: 'pets/queryMine',
      payload: { ownerId: getId },
    });
  }

  reloadPets = () => {
    this.props.dispatch({
      type: 'pets/queryMine',
      payload: { ownerId: getId },
    });
  }

  addRow = (data) => {
    this.props.dispatch({
      type: 'pets/addOne',
      payload: { ownerId: getId, data },
    }).then(() => {
      this.reloadPets();
    });
  };

  editRow = (id, data) => {
    this.props.dispatch({
      type: 'pets/editOne',
      payload: { id, data },
    }).then(() => {
      this.reloadPets();
    });
  };

  deleteRow = (id) => {
    this.props.dispatch({
      type: 'pets/deleteOne',
      payload: id,
    }).then(() => {
      this.reloadPets();
    });
  };

  render() {
    const { owner, petsList } = this.props;

    return (
      <div>
        <ul className={styles.list}>
          <h1 className={styles.bigbold}>{owner.name}</h1>
          <Link to="/owners">Go to Owners List</Link>
          <br /><br />
          <li>编号：{owner.id}</li>
          <li>他/她的宠物：</li>
        </ul>

        <Table columns={this.columns} dataSource={petsList} rowKey="id" />

        <PetModal record={{}} onOk={this.addRow}>
            <Button type="primary">新建</Button>
        </PetModal>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    owner: state.owners.owner,
    petsList: state.pets.petsList
  };
}

export default connect(mapStateToProps)(Form.create()(OwnerDetails));