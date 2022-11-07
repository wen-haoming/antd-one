import { DownloadOutlined, ThunderboltOutlined } from '@ant-design/icons';

const Header = () => {
  return (
    <>
      <div className="h-10 flex items-center px-4 justify-between border-b-1	 border-brand-grey">
        <span className="text-sm text-brand-primary font-semibold">
          <img
            width={20}
            className="m-2"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          />
          Antd-one-codegen
          <ThunderboltOutlined className="text-4" />
        </span>
        <div className="flex items-center">
          <div className="btn m-r1" onClick={() => {}}>
            <DownloadOutlined className="m-r-1" />
            出码
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/wen-haoming/antd-one-editor"
            className="i-mdi-github text-black text-size-2xl cursor-pointer hover:text-brand-primary"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
