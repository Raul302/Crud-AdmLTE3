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
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
      <BrowserRouter>
    <div className="App">
     <Header />
     <Footer />
      <Routes>
      <Route path="/actor" element={<Actor/>} />
      <Route path="/film" element={<Film/>} />
      <Route path="/category" element={<Category/>} />
      <Route path="/city" element={<City/>} />
      <Route exact path="/" element={<Dashboard/>} />

     {/* <Home /> */}
      </Routes>
     <SideBar />
    </div>
    </BrowserRouter>
  );
}

export default App;
