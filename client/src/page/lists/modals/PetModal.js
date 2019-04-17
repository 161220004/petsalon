import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const FormItem = Form.Item;

class PetModal extends Component {

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

  onChange = (value) => {
    console.log(`get ${value} from Select`);
  }

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    //const { name, type, url, owner_url } = this.props.record;
    const { name, type } = this.props.record;
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
          title="Pet"
          visible={this.state.visible}
          onOk={this.ok}
          onCancel={this.hideModal}
        >
          <Form horizontal="true" onSubmit={this.ok}>
            <FormItem {...formItemLayout} label="昵称">
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{ required: true }],
                })(<Input />)
              }
            </FormItem>
            <Form.Item {...formItemLayout} label="种类"> 
              {
                getFieldDecorator('type', {
                  initialValue: type,
                  rules: [{ required: true, type: 'string', message: '请选择宠物种类' }],
                })(
                <Select placeholder="种类" onChange={this.onChange}>
                  <Option value="Dog">狗</Option>
                  <Option value="Cat">猫</Option>
                  <Option value="Hamster">仓鼠</Option>
                  <Option value="Bird">鸟</Option>
                </Select>)
              }
            </Form.Item>
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
            <FormItem {...formItemLayout} label="主人" >
              {
                getFieldDecorator('owner_url', {
                  initialValue: owner_url,
                  rules: [{ type: 'url' }],
                })(<Input />)
              }
            </FormItem>
            
 */
export default Form.create()(PetModal);
