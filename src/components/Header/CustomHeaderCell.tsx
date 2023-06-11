import { useState } from 'react';
import { BsPinAngleFill } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { columnHeaderProps } from '../../constants/interfaces';
import { MdKeyboardArrowDown } from 'react-icons/md';
import ColOptions from './ColOptions';
import TypesOptions from './TypesOptions';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { hitRatioOptions } from '../../constants/data';

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
  const [anyColValue,setAnyColValue]=useState("")
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
      // <div className="h-full w-full">
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState: any) => (
          <div
            className="w-[100%] h-[100%] border-x-[1px] border-x-transparent box-border border-y-2 border-[#e7e7e7] hover:border-x-[1px] hover:border-y-[0.1px] hover:border-[#597EF7] flex items-center px-3 bg-[rgba(0, 0, 0, 0.06)] hover:bg-[#ffff]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button {...bindTrigger(popupState)} className="w-full h-full">
              <div className="flex flex-col items-start justify-start gap-y-2 cursor-pointer">
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
            </button>

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

            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                marginTop: '5px',
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
      // </div>
    );
  }
  return (
    // <div className="h-full w-full">
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState: any) => (
        <div className="w-[100%] h-[100%] border-x-[1px] border-x-transparent box-border border-y-2 border-[#e7e7e7] hover:border-x-[1px] hover:border-y-[0.1px] hover:border-[#597EF7] flex items-center pl-5 bg-[rgba(0, 0, 0, 0.06)] hover:bg-[#ffff]">
          <button
            {...bindTrigger(popupState)}
            className="any-btn border-none w-full h-full outline-none flex items-center"
          >
            <span className="text-[13px] font-normal text-[#597EF7]">Any</span>
            <MdKeyboardArrowDown className="w-[18px]" />
          </button>

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
              // height: '360px',
            }}
          >
            <div className="w-[183px] h-[360px] flex flex-col gap-y-[-40px] bg-[#fff] shadow-xl z-50 scroll leading-[22px]">
              {hitRatioOptions.map((data) => {
                return (
                  <p
                    className={`text-[14px] font-medium m-0 px-[7px] py-[5px] hover:bg-[#f5f5f5] cursor-pointer ${anyColValue===data.value?"bg-[#fafafa]":""}`}
                    onClick={() => {
                      setAnyColValue(data.value)
                    }}
                    key={data.id}
                  >
                    {data.value}
                  </p>
                );
              })}
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
    // </div>
  );
};
export default CustomHeaderCell;
