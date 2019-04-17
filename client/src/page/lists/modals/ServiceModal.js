import React, { Component } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Option } = Select;

const FormItem = Form.Item;

function initDate(date) {
  if (date)
    return moment(date, "YYYY-MM-DD'T'HH:mm:ss.SSS'Z'");
  else
    return date;
}

class ServiceModal extends Component {

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
    //const { category, date, fee, url, pet_url } = this.props.record;
    const { category, date, fee } = this.props.record;
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
          title="Service"
          visible={this.state.visible}
          onOk={this.ok}
          onCancel={this.hideModal}
        >
          <Form horizontal="true" onSubmit={this.ok}>
            <Form.Item {...formItemLayout} label="服务" > 
              {
                getFieldDecorator('category', {
                  initialValue: category,
                  rules: [{ required: true, type: 'string', message: '请选择服务类型' }],
                })(
                <Select placeholder="服务类型" onChange={this.onChange}>
                  <Option value="Bathing">清洗</Option>
                  <Option value="Cutting">剪毛</Option>
                  <Option value="Dyeing">染色</Option>
                  <Option value="DressingUp">装扮</Option>
                  <Option value="Shopping">购物</Option>
                </Select>)
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="日期">
              {
                getFieldDecorator('date', {
                  initialValue: initDate(date),
                  rules: [{ required: true, type: 'object', message: '请选择时间' }],
                })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)
              }
            </Form.Item>
            <FormItem {...formItemLayout} label="费用">
              {
                getFieldDecorator('fee', {
                  initialValue: fee,
                  rules: [{ required: true, pattern: /^(0|[1-9][0-9]*)(\.[0-9]+)?$/, message: 'Unsigned Double' }],
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
                getFieldDecorator('pet_url', {
                  initialValue: pet_url,
                  rules: [{ type: 'url' }],
                })(<Input />)
              }
            </FormItem>
            
 */
export default Form.create()(ServiceModal);
