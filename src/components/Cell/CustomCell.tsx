import React, { useState } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
interface IProps {
  onEdit: (params: any) => void;
  cellValue?: string;
  whenRowData?: any;
  id?: any;
}

const CustomCell: React.FC<IProps> = ({ onEdit, cellValue }) => {
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };
  return (
    <div style={{ position: 'relative' }}>
      <div
        className="flex items-center justify-between h-[40px] select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* <div className="cell-type">Between</div> */}
        <span>{cellValue}</span>
        {hovering && (
          <button
            className="bg-transparent border-none outline-none cursor-pointer"
            onClick={onEdit}
          >
            <MdOutlineModeEditOutline className=" w-[18px] h-[18px] " />
          </button>
        )}
      </div>
      <div className="absolute top-[200px] bg-[#000000] w-[200px] h-[900px] "></div>
    </div>
  );
};

export default CustomCell;
