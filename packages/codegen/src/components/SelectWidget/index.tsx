import { Popover } from 'antd';

const SelectWidget = () => {
  return (
    <Popover
      overlayClassName="p-0"
      style={{ padding: 0 }}
      overlayStyle={{ padding: 0 }}
      showArrow={false}
      arrowPointAtCenter={true}
      placement="bottomRight"
      content={
        <div className="w-200px h-200px">
          <p className="m-0 px-1 text-gray">基础</p>
          <div className="flex flex-row flex-wrap">
            <div className="compBtn flex-1">组件A</div>
            <div className="compBtn flex-1">组件B</div>
          </div>
        </div>
      }
      trigger="click"
    >
      <div className="btn w-8 font-8">+</div>
    </Popover>
  );
};

export default SelectWidget;
