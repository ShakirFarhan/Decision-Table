import { AiFillPlusCircle } from 'react-icons/ai';
type props = {
  name: string;
  onClick: () => void;
};
function ButtonHeader({ name, onClick }: props) {
  return (
    <div
      onClick={onClick}
      className={`w-full h-full pt-[10px] ${
        name === 'When' ? '-pl-3' : 'pl-0'
      }`}
    >
      <div className="flex items-center gap-x-[5.5px] mb-[10px]">
        <span className="text-[14px] font-semibold tracking-wide text-[#595959]">
          {name}
        </span>
        <AiFillPlusCircle className="fill-[grey] w-[22px] h-[22px] hover:cursor-pointer" />
      </div>
    </div>
  );
}

export default ButtonHeader;
