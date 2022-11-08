import { CodepenOutlined, FireOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

const SelectWidget = () => {
  return (
    <Popover
      overlayClassName="p-0"
      style={{ padding: 0 }}
      overlayInnerStyle={{ padding: 0, borderRadius: 8 }}
      overlayStyle={{ padding: 0 }}
      showArrow={false}
      arrowPointAtCenter={true}
      placement="bottomRight"
      trigger={['click']}
      content={
        <div className="w-200px h-200px">
          <p className="m-0 text-gray text-1">基础</p>
          <div className="flex flex-row flex-wrap">
            <div className="widgetBtn flex-1 text-2 flex items-center">
              <CodepenOutlined
                style={{ color: '#2558fb' }}
                className="m-r-3 text-4"
              />
              查询表单
            </div>
            <div className="widgetBtn flex-1 text-2  flex items-center">
              <CodepenOutlined
                style={{ color: '#2558fb' }}
                className="m-r-3 text-4"
              />
              弹窗表单
            </div>
          </div>
          <p className="m-0 text-gray text-1">样式</p>
          <div className="flex flex-row flex-wrap">
            <div className="widgetBtn flex-1 text-2 flex items-center">
              <FireOutlined
                style={{ color: '#2558fb' }}
                className="m-r-3 text-4"
              />
              分割线
            </div>
            <div className="widgetBtn flex-1 text-2  flex items-center">
              <FireOutlined
                style={{ color: '#2558fb' }}
                className="m-r-3 text-4"
              />
              栅格
            </div>
          </div>
        </div>
      }
    >
      <div className="btn w-8 font-8 font-semibold">+</div>
    </Popover>
  );
};

export default SelectWidget;
