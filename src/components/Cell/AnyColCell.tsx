import React, { useState } from 'react';
import { RxDotsHorizontal } from 'react-icons/rx';
import { BsClock, BsPlusCircleFill } from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';
import { Popover } from 'antd';
import '../css/table.css';
import { rowOptions } from '../../constants/data';
import { useStore } from '../../store';
interface IProps {
  cellValue?: string;
  whenRowData?: any;
  id?: any;
  data?: any;
  handleAddRow: () => void;
}

const AnyColCell: React.FC<IProps> = (props) => {
  const { duplicateRule, deleteRule, clearRule } = useStore((store) => store);
  const [hovering, setHovering] = useState(false);
  const [clicked, setClicked] = useState(false);
  const handleMouseEnter = () => {
    setHovering(true);
    setClicked(false);
  };

  const handleMouseLeave = () => {
    if (!clicked) {
      setHovering(false);
    }
  };
  if (props.cellValue && props.data.button !== 'Add Rule') {
    return (
      <>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex items-center w-full h-full justify-between h-[40px] gap-x-0 css-class"
        >
          <button className="hover:bg-[#f0f5ff] h-full px-1">
            <CgMenuGridO className="h-[19px] w-[19px]" color="#bfbfbf" />
          </button>
          <button className="hover:bg-[#f0f5ff] h-full px-2">
            <BsClock className="h-[16px] w-[16px]" color="#bfbfbf" />
          </button>
          {hovering ? (
            <Popover
              placement="bottomRight"
              overlayClassName="custom-popover"
              onOpenChange={(visible) => {
                if (!visible) {
                  setClicked(false);
                }
              }}
              content={
                <div className="w-[170px]">
                  {rowOptions.map((data) => {
                    if (data.key === 'delete' || data.key === 'clear') {
                      return (
                        <p
                          onClick={
                            data.key === 'delete'
                              ? () => {
                                  const id: number = parseInt(
                                    props.cellValue || '0'
                                  );
                                  deleteRule(id);
                                }
                              : () => {
                                  const id: number = parseInt(
                                    props.cellValue || '0'
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
                                  props.cellValue || '0'
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
              }
              trigger="click"
            >
              <button
                onClick={() => setClicked(true)}
                className="border-none outline-none h-[40px] px-[5px]"
              >
                <RxDotsHorizontal className="text-[#000000]" />
              </button>
            </Popover>
          ) : (
            <div className="px-[11px]">
              <span className="text-[15px] font-normal text-[#595959]">
                {props.cellValue}
              </span>
            </div>
          )}
        </div>
      </>
    );
  } else if (props.data.button === 'Add Rule' && props.id === 'any-col') {
    return (
      <div
        onClick={props.handleAddRow}
        className="flex items-center gap-x-2 pl-3 addRuleDiv w-fit hover:cursor-pointer"
      >
        <BsPlusCircleFill className="text-[#8C8C8C] plusIcon" />
        <span className="text-[#8C8C8C] text-[14px] font-normal hover:text-[#597EF7]">
          Add Rule
        </span>
      </div>
    );
  }
  return <></>;
};

export default AnyColCell;
