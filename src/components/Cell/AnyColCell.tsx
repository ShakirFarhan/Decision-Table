import React, { useState } from 'react';
import { RxDotsHorizontal } from 'react-icons/rx';
import { BsClock } from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import '../css/table.css';
import { rowOptions } from '../../constants/data';
import { useStore } from '../../store';
interface IProps {
  cellValue?: string;
  whenRowData?: any;
  id?: any;
}

const AnyColCell: React.FC<IProps> = ({ cellValue }) => {
  const { duplicateRule, deleteRule, clearRule } = useStore((store) => store);
  const [hovering, setHovering] = useState(false);
  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };
  // const handleClickSettings = () => {};
  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex items-center justify-between h-[40px] gap-x-0 css-class"
      >
        <button className="hover:bg-[#f0f5ff] h-[40px] px-1">
          <CgMenuGridO className="h-[19px] w-[19px]" color="#bfbfbf" />
        </button>
        <button className="hover:bg-[#f0f5ff] h-[40px] px-2">
          <BsClock className="h-[16px] w-[16px]" color="#bfbfbf" />
        </button>
        <div className="h-full">
          {hovering ? (
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState: any) => (
                <div>
                  <button
                    className="border-none outline-none cursor-pointer hover:bg-[#f0f5ff] h-[40px] px-[5px]"
                    {...bindTrigger(popupState)}
                  >
                    <RxDotsHorizontal className="text-[#000000]" />
                  </button>

                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    sx={{
                      marginTop: '10px',
                    }}
                  >
                    <div className="w-[170px]">
                      {rowOptions.map((data) => {
                        if (data.key === 'delete' || data.key === 'clear') {
                          return (
                            <p
                              onClick={
                                data.key === 'delete'
                                  ? () => {
                                      const id: number = parseInt(
                                        cellValue || '0'
                                      );
                                      deleteRule(id);
                                    }
                                  : () => {
                                      const id: number = parseInt(
                                        cellValue || '0'
                                      );
                                      console.log(id);
                                      clearRule(id);
                                    }
                              }
                              className="py-[6px] px-3 text-[#ff8586] font-semibold hover:bg-[#ff4d4f] hover:text-[#fff] hover:cursor-pointer"
                            >
                              {data.header}
                            </p>
                          );
                        }
                        return (
                          <p
                            onClick={
                              data.key === 'duplicate'
                                ? () => {
                                    const id: number = parseInt(
                                      cellValue || '0'
                                    );
                                    duplicateRule(id);
                                  }
                                : () => {}
                            }
                            className="py-[6px] px-3 text-[#343434] hover:bg-[#f5f5f5] font-semibold hover:cursor-pointer"
                          >
                            {data.header}
                          </p>
                        );
                      })}
                    </div>
                  </Popover>
                </div>
              )}
            </PopupState>
          ) : (
            // Row Number
            <div className="px-[11px]">
              <span className="text-[15px] font-normal text-[#595959]">
                {cellValue}
              </span>
            </div>
          )}
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default AnyColCell;
