import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import Table from './components/Table';

function App() {
  const handleInputValues = (data: any) => {
    // console.log({data});
  };

  return (
    <Table
      initialValues={{
        rows: [
          // {
          //   columnKey: '1',
          //   columnName: 'Id',
          //   value: {
          //     firstValue: 'hello',
          //     secondValue: 'shss',
          //   },
          // },
        ],
        columns: [
          {
            name: 'Id',
            key: 'susbsb56sgsbsh',
          },
          {
            name: 'Phone Number',
            key: 'shgs6sysbs99nns',
          },
        ],
      }}
      callbackfunc={handleInputValues}
    />
  );
}

export default App;
