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
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import routes from '../src/routes/routes'
import Login from './auth/Login';
import RecoveryPassword from './auth/RecoveryPassword';
import './styles/auth/auth_styles.css';

import { CookiesProvider } from 'react-cookie';
import { TokenContext } from './context/TokenContext';
import { useEffect, useState } from 'react';


function App() {



  const [bearer_token, set_bearer_token] = useState("");
  const [user_data, set_user_data] = useState("");
  const [routes_permited, set_routes_permited] = useState([]);

  console.log(' USER DATA ', user_data)
  console.log(' bearer_token ', bearer_token)

  const restrict_pages = () => {

    if( window.location.pathname == '/recoverypassword' || window.location.pathname == '/login') {

      return false
    } else {

      return true

    }

  }


  return (
    <TokenContext.Provider value={{ routes_permited, set_routes_permited, user_data , set_user_data, bearer_token, set_bearer_token }}>

    <BrowserRouter>
   
  
    <Header />

      <div className="App">
        <Routes>

        {routes_permited.map(route => {
        return(
        <Route path={route.url} element={<route.component/>} 
        />)
        })} 
          <Route path={'/login'} element={<Login />} />

          <Route path={'/recoverypassword'} element={<RecoveryPassword />} />

          
        </Routes>
        {/* Pending to change  */}
     
        {/* <Home /> */}
        
     <>
     <Footer />
     <SideBar />
     </>
     
      </div>
    </BrowserRouter>
     </TokenContext.Provider>
  );
}

export default App;




// Last version withouth login and recovery password

{/* <BrowserRouter>
<div className="App">
 <Header />
  <Routes>
    {routes.map(route => {
    return(<Route path={route.url} element={<route.component/>} />)
    })}
 {/* <Home /> */}
//   </Routes>
//  <Footer />
//  <SideBar />
// </div>
// </BrowserRouter> */}