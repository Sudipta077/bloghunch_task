
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import ProductReg from './components/ProductReg';
import ProductList from './components/ProductList';
import Card from './components/Card';
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<ProductReg />} />
          <Route path="/home" element={<ProductList />} />
          <Route path="/details" element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
