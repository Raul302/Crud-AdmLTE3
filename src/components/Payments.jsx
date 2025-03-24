import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../constants/constants';
import { Link } from 'react-router-dom';


export default function Payments() {

  const [ page , set_page] = useState( 0 )
  useEffect(()=>{

    load_payments( page );

  },[ page ])

  const [payments,set_payments] = useState([
    // {payment_id: 1 ,customer_id : 20 , customer_fullname : 'customer_fullname', staff_id: 30 , staff_fullname: ' staff_fullname' , rental_id : 40, rental_date: '2005-12-04',amount: 15.88 , payment_date : '2010-10-10'},
    // {payment_id: 1 ,customer_id : 20 , customer_fullname : 'customer_fullname', staff_id: 30 , staff_fullname: ' staff_fullname' , rental_id : 40, rental_date: '2005-12-04',amount: 15.88 , payment_date : '2010-10-10'},
    // {payment_id: 1 ,customer_id : 20 , customer_fullname : 'customer_fullname', staff_id: 30 , staff_fullname: ' staff_fullname' , rental_id : 40, rental_date: '2005-12-04',amount: 15.88 , payment_date : '2010-10-10'}
])


const load_payments = ( page ) => {

  axios.get(url+'/payments/'+page)
  .then(function (response) {
   console.log('Carga exitoso')
   console.log(response);
   set_payments(response.data.payments)
  
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
              <h3 className="card-title">Payments</h3>
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
                    <th>Payment ID</th>
                    <th>Customer ID</th>
                    <th>Customer fullname</th>
                    <th>Staff ID</th>
                    <th>Staff Fullname</th>
                    <th>Rental ID</th>
                    <th>Rental Date</th>
                    <th>Amount</th>
                    <th>Payment date</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                 
                {payments.map(payment =>{
                 return( <tr>
                    <td>{payment.payment_id}</td>
                    <td>{payment.customer_id}</td>
                    <td>{payment.fullname_customer}</td>
                    <td>{payment.staff_id}</td>
                    <td>{payment.fullname_staff}</td>
                    <td>{payment.rental_id}</td>
                    <td>{payment.rental_date}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.payment_date}</td>

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
                { payments.length >= 10 &&
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
