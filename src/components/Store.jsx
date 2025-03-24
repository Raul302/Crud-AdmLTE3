import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../constants/constants';
import { Link } from 'react-router-dom';


export default function Store() {

  const [page , set_page] = useState(0)
  useEffect(()=>{

    load_store( page );

  },[ page ])

  const [store,set_store] = useState([
   
    // {store_id: 1 , manager_staff_id : 1 , staff_fullname: 'staff fullname', address_id: 10 , address: 'Av xochimilco'},
    // {store_id: 1 , manager_staff_id : 1 , staff_fullname: 'staff fullname', address_id: 10 , address: 'Av xochimilco'},
    // {store_id: 1 , manager_staff_id : 1 , staff_fullname: 'staff fullname', address_id: 10 , address: 'Av xochimilco'}


])


const load_store = ( page = 0) => {

//<<<<<<< front_end
  axios.get(url+'/stores/'+page)
//=======
  //axios.get(url+'/stores')
//>>>>>>> main
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_store(response.data.store)
  
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
                    <td>{stor.fullname_staff}</td>
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
                { page != 0 &&
                <li className="page-item"><Link onClick={(e) => set_page(page-1) } className="page-link" >«</Link></li>
                }
                { store.length >= 10 &&
                <li className="page-item"><Link onClick={(e) => set_page(page+1) } className="page-link" >»</Link></li>
                }
              </ul>
            </div>
          </div>
          {/* /.card */}



        </div>
     
      </div>
    </section >
  )
}
