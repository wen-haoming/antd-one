import { DownloadOutlined } from '@ant-design/icons';

const Header = () => {
  return (
    <>
      <div className="h-10 flex items-center px-4 justify-between border-b-1	 border-brand-grey">
        <span className="flex text-sm text-brand-primary font-semibold ">
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31 4H16L10 27H18L14 44L40 16H28L31 4Z"
              fill="#2F88FF"
              stroke="#2558fb"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="miter"
            />
            <path
              d="M21 11L19 19"
              stroke="#2558fb"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          One-codes
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
