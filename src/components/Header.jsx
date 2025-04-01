import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TokenContext } from '../context/TokenContext';
import url_api from '../constants/constants';
import axios from 'axios';

export default function Header() {




  const navigate = useNavigate();

  
  const { routes_permited, set_routes_permited,user_data , set_user_data, bearer_token, set_bearer_token } = useContext(TokenContext);

  
  useEffect(()=>{
    console.log('HOLA');

   const hasPermission = routes_permited.find((route)=> route.url == currentPage.pathname)
   if(hasPermission){
    if(hasPermission.permission == 0 ) {
      navigate("/login")

    }
    
   } else {
    navigate("/login")
   }

  },[])



  const currentPage = useLocation()
  console.log('CURRENTPAGE',currentPage.pathname);

  const logout = async () => {



    await axios.get(url_api + '/logout', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${bearer_token}`,
        baseURL: "http://localhost:8000",
        withCredentials: true,
      }


    })
      .then(function (response) {
        console.log('Response',response);

        window.location.href = '/login';
        
        // set_most_actor_apparitions(response.data.most_apparitions)
        // set_less_actor_aparitions(response.data.less_apparitions)
        
      }).catch(function (error) {
        // toast.error('Something was wrong!',{autoClose:1000})
        
        // toast.error('Something was wrong')
        
        
      });
  }
  const show_or_not = () => {
    if( currentPage.pathname != '/login' &&  currentPage.pathname != '/recoverypassword' ) {
      return true;
    }
  }
  return (
    
    <div>
      {
      
      show_or_not()
      
      &&


      
<nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <a href="index3.html" className="nav-link">Home</a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <a href="#" className="nav-link">Contact</a>
    </li>
  </ul>
  {/* Right navbar links */}
  <ul className="navbar-nav ml-auto">
    {/* Navbar Search */}
    <li className="nav-item">
      <a onClick={(e) => logout()} style={{fontSize:'24px'}}className="nav-link" role="button">
        Logout
      </a>

      
 
      <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
      </a>
    </li>
  </ul>
</nav>

      
      }


    </div>
  )
}
