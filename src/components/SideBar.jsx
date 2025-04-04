import React, { useContext, useEffect, useState } from 'react'
import routes  from '../routes/routes'
import { Link , useLocation  } from 'react-router-dom'
import { TokenContext } from '../context/TokenContext';
import axios from 'axios';
import url_api from '../constants/constants';

export default function SideBar() {

  

  useEffect(()=>{

    // load_modules_permited()

  },[])

  const currentPage = useLocation();  

  const { routes_permited, set_routes_permited,user_data , bearer_token } = useContext(TokenContext);

  // const [ routes_permited , set_routes_permited ] = useState( [ ])


  const show_or_not = () => {
    if( currentPage.pathname != '/login' &&  currentPage.pathname != '/recoverypassword' ) {
      return true;
    }
  }

const load_modules_permited = async () => {


  let routes_permited = [];
  console.log('BEARER TOKEN' , bearer_token);

    // toast.info('Loading data!',{autoClose:1000})
    await axios.get(url_api + '/permissions', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${bearer_token}`,
        baseURL: "http://localhost:8000",
        withCredentials: true,
      }


    })
      .then(function (response) {

        response.data.permissions.map((element) => {
         routes.map( (route) => {
            if(route.url == element.route){
                 if(element.permission != 0){
                  routes_permited.push(route)
                 }
            }
          })
        })
        
        // set_most_actor_apparitions(response.data.most_apparitions)
        // set_less_actor_aparitions(response.data.less_apparitions)
        
      }).catch(function (error) {
        // toast.error('Something was wrong!',{autoClose:1000})
        
        // toast.error('Something was wrong')
        
        
      });
      set_routes_permited(routes_permited);
  

}

  return (
    <div>

{
      
      show_or_not()
      
      &&


<aside className="col-lg-12  main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">AdminLTE 3</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="info">
        <a href="#" className="d-block">{user_data}</a>
      </div>
    </div>
    {/* SidebarSearch Form */}
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">

      
      <ul style={{display:'flex',textAlign:'left'}} className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        { routes_permited.map(route => {
          return (
            <li  key={ route.name } className="nav-item">
          <Link to={route.url} 
          className={currentPage.pathname == route.url ? 'nav-link active' : 'nav-link'}
          // className="nav-link active"
          >
            <i className={route.icon}  style={{marginRight:'5px'}}/>
            <p>
              {route.name}
            </p>
          </Link>
        </li>

          )
        })}

        
       
         
        
             
           
       
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>
 }
    </div>
  )
}
