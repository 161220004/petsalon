import React from 'react';
import { Table, Popconfirm, Button, Form, Input } from 'antd';
import { connect } from 'dva';
import styles from './index.css';
import OwnerModal from './modals/OwnerModal';

const FormItem = Form.Item;

class OwnerList extends React.Component {
  state = {
    visible: false,
    id: null,
  };

  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '链接',
      dataIndex: 'links',
      render(links) {
        //console.log('get links[]:');
        //console.log(links);
        var apiLink = links[0].href;
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
          <OwnerModal record={record} onOk={this.editRow.bind(null, record.id)}>
            <a>修改</a>
          </OwnerModal>
          <Popconfirm title="确认删除？" onConfirm={this.deleteRow.bind(null, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  componentDidMount() {
    this.props.dispatch({
      type: 'owners/queryList',
    });
  }

  reloadAll = () => {
    this.props.dispatch({
      type: 'owners/queryList',
    });
  }

  addRow = (data) => {
    this.props.dispatch({
      type: 'owners/addOne',
      payload: data,
    }).then(() => {
      this.reloadAll();
    });
  };

  editRow = (id, data) => {
    this.props.dispatch({
      type: 'owners/editOne',
      payload: { id, data },
    }).then(() => {
      this.reloadAll();
    });
  };

  deleteRow = (id) => {
    this.props.dispatch({
      type: 'owners/deleteOne',
      payload: id,
    }).then(() => {
      this.reloadAll();
    });
  };

  render() {
    const { visible, id } = this.state;
    const { ownersList, ownersLoading, form: { getFieldDecorator } } = this.props;

    return (
      <div>
        <Table columns={this.columns} dataSource={ownersList} loading={ownersLoading} rowKey="id" />

        <OwnerModal record={{}} onOk={this.addRow}>
            <Button type="primary">新建</Button>
        </OwnerModal>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ownersList: state.owners.ownersList,
    ownersLoading: state.loading.effects['owners/queryList']
  };
}

export default connect(mapStateToProps)(Form.create()(OwnerList));