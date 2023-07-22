import '../css/table.scss';
import { optionsData } from '../../constants/data';
import { CiMenuKebab } from 'react-icons/ci';
import { Popover } from 'antd';
import { useStore } from '../../store';
import { colOptionsProps } from '../../constants/interfaces';
function ColOptions({ id }: colOptionsProps) {
  const { deleteColumn, duplicateColumn, sortAToZ, sortZToA } = useStore(
    (store) => store
  );
  const handleOptions = (id: string, typeOfOperation: string) => {
    if (typeOfOperation === 'remove') {
      deleteColumn(id);
    } else if (typeOfOperation === 'duplicate') {
      duplicateColumn(id);
    } else if (typeOfOperation === 'copy') {
    } else if (typeOfOperation === 'a-z') {
      sortAToZ(id);
    } else if (typeOfOperation === 'z-a') {
      sortZToA(id);
    }
  };
  return (
    <>
      <Popover
        placement="bottomLeft"
        overlayClassName="custom-popover"
        content={
          <>
            <div className="w-[170px] h-[140px] flex flex-col gap-y-[-40px] bg-[var(--secondary-bg)] text-[var(--primary-color)] shadow-xl z-[99999] scroll">
              {optionsData.map((data) => {
                return (
                  <p
                    className="text-[12px] m-0 px-[7px] py-[5px] hover:bg-[var(--hover-bg)] cursor-pointer"
                    onClick={() => {
                      handleOptions(id, data.key);
                    }}
                    key={data.key}
                  >
                    {data.function}
                  </p>
                );
              })}
            </div>
          </>
        }
        trigger="click"
      >
        <button>
          <CiMenuKebab className="w-[15px] h-[13.5px]" />
        </button>
      </Popover>
    </>
  );
}

export default ColOptions;
