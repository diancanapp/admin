import React, { FC, useEffect, useState } from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/lib/upload/interface';

import { Modal, Result, Button, Form, Input, Upload, Switch, InputNumber, message } from 'antd';
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

function normFile(e: any) {
  
//   if (e[0] && e[0].response.success) {
//     return e[0].response.data;
//   }
//   return '';
console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}

function getBase64(img: any, callback: (s: any) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: RcFile) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
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

  const handleChange = (info: UploadChangeParam) => {
    console.log(info);
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const url = info.file.response.success ? `https://static.wozaizhao.com/${info.file.response.data}` : ''
      setImageUrl(url)
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (url: string) => setImageUrl(url));
    }
  };

  const getValueProps = (e) => {
    console.log('getValueProps', e)
    if (e && Array.isArray(e)) {
      const url = e[0].response && e[0].response.data;
      console.log(url)
      return url
    }
    return '';
  }

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
      );
    }

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传图片</div>
      </div>
    );

    return (
      <Form initialValues={{ sortOrder: 50 }} {...formLayout} form={form} onFinish={handleFinish}>
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
        <Form.Item
          name="categoryImg"
          label="商品分类图片"
          getValueProps={getValueProps}
          valuePropName="fileList"
        >
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://admin.wozaizhao.com/api/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="商品分类图片" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          name="sortOrder"
          label="商品分类排序权重"
          rules={[{ type: 'number', required: false }]}
        >
          <InputNumber min={1} max={100} />
        </Form.Item>
        <Form.Item name="style" label="商品分类名样式" rules={[{ required: false }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="isShow"
          label="是否展示"
          valuePropName="checked"
          rules={[{ required: false }]}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="isHot"
          label="是否为热门"
          valuePropName="checked"
          rules={[{ required: false }]}
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
