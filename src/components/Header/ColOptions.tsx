import { useState } from 'react';
import '../css/table.css';
import { optionsData } from '../../constants/data';
import { CiMenuKebab } from 'react-icons/ci';
import { Popover } from 'antd';
interface colInterface {
  id: string;
  handleOptions: (id: string, selectedOption: string) => void;
}

function ColOptions({ handleOptions, id }: colInterface) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Popover
        placement="bottomLeft"
        overlayClassName="custom-popover"
        content={
          <>
            {open && (
              <div className="w-[170px] h-[140px] flex flex-col gap-y-[-40px] bg-[#fff] shadow-xl z-[99999] scroll">
                {optionsData.map((data) => {
                  return (
                    <p
                      className="text-[12px] m-0 px-[7px] py-[5px] hover:bg-[antiquewhite] cursor-pointer"
                      onClick={() => {
                        handleOptions(id, data.key);
                        setOpen(false);
                      }}
                      key={data.key}
                    >
                      {data.function}
                    </p>
                  );
                })}
              </div>
            )}
          </>
        }
        trigger="click"
      >
        <button>
          <CiMenuKebab onClick={handleClick} className="w-[15px] h-[13.5px]" />
        </button>
      </Popover>
    </>
  );
}

export default ColOptions;
