import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class OwnerModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModal = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  ok = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModal();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    //const { name, url, pets_url } = this.props.record;
    const { name } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModal}>
          { children }
        </span>
        <Modal
          title="Owner"
          visible={this.state.visible}
          onOk={this.ok}
          onCancel={this.hideModal}
        >
          <Form horizontal="true" onSubmit={this.ok}>
            <FormItem {...formItemLayout} label="姓名" >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{ required: true }],
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}
/*

            <FormItem {...formItemLayout} label="链接" >
              {
                getFieldDecorator('url', {
                  initialValue: url,
                  rules: [{ type: 'url' }],
                })(<Input />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label="宠物" >
              {
                getFieldDecorator('pets_url', {
                  initialValue: pets_url,
                  rules: [{ type: 'url' }],
                })(<Input />)
              }
            </FormItem>
            
 */
export default Form.create()(OwnerModal);
