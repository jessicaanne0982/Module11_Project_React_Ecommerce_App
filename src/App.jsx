import { Routes, Route } from 'react-router-dom';
import NavigationBar from "./components/NavigationBar";
import HomePage from './components/HomePage';
import CustomerForm from './components/CustomerForm';
import CustomerDetails from './components/CustomerDetails';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/styles.css';


function App() {
    return (
    <div className="">
      <NavigationBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/add-customer' element={<CustomerForm />} />
          <Route path='/edit-customer/:id' element={<CustomerForm />} />
          <Route path='/customers' element={<CustomerDetails />} />
          <Route path='/add-product' element={<ProductForm />} />
          <Route path='/edit-product/:id' element={<ProductForm />} />   
          <Route path='/products' element={<ProductList />} /> 
          <Route path='/add-order' element={<OrderForm />} />
          <Route path='/orders' element={<OrderList />} />
        </Routes>
    </div>
  );
};

export default App;
