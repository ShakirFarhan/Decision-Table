import { useState } from 'react';
import { BsPinAngleFill } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { columnHeaderProps } from '../../constants/interfaces';
import { MdKeyboardArrowDown } from 'react-icons/md';
import ColOptions from './ColOptions';
import TypesOptions from './TypesOptions';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

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
  const handlePinning = () => {
    setPinned((data) => {
      return !data;
    });
    handlePin(id);
  };
  if (userColumn) {
    return (
      <>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState: any) => (
            <div>
              <button {...bindTrigger(popupState)}>
                <div className="flex flex-col items-start justify-start cursor-pointer">
                  {!label || label === '' ? (
                    <span className="font-semibold text-[15px] text-[#9a9b9e]">
                      Input
                    </span>
                  ) : (
                    <span className="font-semibold text-[15px]">{label}</span>
                  )}

                  <span className="mr-2 text-[12px] text-[#829df7]">
                    {type}
                  </span>

                  {children}
                </div>
              </button>
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
                <ColOptions handleOptions={handleOptions} id={id} />
              </div>

              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                sx={{
                  marginTop: '20px',
                }}
              >
                <TypesOptions
                  id={id}
                  type={type}
                  column={label}
                  onColumnChange={onColumnChange}
                />
              </Popover>
            </div>
          )}
        </PopupState>
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
