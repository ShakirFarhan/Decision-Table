import { AiFillPlusCircle } from 'react-icons/ai';
import { useStore } from '../../store';
type props = {
  name: string;
  onClick?: () => void;
};
function ButtonHeader({ name, onClick }: props) {
  const { addWhenColumnDefs, addThenColumnDefs } = useStore((store) => store);
  if (name !== 'Annotations') {
    return (
      <div
        className={`h-full pt-[10px]  ${
          name === 'When' ? '-pl-3' : 'pl-0'
        } border-r-[2px] border-[var(--primary-border)] w-full`}
      >
        <div className="flex items-center gap-x-[5.5px] mb-[10px] w-fit">
          <span className="text-[14px] font-semibold tracking-wide text-[var(--primary-color)]">
            {name}
          </span>
          <AiFillPlusCircle
            // onClick={onClick}
            onClick={() => {
              if (name?.toLowerCase() === 'then') {
                addThenColumnDefs();
              } else {
                addWhenColumnDefs();
              }
            }}
            className="fill-[grey] w-[22px] h-[22px] hover:cursor-pointer"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-x-[5.5px] mb-[10px]">
      <span className="text-[14px] font-semibold tracking-wide text-[var(--primary-color)]">
        {name}
      </span>
    </div>
  );
}

export default ButtonHeader;
