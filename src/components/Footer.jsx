import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Footer() {


  const currentPage = useLocation();


  const show_or_not = () => {
    if( currentPage.pathname != '/login' &&  currentPage.pathname != '/recoverypassword' ) {
      return true;
    }
  }


  return (
    <>

      {

        show_or_not()

        &&
        <>
          <footer className="main-footer">
            <strong>No Copyright © 2014-2025 <a href="https://lrpm.shop">LRPM</a>.</strong>
            All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
              <b>Version</b> 3.1.0
            </div>
          </footer>
          <aside className="control-sidebar control-sidebar-dark">
          </aside>
        </>

      }
    </>
  )

}
