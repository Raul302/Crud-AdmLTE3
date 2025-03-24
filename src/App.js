import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import SideBar from './components/SideBar';
import Actor from './components/Actor';
import Film from './components/Film';
import Category from './components/Category';
import City from './components/City';
import Address from './components/Address';
import Customer from './components/Customer';
import Film_Actor from './components/Film_Actor';
import Film_Category from './components/Film_Category';
import Film_Text from './components/Film_Text';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes  from '../src/routes/routes'


function App() {
  return (
      <BrowserRouter>
    <div className="App">
     <Header />
      <Routes>
        {routes.map(route => {
        return(<Route path={route.url} element={<route.component/>} />)
        })}
     {/* <Home /> */}
      </Routes>
     <Footer />
     <SideBar />
    </div>
    </BrowserRouter>
  );
}

export default App;
