import React, { FC, useEffect } from 'react';
import { Modal, Result, Button, Form, Input, Upload, Switch, InputNumber } from 'antd';
import { CategoryDataType } from '../data.d';
import styles from '../style.less';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<CategoryDataType> | undefined;
  onDone: () => void;
  onSubmit: (values: CategoryDataType) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// }


const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as CategoryDataType);
    }
  };

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: '保存', cancelText: '取消', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    if (done) {
      const isEdit = !!current;
      return isEdit ? (
        <Result
          status="success"
          title="操作成功"
          subTitle="编辑商品分类信息成功。"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      ) : (
        <Result
          status="success"
          title="操作成功"
          subTitle="快去商品分类下添加商品吧。"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      )
    }
    return (
      <Form initialValues={{ sortOrder: 50 }} {...formLayout} form={form} onFinish={handleFinish} >
        <Form.Item
          name="name"
          label="商品分类名称"
          rules={[{ required: true, message: '请输入商品分类名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="categoryDesc"
          label="商品分类描述"
          rules={[{ required: true, message: '请输入商品分类描述' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        {/* <Form.Item
          name="categoryImg"
          label="商品分类图片"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item> */}
        <Form.Item
          name="sortOrder"
          label="商品分类排序权重"
          rules={[{ type: "number", required: false}]}
        >
          <InputNumber min={1} max={100} />
        </Form.Item>
        <Form.Item
          name="style"
          label="商品分类名样式"
          rules={[{ required: false}]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="isShow"
          label="是否展示"
          valuePropName="checked"
          rules={[{ required: false}]}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="isHot"
          label="是否为热门"
          valuePropName="checked"
          rules={[{ required: false}]}
        >
          <Switch />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `${current ? '编辑' : '添加'}商品分类`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
