import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="App">
     <Header />
     <Footer />
     <Home />
     <SideBar />
    </div>
  );
}

export default App;
