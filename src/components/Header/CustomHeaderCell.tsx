import { useEffect, useState } from 'react';
import { BsPinAngleFill } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { columnHeaderProps } from '../../constants/interfaces';
import { MdKeyboardArrowDown } from 'react-icons/md';
import ColOptions from './ColOptions';
import TypesOptions from './TypesOptions';
import { hitRatioOptions } from '../../constants/data';
import { Popover } from 'antd';
import '../css/customCell.scss';
import '../css/common.scss';

import { useStore } from '../../store';
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
  dataType,
  id,
  column,
}) => {
  const { handlePin, addWhenColumnDefs } = useStore((store) => store);
  const [pinned, setPinned] = useState(true);
  const [modelOpen, setModelOpen] = useState(false);

  const handlePinning = () => {
    setPinned((data) => {
      return !data;
    });
    handlePin(id);
  };

  const handleClick = () => {
    if (label !== '' || label) {
      setModelOpen((prev) => !prev);
    }
    return;
  };
  useEffect(() => {
    const handleopen = () => {
      if (column === 'when' && (label === '' || !label)) {
        setModelOpen(true);
      } else {
        setModelOpen(false);
      }
    };
    handleopen();
  }, [addWhenColumnDefs]);

  if (column === 'when' || column === 'then' || column === 'annotations') {
    if (label !== 'annotations') {
      return (
        <>
          <div className="w-[100%] h-[100%] border-x-[1px] border-x-transparent box-border border-y-2 border-[var(--primary-border)] hover:border-x-[1px] hover:border-y-[0.1px] hover:border-[var(--secondary-color)] flex items-center px-3 bg-[rgba(0, 0, 0, 0.06)] hover:bg-[var(--secondary-bg)] custom-header">
            <Popover
              placement="bottomLeft"
              overlayClassName="custom-popover"
              content={<TypesOptions id={id} type={dataType} column={label} />}
              trigger="click"
              open={modelOpen}
            >
              <div
                onClick={handleClick}
                className="flex flex-col items-start justify-start gap-y-2 cursor-pointer w-full"
              >
                {!label || label === '' ? (
                  <span className="font-normal text-[13px] text-[var(--primary-color)]">
                    {column === 'when' ? 'Input' : 'Output'}
                  </span>
                ) : (
                  <span className="font-normal text-[13px] text-[var(--primary-color)] tracking-wide">
                    {label}
                  </span>
                )}

                <span className="mr-2 text-[13px] font-normal tracking-wide text-[var(--secondary-color)]">
                  {dataType}
                </span>

                {children}
              </div>
            </Popover>
          </div>
          <div
            className={`absolute top-[6px] right-[5px] flex items-center gap-x-[7.5px] ${
              !pinned ? '' : 'options'
            }`}
          >
            <RxHamburgerMenu className="h-[17px] w-[14px]" />
            <BsPinAngleFill
              onClick={handlePinning}
              className={
                pinned
                  ? 'h-[13.5px] w-[15px] fill-[grey]'
                  : 'h-[13.5px] w-[15px] fill-[var(--secondary-color)]'
              }
            />
            {id !== 'id' ? <ColOptions id={id} /> : null}
          </div>
        </>
      );
    }
    return (
      <>
        <div className="w-[100%] h-[100%] border-x-[1px] border-x-transparent box-border border-y-2 border-[var(--primary-border)]"></div>
      </>
    );
  }
  return (
    <>
      <div className="w-[100%] h-[100%]  box-border border-y-2 border-[var(--primary-border)] flex items-center pl-5 bg-[rgba(0, 0, 0, 0.06)] hover:bg-[var(--secondary-bg)]">
        <Popover
          placement="bottomLeft"
          overlayClassName="custom-popover"
          content={<AnyCol />}
          trigger="click"
        >
          <button className="any-btn border-none w-full h-full outline-none flex items-center">
            <span className="text-[13px] font-normal text-[--var(--secondary-color)]">
              Any
            </span>
            <MdKeyboardArrowDown className="w-[18px]" />
          </button>
        </Popover>
      </div>
    </>
  );
};
export default CustomHeaderCell;
