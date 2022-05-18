import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import code from './code.png';
import code3 from './code3.png';

const DemoPic = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={showModal}>过去的写法</Button>
      <Modal
        title="对比图"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1500}
      >
        <div style={{ width: '100%' }}>
          <img src={code} width="600" />
        </div>
      </Modal>
    </>
  );
};

export default DemoPic;
