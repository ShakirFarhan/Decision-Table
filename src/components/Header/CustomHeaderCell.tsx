import { useState } from 'react';
import { BsPinAngleFill } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { columnHeaderProps } from '../../constants/interfaces';
import { MdKeyboardArrowDown } from 'react-icons/md';
import ColOptions from './ColOptions';
import TypesOptions from './TypesOptions';
import { hitRatioOptions } from '../../constants/data';
import { Popover } from 'antd';
import '../css/customCell.css';

const AnyCol = () => {
  return (
    <div className="w-[183px] h-[360px] flex flex-col gap-y-[-40px] bg-[#fff] shadow-xl z-50 scroll leading-[22px]">
      {hitRatioOptions.map((data) => {
        return (
          <p
            className="text-[14px] font-medium m-0 px-[7px] py-[5px] hover:bg-[#f5f5f5] cursor-pointer"
            onClick={() => {
              console.log('pressed');
            }}
            key={data.id}
          >
            {data.value}
          </p>
        );
      })}
    </div>
  );
};
const CustomHeaderCell: React.FC<columnHeaderProps> = ({
  label,
  children,
  type,
  id,
  userColumn,
  onColumnChange,
  handlePin,
  handleOptions,
}) => {
  const [pinned, setPinned] = useState(true);
  const [hover, setHover] = useState(false);
  const [anyColValue, setAnyColValue] = useState('');
  const handlePinning = () => {
    setPinned((data) => {
      return !data;
    });
    handlePin(id);
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  if (userColumn) {
    return (
      <>
        <div
          className="w-[100%] h-[100%] border-x-[1px] border-x-transparent box-border border-y-2 border-[#e7e7e7] hover:border-x-[1px] hover:border-y-[0.1px] hover:border-[#597EF7] flex items-center px-3 bg-[rgba(0, 0, 0, 0.06)] hover:bg-[#ffff]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Popover
            placement="bottomLeft"
            overlayClassName="custom-popover"
            content={
              <TypesOptions
                id={id}
                type={type}
                column={label}
                onColumnChange={onColumnChange}
              />
            }
            trigger="click"
          >
            <div className="flex flex-col items-start justify-start gap-y-2 cursor-pointer w-full">
              {!label || label === '' ? (
                <span className="font-normal text-[13px] text-[#595959]">
                  Input
                </span>
              ) : (
                <span className="font-normal text-[13px] text-[#595959] tracking-wide">
                  {label}
                </span>
              )}

              <span className="mr-2 text-[13px] font-normal tracking-wide text-[#597EF7]">
                {type}
              </span>

              {children}
            </div>
          </Popover>

          {hover && label && (
            <div className="absolute top-[6px] right-[5px] flex items-center gap-x-[7.5px] z-[99999]">
              <RxHamburgerMenu className="h-[17px] w-[14px]" />
              <BsPinAngleFill
                onClick={handlePinning}
                className={
                  pinned
                    ? 'h-[13.5px] w-[15px] fill-[grey]'
                    : 'h-[13.5px] w-[15px] fill-[#2f54eb]'
                }
              />
              {id !== 'id' ? (
                <ColOptions handleOptions={handleOptions} id={id} />
              ) : null}
            </div>
          )}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-[100%] h-[100%] border-x-[1px] border-x-transparent box-border border-y-2 border-[#e7e7e7] hover:border-x-[1px] hover:border-y-[0.1px] hover:border-[#597EF7] flex items-center pl-5 bg-[rgba(0, 0, 0, 0.06)] hover:bg-[#ffff]">
        <Popover
          placement="bottomLeft"
          overlayClassName="custom-popover"
          content={<AnyCol />}
          trigger="click"
        >
          <button className="any-btn border-none w-full h-full outline-none flex items-center">
            <span className="text-[13px] font-normal text-[#597EF7]">Any</span>
            <MdKeyboardArrowDown className="w-[18px]" />
          </button>
        </Popover>
      </div>
    </>
  );
};
export default CustomHeaderCell;
