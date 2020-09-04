import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography } from 'antd';
import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import OperationModal from './components/OperationModal';
import { StateType } from './model';
import { CategoryDataType } from './data.d';
import styles from './style.less';

const { Paragraph } = Typography;

interface CardListProps {
  categoryList: StateType;
  dispatch: Dispatch;
  loading: boolean;
}
interface CardListState {
  visible: boolean;
  done: boolean;
  current?: Partial<CategoryDataType>;
}

class CardList extends Component<CardListProps, CardListState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'categoryList/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {
      categoryList: { list },
      loading,
    } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            产品文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const nullData: Partial<CategoryDataType> = {};
    return (
      <div>
        <PageHeaderWrapper content={content} extraContent={extraContent}>
          <div className={styles.cardList}>
            <List<Partial<CategoryDataType>>
              rowKey="ID"
              loading={loading}
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
                xxl: 4,
              }}
              dataSource={[nullData, ...list]}
              renderItem={(item) => {
                if (item && item.ID) {
                  return (
                    <List.Item key={item.ID}>
                      <Card
                        hoverable
                        className={styles.card}
                        actions={[<a key="option1">修改</a>, <a key="option2">删除</a>]}
                      >
                        <Card.Meta
                          avatar={<img alt="" className={styles.cardAvatar} src={item.categoryImg} />}
                          title={<a>{item.name}</a>}
                          description={
                            <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                              {item.categoryDesc}
                            </Paragraph>
                          }
                        />
                      </Card>
                    </List.Item>
                  );
                }
                return (
                  <List.Item>
                    <Button type="dashed" className={styles.newButton}>
                      <PlusOutlined /> 新增商品分类
                    </Button>
                  </List.Item>
                );
              }}
            />
          </div>
        </PageHeaderWrapper>
        {/* <OperationModal
          done={done}
          current={current}
          visible={visible}
          onDone={handleDone}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        /> */}
      </div>
    );
  }
}

export default connect(
  ({
    categoryList,
    loading,
  }: {
    categoryList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    categoryList,
    loading: loading.models.categoryList,
  }),
)(CardList);
