import { useState } from 'react';
import { BsPinAngleFill } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { CiMenuKebab } from 'react-icons/ci';
import { columnHeaderProps } from '../../constants/interfaces';
import { MdKeyboardArrowDown } from 'react-icons/md';
import ColOptions from './ColOptions';
import TypesOptions from './TypesOptions';
// import { useStore } from '../../store';
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
  const [modalActive, setModalActive] = useState(false);
  const [pinned, setPinned] = useState(true);
  const [optionsVisible, setOptionsVisible] = useState(false);
  // const { setPinnedColumn } = useStore((store) => store);
  const handleModal = () => {
    setModalActive((data) => {
      return !data;
    });
  };
  const handlePinning = () => {
    setPinned((data) => {
      return !data;
    });
    handlePin(id, pinned, setPinned);
    // setPinnedColumn(id);// zustand logic
  };
  if (userColumn) {
    return (
      <>
        <div
          onClick={handleModal}
          className="flex flex-col items-start justify-start cursor-pointer"
        >
          {!label || label === '' ? (
            <span className="font-semibold text-[15px] text-[#9a9b9e]">
              Input
            </span>
          ) : (
            <span className="font-semibold text-[15px]">{label}</span>
          )}

          <span className="mr-2 text-[12px] text-[#829df7]">{type}</span>

          {children}
        </div>
        {modalActive && (
          <div className="fixed top-[80px] w-[250px] h-[200px] z-50 shadow-2xl flex flex-col">
            <TypesOptions
              id={id}
              type={type}
              column={label}
              onColumnChange={onColumnChange}
            />
          </div>
        )}

        <div className="absolute top-[6px] right-[5px] flex items-center gap-x-[7.5px]">
          <RxHamburgerMenu className="h-[17px] w-[14px]" />
          <BsPinAngleFill
            onClick={handlePinning}
            className={
              pinned
                ? 'h-[13.5px] w-[15px] fill-[grey]'
                : 'h-[13.5px] w-[15px] fill-[#2f54eb]'
            }
          />
          <CiMenuKebab
            onClick={() => {
              setOptionsVisible(!optionsVisible);
            }}
            className="w-[15px] h-[13.5px]"
          />
          {optionsVisible && (
            <ColOptions
              setOptionsVisible={setOptionsVisible}
              handleOptions={handleOptions}
              id={id}
            />
          )}
        </div>
      </>
    );
  }
  return (
    <button className="any-btn border-none outline-none bg-transparent flex items-center absolute top-[35%] left-[30%]">
      <span className="text-[15px]">Any</span>
      <MdKeyboardArrowDown className="w-[18px]" />
    </button>
  );
};
export default CustomHeaderCell;
