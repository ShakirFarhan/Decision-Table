import { optionsData } from '../../constants/data';
interface colInterface {
  id: string;
  handleOptions: (id: string, selectedOption: string) => void;
  setOptionsVisible: any;
}
function ColOptions({ handleOptions, id, setOptionsVisible }: colInterface) {
  return (
    <div className="h-fit fixed top-[50%] left-[50%] flex flex-col gap-y-[-40px] bg-[#fff] shadow-xl -translate-y-1/2 -translate-x-1/2">
      {optionsData.map((data) => {
        return (
          <p
            className="text-[12px] m-0 px-[7px] py-[5px] hover:bg-[antiquewhite]"
            onClick={() => {
              handleOptions(id, data.key);
              setOptionsVisible(false);
            }}
            key={data.key}
          >
            {data.function}
          </p>
        );
      })}
    </div>
  );
}

export default ColOptions;
