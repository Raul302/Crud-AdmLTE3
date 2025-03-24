import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../constants/constants';


export default function Store() {

  useEffect(()=>{

    load_store();

  },[])

  const [store,set_store] = useState([
    {store_id: 1 , manager_staff_id : 1 , staff_fullname: 'staff fullname', address_id: 10 , address: 'Av xochimilco'},
    {store_id: 1 , manager_staff_id : 1 , staff_fullname: 'staff fullname', address_id: 10 , address: 'Av xochimilco'},
    {store_id: 1 , manager_staff_id : 1 , staff_fullname: 'staff fullname', address_id: 10 , address: 'Av xochimilco'}
])


const load_store = () => {

<<<<<<< HEAD
  axios.get(url+'/stores')
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_store(response.data.stores)
=======
  axios.get(url+'/store')
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_store(response.data.store)
>>>>>>> 9ef3dd89c05bb0a00d16bb9fd20fee00c6e5fbf0
  
  }).catch(function( error) {
   console.log('Something was wrong')

   
  });

}




   
  return (
    <section style={{ marginLeft: '20%',marginTop:'3%' }} class="content">
      <div class="row">
      

        <div class="col-md-10">
          {/* /.card */}
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Store</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>Store ID</th>
                    <th>Manager Staff ID</th>
                    <th>Staff fullname</th>
                    <th>Address ID</th>
                    <th>Address</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                 
                {store.map(stor =>{
                 return( <tr>
                    <td>{stor.store_id}</td>
                    <td>{stor.manager_staff_id}</td>
                    <td>{stor.staff_fullname}</td>
                    <td>{stor.address_id}</td>
                    <td>{stor.address}</td>

                  </tr>
                 )
                })}

                 


                </tbody>
              </table>
            </div>
            {/* /.card-body */}
            <div className="card-footer clearfix">
              <ul className="pagination pagination-sm m-0 float-right">
                <li className="page-item"><a className="page-link" href="#">«</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">»</a></li>
              </ul>
            </div>
          </div>
          {/* /.card */}



        </div>
     
      </div>
    </section >
  )
}
