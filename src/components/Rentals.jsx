import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../constants/constants';
import { Link } from 'react-router-dom';


export default function Rentals() {

  const [ page , set_page ] = useState(0)

  useEffect(()=>{

    load_rentals( page );

  },[ page ])

  const [rentals,set_rentals] = useState([
  
    // {rental_id :20 , rental_date : '2020-04-03' , inventory_id : 10 , customer_id : 30 , customer_fullname : 'customer_fullname' , return_date : '2024-10-08' , staff_id : 40 , staff_fullname: 'Staff fullname' },
    // {rental_id :20 , rental_date : '2020-04-03' , inventory_id : 10 , customer_id : 30 , customer_fullname : 'customer_fullname' , return_date : '2024-10-08' , staff_id : 40 , staff_fullname: 'Staff fullname' },
    // {rental_id :20 , rental_date : '2020-04-03' , inventory_id : 10 , customer_id : 30 , customer_fullname : 'customer_fullname' , return_date : '2024-10-08' , staff_id : 40 , staff_fullname: 'Staff fullname' },

  ])


const load_rentals = ( page ) => {

  axios.get(url+'/rentals/'+page)
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_rentals(response.data.rentals)
  
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
              <h3 className="card-title">Rentals</h3>
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
                    <th>Rental ID</th>
                    <th>Rental Date</th>
                    <th>Inventory ID</th>
                    <th>Customer ID</th>
                    <th>Customer Fullname</th>
                    <th>Rental return date</th>
                    <th>Staff ID</th>
                    <th>Staff fullname</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                 
                {rentals.map(rental =>{
                 return( <tr>
                    <td>{rental.rental_id}</td>
                    <td>{rental.rental_date}</td>
                    <td>{rental.inventory_id}</td>
                    <td>{rental.customer_id}</td>
                    <td>{rental.fullname_customer}</td>
                    <td>{rental.return_date}</td>
                    <td>{rental.staff_id}</td>
                    <td>{rental.fullname_staff}</td>

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
                { rentals.length >= 10 &&
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
