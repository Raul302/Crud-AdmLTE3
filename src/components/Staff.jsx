import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../constants/constants';
import { Link } from 'react-router-dom';


export default function Staff() {

  const [ page , set_page ] = useState(0);

  useEffect(()=>{

    load_staff(page);

  },[page])

  const [staff,set_staff] = useState([
    // {staff_id: 1 , first_name : 'First name',last_name: 'Last_name', address_id : 10 , address: 'Av xochimilco', picture : 'file.jpg',
    //   email: 'Email@email.com',store_id : 10, active : 1 , username : 'raul302'},
    // {staff_id: 1 , first_name : 'First name',last_name: 'Last_name', address_id : 10 , address: 'Av xochimilco', picture : 'file.jpg',
    //   email: 'Email@email.com',store_id : 10, active : 1 , username : 'raul302'},
    // {staff_id: 1 , first_name : 'First name',last_name: 'Last_name', address_id : 10 , address: 'Av xochimilco', picture : 'file.jpg',
    //   email: 'Email@email.com',store_id : 10, active : 1 , username : 'raul302'}
])


const load_staff = (page) => {

  axios.get(url+'/staff/'+page)
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_staff(response.data.staff)
  
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
              <h3 className="card-title">Staff</h3>
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
                    <th>Staff ID</th>
                    <th>Full Name</th>
                    <th>Address ID</th>
                    <th>Address </th>
                    <th>Picture </th>
                    <th>Email </th>
                    <th>Store ID </th>
                    <th>Active</th>
                    <th>Username</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                 
                {staff.map(staf =>{
                 return( <tr>
                    <td>{staf.staff_id}</td>
                    <td>{staf.fullname_staff}</td>
                    <td>{staf.address_id}</td>
                    <td>{staf.address}</td>
                    <td><img className="blob-to-image" src={"data:image/png;base64," + staf.picture}></img> </td>

                    <td>{staf.email}</td>
                    <td>{staf.store_id}</td>
                    <td>{staf.active}</td>
                    <td>{staf.username}</td>

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
                { staff.length >= 10 &&
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
