import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import Table from './components/Table';
import DashBoardLayout from './components/layout/indext';


function App() {
  return <DashBoardLayout>
    <Table/>
  </DashBoardLayout>;
}

export default App;
