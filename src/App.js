import logo from './logo.svg';
import './App.css';
import Form from './components/Form'
import ProductPriceTable from './components/ProductPriceTable'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/">Product unit Price</Link>
          <label>     ****  **** </label>
          <Link to="/calculator">Calculator</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ProductPriceTable />} />
          <Route path="/calculator" element={<Form />} />
        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
