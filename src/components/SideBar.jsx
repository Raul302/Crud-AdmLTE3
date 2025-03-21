import React from 'react'
import routes  from '../routes/routes'
import { Link , useLocation  } from 'react-router-dom'

export default function SideBar() {

  const currentPage = useLocation();  


  return (
    <div>
{/* Main Sidebar Container */}
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">AdminLTE 3</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
        <a href="#" className="d-block">Alexander Pierce</a>
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
        { routes.map(route => {
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

    </div>
  )
}
