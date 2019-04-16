import React, { Component } from 'react';
import { connect } from 'dva';
// import Link from 'umi/link';
import { Card, Icon, message } from 'antd';

class OwnersPage extends Component {
  componentDidMount() {
    this.queryList();
  }

  queryList = () => {
    this.props.dispatch({
      type: 'owners/queryList',
    });
  };

  deleteOne = (id) => {
    this.props.dispatch({
      type: 'owners/deleteOne',
      payload: id,
    }).then(() => {
      message.success('delete success, refresh');
      this.queryList();
    });
  };

  render() {
    const { ownersList = [] } = this.props;
    console.log('ownersList');
    console.log(ownersList);

    return (
      <div>
        {ownersList.map(v => <Card
          key={v.id}
          title={v.name}
          style={{ width: 300, marginBottom: '16px' }}
          extra={<Icon type={'delete'} onClick={() => this.deleteOne(v.id)} />}
        >{v.desc}</Card>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state');
  console.log(state);
  return {
    ownersList: state.owners.ownersList,
  };
}

export default connect(mapStateToProps)(OwnersPage);
