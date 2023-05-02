import CurrencyRow from "./CurrencyRow";
import './App.css';

function App() {
  return (
    <div>
      <h1>Convert</h1>
      <CurrencyRow />
      <div className="equals">=</div>
      <CurrencyRow/>
    </div>
  );
}

export default App;
