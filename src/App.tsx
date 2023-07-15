import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import Table from './components/Table';

function App() {
  const handleInputValues = (data: any)=> {
    console.log({data});
  }


  return <Table initialValues={{
    rows: [],
    columns: []
  }} callbackfunc={handleInputValues}  />;
}

export default App;
